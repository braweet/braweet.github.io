document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const pages = document.querySelectorAll('.page');

    function switchPage(targetId) {
        // Hide all pages and remove active class from all buttons
        pages.forEach(page => {
            page.classList.remove('active');
        });
        navButtons.forEach(button => {
            button.classList.remove('active-nav');
        });

        // Show the target page and set the corresponding button to active
        const targetPage = document.getElementById(targetId);
        const targetButton = document.querySelector(`[data-target="${targetId}"]`);
        
        if (targetPage) {
            targetPage.classList.add('active');
        }
        if (targetButton) {
            targetButton.classList.add('active-nav');
        }
    }

    // Add click event listeners to all nav buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            switchPage(targetId);
        });
    });

    // Initialize the first page as active
    // This ensures the "About" page is visible on load.
    switchPage('about-page'); 
});