import { EventEmitter } from 'events'
import AIHandler from './AIHandler.js'

export default class ServicesManager extends EventEmitter {
  constructor() {
    super()
    this.aiHandler = null
    console.log('[ServicesManager] Instance created.')
  }

  init() {
    console.log('[ServicesManager] Initializing...')
    this.aiHandler = new AIHandler()
    this.aiHandler.init()

    this.addEventListeners()
  }

  addEventListeners() {
    this.aiHandler.on('changeColor', (params) => {
      console.log(
        '[ServicesManager] Received "changeColor" from AIHandler:',
        params
      )
      this.emit('servicesChange', 'changeColor', params)
    })

    // Add listeners for other events from AIHandler as needed
    // this.aiHandler.on('otherEvent', (params) => {
    //   console.log('[ServicesManager] Received "otherEvent" from AIHandler:', params)
    //   this.emit('servicesChange', 'otherEvent', params)
    // })
  }

  // Optional: Method to send data *to* the service if needed
  // sendData(type, payload) {
  //   console.log('[ServicesManager] Sending data:', type, payload)
  //   // This might involve calling a method on aiHandler if it manages the connection
  // }

  destroy() {
    console.log('[ServicesManager] Destroying...')
    if (this.aiHandler) {
      this.aiHandler.destroy()
    }
    this.removeAllListeners()
  }
}
