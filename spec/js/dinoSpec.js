
describe("Dino", function() {

  beforeAll(function () {
    dino = new Dino
  })

  it("applyGravity adds 10 to y axis", function() {
    dino.applyGravity()
    expect(dino.y).toEqual(10)
  })

  it("jump increases spacecounter by 1 & sets jumpCounter to 30", function() {
    dino.jump()
    expect(dino.jumpCounter).toEqual(30)
    expect(dino.spaceCounter).toEqual(1)
  })

  it("resetJump resets spaceCounter after jump", function() { // rename?
    dino.jump()
    dino.resetJump()
    expect(dino.spaceCounter).toEqual(0)
  })
})