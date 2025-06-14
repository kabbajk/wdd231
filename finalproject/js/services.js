// Services page JavaScript
export async function fetchServices() {
    try {
        const response = await fetch('data/services.json');
        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading services:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Mobile menu toggle (same as main.js)
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterServices(this.dataset.category);
        });
    });

    // Load and display services
    const services = await fetchServices();
    displayServices(services);

    // Pricing calculator
    setupPricingCalculator();

    // Modal functionality
    setupServiceModal();
});

function displayServices(services) {
    const container = document.getElementById('services-container');
    container.innerHTML = '';

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = `service-card ${service.category}`;
        serviceCard.innerHTML = `
            <img src="images/services/${service.image}" alt="${service.name}" loading="lazy">
            <div class="service-card-content">
                <h3>${service.name}</h3>
                <div class="price">$${service.price.toFixed(2)}</div>
                <p class="description">${service.shortDescription}</p>
                <button class="details-btn" data-service-id="${service.id}">View Details</button>
            </div>
        `;
        container.appendChild(serviceCard);
    });
}

function filterServices(category) {
    const services = document.querySelectorAll('.service-card');
    services.forEach(service => {
        if (category === 'all' || service.classList.contains(category)) {
            service.style.display = 'block';
        } else {
            service.style.display = 'none';
        }
    });
}

function setupPricingCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    const serviceSelect = document.getElementById('calc-service');
    const weightInput = document.getElementById('calc-weight');
    const rushSelect = document.getElementById('calc-rush');
    const resultDisplay = document.getElementById('estimate-result');

    // Base prices for services
    const servicePrices = {
        'wash-fold': 1.50,
        'dry-clean': 3.00,
        'press-only': 2.00
    };

    calculateBtn.addEventListener('click', function() {
        const service = serviceSelect.value;
        const weight = parseFloat(weightInput.value) || 0;
        const rushMultiplier = parseFloat(rushSelect.value) || 1.0;

        if (!service) {
            alert('Please select a service type');
            return;
        }

        if (weight <= 0) {
            alert('Please enter a valid weight');
            return;
        }

        const basePrice = servicePrices[service] * weight;
        const totalPrice = basePrice * rushMultiplier;

        resultDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    });
}

function setupServiceModal() {
    const modal = document.getElementById('service-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalContent = document.getElementById('modal-content');

    // Open modal when details button is clicked
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('details-btn')) {
            const serviceId = e.target.dataset.serviceId;
            showServiceDetails(serviceId);
        }
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    async function showServiceDetails(serviceId) {
        try {
            const services = await fetchServices();
            const service = services.find(s => s.id === serviceId);
            
            if (service) {
                modalContent.innerHTML = `
                    <h2>${service.name}</h2>
                    <div class="modal-price">$${service.price.toFixed(2)}</div>
                    <img src="images/services/${service.image}" alt="${service.name}" loading="lazy" class="modal-image">
                    <p>${service.fullDescription}</p>
                    <h3>Details</h3>
                    <ul class="service-details">
                        <li><strong>Turnaround Time:</strong> ${service.turnaround}</li>
                        <li><strong>Category:</strong> ${service.categoryLabel}</li>
                        <li><strong>Best for:</strong> ${service.bestFor}</li>
                    </ul>
                    <a href="#contact" class="cta-button">Schedule This Service</a>
                `;
                modal.style.display = 'block';
            }
        } catch (error) {
            console.error('Error loading service details:', error);
            modalContent.innerHTML = '<p>Error loading service details. Please try again later.</p>';
            modal.style.display = 'block';
        }
    }
}