(() => {

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.setAttribute('aria-hidden', 'true');
    transition.innerHTML = '<span class="page-transition__navy"></span><span class="page-transition__red"></span><span class="page-transition__cream"></span>';
    document.body.appendChild(transition);

    if (sessionStorage.getItem('jv-page-transition') === '1') {
      sessionStorage.removeItem('jv-page-transition');
      document.body.classList.add('is-entering');
      window.setTimeout(() => document.body.classList.remove('is-entering'), 700);
    }

    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

      const next = new URL(link.href, window.location.href);
      if (next.origin !== window.location.origin) return;
      if (next.pathname === window.location.pathname && next.search === window.location.search) return;

      event.preventDefault();
      sessionStorage.setItem('jv-page-transition', '1');
      document.body.classList.add('is-leaving');
      window.setTimeout(() => { window.location.href = next.href; }, 500);
    });
  }

  const button = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  if (button && links) {
    const close = ({ restoreFocus = false } = {}) => {
      links.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
      if (restoreFocus) button.focus();
    };

    button.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });

    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && links.classList.contains('open')) {
        close({ restoreFocus: true });
      }
    });
    document.addEventListener('click', (event) => {
      if (!links.classList.contains('open')) return;
      if (links.contains(event.target) || button.contains(event.target)) return;
      close();
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
      if (event.matches) close();
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const filterButtons = [...document.querySelectorAll('[data-filter-button]')];
  const filterItems = [...document.querySelectorAll('[data-filter-item]')];
  const filterStatus = document.querySelector('[data-filter-status]');
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      const filter = filterButton.dataset.filterButton;
      filterButtons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === filterButton));
      });
      filterItems.forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.filterItem !== filter;
      });
      if (filterStatus) {
        const visibleCount = filterItems.filter((item) => !item.hidden).length;
        filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'collection' : 'collections'} shown.`;
      }
    });
  });

  const timelineButtons = [...document.querySelectorAll('[data-timeline-filter]')];
  const timelineEntries = [...document.querySelectorAll('.timeline-entry')];
  const timelineStatus = document.querySelector('[data-timeline-status]');
  timelineButtons.forEach((timelineButton) => {
    timelineButton.addEventListener('click', () => {
      const filter = timelineButton.dataset.timelineFilter;
      timelineButtons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === timelineButton));
      });
      timelineEntries.forEach((entry) => {
        const lanes = (entry.dataset.lanes || '').split(' ');
        const shouldHide = filter !== 'all' && !lanes.includes(filter);
        entry.hidden = shouldHide;
        entry.dataset.hidden = String(shouldHide);
      });
      if (timelineStatus) {
        const visibleCount = timelineEntries.filter((entry) => !entry.hidden).length;
        timelineStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'timeline entry' : 'timeline entries'} shown.`;
      }
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const submitButton = contactForm.querySelector('[data-form-submit]');
    const status = contactForm.querySelector('[data-form-status]');
    const topic = contactForm.querySelector('#topic');
    const topicHint = contactForm.querySelector('[data-topic-hint]');
    const messageField = contactForm.querySelector('#message-text');
    const subjectField = contactForm.querySelector('[data-form-subject]');
    const formContext = contactForm.dataset.formContext || 'professional';
    const endpoint = contactForm.getAttribute('action') || '';
    const endpointIsConfigured = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/.test(endpoint);
    const defaultHint = topicHint?.textContent || '';
    const defaultPlaceholder = messageField?.placeholder || '';
    const defaultSubject = subjectField?.value || 'New message from johnfvillanueva.com';

    const setStatus = (message, state = '') => {
      if (!status) return;
      status.dataset.state = state;
      status.textContent = message;
    };

    const setSubmitting = (isSubmitting) => {
      contactForm.setAttribute('aria-busy', String(isSubmitting));
      if (!submitButton) return;

      if (isSubmitting) {
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      } else {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || 'Send message →';
      }
    };

    const professionalGuidance = {
      'Nursing role or clinical opportunity': {
        hint: 'New-graduate residencies, unit openings, per-diem work, and clinical conversations fit here.',
        placeholder: 'Tell me the unit, shift, cohort start date, and whether the posting is a new-graduate residency.'
      },
      'Recruiting or hiring': {
        hint: 'For recruiters, talent teams, and hiring managers outside of a specific clinical posting.',
        placeholder: 'Tell me the organization, the role, and the timeline you are working against.'
      },
      'Project or collaboration': {
        hint: 'For websites, games, study tools, business ideas, creative work, or anything we might build together.',
        placeholder: 'Tell me what you saw, what you are building, and what kind of collaboration you have in mind.'
      },
      'Speaking, teaching, or mentoring': {
        hint: 'Student panels, new-graduate mentoring, and second-career perspective on entering nursing.',
        placeholder: 'Tell me the audience, the format, and roughly when it would be.'
      },
      'Something else': {
        hint: 'No perfect category needed—just give me enough context to understand the message.',
        placeholder: 'Tell me what brought you here and what you would like to discuss.'
      }
    };

    const personalGuidance = {
      'We have already met': {
        hint: 'A quick reminder of where we met is helpful.',
        placeholder: 'Remind me where we met and tell me what made you want to say hello.'
      },
      'A mutual friend or social setting': {
        hint: 'You can mention the person, group, or event that connects us.',
        placeholder: 'Tell me who or what connects us and one thing here that caught your attention.'
      },
      'A dating app': {
        hint: 'Mentioning the app helps me place the conversation.',
        placeholder: 'Tell me where you found the page and one thing that made you want to reach out.'
      },
      'Found this page some other way': {
        hint: 'A little context is enough—there is no perfect introduction.',
        placeholder: 'Tell me how you found the page and what made you want to say hello.'
      }
    };

    const topicGuidance = formContext === 'personal' ? personalGuidance : professionalGuidance;
    const subjectPrefix = formContext === 'personal' ? 'Personal message' : 'Website message';

    const updateTopicContext = () => {
      if (!topic) return;
      const selected = topicGuidance[topic.value];
      if (topicHint) {
        topicHint.textContent = selected
          ? selected.hint
          : defaultHint;
        topicHint.dataset.active = String(Boolean(selected));
      }
      if (messageField) {
        messageField.placeholder = selected
          ? selected.placeholder
          : defaultPlaceholder;
      }
      if (subjectField) {
        subjectField.value = selected
          ? `${subjectPrefix} — ${topic.value}`
          : defaultSubject;
      }
    };

    if (topic) {
      topic.addEventListener('change', updateTopicContext);
      updateTopicContext();
    }

    if (!endpointIsConfigured) {
      if (submitButton) submitButton.disabled = true;
      setStatus('The contact form is temporarily unavailable.', 'error');
    } else {
      contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!contactForm.reportValidity()) return;

        setSubmitting(true);
        setStatus('Sending your message…');

        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
              Accept: 'application/json'
            }
          });

          const result = await response.json().catch(() => ({}));
          if (!response.ok) {
            const details = Array.isArray(result.errors)
              ? result.errors.map((error) => error.message).filter(Boolean).join(' ')
              : '';
            throw new Error(details || 'The message could not be sent.');
          }

          contactForm.reset();
          setStatus('Message sent. Thank you for reaching out—I’ll reply by email when I can.', 'success');
          if (status) status.focus({ preventScroll: true });
        } catch (error) {
          const message = error instanceof Error && error.message
            ? error.message
            : 'The message could not be sent. Please try again in a moment.';
          setStatus(message, 'error');
          if (status) status.focus({ preventScroll: true });
        } finally {
          setSubmitting(false);
        }
      });
    }
  }

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
