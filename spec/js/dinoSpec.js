
describe("Dino", function() {

  beforeAll(function () {
    dino = new Dino
  })

  it("applyGravity adds 10 to y axis", function() {
    dino.applyGravity()
    expect(dino.y).toEqual(10)
  })

  it("jump increases spacecounter by 1 & jumpCounter by 30", function() {
    dino.jump()
    expect(dino.jumpCounter).toEqual(30)
    expect(dino.spaceCounter).toEqual(1)
  })

  // it("resetJump resets spaceCounter", function() { // rename?

  // })
})