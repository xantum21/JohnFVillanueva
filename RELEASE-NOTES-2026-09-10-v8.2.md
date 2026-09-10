# Release Notes — 2026-09-10 v8.2

## Competitive gaming artwork and history

- Replaced the temporary CSS initials with the user-supplied rank artwork for:
  - **Marvel Rivals — Grandmaster** (Support, August 2026)
  - **Tekken 8 — Tekken King** (Kunimitsu, Season 3, September 2026)
  - **StarCraft II — Masters** (2023)
  - **Pokémon Sword / Shield — Master Ball Tier** (2022)
- Added the earlier Tekken milestones to the Life gaming history:
  - **Tekken 7 — Vanquisher** (2021)
  - **Tekken 8 — Tenryu with Jack-8** (2024)

## Timeline corrections

- Added **Pokémon Sword / Shield — Master Ball Tier** to 2022.
- Added **Tekken 7 — Vanquisher** to 2021.
- Added **Tekken 8 — Tenryu with Jack-8** to 2024.
- Kept **Pokémon VGC tournament semifinalist — Fanime** correctly under 2014 and removed it from the old undated-milestones block.
- Added 2016 creative competition history: one AMV entered at SacAnime and two AMVs entered at Fanime.
- Timeline now contains **91 dated entries**.

## Public-copy cleanup

- Removed the undated catch-all section from Timeline now that the specified competitive/creative milestones have dates.
- Removed or rewrote internal-sounding phrases such as “recruiter version,” “credential clutter,” “side quests,” “résumé wall,” “wall of screenshots,” and similar explanatory notes.
- Simplified Work-page recruiter labels into normal professional-site language.
- Cleaned meta/editorial commentary out of several timeline event descriptions and certificate captions.

## QA

- User-supplied rank assets live under `assets/ranks/`.
- Life rank cards use a responsive two-column layout on larger screens and one column on phones.
- StarCraft II artwork is clipped to its hexagonal badge shape so the source image’s checkerboard surround is not visible.
- Timeline no-JavaScript fallback was regenerated from the canonical timeline data so year counts stay synchronized.
