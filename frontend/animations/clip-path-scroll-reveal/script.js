document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // Image Scale
    gsap.from(".image-reveal img", {
        duration: 2,
        scale: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".image-reveal",
            start: "top 40%",
            once: true
        }
    });

    // Clip-path Reveal
    gsap.from(".image-reveal", {
        duration: 2,
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".image-reveal",
            start: "top 40%",
            once: true
        }
    });

});
