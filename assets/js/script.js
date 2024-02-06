// Initialize the map
var map = L.map("Map").setView([44.967243, -103.771556], 6);

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
  "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=471&api_key=GkGycsar8rNnALB5eKpjaBJGHMelOhv4gmfO1OnM"
);

var parkConfig = {};

function buildParkConfig(parkData) {
  console.log(parkData)
  var filteredParkData = parkData.data.filter(park => park.designation === "National Park") 
  console.log(filteredParkData)
  for (i = 0; i < filteredParkData.length; i++) {
    var name = filteredParkData[i].name;
    var parkCode = filteredParkData[i].parkCode;
    var lat = filteredParkData[i].latitude;
    var lon = filteredParkData[i].longitude;
    var details = filteredParkData[i].description;

    parkConfig[name] = {
      parkCode,
      lat,
      lon,
      details,
    };
  }
}
console.log("parkconfig", parkConfig);

function logParkConfig(parkConfig) {
  for (var parkName in parkConfig) {
    if (parkConfig.hasOwnProperty(parkName)) {
      var parkDetails = parkConfig[parkName];
      console.log("Park Name: " + parkName);
      console.log("Park Code: " + parkDetails.parkCode);
      console.log("Latitude: " + parkDetails.lat);
      console.log("Longitude: " + parkDetails.lon);
      console.log("Details: " + parkDetails.details);
    }
  }
}

// Call the function with the parkConfig object
logParkConfig(parkConfig);


