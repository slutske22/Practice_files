// Required by glsl parser
const glsl = (x: TemplateStringsArray) => x.join('');

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

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

gl.clearColor(0.75, 0.85, 0.8, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

/*
 * Create shaders
 */
const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fargmentShaderText);

gl.compileShader(vertexShader);
/**
 * Check for GLSL compile errors
 */
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	console.error(
		'ERROR compiling vertex shader!',
		gl.getShaderInfoLog(vertexShader)
	);
}

gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	console.error(
		'ERROR compiling fragment shader!',
		gl.getShaderInfoLog(fragmentShader)
	);
}

const program = gl.createProgram() as WebGLProgram;
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

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
