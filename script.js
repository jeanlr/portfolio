/* ==========================================================================
   script.js — interatividade leve do portfólio
   ========================================================================== */

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
// Navbar: leve sombra ao rolar a página
// -------------------------------------------------------------------------
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 8) {
      navbar.style.boxShadow = '0 1px 0 hsla(222, 47%, 11%, 0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}