// PRELOADER
window.addEventListener("load", () => {
  document.getElementById("preloader").classList.add("hide");
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 600);
});

// SCROLL PROGRESS
window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
});

// CUSTOM CURSOR
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// DARK / LIGHT MODE
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("light")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// TYPING ANIMATION
const roles = [
  "MERN Stack Developer",
  "React Specialist",
  "Full Stack Engineer",
  "UI/UX Enthusiast",
];
let roleIndex = 0,
  charIdx = 0,
  isDeleting = false;
const typedSpan = document.getElementById("typedOutput");
function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedSpan.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
      return;
    }
  } else {
    typedSpan.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 70 : 120);
}
typeEffect();

// SKILL PROGRESS ON VIEW
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".progress-fill");
        fills.forEach((fill) => {
          const percent = fill.getAttribute("data-skill");
          fill.style.width = percent + "%";
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".skills-container")
  .forEach((container) => skillObserver.observe(container));

// SMOOTH ANIMATION ON SCROLL (reveal)
const revealElements = document.querySelectorAll(
  ".project-card, .timeline-item, .skill-card, .testimonial-card",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.style.opacity = "1";
      else return;
    });
  },
  { threshold: 0.1 },
);
revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transition = "opacity 0.6s, transform 0.3s";
  revealObserver.observe(el);
});

// Mobile nav
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("mobile");
});

// Contact form validation
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const msg = document.getElementById("contactMsg").value.trim();
  if (!name || !email || !msg) alert("Please fill all fields.");
  else alert(`Thanks ${name}! I'll get back to you soon.`);
  form.reset();
});

// parallax (simple scroll)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector(".hero-image img");
  if (heroImg) heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
});

// Gradient background animation (dynamic)
setInterval(() => {
  const gradient = document.querySelector(".gradient-text");
  if (gradient) gradient.style.background = "var(--gradient)";
}, 200);
