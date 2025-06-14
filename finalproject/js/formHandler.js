// Form handling JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters to get form data
    const urlParams = new URLSearchParams(window.location.search);
    const formData = {};
    
    urlParams.forEach((value, key) => {
        formData[key] = value;
    });

    // Display the form data on the confirmation page
    if (Object.keys(formData).length > 0) {
        const confirmationDetails = document.getElementById('confirmation-details');
        confirmationDetails.innerHTML = `
            <h3>Your Pickup Details</h3>
            <p><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> ${formData.address || 'Not provided'}</p>
            <p><strong>Service Type:</strong> ${formatServiceType(formData.service) || 'Not specified'}</p>
            <p><strong>Pickup Date:</strong> ${formData.date || 'Not specified'}</p>
            ${formData.notes ? `<p><strong>Special Instructions:</strong> ${formData.notes}</p>` : ''}
        `;
        
        // Store the submission in localStorage
        storeFormSubmission(formData);
    }
});

function formatServiceType(service) {
    const serviceNames = {
        'wash-fold': 'Wash & Fold',
        'dry-clean': 'Dry Cleaning',
        'press-only': 'Press Only',
        'delicates': 'Delicates'
    };
    return serviceNames[service] || service;
}

function storeFormSubmission(formData) {
    // Get existing submissions from localStorage or create empty array
    const submissions = JSON.parse(localStorage.getItem('pickupSubmissions') || '[]');
    
    // Add new submission with timestamp
    submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('pickupSubmissions', JSON.stringify(submissions));
    
    // For demo purposes, log the stored submissions
    console.log('Stored submissions:', submissions);
}