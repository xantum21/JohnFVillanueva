#!/usr/bin/env python3
"""Insert a Formspree form ID into contact.html without publishing an email address."""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTACT = ROOT / "contact.html"
PLACEHOLDER = "REPLACE_WITH_FORM_ID"


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python tools/configure-contact-form.py YOUR_FORMSPREE_FORM_ID")
        return 2

    value = sys.argv[1].strip()
    value = value.removeprefix("https://formspree.io/f/").strip("/")
    if not re.fullmatch(r"[A-Za-z0-9_-]{6,80}", value):
        print("That does not look like a valid Formspree form ID.")
        return 2

    text = CONTACT.read_text(encoding="utf-8")
    if PLACEHOLDER in text:
        text = text.replace(PLACEHOLDER, value)
    else:
        text = re.sub(r"https://formspree\.io/f/[A-Za-z0-9_-]+", f"https://formspree.io/f/{value}", text)
    CONTACT.write_text(text, encoding="utf-8")

    public_files = list(ROOT.rglob("*.html")) + list(ROOT.rglob("*.js")) + list(ROOT.rglob("*.css"))
    accidental = []
    for path in public_files:
        content = path.read_text(encoding="utf-8", errors="ignore")
        if re.search(r"[A-Za-z0-9._%+-]+@gmail\.com", content, flags=re.I):
            accidental.append(path.relative_to(ROOT))
    if accidental:
        print("Warning: a private email identifier remains in:")
        for path in accidental:
            print(f"  - {path}")
        return 1

    print(f"Contact form configured in {CONTACT.relative_to(ROOT)}.")
    print("The private destination email is managed in Formspree and is not present in the website source.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
