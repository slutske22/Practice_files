import { TopoLayer } from './topolayer.js';
import workers, {
	rainbowURL,
	demShadingURL,
	slopeShadingURL,
	aspectShadingURL,
	slopeaspectShadingURL,
} from './workers/index.js';

console.log(rainbowURL);
// http://www.liedman.net/tiled-maps/

// -----------------------------------------------------------------------------
//
//                INSTANTIATE A MAP
//
// -----------------------------------------------------------------------------

var mapOptions = {
	center: { lat: 42.93669471266819, lng: -122.13191986083986 },
	zoom: 12,
};

var mapboxAccessToken =
	'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA';

// CREATE MAP
var map = L.map('mapid', mapOptions);
window.map = map;

// ADDBASELAYER
var USGS_USImagery = L.tileLayer(
	'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
	{
		maxZoom: 20,
		attribution:
			'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
	}
).addTo(map);

// ADD COLORPICKER FOR TESTING PURPOSES
var MAPBOX_TERRAIN_RGB =
	'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=' +
	mapboxAccessToken;

// DEFINE AN INSTANCE OF A TOPOLAYER FOR EACH WORKER TYPE

var demLayer = new TopoLayer({ topotype: 'dem' });
window.demLayer = demLayer;

var slopeLayer = new TopoLayer({ topotype: 'slope' });
window.slopeLayer = slopeLayer;

var aspectLayer = new TopoLayer({ topotype: 'aspect' });
window.aspectLayer = aspectLayer;

var slopeaspectLayer = new TopoLayer({ topotype: 'slopeaspect' });
window.slopeaspectLayer = slopeaspectLayer;

// LAYER CONTROL TO SWITCH BETWEEN THEM

const layers = {
	'Mapbox Outdoors': USGS_USImagery,
	DEM: demLayer,
	Slope: slopeLayer,
	Apect: aspectLayer,
	'Aspect and Slope': slopeaspectLayer,
	'Raw RGB': L.tileLayer(MAPBOX_TERRAIN_RGB, {
		attribution:
			"© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a>" +
			" © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>" +
			" <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
	}),
};

L.control.layers(layers).addTo(map);
