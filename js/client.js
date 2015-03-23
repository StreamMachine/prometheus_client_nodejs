var Client, debug, express, _;

debug = require("debug")("prometheus-client");

express = require("express");

_ = require("underscore");

module.exports = Client = (function() {
  Client.Gauge = require("./gauge");

  Client.Counter = require("./counter");

  function Client(opts) {
    var _ref, _ref1;
    this.opts = opts;
    this._metrics = {};
    this._nameOpts = {
      namespace: (_ref = this.opts) != null ? _ref.namespace : void 0,
      subsystem: (_ref1 = this.opts) != null ? _ref1.subsystem : void 0
    };
    this.metricsFunc = (function(_this) {
      return function(req, res) {
        var k, labels, lk, lv, obj, v, _i, _len, _ref2, _ref3;
        res.writeHead(200, {
          "content-type": "text/plain; version=0.0.4"
        });
        debug("Preparing to write " + (Object.keys(_this._metrics).length) + " metrics.");
        _ref2 = _this._metrics;
        for (k in _ref2) {
          obj = _ref2[k];
          res.write("# HELP " + k + " " + obj.help + "\n# TYPE " + k + " " + (obj.type()) + "\n");
          _ref3 = obj.values();
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            v = _ref3[_i];
            labels = ((function() {
              var _ref4, _results;
              _ref4 = v[0];
              _results = [];
              for (lk in _ref4) {
                lv = _ref4[lk];
                _results.push("" + lk + "=\"" + lv + "\"");
              }
              return _results;
            })()).join(",");
            res.write("" + k + "{" + labels + "} " + v[1] + "\n");
          }
        }
        return res.end();
      };
    })(this);
  }

  Client.prototype.register = function(metric) {
    var name;
    name = metric._full_name;
    if (this._metrics[name]) {
      throw "Metric name must be unique.";
    }
    debug("Registering new metric: " + name);
    this._metrics[name] = metric;
    return true;
  };

  Client.prototype.newCounter = function(args) {
    return new Client.Counter(_.extend(this._nameOpts, args));
  };

  Client.prototype.listen = function(port) {
    var app;
    app = express();
    app.get("/metrics", this.metricsFunc);
    app.listen(port, function() {
      return debug("Listening on " + port);
    });
    app.on("error", function(err) {
      return debug("Metric server error: " + err);
    });
    return app;
  };

  return Client;

})();

//# sourceMappingURL=client.js.map
