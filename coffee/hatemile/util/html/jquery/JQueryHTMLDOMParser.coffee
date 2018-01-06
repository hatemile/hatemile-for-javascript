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

# @namespace hatemile.util.html.jquery
#
@hatemile.util.html.jquery or= {}

# The class JQueryHTMLDOMParser is official implementation of
# {hatemile.util.html.HTMLDOMParser} interface for the jQuery library.
#
# @extend hatemile.util.html.HTMLDOMParser
#
class @hatemile.util.html.jquery.JQueryHTMLDOMParser
  
  # Initializes a new object that encapsulate the jQuery.
  #
  # @overload constructor(htmlCode)
  #   Initializes a new object that manipulate the HTML code with jQuery and
  #   document object.
  #   @param [string] htmlCode The html code.
  #
  # @overload constructor(doc)
  #   Initializes a new object that manipulate the page with jQuery and document
  #   object.
  #   @param [HTMLDocument] doc The document object of page.
  #
  # @overload constructor(htmlCode, ownerDocument)
  #   Initializes a new object that manipulate the HTML code with jQuery and
  #   ownerDocument object.
  #   @param [string] htmlCode The html code.
  #   @param [HTMLDocument] ownerDocument The owner document of parser.
  #
  # @overload constructor(doc, ownerDocument)
  #   Initializes a new object that manipulate the page with jQuery and
  #   ownerDocument object.
  #   @param [HTMLDocument] doc The document object of page.
  #   @param [HTMLDocument] ownerDocument The owner document of parser.
  #
  constructor: (html, ownerDocument) ->
    @root = jQuery(html)
    @results = []
    if ownerDocument isnt undefined
      @ownerDocument = ownerDocument
    else if html.ownerDocument isnt undefined
      @ownerDocument = html.ownerDocument
    else
      @ownerDocument = document
  
  # Find elements in the parser.
  #
  # @overload find(selector)
  #   Find all elements in the parser by selector.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload find(element)
  #   Find if a element is contained in parser.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] element The
  #   element.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the element, if the element is contained in parser.
  #
  # @see hatemile.util.html.HTMLDOMParser#find
  #
  find: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = @root.find(selector)
    return this
  
  # Find elements in the parser, children of found elements.
  #
  # @overload findChildren(selector)
  #   Find all elements in the parser by selector, children of found elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload findChildren(child)
  #   Find if a element is a child of found elements.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] child The
  #   element.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the element, if the element is child of found elements.
  #
  # @see hatemile.util.html.HTMLDOMParser#findChildren
  #
  findChildren: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = jQuery(@results).children(selector)
    return this
  
  # Find elements in the parser, descendants of found elements.
  #
  # @overload findDescendants(selector)
  #   Find all elements in the parser by selector, descendants of found
  #   elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload findDescendants(element)
  #   Find if a element is descendant of found elements.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] element The
  #   element.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the element, if the element is descendant of found elements.
  #
  # @see hatemile.util.html.HTMLDOMParser#findDescendants
  #
  findDescendants: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = jQuery(@results).find(selector)
    return this
  
  # Find elements in the parser, ancestors of found elements.
  #
  # @overload findAncestors(selector)
  #   Find all elements in the parser by selector, ancestors of found elements.
  #   @param [string] selector The selector.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the elements found.
  #
  # @overload findAncestors(element)
  #   Find if a element is ancestor of found elements.
  #   @param [hatemile.util.html.vanilla.VanillaHTMLDOMElement] element The
  #   element.
  #   @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with
  #   the element, if the element is ancestor of found elements.
  #
  # @see hatemile.util.html.HTMLDOMParser#findAncestors
  #
  findAncestors: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = jQuery(@results).parents(selector)
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
        .VanillaHTMLDOMElement(@results.get(0))
  
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
        .VanillaHTMLDOMElement(@results.get(@results.length - 1))
  
  # Returns a list with all elements found.
  #
  # @return [Array<hatemile.util.html.vanilla.VanillaHTMLDOMElement>] The list with all elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#listResults
  #
  listResults: () ->
    array = []
    if @results.length > 0
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
  # @return [Object] The parser or root element of the parser.
  #
  # @see hatemile.util.html.HTMLDOMParser#getParser
  #
  getParser: () ->
    return @root
  
  # Clear the memory of this object.
  #
  # @see hatemile.util.html.HTMLDOMParser#clearParser
  #
  clearParser: () ->
    @results = []
    return
