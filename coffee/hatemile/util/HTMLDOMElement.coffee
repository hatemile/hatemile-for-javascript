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
 * @namespace util
 * @memberof hatemile
###
exports.hatemile.util or= {}

###*
 * @class HTMLDOMElement
 * @classdesc The HTMLDOMElement interface contains the methods for access of
 * the HTML element.
 * @memberof hatemile.util
###
class exports.hatemile.util.HTMLDOMElement
	
	###*
	 * Returns the tag name of element.
	 * @return {String} The tag name of element in uppercase letters.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getTagName: () ->
	
	###*
	 * Returns the value of a attribute.
	 * @param {String} name The name of attribute.
	 * @return {String} The value of the attribute, if the element not contains
	 * the attribute returns null.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getAttribute: (name) ->
	
	###*
	 * Create or modify a attribute.
	 * @param {String} name The name of attribute.
	 * @param {String} value The value of attribute.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	setAttribute: (name, value) ->
	
	###*
	 * Remove a attribute of element.
	 * @param {String} name The name of attribute.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	removeAttribute: (name) ->
	
	###*
	 * Returns if the element has an attribute.
	 * @param {String} name The name of attribute.
	 * @return {Boolean} True if the element has the attribute or false if the
	 * element not has the attribute.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	hasAttribute: (name) ->
	
	###*
	 * Returns if the element has attributes.
	 * @return {Boolean} True if the element has attributes or false if the
	 * element not has attributes.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	hasAttributes: () ->
	
	###*
	 * Returns the text of element.
	 * @return {String} The text of element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getTextContent: () ->
	
	###*
	 * Insert a element before this element.
	 * @param {hatemile.util.HTMLDOMElement} newElement The element that be
	 * inserted.
	 * @return {hatemile.util.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	insertBefore: (newElement) ->
	
	###*
	 * Insert a element after this element.
	 * @param {hatemile.util.HTMLDOMElement} newElement The element that be
	 * inserted.
	 * @return {hatemile.util.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	insertAfter: (newElement) ->
	
	###*
	 * Remove this element of the parser.
	 * @return {hatemile.util.HTMLDOMElement} The removed element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	removeElement: () ->
	
	###*
	 * Replace this element for other element.
	 * @param {hatemile.util.HTMLDOMElement} newElement The element that replace
	 * this element.
	 * @return {hatemile.util.HTMLDOMElement} The element replaced.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	replaceElement: (newElement) ->
	
	###*
	 * Append a element child.
	 * @param {hatemile.util.HTMLDOMElement} element The element that be inserted.
	 * @return {hatemile.util.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	appendElement: (element) ->
	
	###*
	 * Returns the children of this element.
	 * @return {hatemile.util.HTMLDOMElement[]} The children of this element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getChildren: () ->
	
	###*
	 * Append a text child.
	 * @param {String} text The text.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	appendText: (text) ->
	
	###*
	 * Returns if the element has children.
	 * @return {Boolean} True if the element has children or false if the element
	 * not has children.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	hasChildren: () ->
	
	###*
	 * Returns the parent element of this element.
	 * @return {hatemile.util.HTMLDOMElement} The parent element of this element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getParentElement: () ->
	
	###*
	 * Returns the inner HTML code of this element.
	 * @return {String} The inner HTML code of this element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getInnerHTML: () ->
	
	###*
	 * Modify the inner HTML code of this element.
	 * @param {String} html The HTML code.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	setInnerHTML: (html) ->
	
	###*
	 * Returns the HTML code of this element.
	 * @return {String} The HTML code of this element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getOuterHTML: () ->
	
	###*
	 * Returns the native object of this element.
	 * @return {Object} The native object of this element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getData: () ->
	
	###*
	 * Modify the native object of this element.
	 * @param {Object} data The native object of this element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	setData: (data) ->
	
	###*
	 * Clone this element.
	 * @return {hatemile.util.HTMLDOMElement} The clone.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	cloneElement: () ->
	
	###*
	 * Returns the first element child of this element.
	 * @return {hatemile.util.HTMLDOMElement} The first element child of this
	 * element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getFirstElementChild: () ->
	
	###*
	 * Returns the last element child of this element.
	 * @return {hatemile.util.HTMLDOMElement} The last element child of this
	 * element.
	 * @memberof hatemile.util.HTMLDOMElement
	###
	getLastElementChild: () ->