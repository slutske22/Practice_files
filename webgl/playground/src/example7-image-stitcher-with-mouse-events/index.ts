import { getGlContext, setup } from '../utils';
import vert1 from './vert.vert';
import frag1 from './frag.frag';
import topleft from './tiles/253-1798.png';
import topright from './tiles/252-1798.png';
import bottomleft from './tiles/253-1799.png';
import bottomright from './tiles/252-1799.png';

// Fills the buffer with the values that define a rectangle.

/*
 * ------------------------  IMAGE STITCHER ------------------------
 *
 * This section of the code takes a few RGB-DEM tiles, creates textures from them,
 * draws them to a framebufer, then draws the framebuffer to a new texture,
 * then to the canvas
 */

export function setRectangle(
	gl: WebGLRenderingContext,
	x: number,
	y: number,
	width: number,
	height: number,
	flip = false
) {
	const x1 = x,
		x2 = x + width,
		y1 = flip ? height - y : y,
		y2 = flip ? y : y + height;

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

// create a framebuffer and attach the texture
/**
 * > After we create the framebuffer we need to bind it to the FRAMEBUFFER bind point.
 * After that all functions related to framebuffers reference whatever framebuffer
 * is bound there.
 * https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html
 */
const fb = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

const targetTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, targetTexture);
gl.texImage2D(
	gl.TEXTURE_2D,
	0,
	gl.RGBA,
	512,
	512,
	0,
	gl.RGBA,
	gl.UNSIGNED_BYTE,
	null
);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

// attach the texture as the first color attachment
gl.framebufferTexture2D(
	gl.FRAMEBUFFER,
	gl.COLOR_ATTACHMENT0,
	gl.TEXTURE_2D,
	targetTexture,
	0
);

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

	// Tell it to use our program (pair of shaders)
	gl.useProgram(program);

	// For each tile image
	tiles.forEach((tile) => {
		const image = new Image();
		image.onload = () => render(image, tile);
		image.src = tile.path;
	});
}

/**
 * When the image loads, run the following code to bring into the gl context
 */
function render(tileImage: HTMLImageElement, tile: Tile) {
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

	// Turn on the position attribute
	gl.enableVertexAttribArray(positionLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

	// Turn on the texcoord attribute
	gl.enableVertexAttribArray(texcoordLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

	// set the resolution and size of image
	gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
	gl.uniform2f(textureSizeLocation, 256, 256);

	// Bind the framebuffer and draw to it
	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	// Unbind the frame buffer to draw to the canvas
	// Then bind the targetTexture as the texture to draw *from*, and
	// set its uniform size
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, targetTexture);
	gl.uniform2f(textureSizeLocation, 512, 512);

	// Bind back the position buffer to specify the full canvas to draw the targetTexture to
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	setRectangle(gl, 0, 0, gl.canvas.width, gl.canvas.height, true);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();

/*
 * ------------------------  MOUSE EVENTS ------------------------
 *
 * This section of the code simply captures the mouse position and sends it
 * to the webgl context
 */

const canvas = gl.canvas as HTMLCanvasElement;

canvas.addEventListener('mousemove', (e) => {
	const mouseCoordUniformLocation = gl.getUniformLocation(
		program,
		'u_mouseCoord'
	);

	const br = canvas.getBoundingClientRect();
	const x = e.clientX - br.left;
	const y = br.height - (e.clientY - br.top) - 10;

	const position = new Float32Array(2);

	position[0] = x;
	position[1] = y;

	gl.uniform2f(mouseCoordUniformLocation, x, y);
	gl.drawArrays(gl.POINTS, 0, 1);
});
