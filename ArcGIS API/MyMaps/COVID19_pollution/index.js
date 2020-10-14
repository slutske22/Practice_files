require([
	'esri/Map',
	'esri/views/MapView',
	'esri/layers/TileLayer',
	'esri/widgets/Legend',
	'esri/widgets/Swipe',
	'esri/widgets/Expand',
	'esri/webmap/Bookmark',
	'esri/widgets/Bookmarks',
], function (
	Map,
	MapView,
	TileLayer,
	Legend,
	Swipe,
	Expand,
	Bookmark,
	Bookmarks
) {
	const NO2_Mean_March_2010_2019 = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/WSiUmUhlFx4CtMBB/arcgis/rest/services/No2_mean_march_514_WTL1/MapServer',
		blendMode: 'multiply',
		maxZoom: 20,
	});

	const NO2_March_2020 = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/WSiUmUhlFx4CtMBB/arcgis/rest/services/No2_2020_march_514_WTL1/MapServer',
		blendMode: 'multiply',
		legendEnabled: false,
		maxZoom: 20,
	});

	var map = new Map({
		basemap: 'topo-vector',
		layers: [NO2_March_2020, NO2_Mean_March_2010_2019],
	});

	var view = new MapView({
		container: 'viewDiv',
		extent: {
			spatialReference: {
			  wkid: 102100
			},
			xmax: 16132085.777604342,
			xmin: 10584592.012780864,
			ymax: 5529311.7286448255,
			ymin: 1997309.5256443399,
		},
		map: map,
	});

	var swipe = new Swipe({
		view: view,
		leadingLayers: [NO2_Mean_March_2010_2019],
		trailingLayers: [NO2_March_2020],
		position: 50,
	});

	view.ui.add(swipe);

	const legend = new Legend({
		view,
	});
	const legendExpand = new Expand({
		view: view,
		content: legend,
		expandIconClass: 'clipboard-icon'
	});
	view.ui.add(legendExpand, 'top-left');


	const bookmarks = new Bookmarks({
		view: view,
		bookmarks: [
		  new Bookmark({
			name: "East Easia",
			extent: {
			  spatialReference: {
				wkid: 102100
			  },
			  xmax: 15936406.985194348,
			  xmin: 10388913.22037087,
			  ymax: 5541052.12774907,
			  ymin: 2009049.924748584,
			}
		  }),
		  new Bookmark({
			name: "Europe",
			extent: {
			  spatialReference: {
				wkid: 102100
			  },
			  xmax: 4970567.279388702,
			  xmin: -2543498.3491552672,
			  ymax: 7778638.790517052,
			  ymin: 4246636.587516566,
			}
		  }),
		  new Bookmark({
			name: "Northeastern U.S.",
			extent: {
			  spatialReference: {
				wkid: 102100
			  },
			  xmax: -6222260.094336465,
			  xmin: -9979292.90860845,
			  ymax: 5686343.242956702,
			  ymin: 3920342.1414564587,
			}
		  })
		]
	  });

	  view.ui.add(bookmarks, {
		position: "top-right"
	  });

	view.on('click', (e) => console.log(view.extent, e.mapPoint));
});
