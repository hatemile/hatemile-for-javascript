###
Copyright 2014 Carlson Santana Cruz

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
 * @namespace jqueryandvanilla
 * @memberof hatemile.util
###
exports.hatemile.util.jqueryandvanilla or= {}

class exports.hatemile.util.jqueryandvanilla.JQueryHTMLDOMParser
	
	###*
	 * Initializes a new object that encapsulate the jQuery.
	 * @class JQueryHTMLDOMParser
	 * @classdesc The class JQueryHTMLDOMParser is official implementation of
	 * HTMLDOMParser interface for the jQuery library.
	 * @extends hatemile.util.HTMLDOMParser
	 * @version 2014-07-23
	 * @memberof hatemile.util.jqueryandvanilla
	###
	constructor: (html) ->
		@root = jQuery(html)
		@results = undefined
	
	find: (selector) ->
		if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = @root.find(selector)
		return this
	
	findChildren: (selector) ->
		if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = jQuery(@results).children(selector)
		return this
	
	findDescendants: (selector) ->
		if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = jQuery(@results).find(selector)
		return this
	
	findAncestors: (selector) ->
		if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement)
			selector = selector.getData()
		@results = jQuery(@results).parents(selector)
		return this
	
	firstResult: () ->
		if isEmpty(@results)
			return undefined
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(@results.get(0))
	
	lastResult: () ->
		if isEmpty(@results)
			return undefined
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(@results.get(@results.length - 1))
	
	listResults: () ->
		array = []
		if not isEmpty(@results)
			for result in @results
				array.push(new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(result))
		return array
	
	createElement: (tag) ->
		return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(document.createElement(tag))
	
	getHTML: () ->
		return document.documentElement.outerHTML
	
	getParser: () ->
		return @root
	
	clearParser: () ->
		@results = undefined
		return