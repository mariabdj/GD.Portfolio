// ==========================================
//  MARIA BOUDJELAL — PORTFOLIO SCRIPT ✦
// ==========================================

// ===== EMAILJS INIT =====
(function(){
  emailjs.init({ publicKey: 'uAO0spIX-hZyYspIj' });
})();

// ===== AOS =====
AOS.init({ duration: 550, once: false, easing: 'ease-out-cubic', offset: 70 });

// ===== SPARKLE TRAIL (lightweight) =====
const sparkContainer = document.getElementById('sparkles-container');
const sparkEmojis = ['✨','🌸','·','°','✦','🩷'];
let lastSpark = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSpark < 120) return;
  lastSpark = now;
  const spark = document.createElement('div');
  spark.className = 'sparkle';
  spark.textContent = sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)];
  spark.style.left = (e.clientX + (Math.random()-0.5)*16) + 'px';
  spark.style.top  = (e.clientY + (Math.random()-0.5)*16) + 'px';
  spark.style.fontSize = (Math.random()*10+8)+'px';
  sparkContainer.appendChild(spark);
  setTimeout(() => spark.remove(), 1000);
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => navbar.classList.toggle('menu-open'));
document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => navbar.classList.remove('menu-open')));

// ===== GALLERY DATA =====
const galleryData = {
  posts: {
    title: '<i class="fa-brands fa-instagram"></i> Social Media Posts (4:5)',
    images: [
      'images/Posts 4.5/1.png','images/Posts 4.5/1 (2).png','images/Posts 4.5/5.png',
      'images/Posts 4.5/6.png','images/Posts 4.5/11.png','images/Posts 4.5/14.png',
      'images/Posts 4.5/16.png','images/Posts 4.5/17.png','images/Posts 4.5/18.png'
    ]
  },
  stories: {
    title: '<i class="fa-solid fa-mobile-screen"></i> Instagram Stories (9:16)',
    images: [
      'images/Stories 9.16/2.png','images/Stories 9.16/2 (2).png',
      'images/Stories 9.16/3.png','images/Stories 9.16/3 (2).png','images/Stories 9.16/7.png'
    ]
  },
  digital: {
    title: '<i class="fa-solid fa-palette"></i> Digital Art',
    images: [
      'images/Digital Art/10.jpg','images/Digital Art/104.jpg','images/Digital Art/12.jpeg',
      'images/Digital Art/124.jpeg','images/Digital Art/19.jpeg','images/Digital Art/30.jpg',
      'images/Digital Art/43.jpg','images/Digital Art/67.jpeg','images/Digital Art/68.jpeg',
      'images/Digital Art/71.png','images/Digital Art/78.jpeg','images/Digital Art/80.jpeg'
    ]
  },
  mockups: {
    title: '<i class="fa-solid fa-box"></i> Mockups (1:1)',
    images: [
      'images/Mockups 1.1/1.png','images/Mockups 1.1/1 (2).png','images/Mockups 1.1/4.png',
      'images/Mockups 1.1/6.png','images/Mockups 1.1/9.png','images/Mockups 1.1/14.png',
      'images/Mockups 1.1/17.png','images/Mockups 1.1/20.png'
    ]
  },
  journals: {
    title: '<i class="fa-solid fa-book-open"></i> Journal Covers (A5)',
    images: [
      'images/Journals Covers A5/1.png','images/Journals Covers A5/10.png',
      'images/Journals Covers A5/13.png','images/Journals Covers A5/16.png'
    ]
  },
  notebooks: {
    title: '<i class="fa-solid fa-book"></i> Notebook Covers (A5)',
    images: [
      'images/Notes Books A5/1.png','images/Notes Books A5/2.png','images/Notes Books A5/3.png'
    ]
  }
};

let gallerySwiper = null;

