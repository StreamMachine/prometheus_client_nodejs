var Counter, debug,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

debug = require("debug")("prometheus-client:gauge");

module.exports = Counter = (function(_super) {
  __extends(Counter, _super);

  function Counter() {
    return Counter.__super__.constructor.apply(this, arguments);
  }

  return Counter;

})(require("./base_metric"));

//# sourceMappingURL=gauge.js.map
