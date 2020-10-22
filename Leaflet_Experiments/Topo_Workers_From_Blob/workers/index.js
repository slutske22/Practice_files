import rainbowURL from './rainbowvis.js';
import demShadingURL from './dem.shading.js';
import slopeShadingURL from './dem.shading.js';
import aspectShadingURL from './aspect.shading.js';
import slopeaspectShadingURL from './slopeaspect.shading.js';

import demWorkerURL from './dem.worker.js';
import slopeWorkerURL from './slope.worker.js';
import aspectWorkerURL from './aspect.worker.js';
import slopeaspectWorkerURL from './slopeaspect.worker.js';

export default {
	elevaition: demWorkerURL,
	slope: slopeWorkerURL,
	aspect: aspectWorkerURL,
	slopeaspect: slopeaspectWorkerURL,
};

export {
	rainbowURL,
	demShadingURL,
	slopeShadingURL,
	aspectShadingURL,
	slopeaspectShadingURL,
};
