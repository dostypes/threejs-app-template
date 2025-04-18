function updateCameraAndRendererSize(camera, renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

export { updateCameraAndRendererSize }
