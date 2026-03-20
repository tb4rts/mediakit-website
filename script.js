// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== ANIMATED NUMBER COUNTERS =====
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = target * ease;

        if (decimals > 0) {
            el.textContent = current.toFixed(decimals);
        } else if (target >= 1000) {
            el.textContent = formatNumber(Math.floor(current));
        } else {
            el.textContent = current.toFixed(decimals);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== BAR CHART ANIMATION =====
function animateBars(card) {
    card.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width + '%';
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

// Animate counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number, .hero-stat-number').forEach(el => {
    counterObserver.observe(el);
});

// Animate bar charts
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateBars(entry.target);
            barObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.audience-card').forEach(el => {
    barObserver.observe(el);
});

// Fade-in elements
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Add fade-in class to elements
document.querySelectorAll(
    '.about-grid, .stat-card, .audience-card, .package-card, .partner-logo, .testimonial-card, .result-card, .contact-form'
).forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ===== CONTACT FORM HANDLING =====
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simple validation
    if (!data.name || !data.email || !data.company) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.style.color = '#ef4444';
        return;
    }

    // Simulate form submission (replace with your actual form endpoint)
    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#6b7280';

    setTimeout(() => {
        formStatus.textContent = 'Thank you! We\'ll be in touch within 24 hours.';
        formStatus.style.color = '#10b981';
        form.reset();
    }, 1000);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 72; // navbar height
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});
