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

var exports;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @class AccessibleCSS
 * @classdesc The AccessibleCSS interface fixes accessibility problems
 * associated with CSS.
 * @memberof hatemile
 */
exports.hatemile.AccessibleCSS = (function() {
	function AccessibleCSS() {
	}

	/**
	 * Provide a solution to support stylesheet speak properties in element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with speak
	 * properties.
	 * @memberof hatemile.AccessibleCSS
	 */
	AccessibleCSS.prototype.fixSpeak = function(element) {
	};

	/**
	 * Provide a solution to support stylesheet speak properties.
	 * @memberof hatemile.AccessibleCSS
	 */
	AccessibleCSS.prototype.fixAllSpeaks = function() {
	};

	return AccessibleCSS;

})();
