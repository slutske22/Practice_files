/**
 * Set of functions for initializing a webgl scene, AKA preprocessing steps
 */

/**
 * Util function for creating a shader
 * @param gl The WebGL rendering context
 * @param type The type of shader to create, either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @param source The GLSL source code for the shader as a string
 * @returns a WebGLShader
 */
export function createShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string
) {
	const shader = gl.createShader(type) as WebGLShader;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	// Log errors if there were any
	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

/**
 * Util function for creating a program and linking 2 shaders to it
 * @param gl The WebGL rendering context
 * @param vertShader The vertex shader to link in the program
 * @param fragShader The fragment shader to link in the program
 * @returns A WebGLProgram.  Returns undefined if there were errors in creating the program
 */
export function createProgram(
	gl: WebGLRenderingContext,
	vertShader: WebGLShader,
	fragShader: WebGLShader
): WebGLProgram | undefined {
	const program = gl.createProgram() as WebGLProgram;
	gl.attachShader(program, vertShader);
	gl.attachShader(program, fragShader);
	gl.linkProgram(program);

	const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	// Log errors if there were any
	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}
