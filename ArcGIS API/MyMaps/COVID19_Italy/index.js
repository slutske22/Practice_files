require([
	'esri/Map',
	'esri/views/MapView',
	'esri/geometry/Extent',
	'esri/layers/FeatureLayer',
	'esri/smartMapping/renderers/dotDensity',
	'esri/smartMapping/renderers/color',
	'esri/renderers/DotDensityRenderer',
], function (
	Map,
	MapView,
	Extent,
	FeatureLayer,
	dotDensityRendererCreator,
	colorRendererCreator,
	DotDensityRenderer
) {
	var map = new Map({
		basemap: 'dark-gray-vector',
	});

	var view = new MapView({
		container: 'viewDiv',
		// center: [12, 42],
		// zoom: 5,
		extent: new Extent({
			xmax: 2401060.315701193,
			xmin: 270607.4633373271,
			ymax: 5998729.274054984,
			ymin: 4323229.614044366,
			spatialReference: {
				wkid: 102100,
			},
		}),
		map: map,
	});

	view.on('click', (e) => console.log(view));

	var italyProvincialPopulation = new FeatureLayer({
		url:
			'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/COVID19_MAP_of_Italy_WFL1/FeatureServer/3',
		outFields: ['*'],
		renderer: new DotDensityRenderer({
			referenceDotValue: 1000,
			outline: null,
			// referenceScale: view.scale,
			legendOptions: {
				unit: 'people',
			},
			attributes: [
				{
					field: 'TotR',
					color: 'lightgrey',
					label: 'Population',
				},
			],
		}),
	});

	var covidLayer = new FeatureLayer({
		url:
			'https://services6.arcgis.com/swIsfiMN39u9wKrT/ArcGIS/rest/services/Italy_COVID19_WFL1/FeatureServer/1',
		outFields: ['*'],
	});

	map.add(italyProvincialPopulation);
	map.add(covidLayer);

	const params = {
		layer: covidLayer,
		view,
		attributes: [
			{
				field: 'Total_Cases',
				label: 'Cases',
			},
		],
	};

	dotDensityRendererCreator.createRenderer(params).then((result) => {
		covidLayer.renderer = result.renderer;
	});

	// const colorParams = {
	// 	layer: italyProvincialPopulation,
	// 	field: 'TotR',
	// 	view,
	// 	theme: 'high-to-low',
	// 	// outlineOptimizationEnabled: true,
	// };

	// colorRendererCreator
	// 	.createContinuousRenderer(colorParams)
	// 	.then(function (response) {
	// 		// set the renderer to the layer
	// 		italyProvincialPopulation.renderer = response.renderer;
	// 	});

	// const params2 = {
	// 	layer: italyProvincialPopulation,
	// 	view,
	// 	attributes: [
	// 		{
	// 			field: 'TotR',
	// 			label: 'Population',
	// 			color: 'white',
	// 		},
	// 	],
	// };

	// dotDensityRendererCreator.createRenderer(params2).then((result) => {
	// 	italyProvincialPopulation.renderer = result.renderer;
	// });
});
