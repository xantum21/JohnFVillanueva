# Before you deploy

## 1. Placeholders are filled — but confirm one assumption

All placeholders are filled and `check-site.py` passes. These went in as your
confirmed facts:

| Field | Value |
|---|---|
| BSN completion | April 2027 |
| NCLEX-RN | May–June 2027 |
| Seeking | New-graduate RN residency |
| Specialty | Medical-surgical, telemetry, or acute care — open to any unit with a structured new-grad program |
| Available | June 2027 |
| Sigma Theta Tau | Inducted August 2026 |
| AHA BLS | Current |
| Basic EKG Interpretation | Valid August 1, 2026 |
| ACLS and PALS | Valid August 12, 2026 |

**One item remains an assumption. Change it if it is wrong** — edit `VALUES` in
`fill-placeholders.py` and re-run it, or just find-and-replace in the HTML:

1. **Geography** — I wrote *"Open to roles across the Bay Area and the
   Sacramento region."* If you would relocate further for a good residency, say
   so; it widens your pool considerably. If you will not leave Contra Costa
   County, narrow it.

## 2. Keep the public resume current

`assets/john-villanueva-resume.pdf` was regenerated in August 2026 and now
matches the site's April 2027 BSN date, 3.84 GPA, August 2026 Sigma Theta Tau induction,
NCLEX timing, target role, and availability. Its hours language distinguishes
paid CNA work from supervised clinical training. The source is
`build-public-resume.py`; re-run it whenever those facts change.

The PDF intentionally omits a phone number, home address, and personal email.
It lists only the website and LinkedIn. Keep it privacy-safe because it is
publicly indexed. Basic EKG Interpretation is listed as valid August 1, 2026;
ACLS and PALS are listed as valid August 12, 2026.

The lower-left capability section intentionally translates prior banking,
marketing, web, operations, leadership, and Japanese/cross-cultural experience
into recruiter-readable skills instead of naming individual hobby projects.

## 3. Certification honesty

The public site front-loads the dated credential status: Basic EKG
Interpretation is valid August 1, 2026, while ACLS and PALS are valid August 12,
2026. Keep the effective dates visible so the timeline remains unambiguous.

## 4. The personal page

`dating.html` is unlisted by design:

- `noindex, nofollow, noarchive` robots meta tag
- absent from `sitemap.xml`
- absent from the primary navigation
- **not** blocked in `robots.txt` — this is intentional. A crawler that is
  blocked never reads the noindex tag, which makes the page *more* likely to
  be indexed, not less.

`check-site.py` enforces all four. Share it by direct link only. It is not
private — anyone with the URL can read it — so treat it as public-but-quiet.

## 5. What changed in this pass

- **New:** hiring snapshot on `work.html` — BSN completion, NCLEX timing,
  target role and specialty, availability, geography.
- **New:** advanced certification track (ACLS / PALS / EKG) separated from
  credentials actually held.
- **New:** disclosure explaining how the 1,000+ hours figure is composed.
- **Changed:** homepage "Currently" line now leads with licensure status
  instead of hobbies.
- **Changed:** `contact.html` is professional-only. The "Shared interests or
  friendship" and "Personal connection or dating" lanes are gone; the form now
  offers nursing roles, recruiting, collaboration, and speaking. `site.js`
  topic guidance updated to match.
- **Changed:** Steam moved off the professional contact page to `dating.html`.
  The Play Hub takes its slot, which is a better third card for a recruiter.
- **Fixed:** `play/about.html` was a stale duplicate of the root About page
  with 13 broken links, a missing image, and a canonical pointing elsewhere.
  It is now a redirect stub, with matching entries in `_redirects`.

## 6. August 2026 quality pass

The follow-up audit refreshed time-sensitive nursing facts and the public
resume; hardened navigation, form, filter, and timeline interactions for
keyboard and screen-reader use; replaced missing game art and remote sound
dependencies; removed unsafe leaderboard HTML insertion and arithmetic
evaluation; and aligned the sitemap with canonical URLs. Full details and the
final verification checklist are in `AUDIT-2026-08-10.md`.
