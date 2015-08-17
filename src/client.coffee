debug = require("debug")("prometheus-client")
express = require "express"
_ = require "underscore"

module.exports = class Client
    @_globalRegistry:   null

    @Gauge:     require "./gauge"
    @Counter:   require "./counter"
    @Registry:  require "./registry"

    constructor: (opts) ->
        @registry = opts?.registry || (Client._globalRegistry ||= new Client.Registry)

    #----------

    register: (metric) ->
        @registry.register(metric)

    #----------

    metricsFunc: ->
        @registry.metricsFunc

    #----------

    newCounter: (args) ->
        @register new Client.Counter args

    #----------

    newGauge: (args) ->
        @register new Client.Gauge args

    #----------

    listen: (port) ->
        app = express()
        app.get "/metrics", @registry.metricsFunc
        app.listen port, ->
            debug "Listening on #{port}"
        app.on "error", (err) ->
            debug "Metric server error: #{err}"

        app

    #----------

    #----------