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

# The class JQueryHTMLDOMParser is official implementation of HTMLDOMParser
# interface for the jQuery library.
#
# @extend hatemile.util.html.HTMLDOMParser
#
class @hatemile.util.html.jquery.JQueryHTMLDOMParser
  
  # Initializes a new object that encapsulate the jQuery.
  #
  # @param [string, HTMLDocument] html The html code or owner document.
  # @param [HTMLDocument] ownerDocument The owner document of parser.
  #
  constructor: (html, ownerDocument) ->
    @root = jQuery(html)
    @results = undefined
    if (not self.isEmpty(ownerDocument))
      @ownerDocument = ownerDocument
    else if (not self.isEmpty(html.ownerDocument))
      @ownerDocument = html.ownerDocument
    else
      @ownerDocument = document
  
  # Find all elements in the parser by selector.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with the
  # elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#find
  #
  find: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = @root.find(selector)
    return this
  
  # Find all elements in the parser by selector, children of found elements.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with the
  # elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#findChildren
  #
  findChildren: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = jQuery(@results).children(selector)
    return this
  
  # Find all elements in the parser by selector, descendants of found elements.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with the
  # elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#findDescendants
  #
  findDescendants: (selector) ->
    if (selector instanceof self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement)
      selector = selector.getData()
    @results = jQuery(@results).find(selector)
    return this
  
  # Find all elements in the parser by selector, ancestors of found elements.
  #
  # @param [string, hatemile.util.html.HTMLDOMElement] selector The selector.
  #
  # @return [hatemile.util.html.jquery.JQueryHTMLDOMParser] The parser with the
  # elements found.
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
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The first element
  # found or undefined if not have elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#firstResult
  #
  firstResult: () ->
    if self.isEmpty(@results)
      return undefined
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@results.get(0))
  
  # Returns the last element found.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The last element
  # found or undefined if not have elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#lastResult
  #
  lastResult: () ->
    if self.isEmpty(@results)
      return undefined
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@results.get(@results.length - 1))
  
  # Returns a list with all elements found.
  #
  # @return [Array<hatemile.util.html.vanilla.VanillaHTMLDOMElement>] The list
  # with all elements found.
  #
  # @see hatemile.util.html.HTMLDOMParser#listResults
  #
  listResults: () ->
    array = []
    if not self.isEmpty(@results)
      for result in @results
        array.push(new self.hatemile.util.html.vanilla
            .VanillaHTMLDOMElement(result))
    return array
  
  # Create a element.
  #
  # @param [string] tag The tag of element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The element
  # created.
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
  # @return [object] The parser or root element of the parser.
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
    @results = undefined
    return
