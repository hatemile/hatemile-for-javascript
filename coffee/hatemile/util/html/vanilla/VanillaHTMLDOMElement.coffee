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
 * @namespace vanilla
 * @memberof hatemile.util.html
###
exports.hatemile.util.html.vanilla or= {}

###*
 * @class VanillaHTMLDOMElement
 * @classdesc The VanillaHTMLDOMElement class is official implementation of
 * HTMLDOMElement interface for the Javascript.
 * @extends hatemile.util.html.HTMLDOMElement
 * @memberof hatemile.util.html.vanilla
###
class exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement
	
	###*
	 * Initializes a new object that encapsulate the HTMLElement.
	 * @param {HTMLElement} data The native element.
	 * @memberof hatemile.util.html.vanilla.VanillaHTMLDOMElement
	###
	constructor: (@data) ->
	
	getTagName: () ->
		return @data.tagName.toUpperCase()
	
	getAttribute: (name) ->
		if @hasAttribute(name)
			return @data.getAttribute(name)
		else
			return null
	
	setAttribute: (name, value) ->
		@data.setAttribute(name, value)
		return
	
	removeAttribute: (name) ->
		if @hasAttribute(name)
			@data.removeAttribute(name)
		return
	
	hasAttribute: (name) ->
		return @data.hasAttribute(name)
	
	hasAttributes: () ->
		return @data.hasAttributes()
	
	getTextContent: () ->
		if not isEmpty(@data.textContent)
			return @data.textContent
		if not isEmpty(@data.innerText)
			return @data.innerText
		text = ''
		childs = @data.childNodes
		for child in childs
			if (child.nodeType is @data.ownerDocument.TEXT_NODE)
				text += child.nodeValue
			else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
				elementChild = new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child)
				text += elementChild.getTextContent()
		return text
	
	insertBefore: (newElement) ->
		parent = @data.parentNode
		parent.insertBefore(newElement.getData(), @data)
		return newElement
	
	insertAfter: (newElement) ->
		parent = @data.parentNode
		childs = parent.childNodes
		found = false
		for child in childs
			if (found)
				parent.insertBefore(newElement.getData(), child)
				return
			else if (child is @data)
				found = true
		parent.appendChild(newElement.getData())
		return newElement
	
	removeElement: () ->
		@data.remove()
		return this
	
	replaceElement: (newElement) ->
		parent = @data.parentNode
		parent.replaceChild(newElement.getData(), @data)
		return newElement
	
	appendElement: (element) ->
		@data.appendChild(element.getData())
		return element
	
	prependElement: (element) ->
		if isEmpty(@data.childNodes)
			@appendElement(element)
		else
			firstChildNode = @data.childNodes[0]
			@data.insertBefore(element.getData(), firstChildNode)
		return element
	
	getChildren: () ->
		children = @data.children
		array = []
		for child in children
			array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child))
		return array
	
	appendText: (text) ->
		@data.appendChild(@data.ownerDocument.createTextNode(text))
		return
	
	prependText: (text) ->
		if isEmpty(@data.childNodes)
			appendText(text)
		else
			firstChildNode = @data.childNodes[0]
			@data.insertBefore(document.createTextNode(text), firstChildNode)
		return element
	
	hasChildren: () ->
		return not isEmpty(@data.children)
	
	getParentElement: () ->
		if isEmpty(@data.parentNode)
			return undefined
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.parentNode)
	
	getInnerHTML: () ->
		return @data.innerHTML
	
	setInnerHTML: (html) ->
		@data.innerHTML = html
		return
	
	getOuterHTML: () ->
		return @data.outerHTML
	
	getData: () ->
		return @data
	
	setData: (data) ->
		@data = data
		return
	
	cloneElement: () ->
		div = @data.ownerDocument.createElement('div')
		div.innerHTML = @getOuterHTML()
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(div.firstElementChild)
	
	getFirstElementChild: () ->
		if not @hasChildren
			return undefined
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.firstElementChild)
	
	getLastElementChild: () ->
		if not @hasChildren
			return undefined
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.lastElementChild)