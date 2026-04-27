/* =====================================================
   MARIA BOUDJELAL — PORTFOLIO SCRIPT
   Professional Blue Edition — 2025
   ===================================================== */

// ===== EMAILJS INIT =====
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: 'uAO0spIX-hZyYspIj' });
  }
})();

// ===== NAVBAR SCROLL + ACTIVE =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.snap-section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sdots = document.querySelectorAll('.sdot');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Highlight active section
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      current = sec.id;
    }
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.section === current);
  });
  sdots.forEach(d => {
    d.classList.toggle('active', d.dataset.target === current);
  });

  // Timeline fill
  animateTimeline();
}, { passive: true });

// Section dot clicks
sdots.forEach(d => {
  d.addEventListener('click', () => {
    document.getElementById(d.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ===== HERO CANVAS (particle field) =====
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticles() {
    particles = [];
    const n = Math.floor((W * H) / 18000);
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59,130,246,0.35)';
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37,99,235,${0.06 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  makeParticles();
  draw();
  window.addEventListener('resize', () => { resize(); makeParticles(); });
})();

// ===== ROLE TYPEWRITER =====
const roles = ['Graphic Designer', 'AI Art Creator', 'Brand Storyteller', 'Motion Designer', 'Full-Stack Developer', 'CS Graduate'];
let ri = 0, ci = 0, deleting = false;
const roleEl = document.getElementById('role-text');

function typeRole() {
  if (!roleEl) return;
  const word = roles[ri];
  if (deleting) {
    ci--;
    roleEl.textContent = word.slice(0, ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    setTimeout(typeRole, 60);
  } else {
    ci++;
    roleEl.textContent = word.slice(0, ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
    } else {
      setTimeout(typeRole, 90);
    }
  }
}
setTimeout(typeRole, 600);

// ===== HERO STATS COUNT UP =====
function countUp() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const step = Math.ceil(target / 40);
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}
let statsAnimated = false;
const heroObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    countUp();
  }
}, { threshold: 0.5 });
const heroSection = document.getElementById('hero');
if (heroSection) heroObs.observe(heroSection);

// ===== RADIAL SKILLS ANIMATION =====
const radialObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.radial-fill').forEach(circle => {
        const pct = +circle.dataset.pct;
        const circumference = 2 * Math.PI * 34;
        const offset = circumference * (1 - pct / 100);
        setTimeout(() => {
          circle.style.strokeDashoffset = offset;
        }, 200);
      });
      radialObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) radialObs.observe(skillsSection);

// ===== TIMELINE ANIMATION =====
const tlItems = document.querySelectorAll('.tl-event');
const tlFill = document.getElementById('tl-fill');

function animateTimeline() {
  const tl = document.querySelector('.exp-timeline-wrap');
  if (!tl) return;
  const rect = tl.getBoundingClientRect();
  const viewH = window.innerHeight;
  if (rect.top > viewH || rect.bottom < 0) return;

  const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (rect.height + viewH)));
  if (tlFill) tlFill.style.height = (progress * 100) + '%';

  tlItems.forEach(item => {
    const iRect = item.getBoundingClientRect();
    if (iRect.top < viewH * 0.85) item.classList.add('visible');
  });
}
animateTimeline();

