document.querySelector('#year').textContent = new Date().getFullYear();
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let paused = preference.matches;
const toggle = document.createElement('button');
toggle.type = 'button'; toggle.className = 'motion-toggle';
const sync = () => {
  document.body.classList.toggle('motion-paused', paused);
  toggle.textContent = paused ? 'Play motion' : 'Pause motion';
  toggle.setAttribute('aria-pressed', String(paused));
};
toggle.addEventListener('click', () => { paused = !paused; sync(); });
document.querySelector('nav').prepend(toggle); sync();
preference.addEventListener('change', e => { paused = e.matches; sync(); });
if (!preference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('motion-ready');
}
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  document.addEventListener('pointermove', event => {
    if (paused) return;
    glow.style.left = event.clientX + 'px'; glow.style.top = event.clientY + 'px';
  });
  document.querySelectorAll('.tilt').forEach(card => {
    card.parentElement.addEventListener('pointermove', event => {
      if (paused) return;
      const rect = card.parentElement.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    card.parentElement.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
