# Release Notes — 2026-09-10 v8.3

## Love playlist synchronization

- Replaced the stale `/our-playlist/` subproject that had been inherited from the August 29 website package.
- The v8.2 website package was carrying the standalone playlist at **v28**.
- `/our-playlist/` is now synchronized wholesale to the latest Library build, **v42 — spotify-link-updated-password-5816**.
- This preserves the later playlist sequencing, song data, lyrics/notes, styling, authentication behavior, Spotify integration, gift-card page, audit files, and the newer `auth.js` asset as a matched set instead of mixing files from different playlist revisions.

## Existing v8.2 changes retained

- Real rank artwork remains on Life for Marvel Rivals Grandmaster, Tekken 8 Tekken King, StarCraft II Masters, and Pokémon Sword / Shield Master Ball Tier.
- Tekken 7 Vanquisher (2021), Pokémon Master Ball Tier (2022), and Tekken 8 Tenryu with Jack-8 (2024) remain in the timeline/history.
- Fanime Pokémon VGC semifinalist remains correctly dated to 2014.
- 2016 AMV competition history remains corrected.
- Public-facing editorial/recruiter meta commentary remains removed.

## QA

- Playlist data, lyrics, notes, authentication logic, QR asset, audit files, and JavaScript behavior are synchronized from v42 as a matched set.
- Three integration-only HTML/CSS fixes were applied for the main site validator: the access-screen heading is demoted from a second `h1`, the printable gift card gets a meta description, and the external Spotify link gets `noreferrer`.
- JavaScript syntax checks pass for the playlist scripts.
- Main website deployment checker passes after the playlist replacement.
