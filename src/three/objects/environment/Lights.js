import * as THREE from 'three'

export default class Lights {
  constructor(scene) {
    this.scene = scene
  }

  addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffffff, 1)
    directional.position.set(2, 3, 4)
    this.scene.add(directional)
  }
}
