const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const text = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Mobile Developer",
];

let count = 0;
let index = 0;
let del = false;

const textElement = document.getElementById("text");

setInterval(() => {
  if (!del) {
    // Typing
    index++;
    textElement.textContent = text[count].slice(0, index);

    if (index === text[count].length) {
      del = true; // start deleting
    }
  } else {
    // Deleting
    index--;
    textElement.textContent = text[count].slice(0, index);

    if (index === 0) {
      del = false;
      count = (count + 1) % text.length; // next word
    }
  }
}, 120);
