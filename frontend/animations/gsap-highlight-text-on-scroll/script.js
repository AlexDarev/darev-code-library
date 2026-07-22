window.addEventListener("load", () => {
  const heading = document.querySelector(".highlight-text h2");
  const section = document.querySelector(".highlight-text-section");

  if (!heading || !section) {
    console.warn(
      "GSAP Highlight Text on Scroll: required HTML elements were not found."
    );
    return;
  }

  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined" ||
    typeof SplitType === "undefined"
  ) {
    console.warn(
      "GSAP Highlight Text on Scroll: GSAP, ScrollTrigger or SplitType is missing."
    );
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    heading.style.color = "#ffffff";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const splitText = new SplitType(heading, {
    types: "words, chars"
  });

  gsap.fromTo(
    splitText.chars,
    {
      color: "rgba(255, 255, 255, 0.125)"
    },
    {
      color: "#ffffff",
      stagger: 0.08,
      ease: "none",

      scrollTrigger: {
        trigger: section,
        start: "top 25%",
        end: "bottom 25%",
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    }
  );

  ScrollTrigger.refresh();
});