function openGallery(type) {
  const data = galleryData[type];
  if (!data) return;
  document.getElementById('gallery-title').innerHTML = data.title;
  const wrap = document.getElementById('gallery-slides');
  wrap.innerHTML = '';

  data.images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    const img = document.createElement('img');
    img.src = src; img.alt = 'Design'; img.loading = 'lazy';
    img.onerror = function(){
      this.style.display='none';
      const ph = document.createElement('div');
      ph.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;height:260px;color:#e8a898;gap:12px;padding:20px;text-align:center;';
      ph.innerHTML='<i class="fa-solid fa-image fa-3x"></i><span style="font-size:0.8rem;color:#b89090;font-family:Nunito,sans-serif">'+src+'</span>';
      slide.appendChild(ph);
    };
    slide.appendChild(img);
    wrap.appendChild(slide);
  });

  document.getElementById('gallery-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (gallerySwiper){ gallerySwiper.destroy(true,true); gallerySwiper=null; }
    gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 12,
      centeredSlides: true,
      pagination:{ el:'.swiper-pagination', clickable:true },
      navigation:{ nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev' },
      loop: data.images.length > 1,
    });
  }, 80);
}

function closeGallery(){
  document.getElementById('gallery-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== SERVICE MODALS =====
const serviceContent = {
  tshirts:{ icon:'<i class="fa-solid fa-shirt fa-2x"></i>', title:'T-Shirts & Merch', desc:'I design graphics for tees, hoodies, tote bags and more. From type-based to illustrated, all ready for print!.', items:['Graphic tees & hoodies','Custom text designs','Illustrated graphics','3D t-shirt mockup videos','Print-ready files'] },
  logos:{ icon:'<i class="fa-solid fa-pen-ruler fa-2x"></i>', title:'Logo & Branding', desc:'Full brand identity from scratch. Logo, colours, fonts, brand guide, everything to look professional and memorable..', items:['Logo design (multiple ideas)','Colour palette & typography','Brand guide','Social media kit','Business card design'] },
  packaging:{ icon:'<i class="fa-solid fa-box fa-2x"></i>', title:'Packaging Design', desc:'Beautiful packaging that stops the scroll. I design packaging that sells.', items:['Box & pouch design','Label & sticker design','Realistic AI mockups','Print-ready files'] },
  stationery:{ icon:'<i class="fa-solid fa-bookmark fa-2x"></i>', title:'Stationery & Print', desc:'Full stationery sets that look amazing. I designed full card decks, journals, planners and more from start to finish.', items:['Card decks (full design)','Journal covers & interiors','Notebook covers (A5)','Planners & calendars','Bookmarks & stickers','Stamps'] },
  presentations:{ icon:'<i class="fa-solid fa-display fa-2x"></i>', title:'Animated Presentations', desc:'Canva slides that actually impress people. Great visuals, smooth animations and clear storytelling.', items:['Animated Canva presentations','Pitch decks','Academic defense slides','Event slideshows','Data slides'] },
  latex:{ icon:'<i class="fa-solid fa-file-lines fa-2x"></i>', title:'LaTeX / Reports', desc:'Expert LaTeX work. I fix errors and format thesis documents with graphs, tables and complex notation.', items:['Thesis & dissertation formatting','Academic reports & papers','Technical documentation','Teaching materials','LaTeX error fixing'] },
  books:{ icon:'<i class="fa-solid fa-book fa-2x"></i>', title:'Book Covers & Magazines', desc:'Book covers and magazine layouts that grab attention. From novels to academic magazines.', items:['Book cover design','Magazine layout','Ebook covers','Print & digital formats','Multiple concepts'] },
  video:{ icon:'<i class="fa-solid fa-video fa-2x"></i>', title:'Video Editing & Motion', desc:'Social reels, tutorials, full videos. I edit and add motion to make content unforgettable.', items:['Social media editing (CapCut)','Tutorial video editing (Camtasia)','Motion graphics','3D product videos (AI)','Animated intros & outros'] }
};

function openServiceModal(type){
  const d = serviceContent[type];
  if(!d) return;
  document.getElementById('service-modal-content').innerHTML = `
    <div style="text-align:center;margin-bottom:18px;color:var(--pink-dark)">${d.icon}</div>
    <h3 style="text-align:center;margin-bottom:12px">${d.title}</h3>
    <p>${d.desc}</p>
    <h4 style="margin:14px 0 10px;color:var(--text-dark)">What's included:</h4>
    <ul>${d.items.map(i=>`<li><i class="fa-solid fa-check" style="color:var(--pink-main)"></i> ${i}</li>`).join('')}</ul>
    <div style="text-align:center;margin-top:22px">
      <a href="#contact" class="btn-primary" onclick="closeServiceModal();document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
        <i class="fa-regular fa-envelope"></i> Get a Quote
      </a>
    </div>`;
  document.getElementById('service-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeServiceModal(){
  document.getElementById('service-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('gallery-overlay').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeGallery(); });
document.getElementById('service-overlay').addEventListener('click',e=>{ if(e.target===e.currentTarget) closeServiceModal(); });

// ===== SOFT SKILLS RINGS =====
function animateRings(){
  document.querySelectorAll('.ss-fill').forEach(c=>{
    const pct = parseFloat(c.getAttribute('data-pct'));
    c.style.strokeDashoffset = 94.2 - (pct/100)*94.2;
  });
}
const skillsObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) animateRings(); });
},{threshold:0.3});
const skillsSec = document.getElementById('skills');
if(skillsSec) skillsObs.observe(skillsSec);

