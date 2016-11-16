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
 * @class HTMLDOMElement
 * @classdesc The HTMLDOMElement interface contains the methods for access of
 * the HTML element.
 * @memberof hatemile.util.html
 */
exports.hatemile.util.html.HTMLDOMElement = (function() {
	function HTMLDOMElement() {
	}

	/**
	 * Returns the tag name of element.
	 * @return {string} The tag name of element in uppercase letters.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getTagName = function() {
	};

	/**
	 * Returns the value of a attribute.
	 * @param {string} name The name of attribute.
	 * @return {string} The value of the attribute, if the element not contains
	 * the attribute returns null.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getAttribute = function(name) {
	};

	/**
	 * Create or modify a attribute.
	 * @param {string} name The name of attribute.
	 * @param {string} value The value of attribute.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.setAttribute = function(name, value) {
	};

	/**
	 * Remove a attribute of element.
	 * @param {string} name The name of attribute.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.removeAttribute = function(name) {
	};

	/**
	 * Returns if the element has an attribute.
	 * @param {string} name The name of attribute.
	 * @return {boolean} True if the element has the attribute or false if the
	 * element not has the attribute.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.hasAttribute = function(name) {
	};

	/**
	 * Returns if the element has attributes.
	 * @return {boolean} True if the element has attributes or false if the
	 * element not has attributes.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.hasAttributes = function() {
	};

	/**
	 * Returns the text of element.
	 * @return {string} The text of element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getTextContent = function() {
	};

	/**
	 * Insert a element before this element.
	 * @param {hatemile.util.html.HTMLDOMElement} newElement The element that be
	 * inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.insertBefore = function(newElement) {
	};

	/**
	 * Insert a element after this element.
	 * @param {hatemile.util.html.HTMLDOMElement} newElement The element that be
	 * inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.insertAfter = function(newElement) {
	};

	/**
	 * Remove this element of the parser.
	 * @return {hatemile.util.html.HTMLDOMElement} The removed element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.removeNode = function() {
	};

	/**
	 * Replace this element for other element.
	 * @param {hatemile.util.html.HTMLDOMElement} newElement The element that replace
	 * this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The element replaced.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.replaceNode = function(newElement) {
	};

	/**
	 * Append a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.appendElement = function(element) {
	};

	/**
	 * Prepend a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.prependElement = function(element) {
	};

	/**
	 * Returns the children of this element.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The children of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getChildrenElements = function() {
	};

	/**
	 * Append a text child.
	 * @param {string} text The text.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.appendText = function(text) {
	};

	/**
	 * Prepend a text child.
	 * @param {string} text The text.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.prependText = function(text) {
	};

	HTMLDOMElement.prototype.normalize = function() {
	};

	/**
	 * Returns if the element has children.
	 * @return {boolean} True if the element has children or false if the element
	 * not has children.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.hasChildrenElements = function() {
	};

	/**
	 * Returns if the element has children.
	 * @return {boolean} True if the element has children or false if the element
	 * not has children.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.hasChildren = function() {
	};

	/**
	 * Returns the parent element of this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The parent element of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getParentElement = function() {
	};

	/**
	 * Returns the inner HTML code of this element.
	 * @return {string} The inner HTML code of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getInnerHTML = function() {
	};

	/**
	 * Modify the inner HTML code of this element.
	 * @param {string} html The HTML code.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.setInnerHTML = function(html) {
	};

	/**
	 * Returns the HTML code of this element.
	 * @return {string} The HTML code of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getOuterHTML = function() {
	};

	/**
	 * Returns the native object of this element.
	 * @return {object} The native object of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getData = function() {
	};

	/**
	 * Modify the native object of this element.
	 * @param {object} data The native object of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.setData = function(data) {
	};

	/**
	 * Clone this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The clone.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.cloneElement = function() {
	};

	/**
	 * Returns the first element child of this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The first element child of this
	 * element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getFirstElementChild = function() {
	};

	/**
	 * Returns the last element child of this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The last element child of this
	 * element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	 */
	HTMLDOMElement.prototype.getLastElementChild = function() {
	};

	HTMLDOMElement.prototype.equals = function(node) {
	};

	return HTMLDOMElement;

})();
