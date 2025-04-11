uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Ondulación simple
  pos.y += sin(pos.x * 4.0 + uTime * 2.0) * 0.05;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
