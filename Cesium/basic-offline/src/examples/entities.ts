/**
 * Based on offline example, experimenting with some entities
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

const wyoming = new Cesium.Entity({
	polygon: {
		hierarchy: Cesium.Cartesian3.fromDegreesArray([
			-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
			-104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
			-107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
			-111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
		]),
		height: 50000, // base height, default 0
		extrudedHeight: 150000, // extrusion height above height
		material: Cesium.Color.ROYALBLUE.withAlpha(0.5),
	},
});

const redCone = new Cesium.Entity({
	name: 'Red cone',
	position: Cesium.Cartesian3.fromDegrees(-105.0, 40.0, 200000.0),
	cylinder: {
		length: 800000.0,
		topRadius: 200000,
		bottomRadius: 0,
		material: Cesium.Color.RED.withAlpha(0.5),
	},
	// @ts-expect-error wju
	orientation: Cesium.Transforms.headingPitchRollQuaternion(
		Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, 10),
		new Cesium.HeadingPitchRoll(
			Cesium.Math.toRadians(180),
			Cesium.Math.toRadians(90),
			Cesium.Math.toRadians(0)
		)
	),
});

viewer.entities.add(wyoming);
viewer.entities.add(redCone);

// zoomTo is a promise that can have a callback attached on completion
viewer.zoomTo(redCone).then(() => {
	// viewer.entities.remove(wyoming);
});

const point = new Cesium.Entity({
	position: Cesium.Cartesian3.fromDegrees(-109.080842, 45.002073),
	point: {
		pixelSize: 5,
		color: Cesium.Color.RED,
	},
});

viewer.entities.add(point);
