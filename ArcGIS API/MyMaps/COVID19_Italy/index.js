require([
	'esri/Map',
	'esri/views/MapView',
	'esri/geometry/Extent',
	'esri/layers/FeatureLayer',
	'esri/smartMapping/renderers/dotDensity',
], function (Map, MapView, Extent, FeatureLayer, dotDensityRendererCreator) {
	const covidLayer = new FeatureLayer({
		url:
			// 'https://services2.arcgis.com/qpFFG6wHMKCXpc0N/arcgis/rest/services/Covid_province_pol_0326_WFL1/FeatureServer',
			'https://services8.arcgis.com/PM5xrJqaktNKMWdG/arcgis/rest/services/ITA_adm1_COVID19/FeatureServer',
		outFields: ['*'],
	});

	var map = new Map({
		basemap: 'dark-gray-vector',
		layers: [covidLayer],
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

	const params = {
		layer: covidLayer,
		view,
		attributes: [
			{
				field: 'COVID19',
				label: 'Cases',
			},
		],
	};

	dotDensityRendererCreator.createRenderer(params).then((result) => {
		covidLayer.renderer = result.renderer;
	});
});
