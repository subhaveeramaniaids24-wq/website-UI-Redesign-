// =========================================================
// NEXORA — shared site behavior
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFaq();
  initReveal();
  initContactForm();
  initYear();
});

/* ---------- Mobile navigation ---------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((t) => observer.observe(t));
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const successBox = form.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = form.querySelectorAll('[data-required]');
    fields.forEach((field) => {
      const wrapper = field.closest('.field');
      const value = field.value.trim();
      let fieldValid = value.length > 0;

      if (field.type === 'email' && value) {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      wrapper.classList.toggle('invalid', !fieldValid);
      if (!fieldValid) valid = false;
    });

    if (valid) {
      form.reset();
      successBox?.classList.add('show');
      setTimeout(() => successBox?.classList.remove('show'), 4000);
    }
  });

  form.querySelectorAll('[data-required]').forEach((field) => {
    field.addEventListener('input', () => {
      field.closest('.field').classList.remove('invalid');
    });
  });
}

/* ---------- Footer year ---------- */
function initYear() {
  const el = document.querySelector('#year');
  if (el) el.textContent = new Date().getFullYear();
}
