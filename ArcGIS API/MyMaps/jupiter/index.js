require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/MapImageLayer',
], function (Map, SceneView, MapImageLayer) {
	const jupiter = new MapImageLayer({
		url:
			'http://arcgis1.storymaps.esri.com/arcgis/rest/services/SolarSystem/Jupiter/MapServer',
	});

	var map = new Map({
		basemap: 'topo-vector',
		layers: [jupiter],
	});

	var view = new SceneView({
		container: 'viewDiv',
		map: map,
		camera: {
			position: {
				x: -118.808,
				y: 33.961,
				z: 20000000, // meters
			},
			// tilt: 75,
		},
	});
});
