# Website release 2026-08-11-v7.6

This release corrects the Timeline record and rewrites the credential section in
plain first-person language.

## Timeline corrections

- Expands the interactive archive to 84 dated entries spanning 2011–2026.
- Adds high-school graduation in 2012 without guessing a school name.
- Adds the StarCraft II progression: Gold in 2011 Season 1, Platinum in 2013
  Season 4, Diamond in 2014 Season 2, and Masters in 2023 Season 3.
- Adds the Naruto Ultimate Ninja Storm 4 tournament semifinal at PlayStation
  Experience 2015.
- Adds the Marvel Rivals progression: Gold in Season 1, Platinum in Season 1.5,
  and Diamond in Season 4.5, using official season start dates.
- Updates the interactive year rail, deep-link range, hero count, and complete
  no-JavaScript fallback.

## Credential accuracy and copy

- Removes Columbia Corporate Finance and NYIF Mergers & Acquisitions everywhere;
  neither program was completed.
- Keeps the remaining completed professional certificates in the credential list.
- Replaces the administrative-sounding credential explanation with direct,
  conversational copy.
- Keeps ACLS, PALS, and Basic EKG clearly labeled as scheduled for August 12,
  2026 because this package was prepared on August 11.
- Removes the duplicate undated StarCraft II and Marvel Rivals bullets now that
  both have dated Timeline entries.

## Verification

Run from the repository root:

```bash
python3 check-site.py
node --check assets/site.js
node --check assets/timeline.js
```

The public résumé should remain one US Letter page, and the release marker
should read `2026-08-11-v7.6`.
