(function () {
  'use strict';

  var header = document.getElementById('header');
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  // ---------- 모바일 메뉴 토글 ----------
  function setMenu(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  }

  toggle.addEventListener('click', function () {
    setMenu(!header.classList.contains('is-open'));
  });

  // 메뉴 링크 클릭 시 닫기
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  // ESC로 닫기
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // 데스크톱으로 전환되면 열린 메뉴 정리
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  // ---------- 스크롤 시 헤더 스타일 ----------
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- 섹션 fade-in ----------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- 오늘 요일 하이라이트 ----------
  var today = String(new Date().getDay());
  document.querySelectorAll('.hours__table tr[data-days]').forEach(function (row) {
    if (row.dataset.days.split(',').indexOf(today) !== -1) {
      row.classList.add('is-today');
    }
  });

  // ---------- 푸터 연도 ----------
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
