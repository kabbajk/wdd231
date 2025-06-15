// Load attractions from JSON file
fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => {
        const attractionsContainer = document.getElementById('attractionsContainer');
        
        data.attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            
            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy" width="300" height="200">
                    <figcaption>${attraction.name}</figcaption>
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button class="learn-more">Learn More</button>
            `;
            
            attractionsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading attractions:', error));

// Visit tracking functionality
function displayVisitMessage() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDifference === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate.getTime().toString());
}

// Call the function when the page loads
window.addEventListener('load', displayVisitMessage);