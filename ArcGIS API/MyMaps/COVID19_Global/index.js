require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/FeatureLayer',
	'esri/layers/TileLayer',
	'esri/widgets/TimeSlider',
	'esri/smartMapping/renderers/heatmap',
], function (
	Map,
	MapView,
	FeatureLayer,
	TileLayer,
	TimeSlider,
	heatmapRendererCreator
) {
	var fireflyLayer = new TileLayer({
		url:
			'https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer',
	});

	var referenceLayer = new TileLayer({
		url:
			'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer',
	});

	var covidLayer = new FeatureLayer({
		url:
			'https://services8.arcgis.com/bc1qjUYAgNrEBXVh/arcgis/rest/services/COVID19_Time_Series_Combined/FeatureServer',
		outFields: ['*'],
		renderer: {
			type: 'heatmap',
			field: 'Confirmed',
			colorStops: [
				{ ratio: 0, color: 'rgba(255, 255, 255, 0)' },
				{ ratio: 0.06, color: 'rgba(255, 255, 255, 1)' },
				{ ratio: 0.15, color: 'rgba(255, 255, 0, 1)' },
				{ ratio: 0.25, color: 'rgba(255, 140, 0, 1)' },
				{ ratio: 0.55, color: 'rgba(255, 0, 0, 1)' },
			],
			minPixelIntensity: 1,
			maxPixelIntensity: 150000000,
			blurRadius: 12,
		},
	});

	// define map and view
	var map = new Map({
		layers: [fireflyLayer, covidLayer, referenceLayer],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [20, 0],
		zoom: 2,
		map: map,
		highlightOptions: {
			fillOpacity: 0,
			color: [50, 50, 50],
		},
	});

	var timeSlider = new TimeSlider({
		container: 'timeSliderDiv',
		view: view,
		mode: 'time-window',
		fullTimeExtent: {
			start: new Date(2020, 1, 1),
			end: new Date(2020, 11, 1),
		},
		playRate: 3000,
		stops: {
			interval: {
				value: 1,
				unit: 'months',
			},
		},
		tickConfigs: [
			{
				mode: 'count',
				values:
					new Date(2020, 11, 31) > new Date()
						? new Date().getMonth() + 1
						: 12,
				labelsVisible: true,
				labelFormatFunction: (value) => {
					const date = new Date(value);
					return date.toLocaleString('default', { month: 'short' });
				},
			},
		],
	});
	updateDefintionExpression(timeSlider.timeExtent);

	view.ui.add(timeSlider, 'bottom-right');

	timeSlider.watch('timeExtent', function (value) {
		updateDefintionExpression(value);

		// const params = {
		//    layer: covidLayer,
		//    view,
		//    field: "Confirmed",
		//    fadeToTransparent: true,
		//    minRatio: 0.05
		// }

		// heatmapRendererCreator.createRenderer(params)
		// .then(result => {
		//    covidLayer.renderer = result.renderer
		//    console.log(result.renderer)
		// })
	});

	function updateDefintionExpression(timeExtent) {
		const start = toDateString(timeExtent.start);
		const end = toDateString(timeExtent.end);
		covidLayer.definitionExpression = `Date >= DATE '${start}' AND Date <= DATE '${end}'`;
	}

	function toDateString(date) {
		const y = `${date.getUTCFullYear()}`;
		const m = `${date.getUTCMonth()}`.padStart(2, '0');
		const d = `${date.getUTCDate()}`.padStart(2, '0');
		const h = `${date.getUTCHours()}`.padStart(2, '0');
		const mm = `${date.getUTCMinutes()}`.padStart(2, '0');
		const s = `${date.getUTCSeconds()}`.padStart(2, '0');
		return `${y}-${m}-${d} ${h}:${mm}:${s}`;
	}

	// const params = {
	//    layer: covidLayer,
	//    view,
	//    field: "Confirmed",
	//    fadeToTransparent: true,
	//    minRatio: 0.05
	// }

	// heatmapRendererCreator.createRenderer(params)
	// .then(result => {
	//    covidLayer.renderer = result.renderer
	//    console.log(result.renderer)
	// })
});
