// Main JavaScript for common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set footer year and last modified date
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
    
    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const navigation = document.querySelector('.navigation');
    
    menuButton.addEventListener('click', function() {
        navigation.classList.toggle('show');
    });
});