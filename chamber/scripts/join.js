// Set current year and last modified date
document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp when page loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    
    // Modal functionality
    const modalLinks = document.querySelectorAll('.modal-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            document.querySelector(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Form validation for organizational title
    const orgTitleInput = document.getElementById('orgTitle');
    if (orgTitleInput) {
        orgTitleInput.addEventListener('input', function() {
            const pattern = /^[a-zA-Z\- ]{7,}$/;
            if (this.value && !pattern.test(this.value)) {
                this.setCustomValidity('Please enter at least 7 characters (letters, spaces, or hyphens only)');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Set current year in footer
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Set last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
    
    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger-menu');
    const navigation = document.getElementById('navigation');
    
    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            navigation.classList.toggle('show');
            hamburger.classList.toggle('open');
        });
    }
});