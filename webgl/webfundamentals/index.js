// Following https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

const glsl = (x) => x.join('\n');

/* ----------------------------- Shader scripts ----------------------------- */

const vertex_shader = glsl`
  // An attribute will receive data from a buffer 
  attribute vec4 a_position;

  void main() {
    gl_Position = a_position;
  }
`;

const fragment_shader = glsl`
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
  }
`;

/* ----------------------------- Initialization code ----------------------------- */

// Run only once to set things up

var canvas = document.querySelector('#c');
const gl = canvas.getContext('webgl');

/**
 * Util function for creating a shader
 */
function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex_shader);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment_shader);

/**
 * Util function for creating a program and linking 2 shaders to it
 */
function createProgram(gl, vertShader, fragShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertShader);
	gl.attachShader(program, fragShader);
	gl.linkProgram(program);
	const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [0, 0, 0, 0.5, 0.7, 0];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

/* ----------------------------- Rendering code ----------------------------- */

// Run every time you want to render / draw

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32 bit floats
const normalize = false; // dont normalize the data
const stride = 0; //
const offset = 0;

gl.vertexAttribPointer(
	positionAttributeLocation,
	size,
	type,
	normalize,
	stride,
	offset
);

const primitiveType = gl.TRIANGLES;
const count = 3;

gl.drawArrays(primitiveType, offset, count);
