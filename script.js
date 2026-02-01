/* ============================================================================
   PRASANTH GERIKE PORTFOLIO - JAVASCRIPT
   Interactive Features & Animations
   ============================================================================ */

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.metric-card, .experience-card, .project-card, .skill-category'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeUp 0.6s ease-out ${index * 100}ms forwards`;
    });
});

// ============================================================================
// NAVBAR SCROLL EFFECT
// ============================================================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================================================
// PARALLAX EFFECT FOR HERO
// ============================================================================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================================================
// BUTTON HOVER EFFECTS
// ============================================================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================================
// CARD HOVER EFFECTS
// ============================================================================

const cards = document.querySelectorAll(
    '.metric-card, .experience-card, .project-card, .skill-category'
);

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================================
// COUNTER ANIMATION FOR METRICS
// ============================================================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = originalText;
            clearInterval(counter);
        } else {
            // Format the number
            const formatted = Math.floor(current).toLocaleString();
            element.textContent = formatted + (originalText.includes('+') ? '+' : originalText.includes('%') ? '%' : '');
        }
    }, 16);
}

// Trigger counter animation when metrics section is visible
const metricsSection = document.querySelector('.metrics');
let metricsAnimated = false;

if (metricsSection) {
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !metricsAnimated) {
                metricsAnimated = true;
                
                const metricNumbers = document.querySelectorAll('.metric-number');
                metricNumbers.forEach(number => {
                    const text = number.textContent;
                    const numMatch = text.match(/\d+/);
                    
                    if (numMatch) {
                        const target = parseInt(numMatch[0]);
                        animateCounter(number, target);
                    }
                });
                
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricsObserver.observe(metricsSection);
}

// ============================================================================
// SMOOTH SCROLL BEHAVIOR ENHANCEMENT
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            scrollToSection(href.slice(1));
        }
    });
});

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

document.addEventListener('keydown', (e) => {
    // Scroll to sections with keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                scrollToSection('experience');
                break;
            case '2':
                scrollToSection('projects');
                break;
            case '3':
                scrollToSection('contact');
                break;
        }
    }
});

// ============================================================================
// LAZY LOADING IMAGES
// ============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 999;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Create scroll to top button on page load
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ============================================================================
// RIPPLE EFFECT ON BUTTON CLICK
// ============================================================================

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedScroll);

// ============================================================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================================================

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    *:focus-visible {
        outline: 2px solid #0ea5e9;
        outline-offset: 2px;
    }
    
    .btn:focus-visible {
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.5);
    }
`;
document.head.appendChild(focusStyle);

// ============================================================================
// PAGE LOAD ANIMATION
// ============================================================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================

console.log('%cWelcome to Prasanth Gerike Portfolio!', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
console.log('%cDesigned with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #8b5cf6;');
