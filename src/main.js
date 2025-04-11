import AppBrain from './AppBrain.js'

window.addEventListener('DOMContentLoaded', () => {
  console.log('[Main] DOM fully loaded and parsed.')
  const appBrain = new AppBrain()
  appBrain.init()
  // Assign to window for debugging if needed
  // window.appBrain = appBrain
})
