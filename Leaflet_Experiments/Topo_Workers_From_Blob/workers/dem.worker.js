import demShadingURL from './dem.shading.js';

var blobURL = URL.createObjectURL(
	new Blob(
		[
			'(',

			`importScripts(${demShadingURL});`,

			function () {

				self.dems = {};

				onmessage = function (e) {
					if (e.data === 'clear') {
						self.dems = {};
						return;
					}

					if (e.data.raster) {
						const { data } = e.data.raster;
						self.dems[e.data.id] = raster2dem(data);
						self.shades = shading(self.dems[e.data.id]);
					}

					postMessage({
						id: e.data.id,
						message: 'from worker',
						ele: self.dems[e.data.id],
						shades: self.shades,
					});
				};
			}.toString(),

			')()',
		],
		{ type: 'application/javascript' }
	)
);

export default blobURL;
