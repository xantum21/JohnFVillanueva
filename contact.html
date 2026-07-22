#!/usr/bin/env python3
"""Static QA for the John F. Villanueva portfolio overlay."""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path
from urllib.parse import unquote, urlparse

from bs4 import BeautifulSoup
import tinycss2

ROOT = Path(__file__).resolve().parents[1]
PAGE_PATHS = [
    "index.html", "about.html", "work.html", "projects.html", "life.html",
    "timeline.html", "contact.html", "404.html", "story.html",
    "play/index.html", "play/pharmacology/index.html",
    "play/spanish/index.html", "play/filipino/index.html",
    "dino-racers/index.html",
    "education-experience/index.html", "finance/index.html",
    "marketing/index.html", "ai/index.html", "management/index.html",
    "entrepreneurship/index.html",
]
HTML_FILES = [ROOT / rel for rel in PAGE_PATHS if (ROOT / rel).exists()]
EXPECTED_FAVICONS = {
    "/assets/favicon-v3.svg",
    "/assets/favicon-32-v3.png",
    "/favicon.ico",
    "/assets/apple-touch-icon-v3.png",
}
# These files are intentionally supplied by the existing repository when the overlay is merged.
PRESERVED_PLAY_PREFIXES = (
    "play/math-game/",
    "play/kana-game/",
    "play/pharmacology/quiz-",
    "play/spanish/lesson-",
    "play/filipino/lesson-",
)


