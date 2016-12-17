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
 * The HTMLDOMNode interface contains the methods for access the Node.
 * @interface hatemile.util.html.HTMLDOMNode
 */
exports.hatemile.util.html.HTMLDOMNode = (function() {
	function HTMLDOMNode() {
	}

	/**
	 * Returns the text content of node.
	 * @returns {string} The text content of node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#getTextContent
	 */
	HTMLDOMNode.prototype.getTextContent = function() {
	};

	/**
	 * Insert a node before this node.
	 * @param {hatemile.util.html.HTMLDOMNode} newNode The node that be inserted.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#insertBefore
	 */
	HTMLDOMNode.prototype.insertBefore = function(newNode) {
	};

	/**
	 * Insert a node after this node.
	 * @param {hatemile.util.html.HTMLDOMNode} newNode The node that be inserted.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#insertAfter
	 */
	HTMLDOMNode.prototype.insertAfter = function(newNode) {
	};

	/**
	 * Remove this node of the parser.
	 * @returns {hatemile.util.html.HTMLDOMNode} The removed node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#removeNode
	 */
	HTMLDOMNode.prototype.removeNode = function() {
	};

	/**
	 * Replace this node for other node.
	 * @param {hatemile.util.html.HTMLDOMNode} newNode The node that replace this
	 * node.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#replaceNode
	 */
	HTMLDOMNode.prototype.replaceNode = function(newNode) {
	};

	/**
	 * Append a text content in node.
	 * @param {string} text The text content.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#appendText
	 */
	HTMLDOMNode.prototype.appendText = function(text) {
	};

	/**
	 * Prepend a text content in node.
	 * @param {string} text The text content.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#prependText
	 */
	HTMLDOMNode.prototype.prependText = function(text) {
	};

	/**
	 * Returns the parent element of this node.
	 * @returns {hatemile.util.html.HTMLDOMElement} The parent element of this
	 * node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#getParentElement
	 */
	HTMLDOMNode.prototype.getParentElement = function() {
	};

	/**
	 * Returns the native object of this node.
	 * @returns {object} The native object of this node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#getData
	 */
	HTMLDOMNode.prototype.getData = function() {
	};

	/**
	 * Modify the native object of this node.
	 * @param {object} data The native object of this node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#setData
	 */
	HTMLDOMNode.prototype.setData = function(data) {
	};

	/**
	 * Indicates whether some other object is equal to this one.
	 * @param {object} node The reference object with which to compare.
	 * @returns {boolean} True if the node is the other object is equals to this
	 * one or if the node is not the other object is equals to this one.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#equals
	 */
	HTMLDOMNode.prototype.equals = function(node) {
	};

	return HTMLDOMNode;

})();