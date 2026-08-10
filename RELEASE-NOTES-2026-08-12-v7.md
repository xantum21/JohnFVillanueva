# Website release 2026-08-12-v7

This is the deployment-ready, post-August-12 portfolio build. It preserves the
editorial cream, navy, burgundy, and gold identity; the nursing-business-builder
story; the Life page voice; the unlisted personal page; and all 23 playable
experiences.

## Professional and credibility updates

- Presents Basic EKG Interpretation as completed August 1, 2026.
- Presents ACLS and PALS as completed August 12, 2026.
- Uses "completed" rather than the ambiguous "valid" date language.
- Describes the 1,000+ patient-care total as combined paid CNA care and
  supervised clinical practice.
- Frames NCLEX-RN timing as a May-June 2027 target subject to eligibility and
  authorization to test, with Summer 2027 availability following licensure.
- Corrects the Stanford presentation to the 2012-2015 timeline period.
- Adds concrete supervised clinical experience and PointClickCare exposure to
  the public Work page.
- Adds recruiter-readable ProfilePage structured data to the Work page.

## Resume update

- Rebuilt `assets/john-villanueva-resume.pdf` as a single-column, one-page,
  ATS-friendly public resume.
- Preserves the nursing, business banking, marketing, leadership, Japanese,
  project, and recognition depth without allowing columns to scramble text
  extraction.
- Links directly to the privacy-safe contact page and LinkedIn.

## Conversion and design updates

- Moves the recruiter status line above the homepage slogan and keeps the
  primary professional and project actions within the opening experience.
- Gives Work a clear visual priority in the homepage route cards.
- Moves Dino Kart Racer below the working-habits section so professional
  credibility lands before the playful differentiator.
- Adds immediate Play Hub and Dino actions to the Projects hero.
- Changes Play Hub and collection heroes so their primary actions begin an
  experience rather than sending visitors away.
- Adds an early personal-page contact action and a real photo of John while
  preserving the warmer unlisted-page design.
- Improves mobile page-hero sequencing so copy appears before large editorial
  imagery.

## Accessibility, interaction, and performance

- Repairs the Back-button transition state and shortens the page wipe while
  retaining its Persona-inspired personality.
- Strengthens keyboard focus contrast on both the main and personal designs.
- Darkens low-contrast personal-page accent text and removes its external font
  dependency.
- Adds explicit Start and timed/untimed options to the math game.
- Reserves space beneath fixed game-navigation controls.
- Keeps individual pharmacology quizzes out of search results while leaving the
  project and collection pages discoverable.
- Replaces the Dino cover with a clean version that removes unsupported rating,
  multiplayer, player-count, and publisher packaging claims.
- Reduces the Stanford certificate asset from 327 KB to approximately 77 KB and
  reduces the Dino cover asset while preserving display quality.
- Removes unreferenced duplicate copies of the shared site CSS and JavaScript
  from `play/assets`.

## Verification

Run from the repository root:

```bash
python3 check-site.py
node --check assets/site.js
python3 build-public-resume.py
```

The generated resume should remain one page and its extracted text should read
from the professional summary through recognition without interleaved columns.
