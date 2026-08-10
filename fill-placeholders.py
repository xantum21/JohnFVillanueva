#!/usr/bin/env python3
"""
Fill the [[PLACEHOLDER]] tokens in the site with your real details.

There are nine facts the site needs that only you can supply. Edit the VALUES
dictionary below, then run:

    python3 fill-placeholders.py

It rewrites the HTML in place and prints what it changed. Run check-site.py
afterwards to confirm nothing is left unfilled.

Nothing here is guesswork on my part: credential status and licensure dates are
the kind of thing a nurse recruiter will verify, so they are left blank rather
than estimated. Write only what is true today, and update the file again when
a certification is actually in hand.
"""

import os
import re
import sys
from glob import glob

# ---------------------------------------------------------------------------
# EDIT THESE. Leave a value as None to keep its placeholder for now.
# ---------------------------------------------------------------------------
VALUES = {
    # Month and year you expect to finish the BSN. Example: "December 2026"
    "BSN_COMPLETION": "April 2027",

    # When you plan to sit for the NCLEX-RN. Example: "February 2027"
    "NCLEX_TARGET": "May–June 2027",

    # The role you want. Example: "New-graduate RN residency"
    "TARGET_ROLE": "New-graduate RN residency",

    # Units or specialties, written the way a nurse manager would say them.
    # Example: "medical-surgical, telemetry, or progressive care"
    "TARGET_SPECIALTY": "medical-surgical, telemetry, or acute care",

    # When you could start. Example: "Spring 2027" or "Upon licensure"
    "AVAILABILITY": "June 2027",

    # One sentence on geography. Example:
    #   "Open to relocation within California and to the Sacramento area."
    #   or "Not relocating; targeting East Bay and Contra Costa County systems."
    "RELOCATION": "Open to roles across the Bay Area and the Sacramento region.",

    # Certification status. Use whichever is true RIGHT NOW, for example:
    #   "scheduled March 2027"   (registered, not yet taken)
    #   "in progress"            (course underway)
    #   "certified May 2027"     (completed - update the card wording too)
    "ACLS_STATUS": "valid August 12, 2026",
    "PALS_STATUS": "valid August 12, 2026",
    "EKG_STATUS": "valid August 1, 2026",

    # IMPORTANT - read this one carefully.
    # Your resume PDF currently says "1,000+ hours of PAID direct patient-care
    # experience." The site needs to say the same thing. Pick whichever is true
    # and make sure the PDF matches it.
    #
    # If the hours are all paid CNA work:
    #   "All 1,000+ hours are paid direct patient care worked as a Certified
    #    Nursing Assistant in a skilled nursing setting. Supervised clinical
    #    rotation hours through Nightingale College are separate and additional."
    #
    # If the figure combines paid work and clinical rotations:
    #   "The figure combines paid work as a Certified Nursing Assistant in
    #    skilled nursing with supervised clinical rotation hours completed
    #    through Nightingale College. Both are direct, hands-on patient contact."
    #   ...and change the resume PDF so it no longer says "paid."
    "HOURS_BASIS": "Hours reflect hands-on, direct patient contact. The exact split between paid CNA employment and supervised clinical rotation hours, along with employment verification and clinical records, is provided during a formal hiring process.",
}
# ---------------------------------------------------------------------------

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

TOKEN = re.compile(r"\[\[([A-Z0-9_]+)\]\]")
targets = sorted(glob("*.html") + glob("*/*.html"))

unknown = {k for k in VALUES if k not in {
    m for f in targets for m in TOKEN.findall(open(f, encoding="utf-8").read())
}}
if unknown:
    print(f"Note: these keys are no longer used in the HTML: {', '.join(sorted(unknown))}\n")

filled, skipped, changes = set(), set(), 0

for path in targets:
    text = original = open(path, encoding="utf-8").read()
    for key, value in VALUES.items():
        token = f"[[{key}]]"
        if token not in text:
            continue
        if value is None or not str(value).strip():
            skipped.add(key)
            continue
        count = text.count(token)
        text = text.replace(token, str(value).strip())
        filled.add(key)
        changes += count
    if text != original:
        open(path, "w", encoding="utf-8").write(text)
        print(f"updated  {path}")

print()
if filled:
    print(f"Filled {changes} placeholder(s) across {len(filled)} field(s): {', '.join(sorted(filled))}")
if skipped:
    print(f"Still blank: {', '.join(sorted(skipped))}")
    print("Add values above and run this again.")
    sys.exit(1)

print("All placeholders filled. Run: python3 check-site.py")
