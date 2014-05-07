/*
Copyright 2014 Carlson Santana Cruz

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var exports, _base;

exports = this;

exports.hatemile || (exports.hatemile = {});

(_base = exports.hatemile).util || (_base.util = {});

exports.hatemile.util.Configure = (function() {
  function Configure(config) {
    var change, changes, _i, _len;
    this.parameters = config.parameters;
    this.selectorChanges = [];
    changes = config.selectorChanges;
    for (_i = 0, _len = changes.length; _i < _len; _i++) {
      change = changes[_i];
      this.selectorChanges.push(new exports.hatemile.util.SelectorChange(change.selector, change.attribute, change.valueForAttribute));
    }
  }

  Configure.prototype.getParameter = function(name) {
    return this.parameters[name];
  };

  Configure.prototype.getSelectorChanges = function() {
    return this.selectorChanges;
  };

  return Configure;

})();
