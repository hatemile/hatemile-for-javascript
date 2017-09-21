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

var __exports, _base, _base1;

__exports = this;

/**
 * @namespace hatemile
 */
__exports.hatemile || (__exports.hatemile = {});

/**
 * @namespace hatemile.util
 */
(_base = __exports.hatemile).util || (_base.util = {});

/**
 * @namespace hatemile.util.css
 */
(_base1 = __exports.hatemile.util).css || (_base1.css = {});

/**
 * The StyleSheetDeclaration interface contains the methods for access the CSS
 * declaration.
 * @interface hatemile.util.css.StyleSheetDeclaration
 */
__exports.hatemile.util.css.StyleSheetDeclaration = (function() {
	function StyleSheetDeclaration() {
	}

	/**
	 * Returns the value of declaration.
	 * @returns {string} The value of declaration.
	 * @public
	 * @function hatemile.util.css.StyleSheetDeclaration#getValue
	 */
	StyleSheetDeclaration.prototype.getValue = function() {
	};

	/**
	 * Returns a array with the values of declaration.
	 * @returns {string[]} The array with the values of declaration.
	 * @public
	 * @function hatemile.util.css.StyleSheetDeclaration#getValues
	 */
	StyleSheetDeclaration.prototype.getValues = function() {
	};

	/**
	 * Returns the property of declaration.
	 * @returns {string} The property of declaration.
	 * @public
	 * @function hatemile.util.css.StyleSheetDeclaration#getProperty
	 */
	StyleSheetDeclaration.prototype.getProperty = function() {
	};

	return StyleSheetDeclaration;

})();