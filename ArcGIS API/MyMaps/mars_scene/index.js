require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/FeatureLayer',
	'esri/layers/TileLayer',
	'esri/layers/ElevationLayer',
	'esri/layers/SceneLayer',
], function (
	Map,
	SceneView,
	FeatureLayer,
	TileLayer,
	ElevationLayer,
	SceneLayer
) {
	// great example:
	// esri item 56b890aa418f401e9819f26701766e30
	// "Exploring Mars"

	const mars_true_color = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/OKNnwEOcvx5lXPqr/arcgis/rest/services/Mars_Surface_WTL1/MapServer',
	});

	const mars_hypso = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/RS8mqPfEEjgYh6uG/arcgis/rest/services/Mars3Dhypso/MapServer',
	});

	const mars_ground = new ElevationLayer({
		url:
			'https://tiles.arcgis.com/tiles/RS8mqPfEEjgYh6uG/arcgis/rest/services/Mars3D_WEL/ImageServer',
	});

	const mars_rovers_track_path = new FeatureLayer({
		url:
			'https://services5.arcgis.com/AMh9EzyFGgthLT1q/arcgis/rest/services/track3_Merge/FeatureServer',
	});

	const mars_curiosity_track_ath = new FeatureLayer({
		url:
			'https://services5.arcgis.com/AMh9EzyFGgthLT1q/arcgis/rest/services/curiosity_track/FeatureServer',
	});

	// labels:
	const labelsLargeTerra = new SceneLayer({
		url:
			'https://services.arcgis.com/RS8mqPfEEjgYh6uG/arcgis/rest/services/Mars3DLargeTerra/SceneServer',
	});

	const labelsSmallTerra = new SceneLayer({
		url:
			'https://services.arcgis.com/RS8mqPfEEjgYh6uG/arcgis/rest/services/Mars3DSmallTerra/SceneServer',
	});

	const labelsExtent = new SceneLayer({
		url:
			'https://services.arcgis.com/RS8mqPfEEjgYh6uG/arcgis/rest/services/Mars3DExtentLabels/SceneServer',
	});

	const labels = [labelsExtent, labelsLargeTerra, labelsSmallTerra];

	var map = new Map({
		layers: [mars_hypso, ...labels],
	});

	map.ground.layers.add(mars_ground);

	var view = new SceneView({
		container: 'viewDiv',
		center: [-100, 38],
		zoom: 3,
		map: map,
	});
});
