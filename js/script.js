document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');

  // Theme management
  const applyTheme = (theme) => {
    document.body.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggle) {
      themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  };

  const savedTheme = localStorage.getItem('portfolio-theme');
  const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(preferredTheme);

  // Navigation toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Close mobile menu when clicking links
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => links?.classList.remove('open'));
  });

  // Theme toggle
  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
    applyTheme(nextTheme);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add ripple effect to all buttons
  document.querySelectorAll('.button').forEach(button => {
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
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: rippleEffect 0.8s ease-out;
        z-index: 1000;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    });
  });

  // Add keyframes for ripple effect
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes rippleEffect {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Intersection Observer for scroll animations
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

  // Observe cards for animation
  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });

  // Particle background effect
  createParticles();
});

function createParticles() {
  const particleCount = 30;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: fixed;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: float ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    document.body.appendChild(particle);
    particles.push(particle);
  }

  // Add floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
      }
      75% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
      }
    }
  `;
  document.head.appendChild(style);
}
