/* ===========================
   NAVBAR — scroll & active
=========================== */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ===========================
   TYPEWRITER EFFECT
=========================== */
const roles = [
  'Full-Stack Developer',
  'JavaScript Engineer',
  'Python Developer',
  'Node.js Backend Dev',
  'UI/UX Enthusiast',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('role-text');

function typeWriter() {
  const current = roles[roleIndex];

  if (isDeleting) {
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* ===========================
   COUNTER ANIMATION
=========================== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

/* ===========================
   INTERSECTION OBSERVER
=========================== */
const observerOptions = { threshold: 0.15 };

// Skill cards + fill bars
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        setTimeout(() => {
          fill.style.width = fill.dataset.width + '%';
        }, 200);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// Counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutText = document.querySelector('.about-text');
if (aboutText) counterObserver.observe(aboutText);

/* ===========================
   EMAILJS CONFIG
   استبدل القيم دي ببياناتك من emailjs.com
=========================== */
const EMAILJS_PUBLIC_KEY  = '14YJB5db0RLtlNugR';
const EMAILJS_SERVICE_ID  = 'service_usefoig';
const EMAILJS_TEMPLATE_ID = 'template_8qstpgq';

emailjs.init(EMAILJS_PUBLIC_KEY);

/* ===========================
   CONTACT FORM
=========================== */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    message:    message,
    to_email:   'aaasssaz118@gmail.com',
  })
  .then(() => {
    form.reset();
    btn.disabled = false;
    btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    formSuccess.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    btn.disabled = false;
    btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    formSuccess.textContent = '❌ Something went wrong. Please try again.';
    formSuccess.style.color = '#f87171';
    formSuccess.classList.add('show');
    setTimeout(() => {
      formSuccess.classList.remove('show');
      formSuccess.style.color = '';
    }, 5000);
  });
});

/* ===========================
   FOOTER YEAR
=========================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===========================
   SMOOTH SCROLL (fallback)
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
