// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

// Initialize theme from localStorage (default to dark)
const savedTheme = localStorage.getItem('theme');
const initTheme = savedTheme ? savedTheme : 'dark';
html.setAttribute('data-theme', initTheme);
if (darkModeToggle) darkModeToggle.checked = (initTheme === 'dark');
if (!savedTheme) localStorage.setItem('theme', initTheme);

// Toggle between dark and light mode
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Navigation scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// Read more button functionality
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const expItem = this.closest('.experience-item');
        const description = expItem.querySelector('.exp-description');
        
        // Toggle expanded state
        if (this.textContent === 'Read More') {
            this.textContent = 'Read Less';
            description.style.maxHeight = 'none';
        } else {
            this.textContent = 'Read More';
            description.style.maxHeight = '100px';
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Image Lightbox Feature
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox overlay element
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <span class="close-hint">Click to close</span>
        <img src="" alt="Zoomed image">
    `;
    document.body.appendChild(lightboxOverlay);

    const lightboxImg = lightboxOverlay.querySelector('img');

    // Add click handlers to all zoomable images
    function bindZoomables() {
        const zoomableImages = document.querySelectorAll('.zoomable');
        zoomableImages.forEach(img => {
            img.addEventListener('click', function() {
                // prefer a high-res image if provided
                const large = img.getAttribute('data-large') || img.src;
                lightboxImg.src = large;
                lightboxImg.alt = this.alt || '';
                lightboxOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }

    bindZoomables();

    // Close lightbox when clicking on overlay or image
    lightboxOverlay.addEventListener('click', function() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


