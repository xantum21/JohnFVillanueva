(() => {
  const button = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  if (button && links) {
    const close = () => {
      links.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    button.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });

    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
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
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      const filter = filterButton.dataset.filterButton;
      filterButtons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === filterButton));
      });
      filterItems.forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.filterItem !== filter;
      });
    });
  });

  const timelineButtons = [...document.querySelectorAll('[data-timeline-filter]')];
  const timelineEntries = [...document.querySelectorAll('.timeline-entry')];
  timelineButtons.forEach((timelineButton) => {
    timelineButton.addEventListener('click', () => {
      const filter = timelineButton.dataset.timelineFilter;
      timelineButtons.forEach((candidate) => {
        candidate.setAttribute('aria-pressed', String(candidate === timelineButton));
      });
      timelineEntries.forEach((entry) => {
        const lanes = (entry.dataset.lanes || '').split(' ');
        entry.dataset.hidden = String(filter !== 'all' && !lanes.includes(filter));
      });
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const submitButton = contactForm.querySelector('[data-form-submit]');
    const status = contactForm.querySelector('[data-form-status]');
    const endpoint = contactForm.getAttribute('action') || '';
    const endpointIsConfigured = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/.test(endpoint);

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
