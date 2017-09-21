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
 * @namespace hatemile.util.html.vanilla
###
__exports.hatemile.util.html.vanilla or= {}

class __exports.hatemile.util.html.vanilla.VanillaHTMLDOMParser
	
	###*
	 * Check that the element is descendant of other.
	 * @param {hatemile.util.html.HTMLDOMElement} possibleAncestor The possible
	 * ancestor.
	 * @param {hatemile.util.html.HTMLDOMElement} possibleDescendant The possible
	 * descendant.
	 * @returns {boolean} True if the element is descendant of other or false if
	 * the element is not descendant of other.
	 * @private
	 * @function hatemile.util.html.vanilla.VanillaHTMLDOMParser.isDescendant
	###
	isDescendant = (possibleAncestor, possibleDescendant) ->
		ancestor = possibleDescendant.parentNode
		while not isEmpty(ancestor)
			if ancestor is possibleAncestor
				return true
			ancestor = ancestor.parentNode
		return false
	
	###*
	 * Initializes a new object that encapsulate the HTMLDocument.
	 * @param {HTMLDocument} ownerDocument The owner document of parser.
	 * @class The class VanillaHTMLDOMParser is official implementation of
	 * HTMLDOMParser interface for JavaScript.
	 * @implements {hatemile.util.html.HTMLDOMParser}
	 * @constructs hatemile.util.html.vanilla.VanillaHTMLDOMParser
	###
	constructor: (@ownerDocument) ->
		@results = []
	
	find: (selector) ->
		if (selector instanceof __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			@results = [selector.getData()]
		else
			@results = @ownerDocument.querySelectorAll(selector)
		return this
	
	findChildren: (selector) ->
		children = []
		if (selector instanceof __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			for result in @results
				for resultChild in result.children
					if selector.getData() is resultChild
						children.push(selector.getData())
						break
				if not isEmpty(children)
					break
		else
			for result in @results
				descendants = result.querySelectorAll(selector)
				for descendant in descendants
					if descendant.parentNode is result
						children.push(descendant)
		@results = children
		return this
	
	findDescendants: (selector) ->
		descendants = []
		if (selector instanceof __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			for result in @results
				if isDescendant(result, selector.getData())
					descendants.push(selector.getData())
					break
		else
			for result in @results
				resultDescendants = result.querySelectorAll(selector)
				for resultDescendant in resultDescendants
					descendants.push(resultDescendant)
		@results = descendants
		return this
	
	findAncestors: (selector) ->
		ancestors = []
		if (selector instanceof __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			for result in @results
				if isDescendant(selector.getData(), result)
					ancestors.push(selector.getData())
					break
		else
			elements = @ownerDocument.querySelectorAll(selector)
			for result in @results
				for element in elements
					if isDescendant(element, result)
						ancestors.push(element)
		@results = ancestors
		return this
	
	firstResult: () ->
		if isEmpty(@results)
			return undefined
		return new __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@results[0])
	
	lastResult: () ->
		if isEmpty(@results)
			return undefined
		return new __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@results[@results.length - 1])
	
	listResults: () ->
		array = []
		for result in @results
			array.push(new __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(result))
		return array
	
	createElement: (tag) ->
		return new __exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@ownerDocument.createElement(tag))
	
	getHTML: () ->
		return @ownerDocument.documentElement.outerHTML
	
	getParser: () ->
		return @ownerDocument
	
	clearParser: () ->
		@results = []
		return