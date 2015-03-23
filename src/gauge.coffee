debug = require("debug")("prometheus-client:gauge")

module.exports = class Counter extends require("./base_metric")
    constructor: (opts) ->
        debug "Creating new gauge", opts
        super opts
        @_value = 0

        debug "New gauge's full name is #{@_full_name}"

    #----------

    type: ->
        "gauge"

    default: ->
        0

    #----------

    set: (labels={},value=null) ->
        label_hash = @label_hash_for(labels)
        @_values[label_hash] = value

