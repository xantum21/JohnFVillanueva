# Deployment checklist

No copy, design, or code editing is required before deployment. This package is
prepared as the post-August-12, 2026 version.

## In GitHub Desktop

1. Pull the current repository.
2. Open the local repository with **Show in Explorer**.
3. Copy everything inside `COPY-CONTENTS-INTO-REPOSITORY` into the repository
   root and choose **Replace** when Windows asks.
4. Confirm GitHub Desktop shows the changed files.
5. Commit with `Deploy website release 2026-08-12-v7` and push.

## After GitHub Pages finishes

1. Open `https://johnfvillanueva.com/release-version.txt` and confirm the first
   line says `2026-08-12-v7`.
2. Open the homepage, Work, Projects, Play Hub, Contact, and the unlisted
   personal page once on desktop and once on a phone.
3. Download the public resume and confirm it opens as one page.
4. Submit one professional and one personal contact-form test and verify both
   messages arrive with the correct subject.
5. Launch Dino Kart Racer in a current desktop browser with hardware
   acceleration enabled.

## Future maintenance only

- Update certification expiration dates when the issued cards provide them.
- Update the BSN, NCLEX-RN, and availability language as eligibility and
  licensure milestones occur.
- Replace the public resume whenever those professional facts change by running
  `python3 build-public-resume.py`.
- A domain email alias and a genuine third-party recommendation could improve
  recruiter conversion later, but neither is required for this deployment and
  neither has been fabricated in the current build.
