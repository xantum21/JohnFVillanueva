# Website release 2026-08-12-v7.3

This is the expanded post-August-12 deployment build. It retains the complete
professional, project, Play, Life, timeline, personal-page, credential, and
résumé upgrades from v7.2 while adding a more visual personal page and fully
replacing the Work hero image that still left too much empty space.

## Personal-page visual expansion

- Adds an original Filipino–American–Australian heritage illustration to the
  “Where I come from” story, with the Philippine sun, American-inspired stripes,
  and Australia's Southern Cross woven into one editorial composition.
- Adds a custom anime-style illustration of John to anchor the personality
  section without replacing the real portrait in the introduction.
- Converts the “Go somewhere / Stay in” weekend pair into photographic cards
  using the site's travel and gaming imagery.
- Reflows the personality interests around the new character card on desktop,
  tablet, and mobile while retaining the concise conversation prompts.
- Adds anchor offsets so sticky navigation no longer covers section headings.

## Work hero framing

- Replaces the earlier distant stock scene with a purpose-composed 4:3
  illustrative care conversation that places both complete faces and the human
  interaction at the center of the frame.
- Moves the hero caption into its own navy editorial band so it no longer covers
  the people or competes with the image.
- Keeps the frame consistent through desktop, tablet, and mobile breakpoints.
- Labels the scene as illustrative in the visible caption, includes descriptive
  alternative text, and ships the optimized WebP locally.

## Credential and résumé clarification

- Presents ACLS and PALS as **Current** without standalone dates that could be
  mistaken for expiration dates.
- Presents Basic EKG Interpretation as **Completed** without an ambiguous
  résumé date.
- Keeps issue and expiration documentation available for formal employer
  verification rather than crowding the public résumé.
- Rebuilds `assets/john-villanueva-resume.pdf` as the same single-column,
  one-page, ATS-friendly public résumé with the clarified credential line.

## Personal-page foundations retained

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
