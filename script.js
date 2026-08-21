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

})();

// V5 — carrega os vídeos da vitrine somente quando entram na tela.
(function () {
  const videos = Array.from(document.querySelectorAll('[data-lazy-video]'));
  if (!videos.length) return;

  const hydrate = (video) => {
    if (video.dataset.loaded === 'true') return;
    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    video.load();
    video.dataset.loaded = 'true';
  };

  const setPlayingState = (video, playing) => {
    const media = video.closest('.showcase-media');
    if (media) media.classList.toggle('playing', playing);
  };

  videos.forEach((video) => {
    const button = video.closest('.showcase-media')?.querySelector('.video-play');
    if (button) {
      button.addEventListener('click', () => {
        hydrate(video);
        if (video.paused) {
          video.play().then(() => setPlayingState(video, true)).catch(() => {});
        } else {
          video.pause();
          setPlayingState(video, false);
        }
      });
    }
    video.addEventListener('play', () => setPlayingState(video, true));
    video.addEventListener('pause', () => setPlayingState(video, false));
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          hydrate(video);
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { rootMargin: '160px 0px', threshold: 0.25 });
    videos.forEach((video) => observer.observe(video));
  }
})();
