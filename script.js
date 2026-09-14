/* Replace each null with the real HTTPS URL. Missing URLs never open a fake destination. */
const MIDO_LINKS = {
  linko: 'https://t.me/linkohub2026',
  bot: 'https://t.me/MIDOALIAIBOT',
  instagram: 'https://www.instagram.com/_midoal1/',
  telegram: 'https://t.me/linkohub2026',
  github: 'https://github.com/midoal1'
};

const notice = document.querySelector('#link-notice');
let noticeTimer;
document.querySelectorAll('[data-link]').forEach(link => {
  const destination = MIDO_LINKS[link.dataset.link];
  let valid = false;
  try { valid = new URL(destination).protocol === 'https:'; } catch (_) { /* Unconfigured URL */ }
  if (valid) {
    link.href = destination;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    const label = document.createElement('span');
    label.className = 'placeholder-note';
    label.textContent = 'URL placeholder — add your link';
    if (link.closest('.social-grid')) link.firstElementChild.append(label);
    else link.after(label);
    link.addEventListener('click', event => {
      event.preventDefault();
      notice.textContent = 'This link is not connected yet. Check back soon.';
      notice.hidden = false;
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => { notice.hidden = true; }, 4500);
    });
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}
