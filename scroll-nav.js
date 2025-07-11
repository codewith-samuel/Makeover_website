document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const overlay = document.querySelector('.overlay');
  const toggleBtn = document.querySelector('.header-bottom-actions-btn[aria-label="Menu"]'); // Adjust selector if needed

  let lastScrollTop = 0;

  // Toggle navbar on button click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('navbar-hidden');
      }
    });
  }

  // Handle scroll direction
  window.addEventListener('scroll', () => {
    // Only apply scroll behavior on mobile (max-width: 768px)
    if (window.matchMedia('(max-width: 768px)').matches) {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScrollTop && navbar.classList.contains('active')) {
        // Scrolling down and navbar is active
        navbar.classList.add('navbar-hidden');
        navbar.classList.remove('active');
        overlay.classList.remove('active');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update last scroll position
    }
  });

  // Close navbar when clicking overlay
  overlay.addEventListener('click', () => {
    navbar.classList.remove('active');
    navbar.classList.add('navbar-hidden');
    overlay.classList.remove('active');
  });

  // Close navbar when clicking close button
  const closeBtn = document.querySelector('.nav-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      navbar.classList.remove('active');
      navbar.classList.add('navbar-hidden');
      overlay.classList.remove('active');
    });
  }
});