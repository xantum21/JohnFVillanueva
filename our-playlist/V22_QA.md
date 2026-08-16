# V22 interaction and mobile QA

Implemented checks/fixes:

- Password field now lives inside the envelope instead of a browser/modal-style interruption.
- Successful unlock uses a staged flap-open → paper-lift → paper-zoom → hero reveal sequence.
- Six chapter palettes progress subtly from blush through champagne/aged ivory.
- Current song has a visible pulsing-heart “now playing” marker and stronger chapter-colored active state.
- Clicking unused space on a song row also selects/plays it; Lyrics/Spotify/YT controls remain independent.
- Optional `VALENTINE_PERSONAL_NOTES` mapping is wired into lyric letters but empty by default.
- Last selected song is remembered locally; return visits get a quiet “Continue where you left off” control.
- Added viewport-fit, safe-area padding, scroll snapping, larger tap targets, two-line mobile titles, compact 3-column actions, narrow-phone rules, and landscape-height rules.
- Full Spotify playlist access from V21 remains available.
- Finale remains intentionally simple; no extra ending feature creep was added.

Before final delivery, still test on the actual recipient-style path: QR → phone browser → password keyboard → unlock animation → track selection → lyrics → 3-language Japanese tabs → full Spotify modal → landscape rotation.
