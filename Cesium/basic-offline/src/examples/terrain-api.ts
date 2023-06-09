// This is an example of using Cesium "Offline", meaning disconnected from the
// external Internet.  It must still be served from a local web server, but
// does not rely on any outside resources or services.  For more info, see:
// https://github.com/CesiumGS/cesium/wiki/Offline-Guide

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

Cesium.Ion.defaultAccessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjQ3MTBlOC1lYjkzLTQyNmUtYjc5Ni1jYjA3ODE4M2I2ZGIiLCJpZCI6MTQ1ODY4LCJpYXQiOjE2ODYzNDI3Mjl9.FyXYRjh0GRsjr6Mf7gAfckVzJtPfTmeZskJxv8y5C_0';

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
	terrainProvider: Cesium.createWorldTerrain(),
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

// @ts-expect-error leave me alone
window.viewer = viewer;

viewer.scene.globe.terrainExaggeration = 3.0;
viewer.scene.globe.shadows = 1;

viewer.scene.camera.setView({
	destination: new Cesium.Cartesian3(
		506841.0549865557,
		5712394.851673433,
		2867977.684333881
	),
	orientation: {
		pitch: -0.10921113010531754,
		heading: 5.358322238134448,
	},
});

const osm = new Cesium.OpenStreetMapImageryProvider({
	url: 'http://localhost:5000/world',
});

viewer.scene.imageryLayers.addImageryProvider(osm);
