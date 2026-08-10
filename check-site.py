#!/usr/bin/env python3
"""Pre-deploy checks for johnfvillanueva.com.

Run from the repository root with: python3 check-site.py
The command exits non-zero when the site needs attention.

Checks cover placeholders, internal links and resources, core document
semantics, navigation parity, the unlisted personal page, sitemap/canonical
parity, privacy regressions, and current professional facts.
"""

import os
import re
import sys
from collections import Counter
from glob import glob
from html.parser import HTMLParser


ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

problems = []
notes = []

RELEASE_ID = "2026-08-12-v7"

TOP_LEVEL = sorted(glob("*.html"))
ALL_HTML = sorted(glob("*.html") + glob("*/*.html") + glob("*/*/*.html"))


# ------------------------------------------------------------- placeholders
TOKEN = re.compile(r"\[\[([A-Z0-9_]+)\]\]")
token_hits = {}
for path in ALL_HTML:
    text = open(path, encoding="utf-8").read()
    for match in TOKEN.finditer(text):
        token_hits.setdefault(match.group(1), []).append(path)

if token_hits:
    problems.append("Unfilled placeholders still in the HTML:")
    for token, files in sorted(token_hits.items()):
        problems.append(f"    [[{token}]]  ->  {', '.join(sorted(set(files)))}")


# ---------------------------------------------- HTML references and metadata
class DocumentAudit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.resource_refs = []
        self.ids = []
        self.labels_for = set()
        self.controls = []
        self.external_blank_links = []
        self.title_count = 0
        self.description_count = 0
        self.canonicals = []
        self.h1_count = 0
        self.has_lang = False
        self.has_refresh = False
        self.noindex = False
        self.images_missing_alt = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)

        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "html" and attrs.get("lang"):
            self.has_lang = True
        if tag == "title":
            self.title_count += 1
        if tag == "h1":
            self.h1_count += 1

        if tag == "meta":
            name = attrs.get("name", "").lower()
            content = attrs.get("content", "")
            if name == "description" and content.strip():
                self.description_count += 1
            if name == "robots" and "noindex" in content.lower():
                self.noindex = True
            if attrs.get("http-equiv", "").lower() == "refresh":
                self.has_refresh = True

        if tag == "link":
            rel = attrs.get("rel", "").lower().split()
            href = attrs.get("href", "")
            if "canonical" in rel and href:
                self.canonicals.append(href)
            if href and any(
                item in rel
                for item in ("stylesheet", "icon", "manifest", "apple-touch-icon")
            ):
                self.resource_refs.append(href)

        if tag == "a" and attrs.get("href"):
            self.hrefs.append(attrs["href"])
            if attrs.get("target") == "_blank":
                rel = set(attrs.get("rel", "").lower().split())
                if not {"noopener", "noreferrer"}.issubset(rel):
                    self.external_blank_links.append(attrs["href"])

        if tag == "img":
            if attrs.get("src"):
                self.resource_refs.append(attrs["src"])
            if "alt" not in attrs:
                self.images_missing_alt += 1

        if tag in ("script", "audio", "video", "source") and attrs.get("src"):
            self.resource_refs.append(attrs["src"])

        if tag == "label" and attrs.get("for"):
            self.labels_for.add(attrs["for"])

        if (
            tag in ("input", "select", "textarea")
            and attrs.get("type", "").lower() != "hidden"
        ):
            self.controls.append(attrs)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)


def is_external(ref):
    return ref.startswith(
        (
            "http://",
            "https://",
            "//",
            "mailto:",
            "tel:",
            "#",
            "data:",
            "blob:",
            "javascript:",
        )
    )


def resolve(ref, from_path):
    ref = ref.split("#")[0].split("?")[0]
    if not ref:
        return None
    if ref.startswith("/"):
        return os.path.normpath(os.path.join(ROOT, ref.lstrip("/")))
    return os.path.normpath(
        os.path.join(os.path.dirname(os.path.join(ROOT, from_path)), ref)
    )


def exists(target):
    if os.path.isfile(target):
        return True
    return os.path.isdir(target) and os.path.isfile(os.path.join(target, "index.html"))


documents = {}
broken_links = []
broken_resources = []

