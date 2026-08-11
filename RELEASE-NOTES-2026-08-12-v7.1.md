# Website release 2026-08-12-v7.1

This is the corrected post-August-12 deployment build. It retains the complete
professional, project, Play, Life, and timeline upgrades from v7 while adding a
full redesign of the unlisted personal page and clearer credential treatment.

## Credential and résumé clarification

- Presents ACLS and PALS as **Current** without standalone dates that could be
  mistaken for expiration dates.
- Presents Basic EKG Interpretation as **Completed** without an ambiguous
  résumé date.
- Keeps issue and expiration documentation available for formal employer
  verification rather than crowding the public résumé.
- Rebuilds `assets/john-villanueva-resume.pdf` as the same single-column,
  one-page, ATS-friendly public résumé with the clarified credential line.

## Personal-page redesign

- Replaces the earlier long-form personal page with a clearer editorial story:
  introduction, everyday compatibility, intentions, values, first-date ideas,
  personality, and contact.
- Rewrites the hero and supporting cards in direct, natural language.
- Replaces the portrait caption with a simple introduction.
- Rebuilds the hero actions and all primary buttons with explicit white-on-navy
  text across normal, visited, hover, and keyboard-focus states.
- Adds a compact anchor navigation on larger screens while keeping the unlisted
  page separate from the professional portfolio navigation.
- Reduces repetitive copy while keeping the Filipino American identity,
  healthcare path, travel, gaming, Japanese study, karaoke, PC building,
  relationship intentions, and future-family goals.
- Keeps the personal Formspree form, privacy boundary, noindex status, and
  direct-link-only discovery model.
- Adds responsive one-column layouts for the hero, value cards, intentions,
  first-date ideas, and contact form.

## Professional and conversion updates retained from v7

- Leads the homepage with April 2027 BSN completion, the conditional NCLEX-RN
  target, and new-graduate residency intent.
- Describes the 1,000+ patient-care total as combined paid CNA care and
  supervised clinical practice.
- Adds concrete supervised clinical experience, PointClickCare exposure, and
  recruiter-readable structured data to Work.
- Keeps Work visually prioritized on the homepage and places the Dino feature
  after the professional working-habits section.
- Keeps direct Play Hub, Dino, pharmacology, Spanish, and Filipino start actions.
- Preserves the cleaned Dino cover and the optimized Stanford certificate asset.
- Retains repaired page-transition, keyboard-focus, mobile hero, game-control,
  sitemap, and search-indexing behavior.

## Verification

Run from the repository root:

```bash
python3 check-site.py
node --check assets/site.js
python3 build-public-resume.py
```

The public résumé should remain one US Letter page, and extracted text should
read in a single uninterrupted column.
