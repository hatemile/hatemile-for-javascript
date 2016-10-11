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
 * @class HTMLDOMParser
 * @classdesc The HTMLDOMParser interface contains the methods for access a
 * native parser.
 * @memberof hatemile.util.html
###
class exports.hatemile.util.html.HTMLDOMParser
	
	###*
	 * Find all elements in the parser by selector.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	find: (selector) ->
	
	###*
	 * Find all elements in the parser by selector, children of found elements.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	findChildren: (selector) ->
	
	###*
	 * Find all elements in the parser by selector, descendants of found elements.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	findDescendants: (selector) ->
	
	###*
	 * Find all elements in the parser by selector, ancestors of found elements.
	 * @param {(String|hatemile.util.html.HTMLDOMElement)} selector The selector.
	 * @return {hatemile.util.html.HTMLDOMParser} The parser with the elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	findAncestors: (selector) ->
	
	###*
	 * Returns the first element found.
	 * @return {hatemile.util.html.HTMLDOMElement} The first element found or undefined
	 * if not have elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	firstResult: () ->
	
	###*
	 * Returns the last element found.
	 * @return {hatemile.util.html.HTMLDOMElement} The last element found or undefined
	 * if not have elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	lastResult: () ->
	
	###*
	 * Returns a list with all elements found.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The list with all elements found.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	listResults: () ->
	
	###*
	 * Create a element.
	 * @param {String} tag The tag of element.
	 * @return {hatemile.util.html.HTMLDOMElement} The element created.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	createElement: (tag) ->
	
	###*
	 * Returns the HTML code of parser.
	 * @return {String} The HTML code of parser.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	getHTML: () ->
	
	###*
	 * Returns the parser.
	 * @return {Object} The parser or root element of the parser.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	getParser: () ->
	
	###*
	 * Clear the memory of this object.
	 * @memberof hatemile.util.html.HTMLDOMParser
	###
	clearParser: () ->