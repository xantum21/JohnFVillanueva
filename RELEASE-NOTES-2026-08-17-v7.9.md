# Release 2026-08-17-v7.9

This release gives the unlisted Dating page its own visual identity.

## Dating-photo refresh

- Replaced every Life-page image reused on Dating.
- Added five Dating-only personal photographs: hiking with trekking poles, Oktoberfest, a Wizarding World pose, a playful roadside stop, and a dressed-up garden/ocean portrait.
- Rewrote the accompanying captions around actual activities and personality rather than generic travel imagery.
- Kept other people's faces out of the selected foreground photographs.
- Added an automated check that fails if Dating and Life reuse a personal-photo path in the future.

## Credential status retained

- ACLS — current
- PALS — current
- Basic EKG Interpretation — completed

The validator now also checks every HTML page for obsolete pre-course wording.

## Verification

- `python3 check-site.py`
- JavaScript and Python syntax checks
- Image dimensions, alt text, metadata, and local references
- Dating/Life image-set comparison
- One-page public résumé rendering and extraction
