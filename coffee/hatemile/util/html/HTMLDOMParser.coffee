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
'use strict'

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.util
#
@hatemile.util or= {}

# @namespace hatemile.util.html
#
@hatemile.util.html or= {}

# The HTMLDOMParser interface contains the methods for access a native parser.
#
# @abstract
#
class @hatemile.util.html.HTMLDOMParser
  
  # Find elements in the parser.
  #
  # @overload find(selector)
  #   Find all elements in the parser by selector.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  #   found.
  #
  # @overload find(element)
  #   Find if a element is contained in parser.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the element, if
  #   the element is contained in parser.
  #
  find: (selector) ->
  
  # Find elements in the parser, children of found elements.
  #
  # @overload findChildren(selector)
  #   Find all elements in the parser by selector, children of found elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  #   found.
  #
  # @overload findChildren(child)
  #   Find if a element is a child of found elements.
  #   @param [hatemile.util.html.HTMLDOMElement] child The element.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the element, if
  #   the element is child of found elements.
  #
  findChildren: (selector) ->
  
  # Find elements in the parser, descendants of found elements.
  #
  # @overload findDescendants(selector)
  #   Find all elements in the parser by selector, descendants of found
  #   elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  #   found.
  #
  # @overload findDescendants(element)
  #   Find if a element is descendant of found elements.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the element, if
  #   the element is descendant of found elements.
  #
  findDescendants: (selector) ->
  
  # Find elements in the parser, ancestors of found elements.
  #
  # @overload findAncestors(selector)
  #   Find all elements in the parser by selector, ancestors of found elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  #   found.
  #
  # @overload findAncestors(element)
  #   Find if a element is ancestor of found elements.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @return [hatemile.util.html.HTMLDOMParser] The parser with the element, if
  #   the element is ancestor of found elements.
  #
  findAncestors: (selector) ->
  
  # Returns the first element found.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The first element found or null if not have elements found.
  #
  firstResult: () ->
  
  # Returns the last element found.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The last element found or null if not have elements found.
  #
  lastResult: () ->
  
  # Returns a list with all elements found.
  #
  # @return [Array<hatemile.util.html.HTMLDOMElement>] The list with all elements found.
  #
  listResults: () ->
  
  # Create a element.
  #
  # @param [string] tag The tag of element.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The element created.
  #
  createElement: (tag) ->
  
  # Returns the HTML code of parser.
  #
  # @return [string] The HTML code of parser.
  #
  getHTML: () ->
  
  # Returns the parser.
  #
  # @return [Object] The parser or root element of the parser.
  #
  getParser: () ->
  
  # Clear the memory of this object.
  #
  clearParser: () ->
