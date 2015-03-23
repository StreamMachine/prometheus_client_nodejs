debug = require("debug")("prometheus-client:registry")

module.exports = class Registry
    constructor: ->
        @_metrics = {}

        @metricsFunc = (req,res) =>
            res.writeHead 200, "content-type":"text/plain; version=0.0.4"

            debug "Preparing to write #{ Object.keys(@_metrics).length } metrics."
            for k,obj of @_metrics
                res.write """
                # HELP #{k} #{obj.help}
                # TYPE #{k} #{obj.type()}

                """

                for v in obj.values()
                    labels = ("#{lk}=\"#{lv}\"" for lk,lv of v[0]).join(",")
                    res.write "#{k}{#{labels}} #{v[1]}\n"

            res.end()

    #----------

    register: (metric) ->
        # validate that our metric name is unique
        name = metric._full_name
        if @_metrics[ name ]
            throw "Metric name must be unique."

        debug "Registering new metric: #{ name }"
        @_metrics[ name ] = metric

        metric