// ===== TYPING EFFECT =====
const phrases = [
  "Junior Software Engineer",
  "Frontend Developer",
  "Backend Tinkerer",
  "Problem Solver",
  "Bug Slayer 🐛"
];

let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const current = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

// ===== MATRIX RAIN BACKGROUND =====
const matrixEl = document.getElementById('matrix');
const chars = '01アイウエオカキクケコサシスセソ<>{}[]()=+-*&^%$#@!;:';
const cols = Math.floor(window.innerWidth / 16);
let streams = '';
for (let i = 0; i < cols; i++) {
  const delay = (Math.random() * 5).toFixed(1);
  const dur = (4 + Math.random() * 4).toFixed(1);
  const col = [];
  for (let j = 0; j < 30; j++) col.push(chars[Math.floor(Math.random() * chars.length)]);
  streams += `<span style="position:absolute;left:${i * 16}px;top:-400px;display:flex;flex-direction:column;animation:matfall ${dur}s ${delay}s linear infinite;line-height:1.4;">${col.join('<br>')}</span>`;
}
matrixEl.innerHTML = streams;
const style = document.createElement('style');
style.textContent = `@keyframes matfall{from{transform:translateY(0)}to{transform:translateY(calc(100vh + 400px))}}`;
document.head.appendChild(style);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.section-header, .project-card, .skill-category, .about-grid, .contact-grid, .tech-badges');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => bar.classList.add('animated'), 200);
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'Sending...';
  setTimeout(() => {
    note.textContent = '✓ Message sent! I\'ll get back to you soon.';
    form.reset();
    setTimeout(() => note.textContent = '', 4000);
  }, 1200);
});

// ===== PROJECT CARD TILT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.perspective = '800px';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
