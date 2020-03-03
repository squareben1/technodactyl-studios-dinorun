
describe("Dino", function() {

  beforeEach(function () {
    dino = new Dino
  })

  it("applyGravity adds 10 to y axis", function() {
    dino.applyGravity()
    expect(dino.y).toEqual(110)
  })

  it("jump increases spacecounter by 1 & sets jumpCounter to 30", function() {
    dino.jump()
    expect(dino.jumpCounter).toEqual(30)
    expect(dino.spaceCounter).toEqual(1)
  })

  it("applyJump - if spaceCounter > 0 -jumpCounter from Y -1 from jumpCounter", function() {
    dino.jumpCounter = 10
    dino.applyJump()
    expect(dino.y).toEqual(90)
    expect(dino.jumpCounter).toEqual(9)
  })

  it("resetJump resets spaceCounter after jump", function() { // rename?
    dino.jump()
    dino.resetJump()
    expect(dino.spaceCounter).toEqual(0)
  })
})