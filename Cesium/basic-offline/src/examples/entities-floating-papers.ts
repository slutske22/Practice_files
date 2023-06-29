/**
 * Based on offline example, experimenting with some entities
 */

import * as Cesium from 'cesium';
import { geojson2flightpath } from '../utils/geo';
import LA2SF from '../constants/LA2SF.json';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { Feature, LineString } from 'geojson';

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

/**
 * Al elevated square
 */
const wyoming = new Cesium.Entity({
	polygon: {
		hierarchy: Cesium.Cartesian3.fromDegreesArray([
			-109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
			-104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
			-107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
			-111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
		]),
		height: 50000, // base height, default 0
		// extrudedHeight: 150000, // extrusion height above height
		material: Cesium.Color.ROYALBLUE.withAlpha(0.5),
	},
});

const w2 = new Cesium.Entity();
w2.merge(wyoming);
// @ts-expect-error sdajkh
w2.polygon.height = 100000;

const w3 = new Cesium.Entity();
w3.merge(wyoming);
// @ts-expect-error sdajkh
w3.polygon.height = 150000;

viewer.entities.add(wyoming);
viewer.entities.add(w2);
viewer.entities.add(w3);

// zoomTo is a promise that can have a callback attached on completion
viewer.zoomTo(wyoming).then(() => {
	// viewer.entities.remove(wyoming);
});
