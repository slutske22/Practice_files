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

	const hurricanePositions = new FeatureLayer({
		url:
			'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Recent_Hurricanes_v1/FeatureServer',
	});

	var map = new Map({
		basemap: 'dark-gray-vector',
		layers: [hurricanePositions],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [-100, 38],
		zoom: 2,
		map: map,
	});
});
