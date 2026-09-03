// ==========================================
// 1. AUTO HIGHLIGHT & CENTER NAVBAR MAGIC
// ==========================================
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.navbar a');
const navbar = document.querySelector('.navbar');

navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPath = link.getAttribute('href');
    
    // Check which page is active
    if (currentLocation.includes(linkPath) || (currentLocation.endsWith('/') && linkPath === 'index.html')) {
        link.classList.add('active');
        
        // Auto-Scroll Navbar to center the Active Button
        if (navbar) {
            setTimeout(() => {
                const linkRect = link.getBoundingClientRect();
                const navbarRect = navbar.getBoundingClientRect();
                const scrollLeftPos = link.offsetLeft - (navbarRect.width / 2) + (linkRect.width / 2);
                navbar.scrollTo({ left: scrollLeftPos, behavior: 'smooth' });
            }, 100);
        }
    }
});

// ==========================================
// 2. ULTRA-PREMIUM SWIPE WITH LIVE ANIMATION
// ==========================================
const pages = ['index.html', 'about.html', 'projects.html', 'services.html', 'contact.html'];
let currentPath = window.location.pathname.split('/').pop();
if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

let currentIndex = pages.indexOf(currentPath);
if (currentIndex === -1) currentIndex = 0;

let touchStartX = 0;
let touchMoveX = 0;
let isDragging = false;
const mainContent = document.querySelector('main'); // Hum sirf content slide karenge, navbar nahi

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].screenX;
    touchMoveX = touchStartX;
    
    // 🔥 ANDROID EDGE FIX: Agar ekdum edge (kinare) se swipe kiya, toh humara code ruk jayega 
    // taaki Android ka system Back button properly kaam kar sake.
    if (touchStartX < 25 || touchStartX > window.innerWidth - 25) {
        isDragging = false;
        return;
    }
    
    isDragging = true;
    if (mainContent) {
        mainContent.style.transition = 'none'; // Ungli ke sath chipak kar chalne ke liye
    }
}, {passive: true});

document.addEventListener('touchmove', function(event) {
    if (!isDragging) return;
    touchMoveX = event.touches[0].screenX;
    let deltaX = touchMoveX - touchStartX;

    // RUBBER BAND EFFECT: Agar Home se pichhe ya Contact se aage jane ki koshish ki toh stretch hoga
    if ((currentIndex === 0 && deltaX > 0) || (currentIndex === pages.length - 1 && deltaX < 0)) {
        deltaX = deltaX * 0.2; 
    }

    // 🔥 LIVE ANIMATION: Page ko ungli ke sath khiskana aur fade karna
    if (mainContent) {
        mainContent.style.transform = `translateX(${deltaX}px)`;
        mainContent.style.opacity = 1 - (Math.abs(deltaX) / (window.innerWidth * 1.2));
    }
}, {passive: true});

document.addEventListener('touchend', function(event) {
    if (!isDragging) return;
    isDragging = false;
    
    let deltaX = touchMoveX - touchStartX;
    const swipeThreshold = 80; // Kitna slide karna zaroori hai page change ke liye

    if (mainContent) {
        // Animation wapas on kar do taaki smooth finish ho
        mainContent.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';
    }

    // 👈 Swipe Left (Next Page)
    if (deltaX < -swipeThreshold && currentIndex < pages.length - 1) {
        if (mainContent) {
            mainContent.style.transform = `translateX(-100vw)`;
            mainContent.style.opacity = '0';
        }
        setTimeout(() => { window.location.href = pages[currentIndex + 1]; }, 300);
    }
    // 👉 Swipe Right (Previous Page)
    else if (deltaX > swipeThreshold && currentIndex > 0) {
        if (mainContent) {
            mainContent.style.transform = `translateX(100vw)`;
            mainContent.style.opacity = '0';
        }
        setTimeout(() => { window.location.href = pages[currentIndex - 1]; }, 300);
    }
    // 🔙 Cancel Swipe (Agar aadha slide karke chhod diya toh bounce back karega)
    else {
        if (mainContent) {
            mainContent.style.transform = `translateX(0)`;
            mainContent.style.opacity = '1';
        }
    }
});
