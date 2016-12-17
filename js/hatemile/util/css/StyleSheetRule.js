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

var exports, _base, _base1;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace hatemile.util
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace hatemile.util.css
 */
(_base1 = exports.hatemile.util).css || (_base1.css = {});

/**
 * The StyleSheetRule interface contains the methods for access the CSS rule.
 * @interface hatemile.util.css.StyleSheetRule
 */
exports.hatemile.util.css.StyleSheetRule = (function() {
	function StyleSheetRule() {
	}

	/**
	 * Returns that the rule has a declaration with the property.
	 * @param {string} propertyName The name of property.
	 * @returns {boolean} True if the rule has a declaration with the property or
	 * false if the rule not has a declaration with the property.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#hasProperty
	 */
	StyleSheetRule.prototype.hasProperty = function(propertyName) {
	};

	/**
	 * Returns that the rule has declarations.
	 * @returns {boolean} True if the rule has the property or false if the rule
	 * not has declarations.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#hasDeclarations
	 */
	StyleSheetRule.prototype.hasDeclarations = function() {
	};

	/**
	 * Returns the declarations with the property.
	 * @param {string} propertyName The property.
	 * @returns {hatemile.util.css.StyleSheetDeclaration[]} The declarations with
	 * the property.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#getDeclarations
	 */
	StyleSheetRule.prototype.getDeclarations = function(propertyName) {
	};

	/**
	 * Returns the selector of rule.
	 * @returns {string} The selector of rule.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#getSelector
	 */
	StyleSheetRule.prototype.getSelector = function() {
	};

	return StyleSheetRule;

})();