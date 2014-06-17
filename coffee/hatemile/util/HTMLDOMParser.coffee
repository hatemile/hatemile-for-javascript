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
 * @class HTMLDOMParser
 * @classdesc The HTMLDOMParser interface contains the methods for access a
 * native parser.
 * @version 1.0
 * @memberof hatemile.util
###
class exports.hatemile.util.HTMLDOMParser
	
	###*
	 * Find all elements in the parser by selector.
	 * @param {(String|hatemile.util.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	find: (selector) ->
	
	###*
	 * Find all elements in the parser by selector, children of
	 * found elements.
	 * @param {(String|hatemile.util.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	findChildren: (selector) ->
	
	###*
	 * Find all elements in the parser by selector, descendants of
	 * found elements.
	 * @param {(String|hatemile.util.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	findDescendants: (selector) ->
	
	###*
	 * Find all elements in the parser by selector, ancestors of
	 * found elements.
	 * @param {(String|hatemile.util.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	findAncestors: (selector) ->
	
	###*
	 * Returns the first element found.
	 * @return {hatemile.util.HTMLDOMElement} The first element found or null
	 * if not have elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	firstResult: () ->
	
	###*
	 * Returns the last element found.
	 * @return {hatemile.util.HTMLDOMElement} The last element found or null
	 * if not have elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	lastResult: () ->
	
	###*
	 * Returns a list with all elements found.
	 * @return {hatemile.util.HTMLDOMElement[]} The list with all elements found.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	listResults: () ->
	
	###*
	 * Create a element.
	 * @param {String} tag The tag of element.
	 * @return {hatemile.util.HTMLDOMElement} The elemente created.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	createElement: (tagName) ->
	
	###*
	 * Returns the HTML code of parser.
	 * @return {String} The HTML code of parser.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	getHTML: () ->
	
	###*
	 * Clear the memory of this object.
	 * @memberof hatemile.util.HTMLDOMParser
	###
	clearParser: () ->