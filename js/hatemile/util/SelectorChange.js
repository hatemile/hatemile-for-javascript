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

/**
 * @namespace hatemile
*/


exports.hatemile || (exports.hatemile = {});

/**
 * @namespace util
 * @memberof hatemile
*/


(_base = exports.hatemile).util || (_base.util = {});

exports.hatemile.util.SelectorChange = (function() {
  /**
  	 * Inicializes a new object with the values pre-defineds.
  	 * @param {String} selector The selector.
  	 * @param {String} attribute The attribute.
  	 * @param {String} valueForAttribute The value of the attribute.
  	 * @class SelectorChange
  	 * @classdesc The SelectorChange class store the selector that be attribute
  	 * change.
  	 * @version 1.0
  	 * @memberof hatemile.util
  */

  function SelectorChange(selector, attribute, valueForAttribute) {
    this.selector = selector;
    this.attribute = attribute;
    this.valueForAttribute = valueForAttribute;
  }

  /**
  	 * Returns the selector.
  	 * @return {String} The selector.
  	 * @memberof hatemile.util.SelectorChange
  */


  SelectorChange.prototype.getSelector = function() {
    return this.selector;
  };

  /**
  	 * Change the selector.
  	 * @param {String} selector The new selector.
  	 * @memberof hatemile.util.SelectorChange
  */


  SelectorChange.prototype.setSelector = function(selector) {
    this.selector = selector;
  };

  /**
  	 * Returns the attribute.
  	 * @return {String} The attribute.
  	 * @memberof hatemile.util.SelectorChange
  */


  SelectorChange.prototype.getAttribute = function() {
    return this.attribute;
  };

  /**
  	 * Change the attribute.
  	 * @param {String} attribute The new attribute. 
  	 * @memberof hatemile.util.SelectorChange
  */


  SelectorChange.prototype.setAttribute = function(attribute) {
    this.attribute = attribute;
  };

  /**
  	 * Returns the value of the attribute.
  	 * @return {String} The value of the attribute.
  	 * @memberof hatemile.util.SelectorChange
  */


  SelectorChange.prototype.getValueForAttribute = function() {
    return this.valueForAttribute;
  };

  /**
  	 * Change the value of the attribute.
  	 * @param {String} valueForAttribute The new value of the attribute.
  	 * @memberof hatemile.util.SelectorChange
  */


  SelectorChange.prototype.setValueForAttribute = function(valueForAttribute) {
    this.valueForAttribute = valueForAttribute;
  };

  return SelectorChange;

})();
