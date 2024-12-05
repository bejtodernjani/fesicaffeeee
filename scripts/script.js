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

  // Menu Button Toggle
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active"); // Toggle visibility of the menu
    console.log("Menu button toggled.");
  });

  // Close the menu when a link is clicked
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active"); // Hide the menu
      console.log("Menu link clicked.");
    }
  });

  // Attach the scroll event for reveal animations
  window.addEventListener("scroll", reveal);

  if (sessionStorage.getItem("preloaderShown")) {
    // Skip preloader and show main content immediately
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    reveal(); // Trigger the reveal animations if needed
  } else {
    // Run the preloader normally on first visit
    const hidePreloader = () => {
      preloader.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";
      reveal(); // Trigger the reveal logic on load

      // Mark the preloader as shown
      sessionStorage.setItem("preloaderShown", "true");
    };

    // Timeout to hide preloader after a set duration
    const timeoutId = setTimeout(() => {
      console.log("Preloader timeout reached.");
      hidePreloader();
    }, 2500);

    // Hide preloader when the video ends
    preloaderVideo.onended = () => {
      console.log("Preloader video ended.");
      clearTimeout(timeoutId);
      hidePreloader();
    };

    // Hide preloader if there's an error loading the video
    preloaderVideo.onerror = () => {
      console.log("Preloader video error.");
      clearTimeout(timeoutId);
      hidePreloader();
    };
  }
});
