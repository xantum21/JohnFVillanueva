(() => {
  const page = window.VALENTINE_PAGE;
  const chapters = window.VALENTINE_CHAPTERS;
  let spotifyController = null;
  let pendingTrack = null;

  const $ = (sel) => document.querySelector(sel);

  function fillPageCopy() {
    $('#eyebrow').textContent = page.eyebrow;
    $('#page-title').textContent = page.recipient ? `${page.title}, ${page.recipient}` : page.title;
    $('#subtitle').textContent = page.subtitle;
    $('#note').textContent = page.note;
    $('#signoff').textContent = page.signoff;
    document.title = `${page.title} ♡`;
  }

  function renderNav() {
    const nav = $('#chapter-nav-inner');
    chapters.forEach((chapter) => {
      const a = document.createElement('a');
      a.className = 'chapter-pill';
      a.href = `#chapter-${chapter.part.toLowerCase()}`;
      a.textContent = `${chapter.part} · ${chapter.title}`;
      nav.appendChild(a);
    });
  }

  function renderChapters() {
    const root = $('#chapters');
    chapters.forEach((chapter, chapterIndex) => {
      const section = document.createElement('section');
      section.className = 'chapter';
      section.id = `chapter-${chapter.part.toLowerCase()}`;

      const heading = document.createElement('div');
      heading.className = 'chapter-heading';
      heading.innerHTML = `
        <div class="part-badge" aria-hidden="true">${chapter.icon}</div>
        <div>
          <p class="chapter-kicker">Part ${chapter.part} · ${escapeHtml(chapter.kicker)}</p>
          <h2>${escapeHtml(chapter.title)}</h2>
          <p class="chapter-description">${escapeHtml(chapter.description)}</p>
        </div>`;
      section.appendChild(heading);

      const list = document.createElement('div');
      list.className = 'track-list';
      chapter.tracks.forEach((track) => list.appendChild(trackRow(track)));
      section.appendChild(list);

      const closing = document.createElement('p');
      closing.className = 'chapter-closing';
      closing.textContent = chapterIndex === chapters.length - 1 ? '…and then, hopefully, a very long encore. ♡' : '♡  ·  ♡  ·  ♡';
      section.appendChild(closing);
      root.appendChild(section);
    });
  }

  function trackRow(track) {
    const row = document.createElement('article');
    row.className = 'track';
    row.dataset.uri = track.uri;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'track-main';
    button.setAttribute('aria-label', `Play ${track.title} by ${track.artist}`);
    button.innerHTML = `
      <span class="track-number">${String(track.number).padStart(2,'0')}</span>
      <span class="track-copy">
        <span class="track-title">${escapeHtml(track.title)}</span>
        <span class="track-artist">${escapeHtml(track.artist)}</span>
      </span>`;
    button.addEventListener('click', () => selectTrack(track, row));

    const actions = document.createElement('div');
    actions.className = 'track-actions';
    actions.innerHTML = `
      <a class="stream-link" href="${track.spotifyUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(track.title)} in Spotify">Spotify ↗</a>
      <a class="stream-link" href="${track.youtubeMusicUrl}" target="_blank" rel="noopener noreferrer" aria-label="Search ${escapeHtml(track.title)} in YouTube Music">YT Music ↗</a>`;

    row.append(button, actions);
    return row;
  }

  function selectTrack(track, row) {
    document.querySelectorAll('.track').forEach((el) => el.classList.remove('is-active'));
    row.classList.add('is-active');
    $('#now-title').textContent = track.title;
    $('#now-artist').textContent = track.artist;

    if (spotifyController) {
      spotifyController.loadEntity(track.uri);
      // This originates from a user click; most browsers will allow it, but the Embed still
      // exposes its own play button if autoplay policy blocks programmatic playback.
      setTimeout(() => {
        try { spotifyController.play(); } catch (_) {}
      }, 350);
    } else {
      pendingTrack = track;
    }

    if (window.innerWidth < 760) {
      document.querySelector('.player-shell').scrollIntoView({behavior:'smooth', block:'start'});
    }
  }

  function ambientHearts() {
    const root = document.querySelector('.ambient');
    const glyphs = ['♡','♥','✿'];
    for (let i = 0; i < 18; i++) {
      const span = document.createElement('span');
      span.className = 'floating-heart';
      span.textContent = glyphs[i % glyphs.length];
      span.style.left = `${(i * 31) % 100}%`;
      span.style.fontSize = `${12 + (i % 5) * 4}px`;
      span.style.animationDuration = `${16 + (i % 7) * 3}s`;
      span.style.animationDelay = `${-i * 2.3}s`;
      root.appendChild(span);
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  }

  $('#open-envelope').addEventListener('click', () => {
    $('#envelope').classList.add('is-open');
    document.body.style.overflow = '';
  });
  document.body.style.overflow = 'hidden';

  fillPageCopy();
  renderNav();
  renderChapters();
  ambientHearts();

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const first = chapters[0].tracks[0];
    const options = { width: '100%', height: 152, uri: first.uri };
    IFrameAPI.createController(element, options, (controller) => {
      spotifyController = controller;
      if (pendingTrack) {
        controller.loadEntity(pendingTrack.uri);
        pendingTrack = null;
      }
    });
  };
})();