for path in ALL_HTML:
    parser = DocumentAudit()
    parser.feed(open(path, encoding="utf-8").read())
    documents[path] = parser

    for ref in parser.hrefs:
        if is_external(ref):
            continue
        target = resolve(ref, path)
        if target and not exists(target):
            broken_links.append(f"{path}  ->  {ref}")

    for ref in parser.resource_refs:
        if is_external(ref):
            continue
        target = resolve(ref, path)
        if target and not exists(target):
            broken_resources.append(f"{path}  ->  {ref}")

if broken_links:
    problems.append("Broken internal links:")
    problems += [f"    {item}" for item in broken_links]
if broken_resources:
    problems.append("Missing local resources:")
    problems += [f"    {item}" for item in broken_resources]


# CSS url(...) references can live in stylesheets or inline <style> blocks.
CSS_URL = re.compile(r"url\(\s*(['\"]?)([^)'\"]+)\1\s*\)", re.I)
css_url_problems = []
css_sources = sorted(
    set(ALL_HTML + glob("assets/*.css") + glob("play/assets/*.css"))
)
for path in css_sources:
    text = open(path, encoding="utf-8").read()
    css_blocks = (
        re.findall(r"<style[^>]*>(.*?)</style>", text, re.I | re.S)
        if path.endswith(".html")
        else [text]
    )
    for css in css_blocks:
        for _, ref in CSS_URL.findall(css):
            ref = ref.strip()
            if not ref or is_external(ref) or ref.startswith(("var(", "#")):
                continue
            target = resolve(ref, path)
            if target and not exists(target):
                css_url_problems.append(f"{path}  ->  {ref}")

if css_url_problems:
    problems.append("Missing resources referenced by CSS:")
    problems += [f"    {item}" for item in css_url_problems]


# ------------------------------------------------------ document semantics
indexable_canonicals = set()
for path, parser in documents.items():
    if not parser.has_lang:
        problems.append(f"{path}: <html> is missing a language")
    if parser.title_count != 1:
        problems.append(f"{path}: expected one <title>, found {parser.title_count}")
    if parser.description_count != 1:
        problems.append(
            f"{path}: expected one meta description, found {parser.description_count}"
        )
    if not parser.has_refresh and parser.h1_count != 1:
        problems.append(f"{path}: expected one <h1>, found {parser.h1_count}")
    if not parser.noindex and len(parser.canonicals) != 1:
        problems.append(
            f"{path}: expected one canonical URL, found {len(parser.canonicals)}"
        )
    if not parser.noindex and not parser.has_refresh and len(parser.canonicals) == 1:
        indexable_canonicals.add(parser.canonicals[0])

    duplicate_ids = [
        item for item, count in Counter(parser.ids).items() if count > 1
    ]
    if duplicate_ids:
        problems.append(f"{path}: duplicate IDs: {', '.join(duplicate_ids)}")
    if parser.images_missing_alt:
        problems.append(f"{path}: {parser.images_missing_alt} image(s) missing alt text")
    if parser.external_blank_links:
        problems.append(f"{path}: target=_blank link(s) missing noopener/noreferrer")

    unlabeled = []
    for control in parser.controls:
        control_id = control.get("id")
        has_name = bool(control.get("aria-label") or control.get("aria-labelledby"))
        if not has_name and (not control_id or control_id not in parser.labels_for):
            unlabeled.append(control_id or "(control without id)")
    if unlabeled:
        problems.append(f"{path}: unlabeled form control(s): {', '.join(unlabeled)}")

    text = open(path, encoding="utf-8").read()
    if re.search(r"mailto:|[A-Z0-9._%+-]+@gmail\.com", text, re.I):
        problems.append(f"{path}: public personal email reference found")


# --------------------------------------------------------- nav consistency
NAV = re.compile(r'<div class="nav-links"[^>]*>(.*?)</div>', re.S)
LINK = re.compile(r'href="([^"]+)"[^>]*>\s*([^<]+?)\s*</a>')

navs = {}
for path in TOP_LEVEL:
    text = open(path, encoding="utf-8").read()
    match = NAV.search(text)
    if not match:
        notes.append(
            f"{path}: no primary nav (expected for redirect stubs and the unlisted page)"
        )
        continue
    navs[path] = tuple(label for _, label in LINK.findall(match.group(1)))

if navs:
    reference = navs.get("index.html") or next(iter(navs.values()))
    for path, labels in navs.items():
        if labels != reference:
            problems.append(f"Nav mismatch in {path}: {' | '.join(labels)}")


