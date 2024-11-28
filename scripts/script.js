document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const preloaderVideo = document.getElementById("preloader-video");
  const mainContent = document.getElementById("main-content");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  console.log("Preloader script started.");

  // Function to handle reveal animations
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((reveal) => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("active");
      }
    });
  }

  // Attach the scroll event for the reveal animation
  window.addEventListener("scroll", reveal);

  // Preloader logic
  const timeoutId = setTimeout(() => {
    console.log("Timeout reached, hiding preloader.");
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    reveal(); // Trigger the reveal logic on load
  }, 6500);

  preloaderVideo.onended = function () {
    console.log("Video ended, hiding preloader.");
    clearTimeout(timeoutId);
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    reveal();
  };

  preloaderVideo.onerror = function () {
    console.log("Video error, hiding preloader.");
    clearTimeout(timeoutId);
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    reveal();
  };

  // Menu Button Toggle
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active"); // Toggle visibility of the menu
    console.log("Menu button clicked.");
  });

  // Close the menu when a link is clicked
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      console.log("Menu link clicked."); // Debugging
      navLinks.classList.remove("active"); // Hide the menu
    }
  });
});
