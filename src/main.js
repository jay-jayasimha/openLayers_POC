//import './style-old.css';
//import './node_modules/ol/ol.css';
import {Map, View} from 'ol';
import Draw from 'ol/interaction/Draw.js';
import VectorTile from 'ol/source/VectorTile.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import WebGLTile from "ol/layer/WebGLTile";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileJSON from 'ol/source/TileJSON.js';
import {Vector as VectorSource} from 'ol/source.js';
import { PMTilesRasterSource } from "ol-pmtiles"; 
import { useGeographic } from 'ol/proj';
import {Vector as VectorLayer} from 'ol/layer.js';
import LayerGroup from 'ol/layer/Group.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';
import CircleStyle from 'ol/style/Circle.js';
import Attribution from 'ol/control/Attribution.js';
import {defaults} from 'ol/control/defaults';
import Overlay from 'ol/Overlay.js';
import {toStringHDMS} from 'ol/coordinate.js';
import {toLonLat} from 'ol/proj.js';

const myMap = new TileLayer ({
  source: new OSM({
             layer: 'stamen_toner_lite',
       })
});
const rasterLayer = new WebGLTile({
  source: new PMTilesRasterSource({
    url:"https://r2-public.protomaps.com/protomaps-sample-datasets/terrarium_z9.pmtiles",
    attributions:["https://github.com/tilezen/joerd/blob/master/docs/attribution.md"],
    tileSize: [512,512]
  })
});

const attributionControl = new Attribution ({
  collapsible: false
});

useGeographic();

const rasterTileJSON = new TileLayer({
  source: new TileJSON({
    url: 'https://api.maptiler.com/maps/backdrop/tiles.json?key=oHyqazvjL1B8aeyr2pNi',
    tileSize: 512,
    attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">Jay Experiments with Maptiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">Jay using OSM</a>'  
  }),
  visible: false,
  title: 'TileGrayScale'
});

const rasterOSM = new TileLayer({
  source: new OSM({
    attributions:'<a href="https://www.openstreetmap.org/copyright" target="_blank">Jay Experiments with OpenStreetMap</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">Jay using OSM</a>'  
  }),
  visible: true,
  title: 'OSMStandard'
});

const source = new VectorSource({wrapX: false});

const vector = new VectorLayer({
  source: source,
});

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const map = new Map({
  layers: [],
  target: 'map',
  view: new View({
    //center: [-11000000, 4600000],
    center: [8.4325862,49.1043102],
    zoom: 5,
  }),
  controls: defaults ({attribution: false}).extend ([attributionControl]),
  overlays: [overlay]
});

//Add OpenMapTiles map 
const osmVectorTile = new VectorTileLayer ({
  source: new VectorTile ({
    url:'https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=oHyqazvjL1B8aeyr2pNi',
    format: new MVT(),
    attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">Jay Experiments with Maptiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">Jay using OSM</a>'  
  }),
  visible: false,
  title: 'OSMVectorTile'
});

const baseLayerGroup = new LayerGroup ({
  layers: [rasterOSM, rasterTileJSON, osmVectorTile],
});

const vectorLayerGroup = new LayerGroup ({
  layers: [vector],
});

//Vector Data of Points in EU Countries
const germanyNuclearPlantsJSON = new VectorLayer ({
  source: new VectorSource ({
    url: '/Germany_Nuclear_Power_Plants.geojson',
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({
        color: 'rgba(255, 0, 0, 0.2)'
    }),
    stroke: new Stroke({
        color: '#343434',
        width: 2
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(255,0,0,0.82)'
        })
    })
  }),
  visible: false,
  title: 'NuclearPower'
});
// const styleJson = 'https://api.maptiler.com/maps/b9d896fc-e7d9-446b-bf0f-9c0957c38545/style.json?key=oHyqazvjL1B8aeyr2pNi';
// olms.apply(map, styleJson);
const germanyThermalPlantsJSON = new VectorLayer ({
  source: new VectorSource ({
    url: '/Germany_Thermal_Power_Plants.geojson',
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({
        color: 'rgba(0, 0, 255, 0.2)'
    }),
    stroke: new Stroke({
        color: '#343434',
        width: 2
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(0,0,255,0.82)'
        })
    })
  }),
  visible: false,
  title: 'ThermalPower'
});
const germanyHydroPlantsJSON = new VectorLayer ({
  source: new VectorSource ({
    url: '/Germany_Hydro_Power_Plants.geojson',
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({
        color: 'rgba(0, 255, 0, 0.2)'
    }),
    stroke: new Stroke({
        color: '#343434',
        width: 2
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(0,255,0,0.82)'
        })
    })
  }),
  visible: false,
  title: 'HydroPower'
});

