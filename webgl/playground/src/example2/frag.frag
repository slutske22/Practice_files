precision mediump float;

// the texture
uniform sampler2D u_image;

// the texCoord passed from the vert shader
varying vec2 v_texCoord;

void main() {

	vec4 color = texture2D(u_image, v_texCoord);

	// Modify the individual RGBA elements:
	// color[0] = 0.0;
	// color[1] = 0.0;

	// look up the color from the texture
	gl_FragColor = color;
}
