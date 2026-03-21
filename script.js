/* ─── CURSOR GLOW ─────────────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

/* ─── NAVBAR SCROLL ───────────────────────────────── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('visible');
  }
  updateActiveNav();
  triggerCounters();
  revealElements();
});

/* ─── HAMBURGER MENU ──────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('open');
  hamburger.innerHTML = menu.classList.contains('open')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

/* ─── ACTIVE NAV LINK ─────────────────────────────── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ─── COUNTER ANIMATION ───────────────────────────── */
let countersStarted = false;

function triggerCounters() {
  if (countersStarted) return;
  const stats = document.querySelector('.stats');
  if (!stats) return;
  const top = stats.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    countersStarted = true;
    document.querySelectorAll('.counter').forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));
      const update = () => {
        count = Math.min(count + step, target);
        counter.textContent = count;
        if (count < target) requestAnimationFrame(update);
      };
      update();
    });
  }
}

/* ─── SCROLL REVEAL ───────────────────────────────── */
function revealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

// Add reveal class to sections (except hero which has animate-in)
document.querySelectorAll('.stats, .about, .director, .courses, .gallery, .testimonials, .contact').forEach(el => {
  el.querySelectorAll('.stat-item, .about-card, .af-item, .course-card, .gallery-item, .tcard, .ci-item, .contact-form').forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = (i * 0.08) + 's';
  });
});

// initial check
revealElements();
triggerCounters();

/* ─── TESTIMONIAL AUTO-ROTATE ─────────────────────── */
// All cards are visible on desktop, so dots are for mobile feel
const tCards = document.querySelectorAll('.tcard');
let tIndex = 0;

function buildDots() {
  const dotsEl = document.getElementById('tDots');
  if (!dotsEl) return;
  // Only show dots on mobile
  if (window.innerWidth > 768) return;
  dotsEl.innerHTML = '';
  tCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'tdot' + (i === 0 ? ' active' : '');
    dot.style.cssText = `width:8px;height:8px;border-radius:50%;border:none;background:${i === 0 ? '#6366f1' : '#1e2140'};cursor:pointer;margin:0 4px;transition:all 0.3s;`;
    dot.onclick = () => goToTestimonial(i);
    dotsEl.appendChild(dot);
  });
}

function goToTestimonial(idx) {
  if (window.innerWidth > 768) return;
  tCards.forEach((c, i) => {
    c.style.display = i === idx ? 'block' : 'none';
  });
  tIndex = idx;
  document.querySelectorAll('.tdot').forEach((d, i) => {
    d.style.background = i === idx ? '#6366f1' : '#1e2140';
  });
}

buildDots();
if (window.innerWidth <= 768) {
  goToTestimonial(0);
  setInterval(() => {
    goToTestimonial((tIndex + 1) % tCards.length);
  }, 3500);
}

/* ─── CONTACT FORM ─────────────────────────────────── */
function submitEnquiry() {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const cls = document.getElementById('fclass').value;
  if (!name || !phone || !cls) {
    document.getElementById('fname').style.borderColor = name ? '' : '#ef4444';
    document.getElementById('fphone').style.borderColor = phone ? '' : '#ef4444';
    return;
  }
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  const btn = document.querySelector('.form-submit');
  btn.textContent = 'Sent! ✓';
  btn.style.background = '#22c55e';
  // Optionally open WhatsApp
  const msg = `Hi! I am ${name}. I want to enquire about ${cls} at Anukul Vidyapeeth. My number is ${phone}.`;
  setTimeout(() => {
    window.open(`https://wa.me/917205779557?text=${encodeURIComponent(msg)}`, '_blank');
  }, 600);
}

/* ─── SMOOTH SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