// ===== GALLERY DATA =====
const galleryData = {
  posts: {
    title: 'Social Media Posts (4:5)',
    icon: 'fa-brands fa-instagram',
    images: [
      'images/Posts 4.5/1.png', 'images/Posts 4.5/1 (2).png', 'images/Posts 4.5/5.png',
      'images/Posts 4.5/6.png', 'images/Posts 4.5/11.png', 'images/Posts 4.5/14.png',
      'images/Posts 4.5/16.png', 'images/Posts 4.5/17.png', 'images/Posts 4.5/18.png'
    ]
  },
  stories: {
    title: 'Instagram Stories (9:16)',
    icon: 'fa-solid fa-mobile-screen',
    images: [
      'images/Stories 9.16/2.png', 'images/Stories 9.16/2 (2).png',
      'images/Stories 9.16/3.png', 'images/Stories 9.16/3 (2).png', 'images/Stories 9.16/7.png'
    ]
  },
  digital: {
    title: 'Digital Art',
    icon: 'fa-solid fa-palette',
    images: [
      'images/Digital Art/10.jpg', 'images/Digital Art/104.jpg', 'images/Digital Art/12.jpeg',
      'images/Digital Art/124.jpeg', 'images/Digital Art/19.jpeg', 'images/Digital Art/30.jpg',
      'images/Digital Art/43.jpg', 'images/Digital Art/67.jpeg', 'images/Digital Art/68.jpeg',
      'images/Digital Art/71.png', 'images/Digital Art/78.jpeg', 'images/Digital Art/80.jpeg'
    ]
  },
  mockups: {
    title: 'Mockups (1:1)',
    icon: 'fa-solid fa-box',
    images: [
      'images/Mockups 1.1/1.png', 'images/Mockups 1.1/1 (2).png', 'images/Mockups 1.1/4.png',
      'images/Mockups 1.1/6.png', 'images/Mockups 1.1/9.png', 'images/Mockups 1.1/14.png',
      'images/Mockups 1.1/17.png', 'images/Mockups 1.1/20.png'
    ]
  },
  journals: {
    title: 'Journal Covers (A5)',
    icon: 'fa-solid fa-book-open',
    images: [
      'images/Journals Covers A5/1.png', 'images/Journals Covers A5/10.png',
      'images/Journals Covers A5/13.png', 'images/Journals Covers A5/16.png'
    ]
  },
  notebooks: {
    title: 'Notebook Covers (A5)',
    icon: 'fa-solid fa-book',
    images: [
      'images/Notes Books A5/1.png', 'images/Notes Books A5/2.png', 'images/Notes Books A5/3.png'
    ]
  }
};

let activeGalleryType = null;

// Gallery strip — each image is appended directly, placeholder shown while loading
function openGallery(type, tabEl) {
  activeGalleryType = type;
  document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
  if (tabEl) tabEl.classList.add('active');

  const data = galleryData[type];
  if (!data) return;
  const strip = document.getElementById('gallery-strip-inner');
  strip.innerHTML = '';

  data.images.forEach((src, index) => {
    // Placeholder div in DOM order
    const ph = document.createElement('div');
    ph.className = 'gallery-thumb-placeholder';
    ph.dataset.index = index;
    ph.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    ph.style.cursor = 'pointer';
    ph.addEventListener('click', () => openGalleryModal(type, index));
    strip.appendChild(ph);

    const img = document.createElement('img');
    img.className = 'gallery-thumb';
    img.alt = 'Design work';
    img.style.cursor = 'pointer';

    img.addEventListener('click', () => openGalleryModal(type, index));

    img.onload = () => {
      if (ph.parentNode === strip) {
        strip.replaceChild(img, ph);
      }
    };

    img.onerror = () => {
      ph.innerHTML = '<i class="fa-solid fa-image"></i><span style="font-size:0.6rem;margin-top:4px;word-break:break-all">' + src.split('/').pop() + '</span>';
    };

    img.src = src;
  });
}

let gallerySwiper = null;
function openGalleryModal(type, startIndex) {
  const data = galleryData[type];
  if (!data) return;

  document.getElementById('gallery-title').textContent = data.title;
  const wrap = document.getElementById('gallery-slides');
  wrap.innerHTML = '';

  data.images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    const img = document.createElement('img');
    img.src = src; img.alt = 'Design'; img.loading = 'lazy';
    img.onerror = function () {
      this.style.display = 'none';
      const ph = document.createElement('div');
      ph.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:260px;color:rgba(255,255,255,0.3);gap:12px;padding:20px;text-align:center;';
      ph.innerHTML = '<i class="fa-solid fa-image fa-3x"></i><span style="font-size:0.8rem">' + src + '</span>';
      slide.appendChild(ph);
    };
    slide.appendChild(img);
    wrap.appendChild(slide);
  });

  document.getElementById('gallery-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (gallerySwiper) { gallerySwiper.destroy(true, true); gallerySwiper = null; }
    gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      initialSlide: startIndex || 0,
      spaceBetween: 14,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      loop: data.images.length > 1
    });
  }, 80);
}

