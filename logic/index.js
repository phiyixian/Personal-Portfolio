const overlay = document.querySelector('.shade');

    document.addEventListener('mousemove', e => {
      overlay.style.setProperty('--x', `${e.clientX}px`);
      overlay.style.setProperty('--y', `${e.clientY}px`);
    });



function togglePopup(id) {
  // Get all popups
  const popups = document.querySelectorAll('.popuptext');

  // Hide all popups first
  popups.forEach(p => {
    if (p.id !== id) {
      p.classList.remove('show');
    }
  });

  // Toggle the selected popup
  const target = document.getElementById(id);
  target.classList.toggle('show');
}

// Your buttons will now call like this:
function stone1() { togglePopup("myPopup1"); }
function stone2() { togglePopup("myPopup2"); }
function stone3() { togglePopup("myPopup3"); }
function stone4() { togglePopup("myPopup4"); }

const bird = document.querySelector('.bird');

// function to randomize Y position
function randomizeBirdY() {
  // between 10vh and 50vh (so not too high/low)
  const randomOffset = Math.floor(Math.random() * 40 + 10) + 'vh';
  bird.style.setProperty("--bird", randomOffset);
}

// set initial random position
randomizeBirdY();

// change position every time animation loops
bird.addEventListener("animationiteration", () => {
  randomizeBirdY();
});

const canvas = document.getElementById("canvas");
const maxWidth = window.innerWidth;

for (let i = 0; i < 15; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // random values
  const size = Math.floor(Math.random() * 95) + 5; // 5px to 100px
  const left = Math.floor(Math.random() * 100); // vw
  const duration = Math.floor(Math.random() * 12) + 5; // 3–15s

  // Convert vw to px so we can check bounds
  const leftPx = Math.random() * (maxWidth - size);
  const leftPercent = (leftPx / maxWidth) * 100; // convert back to vw

  // Pick a random drift, but clamp so bubble stays on screen
  let drift = Math.floor(Math.random() * 300) - 150; // -150 → +150px
  const rightEdge = leftPx + size + drift;
  const leftEdge = leftPx + drift;

  if (rightEdge > maxWidth) {
    drift -= rightEdge - maxWidth; // shift left if overflowing right
  }
  if (leftEdge < 0) {
    drift += -leftEdge; // shift right if overflowing left
  }

  // assign CSS variabes
  bubble.style.setProperty("--size", `${size}px`);
  bubble.style.setProperty("--left", `${leftPercent}vw`);
  bubble.style.setProperty("--duration", `${duration}s`);
  bubble.style.setProperty("--drift", `${drift}px`);
  canvas.appendChild(bubble);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("name");
  const text = container.textContent.trim();
  const words = text.split(/\s+/);

  // clear container
  container.textContent = "";

  const baseDelay = 500;
  const stagger = 1000; // ms
  const distance = 200; // pixels

  words.forEach((word, wordIndex) => {
    const wordWrap = document.createElement("span");
    wordWrap.className = "word";

    const chars = Array.from(word);
    const center = (chars.length - 1) / 2;

    const distFromCenter = chars.map((_, i) => Math.abs(i - center));
    const maxDist = Math.max(...distFromCenter);

    chars.forEach((char, charIndex) => {
      const span = document.createElement("span");
      span.className = "char init";
      span.textContent = char;
      // negative for left and positive for right
      const offset = charIndex - center;
      const startX = offset * distance;

      const startY = (Math.random() - 0.5) * 1000; // -5 to 5px random number for different Y position
      const startRot = (Math.random() - 0.5) * 6; // -3..3 deg

      // Set CSS variables (not transform/opacity directly)
      span.style.setProperty("--start-x", `${startX}px`);
      span.style.setProperty("--start-y", `${startY}px`);
      span.style.setProperty("--start-rot", `${startRot}deg`);
      span.style.fontSize = Math.random() * 0.7 + 1 + "em"; // random font size between 0.7em to 1.7em
      span.style.color = `hsl(32, 80%, ${Math.random() * 20 + 5}%)`; // random color

      const outerPriority = maxDist - distFromCenter[charIndex];
      const delay = baseDelay + outerPriority * stagger + wordIndex * 120; //stagger words by 0.12s
      span.style.transitionDelay = `${delay}ms`;

      wordWrap.appendChild(span);
    });

    container.appendChild(wordWrap);
  });

  // force reflow so browser register initial style
  void container.offsetWidth;

  // set time out to ensure transitionDelay is applied
  setTimeout(() => {
    container.classList.add("in");
    // also remove 'init' class so CSS target styles apply  (optional)
    document
      .querySelectorAll(".char.init")
      .forEach((s) => s.classList.remove("init"));
  }, 30); // small tick
});
