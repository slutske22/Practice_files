import Mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

Mapbox.accessToken =
	'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Ym80dDAybHczdG8xaTB3aW4xMGsifQ.jCW4Xo_5khsO7VFWQz4YoQ';

const map = new Mapbox.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 3, // starting zoom
	projection: { name: 'globe' },
});

map.on('load', function () {
	map.resize();
});
