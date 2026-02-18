// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll to Top
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Scroll Animations (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Merged scroll handler with requestAnimationFrame throttling
const header = document.querySelector('.header-contact');
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');
let ticking = false;
let lastScrollY = 0;

function onScroll() {
    const y = window.scrollY;

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', y > 300);
    }

    // Hide header on scroll down, show on scroll up
    if (header) {
        const menuOpen = navLinks && navLinks.classList.contains('open');
        if (y > lastScrollY && y > 80 && !menuOpen) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        header.classList.toggle('scrolled', y > 100);
    }
    lastScrollY = y;

    // Active nav link
    let current = '';
    sections.forEach(section => {
        if (y >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            onScroll();
            ticking = false;
        });
        ticking = true;
    }
});
