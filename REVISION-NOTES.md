# Revision notes — visual and editorial refinement v3

## Visual fixes

- Locked every Dino Kart cover to its true **3:4 aspect ratio** using a ratio-controlled wrapper and `object-fit: cover`.
- Removed the duplicated Dino cover from the Projects hero so the artwork appears once as a focused featured project rather than dominating two consecutive sections.
- Rebuilt the dark-section card palette with navy surfaces, cream headings, pale body copy, and gold accents.
- Fixed the pale secondary button used inside dark callouts so the label is navy on cream instead of effectively white on white.
- Consolidated the interface around one warm-paper, navy, burgundy, sage, cream, and gold palette.
- Removed remaining inline presentation styles from the portfolio shell and replaced them with reusable CSS classes.
- Standardized the JV favicon across SVG, PNG, ICO, Apple touch, and web-app manifest formats.
- Kept legacy icon filenames as identical fallbacks so older playable pages do not display a different mark.

## Editorial fixes

- Re-read and revised Home, About, Work, Projects, Life, Timeline, Contact, Play Hub, collection indexes, Dino Kart, redirects, and 404 copy.
- Removed administrative wording such as page “ownership,” public content accounting, release-note language, and placeholder case-study phrasing.
- Replaced “What 23 means” with a natural description of the six collections and their contents.
- Changed corporate-sounding phrases such as “portfolio systems” and “AI-assisted workflows” to more direct, personal language.
- Kept the site’s strongest personal details: nursing, business banking, Japanese, Rocket Raccoon, Pokémon/StarCraft history, travel, karaoke, PC building, and practical entrepreneurship.
- Made Work the detailed professional route without repeatedly restating the same healthcare biography on every page.
- Kept Life personal rather than turning hobbies into résumé claims.
- Cleaned visitor-facing collection titles while preserving the existing playable applications.

## Navigation and deployment fixes

- Corrected Play Hub and Projects links to point directly to `/play/...` routes instead of relying on root-level redirect folders.
- Added a reusable finalizer that standardizes favicons across older game pages and removes internal version labels.
- Added Windows and macOS/Linux one-command deployment helpers.
- Added a repeatable static validation script and updated manifest/cache-busting references.
