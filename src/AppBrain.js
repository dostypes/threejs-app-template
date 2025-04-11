import UIManager from './ui/UIManager.js'
import ServicesManager from './services/ServicesManager.js'
import ThreeManager from './three/ThreeManager.js'

export default class AppBrain {
  constructor() {
    this.ui = null
    this.services = null
    this.three = null
  }

  init() {
    console.log('[AppBrain] Initializing application...')

    this.ui = new UIManager()
    this.services = new ServicesManager()
    this.three = new ThreeManager()

    this.ui.init()
    this.services.init()
    this.three.init()

    this.addEventListeners()

    console.log('[AppBrain] Application initialized.')
  }

  addEventListeners() {
    this.services.on('servicesChange', (type, params) => {
      console.log('[AppBrain] Received servicesChange:', type, params)

      if (type === 'changeColor') {
        if (this.ui && typeof this.ui.changeInfoText === 'function') {
          this.ui.changeInfoText('Color changed to ' + params.color)
        } else {
          console.warn(
            '[AppBrain] UIManager or changeInfoText method not available.'
          )
        }

        if (this.three && typeof this.three.changeColor === 'function') {
          this.three.changeColor(params.color)
        } else {
          console.warn(
            '[AppBrain] ThreeManager or changeColor method not available.'
          )
        }
      }
    })

    this.ui.on('uiAction', (type, params) => {
      console.log('[AppBrain] Received uiAction:', type, params)

      if (type === 'toggleCube') {
        if (
          this.three &&
          typeof this.three.toggleCubeVisibility === 'function'
        ) {
          this.three.toggleCubeVisibility()
        } else {
          console.warn(
            '[AppBrain] ThreeManager or toggleCubeVisibility method not available.'
          )
        }
      }
    })

    this.three.on('objectSelected', (object) => {
      console.log('[AppBrain] Received objectSelected:', object.name)
      if (this.ui && typeof this.ui.changeInfoText === 'function') {
        this.ui.changeInfoText('Selected: ' + object.name)
      }
    })
  }
}
