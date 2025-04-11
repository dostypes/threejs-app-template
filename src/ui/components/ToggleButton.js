import { EventEmitter } from 'events'

export default class ToggleButton extends EventEmitter {
  constructor(selector) {
    super()
    this.selector = selector
    this.button = null
  }

  init() {
    this.button = document.querySelector(this.selector)

    if (this.button) {
      this.clickHandler = this.handleClick.bind(this)
      this.button.addEventListener('click', this.clickHandler)
    } else {
      console.warn(`[ToggleButton] Element not found: ${this.selector}`)
    }
  }

  handleClick() {
    console.log('[ToggleButton] Clicked:', this.selector)
    this.emit('clicked')
  }

  destroy() {
    if (this.button && this.clickHandler) {
      this.button.removeEventListener('click', this.clickHandler)
    }
    this.removeAllListeners()
  }
}
