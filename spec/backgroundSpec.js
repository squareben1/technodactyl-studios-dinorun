
describe("Background", function() {
  canvasDouble = {
    width: 1280
  }

  it("should have y attribute of 0", function() {
    background = new Background(canvasDouble)
    expect(background.y).toEqual(0)
  })

  it("move should deduct 2.5 from x axis", function() {
    background = new Background(canvasDouble)
    background.move()
    expect(background.x).toEqual(-2.5)
  })

  it("reset should reset x axis to canvas.width", function() {
    background = new Background(canvasDouble)
    background.move()
    background.reset()
    expect(background.x).toEqual(canvasDouble.width)
  })
  
})