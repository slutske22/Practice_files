/**
 * Based on offline example, this example sets up a map that moves
 * along a geojson path
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
 * An elevated polyline
 */
const flightpath = geojson2flightpath(LA2SF as Feature<LineString>, 100000);

const positions = flightpath.map((point) => {
	const [x, y, z] = point.coord;
	return viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(x, y, z),
		point: {
			pixelSize: 10,
			color: Cesium.Color.ORANGE,
		},
	});
});

let i = 0;

/**
 * Interval in seconds
 */
const INTERVAL = 1;

setInterval(() => {
	if (flightpath[i]) {
		// @ts-expect-error ignore me
		positions[i].point.color = Cesium.Color.BLUE;

		const [x, y, z] = flightpath[i].coord;

		viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(x, y, z + 1000),
			duration: INTERVAL,
			easingFunction: Cesium.EasingFunction.LINEAR_NONE,
			orientation: new Cesium.HeadingPitchRange(
				Cesium.Math.toRadians(flightpath[i].bearing),
				Cesium.Math.toRadians(-25),
				10000
			),
		});

		// viewer.flyTo(positions[i], {
		// 	duration: 1,
		// 	offset: new Cesium.HeadingPitchRange(
		// 		Cesium.Math.toRadians(flightpath[i].bearing),
		// 		Cesium.Math.toRadians(-30),
		// 		10000
		// 	),
		// });

		i++;
	}
}, INTERVAL * 1000);

// const polyline3d = new Cesium.Entity({
// 	polyline: {
// 		positions: Cesium.Cartesian3.fromDegreesArrayHeights(
// 			flightpath.map((point) => point.coord).flat()
// 		),
// 		width: 5,
// 		material: new Cesium.PolylineOutlineMaterialProperty({
// 			color: Cesium.Color.ORANGE.withAlpha(0.8),
// 		}),
// 	},
// });
// viewer.entities.add(polyline3d);
// viewer.zoomTo(polyline3d);
