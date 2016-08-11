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
 * @namespace html
 * @memberof hatemile.util
###
exports.hatemile.util.html or= {}

###*
 * @class HTMLDOMElement
 * @classdesc The HTMLDOMElement interface contains the methods for access of
 * the HTML element.
 * @memberof hatemile.util.html
###
class exports.hatemile.util.html.HTMLDOMElement
	
	###*
	 * Returns the tag name of element.
	 * @return {String} The tag name of element in uppercase letters.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getTagName: () ->
	
	###*
	 * Returns the value of a attribute.
	 * @param {String} name The name of attribute.
	 * @return {String} The value of the attribute, if the element not contains
	 * the attribute returns null.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getAttribute: (name) ->
	
	###*
	 * Create or modify a attribute.
	 * @param {String} name The name of attribute.
	 * @param {String} value The value of attribute.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	setAttribute: (name, value) ->
	
	###*
	 * Remove a attribute of element.
	 * @param {String} name The name of attribute.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	removeAttribute: (name) ->
	
	###*
	 * Returns if the element has an attribute.
	 * @param {String} name The name of attribute.
	 * @return {Boolean} True if the element has the attribute or false if the
	 * element not has the attribute.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	hasAttribute: (name) ->
	
	###*
	 * Returns if the element has attributes.
	 * @return {Boolean} True if the element has attributes or false if the
	 * element not has attributes.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	hasAttributes: () ->
	
	###*
	 * Returns the text of element.
	 * @return {String} The text of element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getTextContent: () ->
	
	###*
	 * Insert a element before this element.
	 * @param {hatemile.util.html.HTMLDOMElement} newElement The element that be
	 * inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	insertBefore: (newElement) ->
	
	###*
	 * Insert a element after this element.
	 * @param {hatemile.util.html.HTMLDOMElement} newElement The element that be
	 * inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	insertAfter: (newElement) ->
	
	###*
	 * Remove this element of the parser.
	 * @return {hatemile.util.html.HTMLDOMElement} The removed element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	removeElement: () ->
	
	###*
	 * Replace this element for other element.
	 * @param {hatemile.util.html.HTMLDOMElement} newElement The element that replace
	 * this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The element replaced.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	replaceElement: (newElement) ->
	
	###*
	 * Append a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	appendElement: (element) ->
	
	###*
	 * Prepend a element child.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element that be inserted.
	 * @return {hatemile.util.html.HTMLDOMElement} The element inserted.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	prependElement: (element) ->
	
	###*
	 * Returns the children of this element.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The children of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getChildren: () ->
	
	###*
	 * Append a text child.
	 * @param {String} text The text.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	appendText: (text) ->
	
	###*
	 * Prepend a text child.
	 * @param {String} text The text.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	prependText: (text) ->
	
	###*
	 * Returns if the element has children.
	 * @return {Boolean} True if the element has children or false if the element
	 * not has children.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	hasChildren: () ->
	
	###*
	 * Returns the parent element of this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The parent element of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getParentElement: () ->
	
	###*
	 * Returns the inner HTML code of this element.
	 * @return {String} The inner HTML code of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getInnerHTML: () ->
	
	###*
	 * Modify the inner HTML code of this element.
	 * @param {String} html The HTML code.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	setInnerHTML: (html) ->
	
	###*
	 * Returns the HTML code of this element.
	 * @return {String} The HTML code of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getOuterHTML: () ->
	
	###*
	 * Returns the native object of this element.
	 * @return {Object} The native object of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getData: () ->
	
	###*
	 * Modify the native object of this element.
	 * @param {Object} data The native object of this element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	setData: (data) ->
	
	###*
	 * Clone this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The clone.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	cloneElement: () ->
	
	###*
	 * Returns the first element child of this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The first element child of this
	 * element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getFirstElementChild: () ->
	
	###*
	 * Returns the last element child of this element.
	 * @return {hatemile.util.html.HTMLDOMElement} The last element child of this
	 * element.
	 * @memberof hatemile.util.html.HTMLDOMElement
	###
	getLastElementChild: () ->