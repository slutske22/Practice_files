const renderer = {
	symbol: {
		angle: 0,
		contentType: 'image/png',
		height: 18.75,
		width: 18.75,
		type: 'picture-marker',
		url: 'https://static.arcgis.com/images/Symbols/Firefly/FireflyC20.png',
		xoffset: 0,
		yoffset: 0,
	},
	type: 'simple',
};

require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/FeatureLayer',
	'esri/widgets/TimeSlider',
], function (Map, MapView, FeatureLayer, TimeSlider) {
	// from https://developers.arcgis.com/javascript/latest/sample-code/animation-layer-visibility/index.html
	function fadeVisibilityOn(layer) {
		let animating = true;
		let opacity = 0;
		layer.opacity = opacity;

		requestAnimationFrame(incrementOpacityByFrame);

		// This function will fire on every frame before the browser repaints.
		function incrementOpacityByFrame() {
			if (opacity >= 1 && animating) {
				animating = false;
				return;
			}

			opacity += 0.05;
			layer.opacity = opacity;

			requestAnimationFrame(incrementOpacityByFrame);
		}
	}

	const torchRelay = new FeatureLayer({
		url:
			'https://services6.arcgis.com/VqchQRhgtql2vsmO/arcgis/rest/services/Tokyo_Olympics_Torch_Relay_Schedule_2021/FeatureServer',
		// @ts-ignore
		renderer,
		outFields: ['*'],
	});

	var map = new Map({
		basemap: 'dark-gray-vector',
		layers: [torchRelay],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [138, 36],
		zoom: 4,
		map: map,
	});

	let layerView;
	let flFromResults;
	view.whenLayerView(torchRelay).then((lv) => {
		torchRelay.queryFeatures().then(function (results) {
			console.log('results before filter', results);
			// create a new feature layer for each feature in the original layer
			flFromResults = results.features.map((feature) => {
				const layer = new FeatureLayer({
					objectIdField: 'OBJECTID',
					source: [feature],
					fields: results.fields,
					popupTemplate: feature.popupTemplate,
					opacity: 0,
					// @ts-ignore
					renderer,
				});

				map.add(layer);

				// layer.on('layerview-create', () => {
				// 	fadeVisibilityOn(layer);
				// });

				return {
					time: feature.attributes.Time,
					onmap: false,
					shouldBeAdded: false,
					layer,
				};
			});
		});

		layerView = lv;
		layerView.filter = {
			where: `Time <= 'nope'`,
		};
	});

	// set up time slider
	var timeSlider = new TimeSlider({
		container: 'timeSlider',
		playRate: 250,
		mode: 'cumulative-from-start',
		loop: false,
		fullTimeExtent: {
			start: new Date(2021, 2, 24),
			end: new Date(2021, 6, 25),
		},
		stops: {
			// @ts-ignore
			interval: {
				value: 1,
				unit: 'days',
			},
		},
		tickConfigs: [
			{
				mode: 'count',
				values: 5,
				labelsVisible: true,
				labelFormatFunction: (value) => {
					const date = new Date(value);
					return date.toLocaleString('default', { month: 'short' });
				},
			},
		],
	});

	view.ui.add(timeSlider, 'bottom-right');

	// update layer view filter to reflect current timeExtent, all protests in layer up to timeExtend
	timeSlider.watch('timeExtent', function (value) {
		const dateString = value.end.getTime();

		flFromResults.forEach((p) => {
			if (p.time <= dateString) {
				p.shouldBeAdded = true;
			} else {
				p.shouldBeAdded = false;
			}

			if (!p.onmap && p.shouldBeAdded) {
				// map.add(p.layer);
				fadeVisibilityOn(p.layer);
				p.onmap = true;
			}

			if (p.onmap && !p.shouldBeAdded) {
				// map.remove(p.layer);
				p.layer.opacity = 0;
				p.onmap = false;
			}
		});

		// layerView.filter = {
		// 	where: `Time <= '${dateString}'`,
		// };
	});

	window.map = map;
	window.view = view;
});
