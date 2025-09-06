// ui.js

// Ejemplo: botón para volver arriba
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ejemplo: toggle de menú lateral
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar-navigation');
  sidebar.classList.toggle('open');
}
