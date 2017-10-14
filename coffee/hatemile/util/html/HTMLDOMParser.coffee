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
  
  # Find all elements in the parser by selector.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  # found.
  #
  find: (selector) ->
  
  # Find all elements in the parser by selector, children of found elements.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  # found.
  #
  findChildren: (selector) ->
  
  # Find all elements in the parser by selector, descendants of found elements.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  # found.
  #
  findDescendants: (selector) ->
  
  # Find all elements in the parser by selector, ancestors of found elements.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.HTMLDOMParser] The parser with the elements
  # found.
  #
  findAncestors: (selector) ->
  
  # Returns the first element found.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The first element found or
  # undefined if not have elements found.
  #
  firstResult: () ->
  
  # Returns the last element found.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The last element found or
  # undefined if not have elements found.
  #
  lastResult: () ->
  
  # Returns a list with all elements found.
  #
  # @return [Array<hatemile.util.html.HTMLDOMElement>] The list with all
  # elements found.
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
  # @return [object] The parser or root element of the parser.
  #
  getParser: () ->
  
  # Clear the memory of this object.
  #
  clearParser: () ->
