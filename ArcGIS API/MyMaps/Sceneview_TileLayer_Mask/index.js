import * as renderers from './renderers.js';

require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/FeatureLayer',
	'esri/layers/WebTileLayer',
], function (Map, SceneView, FeatureLayer, WebTileLayer) {
	var stamenTerrain = new WebTileLayer({
		urlTemplate:
			'https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain-background/{level}/{col}/{row}{r}.png',
		subDomains: ['a', 'b', 'c', 'd'],
	});

	var caBoundaries = new FeatureLayer({
		url:
			'https://egis.fire.ca.gov/arcgis/rest/services/FRAP/Counties/MapServer',
	});

	var smoke = new FeatureLayer({
		url:
			'https://services7.arcgis.com/WSiUmUhlFx4CtMBB/arcgis/rest/services/misr_plumes_20200831/FeatureServer',
	});

	const map = new Map({
		ground: 'world-elevation',
		layers: [stamenTerrain, caBoundaries, smoke],
	});

	const view = new SceneView({
		container: 'viewDiv',
		map: map,
		center: [-120, 37],
		zoom: 6,
		environment: {
			background: {
				type: 'color',
				color: [0, 0, 0, 0],
			},
			starsEnabled: false,
			atmosphereEnabled: false,
		},
	});

	view.on('click', (e) => console.log(e.mapPoint));
});
