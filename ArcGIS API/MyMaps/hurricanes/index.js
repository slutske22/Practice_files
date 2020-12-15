import * as renderers from './renderers.js';

require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/FeatureLayer',
	'esri/layers/TileLayer',
], function (Map, MapView, FeatureLayer, TileLayer) {
	var fireflyLayer = new TileLayer({
		url:
			'https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer',
	});

	var referenceLayer = new TileLayer({
		url:
			'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer',
	});

	const hurricanePositionsSwirls = new FeatureLayer({
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Recent_Hurricanes_v1/FeatureServer/0',
		renderer: renderers.blueSwirlRenderer,
		// minScale: 0,
		// maxScale: 26601363,
	});

	const hurricanePositionsDots = new FeatureLayer({
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Recent_Hurricanes_v1/FeatureServer/0',
		renderer: renderers.blueDotRenderer,
		// minScale: 32295367,
		// maxScale: 0,
		definitionExpression:
			'(INTENSITY = 5) OR (INTENSITY = 10) OR (INTENSITY = 15) OR (INTENSITY = 20) OR (INTENSITY = 25) OR (INTENSITY = 30) OR (INTENSITY = 35) OR (INTENSITY = 40) OR (INTENSITY = 45) OR (INTENSITY = 50) OR (INTENSITY = 55) OR (INTENSITY = 60)',
	});

	const hurricaneTracks = new FeatureLayer({
		// id: 'Hurricane_Recent_4466_1123_2461_5598_8316_2112',
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Recent_Hurricanes_v1/FeatureServer/1',
		opacity: 0.14,
		title: 'Light Trans Solid Track',
		renderer: renderers.solidBlueTrackRenderer,
	});

	const hurricaneBlueLines = new FeatureLayer({
		// id: 'Hurricane_Recent_4466_1123_2461_5598_3670',
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Recent_Hurricanes_v1/FeatureServer/1',
		title: 'Blue Hatched Track',
		opacity: 0.65,
		renderer: renderers.blueThatchRenderer,
	});

	var map = new Map({
		basemap: 'dark-gray-vector',
		layers: [
			hurricaneBlueLines,
			hurricaneTracks,
			hurricanePositionsSwirls,
			hurricanePositionsDots,
		],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [-100, 38],
		zoom: 2,
		map: map,
	});
});
