describe("Block", function() {
  canvasDouble = {
    width: 1280,
    height: 720
  }
  imageDouble = {}

  it("move - takes 5 from x", function() {
    block = new Block(canvasDouble, imageDouble)
    block.move()
    expect(block.x).toEqual(1275)
  })
})