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

class @hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
	
	###*
	 * Initializes a new object that encapsulate the text node.
	 * @param {Text} data The native text node.
	 * @class The VanillaHTMLDOMTextNode class is official implementation of
	 * HTMLDOMTextNode interface for the Javascript.
	 * @implements {hatemile.util.html.HTMLDOMTextNode}
	 * @constructs hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
	###
	constructor: (@data) ->
	
	setTextContent: (text) ->
		@data.nodeValue = text
		return
	
	getTextContent: () ->
		return @data.nodeValue
	
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
	
	appendText: (text) ->
		@setTextContent("#{@getTextContent()}#{text}")
		return this
	
	prependText: (text) ->
		@setTextContent("#{text}#{@getTextContent()}")
		return this
	
	getParentElement: () ->
		if self.isEmpty(@data.parentNode)
			return undefined
		return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.parentNode)
	
	getData: () ->
		return @data
	
	setData: (data) ->
		@data = data
		return
	
	equals: (node) ->
		if node instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
			if @data is node.getData()
				return true
		return false
