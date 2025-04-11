import { EventEmitter } from 'events'

export default class AIHandler extends EventEmitter {
  constructor() {
    super()
    this.interval = null
    console.log('[AIHandler] Instance created.')
  }

  init() {
    console.log('[AIHandler] Initializing simulated external events...')

    this.interval = setInterval(() => {
      const randomColor = this.getRandomColor()
      const payload = {
        color: randomColor,
        timestamp: Date.now(),
      }

      console.log('[AIHandler] Emitting "changeColor" event:', payload)
      this.emit('changeColor', payload)
    }, 5000)
  }

  getRandomColor() {
    const colors = [0xff0055, 0x00ffaa, 0xffaa00, 0x55aaff]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Method to simulate receiving other types of events if needed
  // simulateEvent(type, data) {
  //   console.log(`[AIHandler] Simulating event: ${type}`, data);
  //   this.emit(type, data);
  // }

  // Method to handle actual WebSocket connection if implemented later
  // connectWebSocket(url) {
  //   const ws = new WebSocket(url);
  //   ws.onmessage = (event) => {
  //     try {
  //       const message = JSON.parse(event.data);
  //       if (message.type && message.payload) {
  //         console.log('[AIHandler] Received WSS message:', message);
  //         this.emit(message.type, message.payload); // Emit based on WSS message type
  //       }
  //     } catch (error) {
  //       console.error('[AIHandler] Error processing WSS message:', error);
  //     }
  //   };
  //   ws.onerror = (error) => {
  //     console.error('[AIHandler] WebSocket error:', error);
  //   };
  //   ws.onclose = () => {
  //     console.log('[AIHandler] WebSocket connection closed.');
  //   };
  // }

  destroy() {
    console.log('[AIHandler] Stopping simulation interval.')
    clearInterval(this.interval)
    this.removeAllListeners()
  }
}
