

const enableScroll = () => {
  document.body.classList.remove("disable-scrolling")
}

setTimeout(enableScroll, 7500)

const moveIns = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.4,
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
