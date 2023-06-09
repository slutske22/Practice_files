/**
 * Based on offline example, this example sets up a map that moves
 * along a geojson path
 */

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// @ts-expect-error required by cesium offline
window.CESIUM_BASE_URL = 'http://localhost:5000/Cesium';

const viewer = new Cesium.Viewer('cesiumContainer', {
	// @ts-expect-error because ts is wrong here?
	baseLayer: Cesium.ImageryLayer.fromProviderAsync(
		// Need to set this to avoid cesium using the default service
		// which requires their api
		Cesium.TileMapServiceImageryProvider.fromUrl(
			Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
		)
	),
	baseLayerPicker: false,
	geocoder: false,
	timeline: false,
	homeButton: false,
	vrButton: false,
	navigationHelpButton: false,
	fullscreenButton: false,
	sceneModePicker: false,
	animation: false,
});

viewer.scene.imageryLayers.addImageryProvider(
	new Cesium.OpenStreetMapImageryProvider({
		url: 'http://localhost:5000/world',
	})
);
