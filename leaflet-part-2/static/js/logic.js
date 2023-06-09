// Creating the map object
var myMap = L.map("map", {
  center: [40.7, -94.5],
  zoom: 5
});


// Adding the tile layer

let satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key={accessToken}', {
  attribution: 'Map data : &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  accessToken : apiKey
});

let outdoor = L.tileLayer('https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key={accessToken}', {
  attribution: 'Map data : &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  accessToken : apiKey
});

let greyscale = L.tileLayer('https://api.maptiler.com/maps/basic-v2-light/{z}/{x}/{y}.png?key={accessToken}', {
  attribution: 'Map data : &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  accessToken : apiKey
});


let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data : &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Store the API query variables.
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

basemap.addTo(myMap);

let tectonicPlates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let BaseMaps = {
 //"Global Map" : basemap,
 "satellite" : satellite,
 "outdoor" : outdoor,
 "greyscale" : greyscale
}

let overlays = {
  "Tectonic Plates" : tectonicPlates,
  "Earthquakes" : earthquakes
}

L.control.layers(BaseMaps, overlays, {
  collapsed: false
}).addTo(myMap);


function getColor(depth) {
if(depth > 90) {
  return "#ea2c2c"
}
else if (depth > 70) {
  return "#ea822c"
}
else if (depth > 50) {
  return "#ee9c00"
}
else if (depth > 30) {
  return "#eecc00"
}
else if (depth > 10) {
  return "#d4ee00"
}
else {
  return "#98ee00"
}
}

function getRadius(magnitude) {
if(magnitude === 0) {
  return 1
}
return magnitude * 4
}

d3.json(baseURL).then(function(response) {
  
  console.log(response);
//   L.geoJson(response).addTo(myMap);
  function styleInfo(feature) {
    return {
      opacity : 1,
      fillOpacity : 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    }
  }

  L.geoJson(response, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    }, 
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
        Magnitude: ${feature.properties.mag} <br>
        Depth: ${feature.geometry.coordinates[2]} <br>
        Location: ${feature.properties.place}
      `);      

    }
  }).addTo(earthquakes);

  earthquakes.addTo(myMap);

  let legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    let container = L.DomUtil.create("div", "info legend");
    let grades = ["-10-10", "10-30", "30-50", "50-70", "70-90", '90+'];
    let colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
    for (let i = 0; i < grades.length; i++) {
      container.innerHTML += `<i style="background: ${colors[i]}"></i> ${grades[i]} <br>`
    }
    return container;
  }

  legend.addTo(myMap);

  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {

      L.geoJson(plateData, {
          color: "orange",
          width: 3
      }).addTo(tectonicPlates);

      tectonicPlates.addTo(myMap);

  });
    
});
