/* =========================================================
   URGENCE ABSOLUE — Script partagé (multi-pages)
   ========================================================= */
(function () {
  'use strict';

  // Année courante (footer)
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Nav : fond solide au défilement
  var nav = document.getElementById('nav');
  if (nav && !nav.classList.contains('solid')) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 30); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Menu burger (mobile)
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
  }

  // Menu déroulant « Services » (clic au mobile / clavier)
  document.querySelectorAll('.has-drop .drop-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = btn.closest('.has-drop');
      var open = parent.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  // Ferme le menu déroulant si on clique ailleurs (desktop)
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-drop.open').forEach(function (d) {
      if (!d.contains(e.target)) d.classList.remove('open');
    });
  });

  // Onglets flotte
  var tabs = document.querySelectorAll('.fleet-tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.fleet-tab').forEach(function (t) {
          t.classList.remove('active'); t.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.fleet-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(tab.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // Apparition au défilement
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Camion hero — animation unique au chargement
  var heroTruck = document.getElementById('heroTruck');
  if (heroTruck) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { heroTruck.classList.add('in'); });
    });
  }

  // Apparitions qui se REJOUENT à chaque passage (ex. camion arrière)
  var replayEls = document.querySelectorAll('.replay-reveal');
  if (replayEls.length && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) {
          e.target.classList.add('in');
        } else if (e.intersectionRatio === 0) {
          e.target.classList.remove('in');
        }
      });
    }, { threshold: [0, 0.3] });
    replayEls.forEach(function (el) { rio.observe(el); });
  } else {
    replayEls.forEach(function (el) { el.classList.add('in'); });
  }
})();
