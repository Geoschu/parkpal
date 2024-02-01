// Initialize the map
var map = L.map('Map').setView([51.505, -0.09], 13);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Listen for the form submission event
document.querySelector('form').addEventListener('submit', function(e) {
    // Prevent the form from being submitted normally
    e.preventDefault();
    
    // Get the location entered by the user
    var location = document.getElementById('location').value;
    
    // Create a marker at the queried location
    var marker = L.marker([51.505, -0.09]).addTo(map);

    // Set the popup content to the queried location
    marker.bindPopup(location).openPopup();
});
