// Initialize the map
var map = L.map("Map").setView([44.967243, -103.771556], 6);

const parkIcon = L.icon({
  iconUrl: 'assets/images/NPicont.png',
  iconSize: [50, 50],
  iconAnchor: [22, 94],
  
});
// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

// Listen for the form submission event
document.querySelector("form").addEventListener("submit", function (e) {
  // Prevent the form from being submitted normally
  e.preventDefault();

  // Get the location entered by the user
  //var location = document.getElementById("location").value;

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

var filteredParkData = {};

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
    var img = filteredParkData[i].images[0].url;
    var state = filteredParkData[i].states;
    var weather = filteredParkData[i].weatherInfo;
  
    filteredParkData[name] = {
      parkCode,
      lat,
      lon,
      details,
      img,
      state,
      weather
    };

    var url =filteredParkData[i].url;
    console.log(img)

    var popupCont='<h6><a href=' + url + '>'+ name+ '</a></h6>'
    var marker = L.marker([lat, lon],{
      draggable:false,
     title: name,
     icon: parkIcon
    })
    .addTo(map).bindPopup('<h6><a href=' + url + '>'+ name+ '</a></h6>'+"<div> <img src="+img+" style='width:300px'></div>"  );
  }
  console.log(img)
}

function logParkConfig(filteredParkData) {
  for (var parkName in filteredParkData) {
    if (filteredParkData.hasOwnProperty(parkName)) {
      var parkDetails = filteredParkData[parkName];
      console.log("Park Name: " + parkName);
      console.log("Park Code: " + parkDetails.parkCode);
      console.log("Latitude: " + parkDetails.lat);
      console.log("Longitude: " + parkDetails.lon);
      console.log("Details: " + parkDetails.details);
    }
  }
}
// search the filteredparkdata array
//function search() {
  //var input = document.getElementById('location').value;
  //var results = document.getElementById('results');
  //var items = filteredParkData;
  
  //results.innerHTML = '';

  //items.forEach(function(item) {
    //if (items.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
      //var z = document.createElement('p1');
      //var y = document.createElement('p2')
      //p1.textContent = items.parkName;
      //p2.textContent = items.details + items.weather;
      //results.appendChild(p1);
      //results.appendChild(p2);
    //}
  //})
//}
// Call the function with the parkConfig object
logParkConfig(filteredParkData);


