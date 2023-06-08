// This is an example of using Cesium "Offline", meaning disconnected from the
// external Internet.  It must still be served from a local web server, but
// does not rely on any outside resources or services.  For more info, see:
// https://github.com/CesiumGS/cesium/wiki/Offline-Guide

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// @ts-expect-error required by cesium offline
window.CESIUM_BASE_URL = 'http://localhost:5000/Cesium';

const viewer = new Cesium.Viewer('cesiumContainer', {
	// @ts-expect-error because
	baseLayer: Cesium.ImageryLayer.fromProviderAsync(
		Cesium.TileMapServiceImageryProvider.fromUrl(
			Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
		)
	),
	baseLayerPicker: false,
	geocoder: false,
});
