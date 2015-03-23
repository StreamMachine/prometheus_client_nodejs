var Counter, debug,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

debug = require("debug")("prometheus-client:counter");

module.exports = Counter = (function(_super) {
  __extends(Counter, _super);

  function Counter(opts) {
    debug("Creating new counter", opts);
    Counter.__super__.constructor.call(this, opts);
    this._value = 0;
    debug("New counter's full name is " + this._full_name);
  }

  Counter.prototype.type = function() {
    return "counter";
  };

  Counter.prototype["default"] = function() {
    return 0;
  };

  Counter.prototype.increment = function(labels, inc_by) {
    var label_hash, _base;
    if (labels == null) {
      labels = {};
    }
    if (inc_by == null) {
      inc_by = 1;
    }
    label_hash = this.label_hash_for(labels);
    (_base = this._values)[label_hash] || (_base[label_hash] = this["default"]());
    return this._values[label_hash] += inc_by;
  };

  Counter.prototype.decrement = function(labels, dec_by) {
    if (labels == null) {
      labels = {};
    }
    if (dec_by == null) {
      dec_by = 1;
    }
    return this.increment(labels, -dec_by);
  };

  return Counter;

})(require("./base_metric"));

//# sourceMappingURL=counter.js.map
