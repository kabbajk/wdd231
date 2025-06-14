// Locations page JavaScript
export async function fetchLocations() {
    try {
        const response = await fetch('data/locations.json');
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading locations:', error);
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

    // Load and display locations
    const locations = await fetchLocations();
    displayLocations(locations);

    // Setup search and filter functionality
    setupSearchAndFilter(locations);
});

function displayLocations(locations) {
    const container = document.getElementById('locations-container');
    container.innerHTML = '';

    locations.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.className = 'location-card';
        locationCard.innerHTML = `
            <img src="images/locations/${location.image}" alt="${location.name}" loading="lazy">
            <div class="location-card-content">
                <h3>${location.name}</h3>
                <p class="address">${location.address}</p>
                <p class="hours">${location.hours}</p>
                <p class="phone">${location.phone}</p>
                <div class="services">
                    ${location.services.map(service => 
                        `<span class="service-tag">${service}</span>`
                    ).join('')}
                </div>
                <a href="tel:${location.phone.replace(/[^0-9]/g, '')}" class="cta-button secondary">Call Now</a>
            </div>
        `;
        container.appendChild(locationCard);
    });
}

function setupSearchAndFilter(locations) {
    const searchInput = document.getElementById('location-search');
    const searchBtn = document.getElementById('search-btn');
    const pickupFilter = document.getElementById('filter-pickup');
    const dropoffFilter = document.getElementById('filter-24hr');

    function filterLocations() {
        const searchTerm = searchInput.value.toLowerCase();
        const showPickup = pickupFilter.checked;
        const show24hr = dropoffFilter.checked;

        const filtered = locations.filter(location => {
            const matchesSearch = location.name.toLowerCase().includes(searchTerm) || 
                                location.address.toLowerCase().includes(searchTerm) ||
                                location.phone.includes(searchTerm);
            
            const matchesPickup = !showPickup || location.pickupDelivery;
            const matches24hr = !show24hr || location.twentyFourHour;
            
            return matchesSearch && matchesPickup && matches24hr;
        });

        displayLocations(filtered);
    }

    searchBtn.addEventListener('click', filterLocations);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') filterLocations();
    });
    pickupFilter.addEventListener('change', filterLocations);
    dropoffFilter.addEventListener('change', filterLocations);
}