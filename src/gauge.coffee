debug = require("debug")("prometheus-client:gauge")

module.exports = class Counter extends require("./base_metric")