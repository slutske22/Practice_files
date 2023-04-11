precision mediump float;

// the texture
uniform sampler2D u_image;

// the texCoord passed from the vert shader
varying vec2 v_texCoord;

void main() {
	// look up the color from the texture
	gl_FragColor = texture2D(u_image, v_texCoord).rgba;
}
