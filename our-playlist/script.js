(() => {
  const page = window.VALENTINE_PAGE;
  const chapters = window.VALENTINE_CHAPTERS;
  const allTracks = chapters.flatMap((chapter) => chapter.tracks.map((track) => ({ ...track, chapter })));

  let spotifyController = null;
  let currentTrackIndex = 0;
  let activeLyricsTrack = null;
  let activeLyricsLanguage = 'original';
  let playerIsPaused = true;
  let playerHasStarted = false;
  let spotifyReady = false;
  let spotifyDrawerOpen = false;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

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
      chapter.tracks.forEach((track) => {
        const index = allTracks.findIndex((item) => item.uri === track.uri);
        list.appendChild(trackRow(track, index));
      });
      section.appendChild(list);

      const closing = document.createElement('p');
      closing.className = 'chapter-closing';
      closing.textContent = chapterIndex === chapters.length - 1 ? '…and then, hopefully, a very long encore. ♡' : '♡  ·  ♡  ·  ♡';
      section.appendChild(closing);
      root.appendChild(section);
    });
  }

  function trackRow(track, index) {
    const row = document.createElement('article');
    row.className = `track${index === 0 ? ' is-active' : ''}`;
    row.dataset.uri = track.uri;
    row.dataset.index = String(index);

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
    button.addEventListener('click', () => setActiveTrack(index, { play: true }));

    const actions = document.createElement('div');
    actions.className = 'track-actions';

    const lyricsButton = document.createElement('button');
    lyricsButton.type = 'button';
    const lyricInfo = lyricsConfig(track);
    const hasLyrics = Boolean(lyricInfo.originalLyrics.trim() || lyricInfo.englishLyrics.trim());
    lyricsButton.className = `stream-link lyrics-link${hasLyrics ? ' is-ready' : ' is-pending'}`;
    lyricsButton.textContent = hasLyrics ? 'Lyrics ♡' : 'Lyrics · soon';
    lyricsButton.setAttribute('aria-label', `View lyrics for ${track.title}`);
    lyricsButton.addEventListener('click', () => openLyrics(track));

    actions.innerHTML = `
      <a class="stream-link" href="${track.spotifyUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(track.title)} in Spotify">Spotify ↗</a>
      <a class="stream-link" href="${track.youtubeMusicUrl}" target="_blank" rel="noopener noreferrer" aria-label="Search ${escapeHtml(track.title)} in YouTube Music">YT Music ↗</a>`;
    actions.prepend(lyricsButton);

    row.append(button, actions);
    return row;
  }

  function setActiveTrack(index, options = {}) {
    const { play = false, reveal = false } = options;
    if (index < 0 || index >= allTracks.length) return;

    currentTrackIndex = index;
    const track = allTracks[index];

    $$('.track').forEach((row) => row.classList.toggle('is-active', Number(row.dataset.index) === index));
    updatePlayerTrackCopy(track);
    updateNavigationButtons();
    resetProgress();

    if (spotifyController) {
      try {
        spotifyController.loadEntity(track.uri);
        playerHasStarted = false;
        playerIsPaused = true;
        if (play) {
          // This call comes directly from a user action (row/next/previous button).
          // Browser autoplay rules may still require a tap on Play in some cases.
          try { spotifyController.play(); } catch (_) {}
          playerIsPaused = false;
          playerHasStarted = true;
        }
      } catch (_) {
        setPlayerStatus('Spotify could not load this preview. Try the Spotify link on the song.');
      }
    } else if (play) {
      setPlayerStatus('Spotify is still loading — tap Play again in a moment.');
    }

    updatePlayButton();

    if (reveal) {
      const row = document.querySelector(`.track[data-index="${index}"]`);
      if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function updatePlayerTrackCopy(track) {
    $('#now-title').textContent = track.title;
    $('#now-artist').textContent = track.artist;
    $('#player-track-number').textContent = `${String(track.number).padStart(2,'0')} / ${allTracks.length}`;
    const lyricInfo = lyricsConfig(track);
    const hasLyrics = Boolean(lyricInfo.originalLyrics.trim() || lyricInfo.englishLyrics.trim());
    $('#player-lyrics').setAttribute('aria-label', `View lyrics for ${track.title}`);
    $('#player-lyrics').textContent = hasLyrics ? 'Lyrics ♡' : 'Lyrics · soon';
    $('#player-lyrics').classList.toggle('is-ready', hasLyrics);
  }

  function updateNavigationButtons() {
    $('#player-prev').disabled = currentTrackIndex === 0;
    $('#player-next').disabled = currentTrackIndex === allTracks.length - 1;
  }

  function updatePlayButton() {
    const button = $('#player-play');
    const icon = $('#player-play-icon');
    const playing = playerHasStarted && !playerIsPaused;
    icon.textContent = playing ? '❚❚' : '▶';
    button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    button.setAttribute('title', playing ? 'Pause' : 'Play');
    button.classList.toggle('is-playing', playing);
  }

  function setPlayerStatus(text) {
    $('#player-status').textContent = text;
  }

  function resetProgress() {
    $('#player-progress-fill').style.width = '0%';
    $('#player-time').textContent = '0:00 / --:--';
  }

  function syncPlaybackState(data) {
    if (!data) return;
    const { playingURI, isPaused, isBuffering, duration, position } = data;

    if (playingURI) {
      const index = allTracks.findIndex((track) => track.uri === playingURI);
      if (index >= 0 && index !== currentTrackIndex) {
        currentTrackIndex = index;
        $$('.track').forEach((row) => row.classList.toggle('is-active', Number(row.dataset.index) === index));
        updatePlayerTrackCopy(allTracks[index]);
        updateNavigationButtons();
      }
    }

    playerIsPaused = Boolean(isPaused);
    if (position > 0 || !isPaused) playerHasStarted = true;
    updatePlayButton();

    if (duration > 0) {
      const pct = Math.max(0, Math.min(100, (position / duration) * 100));
      $('#player-progress-fill').style.width = `${pct}%`;
      $('#player-time').textContent = `${formatTime(position)} / ${formatTime(duration)}`;
    }

    setPlayerStatus(isBuffering ? 'Buffering Spotify preview…' : (playerIsPaused ? 'Paused' : 'Playing through Spotify embed'));
  }

  function formatTime(ms) {
    if (!Number.isFinite(ms) || ms < 0) return '--:--';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  function showStickyPlayer() {
    const dock = $('#sticky-player');
    dock.classList.add('is-visible');
    dock.setAttribute('aria-hidden', 'false');
    document.body.classList.add('player-visible');
  }

  function revealCurrentTrack() {
    const row = document.querySelector(`.track[data-index="${currentTrackIndex}"]`);
    if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function toggleSpotifyDrawer() {
    spotifyDrawerOpen = !spotifyDrawerOpen;
    const drawer = $('#spotify-drawer');
    const button = $('#player-spotify-toggle');
    drawer.classList.toggle('is-open', spotifyDrawerOpen);
    drawer.setAttribute('aria-hidden', spotifyDrawerOpen ? 'false' : 'true');
    button.setAttribute('aria-expanded', spotifyDrawerOpen ? 'true' : 'false');
    button.textContent = spotifyDrawerOpen ? 'Spotify ▾' : 'Spotify ▴';
  }

  function lyricsConfig(track) {
    const configured = (window.VALENTINE_LYRICS || {})[track.uri] || {};
    const isTranslated = Boolean(configured.englishLabel || configured.englishLyrics);
    return {
      originalLanguage: configured.originalLanguage || 'English',
      originalLabel: configured.originalLabel || 'Lyrics',
      englishLabel: configured.englishLabel || 'English',
      originalLyrics: configured.originalLyrics || '',
      englishLyrics: configured.englishLyrics || '',
      sourceLabel: configured.sourceLabel || '',
      hasTranslation: isTranslated
    };
  }

  function lyricsTheme(track) {
    return (window.VALENTINE_LYRIC_THEMES || {})[track.uri] || {
      name: 'Love Letter', motif: '♡ ✦ ♡', texture: 'soft', paper: '#fffaf8', ink: '#3d2430', accent: '#d94f70', accent2: '#f5b6c6'
    };
  }

  function applyLyricsTheme(track) {
    const theme = lyricsTheme(track);
    const sheet = $('#lyrics-sheet');
    sheet.dataset.texture = theme.texture || 'soft';
    sheet.style.setProperty('--letter-paper', theme.paper || '#fffaf8');
    sheet.style.setProperty('--letter-ink', theme.ink || '#3d2430');
    sheet.style.setProperty('--letter-accent', theme.accent || '#d94f70');
    sheet.style.setProperty('--letter-accent-2', theme.accent2 || '#f5b6c6');
    $('#lyrics-theme-label').textContent = theme.name || 'Love Letter';
    $('#lyrics-motif').textContent = theme.motif || '♡';
  }

  function openLyrics(track) {
    activeLyricsTrack = track;
    activeLyricsLanguage = 'original';
    applyLyricsTheme(track);
    $('#lyrics-title').textContent = track.title;
    $('#lyrics-artist').textContent = track.artist;
    renderLyricsTabs();
    renderLyricsBody();
    renderLanguageHeader();

    const modal = $('#lyrics-modal');
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lyrics-open');
    $('#lyrics-close').focus();
  }

  function closeLyrics() {
    const modal = $('#lyrics-modal');
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lyrics-open');
    activeLyricsTrack = null;
  }

  function renderLanguageHeader() {
    const config = lyricsConfig(activeLyricsTrack);
    const header = $('#lyrics-language-header');
    const sheet = $('#lyrics-sheet');
    sheet.dataset.language = activeLyricsLanguage;
    if (config.hasTranslation) {
      header.textContent = activeLyricsLanguage === 'english'
        ? `English translation · ${config.originalLanguage} → English`
        : `Original language · ${config.originalLabel}`;
    } else {
      header.textContent = `${config.originalLanguage} original`;
    }
  }

  function renderLyricsTabs() {
    const tabs = $('#lyrics-tabs');
    tabs.innerHTML = '';
    const config = lyricsConfig(activeLyricsTrack);

    if (!config.hasTranslation) {
      tabs.hidden = true;
      return;
    }

    tabs.hidden = false;
    [
      ['original', config.originalLabel],
      ['english', config.englishLabel]
    ].forEach(([language, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `lyrics-tab${activeLyricsLanguage === language ? ' is-active' : ''}`;
      button.textContent = label;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', activeLyricsLanguage === language ? 'true' : 'false');
      button.addEventListener('click', () => {
        activeLyricsLanguage = language;
        renderLyricsTabs();
        renderLyricsBody();
        renderLanguageHeader();
      });
      tabs.appendChild(button);
    });
  }

  function renderLyricsBody() {
    const body = $('#lyrics-body');
    const note = $('#lyrics-note');
    const config = lyricsConfig(activeLyricsTrack);
    const text = activeLyricsLanguage === 'english' ? config.englishLyrics : config.originalLyrics;

    body.innerHTML = '';
    body.scrollTop = 0;

    if (text.trim()) {
      const prompt = document.createElement('div');
      prompt.className = 'lyrics-scroll-prompt';
      prompt.innerHTML = `<span aria-hidden="true">↡</span><strong>Unfold the letter</strong><span>Scroll down to reveal the next lines.</span>`;
      body.appendChild(prompt);

      const lyrics = document.createElement('div');
      lyrics.className = 'lyrics-text';
      parseLyricsLines(text).forEach((item, idx) => {
        if (item.type === 'gap') {
          const spacer = document.createElement('div');
          spacer.className = 'lyric-gap';
          lyrics.appendChild(spacer);
          return;
        }

        const line = document.createElement('div');
        line.className = item.type === 'section' ? 'lyric-section' : 'lyric-line';
        line.textContent = item.text;
        if (idx < 4) line.classList.add('is-revealed');
        lyrics.appendChild(line);
      });
      body.appendChild(lyrics);
      attachLyricsReveal(body);

      note.textContent = config.hasTranslation
        ? `${activeLyricsLanguage === 'english' ? 'English translation' : config.originalLanguage + ' original'} · scroll-to-unfold letter view · not time-synced`
        : `${config.sourceLabel || 'Lyrics supplied for this project'} · scroll-to-unfold letter view · not time-synced`;
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'lyrics-placeholder';
      placeholder.innerHTML = `
        <div class="placeholder-heart" aria-hidden="true">♡</div>
        <strong>This letter is waiting for its words.</strong>
        <p>The stationery, language toggle, and song-specific visual theme are ready. Add the companion lyric text later in <code>lyrics-data.js</code>.</p>`;
      body.appendChild(placeholder);
      note.textContent = config.hasTranslation
        ? `${config.originalLanguage} ↔ English toggle is already wired for this song.`
        : 'This song will use one lyrics view once its text is added.';
    }
  }

  function parseLyricsLines(text) {
    return String(text).replace(/\r/g, '').split('\n').map((raw) => {
      const line = raw.replace(/\s+$/,'');
      const trimmed = line.trim();
      if (!trimmed) return { type: 'gap', text: '' };
      if (/^\[[^\]]+\]$/.test(trimmed)) return { type: 'section', text: trimmed };
      return { type: 'line', text: line };
    });
  }

  function attachLyricsReveal(scroller) {
    const revealables = [...scroller.querySelectorAll('.lyric-line, .lyric-section')];
    if (!revealables.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-revealed');
        });
      }, { root: scroller, threshold: 0.22, rootMargin: '0px 0px -8% 0px' });

      revealables.forEach((node) => observer.observe(node));
    } else {
      revealables.forEach((node) => node.classList.add('is-revealed'));
    }

    let promptHidden = false;
    const prompt = scroller.querySelector('.lyrics-scroll-prompt');
    const onScroll = () => {
      if (!prompt || promptHidden) return;
      if (scroller.scrollTop > 18) {
        prompt.classList.add('is-dismissed');
        promptHidden = true;
      }
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
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
    showStickyPlayer();
  });

  $('#player-prev').addEventListener('click', () => setActiveTrack(currentTrackIndex - 1, { play: true }));
  $('#player-next').addEventListener('click', () => setActiveTrack(currentTrackIndex + 1, { play: true }));
  $('#player-restart').addEventListener('click', () => {
    if (!spotifyController) return;
    try { spotifyController.restart(); } catch (_) {}
  });
  $('#player-play').addEventListener('click', () => {
    if (!spotifyController) {
      setPlayerStatus('Spotify is still loading…');
      return;
    }
    try {
      if (!playerHasStarted) {
        spotifyController.play();
        playerHasStarted = true;
        playerIsPaused = false;
      } else {
        spotifyController.togglePlay();
        playerIsPaused = !playerIsPaused;
      }
      updatePlayButton();
    } catch (_) {
      setPlayerStatus('Playback was blocked by the browser — open the Spotify drawer and tap its play button.');
    }
  });
  $('#player-lyrics').addEventListener('click', () => openLyrics(allTracks[currentTrackIndex]));
  $('#player-spotify-toggle').addEventListener('click', toggleSpotifyDrawer);
  $('#player-track-button').addEventListener('click', revealCurrentTrack);

  $('#lyrics-close').addEventListener('click', closeLyrics);
  $$('[data-close-lyrics]').forEach((el) => el.addEventListener('click', closeLyrics));
  document.addEventListener('keydown', (event) => {
    const modalOpen = $('#lyrics-modal').classList.contains('is-visible');
    const playerVisible = document.body.classList.contains('player-visible');
    const typingOrControl = /INPUT|TEXTAREA|BUTTON|A/.test(document.activeElement?.tagName || '');

    if (event.key === 'Escape' && modalOpen) closeLyrics();
    if (event.key === ' ' && playerVisible && !modalOpen && !typingOrControl) {
      event.preventDefault();
      $('#player-play').click();
    }
    if (event.key === 'ArrowRight' && playerVisible && !modalOpen && !typingOrControl && currentTrackIndex < allTracks.length - 1) {
      event.preventDefault();
      setActiveTrack(currentTrackIndex + 1, { play: true });
    }
    if (event.key === 'ArrowLeft' && playerVisible && !modalOpen && !typingOrControl && currentTrackIndex > 0) {
      event.preventDefault();
      setActiveTrack(currentTrackIndex - 1, { play: true });
    }
  });

  document.body.style.overflow = 'hidden';
  fillPageCopy();
  renderNav();
  renderChapters();
  ambientHearts();
  updatePlayerTrackCopy(allTracks[0]);
  updateNavigationButtons();

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const first = allTracks[0];
    const options = { width: '100%', height: 152, uri: first.uri };
    IFrameAPI.createController(element, options, (controller) => {
      spotifyController = controller;
      spotifyReady = true;
      setPlayerStatus('Ready · Spotify embed');

      try {
        controller.addListener('ready', () => {
          spotifyReady = true;
          setPlayerStatus('Ready · Spotify embed');
        });
        controller.addListener('playback_started', (event) => {
          playerHasStarted = true;
          playerIsPaused = false;
          if (event?.data?.playingURI) {
            const index = allTracks.findIndex((track) => track.uri === event.data.playingURI);
            if (index >= 0) {
              currentTrackIndex = index;
              $$('.track').forEach((row) => row.classList.toggle('is-active', Number(row.dataset.index) === index));
              updatePlayerTrackCopy(allTracks[index]);
              updateNavigationButtons();
            }
          }
          updatePlayButton();
        });
        controller.addListener('playback_update', (event) => syncPlaybackState(event?.data));
      } catch (_) {}

      // If someone clicked a different row before Spotify finished loading, keep the selected track.
      if (currentTrackIndex !== 0) {
        try { controller.loadEntity(allTracks[currentTrackIndex].uri); } catch (_) {}
      }
    });
  };
})();
