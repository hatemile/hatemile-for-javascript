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
 * @namespace util
 * @memberof hatemile
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace configuration
 * @memberof hatemile.util
 */


(_base1 = exports.hatemile.util).configuration || (_base1.configuration = {});

/**
 * @class Skipper
 * @classdesc The Skipper class store the selector that will be add a skipper.
 * @memberof hatemile.util.configuration
 */
exports.hatemile.util.configuration.Skipper = (function() {
	/**
	 * Inicializes a new object with the values pre-defineds.
	 * @param {String} selector The selector.
	 * @param {String} defaultText The default text of skipper.
	 * @param {String} shortcuts The shortcuts of skipper.
	 * @memberof hatemile.util.configuration.Skipper
	 */
	function Skipper(selector, defaultText, shortcuts) {
		this.selector = selector;
		this.defaultText = defaultText;
		if (!isEmpty(shortcuts)) {
			this.shortcuts = shortcuts.split(new RegExp('[ \n\t\r]+'));
		} else {
			this.shortcuts = [];
		}
	}

	/**
	 * Returns the selector.
	 * @return {String} The selector.
	 * @memberof hatemile.util.configuration.Skipper
	 */
	Skipper.prototype.getSelector = function() {
		return this.selector;
	};

	/**
	 * Returns the default text of skipper.
	 * @return {String} The default text of skipper.
	 * @memberof hatemile.util.configuration.Skipper
	 */
	Skipper.prototype.getDefaultText = function() {
		return this.defaultText;
	};

	/**
	 * Returns the shortcuts of skipper.
	 * @return {String[]} The shortcuts of skipper.
	 * @memberof hatemile.util.configuration.Skipper
	 */
	Skipper.prototype.getShortcuts = function() {
		var clonedShortcuts;
		clonedShortcuts = [];
		return clonedShortcuts.concat(this.shortcuts);
	};

	return Skipper;

})();
