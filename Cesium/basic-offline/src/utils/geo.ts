import length from '@turf/length';
import along from '@turf/along';
import bearing from '@turf/bearing';
import { lineString } from '@turf/helpers';
import { Feature, LineString, Position } from 'geojson';

/**
 * Number of interpolated points to break the geojson line/path into
 */
export const FRAMES = 3000;

/**
 * Util function to transform GeoJSON into an interpolated flight path
 * @param geojson the geojson LineString path of the flight
 * @param elevation optional elevation (applies to whole path)
 */
export const geojson2flightpath = (
	geojson: Feature<LineString>,
	elevation?: number
) => {
	const line = lineString(geojson.geometry.coordinates);
	const distance = length(line);

	const interval = distance / FRAMES;

	const points: Position[] = [];
	const positions: { coord: Position; bearing: number }[] = [];

	for (let i = 0; i < FRAMES; i++) {
		const point = along(line, interval * i);
		points.push(point.geometry.coordinates);
	}

	for (let i = 0; i < FRAMES; i++) {
		const start = points[i];
		const end = points[i + 1];
		if (start && end) {
			const coord = start;
			if (elevation) coord.push(elevation);

			positions.push({
				coord: start,
				bearing: bearing(start, end),
			});
		}
	}

	return positions;
};
