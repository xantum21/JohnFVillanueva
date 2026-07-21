# Deployment instructions

This ZIP is an **overlay for the existing `xantum21/JohnFVillanueva` repository**. It intentionally does not duplicate the large image library, existing résumé PDF, or individual game/quiz files already present in the repository.

## Safe merge method

1. Download and unzip this package.
2. Open the package folder and copy **its contents** into the root of the existing repository—not the outer folder itself.
3. Allow files with the same names to be replaced. The replacement is intentional for the core pages, shared CSS/JS, sitemap, robots file, redirects, and Play Hub index.
4. Do **not** delete the existing `assets` files that are not included here. This overlay adds `assets/site.css` and `assets/site.js` and references the image/PDF assets already in the repository.
5. Do **not** delete the existing collection folders or their individual experiences: `dino-racers`, `pharmacology`, `math-game`, `kana-game`, `spanish`, and `filipino`.
6. From the repository root, run `python tools/clean-public-titles.py` once. This removes development/version labels from the existing quiz pages without changing their logic.
7. Commit and push to `main`. Confirm the deployment workflow completes successfully.

## Recommended repository cleanup

- Delete the nested duplicate package directory `johnfvillanueva_projects_layout_fixed_package` after confirming the root-level site works.
- Retire any old GoHighLevel routes or pages still serving `/education-experience`, `/finance`, `/marketing`, `/ai`, `/management`, or `/entrepreneurship`. This package provides static redirect fallbacks and a `_redirects` file, but an external platform can still override them if it continues to own those routes.
- Point `play.johnfvillanueva.com` to `https://johnfvillanueva.com/play/` with a permanent redirect if the subdomain should remain the memorable entry point.

## Post-deployment checks

- Open Home, About, Work, Projects, Life, Timeline, Contact, and `/play/` on desktop and mobile.
- Test the mobile menu, project filters, timeline filters, email copy button, PDF download, all external profile links, and all six collection links.
- In Google Search Console, submit the updated sitemap and request reindexing for the home page, Work, Projects, Life, and the legacy redirect URLs.
- Confirm the legacy URLs return a permanent redirect rather than a second page with outdated copy.
