import * as renderers from './renderers.js';
import { popupTemplate } from './popupTemplate.js';

require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/layers/FeatureLayer',
], function (Map, MapView, FeatureLayer) {
	const trail = new FeatureLayer({
		url:
			'https://services.arcgis.com/6dxqrE38upDMg1va/arcgis/rest/services/AKiditarod2Trail/FeatureServer',
	});

	const checkpoints = new FeatureLayer({
		url:
			'https://services.arcgis.com/6dxqrE38upDMg1va/arcgis/rest/services/Captions/FeatureServer',
		popupEnabled: true,
		renderer: renderers.checkpointsRenderer,
		popupTemplate,
	});

	var map = new Map({
		basemap: 'topo-vector',
		layers: [trail, checkpoints],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [-157, 62],
		zoom: 6,
		map: map,
	});

	view.on('click', (e) => console.log(e.mapPoint));
});
