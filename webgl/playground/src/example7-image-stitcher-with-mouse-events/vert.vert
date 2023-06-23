// An attribute will receive data from a buffer
attribute vec2 a_position;
attribute vec2 a_texCoord;
attribute vec2 a_mouseCoord;

uniform vec2 u_resolution;
varying vec2 v_texCoord;
varying vec2 v_mouseCoord;

void main() {
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = a_position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clip space)
  vec2 clipSpace = zeroToTwo - 1.0;

  // pass the texCoord and mouseCoord to the fragment shader
  // The GPU will interpolate this value between points
  v_texCoord = a_texCoord;
  v_mouseCoord = a_mouseCoord;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}