const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const toggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('navigation');

if (toggle && navigation) {
  const mobile = window.matchMedia('(max-width: 700px)');

  const closeMenu = (restoreFocus = false) => {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true);
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  navigation.addEventListener('focusout', (event) => {
    if (!navigation.contains(event.relatedTarget) && !toggle.contains(event.relatedTarget)) closeMenu();
  });

  mobile.addEventListener('change', () => closeMenu());
  toggle.hidden = false;
  document.documentElement.classList.add('js');
}
