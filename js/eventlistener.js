if (isEmpty(Element.prototype.eventListenerList)) {
  Element.prototype.eventListenerList = {};
  Element.prototype.__eventListenerListAdded = false;
  Element.prototype.__addEventListener = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function() {
    if (!this.__eventListenerListAdded) {
      this.eventListenerList = {};
      this.__eventListenerListAdded = true;
    }
    if (isEmpty(this.eventListenerList[arguments[0]])) {
      this.eventListenerList[arguments[0]] = [];
    }
    this.eventListenerList[arguments[0]].push(arguments[1]);
    return this.__addEventListener.apply(this, arguments);
  };
  Element.prototype.__removeEventListener = Element.prototype.removeEventListener;
  Element.prototype.removeEventListener = function() {
    var found, key, _i, _len, _ref;
    found = false;
    if (isEmpty(this.eventListenerList[arguments[0]])) {
      this.eventListenerList[arguments[0]] = [];
    }
    _ref = this.eventListenerList[arguments[0]];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      found = this.eventListenerList[arguments[0]][key] === arguments[1];
      if (found) {
        break;
      }
    }
    if (found) {
      this.eventListenerList[arguments[0]].splice(key, 1);
    }
    return this.__removeEventListener.apply(this, arguments);
  };
}