# -------------------------------------------------- personal page privacy
dating = "dating.html"
if os.path.isfile(dating):
    text = open(dating, encoding="utf-8").read()
    if "noindex" not in text:
        problems.append("dating.html is missing its noindex robots meta tag")
    sitemap = (
        open("sitemap.xml", encoding="utf-8").read()
        if os.path.isfile("sitemap.xml")
        else ""
    )
    if "dating" in sitemap:
        problems.append("dating.html appears in sitemap.xml but should stay unlisted")
    linked_from = [
        path
        for path in TOP_LEVEL
        if path != dating
        and re.search(
            r'href="[^"]*dating\.html', open(path, encoding="utf-8").read()
        )
    ]
    if linked_from:
        notes.append(
            f"dating.html is linked from: {', '.join(linked_from)} "
            "(intentional only if you chose to link it)"
        )

    robots = (
        open("robots.txt", encoding="utf-8").read()
        if os.path.isfile("robots.txt")
        else ""
    )
    if re.search(r"^\s*Disallow:\s*/dating", robots, re.M):
        problems.append(
            "robots.txt disallows /dating.html. Remove it: a blocked crawler never "
            "reads the noindex tag."
        )


# ------------------------------------------------------- sitemap parity
if os.path.isfile("sitemap.xml"):
    sitemap = open("sitemap.xml", encoding="utf-8").read()
    sitemap_urls = re.findall(r"<loc>\s*([^<]+?)\s*</loc>", sitemap)
    duplicate_urls = [
        item for item, count in Counter(sitemap_urls).items() if count > 1
    ]
    if duplicate_urls:
        problems.append(f"Duplicate URLs in sitemap.xml: {', '.join(duplicate_urls)}")

    sitemap_set = set(sitemap_urls)
    for url in sorted(indexable_canonicals - sitemap_set):
        problems.append(f"Indexable canonical URL missing from sitemap.xml: {url}")
    for url in sorted(sitemap_set - indexable_canonicals):
        problems.append(f"Non-canonical or non-indexable URL in sitemap.xml: {url}")


# ----------------------------------------------- current professional facts
work_text = (
    open("work.html", encoding="utf-8").read()
    if os.path.isfile("work.html")
    else ""
)
for required in ("April 2027", "3.84", "Sigma Theta Tau"):
    if required not in work_text:
        problems.append(f"work.html is missing current professional fact: {required}")
if re.search(
    r"2024\s*[–-]\s*2026 target|>\s*2026\s*</strong>\s*<span>\s*BSN target",
    work_text,
    re.S,
):
    problems.append("work.html still contains a stale 2026 BSN completion target")


# ---------------------------------------------------------- release identity
release_path = "release-version.txt"
if not os.path.isfile(release_path):
    problems.append(f"{release_path} is missing")
else:
    release_text = open(release_path, encoding="utf-8").read()
    if RELEASE_ID not in release_text:
        problems.append(
            f"{release_path} does not identify the expected release: {RELEASE_ID}"
        )


# ---------------------------------------------- game safety and shared assets
for game_path in ("play/math-game/index.html", "play/kana-game/index.html"):
    if not os.path.isfile(game_path):
        continue
    game_text = open(game_path, encoding="utf-8").read()
    if re.search(r"\b(?:eval|prompt)\s*\(", game_text):
        problems.append(f"{game_path}: blocking prompt() or unsafe eval() found")
    if "raw.githubusercontent.com" in game_text:
        problems.append(f"{game_path}: remote GitHub media dependency found")

for shared_name in ("site.css", "site.js", "dating.css"):
    root_copy = os.path.join("assets", shared_name)
    play_copy = os.path.join("play", "assets", shared_name)
    if not os.path.isfile(root_copy) or not os.path.isfile(play_copy):
        continue
    if open(root_copy, "rb").read() != open(play_copy, "rb").read():
        problems.append(f"Shared asset copies have diverged: {shared_name}")


# ------------------------------------------------------------------ report
print(f"Checked {len(ALL_HTML)} HTML files.\n")

if notes:
    print("Notes")
    for note in notes:
        print(f"  - {note}")
    print()

if problems:
    print("NEEDS ATTENTION")
    for problem in problems:
        print(f"  {problem}" if problem.startswith("    ") else f"  - {problem}")
    print()
    sys.exit(1)

print("All checks passed. Safe to deploy.")
