// ==========================================
// wzard — Developer & Reverse Engineer
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initASCIIAnimation();
    initTiltEffect();
});

// ==========================================
// Loader
// ==========================================
function initLoader() {
    const loader = document.querySelector('.loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .tool-card, .code-window, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================
// Skill Bars Animation
// ==========================================
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const width = progress.getAttribute('data-width');
                setTimeout(() => {
                    progress.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// ==========================================
// ASCII Animation
// ==========================================
function initASCIIAnimation() {
    const asciiElement = document.getElementById('asciiSkull');
    const mainSkull = document.getElementById('mainSkull');

    // Mouse follow effect for background skull
    if (asciiElement) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 15;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 15;

            asciiElement.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });

        // Random glitch
        setInterval(() => {
            if (Math.random() > 0.92) {
                asciiElement.style.opacity = '0.12';
                asciiElement.style.textShadow = '-3px 0 rgba(255,255,255,0.5), 3px 0 rgba(255,255,255,0.5)';

                setTimeout(() => {
                    asciiElement.style.opacity = '0.05';
                    asciiElement.style.textShadow = 'none';
                }, 80);
            }
        }, 400);
    }

    // Animated skull on the right
    if (mainSkull) {
        // Matrix rain effect on skull
        const skullChars = '01';
        const originalText = mainSkull.textContent;

        setInterval(() => {
            if (Math.random() > 0.7) {
                // Randomly replace some characters
                let newText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (originalText[i] === '█' && Math.random() > 0.95) {
                        newText += skullChars[Math.floor(Math.random() * skullChars.length)];
                    } else if (originalText[i] === '╗' || originalText[i] === '╔' || originalText[i] === '║' || originalText[i] === '╚' || originalText[i] === '╝') {
                        if (Math.random() > 0.97) {
                            newText += skullChars[Math.floor(Math.random() * skullChars.length)];
                        } else {
                            newText += originalText[i];
                        }
                    } else {
                        newText += originalText[i];
                    }
                }
                mainSkull.textContent = newText;

                setTimeout(() => {
                    mainSkull.textContent = originalText;
                }, 100);
            }
        }, 200);

        // Mouse interaction
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 10;

            mainSkull.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    }
}

// ==========================================
// Tilt Effect
// ==========================================
function initTiltEffect() {
    document.querySelectorAll('.skill-card, .tool-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Console Easter Egg
console.log('%c wzard ', 'background: #fff; color: #000; font-size: 20px; font-weight: bold; padding: 8px 16px;');
console.log('%c Developer & Reverse Engineer ', 'color: #888; font-size: 12px;');
console.log('%c C++ | Python | Lua | RE ', 'color: #666; font-size: 11px;');