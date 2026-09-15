// =============================================
// Super Packers Movers - Main JavaScript
// =============================================

// === MOBILE NAV TOGGLE ===
function toggleMobileNav() {
    const nav = document.getElementById('mobileNav');
    const toggle = document.getElementById('mobileToggle');
    if (!nav) return;
    nav.classList.toggle('open');
    if (toggle) toggle.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// Close mobile nav on outside click
document.addEventListener('click', function(e) {
    const nav = document.getElementById('mobileNav');
    const toggle = document.getElementById('mobileToggle');
    if (nav && nav.classList.contains('open')) {
        if (!nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
            nav.classList.remove('open');
            if (toggle) toggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});

// === STICKY HEADER SHADOW ===
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
    }
});

// === SCROLL ANIMATION (Intersection Observer) ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for grid items
                const siblings = entry.target.parentElement
                    ? Array.from(entry.target.parentElement.querySelectorAll('[data-animate]'))
                    : [];
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// === FAQ ACCORDION ===
function toggleFaq(item) {
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle i');
    const isOpen = item.classList.contains('open');

    // Close all open FAQs in the same group
    const allFaqs = item.closest('.faq-category-block')
        ? item.closest('.faq-category-block').querySelectorAll('.faq-item')
        : document.querySelectorAll('.faq-item');

    allFaqs.forEach(faq => {
        if (faq !== item) {
            faq.classList.remove('open');
            const ans = faq.querySelector('.faq-answer');
            const tog = faq.querySelector('.faq-toggle i');
            if (ans) ans.classList.remove('open');
            if (tog) { tog.className = 'fas fa-plus'; }
        }
    });

    if (isOpen) {
        item.classList.remove('open');
        if (answer) answer.classList.remove('open');
        if (toggle) toggle.className = 'fas fa-plus';
    } else {
        item.classList.add('open');
        if (answer) answer.classList.add('open');
        if (toggle) toggle.className = 'fas fa-minus';
    }
}

// === FAQ CATEGORY TABS ===
function showCategory(cat) {
    // Update button styles
    document.querySelectorAll('.faq-cat-btn').forEach(btn => {
        btn.style.background = 'var(--bg-light)';
        btn.style.color = 'var(--text)';
    });
    const activeBtn = document.querySelector(`[onclick="showCategory('${cat}')"]`);
    if (activeBtn) {
        activeBtn.style.background = 'var(--accent)';
        activeBtn.style.color = 'var(--primary)';
    }

    // Scroll to category block
    const block = document.getElementById('cat-' + cat);
    if (block) {
        block.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// === QUOTE FORM HANDLER ===
function handleQuoteForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    btn.disabled = true;
    btn.style.background = 'var(--secondary)';

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Quote Request Sent!';
        btn.style.background = '#27AE60';

        // Show success message
        showSuccessToast('Your quote request has been submitted! We\'ll call you within 30 minutes.');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 4000);
    }, 1500);

    return false;
}

// === CONTACT FORM HANDLER ===
function handleContactForm(e) {
    return handleQuoteForm(e);
}

// === ADVERTISE FORM HANDLER ===
function handleAdvertiseForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Enquiry Sent!';
        btn.style.background = '#27AE60';
        showSuccessToast('Your business enquiry has been sent! We\'ll respond within 1 business day.');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 4000);
    }, 1500);

    return false;
}

// === TOAST NOTIFICATION ===
function showSuccessToast(message) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 90px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #1A2E6E;
        color: white;
        padding: 14px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        box-shadow: 0 8px 30px rgba(0,0,0,0.25);
        opacity: 0;
        transition: all 0.4s ease;
        max-width: calc(100vw - 40px);
        text-align: center;
    `;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
    });

    // Animate out
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            window.scrollTo({ top, behavior: 'smooth' });

            // Close mobile nav if open
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('open')) {
                toggleMobileNav();
            }
        }
    });
});

// === ACTIVE NAV LINK (for current page) ===
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav > a, .mobile-nav-links > a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else if (href !== 'index.html') {
            link.classList.remove('active');
        }
    });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    setActiveNavLink();

    // Open FAQ item if URL has hash
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const headerH = document.querySelector('.header')?.offsetHeight || 70;
                window.scrollTo({ top: target.offsetTop - headerH - 20, behavior: 'smooth' });
            }, 100);
        }
    }
});
