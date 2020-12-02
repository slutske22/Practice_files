require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/FeatureLayer',
	'esri/layers/TileLayer',
	'esri/layers/ElevationLayer',
	'esri/layers/SceneLayer',
	'esri/webscene/Slide',
], function (
	Map,
	SceneView,
	FeatureLayer,
	TileLayer,
	ElevationLayer,
	SceneLayer,
	Slide
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
		maxScale: 0,
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
		layers: [mars_hypso, ...labels, mars_curiosity_track_ath],
	});

	map.ground.layers.add(mars_ground);

	var view = new SceneView({
		container: 'viewDiv',
		camera: {
			position: {
				x: -17, // lon
				y: 19, // lat
				z: 3000000, // elevation in meters
			},
			tilt: 33,
			heading: 217,
		},
		map: map,
	});

	view.on('click', (e) => {
		console.log('view', view);
		console.log('e', e);
	});

	mars_curiosity_track_ath
		.when(function () {
			return mars_curiosity_track_ath.queryExtent();
		})
		.then(function (response) {
			map.ground.layers.remove(mars_ground);
			view.goTo(response.extent);
		});

	// click button to download screenshot of view and log a slide object
	const button = document.getElementById('slide-button');

	button.addEventListener('click', () => {
		var options = {
			width: 200,
			height: 200,
		};

		view.takeScreenshot(options).then(function (screenshot) {
			var link = document.createElement('a');
			link.href = screenshot.dataUrl;
			link.download = 'slide.jpg';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});

		Slide.createFrom(view).then(function (slide) {
			console.log(slide);
		});
	});
});
