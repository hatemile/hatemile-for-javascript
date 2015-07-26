/*
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
 * @namespace implementation
 * @memberof hatemile
*/


(_base = exports.hatemile).implementation || (_base.implementation = {});

/**
 * @class AccessibleSelectorImplementation
 * @classdesc The AccessibleSelectorImplementation class is official
 * implementation of AccessibleSelector interface.
 * @extends hatemile.AccessibleSelector
 * @memberof hatemile.implementation
*/


exports.hatemile.implementation.AccessibleSelectorImplementation = (function() {
  /**
  	 * Initializes a new object that manipulate the accessibility through of the
  	 * selectors of the configuration file.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @memberof hatemile.implementation.AccessibleSelectorImplementation
  */

  function AccessibleSelectorImplementation(parser, configure) {
    this.parser = parser;
    this.changes = configure.getSelectorChanges();
    this.dataIgnore = 'data-ignoreaccessibilityfix';
  }

  AccessibleSelectorImplementation.prototype.fixSelectors = function() {
    var change, element, elements, _i, _j, _len, _len1, _ref;
    _ref = this.changes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      change = _ref[_i];
      elements = this.parser.find(change.getSelector()).listResults();
      for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
        element = elements[_j];
        if (!element.hasAttribute(this.dataIgnore)) {
          element.setAttribute(change.getAttribute(), change.getValueForAttribute());
        }
      }
    }
  };

  return AccessibleSelectorImplementation;

})();