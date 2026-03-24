
const dot  = document.getElementById('c-dot');
const ring = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();


const sprog    = document.getElementById('sprog');
const navbar   = document.getElementById('navbar');
const navAs    = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('section[id]')];

function onScroll() {
  const sy   = window.scrollY;
  const maxS = document.body.scrollHeight - window.innerHeight;
  sprog.style.width = (sy / maxS * 100) + '%';
  navbar.classList.toggle('scrolled', sy > 60);
  let cur = 'home';
  sections.forEach(s => { if (sy >= s.offsetTop - 160) cur = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('navLinks').removeAttribute('style');
  });
});

document.getElementById('ham').addEventListener('click', () => {
  const nl = document.getElementById('navLinks');
  if (nl.style.display === 'flex') {
    nl.removeAttribute('style');
  } else {
    nl.style.cssText = `
      display:flex; flex-direction:column; gap:.4rem;
      position:fixed; top:58px; left:0; right:0;
      background:rgba(10,12,20,.98); padding:1.5rem 1.6rem;
      border-bottom:1px solid rgba(99,102,241,.16); z-index:299;
    `;
  }
});


const roles   = ['Data Science Student', 'Data Scientist', 'ML Enthusiast', 'Data Analyst', 'AI Engineer'];
let ri = 0, ci = 0, del = false;
const typerEl = document.getElementById('typer');
(function tick() {
  const word = roles[ri];
  typerEl.textContent = del ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!del && ci > word.length) { del = true; setTimeout(tick, 1100); return; }
  if (del && ci < 0) { del = false; ri = (ri + 1) % roles.length; ci = 0; }
  setTimeout(tick, del ? 55 : 105);
})();


const revObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('in'), i * 80);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.rev').forEach(el => revObs.observe(el));


const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.n[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step  = Math.max(1, Math.ceil(target / 28));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 45);
    });
    counterObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.astats').forEach(el => counterObs.observe(el));


const heroImg  = document.getElementById('heroImg');
const photoBox = document.getElementById('photoBox');
if (heroImg && photoBox) {
  heroImg.style.transition = 'opacity .22s ease';
  photoBox.addEventListener('mouseenter', () => {
    heroImg.style.opacity = '0';
    setTimeout(() => { heroImg.src = 'mine.jpg'; heroImg.style.opacity = '1'; }, 200);
  });
  photoBox.addEventListener('mouseleave', () => {
    heroImg.style.opacity = '0';
    setTimeout(() => { heroImg.src = 'mine2.jpg'; heroImg.style.opacity = '1'; }, 200);
  });
}


document.querySelectorAll('.wk-c').forEach(card => {
  card.style.transformStyle = 'preserve-3d';
  card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-9px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .5s ease';
    card.style.transform  = '';
    setTimeout(() => card.style.transition = '', 500);
  });
});


(function spawnPtc() {
  const p = document.createElement('div');
  p.className = 'ptc';
  const sz  = Math.random() * 4 + 1.5;
  const col = ['#6366f1','#2dd4bf','#a78bfa'][Math.floor(Math.random() * 3)];
  p.style.cssText = `width:${sz}px;height:${sz}px;background:${col};left:${Math.random()*100}vw;bottom:-10px;animation-duration:${Math.random()*4+3.5}s;animation-delay:${Math.random()*2}s;`;
  document.body.appendChild(p);
  p.addEventListener('animationend', () => p.remove());
  setTimeout(spawnPtc, 660);
})();


const certCards = [...document.querySelectorAll('.cert-card')];
const certBtns  = [...document.querySelectorAll('.cert-nav-btn')];

const ANGLES = [-22, -11, 0, 11, 22];
const SPREAD = [230, 115, 0, 115, 230];
const SIGN   = [-1, -1, 0, 1, 1];
const LIFT   = [32, 16, 0, 16, 32];
const Z_BASE = [1, 2, 5, 2, 1];
let activeIdx = 2;

function fanTx(i) {
  return `rotate(${ANGLES[i]}deg) translateX(${SIGN[i] * SPREAD[i]}px) translateY(${LIFT[i]}px)`;
}
function frontTx() {
  return 'rotate(0deg) translateX(0px) translateY(-12px) scale(1.06)';
}


(function initFan() {
  certCards.forEach((c, i) => {
    c.style.zIndex    = Z_BASE[i];
    c.style.transform = i === activeIdx ? frontTx() : fanTx(i);
  });
  certCards[activeIdx].classList.add('cert-active');
  certBtns[activeIdx].classList.add('active');
})();


function bringToFront(idx) {
  certCards[activeIdx].classList.remove('cert-active');
  certBtns[activeIdx].classList.remove('active');
  certCards[activeIdx].style.zIndex    = Z_BASE[activeIdx];
  certCards[activeIdx].style.transform = fanTx(activeIdx);
  activeIdx = idx;
  certCards[activeIdx].classList.add('cert-active');
  certBtns[activeIdx].classList.add('active');
  certCards[activeIdx].style.zIndex    = 10;
  certCards[activeIdx].style.transform = frontTx();
}


certCards.forEach((card, i) => {
  card.addEventListener('mouseenter', () => {
    if (i === activeIdx) return;
    card.style.zIndex    = 8;
    card.style.transform = frontTx();
  });
  card.addEventListener('mouseleave', () => {
    if (i === activeIdx) return;
    card.style.zIndex    = Z_BASE[i];
    card.style.transform = fanTx(i);
  });
});


function cardClick(idx, src, title) {
  if (idx !== activeIdx) {
    bringToFront(idx);
    setTimeout(() => openCert(src, title), 440);
  } else {
    openCert(src, title);
  }
}

function openCert(src, title) {
  document.getElementById('certLbImg').src           = src;
  document.getElementById('certLbTitle').textContent = title;
  document.getElementById('certLightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCert() {
  document.getElementById('certLightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });


function handleSend(btn) {
  const name    = document.getElementById('cf-name').value.trim()  || 'Visitor';
  const email   = document.getElementById('cf-email').value.trim() || '';
  const subject = document.getElementById('cf-subj').value.trim()  || 'Portfolio Contact';
  const message = document.getElementById('cf-msg').value.trim()   || '';

  window.location.href =
    'mailto:raunaque928@gmail.com' +
    '?subject=' + encodeURIComponent(subject) +
    '&body='    + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);

  const span = btn.querySelector('span');
  span.innerHTML = '<i class="fas fa-check" style="margin-right:.5rem"></i>Opening mail app...';
  btn.style.background = '#16a34a';
  setTimeout(() => {
    span.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:.5rem"></i>Send Message';
    btn.style.background = '';
  }, 3000);
}