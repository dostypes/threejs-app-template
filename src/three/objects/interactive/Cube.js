import * as THREE from 'three'
import vertexShader from '../../shaders/cubeVertex.glsl'
import fragmentShader from '../../shaders/cubeFragment.glsl'

export default class Cube extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const uniforms = {
      uColor: { value: new THREE.Color(0xff0000) },
      uTime: { value: 0 },
    }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    super(geometry, material)

    this.uniforms = uniforms
  }

  toggleVisibility() {
    this.visible = !this.visible
  }

  setColor(hexColor) {
    this.uniforms.uColor.value.set(hexColor)
  }

  update(delta) {
    this.uniforms.uTime.value += delta
    this.rotation.y += delta * 0.5
  }
}
