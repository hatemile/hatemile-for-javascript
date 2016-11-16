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
 * @namespace html
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).html || (_base1.html = {});

/**
 * @class HTMLDOMParser
 * @classdesc The HTMLDOMParser interface contains the methods for access a
 * native parser.
 * @memberof hatemile.util.html
 */
exports.hatemile.util.html.HTMLDOMParser = (function() {
	function HTMLDOMParser() {
	}

	/**
	 * Find all elements in the parser by selector.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.find = function(selector) {
	};

	/**
	 * Find all elements in the parser by selector, children of found elements.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.findChildren = function(selector) {
	};

	/**
	 * Find all elements in the parser by selector, descendants of found elements.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.findDescendants = function(selector) {
	};

	/**
	 * Find all elements in the parser by selector, ancestors of found elements.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.findAncestors = function(selector) {
	};

	/**
	 * Returns the first element found.
	 * @return {hatemile.util.html.HTMLDOMElement} The first element found or undefined
	 * if not have elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.firstResult = function() {
	};

	/**
	 * Returns the last element found.
	 * @return {hatemile.util.html.HTMLDOMElement} The last element found or undefined
	 * if not have elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.lastResult = function() {
	};

	/**
	 * Returns a list with all elements found.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The list with all elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.listResults = function() {
	};

	/**
	 * Create a element.
	 * @param {string} tag The tag of element.
	 * @return {hatemile.util.html.HTMLDOMElement} The element created.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.createElement = function(tag) {
	};

	/**
	 * Returns the HTML code of parser.
	 * @return {string} The HTML code of parser.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.getHTML = function() {
	};

	/**
	 * Returns the parser.
	 * @return {object} The parser or root element of the parser.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.getParser = function() {
	};

	/**
	 * Clear the memory of this object.
	 * @memberof hatemile.util.html.HTMLDOMParser
	 */
	HTMLDOMParser.prototype.clearParser = function() {
	};

	return HTMLDOMParser;

})();
