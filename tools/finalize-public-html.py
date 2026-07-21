#!/usr/bin/env python3
"""Finalize every public HTML file before deployment.

This script is designed for the existing JohnFVillanueva repository. It:
1. Removes internal/version labels from the playable quiz pages.
2. Standardizes favicon and manifest references across every HTML file.
3. Leaves game logic, question banks, styles, audio, scoring, and local storage untouched.

Run from anywhere after merging the overlay:
    python tools/finalize-public-html.py
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FAVICON_BLOCK = """  <meta name=\"theme-color\" content=\"#102a34\">\n  <link rel=\"icon\" href=\"/assets/favicon-v3.svg\" type=\"image/svg+xml\">\n  <link rel=\"icon\" href=\"/assets/favicon-32-v3.png\" sizes=\"32x32\" type=\"image/png\">\n  <link rel=\"shortcut icon\" href=\"/favicon.ico\">\n  <link rel=\"apple-touch-icon\" href=\"/assets/apple-touch-icon-v3.png\" sizes=\"180x180\">\n  <link rel=\"manifest\" href=\"/site.webmanifest?v=20260721d\">\n"""

EXACT_REPLACEMENTS = {
    "play/pharmacology/quiz-1.html": [
        ("Pharm HESI Mastery — Weak Areas Drill (100 Q)", "Pharmacology Practice I — Medication Safety & Core Review"),
        ("Pharm HESI Mastery — Weak Areas Drill", "Pharmacology Practice I — Medication Safety & Core Review"),
    ],
    "play/pharmacology/quiz-2.html": [
        ("Pharm HESI Mastery — Weak Areas SEQUEL (Adaptive + SFX)", "Pharmacology Practice II — Adaptive Weak-Area Review"),
        ("Pharm HESI Mastery — Weak Areas SEQUEL", "Pharmacology Practice II — Adaptive Weak-Area Review"),
    ],
    "play/pharmacology/quiz-3.html": [
        ("Pharm HESI — PART 3 (Repaired)", "Pharmacology Practice III — Comprehensive Review"),
    ],
    "play/pharmacology/quiz-4.html": [
        ("Pharm HESI — PART 6 PLUS • 100+ Questions (Adaptive + SFX)", "Pharmacology Practice IV — Advanced 100+ Question Challenge"),
        ("Pharm HESI — PART 6 PLUS • 100+ Questions", "Pharmacology Practice IV — Advanced 100+ Question Challenge"),
    ],
    "play/spanish/lesson-1.html": [
        ("Madrigal — Lesson 1 • Spanish Quiz (v5.1 polished)", "Spanish Practice I — Cognates & Core Patterns"),
        ("Madrigal — Lesson 1 • Spanish Quiz (v5.1)", "Spanish Practice I — Cognates & Core Patterns"),
    ],
    "play/spanish/lesson-2.html": [
        ("Madrigal — Lesson 2 • Spanish Quiz (Stable)", "Spanish Practice II — Word Formation & Sentence Practice"),
        ("Madrigal — Lesson 2 • Spanish Quiz (STABLE)", "Spanish Practice II — Word Formation & Sentence Practice"),
    ],
}

# Remove icon/manifest/theme tags before inserting one known-good block.
ICON_LINK_RE = re.compile(
    r"^[ \t]*<link\b(?=[^>]*\brel\s*=\s*['\"][^'\"]*(?:icon|apple-touch-icon|manifest)[^'\"]*['\"])[^>]*>[ \t]*\r?\n?",
    flags=re.IGNORECASE | re.MULTILINE,
)
THEME_RE = re.compile(
    r"^[ \t]*<meta\b(?=[^>]*\bname\s*=\s*['\"]theme-color['\"])[^>]*>[ \t]*\r?\n?",
    flags=re.IGNORECASE | re.MULTILINE,
)
VERSION_SUFFIX_RE = re.compile(
    r"\s*\((?:v\d+(?:\.\d+)?[a-z]?(?:\s+polished)?|stable)\)",
    flags=re.IGNORECASE,
)


def standardize_head(text: str) -> str:
    if "</head>" not in text.lower():
        return text
    text = ICON_LINK_RE.sub("", text)
    text = THEME_RE.sub("", text)
    # Keep a single blank line before the block without reformatting the rest of the file.
    return re.sub(r"</head>", FAVICON_BLOCK + "</head>", text, count=1, flags=re.IGNORECASE)


def main() -> int:
    changed: list[str] = []
    label_updates: list[str] = []
    icon_updates: list[str] = []

    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT).as_posix()
        original = path.read_text(encoding="utf-8")
        text = original

        for old, new in EXACT_REPLACEMENTS.get(rel, []):
            text = text.replace(old, new)

        if rel.startswith("play/filipino/") or rel.startswith("play/spanish/"):
            text = VERSION_SUFFIX_RE.sub("", text)

        before_icons = text
        text = standardize_head(text)

        if text != original:
            path.write_text(text, encoding="utf-8")
            changed.append(rel)
            if before_icons != original:
                label_updates.append(rel)
            if text != before_icons:
                icon_updates.append(rel)

    print(f"Updated {len(changed)} HTML file(s).")
    print(f"  Public-title cleanup: {len(label_updates)} file(s)")
    print(f"  Standardized favicon block: {len(icon_updates)} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
