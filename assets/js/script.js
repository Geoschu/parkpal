// Define a dictionary for state names to two-letter codes
const usStateAbbrevs = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
  };
  
  // Initialize the map
  var map = L.map("Map").setView([44.967243, -103.771556],   6);
  
  const parkIcon = L.icon({
    iconUrl: 'assets/images/NPicont.png',
    iconSize: [50, 50],
    iconAnchor: [22, 94],
    
  });
  // Add a tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom:   19,
  }).addTo(map);
  
  // Form submission event listener
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get the location entered by the user
    var location = document.getElementById("location").value.trim().toUpperCase();
  
    // Convert state name to two-letter code if applicable
    var locationKey = location in usStateAbbrevs ? usStateAbbrevs[location] : location;
  
    // Find the park in the parkConfig that matches the state
    var matchingParks = Object.keys(parkConfig).filter(function(parkName) {
      return parkConfig[parkName].details.toUpperCase().includes(locationKey);
    });
  
    // Clear existing markers
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  
    // Process each matching park
    matchingParks.forEach(function(parkName) {
      var parkDetails = parkConfig[parkName];
      var coords = [parkDetails.lat, parkDetails.lon];
  
      // Create a marker for each park and bind a popup with details
      var marker = L.marker(coords).addTo(map);
      marker.bindPopup("<b>" + parkDetails.name + "</b><br/>" + parkDetails.details);
  
      // Open the popup
      marker.openPopup();
  
      // Optionally, center the map on the park
      map.setView(coords,   10); // Adjust zoom level as needed
    });
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
    for (i =   0; i < filteredParkData.length; i++) {
      var name = filteredParkData[i].name;
      var parkCode = filteredParkData[i].parkCode;
      var lat = filteredParkData[i].latitude;
      var lon = filteredParkData[i].longitude;
      var details = filteredParkData[i].description;
      var img = filteredParkData[i].images[0].url;
      var state = filteredParkData[i].states;
      var weather = filteredParkData[i].weatherInfo;
  
      parkConfig[name] = {
        parkCode,
        lat,
        lon,
        details,
        img,
        state,
        weather,
      };

      var url =filteredParkData[i].url;
      console.log(img)

      var popupCont='<h6><a href=' + url + '>'+ name+ '</a></h6>'
      var marker = L.marker([lat, lon],{
      draggable:false,
      title: name,
      icon: parkIcon
    })
    .addTo(map).bindPopup('<h6><a href=' + url + '>'+ name+ '</a></h6>'+"<div> <img src="+img+" style='width:300px'></div>"+ "<div>details</div>" );
    }
    console.log(img)
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
  
  //```
  