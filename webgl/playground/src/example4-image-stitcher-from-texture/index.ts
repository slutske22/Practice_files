import { getGlContext, setup } from '../utils';
import vert1 from './vert.vert';
import frag1 from './frag.frag';
import topleft from './tiles/253-1798.png';
import topright from './tiles/252-1798.png';
import bottomleft from './tiles/253-1799.png';
import bottomright from './tiles/252-1799.png';

// Fills the buffer with the values that define a rectangle.
export function setRectangle(
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
		// prettier-ignore
		new Float32Array([
      x1, y1, 
      x2, y1, 
      x1, y2, 
      x1, y2, 
      x2, y1, 
      x2, y2]),
		gl.STATIC_DRAW
	);
}

const gl = getGlContext(undefined, { preserveDrawingBuffer: true });
const { program } = setup(gl, vert1, frag1);

interface Tile {
	path: string;
	position: { x: number; y: number };
}

function main() {
	const tiles: Tile[] = [
		{
			path: topleft,
			position: { x: 0, y: 0 },
		},
		{
			path: topright,
			position: { x: 256, y: 0 },
		},
		{
			path: bottomleft,
			position: { x: 0, y: 256 },
		},
		{
			path: bottomright,
			position: { x: 256, y: 256 },
		},
	];

	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	canvas.height = 256 * 2;
	canvas.width = 256 * 2;

	// For each tile image
	tiles.forEach((tile, i) => {
		const image = new Image();
		image.onload = () => render(image, i, tile);
		image.src = tile.path;
	});
}

/**
 * When the image loads, run the following code to bring into the gl context
 */
function render(tileImage: HTMLImageElement, i: number, tile: Tile) {
	// look up where the vertex data needs to go.
	var positionLocation = gl.getAttribLocation(program, 'a_position');
	var texcoordLocation = gl.getAttribLocation(program, 'a_texCoord');

	// Create a buffer to put three 2d clip space points in
	var positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	// Set a rectangle the same size as the image.
	setRectangle(
		gl,
		tile.position.x,
		tile.position.y,
		tileImage.width,
		tileImage.height
	);

	// provide texture coordinates for the rectangle.
	var texcoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

	gl.bufferData(
		gl.ARRAY_BUFFER,
		// prettier-ignore
		new Float32Array([
			0.0, 0.0,
	    1.0, 0.0,
	    0.0, 1.0,
	    0.0, 1.0,
	    1.0, 0.0,
	    1.0, 1.0,
		]),
		gl.STATIC_DRAW
	);

	// Create a texture and bing it to the gl context
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Set the parameters so we can render any size image.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	// Upload the tile image to the texture
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		tileImage
	);

	// lookup uniforms
	var resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
	var textureSizeLocation = gl.getUniformLocation(program, 'u_textureSize');

	// Tell WebGL how to convert from clip space to pixels
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// Tell it to use our program (pair of shaders)
	gl.useProgram(program);

	// Turn on the position attribute
	gl.enableVertexAttribArray(positionLocation);

	// Bind the position buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	var size = 2; // 2 components per iteration
	var type = gl.FLOAT; // the data is 32bit floats
	var normalize = false; // don't normalize the data
	var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	var offset = 0; // start at the beginning of the buffer
	// prettier-ignore
	gl.vertexAttribPointer(
      positionLocation, size, type, normalize, stride, offset);

	// Turn on the texcoord attribute
	gl.enableVertexAttribArray(texcoordLocation);

	// bind the texcoord buffer.
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

	// Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
	var size = 2; // 2 components per iteration
	var type = gl.FLOAT; // the data is 32bit floats
	var normalize = false; // don't normalize the data
	var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	var offset = 0; // start at the beginning of the buffer
	// prettier-ignore
	gl.vertexAttribPointer(
       texcoordLocation, size, type, normalize, stride, offset);

	// set the resolution
	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
	// set the size of the image
	gl.uniform2f(textureSizeLocation, 256, 256);

	// Draw the rectangle.
	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 6;
	gl.drawArrays(primitiveType, offset, count);
}

main();
