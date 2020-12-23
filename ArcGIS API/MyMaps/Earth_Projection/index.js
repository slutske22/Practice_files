require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/TileLayer',
	'esri/layers/FeatureLayer',
], function (Map, MapView, TileLayer, FeatureLayer) {
	const spatialReference = {
		wkt:
			'PROJCS["Equal Earth (world)_2",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Equal_Earth"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",11.0],UNIT["Meter",1.0]]',
		// wkid: '54035',
	};

	let centerPoint = {
		x: 0,
		y: 0,
		spatialReference,
	};

	const renderer = {
		type: 'simple',
		symbol: {
			type: 'simple-line', // autocasts as new SimpleLineSymbol()
			color: 'lightgrey',
			width: '1px',
		},
	};

	const basemap = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/EqualEarthBasemap/VectorTileServer',
		spatialReference,
	});

	const energy = new FeatureLayer({
		url:
			'https://services6.arcgis.com/VqchQRhgtql2vsmO/arcgis/rest/services/Renewable_Energy_Percent_of_Total_Final_Energy_Consumption_Country_Polygons/FeatureServer',
	});

	const graticules = [
		new FeatureLayer({
			url:
				'https://services.arcgis.com/nGt4QxSblgDfeJn9/arcgis/rest/services/Graticule/FeatureServer/8',
			renderer,
		}),
		new FeatureLayer({
			url:
				'https://services.arcgis.com/nGt4QxSblgDfeJn9/arcgis/rest/services/Graticule/FeatureServer/3',
			renderer,
		}),
	];

	var map = new Map({
		// basemap: 'gray-vector',
		spatialReference,
		layers: [basemap, ...graticules, energy],
	});

	view = new MapView({
		container: 'viewDiv',
		map,
		spatialReference,
		center: centerPoint,
		zoom: 1,
	});
});
