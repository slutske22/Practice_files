import * as renderers from './renderers.js';
import slides from './slides/index.js';

require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/TileLayer',
	'esri/layers/ElevationLayer',
	'esri/widgets/LayerList',
	'esri/webscene/Slide',
], function (Map, SceneView, TileLayer, ElevationLayer, LayerList, Slide) {
	// great example:
	// esri item 56b890aa418f401e9819f26701766e30
	// "Exploring Mars"

	const lunar_true_color = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/WQ9KVmV6xGGMnCiQ/arcgis/rest/services/Moon_Basemap_Tile0to9/MapServer',
		maxScale: 0,
		listMode: 'hide',
	});

	const lunar_geology_2020 = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/FF3qnCUixr5w9JQi/arcgis/rest/services/Moon_Geology/MapServer',
		maxScale: 0,
	});

	const lunar_ground = new ElevationLayer({
		url:
			'https://tiles.arcgis.com/tiles/WQ9KVmV6xGGMnCiQ/arcgis/rest/services/Moon_Elevation_Surface/ImageServer',
	});

	var map = new Map({
		layers: [lunar_true_color, lunar_geology_2020],
	});

	map.ground.layers.add(lunar_ground);

	var view = new SceneView({
		container: 'viewDiv',
		camera: {
			position: {
				x: 7, // lon
				y: 0, // lat
				z: 6100000, // elevation in meters
			},
			tilt: 0,
			heading: 0,
		},
		map: map,
	});

	view.on('click', (e) => console.log(e.mapPoint));

	// click button to download screenshot of view and log a slide object // for testing only
	const button = document.getElementById('slide-button');

	button.addEventListener('click', () => {
		var options = {
			width: 200 * 1.6,
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

	const layerList = new LayerList({
		view,
	});

	view.ui.add(layerList, 'top-right');

	// // create slides and add them to the slides div
	// const slidesDiv = document.getElementById('slidesDiv');
	// slides.forEach((slide) => {
	// 	const slideDiv = document.createElement('div');
	// 	slideDiv.classList.add('slide');

	// 	const thumbnail = document.createElement('img');
	// 	thumbnail.src = slide.slide.thumbnail.url;

	// 	slideDiv.appendChild(thumbnail);
	// 	slidesDiv.appendChild(slideDiv);

	// 	slideDiv.addEventListener('click', () => {
	// 		view.goTo(slide.slide.viewpoint.camera);
	// 	});
	// });
});
