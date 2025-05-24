// Member Spotlights
document.addEventListener('DOMContentLoaded', function() {
    // Sample member data - replace with your actual JSON data
    const members = [
        {
            name: "Green Light Distribution",
            logo: "images/EverHive.png",
            address: "123 Main Street, Wellington Bassah",
            phone: "+232-123-4567",
            website: "https://greenlightdistribution.com/",
            membershipLevel: "Gold",
            description: "Leading manufacturer products"
        },
        {
            name: "Netflix",
            logo: "images/netflix.png",
            address: "456 Innovation Drive, [City], [State]",
            phone: "(555) 987-6543",
            website: "https://www.netflix.com/sl/",
            membershipLevel: "Gold",
            description: "Unlimited movies,TV shows,and more."
        },
        {
            name: "Care Bridge",
            logo: "images/horizontal.svg",
            address: "926 Main Street Nashville, TN 37206",
            phone: "(615) 679-9087",
            website: "https://www.carebridgehealth.com/",
            membershipLevel: "Gold",
            description: "The best Health centre in town"
        },
        {
            name: "Market Call",
            logo: "images/flexcare.webp",
            address: "78 SW 7th St Miami FL 33130",
            phone: "+1 (844) 410-5210",
            website: "https://www.marketcall.com/",
            membershipLevel: "Silver",
            description: "Your complete IT services provider"
        }
    ];
    
    // Filter gold and silver members
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );
    
    // Shuffle array and select 2-3 members
    const shuffledMembers = [...qualifiedMembers].sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, Math.random() > 0.5 ? 2 : 3);
    
    // Display selected members
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';
    
    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.logo}" alt="${member.name} Logo">
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
            <p class="membership-level">${member.membershipLevel} Member</p>
        `;
        spotlightContainer.appendChild(card);
    });
});