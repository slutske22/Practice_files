import Mapbox from 'mapbox-gl';
import LA2SF from '../constants/LA2SF.json';
import { Feature, LineString } from 'geojson';
import { geojson2flightpath } from '../utils/geo';
import 'mapbox-gl/dist/mapbox-gl.css';

Mapbox.accessToken =
	'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Ym80dDAybHczdG8xaTB3aW4xMGsifQ.jCW4Xo_5khsO7VFWQz4YoQ';

const map = new Mapbox.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/light-v11', // style URL
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 3, // starting zoom
	projection: { name: 'globe' },
});

const positions = geojson2flightpath(LA2SF as Feature<LineString>);

map.on('load', function () {
	map.resize();

	map.setFog({
		color: 'white', // Lower atmosphere
		// @ts-expect-error
		'high-color': 'white', // Upper atmosphere
		'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
		'space-color': 'rgb(11, 11, 25)', // Background color
		'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
	});

	map.addSource('flightpath', {
		type: 'geojson',
		data: (LA2SF as Feature<LineString>).geometry,
	});
	map.addLayer({
		id: 'flightpath',
		type: 'line',
		source: 'flightpath',
		layout: {
			'line-join': 'round',
			'line-cap': 'round',
		},
		paint: {
			'line-color': 'orange',
			'line-width': 3,
			'line-blur': 2,
		},
	});

	let i = 0;

	setInterval(() => {
		const point = positions[i];

		// map.flyTo({
		// 	center: point.coord as [number, number],
		// 	bearing: point.bearing,
		// 	zoom: 12,
		// 	pitch: 70,
		// 	animate: true,
		// });

		map.easeTo({
			center: point.coord as [number, number],
			bearing: point.bearing,
			zoom: 12,
			pitch: 75,
			animate: true,
			duration: 1000,
			easing: (x) => x, // linear easing
		});

		i++;
	}, 1000);
});
