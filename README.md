# leaflet-coding
Data visualization using leaflet

# leaflet-chellange
Visualizing data with Leaflet


## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

Here a way to visualize USGS data is developed that will allow us to better visualize earthquake data and understand on issues that our planet is facing. 



## Part 1: Creating the Earthquake Visualization

### Get the data

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and pick a data set to visualize.While  clicking on a data set, for example 'All Earthquakes from the Past 7 Days', a JSON representation of that data will be generated. Use the URL of this JSON to pull in the data for visualization.

Data Source: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

Data used: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

### Import and Visualize the data

* Create a map using Leaflet that plots all of the earthquakes from data set based on their longitude and latitude.

* Data markers reflects the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

* Includes popups that provide additional information about the earthquake when a marker is clicked.

* Create a legend that will provide context for your map data.

* Visualization looks something like the map below.

![map1](https://user-images.githubusercontent.com/120197958/230954595-cdef1fe5-dc78-4e30-9db0-d717c8128356.png)


## Part 2: Creating Visualization using Tectonic plates

This part includes plotting a second data set on map to illustrate the relationship between tectonic plates and seismic activity. Pull in a second data set and visualize it along side your original set of data.

Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.

Following are the steps..

* Plotting a second data set on the map.

* Adding a satellite map as well as separating out two different data sets into overlays that can be turned on and off independently.







