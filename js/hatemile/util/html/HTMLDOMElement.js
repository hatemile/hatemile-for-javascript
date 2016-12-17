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

var exports, _base, _base1, _ref
		, __hasProp = {}.hasOwnProperty
		, __extends = function(child, parent) {
			for (var key in parent) {
				if (__hasProp.call(parent, key))
					child[key] = parent[key];
			}
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		};

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
 * The HTMLDOMElement interface contains the methods for access the HTML
 * element.
 * @interface hatemile.util.html.HTMLDOMElement
 * @extends hatemile.util.html.HTMLDOMNode
 */
exports.hatemile.util.html.HTMLDOMElement = (function(_super) {
	__extends(HTMLDOMElement, _super);

	function HTMLDOMElement() {
		_ref = HTMLDOMElement.__super__.constructor.apply(this, arguments);
		return _ref;
	}

	/**
	 * Returns the tag name of element.
	 * @returns {string} The tag name of element in uppercase letters.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getTagName
	 */
	HTMLDOMElement.prototype.getTagName = function() {
	};

	/**
	 * Returns the value of a attribute.
	 * @param {string} name The name of attribute.
	 * @returns {string} The value of the attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getAttribute
	 */
	HTMLDOMElement.prototype.getAttribute = function(name) {
	};

	/**
	 * Create or modify a attribute.
	 * @param {string} name The name of attribute.
	 * @param {string} value The value of attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#setAttribute
	 */
	HTMLDOMElement.prototype.setAttribute = function(name, value) {
	};

	/**
	 * Remove a attribute of element.
	 * @param {string} name The name of attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#removeAttribute
	 */
	HTMLDOMElement.prototype.removeAttribute = function(name) {
	};

	/**
	 * Check that the element has an attribute.
	 * @param {string} name The name of attribute.
	 * @returns {boolean} True if the element has the attribute or false if the
	 * element not has the attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasAttribute
	 */
	HTMLDOMElement.prototype.hasAttribute = function(name) {
	};

	/**
	 * Check that the element has attributes.
	 * @returns {boolean} True if the element has attributes or false if the
	 * element not has attributes.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasAttributes
	 */
	HTMLDOMElement.prototype.hasAttributes = function() {
	};

	/**
	 * Append a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be
	 * inserted.
	 * @returns {hatemile.util.html.HTMLDOMElement} This element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#appendElement
	 */
	HTMLDOMElement.prototype.appendElement = function(element) {
	};

	/**
	 * Prepend a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be
	 * inserted.
	 * @returns {hatemile.util.html.HTMLDOMElement} This element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#prependElement
	 */
	HTMLDOMElement.prototype.prependElement = function(element) {
	};

	/**
	 * Returns the elements children of this element.
	 * @returns {hatemile.util.html.HTMLDOMElement[]} The elements children of
	 * this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getChildrenElements
	 */
	HTMLDOMElement.prototype.getChildrenElements = function() {
	};

	/**
	 * Returns the children of this element.
	 * @returns {hatemile.util.html.HTMLDOMNode[]} The children of this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getChildren
	 */
	HTMLDOMElement.prototype.getChildren = function() {
	};

	/**
	 * Joins adjacent Text nodes.
	 * @returns {hatemile.util.html.HTMLDOMElement} This element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#normalize
	 */
	HTMLDOMElement.prototype.normalize = function() {
	};

	/**
	 * Check that the element has elements children.
	 * @returns {boolean} True if the element has elements children or false if
	 * the element not has elements children.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasChildrenElements
	 */
	HTMLDOMElement.prototype.hasChildrenElements = function() {
	};

	/**
	 * Check that the element has children.
	 * @returns {boolean} True if the element has children or false if the element
	 * not has children.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasChildren
	 */
	HTMLDOMElement.prototype.hasChildren = function() {
	};

	/**
	 * Returns the inner HTML code of this element.
	 * @returns {string} The inner HTML code of this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getInnerHTML
	 */
	HTMLDOMElement.prototype.getInnerHTML = function() {
	};

	/**
	 * Modify the inner HTML code of this element.
	 * @param {string} html The HTML code.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#setInnerHTML
	 */
	HTMLDOMElement.prototype.setInnerHTML = function(html) {
	};

	/**
	 * Returns the HTML code of this element.
	 * @returns {string} The HTML code of this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getOuterHTML
	 */
	HTMLDOMElement.prototype.getOuterHTML = function() {
	};

	/**
	 * Clone this element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The clone.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#cloneElement
	 */
	HTMLDOMElement.prototype.cloneElement = function() {
	};

	/**
	 * Returns the first element child of this element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The first element child of
	 * this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getFirstElementChild
	 */
	HTMLDOMElement.prototype.getFirstElementChild = function() {
	};

	/**
	 * Returns the last element child of this element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The last element child of this
	 * element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getLastElementChild
	 */
	HTMLDOMElement.prototype.getLastElementChild = function() {
	};

	/**
	 * Returns the first node child of this element.
	 * @returns {hatemile.util.html.HTMLDOMNode} The first node child of this
	 * element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getFirstNodeChild
	 */
	HTMLDOMElement.prototype.getFirstNodeChild = function() {
	};

	/**
	 * Returns the last node child of this element.
	 * @returns {hatemile.util.html.HTMLDOMNode} The last node child of this
	 * element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getLastNodeChild
	 */
	HTMLDOMElement.prototype.getLastNodeChild = function() {
	};

	return HTMLDOMElement;

})(exports.hatemile.util.html.HTMLDOMNode);