// Theme toggle + persistence
const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const stored = localStorage.getItem('b2l_theme') || 'dark';
body.setAttribute('data-theme', stored);

themeBtn.addEventListener('click', () => {
  const cur = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', cur);
  localStorage.setItem('b2l_theme', cur);
});

// Mobile nav
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeMobile = document.getElementById('closeMobile');
menuBtn.addEventListener('click', ()=> {
  mobileNav.style.display = 'grid';
  mobileNav.setAttribute('aria-hidden','false');
});
closeMobile.addEventListener('click', ()=> {
  mobileNav.style.display = 'none';
  mobileNav.setAttribute('aria-hidden','true');
});
document.querySelectorAll('.mobile-link').forEach(l=>{
  l.addEventListener('click', ()=> { mobileNav.style.display='none'; mobileNav.setAttribute('aria-hidden','true');});
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.section, .card, .project-card, .member, .event, .hero-inner, .panel');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting) en.target.classList.add('visible');
  });
},{threshold:0.12});
reveals.forEach(r=> io.observe(r));

// Contact form
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name||!email||!message){
    formMsg.textContent = 'Please fill all fields.';
    return;
  }
  formMsg.textContent = 'Thanks! This is a demo — connect a backend to process messages.';
  form.reset();
});

// Clear button
document.getElementById('clearBtn').addEventListener('click', ()=> {
  form.reset();
  formMsg.textContent = '';
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Canvas background (particles + subtle gradient)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

function rand(min,max){return Math.random()*(max-min)+min}
let particles = [];
function initParticles(){
  particles = [];
  for(let i=0;i<70;i++){
    particles.push({x:rand(0,w), y:rand(0,h), r:rand(0.6,2.8), vx:rand(-0.4,0.4), vy:rand(-0.2,0.2)});
  }
}
initParticles();

function draw(){
  ctx.clearRect(0,0,w,h);
  // subtle gradient overlay
  const g = ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0,'rgba(123,97,255,0.06)');
  g.addColorStop(1,'rgba(0,255,213,0.03)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x = w;
    if(p.x>w) p.x = 0;
    if(p.y<0) p.y = h;
    if(p.y>h) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

window.addEventListener('resize', ()=> {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  initParticles();
});
