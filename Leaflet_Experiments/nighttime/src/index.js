import terminator from '@joergdietrich/leaflet.terminator';
import 'leaflet-boundary-canvas';
import './utils';

/****************************************
 *              MAP SETUP
 ***************************************/

// Define some maps options
var mapOptions = {
	center: [0, 0],
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
const nightmask = terminator().addTo(map);
const nightmaskJson = nightmask.toGeoJSON();

// Use nighttime geojson as boundary for a boundarycanvas:
const nightraster = L.TileLayer.boundaryCanvas(
	'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
	{
		boundary: nightmaskJson,
		trackAttribution: true,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	}
);

nightraster.addTo(map);

const updateMapTime = (time) => {
	nightmask.setTime(time);
	nightraster.options.boundary = nightmask.toGeoJSON();
	nightraster.redraw();
};

/****************************************
 *          TIME SLIDERS SETUP
 ***************************************/

// Grab dom nodes:
const daySlider = document.getElementById('day-slider');
const dayReadout = document.getElementById('day-readout');
const timeSlider = document.getElementById('time-slider');
const timeReadout = document.getElementById('time-readout');

// Get now date
const now = new Date();
const timeNow = now.getHours() * 60 + now.getMinutes();

// Set sliders to right now
timeSlider.value = timeNow;
timeReadout.innerHTML = now.toLocaleTimeString();

if (now.isLeapYear()) {
	daySlider.max = 366;
}
daySlider.value = now.getDOY();
dayReadout.innerHTML = now.toLocaleDateString();

// Listen to sliders events and adjust time object
var time = new Date(now.getTime());

timeSlider.addEventListener('input', (e) => {
	const { value } = e.target;
	time.setHours(value / 60);
	time.setMinutes(value % 60);
	updateMapTime(time.getTime());
	timeReadout.innerHTML = time.toLocaleTimeString();
});

daySlider.addEventListener('input', (e) => {
	const { value } = e.target;

	const timeWas = new Date(time.getTime());
	time = new Date(now.getFullYear(), 0);
	time.setDate(value);
	time.setHours(timeWas.getHours());
	time.setMinutes(timeWas.getMinutes());
	updateMapTime(time.getTime());
	dayReadout.innerHTML = time.toLocaleDateString();
});
