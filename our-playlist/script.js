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
    $('#final-title').textContent = page.finalTitle || 'End of playlist.';
    $('#final-note').textContent = page.finalNote || 'Hopefully not the end of the story. ♡';
    $('#final-aside').textContent = page.finalAside || '';

    const envelopeFor = $('#envelope-for');
    const envelopeDate = $('#envelope-date');
    const forText = page.envelopeFor || (page.recipient ? `For ${page.recipient} ♡` : '');
    if (forText) { envelopeFor.textContent = forText; envelopeFor.hidden = false; }
    if (page.date) { envelopeDate.textContent = page.date; envelopeDate.hidden = false; }
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
      closing.textContent = chapterIndex === chapters.length - 1
        ? '…and then, hopefully, a very long encore. ♡'
        : `End of Part ${chapter.part} · ♡`;
      section.appendChild(closing);
      root.appendChild(section);

      if (chapterIndex < chapters.length - 1 && chapter.transition) {
        const next = chapters[chapterIndex + 1];
        const bridge = document.createElement('aside');
        bridge.className = 'story-transition';
        bridge.setAttribute('aria-label', `Transition from Part ${chapter.part} to Part ${next.part}`);
        bridge.innerHTML = `
          <span class="transition-line" aria-hidden="true"></span>
          <div class="transition-copy">
            <p class="transition-kicker">Part ${chapter.part} → Part ${next.part}</p>
            <p>${escapeHtml(chapter.transition)}</p>
          </div>
          <span class="transition-heart" aria-hidden="true">♡</span>`;
        root.appendChild(bridge);
      }
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
    const hasLyrics = lyricInfo.views.some((view) => String(view.text || '').trim());
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
    $('#player-chapter').textContent = `${track.chapter.part} · ${track.chapter.title}`;
    const lyricInfo = lyricsConfig(track);
    const hasLyrics = lyricInfo.views.some((view) => String(view.text || '').trim());
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
    const views = [
      {
        key: 'original',
        label: configured.originalLabel || 'Lyrics',
        language: configured.originalLanguage || 'English',
        text: configured.originalLyrics || ''
      }
    ];

    if (configured.secondaryLabel || configured.secondaryLyrics) {
      views.push({
        key: 'secondary',
        label: configured.secondaryLabel || 'Romaji',
        language: configured.secondaryLanguage || 'Romanized',
        text: configured.secondaryLyrics || ''
      });
    }

    if (configured.englishLabel || configured.englishLyrics) {
      views.push({
        key: 'english',
        label: configured.englishLabel || 'English',
        language: configured.englishLanguage || 'English translation',
        text: configured.englishLyrics || ''
      });
    }

    return {
      sourceLabel: configured.sourceLabel || '',
      views,
      hasTranslation: views.length > 1
    };
  }

  function currentLyricsView(config) {
    return config.views.find((view) => view.key === activeLyricsLanguage) || config.views[0];
  }

  function containsJapanese(text) {
    return /[぀-ヿ㐀-鿿]/.test(String(text || ''));
  }

  function lyricsTheme(track) {
    return (window.VALENTINE_LYRIC_THEMES || {})[track.uri] || {
      name: 'Love Letter', motif: '♡ ✦ ♡', texture: 'soft', paper: '#fffaf8', ink: '#3d2430', accent: '#d94f70', accent2: '#f5b6c6'
    };
  }

  function letterDetails(track) {
    const byUri = {
      'spotify:track:782sFc96ACqG89GlvPN9S2': { stamp: 'CRUSH FILE', seal: '?', notes: ['looked at you / looked away', 'heart acting ridiculous'] },
      'spotify:track:1I75ohulScHJpoMmE9Xbfl': { stamp: 'MAYBE?', seal: '☾', notes: ['does she know?', 'every heartbeat says ask'] },
      'spotify:track:5JJ8C9f06xhUrVRk44maoI': { stamp: 'YES / MAYBE', seal: '✓', notes: ['tiny checkbox energy', 'please say it back'] },
      'spotify:track:6BJHsLiE47Sk0wQkuppqhr': { stamp: 'FROM PAGE ONE', seal: '01', notes: ['confession draft', 'cupids involved apparently'] },
      'spotify:track:2AHZHeLTPuGILKyr4l8uTU': { stamp: 'HERO NOTE', seal: 'S', notes: ['trying to be brave', 'hope you like me as I am'] },
      'spotify:track:3Z1kZKYfRC8iRXnYeC5sCJ': { stamp: 'IT CHANGED', seal: '↺', notes: ['before / after', 'something shifted yesterday'] },
      'spotify:track:6J9tgHIE8qdy5ulg3c9SwG': { stamp: 'TRACK 01', seal: '♪', notes: ['our soundtrack starts here', 'concert for two'] },
      'spotify:track:1ZWFt1f25IDDHsyx2rlcSV': { stamp: 'MAKE YOU MINE', seal: '❀', notes: ['this is where the sparks get bold', 'future proposal energy'] },
      'spotify:track:5FNS5Vj69AhRGJWjhrAd01': { stamp: 'DANCE CARD', seal: '♫', notes: ['one chance', 'hold my hand already'] },
      'spotify:track:72R0X0h8YaxYNpegeoOl0M': { stamp: 'SLOWLY', seal: '❦', notes: ['do not run', 'stay with me tonight'] },
      'spotify:track:25cUhiAod71TIQSNicOaW3': { stamp: 'ADORN', seal: '✦', notes: ['put love on like jewelry', 'midnight satin mood'] },
      'spotify:track:3acMyDFxlQ2O5l3c9pJeQ4': { stamp: 'FOR LIFE', seal: '∞', notes: ['blurred every line', 'love meets lust'] },
      'spotify:track:0aVsVsOYDSEEigiwTrIab9': { stamp: 'AFTER DARK', seal: '☾', notes: ['intimate letter, softer ending', 'let me stay for the rest of ours'] },
      'spotify:track:0sYfwwEy0UyNizk6na4zGm': { stamp: 'CITRUS NOTE', seal: '○', notes: ['craving your presence', 'sun-warm skin and late-night thoughts'] },
      'spotify:track:2amIuarebiXTBtwMubGA3S': { stamp: 'WITH YOU', seal: '☀', notes: ['the whole world falls away', 'come-home kind of love'] },
      'spotify:track:4McP7SOTK2NWkydOcDCajC': { stamp: '恋文', seal: '愛', notes: ['three ways to read the same feeling', '日本語 · Romaji · English'] },
      'spotify:track:1dB1kzLOjTcmSHttRd8bnV': { stamp: 'OH.', seal: '…', notes: ['yep. definitely in love', 'worth the wait'] },
      'spotify:track:3J4eGb9Ufadl5eNUgktO9t': { stamp: 'FATED', seal: '✦', notes: ['dreamed you into life', 'best friend / home / forever'] },
      'spotify:track:018Idkvf82hi44UZmIXiGB': { stamp: 'ONE OF ONE', seal: '◇', notes: ['never seen anything quite like you', 'tonight is the line that matters'] },
      'spotify:track:1bQhZOoXYqjXs7u7rFXo0h': { stamp: 'YOU + ME', seal: '⇄', notes: ['two-sided note', 'steady little us'] },
      'spotify:track:416dC1qBvWJcbgub6zCnJI': { stamp: 'WISH', seal: '❀', notes: ['make a wish, keep it', 'soft hair / softer heart'] },
      'spotify:track:2iXdwVdzA0KrI2Q0iZNJbX': { stamp: 'BETTER TOGETHER', seal: '☀', notes: ['simple things / right person', 'kitchen-table forever'] },
      'spotify:track:6XPmY4NWIqq0CofdhhjyP4': { stamp: 'LUCKY ME', seal: '✦', notes: ['golden-ticket kind of gratitude', 'how did I get this lucky?'] },
      'spotify:track:1Xwh83YOFQARZ3QXscP123': { stamp: 'MADE FOR YOU', seal: '♡', notes: ['stitched together', 'soft certainty'] },
      'spotify:track:114xcQz8sZ6fxRBTZmgmNE': { stamp: 'BETTER HALF', seal: '½', notes: ['two halves / one page', 'balanced in the best way'] },
      'spotify:track:78zUxUPvONPgMIt46q5be6': { stamp: 'KEEP THIS', seal: '♡', notes: ['please keep loving me', 'fold and keep close'] },
      'spotify:track:3odrUVQ9tvRpkC9II2oWzx': { stamp: 'STILL FALLING', seal: '↓', notes: ['falling petals / falling harder', 'and somehow still more'] },
      'spotify:track:1p6rk9R8SCum97WnvGNt6O': { stamp: 'ALWAYS / FOREVER', seal: '∞', notes: ['infinity margins', 'the long answer is yes'] },
      'spotify:track:4WgViu9gw3qYOr3iF9OuLG': { stamp: 'PALAGI', seal: '✿', notes: ['kundiman letter', 'always, always, always'] },
      'spotify:track:03x2rVJRFUrvwlfxoHd9Mo': { stamp: 'POSTMARK: US', seal: '→', notes: ['road-trip postcard energy', 'just you and I is enough'] },
      'spotify:track:1xscBC6UV21t0sMCgu0mLi': { stamp: 'WE GROW', seal: '✿', notes: ['grow side by side', 'staying is part of the growth'] },
      'spotify:track:6CgNoAbFJ4Q4Id4EjtbXlC': { stamp: 'PHOTO BACK', seal: '▣', notes: ['write this on the back of the photo', 'save this memory'] },
      'spotify:track:1hzWoLgh1yQ4H9fqIvOFMP': { stamp: 'WHOLE LIVES', seal: '•', notes: ['timeline in ink', 'not just moments — whole lives'] },
      'spotify:track:2yCte16wVT6slIJ2Tqm9ML': { stamp: 'HOMEWARD', seal: '⌂', notes: ['carry you home', 'love with a front door'] },
      'spotify:track:4HcSK64Cy7JJ5gv1Txzhzo': { stamp: 'BOOKPLATE', seal: 'Vol.', notes: ['the book of love is dog-eared now', 'return to us, always'] },
      'spotify:track:2MWOqewf5j0qf2b6S5J6cS': { stamp: 'WILL YOU?', seal: '✧', notes: ['proposal note', 'this is the page with the question'] },
      'spotify:track:0tgVpDi06FyKpA1z0VMD4v': { stamp: 'FIRST DANCE', seal: '1·2·3', notes: ['vellum and candlelight', 'dancing barefoot in the margins'] },
      'spotify:track:4t6qMeHgbxWod2SLokiSQp': { stamp: 'VOW CARD', seal: '✉', notes: ['ordinary → extraordinary', 'quiet promise, huge meaning'] },
      'spotify:track:2kfGoV9a5dbSKCNmUWH2ZF': { stamp: 'TURNING PAGE', seal: '↗', notes: ['new chapter, same love', 'one page into the next'] },
      'spotify:track:5himtcBG5IetEOAYuB1Lu1': { stamp: 'NEVER STOP', seal: '∞', notes: ['wedding ribbon edition', 'keep choosing, keep going'] },
      'spotify:track:4mdOqt3AiUJbBXL02aa5iw': { stamp: '115,000,000 KM', seal: '▣', notes: ['our life as a film reel', 'leave scratches — keep the story'] },
      'spotify:track:77enz5hl8RicxrbPB56VXQ': { stamp: 'WHOLE LIFE', seal: '✦', notes: ['constellation promise', 'for the long horizon'] },
      'spotify:track:6r9o3XGxSYFlX6ktsEqIbK': { stamp: 'UNTIL OUR HAIR TURNS WHITE', seal: '⌛', notes: ['aged paper / steady heart', 'the ending is still us'] }
    };

    const resolved = allTracks.find((item) => item.uri === track.uri);
    const part = resolved?.chapter?.part || 'III';
    let chapterForm = ({ I:'notebook', II:'folded', III:'romance', IV:'keepsake', V:'stationery', VI:'vow' })[part] || 'letter';
    if (track.uri === 'spotify:track:4mdOqt3AiUJbBXL02aa5iw' ||
        track.uri === 'spotify:track:77enz5hl8RicxrbPB56VXQ' ||
        track.uri === 'spotify:track:6r9o3XGxSYFlX6ktsEqIbK') chapterForm = 'aged';

    return {
      form: chapterForm,
      stamp: 'LOVE STORY',
      seal: '♡',
      notes: ['a little note in the margin'],
      ...(byUri[track.uri] || {})
    };
  }

  function applyLyricsTheme(track) {
    const theme = lyricsTheme(track);
    const detail = letterDetails(track);
    const sheet = $('#lyrics-sheet');
    sheet.dataset.texture = theme.texture || 'soft';
    sheet.dataset.form = detail.form || 'letter';
    sheet.style.setProperty('--letter-paper', theme.paper || '#fffaf8');
    sheet.style.setProperty('--letter-ink', theme.ink || '#3d2430');
    sheet.style.setProperty('--letter-accent', theme.accent || '#d94f70');
    sheet.style.setProperty('--letter-accent-2', theme.accent2 || '#f5b6c6');
    $('#lyrics-theme-label').textContent = theme.name || 'Love Letter';
    $('#lyrics-motif').textContent = theme.motif || '♡';
    renderLetterDecor(detail, theme);
  }

  function renderLetterDecor(detail, theme) {
    const left = $('#margin-notes-left');
    const right = $('#margin-notes-right');
    const notes = detail.notes || [];
    left.innerHTML = '';
    right.innerHTML = '';

    notes.forEach((note, idx) => {
      const el = document.createElement('div');
      el.className = 'margin-note';
      el.textContent = note;
      (idx % 2 === 0 ? left : right).appendChild(el);
    });

    if (!right.children.length && left.children.length) {
      const clone = document.createElement('div');
      clone.className = 'margin-note margin-note-ghost';
      clone.textContent = theme.motif || '♡';
      right.appendChild(clone);
    }

    $('#wax-seal').textContent = detail.seal || '♡';
    $('#stamp-icon').textContent = theme.motif || '♡';
    $('#stamp-text').textContent = detail.stamp || 'LOVE STORY';
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
    const sheet = $('#lyrics-sheet');
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lyrics-open');
    sheet.classList.remove('is-opening');
    void sheet.offsetWidth;
    sheet.classList.add('is-opening');
    window.clearTimeout(window.__lyricsOpenTimer);
    window.__lyricsOpenTimer = window.setTimeout(() => sheet.classList.remove('is-opening'), 1200);
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
    const view = currentLyricsView(config);
    sheet.dataset.language = activeLyricsLanguage;
    sheet.dataset.tabCount = String(config.views.length);
    sheet.dataset.titleScript = containsJapanese(activeLyricsTrack.title) ? 'jp' : 'latin';
    sheet.dataset.viewScript = containsJapanese(view.text) || view.label === '日本語' ? 'jp' : 'latin';
    header.textContent = config.views.length > 1
      ? `${view.label} · ${view.language}`
      : `${view.language}`;
  }

  function renderLyricsTabs() {
    const tabs = $('#lyrics-tabs');
    tabs.innerHTML = '';
    const config = lyricsConfig(activeLyricsTrack);
    tabs.dataset.count = String(config.views.length);

    if (config.views.length <= 1) {
      tabs.hidden = true;
      return;
    }

    tabs.hidden = false;
    config.views.forEach((view) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `lyrics-tab${activeLyricsLanguage === view.key ? ' is-active' : ''}`;
      button.textContent = view.label;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', activeLyricsLanguage === view.key ? 'true' : 'false');
      button.addEventListener('click', () => {
        activeLyricsLanguage = view.key;
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
    const view = currentLyricsView(config);
    const text = String(view.text || '');

    body.innerHTML = '';
    body.scrollTop = 0;

    if (text.trim()) {
      const prompt = document.createElement('div');
      prompt.className = 'lyrics-scroll-prompt';
      prompt.innerHTML = `<span aria-hidden="true">↡</span><strong>Unfold the letter</strong><span>Scroll to reveal the next lines.</span>`;
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

      note.textContent = `${view.label} · ${view.language} · scroll-to-unfold letter view`;
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'lyrics-placeholder';
      placeholder.innerHTML = `
        <div class="placeholder-heart" aria-hidden="true">♡</div>
        <strong>This letter is waiting for its words.</strong>
        <p>The stationery, language toggle, and song-specific visual theme are ready. Add the companion lyric text later in <code>lyrics-data.js</code>.</p>`;
      body.appendChild(placeholder);
      note.textContent = config.views.length > 1
        ? `${view.label} is ready as a tab — this specific view is still waiting for text.`
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
    const envelope = $('#envelope');
    if (envelope.classList.contains('is-opening') || envelope.classList.contains('is-open')) return;
    envelope.classList.add('is-opening');
    const button = $('#open-envelope');
    button.disabled = true;
    window.setTimeout(() => {
      envelope.classList.add('is-open');
      document.body.style.overflow = '';
      showStickyPlayer();
      $('#playlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 980);
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

  $('#replay-story').addEventListener('click', () => {
    setActiveTrack(0, { play: true, reveal: true });
    window.setTimeout(() => document.querySelector('.track[data-index="0"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  });

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
