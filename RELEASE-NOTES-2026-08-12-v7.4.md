# Website release 2026-08-12-v7.4

This release keeps the visual, credential, résumé, and layout work from v7.3
while giving the core site a much more natural voice and replacing the first
anime portrait with a cleaner cinematic illustration.

## Natural-language pass

- Rewrites the Home, About, Work, Projects, Life, Timeline, Contact, and
  personal-page copy in direct first-person language.
- Removes repeated portfolio jargon such as “lanes,” “toolkit,” “throughline,”
  and other labels that made different sections sound mechanically similar.
- Keeps recruiter-facing facts concise and precise while allowing the personal
  and project pages to sound more like John.
- Replaces abstract slogans with concrete prompts, explanations, and calls to
  action so visitors can understand where to go next.

## Work-page clarity

- Rewrites the Work hero around the current healthcare focus and earlier
  business experience.
- Replaces the awkward visible “illustrative care scene” caption with a direct
  observation about paying attention and reporting changes.
- Identifies the generated care image as an illustration in its alternative
  text without making the visible caption read like an asset disclaimer.
- Simplifies recruiter labels, the healthcare-experience introduction,
  transferable-experience copy, credential framing, and résumé handoff.

## Personal-page illustration and copy

- Replaces the earlier avatar-like composite with an original hand-drawn,
  cinematic anime illustration of John at a warm sunlit train platform.
- Uses natural adult proportions, restrained cel shading, a single carry-on,
  and a painted everyday setting instead of floating props, sparkles, a halo,
  or chibi-style anatomy.
- Removes the tilted “side quest” sticker treatment so the artwork can carry
  the card without extra gimmicks.
- Rewrites the heritage, work, recharge, relationship, values, first-date,
  personality, and contact sections in more conversational language.
- Retains the real portrait as the page introduction and keeps the anime image
  as a playful secondary visual.

## Credentials and résumé retained

- Keeps ACLS and PALS labeled **Current** without a standalone date that could
  be mistaken for an expiration date.
- Keeps Basic EKG Interpretation labeled **Completed**.
- Retains the one-page, single-column, ATS-friendly public résumé.

## Verification

Run from the repository root:

```bash
python3 build-public-resume.py
python3 check-site.py
node --check assets/site.js
```

The public résumé should remain one US Letter page, and the release marker
should read `2026-08-12-v7.4`.
