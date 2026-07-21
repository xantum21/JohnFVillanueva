(() => {
  const button = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  if (button && links) {
    const close = () => { links.classList.remove('open'); button.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); };
    button.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    reveals.forEach(el => observer.observe(el));
  } else { reveals.forEach(el => el.classList.add('is-visible')); }

  const filterButtons = [...document.querySelectorAll('[data-filter-button]')];
  const filterItems = [...document.querySelectorAll('[data-filter-item]')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filterButton;
    filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    filterItems.forEach(item => { item.hidden = filter !== 'all' && item.dataset.filterItem !== filter; });
  }));

  const timelineButtons = [...document.querySelectorAll('[data-timeline-filter]')];
  const timelineEntries = [...document.querySelectorAll('.timeline-entry')];
  timelineButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.timelineFilter;
    timelineButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    timelineEntries.forEach(entry => {
      const lanes = (entry.dataset.lanes || '').split(' ');
      entry.dataset.hidden = String(filter !== 'all' && !lanes.includes(filter));
    });
  }));

  const emailRoot = document.querySelector('[data-email-user][data-email-domain]');
  if (emailRoot) {
    const address = `${emailRoot.dataset.emailUser}@${emailRoot.dataset.emailDomain}`;
    document.querySelectorAll('[data-email-link]').forEach(link => link.href = `mailto:${address}`);
    const copy = document.querySelector('[data-copy-email]');
    const status = document.querySelector('[data-copy-status]');
    if (copy) copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(address); if (status) status.textContent = 'Email address copied.'; }
      catch { if (status) status.textContent = `Copy manually: ${address}`; }
    });
  }

  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
