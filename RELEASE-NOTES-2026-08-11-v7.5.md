# Website release 2026-08-11-v7.5

This is the downloadable Timeline rebuild and pre-course accuracy release.

## Interactive archive

- Replaces the eight broad Timeline cards with 77 dated entries spanning
  2012–2026.
- Adds a clickable horizontal year rail, era jumps, full-text search, ten
  category filters, Play years, expand/collapse controls, result counts, and
  deep links to years and individual entries.
- Restores the long-form archive purpose: jobs, degrees, clinical rotations,
  credentials, leadership, projects, recognition, culture, and competition.
- Adds a no-JavaScript text fallback so the record remains readable when the
  interactive layer is unavailable.
- Uses text-first credential lists and keeps identifying numbers, QR codes, and
  most scans off the public site.
- Keeps the Stanford and UC Berkeley presentation certificates as selective
  public proof.

## Recruiter-facing accuracy

- Clarifies that the 1,000+ figure refers to paid CNA bedside hours; supervised
  BSN clinical hours are separate.
- Names Rosewood Post Acute on the Work page and public résumé.
- Labels ACLS, PALS, and Basic EKG Interpretation as scheduled for August 12,
  2026 because this release was prepared on August 11.
- Removes the three scheduled courses from structured-data credential claims.
- Lists Nightingale College as a current affiliation and preserves completed
  schools under alumniOf.

## Copy and behavior

- Rewrites the most mechanical Work-page transferability copy in plain first
  person.
- Changes the homepage route labels from HUMAN/STORY to PERSONAL/TIMELINE.
- Limits the page-transition reset to true back/forward-cache restores.
- Adds explicit no-script reveal fallbacks to the core pages.

## Verification

Run from the repository root:

```bash
python3 build-public-resume.py
python3 check-site.py
node --check assets/site.js
node --check assets/timeline.js
```

The public résumé should remain one US Letter page, and the release marker
should read `2026-08-11-v7.5`.

