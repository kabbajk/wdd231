// DOM Elements
const gallery = document.getElementById('gallery');
const visitorMessage = document.getElementById('visitorMessage');
const currentDate = document.getElementById('currentDate');
const lastModified = document.getElementById('lastModified');
const currentYear = document.getElementById('currentYear');
const meetAndGreet = document.getElementById('meetAndGreet');

// Display current date
function displayDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  currentDate.textContent = today.toLocaleDateString('en-US', options);
  
  // Check if today is Monday, Tuesday, or Wednesday to show meet and greet
  const dayOfWeek = today.getDay();
  if (dayOfWeek >= 1 && dayOfWeek <= 3) {
    meetAndGreet.style.display = "block";
  } else {
    meetAndGreet.style.display = "none";
  }
}

// Display last modified date
lastModified.textContent = document.lastModified;

// Display current year
currentYear.textContent = new Date().getFullYear();

// Load gallery items from JSON
async function loadGallery() {
  try {
    const response = await fetch('data/attractions.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayGallery(data.items);
  } catch (error) {
    console.error('Error loading gallery:', error);
    gallery.innerHTML = '<p>Sorry, we couldn\'t load the gallery at this time. Please try again later.</p>';
  }
}

// Display gallery items
function displayGallery(items) {
  gallery.innerHTML = ''; // Clear loading message
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-more">Learn More</button>
    `;
    
    gallery.appendChild(card);
  });
}

// Track visits and display message
function trackVisits() {
  const now = new Date();
  const lastVisit = localStorage.getItem('lastVisit');
  
  if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = new Date(parseInt(lastVisit));
    const timeDiff = now - lastVisitDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysDiff === 1 ? "day" : "days";
      visitorMessage.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
    }
  }
  
  localStorage.setItem('lastVisit', now.getTime().toString());
}

// Initialize page
function init() {
  displayDate();
  loadGallery();
  trackVisits();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', init);