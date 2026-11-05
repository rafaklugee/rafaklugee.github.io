/* =========================================================
   Luís Fischer Odontologia – scripts
   ========================================================= */

// >>> CONFIGURAÇÃO: número do WhatsApp do consultório (DDI + DDD + número, só dígitos).
// Confirmar com a secretária qual é o número de WhatsApp oficial.
const WHATSAPP = '554734251337';

(function () {
  // ----- Links de WhatsApp com mensagem pré-preenchida -----
  document.querySelectorAll('.js-whats').forEach((el) => {
    const msg = el.dataset.msg || 'Olá! Vim pelo site e gostaria de agendar uma avaliação.';
    el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // ----- Fallback elegante enquanto as fotos reais não são adicionadas -----
  document.querySelectorAll('img.js-fallback').forEach((img) => {
    const swap = () => {
      const label = img.dataset.initials || '';
      const div = document.createElement('div');
      div.className = 'photo-placeholder' + (label.length > 3 ? ' photo-placeholder--text' : '');
      div.innerHTML = `<div>${label}<small>foto em breve</small></div>`;
      img.replaceWith(div);
    };
    if (img.complete && img.naturalWidth === 0) swap();
    else img.addEventListener('error', swap, { once: true });
  });

  // ----- Header com sombra ao rolar -----
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ----- Menu mobile -----
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // ----- Animação de entrada -----
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // ----- "Aberto agora" (horário de Joinville) -----
  const openNow = document.getElementById('openNow');
  if (openNow) {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const day = now.getDay(); // 0 = domingo
    const minutes = now.getHours() * 60 + now.getMinutes();
    const isOpen = day >= 1 && day <= 5 && minutes >= 8 * 60 && minutes < 17 * 60 + 30;
    openNow.textContent = isOpen ? 'Aberto agora' : 'Fechado agora · fale conosco pelo WhatsApp';
    openNow.classList.add(isOpen ? 'is-open' : 'is-closed');
  }

  // ----- Ano no rodapé -----
  document.getElementById('year').textContent = new Date().getFullYear();
})();
