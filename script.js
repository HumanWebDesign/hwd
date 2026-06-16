/* ============================================================
   HUMAN WEB DESIGN — script.js
   ============================================================ */

/* ============================================================
   SUPABASE CONFIG
   ⚠️  REEMPLAZA estos valores con los tuyos desde el panel de
       Supabase → Settings → API
   ============================================================ */
const SUPABASE_URL     = 'https://tmkorpooikziwnajdkrk.supabase.co';       // ← pega aquí tu Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRta29ycG9vaWt6aXduYWpka3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NjA2OTksImV4cCI6MjA5NjQzNjY5OX0.gwgn7Ep2mSOIysFr1NYkAKAa4Y9bSPVbjMBupYg-U_o';                // ← pega aquí tu anon public key

/* ============================================================
   HELPER: Envío a Supabase REST API (sin SDK)
   ============================================================ */
async function insertToSupabase(data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/contactos`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':         SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(data),
  });
 
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Error ${response.status}`);
  }
 
  return true;
}
 
/* ============================================================
   FORMULARIO DE CONTACTO
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
 
  const statusEl = document.getElementById('form-status');
 
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
 
    const submitBtn = form.querySelector('[type="submit"]');
 
    const payload = {
      nombre_empresa: form.nombre_empresa.value.trim(),
      correo:         form.correo.value.trim(),
      telefono:       form.telefono.value.trim(),
      tipo_proyecto:  form.tipo_proyecto.value,
      mensaje:        form.mensaje.value.trim(),
      fecha_envio:    new Date().toISOString(),
    };
 
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';
    statusEl.className = 'loading';
    statusEl.textContent = 'Enviando tu mensaje, por favor espera…';
 
    try {
      await insertToSupabase(payload);
      statusEl.className = 'success';
      statusEl.textContent = '✅ ¡Mensaje enviado! Te contactaremos pronto.';
      form.reset();
    } catch (error) {
      console.error('Error Supabase:', error);
      statusEl.className = 'error';
      statusEl.textContent = '❌ Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }
  });
}
 
/* ============================================================
   FAQ ACORDEÓN
   ============================================================ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
 
  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
 
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
 
      // Cierra todos
      items.forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
 
      // Abre el seleccionado si estaba cerrado
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
 
/* ============================================================
   FILTRO DE PORTAFOLIO
   ============================================================ */
function initPortfolioFilter() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;
 
  const buttons = filterBar.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.portfolio-full-grid .project-card');
 
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
 
      const filter = btn.dataset.filter;
 
      cards.forEach((card) => {
        if (filter === 'todos' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}
 
/* ============================================================
   MENÚ MÓVIL
   ============================================================ */
function initMobileMenu() {
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;
 
  let open = false;
 
  const toggleMenu = (force) => {
    open = force !== undefined ? force : !open;
    mobileMenu.style.display = open ? 'flex' : 'none';
    hamburger.setAttribute('aria-expanded', String(open));
 
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
    }
  };
 
  hamburger.addEventListener('click', () => toggleMenu());
 
  // Cierra al hacer clic en un enlace
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
 
  // Cierra al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (open && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });
}
 
/* ============================================================
   NAVBAR: marcar enlace activo según la página actual
   ============================================================ */
function initActiveNav() {
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
 
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href === path) {
      link.classList.add('active');
    }
  });
}
 
/* ============================================================
   ANIMACIONES ON SCROLL (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.service-card, .project-card, .service-detail-card, .faq-item, .ceo-card, .testimonial-card'
  );
 
  if (!targets.length || !('IntersectionObserver' in window)) return;
 
  // Respeta preferencia de movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
 
  targets.forEach((el) => observer.observe(el));
}
 
/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initFAQ();
  initPortfolioFilter();
  initMobileMenu();
  initActiveNav();
  initScrollAnimations();
});
