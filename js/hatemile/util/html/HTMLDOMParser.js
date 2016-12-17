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
 * @namespace hatemile.util.html
 */
(_base1 = exports.hatemile.util).html || (_base1.html = {});

/**
 * The HTMLDOMParser interface contains the methods for access a native parser.
 * @interface hatemile.util.html.HTMLDOMParser
 */
exports.hatemile.util.html.HTMLDOMParser = (function() {
	function HTMLDOMParser() {
	}

	/**
	 * Find all elements in the parser by selector.
	 * @param {(string|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @returns {hatemile.util.html.HTMLDOMParser} The parser with the elements
	 * found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#find
	 */
	HTMLDOMParser.prototype.find = function(selector) {
	};

	/**
	 * Find all elements in the parser by selector, children of found elements.
	 * @param {(string|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @returns {hatemile.util.html.HTMLDOMParser} The parser with the elements
	 * found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#findChildren
	 */
	HTMLDOMParser.prototype.findChildren = function(selector) {
	};

	/**
	 * Find all elements in the parser by selector, descendants of found elements.
	 * @param {(string|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @returns {hatemile.util.html.HTMLDOMParser} The parser with the elements
	 * found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#findDescendants
	 */
	HTMLDOMParser.prototype.findDescendants = function(selector) {
	};

	/**
	 * Find all elements in the parser by selector, ancestors of found elements.
	 * @param {(string|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @returns {hatemile.util.html.HTMLDOMParser} The parser with the elements
	 * found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#findAncestors
	 */
	HTMLDOMParser.prototype.findAncestors = function(selector) {
	};

	/**
	 * Returns the first element found.
	 * @returns {hatemile.util.html.HTMLDOMElement} The first element found or
	 * undefined if not have elements found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#firstResult
	 */
	HTMLDOMParser.prototype.firstResult = function() {
	};

	/**
	 * Returns the last element found.
	 * @returns {hatemile.util.html.HTMLDOMElement} The last element found or
	 * undefined if not have elements found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#lastResult
	 */
	HTMLDOMParser.prototype.lastResult = function() {
	};

	/**
	 * Returns a list with all elements found.
	 * @returns {hatemile.util.html.HTMLDOMElement[]} The list with all elements
	 * found.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#listResults
	 */
	HTMLDOMParser.prototype.listResults = function() {
	};

	/**
	 * Create a element.
	 * @param {string} tag The tag of element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The element created.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#createElement
	 */
	HTMLDOMParser.prototype.createElement = function(tag) {
	};

	/**
	 * Returns the HTML code of parser.
	 * @returns {string} The HTML code of parser.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#getHTML
	 */
	HTMLDOMParser.prototype.getHTML = function() {
	};

	/**
	 * Returns the parser.
	 * @returns {object} The parser or root element of the parser.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#getParser
	 */
	HTMLDOMParser.prototype.getParser = function() {
	};

	/**
	 * Clear the memory of this object.
	 * @public
	 * @function hatemile.util.html.HTMLDOMParser#clearParser
	 */
	HTMLDOMParser.prototype.clearParser = function() {
	};

	return HTMLDOMParser;

})();