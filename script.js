document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateIcon('dark-mode');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateIcon('light-mode');
        }
    });

    function updateIcon(theme) {
        if (theme === 'light-mode') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }


    // --- SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // --- FIX FOR THE LAST SECTION ---
        // This checks if the user has scrolled to the very bottom of the page.
        // `window.innerHeight` is the height of the viewport.
        // `window.scrollY` is the distance scrolled from the top.
        // `document.body.offsetHeight` is the total height of the page.
        // We subtract 2 pixels as a small buffer for cross-browser consistency.
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
            // If at the bottom, force the last section's ID to be 'current'
            current = sections[sections.length - 1].getAttribute('id');
        }
        // --- END OF FIX ---

        navLinks.forEach(link => {
            link.classList.remove('active');
            // The check `link.getAttribute('href').includes(current)` is more robust
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});