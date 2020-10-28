import workers, {
	rainbowURL,
	demShadingURL,
	slopeShadingURL,
	aspectShadingURL,
	slopeaspectShadingURL,
} from './workers/index.js';

// UTIL FUNCTIONS

var uniqueId = (function () {
	var lastId = 0;
	return function () {
		return ++lastId;
	};
})();

// -----------------------------------------------------------------------------
//
//                DEFINE TOPOLAYER AS EXTENSION OF A GRIDLAYER
//
// -----------------------------------------------------------------------------

export var TopoLayer = L.GridLayer.extend({
	// object to hold canvas contexts as they are created and updated
	_contexts: {},

	// array to recieve worker objects when they get created
	_workers: [],

	// add worker initialization to beforeAdd Method
	beforeAdd: function (map) {
		map._addZoomLimit(this);

		// object to hold canvas contexts as they are created and updated
		this._contexts = {};

		// array to recieve worker objects when they get created
		this._workers = [];

		// grab topotype from options
		const { topotype } = this.options;

		for (let i = 0; i < 16; i++) {
			var number = i < 9 ? `0${i + 1}` : i + 1;
			// this._workers[i] = new Worker(`worker.${topotype}.js`, {
			this._workers[i] = new Worker(workers[topotype], {
				name: `Worker ${topotype} ${number}`,
			});
			this._workers[i].onmessage = (e) => this.updateTile(e, this);
		}
	},

	// terminate all workers when layer is removed
	onRemove: function (map) {
		for (let i = 0; i < 16; i++) {
			this._workers[i].terminate();
		}
		this._removeAllTiles();
		L.DomUtil.remove(this._container);
		map._removeZoomLimit(this);
		this._container = null;
		this._tileZoom = undefined;
	},

	// createTile method required - creates a new tile of the gridlayer
	createTile: function (coords) {
		var tile = L.DomUtil.create('canvas', 'leaflet-tile');
		var size = this.getTileSize();
		tile.width = size.x;
		tile.height = size.y;

		var ctx = tile.getContext('2d');
		var demCtx;
		var id = uniqueId();

		this._contexts[id] = ctx;

		// define a new image element and its attributes
		var demImg = new Image();
		var { x, y, z } = coords;
		demImg.crossOrigin = '*';
		demImg.src = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}.pngraw?access_token=${mapboxAccessToken}`;
		demImg.onload = function () {
			var c = document.createElement('canvas');
			c.width = c.height = 256;
			demCtx = c.getContext('2d');
			demCtx.drawImage(demImg, 0, 0);
			redraw();
		};

		const redraw = () => {
			var data = { id: id };
			data.raster = demCtx.getImageData(0, 0, 256, 256);
			var workerIndex = (x + y) % this._workers.length;
			this._workers[workerIndex].postMessage(data);
		};

		return tile;
	},

	updateTile: function (e, instance) {
		var ctx = instance._contexts[e.data.id];
		var imgData = ctx.createImageData(256, 256);

		var shades = e.data.shades;
		imgData.data.set(shades);
		ctx.putImageData(imgData, 0, 0);
	},
});
