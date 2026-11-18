# The Siege of Manila: 1574 — developer release notes through Alpha 0.5.0

Prepared 17 November 2026 (Pacific). Current supplied milestone: **Alpha 0.5.0, Intramuros**.

## Evidence and version boundaries

This history is reconstructed from the supplied 0.5.0 source's `CHANGELOG.md`, completed-stage handoffs, current implementation, earlier work in this conversation, and the release archive inventory. It records implemented milestones, not abandoned design proposals. The numbered history from 0.2 through 0.5.0 is documented by the cumulative changelog. Earlier audio builds have descriptive filenames rather than a dependable series of numbered releases, so they are grouped below without inventing version numbers or individual implementation dates.

The supplied changelog repeats the 0.4.16 costume entry at its end. That is one release, not two. Older `FINAL_HANDOFF.md`, `DEVELOPER_HANDOFF.md` and `QA.md` headings/pointers still describe 0.4.15 or the original stage-1 build; `MAP_HANDOFF.md` and the top of `CHANGELOG.md` describe the actual current milestone. Earlier Stage 2 proposals are historical plans and have since been implemented or superseded.

## Release-by-release additions

| Iteration | Added or changed | Developer significance |
| --- | --- | --- |
| Original prototype / early Alpha | Browser-based pixel-art horde survival, three heroes, enemy waves, XP progression, gold purchases and mythology powers form the inherited foundation. | Earliest archive exists as `siege-of-manila-1574.html`; this is a baseline description, not a claim that every item first appeared in one particular numbered patch. |
| Early soundtrack builds, before 0.2 | Archives identify with-music, audio-overhaul and complete-OST builds. By the complete-OST baseline the game had the owner's 30-track soundtrack. | The 0.2 changelog explicitly preserves the complete-OST build's music. Individual intermediate audio edits have not been reconstructed byte-by-byte in this audit. |
| **0.2 — combat, modes and progression** | Separate LMB, RMB, Shift, dodge, Q and interact controls; buffered input; gamepad and touch routes; Mateo's Obsidian Crescent, Datu's stone yo-yo and Throwing Knives, Diego's Fire Pot; ground cooldown rings; three-phase mechanics for both bosses; Arcade and Endless; Character Database; Campaign Funds and eight permanent upgrades. | Versioned progression save v2; visible survivor retreat replaced apparent vanishing. Boss music uses encounter-based shuffle bags, not health-phase switching. XP, gold and Campaign Funds remain separate. |
| **0.3 — night, charms and world variety** | Day/night cycle, dock bombardment, Manananggal Descent replacing Datu's knives, Blood Moon upgrade, four replacement Datu tracks, 20 universal charms, 15 deeds, Monsoon/Fog/Burning Quarter twists, Shielded/Swift/Volatile champions, flash and lighting settings. | Save v3 adds deeds/champion statistics. Datu's new RMB establishes the summon play pattern. Music total stays 30. |
| **0.4 stage 1 — Chronicle and Wardrobe** | Chronicle discovery, nine hero endings with player-controlled Continue, 30 purchasable skins, labelled history/folklore/invention, Deeds versus Perks wording. Lightning cleanup fixed and all active cooldowns reset each wave. | Save v6 adds Chronicle, endings and skins. The nine narratives initially share beach imagery with sky/detail variations. |
| **0.4.1 — accessible text** | Database two-column article scrolling; overflowing menus, cards and summaries scroll; Chronicle index and Wardrobe positions retained; wheel, keyboard, controller reading and touch scrolling. | Resolves the inaccessible bottom of Datu's article while keeping navigation reachable. |
| **0.4.2 — High Tide** | Marked, passable flooded coastal ground slows normal hero/raider movement to 70%; piers remain dry. Announcement, WADING indicator and Chronicle discovery. | Local terrain multiplier, rather than permanent stat mutation; fixed-distance dodges retain travel. |
| **0.4.3 — Rallying** | Rallying champions give other nearby non-boss raiders +15% movement within 60 world pixels, with source/recipient feedback. | Auras do not stack; tide composition is 0.70 × 1.15 = 0.805 normal dry-ground speed. |
| **0.4.4 — hero passives** | Mateo: Hold the Gap, close-cleave guard (12% damage reduction for 1.2 s). Datu: Marked Prey (3 s mark, Manananggal priority and +20% claw damage). Diego: Enfilade (central bullet retains full damage through ordinary pass-throughs). | Replaces earlier passive proposals. Distinguish qualifying primaries from specials, summons and damage-over-time. |
| **0.4.5 — hero upgrade pools** | Seven hero-specific level-up techniques each; adds Countercharge, Returning Trail and Screening Blast. Eligibility/rank validation and exhausted-pool fallback. | Extends established upgrades rather than creating a separate progression system. |
| **0.4.6 — snare and smoke** | Datu's Tidal Snare replaces Tidal Step; Diego's Smoke Escape replaces Gunstock Strike. Both give chip-damage area control; snare slows, smoke disrupts ranged enemy aim. | Controls, icons and descriptions updated; Countercurrent moved to Datu's regular dodge trigger. Mateo's Shift remains Warrior's Charge. |
| **0.4.7 — earned cosmetics** | One free signature-ending Wardrobe reward per hero: Sunlit Obsidian, Moonwake, Cinderwatch. Retroactive recognition from recorded endings. | Stable cosmetic IDs, idempotent awards, no forced equip or fund deduction. Originally palette variants. |
| **0.4.8 — ending foregrounds** | Mateo by his planted weapon/fire/townspeople; Datu at the surviving boat/pier with crew; Diego on the wall walk with watch equipment. | Three recognizable fictional foregrounds accompany the nine existing narratives; not nine entirely separate scenes. |
| **0.4.9 — Fire Arrows** | Archer landing patches, warning before damage, bounded burning hazards for hero and eligible raiders; twist/Chronicle/lighting integration. | Ordinary arrows remain ordinary outside the twist; lifecycle cleanup bounds patch accumulation. |
| **0.4.10 — powder barrels** | Environmental barrels with a 1.2 s fuse, visible blast area, damage to both sides and chain ignition. | Environmental combat targets integrate with established attacks/deferred effects. |
| **0.4.11 — Loose Carabao** | Telegraph along the central road before a crossing hazard; recognizable code-native animal sprite. | Requires an open compatible lane; map layout is now an environmental-system contract. |
| **0.4.12 — Banner champion** | A dead champion leaves a temporary healing banner. Standing in its inner suppression area stops healing while its lifetime continues. | Bounded, non-reviving healing and overlap rules; visual counterplay. |
| **0.4.13 — Night Raid** | Later-wave twist extinguishes decorative torches in Full lighting; Soft/Off preserve normal rendering. | Respects comfort settings and retains important gameplay lighting. |
| **0.4.14 — nine hero charms** | Three charms per hero, eligibility metadata, matching perk/deed text, retained 20 universal charms. Retreat resets passive/charm state. | 29 total charm definitions. Lower clear counts in small earlier bot batches remained a balance question, not proven causation. |
| **0.4.15 — Diego dodge reload** | An accepted Diego dodge halves the reload remaining; quiet tamp and optional 0.15 s reload-bar tick. | Moving dodge follows movement; stationary dodge follows aim. Mateo/Datu dodge behavior is retained. |
| **0.4.16 — victory costume redesign** | The three earned looks gain unique 12×14 grids and palettes: radiant obsidian mantle, wing-inspired night sailor, ember-armored watcher. | Same IDs, unlock criteria and worn selections; mechanically neutral. |
| **0.4.17 — charm corrections** | Third Report requires Piercing Lead rank 1; Hunter's Knot removes at most 3 s per Manananggal cooldown. Starter-charm browser fixture corrected. | Fixes an otherwise unreachable third bullet hit and bounds repeated cooldown recovery. Test fixture change is separate from gameplay tuning. Included in the supplied 0.5.0 archive; no separate 0.4.17 archive was found in the inspected inventory. |
| **0.5.0 — Intramuros** | Second selectable map, unlocked after any Arcade victory: adobe walls/eight gates, street grid, Plaza Mayor/fountain, cathedral, Fort Santiago, San Agustin, market and gardens. New Chronicle page and remembered map choice. | Shared map registry/load path; original Manila retained. Same waves, enemies, bosses, twists and music. High Tide uses the west coast, Carabao uses the main road; no piers/junks means no dock bombardment here. |

