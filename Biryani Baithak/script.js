// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 1. Hero Animations
    const tlHero = gsap.timeline();
    tlHero.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power4.out" })
          .from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.5")
          .from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.7")
          .from(".btn-large", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");

    // 2. The Epic Interactive "Video from Photo" Image Scroll Sequence
    // We create a ScrollTrigger that pins the .sticky-wrapper for a long time (400vh)
    // and scrubs through a timeline.
    
    const seqContainer = document.querySelector(".scroll-container");
    const seqImage = document.querySelector(".sequence-image");
    
    const tlSequence = gsap.timeline({
        scrollTrigger: {
            trigger: seqContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrubbing
        }
    });

    // Animate the Image (Zoom in from 1 to 2.5, rotate slightly, fade to dark)
    tlSequence.to(seqImage, {
        scale: 2.5,
        rotation: 5,
        filter: "brightness(0.25)", // Fade to dark for text readability
        duration: 3,
        ease: "none" // Linear ease for scroll
    }, 0);

    // Fade in the main Hero Text while the image zooms and darkens
    tlSequence.to(".main-seq-text", { opacity: 1, y: -20, duration: 1 }, 0.5);

    // Keep image panning slightly at the end
    tlSequence.to(seqImage, {
        scale: 2.6,
        yPercent: -5,
        filter: "brightness(0.1)", // Fade out image to transition to next section
        duration: 1
    }, 3.5);


    // 3. Specialities Entrance Animations
    gsap.from(".speciality-card", {
        scrollTrigger: {
            trigger: ".specialities-grid",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Cards come in one by one
        ease: "back.out(1.2)"
    });

    // 4. Menu Entrance Animations
    gsap.from(".menu-header", {
        scrollTrigger: {
            trigger: ".menu-section",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 5. Interactive Tab Switcher for the Day-Wise Menu
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.day-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding tab content
            const dayId = btn.getAttribute('data-day');
            document.getElementById(dayId).classList.add('active');
        });
    });
    
    // 4. Parallax effect for Banner Video Text
    gsap.to(".banner-title", {
        scrollTrigger: {
            trigger: ".banner-video-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: 150,
        scale: 1.1,
        ease: "none"
    });
});
