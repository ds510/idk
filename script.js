
(function () {
  'use strict';

  // Day/night theme: apply saved preference and toggle on button click
  (function initTheme() {
    var saved = localStorage.getItem('theme');
    var isNight = saved === 'night' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('night-mode', isNight);
    document.body.classList.toggle('day-mode', !isNight);
    updateThemeToggleLabel();
  })();

  function updateThemeToggleLabel() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.textContent = document.body.classList.contains('night-mode') ? '☀️' : '🌙';
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.body.classList.toggle('night-mode');
      document.body.classList.toggle('day-mode');
      localStorage.setItem('theme', document.body.classList.contains('night-mode') ? 'night' : 'day');
      updateThemeToggleLabel();
    });
  });

  // Basketball rack: click ball to expand/collapse panel
  document.querySelectorAll('.ball').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panelId = btn.getAttribute('data-panel');
      var panel = document.getElementById(panelId);
      var isOpen = panel.classList.contains('is-open');

      if (isOpen) {
        panel.classList.remove('is-open');
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        // Optional: close any other open panel (one at a time)
        document.querySelectorAll('.rack-panel.is-open').forEach(function (p) {
          p.classList.remove('is-open');
          p.setAttribute('hidden', '');
        });
        document.querySelectorAll('.ball[aria-expanded="true"]').forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
        });
        panel.classList.add('is-open');
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Smooth reveal on scroll
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.talm-bout-me, .rack-level, .player-card, .player-image-only').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
