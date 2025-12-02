// ===================================
// CUSTOM CURSOR
// ===================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    const speed = 0.2;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    const followerSpeed = 0.1;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .tilt-card, .project-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ===================================
// MOBILE NAVIGATION
// ===================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLL & ACTIVE NAV
// ===================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ===================================
// PARTICLES CANVAS (Hero Section)
// ===================================
const particlesCanvas = document.getElementById('particles-canvas');
const ctx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 168, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 168, 255, ${0.2 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// ===================================
// 3D TILT EFFECT FOR CARDS
// ===================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(
    '.tilt-card, .project-card, .skills-category, .contact-form, .contact-visual'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// 3D GLOBE CANVAS (Contact Section)
// ===================================
const globeCanvas = document.getElementById('globe-canvas');
if (globeCanvas) {
    const globeCtx = globeCanvas.getContext('2d');
    globeCanvas.width = 400;
    globeCanvas.height = 400;
    
    let rotationAngle = 0;
    
    class GlobePoint {
        constructor() {
            this.theta = Math.random() * Math.PI * 2;
            this.phi = Math.acos(2 * Math.random() - 1);
            this.radius = 150;
        }
        
        getPosition(angle) {
            const x = this.radius * Math.sin(this.phi) * Math.cos(this.theta + angle);
            const y = this.radius * Math.sin(this.phi) * Math.sin(this.theta + angle);
            const z = this.radius * Math.cos(this.phi);
            
            return { x, y, z };
        }
    }
    
    const globePoints = [];
    for (let i = 0; i < 500; i++) {
        globePoints.push(new GlobePoint());
    }
    
    function drawGlobe() {
        globeCtx.clearRect(0, 0, globeCanvas.width, globeCanvas.height);
        
        const centerX = globeCanvas.width / 2;
        const centerY = globeCanvas.height / 2;
        
        // Sort points by z-index (depth)
        const sortedPoints = globePoints.map(point => {
            const pos = point.getPosition(rotationAngle);
            return { ...pos, point };
        }).sort((a, b) => a.z - b.z);
        
        // Draw connections between nearby points
        sortedPoints.forEach((pointData, i) => {
            const { x: x1, y: y1, z: z1 } = pointData;
            
            for (let j = i + 1; j < sortedPoints.length; j++) {
                const { x: x2, y: y2, z: z2 } = sortedPoints[j];
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
                
                if (distance < 80) {
                    const opacity = Math.max(0, (z1 + 150) / 300) * 0.3;
                    globeCtx.strokeStyle = `rgba(0, 168, 255, ${opacity})`;
                    globeCtx.lineWidth = 1;
                    globeCtx.beginPath();
                    globeCtx.moveTo(centerX + x1, centerY + y1);
                    globeCtx.lineTo(centerX + x2, centerY + y2);
                    globeCtx.stroke();
                }
            }
        });
        
        // Draw points
        sortedPoints.forEach(({ x, y, z }) => {
            const scale = (z + 150) / 300;
            const size = 2 * scale;
            const opacity = Math.max(0.1, scale);
            
            globeCtx.fillStyle = `rgba(0, 168, 255, ${opacity})`;
            globeCtx.beginPath();
            globeCtx.arc(centerX + x, centerY + y, size, 0, Math.PI * 2);
            globeCtx.fill();
        });
        
        rotationAngle += 0.005;
        requestAnimationFrame(drawGlobe);
    }
    
    drawGlobe();
}

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name && email && message) {
        // Create mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        window.location.href = `mailto:singhpraachi2904@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Show success message
        alert('Thank you for your message! Your email client will open shortly.');
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 168, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .particle-sphere');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE
// ===================================
const subtitle = document.querySelector('.hero-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';

let charIndex = 0;

function typeSubtitle() {
    if (charIndex < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeSubtitle, 100);
    }
}

// Start typing effect after page load
setTimeout(typeSubtitle, 500);

// ===================================
// PROJECT CARD HOVER EFFECT
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--color-accent)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});

// ===================================
// SKILL TAG CLICK EFFECT
// ===================================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.animation = 'none';
        setTimeout(() => {
            tag.style.animation = '';
        }, 10);
    });
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c👋 Hello there!', 'font-size: 20px; color: #00A8FF; font-weight: bold;');
console.log('%cWelcome to Praachi Singh\'s Portfolio', 'font-size: 16px; color: #FFFFFF;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/singhpraachi', 'font-size: 14px; color: #00A8FF;');

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images when they come into view
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Skip to main content link
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
});

// ===================================
// TECH SPHERE ROTATION
// ===================================
const techSpheres = document.querySelectorAll('.tech-sphere');

techSpheres.forEach((sphere, index) => {
    sphere.style.animationDelay = `${index * 0.5}s`;
    
    sphere.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    sphere.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// ===================================
// BACK TO TOP BUTTON (Optional)
// ===================================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--color-accent);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 5px 20px rgba(0, 168, 255, 0.5)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
});
