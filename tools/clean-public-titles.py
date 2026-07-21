"""Remove development labels from existing playable HTML files.

Run from the repository root after merging the refined overlay:
    python tools/clean-public-titles.py

The script changes only visible/title strings. It does not modify question banks,
scoring, audio, timers, adaptive logic, local storage, or game behavior.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

exact = {
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

changed = []
missing = []
for rel, replacements in exact.items():
    path = ROOT / rel
    if not path.exists():
        missing.append(rel)
        continue
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in replacements:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding="utf-8")
        changed.append(rel)

for path in sorted((ROOT / "play/filipino").glob("lesson-*.html")):
    text = path.read_text(encoding="utf-8")
    original = text
    # Remove release/status suffixes only when shown in parentheses.
    text = re.sub(r"\s*\((?:v\d+(?:\.\d+)?[a-z]?|stable)\)", "", text, flags=re.IGNORECASE)
    if text != original:
        path.write_text(text, encoding="utf-8")
        changed.append(path.relative_to(ROOT).as_posix())

print(f"Updated {len(changed)} file(s).")
for rel in changed:
    print(f"  - {rel}")
if missing:
    print("Skipped missing files:")
    for rel in missing:
        print(f"  - {rel}")
