// ====================== TYPING ANIMATION ======================
const roles = [
  "MERN Stack Developer",
  "React.js Specialist",
  "Full Stack Developer",
  "UI/UX Enthusiast",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedOutput = document.getElementById("typed-output");

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedOutput.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedOutput.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
    return;
  }
  setTimeout(typeEffect, isDeleting ? 100 : 150);
}
typeEffect();

// ====================== COUNTER ANIMATION ======================
function animateCounter(element, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Trigger counters when hero section is visible
const observerOptions = { threshold: 0.5 };
const heroSection = document.getElementById("hero");
let countersTriggered = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersTriggered) {
    countersTriggered = true;
    animateCounter(document.getElementById("exp-counter"), 1);
    animateCounter(document.getElementById("project-counter"), 10);
    animateCounter(document.getElementById("client-counter"), 4);
  }
}, observerOptions);
if (heroSection) counterObserver.observe(heroSection);

// ====================== ACTIVE NAVIGATION ======================
const sections = document.querySelectorAll("section, div[id]");
const navLinks = document.querySelectorAll(".content a, .menu a");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// ====================== HEADER SCROLL EFFECT ======================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ====================== PROJECT FILTERING ======================
const filterButtons = document.querySelectorAll("#filter-buttons button");
const projects = document.querySelectorAll(".projectItem1");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    filterButtons.forEach((b) => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");
    const filterValue = btn.getAttribute("data-filter");
    projects.forEach((project) => {
      if (
        filterValue === "all" ||
        project.getAttribute("data-category").includes(filterValue)
      ) {
        project.style.display = "block";
        project.style.animation = "fadeIn 0.4s ease";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// ====================== CONTACT FORM SUBMIT ======================
const contactForm = document.getElementById("contact-form");
function showToast(message, isError = false) {
  const existingToast = document.querySelector(".toast-message");
  if (existingToast) existingToast.remove();
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.style.background = isError ? "#ef4444" : "#10b981";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    showToast("Please fill all fields!", true);
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    showToast("Please enter a valid email address!", true);
    return;
  }

  // Simulate form submission
  showToast(
    `Thank you ${name}! Your message has been sent. I'll get back to you soon.`,
  );
  contactForm.reset();
});

// ====================== SMOOTH SCROLL FOR MOBILE MENU ======================
document.querySelectorAll(".menu a").forEach((anchor) => {
  anchor.addEventListener("click", () => {
    document.getElementById("toggle").checked = false;
  });
});

// ====================== FADE IN ANIMATION FOR PROJECTS ======================
const style = document.createElement("style");
style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .projectItem1 {
          animation: fadeIn 0.5s ease;
        }
      `;
document.head.appendChild(style);
