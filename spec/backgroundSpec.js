
describe("Background", function() {
  it("move should deduct 2.5 from x axis", function() {
    background = new Background
    background.move()
    expect(background.x).toEqual(-2.5)
  })
})