// ═══════════ NAV SCROLL BEHAVIOUR ═══════════
const banner = document.getElementById('navBanner');
const bar = document.getElementById('navBar');
let lastScroll = 0;
const COLLAPSE_AT = 60;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > COLLAPSE_AT) {
    banner.classList.add('collapsed');
    bar.classList.add('stuck');
  } else {
    banner.classList.remove('collapsed');
    bar.classList.remove('stuck');
  }
  lastScroll = y;
}, {passive: true});


// SEO: Dynamic page titles
const pageTitles = {
  home: 'FBIS — Robotic Duct Cleaning & Integrated Kitchen Hygiene Technology',
  ventbot: 'VentBot — Robotic Duct Cleaning | FBIS',
  provent: 'Pro-Vent — Automated Probiotic Fogging | FBIS',
  venturion: 'Venturion — Compound-Curve Baffle Filter | FBIS',
  greaseeye: 'GreaseEye — Real-Time Grease Measurement | FBIS',
  kitcheniq: 'Kitchen-IQ — Integrated Management Platform | FBIS',
  sterice: 'Steri-Ice — Ozone Ice Machine Sanitisation | FBIS',
  innpulse: 'InnPulse — Electronic Beer Line Management | FBIS',
  innline: 'InnLine — Pod-Format Beer Line Cleaner | FBIS',
  about: 'Who We Are | FBIS',
  contact: 'Contact | FBIS'
};

// ═══════════ ROUTING ═══════════
let currentPage = 'home';

function go(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (!el) return;
  el.classList.add('active');
  currentPage = page;

  // SEO: Update page title
  document.title = pageTitles[page] || 'FBIS';

  // Scroll to top
  window.scrollTo(0, 0);

  // Reset banner
  banner.classList.remove('collapsed');
  bar.classList.remove('stuck');

  // Update active states in nav bar
  document.querySelectorAll('#navLinks a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Reset and re-observe reveals
  el.querySelectorAll('.r').forEach(r => r.classList.remove('v'));
  setTimeout(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('v'); obs.unobserve(e.target); }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
    el.querySelectorAll('.r').forEach(r => obs.observe(r));
  }, 50);
}

// Initial reveal — delayed for TRIAL 4 intro
setTimeout(() => {
  const obs2 = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('v'); obs2.unobserve(e.target); }
    });
  }, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
  document.querySelectorAll('.page.active .r').forEach(el => obs2.observe(el));
}, 1900);

// ═══════════════════════════════════════════════════════════════
// TRIAL FEATURES — Premium enhancements (remove block to revert)
// ═══════════════════════════════════════════════════════════════

// TRIAL 4: Intro overlay — dismiss after draw completes
(function(){
  const intro = document.getElementById('intro');
  if(!intro) return;
  setTimeout(()=>{ intro.classList.add('done'); }, 1800);
  setTimeout(()=>{ intro.remove(); }, 2500);
})();

// TRIAL 1: Stat counter animation
(function(){
  const vals = document.querySelectorAll('.stat-band-val');
  if(!vals.length) return;
  const countObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      if(el.dataset.counted) return;
      el.dataset.counted = '1';
      const raw = el.textContent.trim();
      const match = raw.match(/^([\d.]+)(.*)$/);
      if(!match) return;
      const target = parseFloat(match[1]);
      const suffix = match[2];
      const isFloat = raw.includes('.');
      const duration = 1200;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
        const val = target * ease;
        el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  },{threshold:0.5});
  vals.forEach(v=>countObs.observe(v));
})();

// TRIAL 1: Parallax on watermark (uses margin to avoid conflicting with CSS rotation transform)
(function(){
  const wm = document.querySelector('.hero-watermark');
  if(!wm) return;
  let ticking = false;
  window.addEventListener('scroll',()=>{
    if(!ticking){
      ticking = true;
      requestAnimationFrame(()=>{
        const y = window.scrollY;
        wm.style.marginTop = (y * 0.15) + 'px';
        ticking = false;
      });
    }
  },{passive:true});
})();

