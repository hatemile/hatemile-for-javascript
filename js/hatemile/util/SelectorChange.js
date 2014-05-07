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

exports.hatemile.util.SelectorChange = (function() {
  function SelectorChange(selector, attribute, valueForAttribute) {
    this.selector = selector;
    this.attribute = attribute;
    this.valueForAttribute = valueForAttribute;
  }

  SelectorChange.prototype.getSelector = function() {
    return this.selector;
  };

  SelectorChange.prototype.setSelector = function(selector) {
    this.selector = selector;
  };

  SelectorChange.prototype.getAttribute = function() {
    return this.attribute;
  };

  SelectorChange.prototype.setAttribute = function(attribute) {
    this.attribute = attribute;
  };

  SelectorChange.prototype.getValueForAttribute = function() {
    return this.valueForAttribute;
  };

  SelectorChange.prototype.setValueForAttribute = function(valueForAttribute) {
    this.valueForAttribute = valueForAttribute;
  };

  return SelectorChange;

})();
