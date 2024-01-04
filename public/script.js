document.addEventListener("DOMContentLoaded", function() {
    var fullscreenBtn = document.getElementById("fullscreenBtn");
  
    fullscreenBtn.addEventListener("click", function() {
      if (!document.fullscreenElement &&    // Standard syntax
          !document.mozFullScreenElement && // Mozilla
          !document.webkitFullscreenElement && // Webkit
          !document.msFullscreenElement ) {  // IE
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    });
  });
  

    // document.addEventListener("DOMContentLoaded", function() {
      var buttonsContainer = document.getElementById("buttonsContainer");
      var toggleImage = document.getElementById("toggleImage");

      toggleImage.addEventListener("click", function() {
        buttonsContainer.style.display = (buttonsContainer.style.display === "flex") ? "none" : "flex";
      });

      // Add event listeners or functionality for your buttons
      var backBtn = document.getElementById("backBtn");
      var fullscreenBtn = document.getElementById("fullscreenBtn");
      var downloadBtn = document.getElementById("downloadBtn");

      backBtn.addEventListener("click", function() {
        // Your back button functionality
        console.log("Back button clicked");
      });

      fullscreenBtn.addEventListener("click", function() {
        // Your fullscreen button functionality
        console.log("Fullscreen button clicked");
      });

      downloadBtn.addEventListener("click", function() {
        // Your download button functionality
        console.log("Download button clicked");
      });
    // });