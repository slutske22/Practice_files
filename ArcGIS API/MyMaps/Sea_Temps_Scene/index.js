require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/FeatureLayer',
	'esri/layers/TileLayer',
	'esri/layers/ImageryLayer',
], function (Map, SceneView, FeatureLayer, TileLayer, ImageryLayer) {
	const seaTemps = new ImageryLayer({
		url:
			'https://gis.ngdc.noaa.gov/arcgis/rest/services/PathfinderSST_monthly_averages/ImageServer',
	});

	var map = new Map({
		basemap: 'gray-vector',
		layers: [seaTemps],
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
			// tilt: 75
		},
	});
});
