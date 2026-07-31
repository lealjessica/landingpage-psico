/**
 * Dra. Celia Toniati - Landing Page Psicologia Clínica
 * Script principal de interatividade e dinamismo
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializações
  initMobileMenu();
  initFaqAccordion();
  initHeaderScroll();
  initBackToTop();
  initContactForm();
});

/**
 * 1. Menu Mobile Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // Fechar menu mobile ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/**
 * 2. FAQ Accordion (Perguntas Frequentes)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fechar todos os itens abertos
      faqItems.forEach(i => i.classList.remove('active'));

      // Se não estava ativo, abre o clicado
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 3. Header Sombra ao Rolar
 */
function initHeaderScroll() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 4. Botão Voltar ao Topo
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 5. Simulação de Envio do Formulário de Contato
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const modalitySelect = document.getElementById('modality');
    const modality = modalitySelect.options[modalitySelect.selectedIndex].text;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Estado de carregamento no botão
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Obrigado(a), <strong>${name}</strong>! Sua mensagem foi enviada com sucesso. Em breve entrarei em contato via WhatsApp/telefone (${phone}).
      `;

      form.reset();

      // Rolar levemente até o feedback
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
  });
}
