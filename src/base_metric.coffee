debug   = require("debug")("prometheus-client:metric")
_       = require "underscore"
hash    = require "object-hash"

module.exports = class BaseMetric
    # Valid opts are namespace, subsystem, name, help and labels.
    constructor: (opts) ->
        @name           = opts?.name
        @namespace      = opts?.namespace
        @subsystem      = opts?.subsystem
        @help           = opts?.help
        @base_labels    = opts?.labels

        # Init an empty values object, which will be keyed with labels.
        @_values        = {}

        # Also init an empty object for caching hashed labels.
        @_labelCache    = {}
        @_labelKeys     = null

        throw "Name is required" if !@name
        throw "Help is required" if !@help

        @_full_name     = _.compact([ @namespace, @subsystem, @name ]).join("_")

    #----------

    type: ->
        throw "Metrics must set a type"

    #----------

    default: ->
        null

    #----------

    get: (labels={}) ->
        lh = @label_hash_for(labels)
        @_values[lh] || @default()

    #----------

    values: ->
        values = []

        for lh,v of @_values
            values.push [@_labelCache[lh], v]

        values

    #----------

    label_hash_for: (labels) ->
        lh = hash.sha1(labels)

        return lh if @_labelCache[lh]

        # Validate each label key
        for k,v of labels
            throw "Label #{k} must not start with __" if /^__/.test(k)
            throw "Label #{k} is reserved" if _(['instance','job']).contains(k)

        # Validate that the set of keys is correct
        if @_labelKeys && hash.keys(labels) != @_labelKeys
            throw "Labels must have the same signature"

        # If yes to both, stash
        @_labelKeys = hash.keys(labels) if !@_labelKeys
        @_labelCache[lh] = labels

        lh