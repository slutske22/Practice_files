// Required by glsl parser
export const glsl = (x: TemplateStringsArray) => x.join('');

/**
 * Util function to get the webgl rendering context
 * @param canvasId The HTML id of the canvas element being used
 * @param options The options to pass to the `.getContext` call
 * @returns The WebGLRenderingContext
 */
export function getGlContext(
	canvasId: string = 'canvas',
	options?: WebGLContextAttributes
) {
	const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
	const gl = canvas.getContext('webgl', options) as WebGLRenderingContext;

	return gl;
}

/**
 * Util function to set up canvas and webgl context
 * @param vertexShaderText
 * @param fragmentShaderText
 */
export const setup = (
	gl: WebGLRenderingContext,
	vertexShaderText: string,
	fragmentShaderText: string
) => {
	gl.clearColor(0.75, 0.85, 0.8, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);

	/*
	 * Create shaders
	 */
	const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

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

	return { gl, program };
};
