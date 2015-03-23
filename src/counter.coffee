debug = require("debug")("prometheus-client:counter")

module.exports = class Counter extends require("./base_metric")
    constructor: (opts) ->
        debug "Creating new counter", opts
        super opts
        @_value = 0

        debug "New counter's full name is #{@_full_name}"

    #----------

    type: ->
        "counter"

    default: ->
        0

    #----------

    increment: (labels={},inc_by=1) ->
        label_hash = @label_hash_for(labels)

        @_values[label_hash] ||= @default()
        @_values[label_hash] += inc_by

    #----------

    decrement: (labels={},dec_by=1) ->
        @increment labels, -dec_by


