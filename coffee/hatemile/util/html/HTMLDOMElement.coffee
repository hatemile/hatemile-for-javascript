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

# The HTMLDOMElement interface contains the methods for access the HTML element.
#
# @abstract
#
class @hatemile.util.html.HTMLDOMElement extends @hatemile.util.html.HTMLDOMNode
  
  # Returns the tag name of element.
  #
  # @return [string] The tag name of element in uppercase letters.
  #
  getTagName: () ->
  
  # Returns the value of a attribute.
  #
  # @param [string] name The name of attribute.
  #
  # @return [string] The value of the attribute.
  #
  getAttribute: (name) ->
  
  # Create or modify a attribute.
  #
  # @param [string] name The name of attribute.
  # @param [string] value The value of attribute.
  #
  setAttribute: (name, value) ->
  
  # Remove a attribute of element.
  #
  # @param [string] name The name of attribute.
  #
  removeAttribute: (name) ->
  
  # Check that the element has an attribute.
  #
  # @param [string] name The name of attribute.
  #
  # @return [boolean] True if the element has the attribute or false if the element not has the attribute.
  #
  hasAttribute: (name) ->
  
  # Check that the element has attributes.
  #
  # @return [boolean] True if the element has attributes or false if the element not has attributes.
  #
  hasAttributes: () ->
  
  # Append a element child.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element that be inserted.
  #
  # @return [hatemile.util.html.HTMLDOMElement] This element.
  #
  appendElement: (element) ->
  
  # Prepend a element child.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element that be inserted.
  #
  # @return [hatemile.util.html.HTMLDOMElement] This element.
  #
  prependElement: (element) ->
  
  # Returns the elements children of this element.
  #
  # @return [Array<hatemile.util.html.HTMLDOMElement>] The elements children of this element.
  #
  getChildrenElements: () ->
  
  # Returns the children of this element.
  #
  # @return [Array<hatemile.util.html.HTMLDOMNode>] The children of this element.
  #
  getChildren: () ->
    
  # Joins adjacent Text nodes.
  #
  # @return [hatemile.util.html.HTMLDOMElement} This element.
  #
  normalize: () ->
  
  # Check that the element has elements children.
  #
  # @return [boolean] True if the element has elements children or false if the element not has elements children.
  #
  hasChildrenElements: () ->
  
  # Check that the element has children.
  #
  # @return [boolean] True if the element has children or false if the element not has children.
  #
  hasChildren: () ->
  
  # Returns the inner HTML code of this element.
  #
  # @return [string] The inner HTML code of this element.
  #
  getInnerHTML: () ->
  
  # Returns the HTML code of this element.
  #
  # @return [string] The HTML code of this element.
  #
  getOuterHTML: () ->
  
  # Clone this element.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The clone.
  #
  cloneElement: () ->
  
  # Returns the first element child of this element.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The first element child of this element.
  #
  getFirstElementChild: () ->
  
  # Returns the last element child of this element.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The last element child of this element.
  #
  getLastElementChild: () ->
  
  # Returns the first node child of this element.
  #
  # @return [hatemile.util.html.HTMLDOMNode] The first node child of this element.
  #
  getFirstNodeChild: () ->
  
  # Returns the last node child of this element.
  #
  # @return [hatemile.util.html.HTMLDOMNode] The last node child of this element.
  #
  getLastNodeChild: () ->
