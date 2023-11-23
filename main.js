function duplicateElement() {
  // Get the original element
  const originalElement = document.querySelector(".moving-text");

  // Create a duplicate
  const duplicateElement = originalElement.cloneNode(true);

  // Offset the position of the duplicate
  duplicateElement.style.position = "absolute";
  duplicateElement.style.left =
    originalElement.offsetLeft + originalElement.offsetWidth + "px";

  // Append the duplicate to the body
  document.body.appendChild(duplicateElement);
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", duplicateElement);
