// ==========================================
// 1. AUTO HIGHLIGHT & CENTER NAVBAR MAGIC
// ==========================================
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.navbar a');
const navbar = document.querySelector('.navbar');

navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPath = link.getAttribute('href');
    
    if (currentLocation.includes(linkPath) || (currentLocation.endsWith('/') && linkPath === 'index.html')) {
        link.classList.add('active');
        
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
const mainContent = document.querySelector('main'); 

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].screenX;
    touchMoveX = touchStartX;
    
    // Android Edge Fix
    if (touchStartX < 25 || touchStartX > window.innerWidth - 25) {
        isDragging = false;
        return;
    }
    
    isDragging = true;
    if (mainContent) mainContent.style.transition = 'none';
}, {passive: true});

document.addEventListener('touchmove', function(event) {
    if (!isDragging) return;
    touchMoveX = event.touches[0].screenX;
    let deltaX = touchMoveX - touchStartX;

    // Rubber Band Effect
    if ((currentIndex === 0 && deltaX > 0) || (currentIndex === pages.length - 1 && deltaX < 0)) {
        deltaX = deltaX * 0.2; 
    }

    // Live Follow
    if (mainContent) {
        mainContent.style.transform = `translateX(${deltaX}px)`;
        mainContent.style.opacity = 1 - (Math.abs(deltaX) / (window.innerWidth * 1.2));
    }
}, {passive: true});

document.addEventListener('touchend', function(event) {
    if (!isDragging) return;
    isDragging = false;
    
    let deltaX = touchMoveX - touchStartX;
    const swipeThreshold = 80; 

    if (mainContent) mainContent.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';

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
    // 🔙 Cancel Swipe
    else {
        if (mainContent) {
            mainContent.style.transform = `translateX(0)`;
            mainContent.style.opacity = '1';
        }
    }
});

// ==========================================
// 3. 🎵 CUTE PREMIUM UI SOUND EFFECT 🎵
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playCutePop() {
    // Sirf tabhi context banayenge jab user pehli baar touch kare (Browser policy)
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // Sound generator (Math Magic)
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine'; // Smooth aur soft awaz
    
    // Awaz ko halka sa patla (high pitch) karke turant bhari karna (Bubble Pop effect)
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);

    // Volume set karna (Bohot loud nahi, ekdum premium soft)
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1); // Sirf 0.1 second ka click
}

// Har clickable chiz par yeh awaz laga do (Touch aur Click dono par)
['touchstart', 'mousedown'].forEach(evt => {
    document.addEventListener(evt, function(event) {
        // Pata lagao ki user ne kisi button, link ya card par tap kiya hai ya nahi
        const isClickable = event.target.closest('a, button, .service-card, .project-card, .contact-card, .bento-card');
        
        if (isClickable) {
            playCutePop();
        }
    }, { passive: true });
});