// ===== TOOLKIT — MANUAL DRAG/SWIPE + AUTO SCROLL =====
const toolsTrack = document.getElementById('tools-scroll-inner');
if(toolsTrack){
  let isDragging = false, startX = 0, scrollLeft = 0, autoScrollActive = true, autoScrollTimer = null;
  const wrapper = toolsTrack.parentElement;
  let currentOffset = 0;
  const speed = 0.5; // px per frame

  // Auto-scroll via RAF
  let rafId = null;
  function autoScroll(){
    if(!autoScrollActive){ rafId = requestAnimationFrame(autoScroll); return; }
    currentOffset += speed;
    const halfWidth = toolsTrack.scrollWidth / 2;
    if(currentOffset >= halfWidth) currentOffset = 0;
    toolsTrack.style.transform = `translateX(-${currentOffset}px)`;
    rafId = requestAnimationFrame(autoScroll);
  }
  rafId = requestAnimationFrame(autoScroll);

  function pauseAuto(){
    autoScrollActive = false;
    clearTimeout(autoScrollTimer);
    autoScrollTimer = setTimeout(()=>{ autoScrollActive = true; }, 2000);
  }

  // Mouse drag
  wrapper.addEventListener('mousedown',e=>{
    isDragging=true; startX=e.pageX; scrollLeft=currentOffset;
    pauseAuto();
    wrapper.style.cursor='grabbing';
  });
  window.addEventListener('mouseup',()=>{ isDragging=false; wrapper.style.cursor=''; });
  window.addEventListener('mousemove',e=>{
    if(!isDragging) return;
    const dx = startX - e.pageX;
    const halfWidth = toolsTrack.scrollWidth / 2;
    currentOffset = ((scrollLeft + dx) % halfWidth + halfWidth) % halfWidth;
    toolsTrack.style.transform = `translateX(-${currentOffset}px)`;
  });

  // Touch drag
  wrapper.addEventListener('touchstart',e=>{
    startX=e.touches[0].pageX; scrollLeft=currentOffset;
    pauseAuto();
  },{passive:true});
  wrapper.addEventListener('touchmove',e=>{
    const dx = startX - e.touches[0].pageX;
    const halfWidth = toolsTrack.scrollWidth / 2;
    currentOffset = ((scrollLeft + dx) % halfWidth + halfWidth) % halfWidth;
    toolsTrack.style.transform = `translateX(-${currentOffset}px)`;
  },{passive:true});
}

