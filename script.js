/* ==========================================================================
   script.js — interatividade leve do portfólio
   ========================================================================== */

// -------------------------------------------------------------------------
// Alternância de tema (claro/escuro)
// -------------------------------------------------------------------------
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function toggleTheme() {
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// -------------------------------------------------------------------------
// Ano dinâmico no footer
// -------------------------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// -------------------------------------------------------------------------
// Badges de tecnologia — inferidas a partir da atuação e dos projetos
// -------------------------------------------------------------------------
const TECHNOLOGIES = [
  'Python', 'SQL', 'PySpark', 'Book de Variáveis', 'Scikit-learn',
  'Machine Learning', 'Classificação', 'Clustering', 'Regressão'
];

const badgeGrid = document.getElementById('badge-grid');
if (badgeGrid) {
  const fragment = document.createDocumentFragment();
  TECHNOLOGIES.forEach((tech) => {
    const li = document.createElement('li');
    li.className = 'badge';
    li.textContent = tech;
    fragment.appendChild(li);
  });
  badgeGrid.appendChild(fragment);
}

// -------------------------------------------------------------------------
// Scroll reveal — fade-in / slide-up via IntersectionObserver
// -------------------------------------------------------------------------
const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Cards de projeto também recebem a classe .reveal dinamicamente
  document.querySelectorAll('.card').forEach((card, index) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${index * 80}ms`;
    observer.observe(card);
  });
} else {
  // Fallback: exibe tudo imediatamente se IntersectionObserver não existir
  revealTargets.forEach((el) => el.classList.add('is-visible'));
  document.querySelectorAll('.card').forEach((el) => el.classList.add('is-visible'));
}

// -------------------------------------------------------------------------
// Navbar: estado ao rolar e menu mobile
// -------------------------------------------------------------------------
const navbar = document.getElementById('navbar');
const navbarMenu = document.getElementById('navbar-menu');
const navbarNav = document.getElementById('navbar-nav');

if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (navbarMenu && navbarNav) {
  const toggleMenu = () => {
    const isOpen = navbarNav.classList.toggle('is-open');
    navbarMenu.setAttribute('aria-expanded', String(isOpen));
  };

  navbarMenu.addEventListener('click', toggleMenu);

  navbarNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navbarNav.classList.remove('is-open');
      navbarMenu.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (
      navbarNav.classList.contains('is-open') &&
      !navbarNav.contains(event.target) &&
      !navbarMenu.contains(event.target)
    ) {
      navbarNav.classList.remove('is-open');
      navbarMenu.setAttribute('aria-expanded', 'false');
    }
  });
}