function closeGallery() {
  document.getElementById('gallery-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== SERVICE MODAL DATA =====
const serviceContent = {
  tshirts: {
    icon: 'fa-solid fa-shirt',
    title: 'T-Shirts & Merch',
    desc: 'Custom graphics for tees, hoodies, tote bags and more. From typographic to illustrated — all print-ready.',
    items: ['Graphic tees & hoodies', 'Custom text designs', 'Illustrated graphics', '3D t-shirt mockup videos', 'Print-ready files']
  },
  logos: {
    icon: 'fa-solid fa-pen-ruler',
    title: 'Logo & Brand Identity',
    desc: 'Full brand identity from scratch. Logo, colour palette, typography and brand guide — everything to look professional and memorable.',
    items: ['Logo design (multiple concepts)', 'Colour palette & typography', 'Brand guide document', 'Social media kit', 'Business card design']
  },
  packaging: {
    icon: 'fa-solid fa-box',
    title: 'Packaging Design',
    desc: 'Beautiful packaging that stops the scroll. From box and pouch design to realistic AI mockups.',
    items: ['Box & pouch design', 'Label & sticker design', 'Realistic AI mockups', 'Print-ready files']
  },
  stationery: {
    icon: 'fa-solid fa-bookmark',
    title: 'Stationery & Print',
    desc: 'Full stationery sets that look amazing. Card decks, journals, planners and more — start to finish.',
    items: ['Card decks (full design)', 'Journal covers & interiors', 'Notebook covers (A5)', 'Planners & calendars', 'Bookmarks & stickers', 'Stamps']
  },
  presentations: {
    icon: 'fa-solid fa-display',
    title: 'Animated Presentations',
    desc: 'Canva slides that genuinely impress. Great visuals, smooth animations and clear storytelling.',
    items: ['Animated Canva presentations', 'Pitch decks', 'Academic defence slides', 'Event slideshows', 'Data & infographic slides']
  },
  latex: {
    icon: 'fa-solid fa-file-lines',
    title: 'LaTeX & Reports',
    desc: 'Expert LaTeX formatting. I fix errors and format thesis documents with graphs, tables and complex notation.',
    items: ['Thesis & dissertation formatting', 'Academic reports & papers', 'Technical documentation', 'Teaching materials', 'LaTeX error fixing']
  },
  books: {
    icon: 'fa-solid fa-book',
    title: 'Book Covers & Magazines',
    desc: 'Covers and layouts that grab attention. From novels to academic magazines.',
    items: ['Book cover design', 'Magazine layout', 'Ebook covers', 'Print & digital formats', 'Multiple concepts']
  },
  video: {
    icon: 'fa-solid fa-video',
    title: 'Video & Motion',
    desc: 'Social reels, tutorials, full videos. Editing and motion graphics that make content unforgettable.',
    items: ['Social media editing (CapCut)', 'Tutorial video editing (Camtasia)', 'Motion graphics', '3D product videos (AI)', 'Animated intros & outros']
  }
};

function openServiceModal(type) {
  const d = serviceContent[type];
  if (!d) return;
  document.getElementById('service-modal-content').innerHTML = `
    <div style="margin-bottom:20px">
      <div style="font-size:2.5rem;color:var(--blue-400);margin-bottom:14px"><i class="${d.icon}"></i></div>
      <h3 style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;color:white;margin-bottom:10px">${d.title}</h3>
      <p style="font-size:0.9rem;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:20px">${d.desc}</p>
      <h4 style="font-family:var(--font-display);font-size:0.78rem;font-weight:800;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:14px">What's included</h4>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px">
        ${d.items.map(item => `<li style="display:flex;align-items:center;gap:12px;font-size:0.88rem;color:rgba(255,255,255,0.75)"><i class="fa-solid fa-check" style="color:var(--blue-400);flex-shrink:0"></i>${item}</li>`).join('')}
      </ul>
      <div style="text-align:center">
        <a href="#contact" class="btn-primary" onclick="closeServiceModal();document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
          Get a Quote <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>`;
  document.getElementById('service-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  document.getElementById('service-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// Close modals on overlay click
document.getElementById('service-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('service-overlay')) closeServiceModal();
});
document.getElementById('gallery-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('gallery-overlay')) closeGallery();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeServiceModal();
    closeGallery();
  }
});

// ===== COPY TO CLIPBOARD =====
function copyText(text, el) {
  navigator.clipboard?.writeText(text).then(() => {
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 1600);
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 1600);
  });
}

