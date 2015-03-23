var BaseMetric, debug, hash, _;

debug = require("debug")("prometheus-client:metric");

_ = require("underscore");

hash = require("object-hash");

module.exports = BaseMetric = (function() {
  function BaseMetric(opts) {
    this.name = opts != null ? opts.name : void 0;
    this.namespace = opts != null ? opts.namespace : void 0;
    this.subsystem = opts != null ? opts.subsystem : void 0;
    this.help = opts != null ? opts.help : void 0;
    this.base_labels = opts != null ? opts.labels : void 0;
    this._values = {};
    this._labelCache = {};
    this._labelKeys = null;
    if (!this.name) {
      throw "Name is required";
    }
    if (!this.help) {
      throw "Help is required";
    }
    this._full_name = _.compact([this.namespace, this.subsystem, this.name]).join("_");
  }

  BaseMetric.prototype.type = function() {
    throw "Metrics must set a type";
  };

  BaseMetric.prototype["default"] = function() {
    return null;
  };

  BaseMetric.prototype.get = function(labels) {
    var lh;
    if (labels == null) {
      labels = {};
    }
    lh = this.label_hash_for(labels);
    return this._values[lh] || this["default"]();
  };

  BaseMetric.prototype.values = function() {
    var lh, v, values, _ref;
    values = [];
    _ref = this._values;
    for (lh in _ref) {
      v = _ref[lh];
      values.push([this._labelCache[lh], v]);
    }
    return values;
  };

  BaseMetric.prototype.label_hash_for = function(labels) {
    var k, lh, v;
    lh = hash.sha1(labels);
    if (this._labelCache[lh]) {
      return lh;
    }
    for (k in labels) {
      v = labels[k];
      if (/^__/.test(k)) {
        throw "Label " + k + " must not start with __";
      }
      if (_(['instance', 'job']).contains(k)) {
        throw "Label " + k + " is reserved";
      }
    }
    if (this._labelKeys && hash.keys(labels) !== this._labelKeys) {
      throw "Labels must have the same signature";
    }
    if (!this._labelKeys) {
      this._labelKeys = hash.keys(labels);
    }
    this._labelCache[lh] = labels;
    return lh;
  };

  return BaseMetric;

})();

//# sourceMappingURL=base_metric.js.map
