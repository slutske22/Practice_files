precision mediump float;

// our textures
uniform sampler2D u_image;
uniform vec2 u_textureSize;

// the texCoord passed from the vert shader
varying vec2 v_texCoord;
varying vec2 v_mouseCoord;

void main() {
  vec2 px = vec2(1.0, 1.0) / u_textureSize * 3.0; // average over 3rd pixel neighbors

	vec4 c = texture2D(u_image, v_texCoord);
  vec4 r = texture2D(u_image, v_texCoord + vec2(px.x, 0.0));
  vec4 l = texture2D(u_image, v_texCoord + vec2(-px.x, 0.0));
  vec4 t = texture2D(u_image, v_texCoord + vec2(0.0, px.y));
  vec4 b = texture2D(u_image, v_texCoord + vec2(0.0, -px.y));

  vec4 average = (r + l + b + t) / 4.0;

  vec4 white = vec4(1.0, 1.0 ,1.0, 1.0);

  float resolution = 512.0; // should be getting this as var from vertex shader

  if (gl_FragCoord.x / resolution < 50.0 / resolution) {
    gl_FragColor = white;
  } else {
	  gl_FragColor = c;
  }
}
