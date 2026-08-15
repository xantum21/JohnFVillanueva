# Our Playlist — johnfvillanueva.com/our-playlist/

Drop this entire **`our-playlist/` folder** into the root of the existing GitHub Pages repository for `johnfvillanueva.com`.

It should publish at:

`https://johnfvillanueva.com/our-playlist/`

Do **not** move this folder's `index.html` into the website root. Your main homepage keeps its own `/index.html`; this page stays isolated at `/our-playlist/index.html`.

## Folder contents

```text
our-playlist/
├── index.html
├── styles.css
├── script.js
├── playlist-data.js
├── lyrics-data.js
├── lyric-themes.js
└── README.md
```

## What this iteration adds

### Persistent playlist player

The page now uses one Spotify Embed controller behind a custom sticky player that stays at the bottom of the browser while the visitor scrolls the six chapters.

Controls include:

- Previous song
- Restart current song
- Play / pause
- Next song
- Lyrics for the current song
- Expand/collapse the real Spotify embed
- Click the current song title to jump back to that song in the list

Keyboard shortcuts while the lyrics modal is closed:

- `Space` — play/pause
- `←` — previous song
- `→` — next song

The custom controls call Spotify's iFrame controller; they do not host or redistribute the audio. Browser autoplay policies can occasionally require the visitor to tap Play once. The collapsible Spotify drawer remains available as a fallback.

### Folded stationery lyrics view

Every song's **Lyrics ♡** button opens a folded-paper / love-letter view rather than a generic modal.

`lyric-themes.js` contains **43 distinct visual identities** — one for every song. Examples include a blushing notebook, moonlit question letter, dance card, Japanese washi love note, kundiman stationery, a photograph postcard, wedding vow card, film-reel letter, and an aged old-love letter.

These are visual themes only; no copyrighted lyric text is bundled in this file.

### Original-language / English toggle

The four non-English songs are already configured for bilingual display in `lyrics-data.js`:

- Novelbright — 愛とか恋とか: `日本語` ↔ `English`
- TJ Monterde & KZ Tandingan — Palagi: `Tagalog` ↔ `English`
- OFFICIAL HIGE DANDISM — 115 Million Kilometer Film: `日本語` ↔ `English`
- Joseph Vincent — Kahit Maputi Na Ang Buhok Ko: `Tagalog` ↔ `English`

Switching tabs changes the letterhead to make clear whether the reader is seeing the original language or the English translation. The same song-specific stationery remains underneath so it still feels like one letter with two readable versions.

## Add lyric text later

`lyrics-data.js` intentionally ships with placeholders. Once the companion lyric document is ready, populate the corresponding entries there. The UI, language toggles, and all 43 visual themes are already wired.

## Playlist data

All 43 tracks, Spotify URIs, Spotify links, YouTube Music search links, and the six narrative chapters live in `playlist-data.js`.

## Page copy

Near the top of `playlist-data.js`, edit `window.VALENTINE_PAGE` to customize:

- `title`
- `recipient`
- `subtitle`
- `note`
- `signoff`

## Privacy

The page includes `noindex,nofollow,noarchive`, which discourages search engines from indexing it. That makes it unlisted-ish, **not password protected**. Anyone who has the URL can still open it.


## Part I lyric demo
Lyrics supplied in `Part 1 Lyrics.docx` are loaded for tracks 1–5: Clinton Kane, Sam Smith, AJ Rafael, Good Kid, and Joe Brooks. Tracks 6–7 remain in the styled pending state because their lyric text was not included in that document.


## V4 interaction note

The lyrics letter is intentionally **not synced to playback**. Opening lyrics creates a scrollable love-letter view where lines reveal progressively as the reader scrolls downward, as if the note is unfolding.


## Part II lyric demo
Lyrics from `Part 2 Lyrics.docx` are now loaded for tracks 6–12, 14–19. Track 13 (**Let Me**) is still pending because its lyric text was not included in that document. Novelbright is currently loaded as a romanized original with the English translation tab still waiting for text.


## V6 dramatic letter pass
This build adds a short paper-unrolling opening animation, chapter-based paper mechanics (notebook / folded / romance / keepsake / stationery / vow / aged), and per-song decorative ephemera including wax seals, faux postage stamps, and handwritten margin notes.


## V7 cleanup + JP/romaji/EN pass
This pass adds a three-tab Japanese / Romaji / English treatment for Novelbright, fills in ZAYN's "Let Me", and declutters the lyrics modal by moving the close button away from the decorative art, tightening the top-right stamp/seal area, and suppressing accidental horizontal overflow.

## V8 fit-to-viewport lyric popup
The lyric letter now fits within the browser viewport without an outer horizontal or vertical scrollbar. Only the lyric text area scrolls vertically, and its scrollbar is visually hidden. Decorative stamp/seal art remains, while margin-note cards are suppressed in the popup to keep the reading surface uncluttered.


## V9 aesthetic polish pass
This pass focuses on UI polish: cleaner Japanese typography for titles and original-language lyrics, improved balancing/wrapping for long song titles, more refined styling for 3-language lyric tabs, and gentler mobile spacing/typography for the lyric-letter popup.


## V10 Part III lyric import
Part 3 Lyrics.docx is now integrated into the current V9-polished interface. Part 3 lyrics are integrated across the established-relationship section. Palagi includes Tagalog and an English translation toggle. Please Keep Loving Me was added in the following correction pass.


## V11 URI mapping fix
Fixed the Clinton Kane `I GUESS I'M IN LOVE` lyric lookup key. Spotify track IDs are case-sensitive; one character in the lyric-data key was capitalized (`Z`) while the playlist URI uses lowercase (`z`), causing the site to show `Lyrics · soon` even though the lyric text was present.


## V12 Part III addendum
Added James TW — `Please Keep Loving Me` from the supplied `Lyrics new.docx`.


## V13 playlist trim
Removed `Two Punks In Love` from the site at the user's request. The narrative playlist now contains 43 tracks, all downstream track numbers and chapter ranges were shifted, and the chapter-specific lyric-letter mechanics were updated to match the new numbering.


## V14 serious narrative-order pass
This version deliberately reorders the 43-song story around lyrical chronology rather than keeping the original grouping. Major changes include moving **Make You Mine**, **Never Seen Anything “Quite Like You”**, and **Luckiest Man Alive** toward the marriage/finale material; moving **I Was Made For Loving You** into the falling-hard section; and moving **Better Half of Me**, **Palagi**, and **Just You and I** into the shared-life chapter. The site also adds chapter-to-chapter transition cards, chapter context in the sticky player, optional recipient/date fields on the opening envelope, and a final replay card after the last song.
