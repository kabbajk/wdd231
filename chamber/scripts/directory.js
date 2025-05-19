// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Update aria-expanded attribute
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close menu when clicking on a link (mobile)
    document.querySelectorAll('#primary-nav a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
  
  // DOM Elements
  const membersContainer = document.getElementById('members-container');
  const gridViewButton = document.getElementById('grid-view');
  const listViewButton = document.getElementById('list-view');
  const copyrightYear = document.getElementById('copyright-year');
  const lastModified = document.getElementById('last-modified');
  
  // Set copyright year and last modified date
  copyrightYear.textContent = new Date().getFullYear();
  lastModified.textContent = document.lastModified;
  
  // Fetch member data and display
  async function getMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      displayMembers(data);
    } catch (error) {
      console.error('Error fetching member data:', error);
      membersContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
  }
  
  // Display members in grid view
  function displayMembers(members) {
    membersContainer.innerHTML = '';
    
    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.className = 'member-card';
      
      memberCard.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership-level">Membership Level: ${getMembershipLevel(member.membership)}</p>
        ${member.industry ? `<p>Industry: ${member.industry}</p>` : ''}
      `;
      
      membersContainer.appendChild(memberCard);
    });
  }
  
  // Helper function to get membership level text
  function getMembershipLevel(level) {
    const levels = {
      1: 'Member',
      2: 'Silver',
      3: 'Gold'
    };
    return levels[level] || 'Member';
  }
  
  // Toggle between grid and list views
  gridViewButton.addEventListener('click', () => {
    membersContainer.classList.remove('list-view');
    membersContainer.classList.add('grid-view');
  });
  
  listViewButton.addEventListener('click', () => {
    membersContainer.classList.remove('grid-view');
    membersContainer.classList.add('list-view');
  });
  
  // Initialize
  getMembers();