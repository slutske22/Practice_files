import * as renderers from './renderers.js';

require([
	'esri/Map',
	'esri/views/MapView',
	'esri/Basemap',
	'esri/layers/FeatureLayer',
], function (Map, MapView, Basemap, FeatureLayer) {
	const basemap = new Basemap({
		portalItem: {
			id: '228eaa6a4cd34528b443fb71178c8545',
		},
	});

	const animalCount = new FeatureLayer({
		url:
			'https://services6.arcgis.com/VqchQRhgtql2vsmO/arcgis/rest/services/Shelter_Animal_Count_2020_Comparison/FeatureServer',
		renderer: renderers.animalCountRenderer,
	});

	var map = new Map({
		basemap,
		layers: [animalCount],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [-100, 38],
		zoom: 2,
		map: map,
	});
});
