// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Solution tiles hover animation
    const solutionTiles = document.querySelectorAll('.solution-tile');
    const phoneMockupContainer = document.querySelector('.phone-mockup-container');
    const solutionTilesContainer = document.querySelector('.solution-tiles');
    const allVideos = document.querySelectorAll('.app-video');

    solutionTiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            // Remove active class from all tiles and videos
            solutionTiles.forEach(t => t.classList.remove('active'));
            allVideos.forEach(video => {
                video.classList.remove('active');
                video.pause();
            });
            
            // Add active class to current tile
            this.classList.add('active');
            
            // Shift tiles to left
            solutionTilesContainer.classList.add('shifted');
            
            // Show phone mockup with animation
            phoneMockupContainer.classList.add('active');
            
            // Show and play corresponding video
            const target = this.getAttribute('data-target');
            const targetVideo = document.getElementById(`video-${target}`);
            if (targetVideo) {
                targetVideo.classList.add('active');
                targetVideo.play();
            }
        });
    });

    // Hide phone mockup when mouse leaves solution section
    const solutionSection = document.querySelector('.solution-section');
    solutionSection.addEventListener('mouseleave', function() {
        solutionTiles.forEach(t => t.classList.remove('active'));
        allVideos.forEach(video => {
            video.classList.remove('active');
            video.pause();
        });
        solutionTilesContainer.classList.remove('shifted');
        phoneMockupContainer.classList.remove('active');
    });

    // Contact button functionality - now handled by mailto link

    // App store button functionality
    const appStoreLinks = document.querySelectorAll('.app-store-link');
    appStoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoonModal();
        });
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Make hero section visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});

// Add loading animation for images
function preloadImages() {
    const images = [
        'hero-food.jpg',
        'phone-mockup.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload function
preloadImages();

// Modal functionality
function showComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.add('active');
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.remove('active');
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('comingSoonModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
