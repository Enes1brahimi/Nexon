// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}
