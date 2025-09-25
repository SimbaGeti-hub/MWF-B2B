const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Check mobile viewport
function isMobile() { return window.innerWidth <= 768; }

// Hamburger toggle for mobile sidebar
hamburger.addEventListener('click', () => {
  if (isMobile()) sidebar.classList.toggle('expanded');
});

// Sidebar expand/collapse on desktop hover
sidebar.addEventListener('mouseenter', () => {
  if (!isMobile()) sidebar.classList.add('expanded');
});
sidebar.addEventListener('mouseleave', () => {
  if (!isMobile()) sidebar.classList.remove('expanded');
});
