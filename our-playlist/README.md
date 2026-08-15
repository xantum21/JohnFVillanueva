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

`lyric-themes.js` contains **44 distinct visual identities** — one for every song. Examples include a blushing notebook, moonlit question letter, dance card, Japanese washi love note, kundiman stationery, a photograph postcard, wedding vow card, film-reel letter, and an aged old-love letter.

These are visual themes only; no copyrighted lyric text is bundled in this file.

### Original-language / English toggle

The four non-English songs are already configured for bilingual display in `lyrics-data.js`:

- Novelbright — 愛とか恋とか: `日本語` ↔ `English`
- TJ Monterde & KZ Tandingan — Palagi: `Tagalog` ↔ `English`
- OFFICIAL HIGE DANDISM — 115 Million Kilometer Film: `日本語` ↔ `English`
- Joseph Vincent — Kahit Maputi Na Ang Buhok Ko: `Tagalog` ↔ `English`

Switching tabs changes the letterhead to make clear whether the reader is seeing the original language or the English translation. The same song-specific stationery remains underneath so it still feels like one letter with two readable versions.

## Add lyric text later

`lyrics-data.js` intentionally ships with placeholders. Once the companion lyric document is ready, populate the corresponding entries there. The UI, language toggles, and all 44 visual themes are already wired.

## Playlist data

All 44 tracks, Spotify URIs, Spotify links, YouTube Music search links, and the six narrative chapters live in `playlist-data.js`.

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
