require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/TileLayer',
	'esri/layers/FeatureLayer',
	'esri/widgets/Swipe',
	'esri/widgets/Legend',
	'esri/core/watchUtils',
], function (Map, MapView, TileLayer, FeatureLayer, Swipe, Legend, watchUtils) {
	const blastImagery = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/WOCTeelWa8YfhXRF/arcgis/rest/services/Beirut_Port_05082020/MapServer',
	});

	const buildings = new FeatureLayer({
		url:
			'https://enterprise.spatialstudieslab.org/server/rest/services/Hosted/Beirut_Buildings_View/FeatureServer',
	});

	var map = new Map({
		basemap: 'ffff',
		layers: [buildings],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [35.51590370237112, 33.891530792835745],
		zoom: 14,
		map: map,
	});

	view.on('click', (e) => console.log(e.mapPoint));

	// const swipe = new Swipe({
	//    leadingLayers: [],
	//    trailingLayers: [blastImagery],
	//    view,
	//    position: 50,
	// });

	// view.ui.add(swipe);

	const legend = new Legend({
		view,
	});

	view.when(() => {
		watchUtils.when(legend, 'container', function () {
			if (legend.constructed) {
				console.log(legend);
				const rows = document.querySelectorAll('.esri-legend__layer-row');
				console.log('rows', rows);
			}

			const lastRow = rows[rows.length - 1];
			if (lastRow) {
				lastRow.style.display = 'none';
			}

			if (
				lastRow.querySelector('.esri-legend__layer-cell--info')
					.innerText === '<all other values>'
			) {
			}
		});
	});

	view.ui.add(legend, 'bottom-right');
});
