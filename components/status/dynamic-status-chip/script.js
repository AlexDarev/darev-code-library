document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("chipSlider");
  const dot = document.getElementById("statusDot");
  const localTime = document.getElementById("localTime");

  if (!slider || !dot) {
    return;
  }

  const slides = Array.from(slider.children);

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;
  let rotationInterval = null;
  let timeInterval = null;

  const rotationDelay = 4000;

  /*
   * Update Belfast / UK local time.
   */
  function updateTime() {
    if (!localTime) {
      return;
    }

    try {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Europe/London"
      });

      localTime.textContent = formatter.format(new Date());
    } catch (error) {
      console.error("Unable to update local time:", error);
    }
  }

  /*
   * Update the dot style for each slide.
   */
  function updateDot(index) {
    const dotStyles = [
      {
        color: "#00C851",
        shadow: "0 0 8px rgba(0, 200, 81, 0.7)"
      },
      {
        color: "#EFEFEF",
        shadow: "none"
      },
      {
        color: "#FB3F00",
        shadow: "0 0 8px rgba(251, 63, 0, 0.6)"
      }
    ];

    const activeStyle = dotStyles[index] || dotStyles[0];

    dot.style.backgroundColor = activeStyle.color;
    dot.style.boxShadow = activeStyle.shadow;

    dot.style.transform = "translateY(-50%) scale(1.35)";

    window.setTimeout(() => {
      dot.style.transform = "translateY(-50%) scale(1)";
    }, 200);
  }

  /*
   * Display the current slide.
   */
  function showSlide(index) {
    const firstSlide = slides[0];
    const slideHeight = firstSlide.offsetHeight || 16;

    slider.style.transform = `translateY(-${index * slideHeight}px)`;

    updateDot(index);
  }

  /*
   * Move to the next slide.
   */
  function rotateChip() {
    showSlide(currentIndex);

    currentIndex = (currentIndex + 1) % slides.length;
  }

  /*
   * Start automatic rotation.
   */
  function startRotation() {
    stopRotation();

    rotationInterval = window.setInterval(() => {
      rotateChip();
    }, rotationDelay);
  }

  /*
   * Stop automatic rotation.
   */
  function stopRotation() {
    if (rotationInterval) {
      window.clearInterval(rotationInterval);
      rotationInterval = null;
    }
  }

  /*
   * Pause animations when the browser tab is hidden.
   */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopRotation();

      if (timeInterval) {
        window.clearInterval(timeInterval);
        timeInterval = null;
      }

      return;
    }

    updateTime();
    rotateChip();
    startRotation();

    timeInterval = window.setInterval(updateTime, 1000);
  });

  /*
   * Initial setup.
   */
  updateTime();
  rotateChip();

  timeInterval = window.setInterval(updateTime, 1000);
  startRotation();
});
