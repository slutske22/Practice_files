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
	});

	const NO2_March_2020 = new TileLayer({
		url:
			'https://tiles.arcgis.com/tiles/WSiUmUhlFx4CtMBB/arcgis/rest/services/No2_2020_march_514_WTL1/MapServer',
		blendMode: 'multiply',
		legendEnabled: false,
	});

	var map = new Map({
		basemap: 'topo-vector',
		layers: [NO2_March_2020, NO2_Mean_March_2010_2019],
	});

	var view = new MapView({
		container: 'viewDiv',
		center: [120, 32],
		zoom: 4,
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

	view.ui.add(legend, 'bottom-left');

	const europeBookmark = new Bookmark({
		name: 'Europe',
		extent: {
			xmax: 2743356.7939192792,
			xmin: -1718119.673028702,
			ymax: 8307988.7993809655,
			ymin: 4956989.47935972,
		},
	});

	const bookmarksWidget = new Bookmark({
		bookmarks: [europeBookmark],
		view,
	});

	const bookmarksExpand = new Expand({
		view: view,
		content: bookmarksWidget,
	});
	view.ui.add(bookmarksExpand, 'top-right');

	view.on('click', (e) => console.log(view.extent, e.mapPoint));
});
