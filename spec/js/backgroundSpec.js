
describe("Background", function() {
  canvasDouble = {
    width: 1280
  }
  imageDouble = {}

  it("should have y attribute of 0", function() {
    background = new Background(canvasDouble, imageDouble)
    expect(background.y).toEqual(0)
  })

  it("move should deduct 2.5 from x axis", function() {
    background = new Background(canvasDouble, imageDouble)
    background.move()
    expect(background.x).toEqual(-2.5)
  })

  it("reset should reset x axis to canvas.width", function() {
    background = new Background(canvasDouble, imageDouble)
    background.move()
    background.reset()
    expect(background.x).toEqual(canvasDouble.width)
  })

  it("has background image as attribute", function() {
    background = new Background(canvasDouble, imageDouble)
    expect(background.image).toEqual(imageDouble)
  })
  
})