// ===== ORACLE =====
const answers = [
  '🌸 Less is more... unless you\'re adding pink!',
  '✨ That font? Make it bigger. Even bigger.',
  '<i class="fa-solid fa-palette"></i> Go bolder with your colours.',
  '💕 White space is your best friend.',
  '⭐ A good logo takes 5 seconds to make sense.',
  '🔮 The design you love at 2am is still good in the morning.',
  '✦ Consistency plus creativity equals something unforgettable.',
  '🌸 Pink makes everything better. Science.',
  '<i class="fa-solid fa-lightbulb"></i> Trust the grid. Trust the vibe.',
  '🌷 Great design is felt, not just seen.',
  '✨ Make it weird. Then weirder. Then stop.',
];
function askOracle(){
  const val = document.getElementById('oracle-input').value.trim();
  const ans = document.getElementById('oracle-answer');
  if(!val){ ans.innerHTML='✨ Ask me something first!'; return; }
  ans.innerHTML = '🔮 Thinking...'; ans.style.opacity='0.5';
  setTimeout(()=>{
    ans.innerHTML = answers[Math.floor(Math.random()*answers.length)];
    ans.style.opacity='1';
    document.getElementById('oracle-input').value='';
  },700);
}
document.getElementById('oracle-input')?.addEventListener('keypress',e=>{ if(e.key==='Enter') askOracle(); });

// ===== PALETTE GENERATOR — PINK =====
const palettes = [
  ['#e8799a','#f0a0b8','#f8c8d8','#fdeef3','#9c7cc8'],
  ['#c94c78','#e8799a','#f0a0b8','#f8c8d8','#fdeef3'],
  ['#d48090','#e8799a','#c4b0e8','#f0a0b8','#9c7cc8'],
  ['#f0a0b8','#e8799a','#6dbdb8','#f8c8d8','#fdeef3'],
  ['#c94c78','#f0a0b8','#9c7cc8','#e8799a','#f8c8d8'],
  ['#e8799a','#d48090','#9c7cc8','#fdeef3','#6dbdb8'],
  ['#f8c8d8','#e8799a','#c094c4','#f0a0b8','#c94c78'],
];
function generatePalette(){
  const p = palettes[Math.floor(Math.random()*palettes.length)];
  document.querySelectorAll('.pal-swatch').forEach((s,i)=>{
    s.style.transform='scale(1.3) rotate(8deg)';
    setTimeout(()=>{ s.style.background=p[i]; s.style.transform='scale(1)'; },120+i*55);
  });
}

// ===== CONFETTI — PINK =====
function launchConfetti(){
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const colors=['#e8799a','#f0a0b8','#f8c8d8','#fdeef3','#c94c78','#9c7cc8','#d48090','#c094c4'];
  const pts=[];
  for(let i=0;i<180;i++){
    pts.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height-canvas.height,
      w:Math.random()*10+3, h:Math.random()*5+2,
      color:colors[Math.floor(Math.random()*colors.length)],
      rot:Math.random()*360, rs:(Math.random()-0.5)*7,
      vy:Math.random()*3.5+1.5, vx:(Math.random()-0.5)*2, op:1 });
  }
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p=>{
      p.y+=p.vy; p.x+=p.vx; p.rot+=p.rs;
      if(frame>80) p.op=Math.max(0,p.op-0.013);
      ctx.save(); ctx.globalAlpha=p.op;
      ctx.translate(p.x+p.w/2,p.y+p.h/2); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    });
    frame++;
    if(frame<170) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

// ===== CONSOLE EASTER EGG =====
console.log('%c✨ Hey, you found the console! 🌸', 'color:#FF8FAB;font-size:18px;font-weight:bold;font-family:Pacifico,cursive;');
console.log('%cMaria Boudjelal · Portfolio 2025', 'color:#e05580;font-size:14px;font-weight:bold;');
console.log('%cMariaboudjelal17@gmail.com', 'color:#b39ddb;font-size:12px;');

