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
 * @namespace jquery
 * @memberof hatemile.util
###
exports.hatemile.util.html.jquery or= {}

###*
 * @class JQueryHTMLDOMParser
 * @classdesc The class JQueryHTMLDOMParser is official implementation of
 * HTMLDOMParser interface for the jQuery library.
 * @extends hatemile.util.html.HTMLDOMParser
 * @memberof hatemile.util.html.jquery
###
class exports.hatemile.util.html.jquery.JQueryHTMLDOMParser
	
	###*
	 * Initializes a new object that encapsulate the jQuery.
	 * @memberof hatemile.util.html.jquery.JQueryHTMLDOMParser
	###
	constructor: (html, ownerDocument) ->
		@root = jQuery(html)
		@results = undefined
		if (not isEmpty(ownerDocument))
			@ownerDocument = ownerDocument
		else if (not isEmpty(html.ownerDocument))
			@ownerDocument = html.ownerDocument
		else
			@ownerDocument = document
	
	find: (selector) ->
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = @root.find(selector)
		return this
	
	findChildren: (selector) ->
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = jQuery(@results).children(selector)
		return this
	
	findDescendants: (selector) ->
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = jQuery(@results).find(selector)
		return this
	
	findAncestors: (selector) ->
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = jQuery(@results).parents(selector)
		return this
	
	firstResult: () ->
		if isEmpty(@results)
			return undefined
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@results.get(0))
	
	lastResult: () ->
		if isEmpty(@results)
			return undefined
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@results.get(@results.length - 1))
	
	listResults: () ->
		array = []
		if not isEmpty(@results)
			for result in @results
				array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(result))
		return array
	
	createElement: (tag) ->
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(@ownerDocument.createElement(tag))
	
	getHTML: () ->
		return @ownerDocument.documentElement.outerHTML
	
	getParser: () ->
		return @root
	
	clearParser: () ->
		@results = undefined
		return