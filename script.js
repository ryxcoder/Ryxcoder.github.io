// ==========================================
// SWIPE TO NAVIGATE (App-like Feel)
// ==========================================

// 1. Pages ka sequence 
const pages = ['index.html', 'about.html', 'projects.html', 'services.html', 'contact.html'];

// 2. Pata lagao abhi kis page par hain
let currentPath = window.location.pathname.split('/').pop();
if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

let currentIndex = pages.indexOf(currentPath);
if (currentIndex === -1) currentIndex = 0;

// Variables for Touch Tracking
let touchStartX = 0;
let touchEndX = 0;

// 3. Jab ungli screen par touch ho
document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

// 4. Jab ungli screen se hategi tab swipe check karo
document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

// 5. Swipe Logic
function handleSwipe() {
    const swipeThreshold = 70; // 70px ka swipe zaroori hai galti se click na ho

    // 👈 Swipe Left (Next Page)
    if (touchStartX - touchEndX > swipeThreshold) {
        if (currentIndex < pages.length - 1) {
            document.body.style.transition = "opacity 0.3s ease";
            document.body.style.opacity = "0"; 
            setTimeout(() => {
                window.location.href = pages[currentIndex + 1];
            }, 300);
        }
    }
    
    // 👉 Swipe Right (Previous Page)
    if (touchEndX - touchStartX > swipeThreshold) {
        if (currentIndex > 0) {
            document.body.style.transition = "opacity 0.3s ease";
            document.body.style.opacity = "0"; 
            setTimeout(() => {
                window.location.href = pages[currentIndex - 1];
            }, 300);
        }
    }
}
