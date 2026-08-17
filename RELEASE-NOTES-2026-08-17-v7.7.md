# Release 2026-08-17-v7.7

This pass adds a restrained personal-photo layer to the existing site without changing its recruiter-first structure.

## What changed

- Replaced the generated About-page career collage with John's 2022 CSU East Bay graduation photo.
- Reworked the Life hero around a real Shibuya photo and added a compact three-photo journal using Yosemite, Japan, and restaurant moments.
- Replaced the stock travel image and generated anime inset on Life with personal beach and One Piece photos.
- Added a small real-photo journal to the unlisted Dating page and replaced its stock adventure image with Yosemite.
- Added the graduation photo as optional proof inside the interactive 2022 Timeline degree entry.
- Updated ACLS and PALS to current and Basic EKG Interpretation to completed across Work, Timeline, structured data, helper scripts, and the public résumé.
- Converted selected personal originals to metadata-stripped, compressed WebP assets. Group photos and credential scans remain unpublished.
- Corrected playlist metadata/new-tab safety, removed one invalid closing `input` tag in Spanish Lesson 2, and resynchronized shared asset copies.

## Verification

- Run `python3 check-site.py`.
- Run `node --check assets/site.js` and `node --check assets/timeline.js`.
- Confirm the public résumé remains one US Letter page with clean text extraction.
- Check About, Life, Timeline, and Dating at desktop and phone widths before deployment.
