(function () {
  const cfg = window.SITE_CONFIG || {};
  const checkoutUrl = cfg.checkoutUrl || '#oferta';

  document.querySelectorAll('[data-checkout]').forEach((link) => {
    link.setAttribute('href', checkoutUrl);
    if (checkoutUrl !== '#oferta') {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((other) => other.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  const sticky = document.querySelector('.mobile-sticky');
  const offer = document.querySelector('#oferta');
  if (sticky && offer && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      sticky.classList.toggle('hidden', entry.isIntersecting);
    }, { threshold: 0.12 });
    observer.observe(offer);
  }
})();
