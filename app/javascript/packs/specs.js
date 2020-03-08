// Load application code

require("packs/game/background")
require("packs/game/ground")
require("packs/game/block")
require("packs/game/dino")
require("packs/game/score")
require("packs/game/renderGame")


// load the specs
let specsContext = require.context('../spec', true, /\.js(\.erb)?$/)
for(let key of specsContext.keys()) { specsContext(key) }