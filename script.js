const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

/* =========================================================
   1. CURSOR GRID BACKGROUND CANVAS (MENYALA SAAT DIGERAKKAN)
========================================================= */
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

let width, height;
const cellSize = 45; // Ukuran kotak grid dalam piksel
let mouse = { x: -1000, y: -1000 };
let activeCells = {};
let pulses = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const col = Math.floor(mouse.x / cellSize);
  const row = Math.floor(mouse.y / cellSize);
  const key = `${col},${row}`;

  activeCells[key] = {
    col: col,
    row: row,
    alpha: 1.0
  };
});

window.addEventListener("click", (e) => {
  pulses.push({
    x: e.clientX,
    y: e.clientY,
    radius: 0,
    maxRadius: 200,
    alpha: 1.0
  });
});

function drawCanvas() {
  ctx.clearRect(0, 0, width, height);

  const isLight = body.classList.contains("light");
  const strokeColor = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)";
  const highlightColor = isLight ? "120, 150, 0" : "217, 255, 63";

  // Gambar Grid Dasar
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Gambar Efek Pulsa Klik
  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${highlightColor}, ${p.alpha * 0.5})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    p.radius += 5;
    p.alpha -= 0.02;

    if (p.alpha <= 0) pulses.splice(i, 1);
  }

  // Gambar Sel yang Menyala & Meredup (Trailing Effect)
  for (const key in activeCells) {
    const cell = activeCells[key];

    ctx.fillStyle = `rgba(${highlightColor}, ${cell.alpha * 0.25})`;
    ctx.fillRect(cell.col * cellSize + 1, cell.row * cellSize + 1, cellSize - 1, cellSize - 1);

    ctx.strokeStyle = `rgba(${highlightColor}, ${cell.alpha * 0.8})`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cell.col * cellSize + 1, cell.row * cellSize + 1, cellSize - 1, cellSize - 1);

    cell.alpha -= 0.02;
    if (cell.alpha <= 0) {
      delete activeCells[key];
    }
  }

  requestAnimationFrame(drawCanvas);
}
drawCanvas();

/* =========================================================
   2. THEME TOGGLE (DARK / LIGHT)
========================================================= */
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
});

/* =========================================================
   3. MOBILE MENU
========================================================= */
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

/* =========================================================
   4. SCROLL REVEAL
========================================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

/* =========================================================
   5. FLOATING SKILL CARD ROTATOR
========================================================= */
const learningItems = [
  { name: "PHP", level: "BASIC", icon: '<i class="devicon-php-plain"></i>' },
  { name: "Laravel", level: "INTERMEDIATE", icon: '<i class="devicon-laravel-original"></i>' },
  { name: "MySQL", level: "BASIC", icon: '<i class="devicon-mysql-original"></i>' },
  { name: "JavaScript", level: "BASIC", icon: '<i class="devicon-javascript-plain"></i>' }
];

const learningFloatContent = document.getElementById("learningFloatContent");
const learningIcon = document.getElementById("learningIcon");
const learningLevel = document.getElementById("learningLevel");
const learningName = document.getElementById("learningName");

let learningIndex = 0;
setInterval(() => {
  if (!learningFloatContent) return;
  learningFloatContent.classList.add("changing");
  setTimeout(() => {
    learningIndex = (learningIndex + 1) % learningItems.length;
    const item = learningItems[learningIndex];
    learningIcon.innerHTML = item.icon;
    learningLevel.textContent = item.level;
    learningName.textContent = item.name;
    learningFloatContent.classList.remove("changing");
  }, 250);
}, 3000);

/* =========================================================
   6. PAGE LOADER
========================================================= */
const loader = document.getElementById("loader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercent = document.getElementById("loaderPercent");

let loaderValue = 0;
const loaderInterval = setInterval(() => {
  if (!loaderProgress || !loaderPercent) return;
  loaderValue += Math.floor(Math.random() * 7) + 4;
  if (loaderValue >= 100) loaderValue = 100;

  loaderProgress.style.width = `${loaderValue}%`;
  loaderPercent.textContent = `${loaderValue}%`;

  if (loaderValue >= 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      if (loader) loader.classList.add("hide");
      setTimeout(() => { if (loader) loader.remove(); }, 700);
    }, 400);
  }
}, 175);

/* =========================================================
   7. PROJECTS SWIPER & MODAL
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".projects-swiper")) {
    new Swiper(".projects-swiper", {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".proj-next", prevEl: ".proj-prev" },
      breakpoints: { 768: { slidesPerView: 2, spaceBetween: 25 } }
    });
  }
});

function openProjectModal(no, title, stack, desc, category, status, url) {
  document.getElementById("mTag").textContent = `${no} // PROJECT OVERVIEW`;
  document.getElementById("mTitle").innerHTML = title;
  document.getElementById("mStack").textContent = stack;
  document.getElementById("mDesc").textContent = desc;
  document.getElementById("mStatus").textContent = `${category} · ${status}`;

  const visitBtn = document.getElementById("mLink");
  const visitBtnText = document.getElementById("mLinkText");
  if (url === "#") {
    visitBtn.href = "javascript:void(0)";
    visitBtn.style.opacity = "0.5";
    visitBtnText.textContent = "DEMO / LINK NOT AVAILABLE YET";
  } else {
    visitBtn.href = url;
    visitBtn.style.opacity = "1";
    visitBtnText.textContent = "VISIT PROJECT / SOURCE CODE";
  }
  document.getElementById("projModal").classList.add("active");
}

function closeProjectModal(e) {
  if (e.target.id === "projModal") {
    document.getElementById("projModal").classList.remove("active");
  }
}

function closeProjectModalForce() {
  document.getElementById("projModal").classList.remove("active");
}

/* =========================================================
   8. SKILL CARD ACTIVE TOGGLE
========================================================= */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});