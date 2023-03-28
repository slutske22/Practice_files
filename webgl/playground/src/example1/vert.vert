attribute vec2 position;

vec4 smoother() {
  return vec4(0.1, 0.1, 0.1, 0.4);
}

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}