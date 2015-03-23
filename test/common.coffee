chai            = require "chai"
global.expect   = chai.expect

path = require "path"
global.$src     = (module) -> require path.resolve(__dirname,"..","lib",module)