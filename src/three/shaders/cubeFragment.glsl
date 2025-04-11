uniform vec3 uColor;

varying vec2 vUv;

void main() {
  vec3 color = uColor;

  // Oscurecer ligeramente con un gradiente vertical
  color *= 0.8 + 0.2 * vUv.y;

  gl_FragColor = vec4(color, 1.0);
}
