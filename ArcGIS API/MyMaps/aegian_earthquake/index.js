import * as renderers from './renderers.js';

require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/FeatureLayer',
	'esri/renderers/Renderer',
], function (Map, MapView, FeatureLayer, Renderer) {
	const greeceBoundary = new FeatureLayer({
		url:
			'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/GRC_Boundaries_2019/FeatureServer/0',
	});

	const turkeyBoundary = new FeatureLayer({
		url:
			'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/TUR_Boundaries_2019/FeatureServer/0',
	});

	const shakeIntensity = new FeatureLayer({
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USGS_Seismic_Data_v1/FeatureServer/1',
		title: 'Recent Earthquakes - Shake Intensity',
		outFields: ['*'],
		renderer: renderers.secondAttempt,
	});

	const earthquakes = new FeatureLayer({
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/USGS_Seismic_Data_v1/FeatureServer/0',
		title: 'Recent Earthquakes - Events by Magnitude',
	});

	var map = new Map({
		basemap: 'terrain',
		layers: [shakeIntensity, earthquakes],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [26, 38.5],
		zoom: 7,
		map: map,
	});
});
