// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate skill progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width + '%';
            }
        });
    }, observerOptions);

    // Observe all skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        skillsObserver.observe(card);
    });

    // Add active class to current navigation item
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current nav link
                const currentNavLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe all sections
    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Mobile menu toggle (for future mobile implementation)
    function toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Reset button after 3 seconds (or when form submission is complete)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Add scroll effect to sidebar
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sidebar = document.querySelector('.sidebar');
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            sidebar.style.transform = 'translateX(0)';
        } else {
            // Scrolling up
            sidebar.style.transform = 'translateX(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Add typing effect to the main heading
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Apply typing effect to main heading
    const mainHeading = document.querySelector('.home-right h1');
    if (mainHeading) {
        const originalText = mainHeading.textContent;
        // Start typing effect after slide animation
        setTimeout(() => {
            typeWriter(mainHeading, originalText, 80);
        }, 500);
    }

    // Add parallax effect to sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const homeSection = document.querySelector('.home-section');
        if (homeSection) {
            homeSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to buttons
    document.querySelectorAll('.btn-cv, .submit-btn, .project-info a').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-links a.active {
            background: #34495e;
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);
});