// TRIAL 3: Magnetic button effect
(function(){
  document.querySelectorAll('.hero-full .btn, .hero-full .btn-o').forEach(btn=>{
    btn.addEventListener('mousemove',(e)=>{
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * 0.2;
      const y = (e.clientY - r.top - r.height/2) * 0.2;
      btn.style.transform = 'translate('+x+'px,'+y+'px)';
    });
    btn.addEventListener('mouseleave',()=>{
      btn.style.transform = 'translate(0,0)';
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
// END TRIAL FEATURES
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// TRIAL FEATURES BATCH 2
// ═══════════════════════════════════════════════════════════════

// TRIAL: Scroll progress bar
(function(){
  const bar = document.getElementById('scrollProgress');
  if(!bar) return;
  window.addEventListener('scroll',()=>{
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if(h > 0) bar.style.width = (window.scrollY / h * 100) + '%';
  },{passive:true});
})();

// TRIAL: Watermark speed change on scroll
(function(){
  const wm = document.querySelector('.hero-watermark');
  if(!wm) return;
  let baseSpeed = 60;
  window.addEventListener('scroll',()=>{
    const y = window.scrollY;
    const speed = Math.max(8, baseSpeed - (y * 0.08));
    wm.style.animationDuration = speed + 's';
  },{passive:true});
})();

// TRIAL: Smooth page transitions
(function(){
  const origGo = window.go;
  window.go = function(page){
    const current = document.querySelector('.page.active');
    if(current){
      current.classList.add('fade-out');
      setTimeout(()=>{
        current.classList.remove('fade-out');
        origGo(page);
      }, 350);
    } else {
      origGo(page);
    }
  };
})();

// TRIAL: Ambient particles
(function(){
  const c = document.getElementById('particles');
  if(!c) return;
  const ctx = c.getContext('2d');
  let w, h, dots = [];
  const COUNT = 35;

  function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for(let i = 0; i < COUNT; i++){
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.15,
      dy: (Math.random() - 0.5) * 0.12,
      o: Math.random() * 0.4 + 0.1
    });
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      d.x += d.dx;
      d.y += d.dy;
      if(d.x < 0) d.x = w;
      if(d.x > w) d.x = 0;
      if(d.y < 0) d.y = h;
      if(d.y > h) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + d.o + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ═══════════════════════════════════════════════════════════════
// END TRIAL FEATURES BATCH 2
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM, COOKIES, ANALYTICS
// ═══════════════════════════════════════════════════════════════

// Add privacy page title
if(typeof pageTitles !== 'undefined') pageTitles.privacy = 'Privacy Policy | FBIS';

// ═══════════ CONTACT FORM (Formspree via fetch) ═══════════
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const btn = document.getElementById('formBtn');
    const status = document.getElementById('formStatus');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(r){
      if(r.ok){
        status.textContent = 'Message sent — we\'ll be in touch shortly.';
        status.className = 'form-success';
        status.style.display = 'block';
        form.reset();
        btn.textContent = 'Sent ✓';
        setTimeout(function(){ btn.textContent = origText; btn.disabled = false; }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(function(){
      status.textContent = 'Something went wrong. Please email us directly at info@fbis-europe.com';
      status.className = 'form-error';
      status.style.display = 'block';
      btn.textContent = origText;
      btn.disabled = false;
    });
  });
})();

// ═══════════ COOKIE CONSENT ═══════════
function getCookieConsent(){
  try { return localStorage.getItem('fbis_cookies'); } catch(e){ return null; }
}
function setCookieConsent(val){
  try { localStorage.setItem('fbis_cookies', val); } catch(e){}
}

function acceptCookies(){
  setCookieConsent('accepted');
  document.getElementById('cookieBanner').classList.remove('show');
  loadAnalytics();
}

function declineCookies(){
  setCookieConsent('declined');
  document.getElementById('cookieBanner').classList.remove('show');
}

// Show banner if no consent recorded
(function(){
  const consent = getCookieConsent();
  if(!consent){
    setTimeout(function(){
      document.getElementById('cookieBanner').classList.add('show');
    }, 2500); // delay so it doesn't compete with intro
  } else if(consent === 'accepted'){
    loadAnalytics();
  }
})();

// ═══════════ GOOGLE ANALYTICS (GA4) ═══════════
// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
function loadAnalytics(){
  if(document.getElementById('ga-script')) return; // already loaded
  var s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(s);
  s.onload = function(){
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  };
}

// Track SPA page views
(function(){
  var origGo2 = window.go;
  window.go = function(page){
    origGo2(page);
    if(window.gtag){
      gtag('event', 'page_view', {
        page_title: document.title,
        page_path: '/' + page
      });
    }
  };
})();

// ═══════════════════════════════════════════════════════════════
// END CONTACT FORM, COOKIES, ANALYTICS
// ═══════════════════════════════════════════════════════════════
