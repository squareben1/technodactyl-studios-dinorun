
describe("Dino", function() {
  it("applyGravity adds 10 to y axis", function() {
    dino = new Dino
    dino.applyGravity()
    expect(dino.y).toEqual(10)
  })
})