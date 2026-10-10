/* =====================================================================
   AL-ANSORY AGRIBUSINESS SOLUTIONS — Interactive Behaviours
   ---------------------------------------------------------------------
   Jobs:
     1. Persona / Solution Finder Tab Switcher
     2. Mobile Sticky Quick Contact Bar on Scroll
     3. Header Menu Drawer & Backdrop Overlay
     4. Header Scroll Shadow
     5. Scroll Reveal Fade-in Animations
     6. Accordion FAQ (One open at a time)
     7. Footer Year Auto-update
     8. Safe Image Loading Fallbacks
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------------------------------
     1. PERSONA / SOLUTION FINDER TABS
     ------------------------------------------------------------------- */
  var personaTabs = document.querySelectorAll('.persona-tab');
  var personaPanels = document.querySelectorAll('.persona-panel');

  if (personaTabs.length > 0) {
    personaTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetId = tab.getAttribute('data-target');

        personaTabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        personaPanels.forEach(function (p) {
          p.classList.remove('active');
          p.hidden = true;
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        var activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('active');
          activePanel.hidden = false;
        }
      });
    });
  }


  /* -------------------------------------------------------------------
     2. STICKY MOBILE QUICK CONTACT BAR ON SCROLL
     ------------------------------------------------------------------- */
  var stickyBar = document.getElementById('mobile-sticky-bar');
  var heroSection = document.querySelector('.hero');

  function checkStickyBar() {
    if (!stickyBar || !heroSection) return;
    var heroBottom = heroSection.getBoundingClientRect().bottom;
    var isMobile = window.innerWidth < 768;

    if (isMobile && heroBottom < 0) {
      stickyBar.classList.add('is-visible');
      stickyBar.setAttribute('aria-hidden', 'false');
      stickyBar.querySelectorAll('a').forEach(function(a){ a.removeAttribute('tabindex'); });
    } else {
      stickyBar.classList.remove('is-visible');
      stickyBar.setAttribute('aria-hidden', 'true');
      stickyBar.querySelectorAll('a').forEach(function(a){ a.setAttribute('tabindex', '-1'); });
    }
  }

  window.addEventListener('scroll', checkStickyBar, { passive: true });
  window.addEventListener('resize', checkStickyBar, { passive: true });
  checkStickyBar();


  /* -------------------------------------------------------------------
     3. HEADER MENU & BACKDROP OVERLAY
     ------------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var overlay = document.getElementById('nav-overlay');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    if (overlay) overlay.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    if (overlay) {
      overlay.addEventListener('click', function () { setMenu(false); });
    }

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    window.matchMedia('(min-width: 960px)').addEventListener('change', function () {
      setMenu(false);
    });
  }


  /* -------------------------------------------------------------------
     4. HEADER SCROLL SHADOW
     ------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });


  /* -------------------------------------------------------------------
     5. SCROLL REVEAL ANIMATION
     ------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }


  /* -------------------------------------------------------------------
     6. SINGLE-OPEN FAQ ACCORDION
     ------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });


  /* -------------------------------------------------------------------
     7. FOOTER YEAR
     ------------------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

});
