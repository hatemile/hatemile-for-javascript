###
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
__exports = this

###*
 * @namespace hatemile
###
__exports.hatemile or= {}

###*
 * @namespace hatemile.util
###
__exports.hatemile.util or= {}

###*
 * @namespace hatemile.util.html
###
__exports.hatemile.util.html or= {}

###*
 * The HTMLDOMNode interface contains the methods for access the Node.
 * @interface hatemile.util.html.HTMLDOMNode
###
class __exports.hatemile.util.html.HTMLDOMNode
	
	###*
	 * Returns the text content of node.
	 * @returns {string} The text content of node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#getTextContent
	###
	getTextContent: () ->
	
	###*
	 * Insert a node before this node.
	 * @param {hatemile.util.html.HTMLDOMNode} newNode The node that be inserted.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#insertBefore
	###
	insertBefore: (newNode) ->
	
	###*
	 * Insert a node after this node.
	 * @param {hatemile.util.html.HTMLDOMNode} newNode The node that be inserted.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#insertAfter
	###
	insertAfter: (newNode) ->
	
	###*
	 * Remove this node of the parser.
	 * @returns {hatemile.util.html.HTMLDOMNode} The removed node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#removeNode
	###
	removeNode: () ->
	
	###*
	 * Replace this node for other node.
	 * @param {hatemile.util.html.HTMLDOMNode} newNode The node that replace this
	 * node.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#replaceNode
	###
	replaceNode: (newNode) ->
	
	###*
	 * Append a text content in node.
	 * @param {string} text The text content.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#appendText
	###
	appendText: (text) ->
	
	###*
	 * Prepend a text content in node.
	 * @param {string} text The text content.
	 * @returns {hatemile.util.html.HTMLDOMNode} This node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#prependText
	###
	prependText: (text) ->
	
	###*
	 * Returns the parent element of this node.
	 * @returns {hatemile.util.html.HTMLDOMElement} The parent element of this
	 * node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#getParentElement
	###
	getParentElement: () ->
	
	###*
	 * Returns the native object of this node.
	 * @returns {object} The native object of this node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#getData
	###
	getData: () ->
	
	###*
	 * Modify the native object of this node.
	 * @param {object} data The native object of this node.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#setData
	###
	setData: (data) ->
	
	###*
	 * Indicates whether some other object is equal to this one.
	 * @param {object} node The reference object with which to compare.
	 * @returns {boolean} True if the node is the other object is equals to this
	 * one or if the node is not the other object is equals to this one.
	 * @public
	 * @function hatemile.util.html.HTMLDOMNode#equals
	###
	equals: (node) ->