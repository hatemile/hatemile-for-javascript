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

exports.hatemile.util.Configure = (function() {
  /**
  	 * Initializes a new object that contains the configuration of HaTeMiLe.
  	 * @param {Object} config The JSON configuration.
  	 * @class Configure
  	 * @classdesc The Configure class contains the configuration of HaTeMiLe.
  	 * @version 2014-07-23
  	 * @memberof hatemile.util
  */

  function Configure(config) {
    var change, changes, _i, _len;
    this.parameters = config['parameters'];
    this.selectorChanges = [];
    changes = config['selector-changes'];
    for (_i = 0, _len = changes.length; _i < _len; _i++) {
      change = changes[_i];
      this.selectorChanges.push(new exports.hatemile.util.SelectorChange(change['selector'], change['attribute'], change['value-attribute']));
    }
  }

  /**
  	 * Returns the parameters of configuration.
  	 * @return {Object} The parameters of configuration.
  */


  Configure.prototype.getParameters = function() {
    var clonedParameters, key, value, _ref;
    clonedParameters = {};
    _ref = this.parameters;
    for (key in _ref) {
      value = _ref[key];
      clonedParameters[key] = value;
    }
    return clonedParameters;
  };

  /**
  	 * Returns the value of a parameter of configuration.
  	 * @param {String} parameter The parameter.
  	 * @return {String} The value of the parameter.
  	 * @memberof hatemile.util.Configure
  */


  Configure.prototype.getParameter = function(name) {
    return this.parameters[name];
  };

  /**
  	 * Returns the changes that will be done in selectors.
  	 * @return {hatemile.util.SelectorChange[]} The changes that will be done in
  	 * selectors.
  	 * @memberof hatemile.util.Configure
  */


  Configure.prototype.getSelectorChanges = function() {
    var clonedSelectorChanges;
    clonedSelectorChanges = [];
    return clonedSelectorChanges.concat(this.selectorChanges);
  };

  return Configure;

})();