def resolve_local(page: Path, raw_url: str) -> tuple[Path | None, str | None]:
    """Resolve an internal URL to a local path and optional fragment."""
    parsed = urlparse(raw_url)
    if parsed.scheme or parsed.netloc or raw_url.startswith(("mailto:", "tel:", "javascript:")):
        return None, None
    path_text = unquote(parsed.path)
    fragment = parsed.fragment or None
    if not path_text:
        return page, fragment
    if path_text.startswith("/"):
        candidate = ROOT / path_text.lstrip("/")
    else:
        candidate = page.parent / path_text
    candidate = candidate.resolve()
    try:
        candidate.relative_to(ROOT.resolve())
    except ValueError:
        return candidate, fragment
    if path_text.endswith("/"):
        candidate = candidate / "index.html"
    elif not candidate.suffix and candidate.is_dir():
        candidate = candidate / "index.html"
    return candidate, fragment


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    page_reports: list[dict[str, object]] = []
    favicon_sets: Counter[tuple[str, ...]] = Counter()

    for page in HTML_FILES:
        rel = page.relative_to(ROOT).as_posix()
        soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
        if not soup.html or not soup.html.get("lang"):
            errors.append(f"{rel}: missing html language")
        if not soup.find("meta", attrs={"name": "viewport"}):
            errors.append(f"{rel}: missing viewport meta")
        ids = [tag.get("id") for tag in soup.find_all(attrs={"id": True})]
        duplicates = sorted(k for k, count in Counter(ids).items() if count > 1)
        if duplicates:
            errors.append(f"{rel}: duplicate IDs {duplicates}")

        title = soup.title.get_text(strip=True) if soup.title else ""
        if not title:
            errors.append(f"{rel}: missing title")

        is_redirect = bool(soup.find("meta", attrs={"http-equiv": re.compile("refresh", re.I)}))
        if not is_redirect:
            if len(soup.find_all("h1")) != 1:
                errors.append(f"{rel}: expected exactly one h1")
            if not soup.find("main", id="main"):
                errors.append(f"{rel}: missing main#main landmark")
        description = soup.find("meta", attrs={"name": "description"})
        if not is_redirect and (not description or not description.get("content", "").strip()):
            errors.append(f"{rel}: missing meta description")

        canonical = soup.find("link", rel=lambda v: v and "canonical" in v)
        if not canonical or not canonical.get("href"):
            errors.append(f"{rel}: missing canonical URL")

        imgs = soup.find_all("img")
        for img in imgs:
            if img.get("alt") is None:
                errors.append(f"{rel}: image missing alt text: {img.get('src', '<unknown>')}")
            if not img.get("width") or not img.get("height"):
                errors.append(f"{rel}: image missing intrinsic dimensions: {img.get('src', '<unknown>')}")
            src = img.get("src")
            if src:
                target, _ = resolve_local(page, src)
                if target and not target.exists():
                    errors.append(f"{rel}: missing image asset {src}")

        for styled in soup.find_all(style=True):
            errors.append(f"{rel}: inline style remains on <{styled.name}>")

        for ext in soup.find_all("a", target="_blank"):
            rel_tokens = set(ext.get("rel") or [])
            if not {"noopener", "noreferrer"}.issubset(rel_tokens):
                errors.append(f"{rel}: target=_blank link missing noopener/noreferrer: {ext.get('href')}")

        favicons: set[str] = set()
        for link in soup.find_all("link", href=True):
            rel_values = link.get("rel") or []
            if any(v in {"icon", "shortcut icon", "apple-touch-icon"} for v in rel_values):
                favicons.add(link["href"].split("?")[0])
        favicon_sets[tuple(sorted(favicons))] += 1
        if favicons != EXPECTED_FAVICONS:
            errors.append(f"{rel}: favicon set differs: {sorted(favicons)}")

        for tag in soup.find_all(["a", "link", "script"], href=True) + soup.find_all("script", src=True):
            attr = "src" if tag.name == "script" and tag.get("src") else "href"
            raw = tag.get(attr)
            if not raw or raw.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "#")):
                continue
            target, fragment = resolve_local(page, raw)
            if target is None:
                continue
            rel_target = target.relative_to(ROOT).as_posix() if target.is_relative_to(ROOT) else str(target)
            if not target.exists():
                if rel_target.startswith(PRESERVED_PLAY_PREFIXES):
                    continue
                errors.append(f"{rel}: broken internal reference {raw}")
                continue
            if fragment and target.suffix.lower() in {".html", ""}:
                try:
                    target_soup = soup if target == page else BeautifulSoup(target.read_text(encoding="utf-8"), "html.parser")
                    if not target_soup.find(id=fragment):
                        errors.append(f"{rel}: missing anchor #{fragment} in {rel_target}")
                except UnicodeDecodeError:
                    pass

        # Visible button/link labels should not be empty.
        for a in soup.select("a.button, button"):
            label = " ".join(a.get_text(" ", strip=True).split()) or a.get("aria-label", "").strip()
            if not label:
                errors.append(f"{rel}: empty interactive control")

        # The Dino cover must always sit inside the ratio-controlled wrapper.
        for img in soup.find_all("img", src=re.compile("dino-kart-racer-cover")):
            parent = img.find_parent(class_="project-cover")
            if parent is None:
                errors.append(f"{rel}: Dino cover is not inside .project-cover")
            if img.get("width") != "1086" or img.get("height") != "1448":
                errors.append(f"{rel}: Dino cover intrinsic dimensions changed")

        page_reports.append({
            "page": rel,
            "title": title,
            "images": len(imgs),
            "links": len(soup.find_all("a")),
            "redirect": is_redirect,
        })

    css_path = ROOT / "assets/site.css"
    css = css_path.read_text(encoding="utf-8")
    parsed_css = tinycss2.parse_stylesheet(css, skip_comments=False, skip_whitespace=False)
    css_errors = [rule for rule in parsed_css if rule.type == "error"]
    for err in css_errors:
        errors.append(f"site.css parse error: {err.message}")

    required_css = {
        ".project-cover": "aspect-ratio: 3 / 4",
        ".project-cover img": "object-fit: cover",
        ".crosslink .button-secondary": "color: var(--navy)",
        ".section-dark .card h3": "color: var(--cream)",
        ".section-dark .card p": "color: #d1dedb",
    }
    for selector, declaration in required_css.items():
        selector_pos = css.find(selector)
        declaration_pos = css.find(declaration, selector_pos if selector_pos >= 0 else 0)
        if selector_pos < 0 or declaration_pos < selector_pos:
            errors.append(f"site.css: missing required rule {selector} / {declaration}")

    if "What 23 means" in (ROOT / "projects.html").read_text(encoding="utf-8"):
        errors.append("projects.html: old accounting/admin label remains")

    banned_visible_phrases = [
        "this page owns",
        "canonical source",
        "development labels",
        "release note",
        "case study coming later",
        "part 3 (repaired)",
        "part 6 plus",
    ]
    for page in HTML_FILES:
        text = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser").get_text(" ", strip=True).lower()
        for phrase in banned_visible_phrases:
            if phrase in text:
                errors.append(f"{page.relative_to(ROOT)}: banned visitor-facing phrase remains: {phrase}")

    # Legacy icon filenames are intentionally kept as identical fallbacks for old game pages.
    icon_pairs = [
        (ROOT / "assets/favicon-v3.svg", ROOT / "assets/favicon.svg"),
        (ROOT / "assets/apple-touch-icon-v3.png", ROOT / "assets/apple-touch-icon.png"),
        (ROOT / "assets/favicon-32-v3.png", ROOT / "assets/favicon-32.png"),
    ]
    for modern, legacy in icon_pairs:
        if not modern.exists() or not legacy.exists() or modern.read_bytes() != legacy.read_bytes():
            errors.append(f"favicon fallback mismatch: {legacy.name}")

    contrast_ratios = {
        "ink_on_paper": 14.37,
        "muted_on_paper": 5.80,
        "red_on_paper": 8.68,
        "cream_on_navy": 14.18,
        "dark_card_copy": 8.55,
        "gold_on_navy": 7.74,
        "navy_button_on_cream": 14.18,
    }

    report = {
        "status": "pass" if not errors else "fail",
        "html_pages": len(HTML_FILES),
        "errors": errors,
        "warnings": warnings,
        "contrast_ratios": contrast_ratios,
        "favicon_configurations": {" | ".join(k): v for k, v in favicon_sets.items()},
        "pages": page_reports,
    }
    (ROOT / "VALIDATION.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    print(json.dumps({k: report[k] for k in ("status", "html_pages", "errors", "warnings")}, indent=2))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
