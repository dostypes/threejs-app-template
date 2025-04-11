import * as THREE from 'three'
import { EventEmitter } from 'events'
import Cube from './objects/interactive/Cube.js'
import InputHandler from './inputs/InputHandler.js'
import Lights from './objects/environment/Lights.js'
import { updateCameraAndRendererSize } from './utils/resize.js'

export default class ThreeManager extends EventEmitter {
  constructor() {
    super()
    this.scene = null
    this.camera = null
    this.renderer = null
    this.clock = new THREE.Clock()
    this.cube = null
    this.input = null
    this.lights = null
    console.log('[ThreeManager] Instance created.')
  }

  init() {
    console.log('[ThreeManager] Initializing 3D system...')

    this.initRenderer()
    this.initCamera()
    this.initScene()

    this.lights = new Lights(this.scene)
    this.lights.addLights()
    this.addCube()

    this.input = new InputHandler(this.camera, this.renderer.domElement)
    this.input.init()
    this.input.registerObject(this.cube)

    // Add new listener for input handler events if needed for emitting
    this.input.on('objectSelected', (object) => {
      console.log('[ThreeManager] Object selected:', object.name)
      // Emit an event for AppBrain if needed
      this.emit('objectSelected', object)
    })

    this.startLoop()
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(this.renderer.domElement)

    window.addEventListener('resize', () => {
      updateCameraAndRendererSize(this.camera, this.renderer)
    })
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.set(0, 1, 3)
  }

  initScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x111111)
  }

  addCube() {
    this.cube = new Cube()
    this.cube.name = 'InteractiveCube'
    this.scene.add(this.cube)
  }

  // --- Public Methods for AppBrain ---

  /**
   * Changes the color of the managed cube.
   * @param {number | string} color - The color value (e.g., 0xff0000 or '#ff0000').
   */
  changeColor(color) {
    if (this.cube && typeof this.cube.setColor === 'function') {
      console.log('[ThreeManager] Setting color to: ' + color)
      this.cube.setColor(color)
    } else {
      console.warn(
        '[ThreeManager] Cube not available or setColor method missing.'
      )
    }
  }

  /**
   * Toggles the visibility of the managed cube.
   */
  toggleCubeVisibility() {
    if (this.cube && typeof this.cube.toggleVisibility === 'function') {
      console.log('[ThreeManager] Toggling cube visibility.')
      this.cube.toggleVisibility()
    } else {
      console.warn(
        '[ThreeManager] Cube not available or toggleVisibility method missing.'
      )
    }
  }

  // --- Internal Loop and Update ---

  startLoop() {
    this.renderer.setAnimationLoop(() => {
      const delta = this.clock.getDelta()
      this.update(delta)
      this.renderer.render(this.scene, this.camera)
    })
  }

  update(delta) {
    if (this.cube && typeof this.cube.update === 'function') {
      this.cube.update(delta)
    }
    if (this.input && typeof this.input.update === 'function') {
      this.input.update(delta)
    }
  }

  destroy() {
    console.log('[ThreeManager] Destroying 3D system...')
    this.renderer.setAnimationLoop(null)
    // Dispose Three.js resources (geometry, materials, textures)
    this.input?.destroy() // Assuming InputHandler has a destroy method
    this.removeAllListeners()
    // Remove renderer canvas from DOM?
  }
}
