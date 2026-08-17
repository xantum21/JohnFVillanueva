# Deployment checklist

This package is ready to copy into the existing GitHub Pages repository.

## In GitHub Desktop

1. Pull the current repository.
2. Open the local repository with **Show in Explorer**.
3. Copy everything inside `COPY-CONTENTS-INTO-REPOSITORY` into the repository
   root and choose **Replace** when Windows asks.
4. Confirm GitHub Desktop shows the changed files.
5. Commit with `Deploy website release 2026-08-17-v7.7` and push.

## After GitHub Pages finishes

1. Open `https://johnfvillanueva.com/release-version.txt` and confirm the first
   line says `2026-08-17-v7.7`.
2. Open Timeline and test a year, a category filter, search, an expandable entry,
   an era jump, Play years, and a copied deep link on desktop and phone.
3. Open Work and confirm ACLS and PALS are labeled **current** and Basic EKG is **completed**.
4. Download the public résumé and confirm it opens as one page.
5. Test the professional contact form.
6. Launch Dino Kart Racer in a current desktop browser with hardware acceleration enabled.

## Credential maintenance

- Add expiration dates only when the cards make those dates clear.
- Rebuild the public résumé with `python3 build-public-resume.py` after material résumé changes.
- Run `python3 check-site.py` and the JavaScript syntax checks before every push.

A domain email alias and a genuine third-party recommendation may improve
recruiter conversion later. Neither has been fabricated in this release.
