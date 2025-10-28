
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    initThemeToggle();
    initMobileMenu();
    initContactForm();
    initDownloadCV();
    initCursorEffect();
    initTypingEffect();
    initSkillCardHover();
    initScrollProgress();
    initLazyLoading();
});

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('header h4');
    const sections = {
        'Home': '.view1',
        'About': '.view2',
        'Experience': '.view3',
        'My Skills': '.view4',
        'Education': '.view5',
        'Contact': '.view6'
    };

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            const linkText = link.textContent.trim();
            const targetSection = sections[linkText];
            
            if (targetSection) {
                e.preventDefault();
                const target = document.querySelector(targetSection);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu after click
                    const header = document.querySelector('header');
                    if (header.classList.contains('mobile-open')) {
                        header.classList.remove('mobile-open');
                    }
                }
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        // lower threshold and smaller negative rootMargin to reveal earlier
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .para, .img2, .bt1, 
        .card1, .card2, .card3, .edu-card, .proj-card,
        .exp1, .exp2, .exp3, .exp4,
        .box1, .box2,
        .con1, .con2, .con3, .info
    `);

    animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    // faster reveal: 0.45s with a small stagger per item
    el.style.transition = `opacity 0.45s cubic-bezier(.2,.9,.2,1) ${index * 0.06}s, transform 0.45s cubic-bezier(.2,.9,.2,1) ${index * 0.06}s`;
        observer.observe(el);
    });
}

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero section
        const softText = document.querySelector('.soft');
        const designText = document.querySelector('.design');
        const heroImg = document.querySelector('#img1');
        
        if (softText) softText.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (designText) designText.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (heroImg) heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    });
}


function initMobileMenu() {
    const menuIcon = document.querySelector('.vk');
    const header = document.querySelector('header');

    if (menuIcon && header) {
        menuIcon.addEventListener('click', () => {
            header.classList.toggle('mobile-open');
            const icon = menuIcon.querySelector('i');
            
            if (header.classList.contains('mobile-open')) {
                icon.classList.remove('ri-menu-4-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-4-line');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && !menuIcon.contains(e.target)) {
                header.classList.remove('mobile-open');
                const icon = menuIcon.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-4-line');
            }
        });
    }
}


function initContactForm() {
    const sendButton = document.querySelector('.button');
    const inputs = {
        name: document.getElementById('1st'),
        email: document.getElementById('2nd'),
        subject: document.getElementById('3rd'),
        message: document.getElementById('4th')
    };

    if (sendButton) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validation
            const name = inputs.name?.value.trim();
            const email = inputs.email?.value.trim();
            const subject = inputs.subject?.value.trim();
            const message = inputs.message?.value.trim();

            if (!name || !email || !subject || !message) {
                showToast('⚠️ Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showToast('⚠️ Please enter a valid email', 'error');
                return;
            }

            // Simulate sending (in production, connect to backend)
            sendButton.textContent = 'Sending...';
            sendButton.disabled = true;

            setTimeout(() => {
                showToast('✉️ Message sent successfully!', 'success');
                sendButton.textContent = 'Send Message';
                sendButton.disabled = false;
                
                // Clear form
                Object.values(inputs).forEach(input => {
                    if (input) input.value = '';
                });
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function initDownloadCV() {
    const downloadBtn = document.querySelector('.bt1');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Downloading...';
            downloadBtn.disabled = true;

            // Simple direct download approach
            // If PDF is in same directory, use direct link
                const link = document.createElement('a');
                link.href = 'Shreya_Kshatri_Resume.pdf'; // Use exact filename placed in project root
                link.download = 'Shreya_Kshatri_Resume.pdf';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message after short delay
            setTimeout(() => {
                showToast('📄 Resume download started!', 'success');
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
            }, 500);
        });

        // Hover effect
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.transform = 'scale(1.05)';
            downloadBtn.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3)';
        });

        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.transform = 'scale(1)';
            downloadBtn.style.boxShadow = '2px 2px 9px rgba(235, 235, 235, 0.726)';
        });
    }
}


function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive elements
    const interactiveElements = document.querySelectorAll('button, a, h4, .card1, .card2, .card3, .edu-card, .proj-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.8)';
            cursor.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        });
    });
}


function initTypingEffect() {
    const helloText = document.querySelector('#hello h2');
    if (helloText) {
        const text = 'Hello';
        helloText.textContent = '';
        let index = 0;

        function typeText() {
            if (index < text.length) {
                helloText.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 200);
            }
        }

        // Start typing after a delay
        setTimeout(typeText, 500);
    }
}


function initSkillCardHover() {
    const cards = document.querySelectorAll('.card1, .card2, .card3, .edu-card, .proj-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '8px 8px 8px rgb(7, 7, 7)';
        });
    });
}


function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #7b2cbf);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}


function initLazyLoading() {
    const imageElements = document.querySelectorAll('#img1, .img2, .img3, .img4, .img5, .img6');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    });

    imageElements.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        imageObserver.observe(img);
    });
}


function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Style based on type
    const colors = {
        success: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        error: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-family: 'font1', sans-serif;
        font-size: 14px;
        letter-spacing: 1px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    // Config: replace these placeholders with your real profile URLs
    const SOCIAL_LINKS = {
        email: 'mailto:youremail@example.com',
        linkedin: 'https://www.linkedin.com/in/shreya-kshatri-a86716292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        github: 'https://github.com/shreya05kshatri',
        facebook: 'https://www.facebook.com/yourprofile',
        x: 'https://twitter.com/yourprofile',
        instagram: 'https://www.instagram.com/cypherr_rx?igsh=MTUzdnV2bmpmbGxkbw=='
    };

    // Collect icons from both icon containers (email sits in #icon1)
    const socialIcons = document.querySelectorAll('#icon1 i, #icon2 i');

    socialIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.style.transition = 'transform 0.3s ease, color 0.3s ease';

        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) rotate(10deg)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });

        icon.addEventListener('click', (e) => {
            // Determine which icon was clicked by checking class names
            const cls = Array.from(icon.classList).join(' ');

            let url = null;

            if (cls.includes('ri-at-line')) url = SOCIAL_LINKS.email;
            else if (cls.includes('ri-linkedin-fill')) url = 'https://www.linkedin.com/in/shreya-kshatri-a86716292';
            else if (cls.includes('ri-github-fill')) url = 'https://github.com/shreya05kshatri';
            else if (cls.includes('ri-twitter-x-line')) url = SOCIAL_LINKS.x;
            else if (cls.includes('ri-instagram-line')) url = 'https://www.instagram.com/cypherr_rx?igsh=MTUzdnV2bmpmbGxkbw==';

            if (url) {
                // mailto should open in same tab; others open in new, secure tab
                if (url.startsWith('mailto:')) {
                    window.location.href = url;
                } else {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            } else {
                showToast('🔗 Link not configured yet. Update SOCIAL_LINKS in script.js', 'info');
            }
        });
    });
});


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


document.addEventListener('DOMContentLoaded', () => {
  initSmoothScrolling();
  initScrollAnimations();
  initDownloadCV();
  initDualCursor();
  initScrollProgressBar();
});


function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('header h4');
  const sections = {
    'Home': '.view1',
    'About': '.view2',
    'Projects': '.view7',
    'My Skills': '.view4',
    'Experience': '.view3',
    'Education': '.view5',
    'Contact': '.view6'
  };

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetSection = sections[link.textContent.trim()];
      if (targetSection) {
        e.preventDefault();
        document.querySelector(targetSection).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const animated = document.querySelectorAll('.para, .bt1, .card1, .card2, .card3, .proj-card, .edu-card, .exp1, .exp2, .exp3, .exp4, .con1, .con2, .con3');
  animated.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}


function initDownloadCV() {
  const cvBtn = document.getElementById('cvBtn');
  if (!cvBtn) return;

  cvBtn.addEventListener('click', () => {
    if (cvBtn.classList.contains('loading')) return;

    cvBtn.classList.add('loading');
    cvBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Downloading...`;

    setTimeout(() => {
      try {
        const link = document.createElement('a');
        link.href = 'Shreya_Kshatri_Resume.pdf'; // make sure file name matches
        link.download = 'Shreya_Kshatri_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('📄 Resume download started!');
      } catch (error) {
        showToast('⚠️ Failed to start download', 'error');
      } finally {
        cvBtn.classList.remove('loading');
        cvBtn.innerHTML = `<i class="ri-download-line"></i> Resume`;
      }
    }, 1000);
  });
}


function initDualCursor() {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover and click interactions
  const hoverables = document.querySelectorAll('a, button, h4, .card1, .card2, .card3, .proj-card, .edu-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });

  document.addEventListener('mousedown', () => {
    ring.classList.add('active');
    dot.classList.add('active');
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('active');
    dot.classList.remove('active');
  });
}


function initScrollProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollHeight) * 100;
    bar.style.width = `${progress}%`;
  });
}


function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  if (type === 'error') toast.style.background = 'linear-gradient(135deg, #f87171, #ef4444)';
  if (type === 'success') toast.style.background = 'linear-gradient(135deg, #22c55e, #10b981)';

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

console.log('✨ Enhanced Portfolio UI Loaded Successfully');


// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll handlers can go here
}, 10));

console.log('🚀 Portfolio website loaded successfully!');