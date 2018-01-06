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

self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.util
#
@hatemile.util or= {}

# @namespace hatemile.util.html
#
@hatemile.util.html or= {}

# @namespace hatemile.util.html.vanilla
#
@hatemile.util.html.vanilla or= {}

# The class VanillaHTMLDOMParser is official implementation of
# {hatemile.util.html.HTMLDOMParser} interface for JavaScript.
#
# @extend hatemile.util.html.HTMLDOMParser
#
class @hatemile.util.html.vanilla.VanillaHTMLDOMParser
  
  # Check that the element is descendant of other.
  #
  # @private
  #
  # @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] possibleAncestor The possible ancestor.
  # @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] possibleDescendant The possible descendant.
  #
  # @return [boolean] True if the element is descendant of other or false if the element is not descendant of other.
  #
  _isDescendant = (possibleAncestor, possibleDescendant) ->
    ancestor = possibleDescendant.parentNode
    while (ancestor isnt undefined) and (ancestor isnt null)
      if ancestor is possibleAncestor
        return true
      ancestor = ancestor.parentNode
    return false
  
  # Initializes a new object that encapsulate the HTMLDocument.
  #
  # @param [HTMLDocument] ownerDocument The owner document of parser.
  #
  constructor: (@ownerDocument) ->
    @results = []
  
  # Find elements in the parser.
  #
  # @overload find(selector)
  #   Find all elements in the parser by selector.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload find(element)
  #   Find if a element is contained in parser.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] element The
  #   element.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the element, if the element is contained in parser.
  #
  # @see hatemile.util.html.HTMLDOMParser#find
  #
  find: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      @results = [selector.getData()]
    else
      @results = @ownerDocument.querySelectorAll(selector)
    return this
  
  # Find elements in the parser, children of found elements.
  #
  # @overload findChildren(selector)
  #   Find all elements in the parser by selector, children of found elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload findChildren(child)
  #   Find if a element is a child of found elements.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] child The
  #   element.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the element, if the element is child of found elements.
  #
  # @see hatemile.util.html.HTMLDOMParser#findChildren
  #
  findChildren: (selector) ->
    children = []
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      for result in @results
        for resultChild in result.children
          if selector.getData() is resultChild
            children.push(selector.getData())
            break
        if children.length > 0
          break
    else
      for result in @results
        descendants = result.querySelectorAll(selector)
        for descendant in descendants
          if descendant.parentNode is result
            children.push(descendant)
    @results = children
    return this
  
  # Find elements in the parser, descendants of found elements.
  #
  # @overload findDescendants(selector)
  #   Find all elements in the parser by selector, descendants of found
  #   elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload findDescendants(element)
  #   Find if a element is descendant of found elements.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] element The
  #   element.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the element, if the element is descendant of found elements.
  #
  # @see hatemile.util.html.HTMLDOMParser#findDescendants
  #
  findDescendants: (selector) ->
    descendants = []
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      for result in @results
        if _isDescendant(result, selector.getData())
          descendants.push(selector.getData())
          break
    else
      for result in @results
        resultDescendants = result.querySelectorAll(selector)
        for resultDescendant in resultDescendants
          descendants.push(resultDescendant)
    @results = descendants
    return this
  
  # Find elements in the parser, ancestors of found elements.
  #
  # @overload findAncestors(selector)
  #   Find all elements in the parser by selector, ancestors of found elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload findAncestors(element)
  #   Find if a element is ancestor of found elements.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] element The
  #   element.
  #   @return [hatemile.util.html.vanilla.VanillaHTMLDOMParser] The parser with
  #   the element, if the element is ancestor of found elements.
  #
  # @see hatemile.util.html.HTMLDOMParser#findAncestors
  #
  findAncestors: (selector) ->
    ancestors = []
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      for result in @results
        if _isDescendant(selector.getData(), result)
          ancestors.push(selector.getData())
          break
    else
      elements = @ownerDocument.querySelectorAll(selector)
      for result in @results
        for element in elements
          if _isDescendant(element, result)
            ancestors.push(element)
    @results = ancestors
    return this
  
  # Returns the first element found.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The first element found or null if not have elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#firstResult
  #
  firstResult: () ->
    if @results.length is 0
      return null
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@results[0])
  
  # Returns the last element found.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The last element found or null if not have elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#lastResult
  #
  lastResult: () ->
    if @results.length is 0
      return null
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@results[@results.length - 1])
  
  # Returns a list with all elements found.
  #
  # @return [Array<hatemile.util.html.vanilla.VanillaHTMLDOMElement>] The list with all elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#listResults
  #
  listResults: () ->
    array = []
    for result in @results
      array.push(new self.hatemile.util.html.vanilla
          .VanillaHTMLDOMElement(result))
    return array
  
  # Create a element.
  #
  # @param [string] tag The tag of element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The element created.
  #
  # @see hatemile.util.html.HTMLDOMParser#createElement
  #
  createElement: (tag) ->
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@ownerDocument.createElement(tag))
  
  # Returns the HTML code of parser.
  #
  # @return [string] The HTML code of parser.
  #
  # @see hatemile.util.html.HTMLDOMParser#getHTML
  #
  getHTML: () ->
    return @ownerDocument.documentElement.outerHTML
  
  # Returns the parser.
  #
  # @return [HTMLDocument] The parser or root element of the parser.
  #
  # @see hatemile.util.html.HTMLDOMParser#getParser
  #
  getParser: () ->
    return @ownerDocument
  
  # Clear the memory of this object.
  #
  # @see hatemile.util.html.HTMLDOMParser#clearParser
  #
  clearParser: () ->
    @results = []
    return
