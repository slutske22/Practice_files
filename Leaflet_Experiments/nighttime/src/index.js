import terminator from '@joergdietrich/leaflet.terminator';
import 'leaflet-boundary-canvas';

// Define some maps options
var mapOptions = {
	center: [20.27, -157],
	zoom: 2,
};

//Create a map and assign it to the map div
var map = L.map('leafletMapid', mapOptions);

//  Add a baselayer
var Stadia_AlidadeSmooth = L.tileLayer(
	'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
	{
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	}
);

Stadia_AlidadeSmooth.addTo(map);

// Create GeoJSON of nighttime based on leaflet.terminator:
const nightmask = terminator().toGeoJSON();

// Use nighttime mast geojson as boundary for a boundarycanvas:
const nightraster = L.TileLayer.boundaryCanvas(
	'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
	{
		boundary: nightmask,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	}
);

nightraster.addTo(map);
