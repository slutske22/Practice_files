import { lineString } from '@turf/helpers';
import bezier from '@turf/bezier-spline';
import { FeatureCollection, Polygon, LineString } from 'geojson';

/**
 * Number of interpolated points to break the geojson line/path into
 */
export const FRAMES = 30000;

/**
 * Util function to transform GeoJSON into a tronfyres-readable flight path.  Intakes
 * a GeoJSON FeatureCollection that contains a single Polygon or LineString, transforms
 * the line into a bezier spline for smoothness, and then interpolates points along
 * that spline.  Produces a hi res sampling of ship positions (and their bearings) along
 * the path initially set by the GeoJSON
 */
export const geojson2flightpath = (
	geojson: FeatureCollection<Polygon | LineString>
) => {
	/**
	 * First transform geojson into leaflet latlng array
	 */
	const latLngs = geojson.features[0].geometry.coordinates[0].map((coord) =>
		L.latLng(coord.reverse() as [number, number])
	);

	/**
	 * Smooth out the path using turf bezier spline
	 */
	const turfLineString = lineString(latLngs.map((c) => [c.lng, c.lat]));
	const spline = bezier(turfLineString, { resolution: 10000 });

	/**
	 * Resample and interpolate along polyline/polygon with n number of points
	 */
	const points: L.LatLng[] = [];
	for (let i = 0; i < FRAMES; i++) {
		const point = GeometryUtil.interpolateOnLine(
			map,
			spline.geometry.coordinates.map((c) => c.reverse() as [number, number]),
			i / FRAMES
		);

		if (point?.latLng && i % 2 === 0) {
			points.push(point.latLng);
		}
	}

	/**
	 * Get bearings at each point, from point n to point n+1
	 */
	const positions = points.map((point, i) => {
		const nextIndex = points[i + 1] ? i + 1 : 0;
		const bearing = GeometryUtil.bearing(point, points[nextIndex]);

		return {
			motion: {
				velocity_meters_per_second: 400,
				azimuth_degrees: 0,
				elevation_degrees: 0,
			},
			orientation: {
				heading_degrees: bearing,
				pitch_degrees: 0,
				yaw_degrees: 0,
				roll_degrees: 0,
			},
			position: {
				altitude_meters: 15000,
				latitude_degrees: point.lat,
				longitude_degrees: point.lng,
			},
		};
	});

	// Debug - draw interpolated points
	// positions.forEach((point, i) => {
	//   L.circleMarker(point, {
	//     color: i === 0 ? "red" : undefined,
	//   })
	//     .bindPopup(
	//       `Point number ${i} <br /> Angle to next: ${point.hdg.toFixed(2)}`
	//     )
	//     .addTo(map);
	// });

	return positions;
};
