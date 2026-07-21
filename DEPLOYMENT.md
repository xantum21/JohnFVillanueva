# Deploying the refined site

This package is an **overlay for the existing JohnFVillanueva repository**. It replaces the portfolio shell while preserving the individual game and quiz files already in the repository.

## Recommended method

1. Back up or create a branch from the current repository.
2. Unzip this package.
3. Copy **the contents of the unzipped folder** into the repository root.
4. Allow matching files to be replaced.
5. Keep the existing individual experiences under `play/`—the overlay does not intentionally delete them.
6. From the repository root, run one of these:

   **Windows:** double-click `APPLY-REFINEMENT-WINDOWS.bat`

   **macOS/Linux:**
   ```bash
   ./apply-refinement.sh
   ```

   Or run the commands manually:
   ```bash
   python tools/finalize-public-html.py
   python tools/validate_site_v3.py
   ```

7. Commit and push the merged files to `main`.
8. Wait for GitHub Pages to finish deploying.

## Why the finalizer is included

The main portfolio and collection pages already use the new shared favicon. The existing individual quiz/game files may still contain older icon references and development labels. `finalize-public-html.py` updates only those public-facing strings and head tags; it does not change question banks, scoring, timers, audio, local storage, or game logic.

## After deployment

Open these routes in a new private/incognito window:

- `/`
- `/projects.html`
- `/timeline.html`
- `/contact.html`
- `/play/`
- `/dino-racers/`

Check the Dino Kart cover at desktop and mobile widths, the pale button inside the dark timeline callout, the dark project-card section, and the favicon on several tabs.

Favicons are cached unusually aggressively. If an old red or mismatched icon remains, close every tab for the domain, clear the site icon/cache, or check in a private window before assuming the deployment failed.

## Safe rollback

Because the package is an overlay, rollback is simply a Git revert of the deployment commit or switching back to the backup branch.
