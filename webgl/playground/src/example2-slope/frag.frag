precision mediump float;

// the texture
uniform sampler2D u_image;
uniform vec2 u_textureSize;

// the texCoord passed from the vert shader
varying vec2 v_texCoord;

float heightFunction(vec4 rgb) {
	float r = rgb[0];
	float g = rgb[1];
	float b = rgb[2];

	return r * 256.0 + g + b / 256.0 - 32768.0;
}

void main() {
	vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;

	vec4 c = texture2D(u_image, v_texCoord);
	vec4 r = texture2D(u_image, v_texCoord + vec2(onePixel.x, 0.0));
	vec4 l = texture2D(u_image, v_texCoord + vec2(-onePixel.x, 0.0));
	vec4 t = texture2D(u_image, v_texCoord + vec2(0, onePixel.y));
	vec4 b = texture2D(u_image, v_texCoord + vec2(0, -onePixel.y));

	float rHeight = heightFunction(r);
	float lHeight = heightFunction(l);
	float tHeight = heightFunction(t);
	float bHeight = heightFunction(b);

	float dx = lHeight - rHeight;
	float dy = tHeight - bHeight;

	float slope = (atan(sqrt(dx * dx + dy* dy)) * 180.0) / 3.14;
	float aspect = 90.0 - atan(dy, dx) / (180.0 / 3.14);

	float scaler = slope / 90.0;
	vec4 result = vec4(0, 0, 0, 1) * scaler;

	// Render each pixel as the average of its 4 neighbors
	// gl_FragColor = (r + l + t + b) / 4.0;

	gl_FragColor = result;
}
