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
 * @class AccessibleNavigation
 * @classdesc The AccessibleNavigation interface fixes accessibility problems
 * associated with navigation.
 * @memberof hatemile
 */
exports.hatemile.AccessibleNavigation = (function() {
	function AccessibleNavigation() {
	}

	/**
	 * Provide content skipper for element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleNavigation
	 */
	AccessibleNavigation.prototype.fixSkipper = function(element) {
	};

	/**
	 * Provide content skippers.
	 * @memberof hatemile.AccessibleNavigation
	 */
	AccessibleNavigation.prototype.fixAllSkippers = function() {
	};

	/**
	 * Provide a navigation by heading.
	 * @param {hatemile.util.html.HTMLDOMElement} heading The heading element.
	 * @memberof hatemile.AccessibleNavigation
	 */
	AccessibleNavigation.prototype.fixHeading = function(heading) {
	};

	/**
	 * Provide a navigation by headings.
	 * @memberof hatemile.AccessibleNavigation
	 */
	AccessibleNavigation.prototype.fixAllHeadings = function() {
	};

	/**
	 * Provide an alternative way to access the long description of element.
	 * @param {hatemile.util.html.HTMLDOMElement} image The image with long
	 * description.
	 * @memberof hatemile.AccessibleNavigation
	 */
	AccessibleNavigation.prototype.fixLongDescription = function(image) {
	};

	/**
	 * Provide an alternative way to access the longs descriptions of elements.
	 * @memberof hatemile.AccessibleNavigation
	 */
	AccessibleNavigation.prototype.fixAllLongDescriptions = function() {
	};

	return AccessibleNavigation;

})();
