JOHN VILLANUEVA — INTEGRATED GITHUB PAGES REPOSITORY

WHAT IS INCLUDED
- Complete portfolio site at the repository root
- /play/ interactive-media hub
- 14 Filipino / Tagalog lesson quizzes
- 2 Spanish lesson quizzes
- 4 Pharmacology quiz banks
- Math Quiz Game
- Romaji to Kana Game
- Preserved old routes: /pharmacology, /spanish, /filipino, /math-game, /kana-game, /dino-racers
- CNAME and .nojekyll files for GitHub Pages

UPLOAD
1. Keep a copy of the current repository as a rollback.
2. Delete the obsolete nested package folder from GitHub.
3. Upload the CONTENTS of this folder to the repository root.
4. Confirm index.html, play/, assets/, CNAME, and .nojekyll are visible at the top level.
5. Commit to main and wait for the Pages deployment to turn green.
6. Test https://johnfvillanueva.com/play/

PLAY SUBDOMAIN
The new hub lives at https://johnfvillanueva.com/play/ inside this repository.
Your existing play.johnfvillanueva.com DNS record currently points to GoHighLevel so Dino Kart keeps working.
The easiest no-DNS-breakage setup is to make the ROOT page of the GoHighLevel play site redirect to:
  https://johnfvillanueva.com/play/
while keeping:
  https://play.johnfvillanueva.com/dino-racers
for the current Dino Kart build.

IMPORTANT DINO NOTE
The Dino Kart source HTML was not included in the uploaded batch. The repository therefore preserves /dino-racers/ as a launch bridge to the existing live GoHighLevel game. Add the actual Dino source later to make it fully repository-hosted.
