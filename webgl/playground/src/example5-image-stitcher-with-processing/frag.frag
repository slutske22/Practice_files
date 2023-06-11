precision mediump float;

// our textures
uniform sampler2D u_image;
uniform vec2 u_textureSize;

// the texCoord passed from the vert shader
varying vec2 v_texCoord;

void main() {
  vec2 px = vec2(1.0, 1.0) / u_textureSize * 3.0; // average over 3rd pixel neighbors

	vec4 c = texture2D(u_image, v_texCoord);
  vec4 r = texture2D(u_image, v_texCoord + vec2(px.x, 0.0));
  vec4 l = texture2D(u_image, v_texCoord + vec2(-px.x, 0.0));
  vec4 t = texture2D(u_image, v_texCoord + vec2(0.0, px.y));
  vec4 b = texture2D(u_image, v_texCoord + vec2(0.0, -px.y));

  vec4 average = (r + l + b + t) / 4.0;

	gl_FragColor = average;
}
