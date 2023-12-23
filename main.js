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

document.addEventListener("DOMContentLoaded", function () {
  // Update styles and required status based on the initial checked state
  updateStyles();
  updateRequiredStatus();

  // Add event listener for changes in the checked state
  document
    .querySelectorAll('.button-div input[type="radio"]')
    .forEach(function (radio) {
      radio.addEventListener("change", function () {
        updateStyles();
        updateRequiredStatus();
        updateInvalidFeedbackVisibility();
      });
    });
});

function updateStyles() {
  document
    .querySelectorAll('.button-div input[type="radio"]')
    .forEach(function (radio) {
      const label = document.querySelector('label[for="' + radio.id + '"]');
      label.classList.toggle("checked", radio.checked);
    });
}

function updateRequiredStatus() {
  const rejectRadio = document.getElementById("flexRadioDefault1");
  const textarea = document.getElementById("floatingTextarea");
  textarea.required = rejectRadio.checked;
}

function updateInvalidFeedbackVisibility() {
  const rejectRadio1 = document.getElementById("flexRadioDefault1");
  const rejectRadio3 = document.getElementById("flexRadioDefault3");
  const invalidFeedback = document.querySelector(".invalid-feedback");

  if (rejectRadio1.checked || rejectRadio3.checked) {
    invalidFeedback.style.display = "block";
  } else {
    invalidFeedback.style.display = "none";
  }
}