## Alpha 0.5.0 analysis

### What is new to players

Win Arcade with any hero, return to Mode Select and choose Intramuros beneath the mode choices. Existing recorded victories qualify immediately. The selection persists in settings; a player without a qualifying win falls back to Manila. Starting there discovers its Chronicle article. No new purchase, currency or persistent progression schema is introduced.

The city changes combat geometry: gates and buildings affect paths, line of sight and projectiles; the plaza, market and broad main street offer open fighting space. This is a second environment using the existing combat systems, rather than a new campaign, enemy roster or boss set. The layout is explicitly fictional and represents later stone architecture; it is not presented as a reconstruction of the 1574 battlefield.

### Current code entry points

| Area | Files / contract |
| --- | --- |
| Map registry and switching | `src/04_map.js`: `MAPS`, `mapUnlocked`, `loadMap`; `buildMap()` always resets to Manila. Shared arrays/canvases are repopulated in place. |
| New environment | `src/04_map_intramuros_05.js`: builder and pixel painters. Every walkable tile must connect to `MAP.start`; streets must accommodate the largest bosses. |
| Starting a run | `src/05_game.js`: load chosen map before constructing the player; record `G.run.map`. |
| Menu and remembered choice | `src/07_ui.js`, `src/template.html`: map cards; settings key `siege1574`, field `map`. Locked selections fall back safely. |
| Discovery | `src/01_codex_04.js`, `src/05_game_04.js`: Intramuros article and first-wave discovery. |
| 0.4.17 corrections | `src/01_hero_charms_04.js`, `src/05_game_hero_charms_04.js` and related grant/offer checks: Piercing Lead prerequisite and per-cast Knot recovery cap. |
| Save compatibility | `src/02_save.js`: progression key `siege1574save`, version 6. No new progression fields required by the map. |

