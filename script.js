// Auto highlight active navbar link based on current page
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPath = link.getAttribute('href');
    
    if (currentLocation.includes(linkPath) || (currentLocation.endsWith('/') && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});

// Click action handler
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});