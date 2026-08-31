(() => {
  const STORAGE_KEY = 'our-playlist-access-v1';
  const PASSWORD_SHA256 = '41e1ab5f6a32e9bbbdfe36806f9667426ae85ab99451d3efc0f62c56ff6e7a37';

  const gate = document.getElementById('access-gate');
  const form = document.getElementById('access-form');
  const input = document.getElementById('access-password');
  const error = document.getElementById('access-error');
  const button = document.getElementById('access-submit');

  if (!gate || !form || !input || !button) return;

  const alreadyUnlocked = (() => {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1'; }
    catch (_) { return false; }
  })();

  function unlock({ animate = true } = {}) {
    document.documentElement.classList.remove('access-locked');
    document.body.classList.remove('access-locked-body');

    if (!animate) {
      gate.hidden = true;
      return;
    }

    gate.classList.add('is-unlocking');
    window.setTimeout(() => { gate.hidden = true; }, 360);
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  if (alreadyUnlocked) {
    unlock({ animate: false });
    return;
  }

  document.body.classList.add('access-locked-body');
  window.setTimeout(() => input.focus({ preventScroll: true }), 60);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!value) {
      error.textContent = 'Enter the password to continue.';
      input.focus();
      return;
    }

    button.disabled = true;
    button.textContent = 'Opening…';
    error.textContent = '';
    gate.classList.remove('is-error');

    try {
      const digest = await sha256(value);
      if (digest === PASSWORD_SHA256) {
        try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
        unlock({ animate: true });
        return;
      }

      gate.classList.add('is-error');
      error.textContent = 'That password isn’t right.';
      input.value = '';
      input.focus();
      window.setTimeout(() => gate.classList.remove('is-error'), 420);
    } catch (_) {
      error.textContent = 'Couldn’t verify the password in this browser.';
    } finally {
      button.disabled = false;
      button.textContent = 'Open the playlist';
    }
  });
})();
