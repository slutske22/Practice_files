import { createAndFillBufferObject } from '../../utils/initializers';

const Triangle = function (vertices) {
	this.vertices = vertices;
};

const SimpleModel = function (name: string) {
	this.name = name;
	this.triangles = [];
};

const CreatePyramid = function () {
	const vertices = [
		[0.0, -0.25, -0.5],
		[0.0, 0.25, 0.0],
		[0.5, -0.25, 0.25],
		[-0.5, -0.25, 0.25],
	];

	const triangle1 = new Triangle([vertices[2], vertices[1], vertices[3]]);
	const triangle2 = new Triangle([vertices[3], vertices[1], vertices[0]]);
	const triangle3 = new Triangle([vertices[0], vertices[1], vertices[2]]);
	const triangle4 = new Triangle([vertices[0], vertices[2], vertices[3]]);

	var model = new SimpleModel('simple');
	model.triangles = [triangle1, triangle2, triangle3, triangle4];

	return model;
};

const SimpleModelRender = function (
	gl: WebGL2RenderingContext,
	program: WebGLProgram,
	model,
	model_color
) {
	var numberTriangles = 0;
	var triangleVertexBufferId;

	// Shader variable locations
	var a_Vertex_location;
	var u_Color_location;
	var u_Transform_location;

	var edgeColor = new Float32Array([0.0, 0.0, 0.0, 1.0]); // Black edge

	/**
	 * Using the model data, build a 1D array for the Buffer Object
	 * @private
	 */
	function _buildBufferModelObjectData() {
		var j, k, m, nv, numberVertices, triangle, vertex, vertices3;

		if (model.triangles.length > 0) {
			numberTriangles = model.triangles.length;
			numberVertices = numberTriangles * 3;
			vertices3 = new Float32Array(numberVertices * 3);

			nv = 0;

			for (j = 0; j < model.triangles.length; j++) {
				triangle = model.triangles[j];

				for (k = 0; m < 3; m++, nv++) {
					vertices3[nv] = vertex[m];
				}
			}

			triangleVertexBufferId = createAndFillBufferObject(gl, vertices3);
		}

		vertices3 = undefined;
	}

	/**
	 * Get the location of the shader variables in the shader program.
	 * @private
	 */
	function _getLocationOfShaderVariables() {
		a_Vertex_location = gl.getUniformLocation(program, 'a_Vertex');
		u_Color_location = gl.getUniformLocation(program, 'u_Color');
		u_Transform_location = gl.getUniformLocation(program, 'u_Transform');
	}

	// These one-time tasks set up the rendering of the models.
	_buildBufferModelObjectData();
	_getLocationOfShaderVariables();

	function render() {
		var j, start;
	}
};