// ===== CONTACT FORM =====
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');

  btn.disabled = true;
  btn.innerHTML = '<span>Sending…</span><i class="fa-solid fa-spinner fa-spin"></i>';
  successEl.classList.add('hidden');
  errorEl.classList.add('hidden');

  if (typeof emailjs === 'undefined') {
    setTimeout(() => {
      successEl.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
      form.reset();
      launchConfetti();
    }, 1200);
    return;
  }

  emailjs.send('service_700o5n8', 'template_portfolio', {
    from_name: form.from_name.value,
    from_email: form.from_email.value,
    service: form.service.value,
    message: form.message.value,
    reply_to: form.from_email.value,
  }).then(() => {
    successEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
    form.reset();
    launchConfetti();
  }, () => {
    errorEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<span>Send Message</span><i class="fa-solid fa-paper-plane"></i>';
  });
}

// ===== CONFETTI =====
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#3b82f6', '#60a5fa', '#2563eb', '#93c5fd', '#0ea5e9', '#6366f1', '#a5b4fc', '#dbeafe'];
  const pts = [];
  for (let i = 0; i < 200; i++) {
    pts.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 3, h: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360, rs: (Math.random() - 0.5) * 7,
      vy: Math.random() * 3.5 + 1.5, vx: (Math.random() - 0.5) * 2, op: 1
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      p.y += p.vy; p.x += p.vx; p.rot += p.rs;
      if (frame > 90) p.op = Math.max(0, p.op - 0.012);
      ctx.save(); ctx.globalAlpha = p.op;
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ===== TILE HOVER GLOW =====
document.querySelectorAll('.skill-tile').forEach(tile => {
  tile.addEventListener('mousemove', (e) => {
    const rect = tile.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    tile.style.setProperty('--mx', x + '%');
    tile.style.setProperty('--my', y + '%');
  });
});

// ===== KONAMI CODE EASTER EGG =====
const kc = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === kc[ki]) { ki++; } else { ki = 0; }
  if (ki === kc.length) {
    ki = 0;
    launchConfetti();
    const msg = document.createElement('div');
    msg.innerHTML = '✦ You found the secret! ✦';
    msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--blue-700);color:white;padding:24px 40px;border-radius:16px;font-family:var(--font-display);font-size:1.3rem;font-weight:800;z-index:99999;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.4);animation:popup-anim 0.4s ease;';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2800);
  }
});
const puStyle = document.createElement('style');
puStyle.textContent = '@keyframes popup-anim{from{transform:translate(-50%,-50%) scale(0.6);opacity:0;}to{transform:translate(-50%,-50%) scale(1);opacity:1;}}';
document.head.appendChild(puStyle);

// ===== CONSOLE EASTER EGG =====
console.log('%c✦ Maria Boudjelal · Portfolio 2025', 'color:#3b82f6;font-size:18px;font-weight:bold;font-family:Syne,sans-serif;');
console.log('%cGraphic Designer · AI Art Creator · Developer', 'color:#60a5fa;font-size:12px;');
console.log('%cMariaboudjelal17@gmail.com', 'color:#93c5fd;font-size:11px;');
console.log('%cHey recruiter 👋 — she designed this herself.', 'color:#a5b4fc;font-size:11px;font-style:italic;');

// ===== DEFAULT GALLERY: load Social Posts on startup =====
window.addEventListener('load', () => {
  const firstTab = document.querySelector('.gtab[onclick*="posts"]');
  openGallery('posts', firstTab);
});