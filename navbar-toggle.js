document.addEventListener('DOMContentLoaded', function () {
  const navOpenBtn = document.querySelector('[data-nav-open-btn]');
  const navCloseBtn = document.querySelector('[data-nav-close-btn]');
  const navbar = document.querySelector('[data-navbar]');
  const overlay = document.querySelector('.overlay');

  // Open navbar
  navOpenBtn.addEventListener('click', function () {
    navbar.classList.add('active');
    if (overlay) overlay.classList.add('active');
  });

  // Close navbar
  navCloseBtn.addEventListener('click', function () {
    navbar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  });

  // Close navbar when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function () {
      navbar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Close navbar when clicking a navbar link
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navbar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    });
  });
});