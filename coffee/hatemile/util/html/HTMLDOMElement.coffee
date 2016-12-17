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
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @namespace hatemile.util
###
exports.hatemile.util or= {}

###*
 * @namespace hatemile.util.html
###
exports.hatemile.util.html or= {}

###*
 * The HTMLDOMElement interface contains the methods for access the HTML
 * element.
 * @interface hatemile.util.html.HTMLDOMElement
 * @extends hatemile.util.html.HTMLDOMNode
###
class exports.hatemile.util.html.HTMLDOMElement extends exports.hatemile.util.html.HTMLDOMNode
	
	###*
	 * Returns the tag name of element.
	 * @returns {string} The tag name of element in uppercase letters.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getTagName
	###
	getTagName: () ->
	
	###*
	 * Returns the value of a attribute.
	 * @param {string} name The name of attribute.
	 * @returns {string} The value of the attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getAttribute
	###
	getAttribute: (name) ->
	
	###*
	 * Create or modify a attribute.
	 * @param {string} name The name of attribute.
	 * @param {string} value The value of attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#setAttribute
	###
	setAttribute: (name, value) ->
	
	###*
	 * Remove a attribute of element.
	 * @param {string} name The name of attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#removeAttribute
	###
	removeAttribute: (name) ->
	
	###*
	 * Check that the element has an attribute.
	 * @param {string} name The name of attribute.
	 * @returns {boolean} True if the element has the attribute or false if the
	 * element not has the attribute.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasAttribute
	###
	hasAttribute: (name) ->
	
	###*
	 * Check that the element has attributes.
	 * @returns {boolean} True if the element has attributes or false if the
	 * element not has attributes.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasAttributes
	###
	hasAttributes: () ->
	
	###*
	 * Append a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be
	 * inserted.
	 * @returns {hatemile.util.html.HTMLDOMElement} This element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#appendElement
	###
	appendElement: (element) ->
	
	###*
	 * Prepend a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be
	 * inserted.
	 * @returns {hatemile.util.html.HTMLDOMElement} This element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#prependElement
	###
	prependElement: (element) ->
	
	###*
	 * Returns the elements children of this element.
	 * @returns {hatemile.util.html.HTMLDOMElement[]} The elements children of
	 * this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getChildrenElements
	###
	getChildrenElements: () ->
	
	###*
	 * Returns the children of this element.
	 * @returns {hatemile.util.html.HTMLDOMNode[]} The children of this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getChildren
	###
	getChildren: () ->
		
	###*
	 * Joins adjacent Text nodes.
	 * @returns {hatemile.util.html.HTMLDOMElement} This element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#normalize
	###
	normalize: () ->
	
	###*
	 * Check that the element has elements children.
	 * @returns {boolean} True if the element has elements children or false if
	 * the element not has elements children.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasChildrenElements
	###
	hasChildrenElements: () ->
	
	###*
	 * Check that the element has children.
	 * @returns {boolean} True if the element has children or false if the element
	 * not has children.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#hasChildren
	###
	hasChildren: () ->
	
	###*
	 * Returns the inner HTML code of this element.
	 * @returns {string} The inner HTML code of this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getInnerHTML
	###
	getInnerHTML: () ->
	
	###*
	 * Modify the inner HTML code of this element.
	 * @param {string} html The HTML code.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#setInnerHTML
	###
	setInnerHTML: (html) ->
	
	###*
	 * Returns the HTML code of this element.
	 * @returns {string} The HTML code of this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getOuterHTML
	###
	getOuterHTML: () ->
	
	###*
	 * Clone this element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The clone.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#cloneElement
	###
	cloneElement: () ->
	
	###*
	 * Returns the first element child of this element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The first element child of
	 * this element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getFirstElementChild
	###
	getFirstElementChild: () ->
	
	###*
	 * Returns the last element child of this element.
	 * @returns {hatemile.util.html.HTMLDOMElement} The last element child of this
	 * element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getLastElementChild
	###
	getLastElementChild: () ->
	
	###*
	 * Returns the first node child of this element.
	 * @returns {hatemile.util.html.HTMLDOMNode} The first node child of this
	 * element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getFirstNodeChild
	###
	getFirstNodeChild: () ->
	
	###*
	 * Returns the last node child of this element.
	 * @returns {hatemile.util.html.HTMLDOMNode} The last node child of this
	 * element.
	 * @public
	 * @function hatemile.util.html.HTMLDOMElement#getLastNodeChild
	###
	getLastNodeChild: () ->