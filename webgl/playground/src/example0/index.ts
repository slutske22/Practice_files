import { getGlContext, glsl, setup } from '../utils';

const vertexShaderText = glsl`
  precision mediump float;

  attribute vec2 vertPosition;
  attribute vec3 vertColor;

  varying vec3 fragColor;

  void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
  }
`;

const fargmentShaderText = glsl`
  precision mediump float;

  varying vec3 fragColor;

  void main() {
    gl_FragColor = vec4(fragColor, 1.0);
  }
`;

const gl = getGlContext('canvas');

const { program } = setup(gl, vertexShaderText, fargmentShaderText);

/**
 * Check for linker errors
 */
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	console.error('ERROR linking program!', gl.getProgramInfoLog(program));
}

gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
	console.error('ERROR validating program', gl.getProgramInfoLog(program));
}

/*
 * Create buffer
 */

const triangleVertices = [
	// X, Y          R, G, B
	0.0, 0.5, 1.0, 1.0, 0.0,
	//
	-0.5, -0.5, 0.7, 0.0, 1,
	//
	0.5, -0.5, 0.1, 1.0, 0.6,
];

const triangleVertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER,
	new Float32Array(triangleVertices),
	gl.STATIC_DRAW
);

const positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');
const colorAttributeLocation = gl.getAttribLocation(program, 'vertColor');

gl.vertexAttribPointer(
	positionAttributeLocation, // Attribute location
	2, // number of elements in each attribute
	gl.FLOAT, // type of elements
	false,
	5 * Float32Array.BYTES_PER_ELEMENT, // size of an indvidual vertext
	0 // offset of a single vertex to this attribute
);

gl.vertexAttribPointer(
	colorAttributeLocation, // Attribute location
	2, // number of elements in each attribute
	gl.FLOAT, // type of elements
	false,
	5 * Float32Array.BYTES_PER_ELEMENT, // size of an indvidual vertext
	2 * Float32Array.BYTES_PER_ELEMENT // size of an indvidual vertext
);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.enableVertexAttribArray(colorAttributeLocation);

/*
 * Main render loop
 */

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
