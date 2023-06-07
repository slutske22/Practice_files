precision mediump float;

// our textures
uniform sampler2D u_image;

// the texCoord passed from the vert shader
varying vec2 v_texCoord;

void main() {
	vec4 c = texture2D(u_image, v_texCoord);

	gl_FragColor = c;
}
