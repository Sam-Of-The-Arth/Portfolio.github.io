/* ============================================================
   SAMARTH ARADHYA — site behavior
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* ignore (private mode, preview sandbox, etc.) */ }
  }

  function applyTheme(theme, checkbox) {
    root.setAttribute('data-theme', theme);
    if (checkbox) checkbox.checked = theme === 'light';
  }

  function initTheme() {
    var checkbox = document.getElementById('darkModeToggle');
    var stored = safeGet('theme');
    var theme = stored === 'light' ? 'light' : 'dark'; // dark is the default mode
    applyTheme(theme, checkbox);

    if (checkbox) {
      checkbox.addEventListener('change', function () {
        var next = checkbox.checked ? 'light' : 'dark';
        applyTheme(next, checkbox);
        safeSet('theme', next);
      });
    }
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    var burger = document.querySelector('.hamburger');
    var menu = document.querySelector('.nav-menu');
    if (!burger || !menu) return;

    burger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Nav scroll shadow ---------- */
  function initNavScroll() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    var toggle = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  }

  /* ---------- Active nav link on scroll (index page) ---------- */
  function initActiveLinkTracking() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href*="#"]'));
    if (!links.length) return;

    var map = {};
    links.forEach(function (link) {
      var hash = link.getAttribute('href').split('#')[1];
      if (!hash) return;
      var section = document.getElementById(hash);
      if (section) map[hash] = { link: link, section: section };
    });

    var ids = Object.keys(map);
    if (!ids.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          var id = entry.target.id;
          if (map[id]) map[id].link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    ids.forEach(function (id) { observer.observe(map[id].section); });
  }

  /* ---------- Scroll reveal ----------
     .reveal elements are visible by default (see CSS). They only get hidden
     once html.js-reveal is set below, AND that only happens after the
     IntersectionObserver is fully wired — so a mid-setup failure can never
     leave real content invisible. */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return; // stay visible, no motion

    document.querySelectorAll('.reveal-stagger').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty('--i', i);
        child.classList.add('reveal');
      });
    });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    root.classList.add('js-reveal'); // now safe: everything below is observed
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Lightbox (click a project image to zoom it) ---------- */
  function initLightbox() {
    var images = document.querySelectorAll('img.zoomable');
    if (!images.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close image">&times;</button>' +
      '<img class="lightbox-img" alt="">' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.lightbox-img');
    var capEl = overlay.querySelector('.lightbox-caption');
    var closeBtn = overlay.querySelector('.lightbox-close');

    function open(src, alt, caption) {
      imgEl.src = src;
      imgEl.alt = alt || '';
      capEl.textContent = caption || '';
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      imgEl.src = '';
    }

    images.forEach(function (img) {
      img.addEventListener('click', function () {
        var wrap = img.closest('.image-placeholder, .detail-image-placeholder') || img.parentElement;
        var captionEl = wrap ? wrap.querySelector('.img-caption') : null;
        open(img.currentSrc || img.src, img.alt, captionEl ? captionEl.textContent : '');
      });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });
  }

  /* ---------- Init ---------- */
  function safeRun(fn) {
    try { fn(); } catch (e) { /* one module failing should never block the rest */ console.error(e); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    safeRun(initTheme);
    safeRun(initMobileNav);
    safeRun(initNavScroll);
    safeRun(initActiveLinkTracking);
    safeRun(initReveal);
    safeRun(initLightbox);
  });
})();
