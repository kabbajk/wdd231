// Main JavaScript for the home page
import { fetchServices } from './services.js';

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }

    prevBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', function() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });

    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);

    // Initialize with first testimonial
    showTestimonial(0);

    // Store user preferences in localStorage
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPrefersDark = localStorage.getItem('darkMode') === 'true';
    
    if (userPrefersDark || (localStorage.getItem('darkMode') === null && prefersDarkMode)) {
        document.documentElement.classList.add('dark-mode');
    }

    // Load featured services
    fetchFeaturedServices();
});

async function fetchFeaturedServices() {
    try {
        const response = await fetch('data/services.json');
        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }
        const services = await response.json();
        
        // Filter featured services
        const featuredServices = services.filter(service => service.featured);
        
        // Display in features section (just an example of data fetching)
        console.log('Featured services:', featuredServices);
        
    } catch (error) {
        console.error('Error loading services:', error);
        // You could display an error message to the user here
    }
}