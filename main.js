const toggleBtn = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    toggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 1,
  dy: (Math.random() - 0.5) * 1
}));
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f6ff';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out!');
  form.reset();
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});