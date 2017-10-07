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
self = this

###*
 * @namespace hatemile
###
@hatemile or= {}

###*
 * @namespace hatemile.util
###
@hatemile.util or= {}

###*
 * @namespace hatemile.util.html
###
@hatemile.util.html or= {}

###*
 * @namespace hatemile.util.html.vanilla
###
@hatemile.util.html.vanilla or= {}

class @hatemile.util.html.vanilla.VanillaHTMLDOMElement
	
	###*
	 * Initializes a new object that encapsulate the HTMLElement.
	 * @param {HTMLElement} data The HTMLElement instance.
	 * @class The VanillaHTMLDOMElement class is official implementation of
	 * HTMLDOMElement interface for the Javascript.
	 * @implements {hatemile.util.html.HTMLDOMElement}
	 * @constructs hatemile.util.html.vanilla.VanillaHTMLDOMElement
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
		if not self.isEmpty(@data.textContent)
			return @data.textContent
		if not self.isEmpty(@data.innerText)
			return @data.innerText
		text = ''
		childs = @data.childNodes
		for child in childs
			if (child.nodeType is @data.ownerDocument.TEXT_NODE)
				text += child.nodeValue
			else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
				elementChild = new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child)
				text += elementChild.getTextContent()
		return text
	
	insertBefore: (newNode) ->
		@data.parentNode.insertBefore(newNode.getData(), @data)
		return this
	
	insertAfter: (newNode) ->
		parent = @data.parentNode
		childs = parent.childNodes
		found = false
		for child in childs
			if (found)
				parent.insertBefore(newNode.getData(), child)
				return
			else if (child is @data)
				found = true
		parent.appendChild(newNode.getData())
		return this
	
	removeNode: () ->
		@data.remove()
		return this
	
	replaceNode: (newNode) ->
		@data.parentNode.replaceChild(newNode.getData(), @data)
		return this
	
	appendElement: (element) ->
		@data.appendChild(element.getData())
		return this
	
	prependElement: (element) ->
		if self.isEmpty(@data.childNodes)
			@appendElement(element)
		else
			@data.insertBefore(element.getData(), @data.childNodes[0])
		return this
	
	getChildrenElements: () ->
		children = @data.children
		array = []
		for child in children
			array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child))
		return array
	
	getChildren: () ->
		children = @data.childNodes
		array = []
		for child in children
			if (child.nodeType is @data.ownerDocument.TEXT_NODE)
				array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child))
			else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
				array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child))
		return array
	
	appendText: (text) ->
		child = @getLastNodeChild()
		if (child isnt undefined) and (child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode)
			child.appendText(text)
		else
			@data.appendChild(@data.ownerDocument.createTextNode(text))
		return this
	
	prependText: (text) ->
		if (not @hasChildren())
			@appendText(text)
		else
			child = @getFirstNodeChild()
			if child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
				child.prependText(text)
			else
				@data.insertBefore(@data.ownerDocument.createTextNode(text), child.getData())
		return this
	
	normalize: () ->
		if (@data.normalize)
			@data.normalize()
		return this
	
	hasChildrenElements: () ->
		return not self.isEmpty(@data.children)
	
	hasChildren: () ->
		if not @data.hasChildNodes()
			return false
		else
			children = @data.childNodes
			for child in children
				if (child.nodeType is @data.ownerDocument.TEXT_NODE) or (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
					return true
			return false
	
	getParentElement: () ->
		if @getTagName() is 'HTML'
			return undefined
		else if self.isEmpty(@data.parentNode)
			return undefined
		return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.parentNode)
	
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
		return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(div.firstElementChild)
	
	getFirstElementChild: () ->
		if not @hasChildrenElements()
			return undefined
		return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.firstElementChild)
	
	getLastElementChild: () ->
		if not @hasChildrenElements()
			return undefined
		return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.lastElementChild)
	
	getFirstNodeChild: () ->
		if not @hasChildren()
			return undefined
		children = @data.childNodes
		for child in children
			if (child.nodeType is @data.ownerDocument.TEXT_NODE)
				return new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child)
			else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
				return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child)
		return undefined
	
	getLastNodeChild: () ->
		if not @hasChildren()
			return undefined
		children = @data.childNodes
		lastChild = undefined
		for child in children
			if ((child.nodeType is @data.ownerDocument.TEXT_NODE) or (child.nodeType is @data.ownerDocument.ELEMENT_NODE))
				lastChild = child
		if lastChild == undefined
			return undefined
		else if (lastChild.nodeType is @data.ownerDocument.TEXT_NODE)
			return new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(lastChild)
		else if (lastChild.nodeType is @data.ownerDocument.ELEMENT_NODE)
			return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(lastChild)
	
	equals: (node) ->
		if node instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement
			if @data is node.getData()
				return true
		return false
