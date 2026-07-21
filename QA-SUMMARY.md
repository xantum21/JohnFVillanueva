# QA summary

## Passed checks

- 20 portfolio-shell and collection HTML pages parsed successfully.
- Zero duplicate IDs.
- Zero missing page titles, canonical URLs, viewport declarations, or required descriptions.
- Exactly one H1 and one `main#main` landmark on every non-redirect page.
- Zero missing image alt attributes or intrinsic image dimensions.
- Zero broken references within the overlay; preserved playable-file routes are recognized as merge dependencies.
- Zero empty buttons or button-style links.
- Zero remaining inline style attributes in the portfolio shell.
- Every `target="_blank"` link includes `noopener noreferrer`.
- All audited pages use the same four favicon references.
- Legacy favicon filenames are byte-identical to the new JV icon fallbacks.
- Dino Kart artwork is 1086 × 1448 pixels and every portfolio instance sits inside the 3:4 `.project-cover` wrapper.
- CSS parsed with zero syntax errors.
- JavaScript passed `node --check`.
- Python deployment and validation tools compiled successfully.
- The finalizer is idempotent: a second run produces no changes.
- Thirteen primary local routes returned HTTP 200 in static-server testing.

## Contrast checks

- Ink on warm paper: **14.37:1**
- Muted body copy on warm paper: **5.80:1**
- Burgundy accent on warm paper: **8.68:1**
- Cream on navy: **14.18:1**
- Pale body copy on navy cards: **8.55:1**
- Gold on navy: **7.74:1**
- Navy button label on cream: **14.18:1**

These combinations exceed WCAG AA requirements for normal text.

## Rendering limitation

Automated Chromium screenshots could not be completed in the execution container because Chromium hangs on the container’s unavailable desktop/DBus services. The supplied user screenshots were used to trace the visible failures, and the fixes were verified through CSS-cascade inspection, static parsing, intrinsic-image checks, contrast calculation, local HTTP serving, and route/link validation.
