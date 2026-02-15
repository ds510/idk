(function () {
  'use strict';

  var ball = document.getElementById('rolling-ball');
  var interestsSection = document.getElementById('interests-section');

  // Apply saved theme on load
  (function initTheme() {
    var saved = localStorage.getItem('theme');
    var isNight = saved === 'night' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('night-mode', isNight);
    document.body.classList.toggle('day-mode', !isNight);
  })();

  if (ball && interestsSection) {
    ball.addEventListener('click', function () {
      var isRolledRight = ball.classList.contains('rolled-right');

      if (isRolledRight) {
        // Ball on right: roll back left, hide interests
        ball.classList.remove('rolled-right');
        interestsSection.classList.remove('is-visible');
        interestsSection.setAttribute('aria-hidden', 'true');
      } else {
        // Ball on left: toggle theme, roll right, reveal interests
        document.body.classList.toggle('night-mode');
        document.body.classList.toggle('day-mode');
        localStorage.setItem('theme', document.body.classList.contains('night-mode') ? 'night' : 'day');

        ball.classList.add('rolled-right');
        interestsSection.classList.add('is-visible');
        interestsSection.setAttribute('aria-hidden', 'false');
      }
    });
  }

  // Smooth reveal on scroll for interests when visible
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

  document.querySelectorAll('.talm-bout-me, .interest-panel, .player-card, .player-image-only').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
