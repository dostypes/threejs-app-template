import * as THREE from 'three'
import { EventEmitter } from 'events'

export default class InputHandler extends EventEmitter {
  constructor(camera, canvas) {
    super()
    this.camera = camera
    this.canvas = canvas

    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    this.selectables = []
  }

  init() {
    this.canvas.addEventListener('pointerdown', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.raycaster.setFromCamera(this.pointer, this.camera)

      const intersects = this.raycaster.intersectObjects(this.selectables)

      if (intersects.length > 0) {
        const first = intersects[0].object
        this.emit('objectSelected', first)
      }
    })
  }

  registerObject(mesh) {
    this.selectables.push(mesh)
  }

  clear() {
    this.selectables = []
  }

  destroy() {
    // TODO: Implement proper removal of 'pointerdown' listener
    console.warn(
      '[InputHandler] Destroy method needs implementation for removing pointerdown listener.'
    )
    this.removeAllListeners()
  }
}
