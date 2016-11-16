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

class exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
	
	constructor: (@data) ->
	
	setTextContent: (text) ->
		@data.nodeValue = text
	
	getTextContent: () ->
		return @data.nodeValue
	
	insertBefore: (newNode) ->
		parent = @data.parentNode
		parent.insertBefore(newNode.getData(), @data)
		return newElement
	
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
		return newElement
	
	removeNode: () ->
		@data.remove()
		return this
	
	replaceNode: (newElement) ->
		parent = @data.parentNode
		parent.replaceChild(newElement.getData(), @data)
		return newElement
	
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
	
	getParentElement: () ->
		if isEmpty(@data.parentNode)
			return undefined
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@data.parentNode)
	
	getData: () ->
		return @data
	
	setData: (data) ->
		@data = data
		return
	
	equals: (node) ->
		if node instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
			if @data is node.getData()
				return true
		return false