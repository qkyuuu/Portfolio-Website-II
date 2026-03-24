const enableScroll = () => {
  document.body.classList.remove("disable-scrolling");
};

setTimeout(enableScroll, 7500);

const moveIns = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.4,
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll,
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

moveIns.forEach((moveIn) => {
  appearOnScroll.observe(moveIn);
});

// Title change
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// --- Implementation ---

const phrases = [
  "Email Marketer",
  "Web Developer",
  "Web Designer",
  "Content Creator",
];

const el = document.getElementById("scramble-text");
const fx = new TextScramble(el);

let counter = 0;
const articleEl = document.getElementById("article");

const next = () => {
  const currentPhrase = phrases[counter];

  // Logic to check if the word starts with a vowel (a, e, i, o, u)
  const firstLetter = currentPhrase.charAt(0).toLowerCase();
  const isVowel = ["a", "e", "i", "o", "u"].includes(firstLetter);

  // Update the article to 'an' for 'Email Marketer', otherwise 'a'
  articleEl.innerText = isVowel ? "an" : "a";

  // Start the scramble effect
  fx.setText(currentPhrase).then(() => {
    setTimeout(next, 2000);
  });

  counter = (counter + 1) % phrases.length;
};

next();

window.addEventListener("scroll", () => {
  const heroWrapper = document.querySelector(".hero-wrapper");
  const scrollContainer = document.getElementById("hero-scroll-container");
  const navbar = document.getElementById("navbar");

  if (!heroWrapper || !scrollContainer) return;

  const scrollY = window.scrollY;
  const containerHeight = scrollContainer.offsetHeight;
  const viewportHeight = window.innerHeight;

  let progress = scrollY / (containerHeight - viewportHeight);
  progress = Math.max(0, Math.min(1, progress));

  // Fade and Scale logic
  heroWrapper.style.opacity = 1 - progress;
  const scale = 1 - progress * 0.05;
  heroWrapper.style.transform = `scale(${scale})`;

  // Navbar Toggle Logic
  // If progress is 1 (totally black), show navbar.
  // If user scrolls back up, hide it again.
  if (progress >= 1) {
    navbar.classList.add("show-nav");
    navbar.style.pointerEvents = "auto"; // Re-enable clicking
  } else {
    navbar.classList.remove("show-nav");
    navbar.style.pointerEvents = "none"; // Disable clicking while hidden
  }
});
