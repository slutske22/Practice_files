// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

import { getGlContext, setup } from '../utils';

import vert1 from './vert.vert';
import frag1 from './frag.frag';

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('canvas');
	const gl = getGlContext('canvas', { preserveDrawingBuffer: true });

	const { program } = setup(gl, vert1, frag1);

	gl.useProgram(program);

	// disable position attribute
	const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
	// gl.disableVertexAttribArray(positionAttributeLocation);

	// set the resolution
	const resolutionUniformLocation = gl.getUniformLocation(
		program,
		'u_resolution'
	);
	gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

	canvas.addEventListener('mousemove', (e) => {
		const br = canvas.getBoundingClientRect();
		const x = e.clientX - br.left;
		const y = br.height - (e.clientY - br.top);
		gl.vertexAttrib2f(positionAttributeLocation, x, y);
		gl.drawArrays(gl.POINTS, 0, 1);
	});
});
