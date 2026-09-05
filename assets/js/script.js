const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const accordionTriggers = document.querySelectorAll('.agenda-trigger');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  mobileMenu.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 1040) closeMenu();
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
updateHeader();

// Para cada topico de agenda
accordionTriggers.forEach((trigger) => {

  // Comeca escondido
  trigger.setAttribute('aria-expanded', 'false');
  item.nextElementSibling.hidden = true;

  // Coloque uma label indicando o que PODE SER FEITO (NAO ESTÁ SENDO FEITO)
  trigger.setAttribute('aria-label', `${trigger.textContent.replace(/\s+/g, ' ').trim()} — expandir detalhes`);

  // Listener para clique tópico de agenda 
  trigger.addEventListener('click', () => {

    // Check se a agenda está expandida
    const expanded = trigger.getAttribute('aria-expanded') === 'true';

    if (!expanded) {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-label', `${trigger.textContent.replace(/\s+/g, ' ').trim()} — recolher detalhes`);
      trigger.nextElementSibling.hidden = false;
    } else {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', `${trigger.textContent.replace(/\s+/g, ' ').trim()} — expandir detalhes`);
      trigger.nextElementSibling.hidden = true;
    }
  });

});

const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });
  reveals.forEach((element) => observer.observe(element));
}
