// script.js - Modern Portfolio with Animations & Interactions

// ============================================
// PRELOADER
// ============================================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
});

// ============================================
// CUSTOM CURSOR (Only for desktop)
// ============================================
const cursor = document.getElementById("cursor");
if (cursor && window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .project-card, .skill-card",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.border = "2px solid var(--accent-glow)";
      cursor.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
      cursor.style.backdropFilter = "blur(4px)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "28px";
      cursor.style.height = "28px";
      cursor.style.border = "2px solid var(--accent)";
      cursor.style.backgroundColor = "transparent";
      cursor.style.backdropFilter = "invert(0.2)";
    });
  });
}

// Hide custom cursor on mobile
window.addEventListener("resize", () => {
  if (cursor) {
    if (window.innerWidth <= 768) {
      cursor.style.display = "none";
    } else {
      cursor.style.display = "block";
    }
  }
});

// ============================================
// DARK / LIGHT MODE TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const icon = themeToggle.querySelector("i");
    if (document.body.classList.contains("light")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "light");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "dark");
    }
  });
}

// ============================================
// TYPING ANIMATION
// ============================================
const roles = [
  "MERN Stack Developer",
  "React Specialist",
  "Full Stack Engineer",
  "UI/UX Enthusiast",
];
let roleIndex = 0;
let charIdx = 0;
let isDeleting = false;
const typedSpan = document.getElementById("typedOutput");

function typeEffect() {
  if (!typedSpan) return;

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

// Start typing effect
if (typedSpan) {
  typeEffect();
}

// ============================================
// SKILL PROGRESS BARS ON VIEW
// ============================================
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".progress-fill");
        fills.forEach((fill) => {
          const percent = fill.getAttribute("data-skill");
          if (percent) {
            fill.style.width = percent + "%";
          }
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const skillsContainers = document.querySelectorAll(".skills-container");
skillsContainers.forEach((container) => {
  skillObserver.observe(container);
});

// ============================================
// SCROLL REVEAL ANIMATION (FIXED)
// ============================================
const revealElements = document.querySelectorAll(
  ".project-card, .timeline-item, .skill-card, .about-grid, .contact-container",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

// Fixed: Added proper string quotes and semicolon
revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.8s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

// ============================================
// MOBILE NAVIGATION MENU
// ============================================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("mobile");

    // Change icon
    const icon = menuBtn.querySelector("i");
    if (navLinks.classList.contains("mobile")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("mobile") &&
      !navLinks.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      navLinks.classList.remove("mobile");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });
}

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMsg");

    let isValid = true;
    let errorMessage = "";

    // Validate Name
    if (!name.value.trim()) {
      isValid = false;
      errorMessage += "Please enter your name.\n";
      name.style.borderColor = "#ef4444";
    } else {
      name.style.borderColor = "";
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      isValid = false;
      errorMessage += "Please enter your email address.\n";
      email.style.borderColor = "#ef4444";
    } else if (!emailRegex.test(email.value.trim())) {
      isValid = false;
      errorMessage += "Please enter a valid email address.\n";
      email.style.borderColor = "#ef4444";
    } else {
      email.style.borderColor = "";
    }

    // Validate Message
    if (!message.value.trim()) {
      isValid = false;
      errorMessage += "Please enter your message.\n";
      message.style.borderColor = "#ef4444";
    } else {
      message.style.borderColor = "";
    }

    if (isValid) {
      // Show success message
      alert(
        `Thank you ${name.value.trim()}! Your message has been sent successfully. I'll get back to you soon.`,
      );

      // Reset form
      contactForm.reset();
    } else {
      alert(errorMessage);
    }
  });

  // Remove error border on input
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
}

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImages = document.querySelectorAll(".hero-image img");

  heroImages.forEach((heroImg) => {
    if (heroImg && window.innerWidth > 768) {
      heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
});

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#" || targetId === "") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinksList = document.querySelectorAll(".nav-links a");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.scrollY + 100;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinksList.forEach((link) => {
    const href = link.getAttribute("href").substring(1);
    if (href === currentSection) {
      link.style.color = "var(--accent)";
    } else {
      link.style.color = "var(--text-secondary)";
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
const footer = document.querySelector("footer p");
if (footer) {
  const currentYear = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace("2026", currentYear);
}

// ============================================
// PROJECT CARD HOVER EFFECT (Enhanced)
// ============================================
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const img = card.querySelector("img");
    if (img) {
      img.style.transform = "scale(1.05)";
    }
  });

  card.addEventListener("mouseleave", () => {
    const img = card.querySelector("img");
    if (img) {
      img.style.transform = "scale(1)";
    }
  });
});

// ============================================
// SKILL CARDS ANIMATION ON HOVER
// ============================================
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const icon = card.querySelector("i");
    if (icon) {
      icon.style.transform = "scale(1.1)";
      icon.style.transition = "transform 0.3s ease";
    }
  });

  card.addEventListener("mouseleave", () => {
    const icon = card.querySelector("i");
    if (icon) {
      icon.style.transform = "scale(1)";
    }
  });
});

// ============================================
// TIMELINE ITEMS STAGGER ANIMATION
// ============================================
const timelineItems = document.querySelectorAll(".timeline-item");
timelineItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
// Create back to top button if it doesn't exist
if (!document.querySelector(".back-to-top")) {
  const backToTop = document.createElement("div");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 45px;
        height: 45px;
        background: var(--gradient);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    `;
  const icon = backToTop.querySelector("i");
  if (icon) {
    icon.style.color = "white";
    icon.style.fontSize = "1.2rem";
  }
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================
// PREVENT SCROLLING WHEN MOBILE MENU IS OPEN
// ============================================
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    if (navLinks.classList.contains("mobile")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Restore scrolling when menu is closed
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("mobile") &&
      !navLinks.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      document.body.style.overflow = "";
    }
  });
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
// Add ripple animation keyframes if not exists
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
if (!document.querySelector("style[keyframes]")) {
  styleSheet.setAttribute("keyframes", "true");
  document.head.appendChild(styleSheet);
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.marginLeft = "-50px";
    ripple.style.marginTop = "-50px";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    const rect = this.getBoundingClientRect();
    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ============================================
// INITIALIZE ALL ANIMATIONS AND FEATURES
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website loaded successfully!");

  // Check for any broken images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.warn(`Image failed to load: ${this.src}`);
    });
  });
});
