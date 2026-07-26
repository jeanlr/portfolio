/* ==========================================================================
   script.js — interatividade do portfólio
   ========================================================================== */

// -------------------------------------------------------------------------
// Ano dinâmico no footer
// -------------------------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// -------------------------------------------------------------------------
// Badges de tecnologia — renderizados a partir de TECHNOLOGIES
// -------------------------------------------------------------------------
const TECHNOLOGIES = [
  'python', 'sql', 'pyspark', 'book-de-vars', 'scikit-learn',
  'machine-learning', 'classificacao', 'clustering', 'regressao'
];

const badgeGrid = document.getElementById('badge-grid');
if (badgeGrid) {
  const fragment = document.createDocumentFragment();
  TECHNOLOGIES.forEach((tech) => {
    const li = document.createElement('li');
    li.className = 'tag';
    const dot = document.createElement('span');
    dot.className = 'footer__status-dot';
    dot.setAttribute('aria-hidden', 'true');
    li.appendChild(dot);
    li.append(tech);
    fragment.appendChild(li);
  });
  badgeGrid.appendChild(fragment);
}

// -------------------------------------------------------------------------
// Scroll reveal — fade-in / slide-up via IntersectionObserver
// -------------------------------------------------------------------------
const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealTargets.length) {
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Cards de projeto recebem delay escalonado
  document.querySelectorAll('.card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
  });

  // Fallback de segurança: garante que nada fique preso em opacity 0
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
      el.classList.add('is-visible');
    });
  }, 1500);
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// -------------------------------------------------------------------------
// Navbar: menu mobile
// -------------------------------------------------------------------------
const navbarMenu = document.getElementById('navbar-menu');
const navbarNav = document.getElementById('navbar-nav');

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
