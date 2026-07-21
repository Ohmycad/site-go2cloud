/* Go2Cloud — main.js
   Vanilla JS only. Sticky header, mobile drawer, scroll reveal, back-to-top, marquee clone.
*/
(function () {
  'use strict';

  // ----- Theme toggle (light / dark) -----
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');

  const getStoredTheme = () => {
    try { return localStorage.getItem('g2c-theme'); } catch (e) { return null; }
  };
  const setStoredTheme = (t) => {
    try { localStorage.setItem('g2c-theme', t); } catch (e) {}
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Basculer en thème clair' : 'Basculer en thème sombre');
    }
    // Update theme-color meta for mobile chrome
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#060A14' : '#FBFAF8');
  };

  // Initial theme: stored > system > light
  const stored = getStoredTheme();
  const initialTheme = stored || 'light';
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      setStoredTheme(next);
    });
  }

  // ----- Sticky header on scroll -----
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    if (backToTop) {
      if (window.scrollY > 600) backToTop.classList.add('is-visible');
      else backToTop.classList.remove('is-visible');
    }
  };

  // ----- Mobile drawer -----
  const navToggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      // close on anchor click
      const a = e.target.closest('a');
      if (a) closeMenu();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ----- Back to top -----
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Marquee: duplicate track for seamless loop -----
  document.querySelectorAll('.marquee__track').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  // ----- Scroll reveal via IntersectionObserver -----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ----- Smooth scroll for in-page anchors (respect reduced motion) -----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      closeMenu();
    });
  });

  // ----- Contact form: mailto fallback -----
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const company = (data.get('company') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const need = (data.get('need') || '').toString().trim();
      const msg = (data.get('message') || '').toString().trim();

      const subject = encodeURIComponent(`Demande de démo Go2Cloud — ${name || 'Contact'}`);
      const body = encodeURIComponent(
        `Bonjour Go2Cloud,\n\n` +
        `Je souhaite échanger 30 minutes au sujet de :\n${need || '—'}\n\n` +
        `Mes coordonnées :\n` +
        `• Nom : ${name}\n` +
        `• Email : ${email}\n` +
        `• Entreprise : ${company}\n` +
        `• Téléphone : ${phone}\n\n` +
        `Contexte :\n${msg}\n\n` +
        `Merci,\n${name}`
      );
      window.location.href = `mailto:contact@go2cloud.fr?subject=${subject}&body=${body}`;

      // Visual confirmation (kept simple, no toast lib)
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = 'Ouverture de votre messagerie…';
        btn.disabled = true;
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 4000);
      }
    });
  }

  // ----- Init -----
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
