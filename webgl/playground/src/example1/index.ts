// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

import { getGlContext, setup } from '../utils';
import { createAndFillBufferObject } from '../utils/initializers';

import vert1 from './vert.vert';
import frag1 from './frag.frag';

const gl = getGlContext('canvas');

const { program } = setup(gl, vert1, frag1);

// Returns a random integer from 0 to range - 1.
function randomInt(range: number) {
	return Math.floor(Math.random() * range);
}

// Fills the buffer with the values that define a rectangle.
function setRectangle(
	gl: WebGLRenderingContext,
	x: number,
	y: number,
	width: number,
	height: number
) {
	const x1 = x,
		x2 = x + width,
		y1 = y,
		y2 = y + height;

	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
		gl.STATIC_DRAW
	);

	console.log(gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE));
	console.log(gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_USAGE));
}

createAndFillBufferObject(gl, new Float32Array([]));

gl.useProgram(program);

var positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
var resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
var colorUniformLocation = gl.getUniformLocation(program, 'u_color');

gl.enableVertexAttribArray(positionAttributeLocation);

var size = 2; // 2 components per iteration
var type = gl.FLOAT; // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(
	positionAttributeLocation,
	size,
	type,
	normalize,
	stride,
	offset
);

// set the resolution
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

// draw 50 random rectangles in random colors
for (let ii = 0; ii < 50; ii++) {
	setRectangle(
		gl,
		randomInt(300),
		randomInt(300),
		randomInt(300),
		randomInt(300)
	);

	gl.uniform4f(
		colorUniformLocation,
		Math.random(),
		Math.random(),
		Math.random(),
		1
	);

	gl.drawArrays(gl.TRIANGLES, 0, 6);
}
