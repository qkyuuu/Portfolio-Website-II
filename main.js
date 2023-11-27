const moveIns = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.5
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

moveIns.forEach((moveIn) => {
  appearOnScroll.observe(moveIn);
});
