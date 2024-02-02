// Initialize the map
var map = L.map("Map").setView([51.505, -0.09], 13);

// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Listen for the form submission event
document.querySelector("form").addEventListener("submit", function (e) {
  // Prevent the form from being submitted normally
  e.preventDefault();

  // Get the location entered by the user
  var location = document.getElementById("location").value;

  // Create a marker at the queried location
  var marker = L.marker([51.505, -0.09]).addTo(map);

  // Set the popup content to the queried location
  marker.bindPopup(location).openPopup();
});

// Ads NPS API
function fetchnps(endpoint) {
  console.log(endpoint);
  fetch(endpoint)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      buildParkConfig(data);
    });
}
fetchnps(
  "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&api_key=GkGycsar8rNnALB5eKpjaBJGHMelOhv4gmfO1OnM"
);

var parkConfig = {};

function buildParkConfig(parkData) {
  console.log(parkData.data[0]);
  for (i = 0; i < parkData.data.length; i++) {
    var name = parkData.data[i].name;
    var parkCode = parkData.data[i].parkCode;
    var lat = parkData.data[i].latitude;
    var lon = parkData.data[i].longitude;
    var details = parkData.data[i].description;

    parkConfig[name] = {
      parkCode,
      lat,
      lon,
      details,
    };
  }
}
console.log("parkconfig", parkConfig);
