const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

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

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.addEventListener("mousemove", (e) => {
  body.style.setProperty("--mouse-x", e.clientX + "px");
  body.style.setProperty("--mouse-y", e.clientY + "px");
});

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

const learningFloatContent = document.getElementById("learningFloatContent");
const learningIcon = document.getElementById("learningIcon");
const learningLevel = document.getElementById("learningLevel");
const learningName = document.getElementById("learningName");

let learningIndex = 0;

setInterval(() => {
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