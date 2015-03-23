var Counter, debug,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

debug = require("debug")("prometheus-client:gauge");

module.exports = Counter = (function(_super) {
  __extends(Counter, _super);

  function Counter(opts) {
    debug("Creating new gauge", opts);
    Counter.__super__.constructor.call(this, opts);
    this._value = 0;
    debug("New gauge's full name is " + this._full_name);
  }

  Counter.prototype.type = function() {
    return "gauge";
  };

  Counter.prototype["default"] = function() {
    return 0;
  };

  Counter.prototype.set = function(labels, value) {
    var label_hash;
    if (labels == null) {
      labels = {};
    }
    if (value == null) {
      value = null;
    }
    label_hash = this.label_hash_for(labels);
    return this._values[label_hash] = value;
  };

  return Counter;

})(require("./base_metric"));

//# sourceMappingURL=gauge.js.map