// ===== HEART COUNTER =====
let hearts=0;
const msgs=['','💕 Aw, thanks!','🌸 You\'re so sweet!','✨ Keep going!','😊 This makes my day!','🎀 You\'re wonderful!','💖 Okay I love you!!','🤩 WOW you really like it!','🌷 You\'re amazing!','🔥 UNSTOPPABLE!','👑 You\'re royalty.','💕 I\'m crying now 😭'];
function addHeart(){
  hearts++;
  const c = document.getElementById('heart-counter');
  c.textContent=hearts; c.style.transform='scale(1.5)';
  setTimeout(()=>c.style.transform='scale(1)',280);
  const mi = Math.min(hearts,msgs.length-1);
  document.getElementById('heart-message').textContent=msgs[mi];
  // mini heart burst
  const btn=document.querySelector('.heart-btn');
  if(!btn) return;
  const r=btn.getBoundingClientRect();
  for(let i=0;i<6;i++){
    const h=document.createElement('span');
    h.textContent='❤️'; h.style.cssText=`position:fixed;font-size:1.1rem;left:${r.left+r.width/2}px;top:${r.top}px;pointer-events:none;z-index:9999;`;
    const a=(i/6)*360, d=50+Math.random()*30;
    h.style.setProperty('--tx',Math.cos(a*Math.PI/180)*d+'px');
    h.style.setProperty('--ty',-d+'px');
    h.style.animation='hfly 0.9s ease-out forwards';
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),900);
  }
}
const hflyStyle=document.createElement('style');
hflyStyle.textContent='@keyframes hfly{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0.2);}}';
document.head.appendChild(hflyStyle);

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text,el){
  navigator.clipboard?.writeText(text).then(()=>{
    el.classList.add('copied');
    setTimeout(()=>el.classList.remove('copied'),1600);
  });
}

// ===== CONTACT FORM + EMAILJS =====
function submitForm(e){
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit]');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  successEl.classList.add('hidden');
  errorEl.classList.add('hidden');

  emailjs.send('service_700o5n8', 'template_portfolio', {
    from_name:  form.from_name.value,
    from_email: form.from_email.value,
    service:    form.service.value,
    message:    form.message.value,
    reply_to:   form.from_email.value,
  }).then(()=>{
    successEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send it!';
    form.reset();
    launchConfetti();
  }, ()=>{
    errorEl.classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send it!';
  });
}

// ===== CLICK BURST =====
document.addEventListener('click', e=>{
  if(e.target.closest('button,a,input,textarea,select')) return;
  const emojis=['✨','🌸','💕','·','✦','🩷'];
  for(let i=0;i<4;i++){
    const el=document.createElement('div');
    el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    el.style.cssText=`position:fixed;font-size:1.1rem;left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:9999;animation:cburst 0.7s ease-out forwards;color:var(--pink-main);`;
    const a=(i/4)*360,d=40+Math.random()*25;
    el.style.setProperty('--tx',Math.cos(a*Math.PI/180)*d+'px');
    el.style.setProperty('--ty',Math.sin(a*Math.PI/180)*d+'px');
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),700);
  }
});
const cburstStyle=document.createElement('style');
cburstStyle.textContent='@keyframes cburst{0%{opacity:1;transform:translate(0,0) scale(1);}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0);}}';
document.head.appendChild(cburstStyle);

// ===== PARALLAX BLOBS =====
document.addEventListener('mousemove', e=>{
  const blobs=document.querySelectorAll('.blob');
  const cx=window.innerWidth/2, cy=window.innerHeight/2;
  const dx=(e.clientX-cx)/cx, dy=(e.clientY-cy)/cy;
  blobs.forEach((b,i)=>{ const f=(i+1)*7; b.style.transform=`translate(${dx*f}px,${dy*f}px)`; });
},{passive:true});

// ===== KONAMI CODE =====
const kc=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki=0;
document.addEventListener('keydown',e=>{
  if(e.key===kc[ki]){ ki++; } else { ki=0; }
  if(ki===kc.length){
    ki=0;
    document.body.style.filter='hue-rotate(320deg) saturate(1.5)';
    const msg=document.createElement('div');
    msg.innerHTML='🌸 ULTRA PINK MODE! 🌸';
    msg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--pink-dark);color:white;padding:22px 38px;border-radius:18px;font-family:Pacifico,cursive;font-size:1.4rem;z-index:99999;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.25);animation:popup-in 0.4s ease;';
    document.body.appendChild(msg);
    launchConfetti();
    setTimeout(()=>{ msg.remove(); document.body.style.filter=''; },3000);
  }
});
const puStyle=document.createElement('style');
puStyle.textContent='@keyframes popup-in{from{transform:translate(-50%,-50%) scale(0.7);opacity:0;}to{transform:translate(-50%,-50%) scale(1);opacity:1;}}';
document.head.appendChild(puStyle);

window.addEventListener('load',()=>{ AOS.refresh(); });

// Note to employer: hello there 👋 · maria@portfolio 2025