# Contact form status

The contact form is already configured for the Formspree endpoint:

`https://formspree.io/f/xqerdqro`

No destination email address appears in the website source. Formspree handles delivery to the private inbox configured in the Formspree dashboard.

## Integration used

This is a static HTML/CSS/Vanilla JavaScript site hosted on GitHub Pages, so the site uses a progressive-enhancement approach:

- The form has a normal HTML `action` and `method="POST"`, so it still submits if JavaScript is unavailable.
- `assets/site.js` intercepts the submission when JavaScript is available and sends it with `fetch()`.
- The visitor stays on the Contact page and receives inline sending, success, or error feedback.
- No React package, bundler, or third-party JavaScript SDK is required.

## Form fields delivered to Formspree

- Name
- Reply email
- Topic
- Message
- Page source
- Custom email subject
- Honeypot spam field (`_gotcha`)

## Before launch

1. Confirm `xqerdqro` is active in the Formspree dashboard.
2. Confirm the intended private destination inbox is verified there.
3. Send one ordinary test message after deployment.
4. Reply to that test to verify the visitor's email is available as the reply address.
5. Review Formspree spam and notification settings.

The endpoint ID is public by design and is not a password or API secret. Do not place your destination email, Formspree login, recovery codes, or account credentials in the repository.