const germanyWindPlantsJSON = new VectorLayer ({
  source: new VectorSource ({
    url: '/Germany_Wind_Power_Plants.geojson',
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({
        color: 'rgba(165, 42, 42, 0.2)'
    }),
    stroke: new Stroke({
        color: '#343434',
        width: 2
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(165,42,42,0.82)'
        })
    })
  }),
  visible: false,
  title: 'WindPower'
});

const germanyPhotoVoltaicPlantsJSON = new VectorLayer ({
  source: new VectorSource ({
    url: '/Germany_PhotoVoltaic_Power_Plants.geojson',
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({
        color: 'rgba(0, 0, 0, 0.2)'
    }),
    stroke: new Stroke({
        color: '#343434',
        width: 2
    }),
    image: new CircleStyle({
        radius: 5,
        fill: new Fill({
            color: 'rgba(0,0,0,0.82)'
        })
    })
  }),
  visible: false,
  title: 'SolarPower'
});

const PowerSourcesLayerGroup = new LayerGroup ({
  layers: [germanyNuclearPlantsJSON, 
            germanyThermalPlantsJSON, 
              germanyHydroPlantsJSON, 
                germanyWindPlantsJSON, 
                  germanyPhotoVoltaicPlantsJSON]
});

map.addLayer (baseLayerGroup);
map.addLayer (vectorLayerGroup);
map.addLayer (PowerSourcesLayerGroup);

//Layer Switch Logic
const baseMapElements = document.querySelectorAll('.sidebar > input[type=radio]')
for (let baseMapElement of baseMapElements){
  baseMapElement.addEventListener('change', function(){
    let baseMapElementValue = this.value;

    baseLayerGroup.getLayers().forEach(function(element, index, array){
      let baseLayerName = element.get('title');
      element.setVisible (baseLayerName === baseMapElementValue);
    });
  });
}

//Power Sources Switch Logic
const powerSourceElements = document.querySelectorAll('.sidebar > input[type=checkbox]');
for (let powerSourceElement of powerSourceElements) {
  powerSourceElement.addEventListener ('change', function (){
    let powerSourceElementValue = this.value;
    let powerSource;
    PowerSourcesLayerGroup.getLayers ().forEach (function (element, index, array) {
      if (powerSourceElementValue === element.get('title')) {
        powerSource = element;
      }
    })
    this.checked ? powerSource.setVisible (true) : powerSource.setVisible (false);
  });
}

map.on ('click', function (e){
  map.forEachFeatureAtPixel (e.pixel, function (feature, layer) {
    let clickedCoordinate = e.coordinate;
    let clickedPowerType = feature.get ('Type');
    if (clickedPowerType === undefined){
      clickedPowerType = "";
    }
    let clickedFeatureName = feature.get('Name');
    if (clickedFeatureName === undefined) {
      clickedFeatureName = 'Undefined Point/Geometry';
    }
    let clickedFeatureCapacity = feature.get('Capacity (MW)')
    if (clickedFeatureCapacity === undefined) {
      clickedFeatureCapacity = toStringHDMS(clickedCoordinate);
    } else {
      clickedFeatureCapacity = 'Capacity = ' + feature.get('Capacity (MW)') + ' MW';
    }
    overlay.setPosition (clickedCoordinate);
    content.innerHTML = clickedPowerType + "<br />" + clickedFeatureName + "<br />"  + clickedFeatureCapacity;
    //overlayFeatureCapacity.innerHTML = clickedFeatureCapacity;
  });
});

const typeSelect = document.getElementById('type');
let draw, lastPoint = new Array(); // global so we can remove it later
function addInteraction() {
  const value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value,
    });
    draw.on ("drawstart", function (e){
      //lastPoint = undefined;
    });
    if (value === "Point" || value === "LineString" || 
        value === "Circle" || value === "Polygon") {
      draw.on ("drawend", function (e) {
        lastPoint.push(e.feature);
      });
    }
    map.addInteraction(draw);
  }
}
/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

document.getElementById('undo').addEventListener('click', function () {
  if (lastPoint.length) {
    source.removeFeature (lastPoint[lastPoint.length - 1]);
    lastPoint.pop ();  
  } else {
    draw.removeLastPoint ();
  }
});

 addInteraction();