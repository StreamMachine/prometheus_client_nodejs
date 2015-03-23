var Registry, debug;

debug = require("debug")("prometheus-client:registry");

module.exports = Registry = (function() {
  function Registry() {
    this._metrics = {};
    this.metricsFunc = (function(_this) {
      return function(req, res) {
        var k, labels, lk, lv, obj, v, _i, _len, _ref, _ref1;
        res.writeHead(200, {
          "content-type": "text/plain; version=0.0.4"
        });
        debug("Preparing to write " + (Object.keys(_this._metrics).length) + " metrics.");
        _ref = _this._metrics;
        for (k in _ref) {
          obj = _ref[k];
          res.write("# HELP " + k + " " + obj.help + "\n# TYPE " + k + " " + (obj.type()) + "\n");
          _ref1 = obj.values();
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            v = _ref1[_i];
            labels = ((function() {
              var _ref2, _results;
              _ref2 = v[0];
              _results = [];
              for (lk in _ref2) {
                lv = _ref2[lk];
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

  Registry.prototype.register = function(metric) {
    var name;
    name = metric._full_name;
    if (this._metrics[name]) {
      throw "Metric name must be unique.";
    }
    debug("Registering new metric: " + name);
    this._metrics[name] = metric;
    return metric;
  };

  return Registry;

})();

//# sourceMappingURL=registry.js.map
