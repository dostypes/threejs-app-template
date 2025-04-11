import { EventEmitter } from 'events'
import ToggleButton from './components/ToggleButton.js'

export default class UIManager extends EventEmitter {
  constructor() {
    super()
    this.toggleButton = null
    this.infoElement = null
    console.log('[UIManager] Instance created.')
  }

  init() {
    console.log('[UIManager] Initializing UI...')

    this.infoElement = document.querySelector('#info-text')
    if (!this.infoElement) {
      console.warn('[UIManager] Info text element (#info-text) not found.')
    }

    this.toggleButton = new ToggleButton('#toggle-cube')
    this.toggleButton.init()

    this.toggleButton.on('clicked', () => {
      console.log(
        '[UIManager] ToggleButton clicked, emitting uiAction:toggleCube'
      )
      this.emit('uiAction', 'toggleCube')
    })
  }

  // --- Public Methods for AppBrain ---

  /**
   * Updates the content of the info text element.
   * @param {string} text - The text to display.
   */
  changeInfoText(text) {
    if (this.infoElement) {
      console.log('[UIManager] Setting info text to: ' + text)
      this.infoElement.textContent = text
    } else {
      console.warn('[UIManager] Cannot set info text, element not found.')
    }
  }

  destroy() {
    console.log('[UIManager] Destroying...')
    this.toggleButton?.destroy()
    this.removeAllListeners()
  }
}