Keep the global filename-ordered loading model. `recalc` rebuilds derived stats. Use `hitEnemy` / `hurtPlayer` for damage; `nearEnemies` returns a shared scratch array, so triggered area effects must use deferred bursts. Reserve `TWISTS.foe/hero/shot/sight` for multipliers. Maps must preserve the coastal tide area, compatible carabao lane, walkability, lighting data and optional pier/junk contract.

### Important interpretation of the map tests

The map suite checks that switching to Intramuros and back restores Manila's current map hash. Its comment refers to a 0.4.16 reference, but the executed assertion compares hashes within the current runtime; it does not load an independent 0.4.16 build. Therefore the suite alone is not new proof of cross-version pixel identity. The supplied handoff separately reports that comparison from its development environment.

### Verification for this integration

- Fresh `node build.js` completed. Supplied hosted HTML and standalone HTML exactly match freshly rebuilt outputs.
- Hosted archive contains one HTML page and 30 MP3 files. Every MP3 matches the existing website byte-for-byte; no audio processing needed.
- Fourteen Node suites passed: maps (7 checks), hero charms (21), dodge (24), ending rewards, passives, hero upgrades, Shift fields, High Tide, Rallying, Fire Arrows, barrels, Carabao, Banner and Night Raid.
- Browser gameplay, music and readability suites were attempted here but Chromium failed before loading a page: `socket() failed: Operation not permitted (1)`. No browser assertion is counted as passed by this audit.
- `MAP_HANDOFF.md` reports earlier 37/37 gameplay, 11/11 music and browser readability passes in a different environment, plus performance/simulated pathfinding checks. Those are prior supplied results, not reruns here.
- Physical controller, phone, Firefox/Safari, human balance/comfort and a full human Intramuros run remain unverified. No balance bot comparison was performed during deployment.

### Open refinement work

1. Play each hero through the city gates and crowded streets; check collision, escape space, enemy routing and Diego's shooting lanes.
2. Assess night visibility, dark costumes, hazard telegraphs, High Tide outside the west wall and the Carabao lane.
3. Review ending prose/foregrounds for city runs: inherited narratives still mention the palisade and use the established hero victory scenes.
4. Revisit charm value/offer dilution, ending thresholds, cooldown reset policy and survivor retreat timing with human feedback. The 0.4.17 cap is a targeted correction, not proof of final balance.
5. Update old document pointers when preparing the next source milestone; use this release ledger and `MAP_HANDOFF.md` ahead of older proposed roadmaps.

## Procedure for future releases

For every iteration, append one version entry containing the baseline, player-visible additions, fixes separately from test changes, tuning/save changes, files touched, actual validation and remaining human checks. Link its completed handoff. Keep proposals clearly marked until implemented. Record deployment separately from build completion; a downloadable milestone is not necessarily the live website version.

## Deployment record

Before this integration the website's game and John-cade label were Alpha 0.4.15 (commit `d0d851991a83ab8a90679aec22968fc10a06cc94`). The costume milestone 0.4.16 was delivered as files, not published in that earlier turn. This integration advances the existing `/play/manila/` route directly to the supplied 0.5.0, including all intervening changes. See the accompanying deployment receipt for the final website commit and verification result.
