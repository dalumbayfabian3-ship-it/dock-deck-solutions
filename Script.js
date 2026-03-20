/**
 * DOCK & DECK SOLUTIONS 
 * Master Logic for Navigation, Scroll Effects, and Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    /**
     * 1. Navigation Scroll Effect
     * Changes navbar from transparent to white background on scroll
     */
    const handleScroll = () => {
        // Change background after 50px of scrolling
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // 2. Scroll Progress Bar Logic
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercentage = (window.scrollY / windowHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolledPercentage + "%";
        }

        // 3. Trigger Reveal Animations
        reveal();
    };

    /**
     * 4. Reveal Animations
     * Adds 'active' class to elements as they enter the viewport
     */
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal, .scroll-reveal, .s-card');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150; // Distance in px before revealing

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Run once on load to check initial position
    handleScroll();

    /**
     * 5. Smooth Anchor Scrolling
     * Fixes offset for fixed header when clicking #services or #contact
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});