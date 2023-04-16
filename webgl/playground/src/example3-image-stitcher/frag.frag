precision mediump float;

// our textures
uniform sampler2D u_image0;
uniform sampler2D u_image1;
uniform sampler2D u_image2;
uniform sampler2D u_image3;
uniform vec2 u_textureSize;

// the texCoord passed from the vert shader
varying vec2 v_texCoord0;
varying vec2 v_texCoord1;
varying vec2 v_texCoord2;
varying vec2 v_texCoord3;

void main() {
	vec4 c = texture2D(u_image1, v_texCoord1);

	gl_FragColor = c;
}
