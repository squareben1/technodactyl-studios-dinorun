function generateCanvas() {
  var canvasContainer = document.querySelector('#canvas_container')
  var canvasHeight = window.innerHeight
  var canvasWidth = window.innerWidth
  var maxWidth = Math.floor((canvasHeight/9)*20)
  canvasWidth = Math.min(canvasWidth, maxWidth)
  var maxHeight = Math.floor((canvasWidth/4)*3)
  canvasHeight = Math.min(canvasHeight, maxHeight) 
  canvasContainer.innerHTML = `<canvas id='canvas' width='${canvasWidth}' height='${canvasHeight}'></canvas>`
  console.log(canvasContainer)
}

export { generateCanvas }