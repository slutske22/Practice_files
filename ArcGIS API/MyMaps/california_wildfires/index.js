import { fireMarkerRenderer } from './renderers.js';

require([
	'esri/Map',
	'esri/core/Handles',
	'esri/views/MapView',
	'esri/views/2d/layers/BaseLayerView2D',
	'esri/layers/Layer',
	'esri/layers/FeatureLayer',
	'esri/layers/WebTileLayer',
	'esri/layers/support/TileInfo',
	'esri/geometry/projection',
	'esri/geometry/Polygon',
	'esri/core/watchUtils',
	'esri/widgets/Legend',
], function (
	Map,
	Handles,
	MapView,
	BaseLayerView2D,
	Layer,
	FeatureLayer,
	WebTileLayer,
	TileInfo,
	projection,
	Polygon,
	watchUtils,
	Legend
) {
	const MaskLayer = BaseLayerView2D.createSubclass({
		constructor: function () {
			this.tileContexts = new window.Map();
			this.watchHandles = new Handles();
			this.needsImageUpdate = false;
		},

		attach: function () {
			const projectionPromise = projection.load();
			const layerView = this;
			const layer = layerView.layer;

			this.watchHandles.add([
				watchUtils.init(this, 'layer.geometry', function () {
					if (!layer.geometry) {
						layerView.projectedGeometry = null;
						layerView.needsImageUpdate = true;
						layerView.requestRender();
						return;
					}

					projectionPromise.then(function () {
						layerView.projectedGeometry = projection.project(
							layer.geometry,
							layer.tileInfo.spatialReference,
							projection.getTransformation(
								layer.geometry.spatialReference,
								layer.tileInfo.spatialReference
							)
						);
						layerView.needsImageUpdate = true;
						layerView.requestRender();
					});
				}),

				watchUtils.init(this, 'layer.distance', function () {
					layerView.needsImageUpdate = true;
					layerView.requestRender();
				}),

				watchUtils.init(this, 'layer.color', function () {
					layerView.needsImageUpdate = true;
					layerView.requestRender();
				}),
			]);
		}, // attach

		drawGeometry: function (ctx, bounds) {
			ctx.globalCompositeOperation = 'source-over';
			const width = ctx.canvas.width;
			const height = ctx.canvas.height;

			if (!this.projectedGeometry) {
				ctx.clearRect(0, 0, width, height);
				return;
			}

			if (this.layer.distance === 0) {
				return;
			}

			const c = this.layer.color;
			ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3] || 0.75})`;
			ctx.fillRect(0, 0, width, height);

			const unmaskTerm = 3 / this.layer.distance;
			ctx.globalCompositeOperation = 'destination-out';

			if (
				this.projectedGeometry.type === 'polygon' ||
				this.projectedGeometry.type === 'polyline' ||
				this.projectedGeometry.type === 'extent'
			) {
				const rings =
					this.projectedGeometry.type === 'extent'
						? Polygon.fromExtent(this.projectedGeometry).rings
						: this.projectedGeometry.rings ||
						  this.projectedGeometry.paths;

				const transformed = rings.map(function (ring) {
					return ring.map(function (coords) {
						return [
							Math.round(
								(width * (coords[0] - bounds[0])) /
									(bounds[2] - bounds[0])
							),
							Math.round(
								height *
									(1 -
										(coords[1] - bounds[1]) / (bounds[3] - bounds[1]))
							),
						];
					});
				});

				ctx.lineJoin = 'round';

				for (let r = 1; r <= this.layer.distance; ++r) {
					ctx.strokeStyle = 'rgba(0, 0, 0, ' + unmaskTerm + ')';
					ctx.lineWidth = this.layer.distance + 1 - r;

					for (let i = 0; i < transformed.length; ++i) {
						const ring = transformed[i];

						ctx.beginPath();
						ctx.moveTo(ring[0][0], ring[0][1]);

						for (let j = 1; j < ring.length; ++j) {
							ctx.lineTo(ring[j][0], ring[j][1]);
						}

						this.projectedGeometry.type !== 'polyline' && ctx.closePath();
						ctx.stroke();
					}
				}

				if (this.projectedGeometry.type !== 'polyline') {
					ctx.fillStyle = 'rgba(0, 0, 0, 1)';

					for (let i = 0; i < transformed.length; ++i) {
						const ring = transformed[i];

						ctx.beginPath();
						ctx.moveTo(ring[0][0], ring[0][1]);

						for (let j = 1; j < ring.length; ++j) {
							ctx.lineTo(ring[j][0], ring[j][1]);
						}

						ctx.closePath();
						ctx.fill();
					}
				}
			} else if (
				this.projectedGeometry.type === 'point' ||
				this.projectedGeometry.type === 'multipoint'
			) {
				const points =
					this.projectedGeometry.type === 'multipoint'
						? this.projectedGeometry.points
						: [[this.projectedGeometry.x, this.projectedGeometry.y]];

				const transformed = points.map(function (coords) {
					return [
						Math.round(
							(width * (coords[0] - bounds[0])) / (bounds[2] - bounds[0])
						),
						Math.round(
							height *
								(1 - (coords[1] - bounds[1]) / (bounds[3] - bounds[1]))
						),
					];
				});

				for (let r = 1; r <= this.layer.distance; ++r) {
					const size = this.layer.distance + 1 - r;
					ctx.fillStyle = 'rgba(0, 0, 0, ' + unmaskTerm + ')';

					for (let i = 0; i < transformed.length; ++i) {
						const point = transformed[i];
						ctx.beginPath();
						ctx.arc(point[0], point[1], Math.round(size / 2), 0, 360);
						ctx.fill();
					}
				}
			}
		}, // drawGeometry

		manageTileImages: function () {
			const gl = this.context;

			const tileIdSet = new Set();

			for (let i = 0; i < this.tiles.length; ++i) {
				const tile = this.tiles[i];
				tileIdSet.add(tile.id);

				let ctx = this.tileContexts.get(tile.id);

				if (ctx) {
					if (this.needsImageUpdate) {
						this.drawGeometry(ctx, tile.bounds);
					}
				} else {
					const canvas = document.createElement('canvas');
					canvas.width = this.layer.tileInfo.size[0];
					canvas.height = this.layer.tileInfo.size[1];
					ctx = canvas.getContext('2d');
					this.tileContexts.set(tile.id, ctx);
					this.drawGeometry(ctx, tile.bounds);
				}
			}

			this.tileContexts.forEach(
				function (_, id) {
					if (!tileIdSet.has(id)) {
						this.tileContexts.delete(id);
					}
				}.bind(this)
			);

			this.needsImageUpdate = false;
		}, // manageTileImages

		render: function (renderParameters) {
			this.manageTileImages();

			const tileSize = this.layer.tileInfo.size[0];
			const state = renderParameters.state;
			const pixelRatio = state.pixelRatio;
			const width = state.size[0];
			const height = state.size[1];
			const context = renderParameters.context;
			const coords = [0, 0];

			context.clearRect(0, 0, width * pixelRatio, height * pixelRatio);

			// Apply rotation for everything that will be applied to the canvas.
			if (state.rotation !== 0) {
				context.translate(
					width * pixelRatio * 0.5,
					height * pixelRatio * 0.5
				);
				context.rotate((state.rotation * Math.PI) / 180);
				context.translate(
					-width * pixelRatio * 0.5,
					-height * pixelRatio * 0.5
				);
			}

			context.globalAlpha = this.layer.color[3];

			for (let i = 0; i < this.tiles.length; ++i) {
				const tile = this.tiles[i];
				const ctx = this.tileContexts.get(tile.id);

				const screenScale =
					(tile.resolution / state.resolution) * pixelRatio;
				state.toScreenNoRotation(coords, tile.coords);
				context.drawImage(
					ctx.canvas,
					coords[0],
					coords[1],
					tileSize * screenScale,
					tileSize * screenScale
				);
			}
		},

		detach: function () {
			this.watchHandles.removeAll();
		}, // render

		tilesChanged: function () {},
	}); // MaskLayer

	const CustomLayer = Layer.createSubclass({
		tileInfo: TileInfo.create({
			size: 512,
			spatialReference: { wkid: 3857 },
		}),

		constructor: function () {
			this.color = [0, 0, 0, 1];
			this.distance = 2;
		},

		createLayerView: function (view) {
			if (view.type === '2d') {
				return new MaskLayer({
					view: view,
					layer: this,
				});
			}
		},

		properties: {
			color: {},
			geometry: {},
			distance: {},
		},
	}); // CustomLayer

	const mask = new CustomLayer({
		color: [255, 255, 255, 1],
	});

	var stamenTerrain = new WebTileLayer({
		urlTemplate:
			'https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain-background/{level}/{col}/{row}{r}.png',
		subDomains: ['a', 'b', 'c', 'd'],
	});

	var caBoundaries = new FeatureLayer({
		url:
			'https://egis.fire.ca.gov/arcgis/rest/services/FRAP/Counties/MapServer',
	});

	var FIRMSfires = new FeatureLayer({
		url:
			'https://services7.arcgis.com/WSiUmUhlFx4CtMBB/arcgis/rest/services/FIRMS_Active_Fire_Points_for_the_California_Fires_2020/FeatureServer',
		renderer: fireMarkerRenderer,
	});

	const map = new Map({
		basemap: 'satellite',
		layers: [stamenTerrain, caBoundaries, FIRMSfires, mask],
	});

	const view = new MapView({
		container: 'viewDiv',
		map: map,
		center: [-120, 37],
		zoom: 6,
	});

	view.on('click', (e) => console.log(e.mapPoint));

	const states = new FeatureLayer({
		url:
			'https://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/US_StateBoundaries/FeatureServer/0',
	});

	const query = states.createQuery();
	query.where = "NAME = 'California'";
	states.queryFeatures(query).then(function (result) {
		const geometry = result.features[0].geometry;
		console.log('geometry', geometry);
		mask.geometry = geometry;
		view.goTo(geometry).catch(function (error) {
			if (error.name != 'AbortError') {
				console.error(error);
			}
		});
	});

	var legend = new Legend({
		view: view,
		layerInfos: [
			{
				layer: FIRMSfires,
			},
		],
	});

	view.ui.add(legend, 'bottom-left');
});
