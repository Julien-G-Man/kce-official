// about.js

// This file is currently empty, but it's included for future use.
// It can be used for interactive features, animations, or dynamic content loading on the About page.

// Example of a future feature:
// A scroll animation to reveal sections as the user scrolls down the page.

document.addEventListener('DOMContentLoaded', () => {
    // This is your existing Intersection Observer code for fade-in animations.
    const sections = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    // ADDED: Logic for the new image slider.
    const imageSlider = document.getElementById('about-image-slider');
    if (imageSlider) {
        const slides = imageSlider.querySelectorAll('.slide');
        let currentSlide = 0;

        if (slides.length > 1) {
            // Make the first slide visible right away
            slides[currentSlide].classList.add('visible');

            // Set an interval to switch slides
            setInterval(() => {
                slides[currentSlide].classList.remove('visible'); // Hide current
                currentSlide = (currentSlide + 1) % slides.length; // Move to next
                slides[currentSlide].classList.add('visible'); // Show next
            }, 5000); // Change image every 5 seconds
        } else if (slides.length === 1) {
            // If there's only one image, just make it visible
            slides[0].classList.add('visible');
        }
    }
});