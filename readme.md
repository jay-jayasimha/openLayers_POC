# OpenLayers POC 

I am using OpenLayers basic packages to render visualizations.I am using the OpenLayers version 8.2 which is the latest version as of this date. 

The app demonstrates the following:

1. Use basic maps from OpenStreetMaps and MapTilers to be able to render visualizations using: 
    1. Views, 
    2. Layers/LayerGroups, 
    3. Targets 
    4. Overlays 
    5. Interactions and 
    6. various types of containers

2. The layers use 3 base layers which include: 
    1. Base Image Layer, 
    2. Base Tile Layer and
    3. Base Vector Layer

    Each of them have their own set of sources

3. The app uses publicly available data on the various power stations in Germany (type - Nuclear, Thermal, Hydro, Wind, Solar), the Latitude/Longitude information and some basic data on the stations.

This data is taken and converted into a geoJSON format that is necessary to populate the maps and provide the visualizations as seen in the app.

4. The app also (at the bottom) allows you to enter free hand geometries such as 1. LineStrings, 2. Circle, 3. Points, 4. Polygons and overlay them on the map.

5. The various types of power stations can be selected in the side bar and displayed as check boxes. The migration of data from the UI components to the logic components (React and JavaScript technologies) is demonstrated using the OpenLayers library as the framework.

OpenLayers is a free basic framework library that is extremely fast and offers a host of facilities to render truly informative and interactive maps based on the requirements of the application.

I have also played with the other frameworks - Mapbox, MapTiler, OpenStreetMaps, ArcGIS (ESRI) etc.


This example demonstrates how the `ol` package can be used with [Vite](https://vitejs.dev/).
