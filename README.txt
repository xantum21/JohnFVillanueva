JOHN F. VILLANUEVA — DEPLOYMENT-READY WEBSITE

This folder contains the portfolio, privacy-safe Formspree contact form,
standardized favicons, public resume, and all 23 playable experiences.

Run `python3 check-site.py` before deployment. The validator checks local links,
page metadata, canonical URLs, sitemap coverage, navigation consistency,
privacy rules, form labels, and the unlisted personal page.

DEPLOYMENT
1. Download or clone the current GitHub repository and keep that copy as a backup.
2. Copy the CONTENTS of this folder into the repository so index.html, CNAME,
   assets/, and play/ remain at the repository root. Review the resulting diff;
   do not remove repository-only files unless the diff confirms they are obsolete.
3. Run `python3 check-site.py` and preview the changed pages locally.
4. Commit the reviewed changes to the GitHub Pages publishing branch.
5. Wait for Pages deployment to finish, then open the site in an incognito window.
6. Test the professional contact form and confirm the message arrives through Formspree.
7. Open https://johnfvillanueva.com/release-version.txt and confirm it says
   `2026-08-12-v7.4`; this distinguishes the current release from older downloads.

The custom domain is `johnfvillanueva.com`; keep `CNAME` and `.nojekyll` at the
repository root. See `RELEASE-NOTES-2026-08-12-v7.4.md` for this pass's verification summary.

GitHub Pages does not apply the Netlify-style `_headers` or `_redirects` files.
They remain in this package only for host portability; the redirect pages also
contain HTML/JavaScript fallbacks that work on GitHub Pages. Configure the custom
domain in the repository's Pages settings, verify it at the GitHub account level,
enable Enforce HTTPS when available, and avoid wildcard DNS records.
The included `.github/workflows/site-check.yml` repeats the structural, JavaScript,
Python, CNAME, and `.nojekyll` checks on every push and pull request.

Form endpoint: https://formspree.io/f/xqerdqro
The private destination email is not present in the website source.
