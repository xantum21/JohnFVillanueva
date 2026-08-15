# Our Playlist — johnfvillanueva.com/our-playlist/

This folder is ready to drop directly into the **root of your existing website repository**.

## Exact destination

Once GitHub Pages publishes your site, this folder should resolve to:

`https://johnfvillanueva.com/our-playlist/`

## Install into your existing GitHub Pages repo

Your repository should look roughly like this after you add it:

```text
your-site-repository/
├── index.html
├── ...your existing site files...
└── our-playlist/
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── playlist-data.js
    └── README.md
```

1. Unzip `our-playlist.zip`.
2. Drag the entire `our-playlist` folder into the **top level / root** of the repository that publishes `johnfvillanueva.com`.
3. Commit and push the change to the branch GitHub Pages uses for your site.
4. After GitHub Pages finishes deploying, visit:
   `https://johnfvillanueva.com/our-playlist/`
5. Use that exact HTTPS URL for the QR code on the physical card.

Do **not** move the individual files into your website root. Keep them together inside the `our-playlist/` folder so the page remains isolated from the rest of your site.

## What is already configured

- All 44 songs and the six-chapter narrative are included.
- Spotify track URIs are already wired to the embedded player.
- Assets use relative paths, so this works correctly from `/our-playlist/` without changing your main site's routing.
- The page includes `noindex,nofollow,noarchive` to discourage search indexing.
- The canonical/share URL is set to `https://johnfvillanueva.com/our-playlist/`.
- No Spotify API key or backend is required.

## Customize later

Open `playlist-data.js` and edit the `window.VALENTINE_PAGE` block near the top:

- `title`
- `recipient`
- `subtitle`
- `note`
- `signoff`

The song data and chapter structure live below that block.

## Privacy note

`noindex` makes the page *unlisted-ish*, not private. Anyone who knows or receives the URL can open it. If you ever want actual access control, that has to be configured at the hosting/domain layer.
