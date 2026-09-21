const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

/* =========================
   THEME
========================= */

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  localStorage.setItem(
    "theme",
    body.classList.contains("light") ? "light" : "dark",
  );
});

/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

/* =========================
   SCROLL REVEAL
========================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

/* =========================
   MOUSE GLOW
========================= */

document.addEventListener("mousemove", (e) => {
  body.style.setProperty("--mouse-x", e.clientX + "px");
  body.style.setProperty("--mouse-y", e.clientY + "px");
});

/* =========================
   FLOATING SKILL CARD
========================= */

const learningItems = [
  {
    name: "PHP",
    level: "BASIC",
    icon: '<i class="devicon-php-plain"></i>',
  },
  {
    name: "Laravel",
    level: "INTERMEDIATE",
    icon: '<i class="devicon-laravel-original"></i>',
  },
  {
    name: "MySQL",
    level: "BASIC",
    icon: '<i class="devicon-mysql-original"></i>',
  },
  {
    name: "REST API",
    level: "CURRENTLY LEARNING",
    icon: '<span class="learning-api-icon">API</span>',
  },
  {
    name: "HTML",
    level: "COMFORTABLE",
    icon: '<i class="devicon-html5-plain"></i>',
  },
  {
    name: "CSS",
    level: "COMFORTABLE",
    icon: '<i class="devicon-css3-plain"></i>',
  },
  {
    name: "JavaScript",
    level: "BASIC",
    icon: '<i class="devicon-javascript-plain"></i>',
  },
  {
    name: "Bootstrap",
    level: "BASIC",
    icon: '<i class="devicon-bootstrap-plain"></i>',
  },
  {
    name: "Git",
    level: "BASIC",
    icon: '<i class="devicon-git-plain"></i>',
  },
  {
    name: "GitHub",
    level: "BASIC",
    icon: '<i class="devicon-github-original"></i>',
  },
  {
    name: "VS Code",
    level: "COMFORTABLE",
    icon: '<i class="devicon-vscode-plain"></i>',
  },
  {
    name: "XAMPP",
    level: "BASIC",
    icon: '<span class="learning-api-icon">X</span>',
  },
];

const learningFloatContent =
  document.getElementById("learningFloatContent");

const learningIcon =
  document.getElementById("learningIcon");

const learningLevel =
  document.getElementById("learningLevel");

const learningName =
  document.getElementById("learningName");

let learningIndex = 0;

setInterval(() => {

  learningFloatContent.classList.add("changing");

  setTimeout(() => {

    learningIndex =
      (learningIndex + 1) % learningItems.length;

    const item =
      learningItems[learningIndex];

    learningIcon.innerHTML = item.icon;
    learningLevel.textContent = item.level;
    learningName.textContent = item.name;

    learningFloatContent.classList.remove("changing");

  }, 250);

}, 3000);

/* =========================
   PAGE LOADER
========================= */

const loader =
  document.getElementById("loader");

const loaderTech =
  document.getElementById("loaderTech");

const loaderName =
  document.getElementById("loaderName");

const loaderProgress =
  document.getElementById("loaderProgress");

const loaderPercent =
  document.getElementById("loaderPercent");

const loaderItems = [
  {
    name: "PHP",
    icon: '<i class="devicon-php-plain"></i>',
  },
  {
    name: "LARAVEL",
    icon: '<i class="devicon-laravel-original"></i>',
  },
  {
    name: "MYSQL",
    icon: '<i class="devicon-mysql-original"></i>',
  },
  {
    name: "JAVASCRIPT",
    icon: '<i class="devicon-javascript-plain"></i>',
  },
  {
    name: "HTML",
    icon: '<i class="devicon-html5-plain"></i>',
  },
  {
    name: "CSS",
    icon: '<i class="devicon-css3-plain"></i>',
  },
  {
    name: "GITHUB",
    icon: '<i class="devicon-github-original"></i>',
  },
];

let loaderIndex = 0;
let loaderValue = 0;

/* Progress */

const loaderInterval = setInterval(() => {

  loaderValue += Math.floor(Math.random() * 7) + 4;

  if (loaderValue >= 100) {
    loaderValue = 100;
  }

  loaderProgress.style.width =
    `${loaderValue}%`;

  loaderPercent.textContent =
    `${loaderValue}%`;

  if (loaderValue >= 100) {

    clearInterval(loaderInterval);

    setTimeout(() => {

      loader.classList.add("hide");

      setTimeout(() => {
        loader.remove();
      }, 700);

    }, 400);
  }

}, 175);

/* Technology animation */

const loaderTechInterval = setInterval(() => {

  if (loaderValue >= 100) {
    clearInterval(loaderTechInterval);
    return;
  }

  loaderTech.classList.add("changing");

  setTimeout(() => {

    loaderIndex =
      (loaderIndex + 1) % loaderItems.length;

    const item =
      loaderItems[loaderIndex];

    loaderTech.innerHTML =
      item.icon;

    loaderName.textContent =
      item.name;

    loaderTech.classList.remove("changing");

  }, 200);

}, 650);