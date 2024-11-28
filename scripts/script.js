window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const preloaderVideo = document.getElementById("preloader-video");
  const mainContent = document.getElementById("main-content");

  console.log("Preloader script started."); // Debugging

  // Function to handle reveal animations
  function reveal() {
    console.log("Running reveal animation."); // Debugging
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add("active");
      }
    }
  }

  // Attach the scroll event for the reveal animation
  window.addEventListener("scroll", reveal);

  // Preloader logic
  const timeoutId = setTimeout(() => {
    console.log("Timeout reached, hiding preloader."); // Debugging
    preloader.style.display = "none"; // Hide the preloader
    mainContent.style.display = "block"; // Show the main content
    mainContent.style.opacity = "1"; // Trigger the fade-in
    reveal(); // Trigger the reveal logic on load
  }, 6500); // Delay for 6.5 seconds

  // When the video ends before the timeout, hide the preloader and show the content
  preloaderVideo.onended = function () {
    console.log("Video ended, hiding preloader."); // Debugging
    clearTimeout(timeoutId); // Cancel the timeout if the video ends
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    reveal(); // Trigger the reveal logic on load
  };

  // Fallback: If the video fails to load, ensure the main content appears
  preloaderVideo.onerror = function () {
    console.log("Video error, hiding preloader."); // Debugging
    clearTimeout(timeoutId); // Cancel the timeout in case of an error
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    reveal(); // Trigger the reveal logic on load
  };
});
