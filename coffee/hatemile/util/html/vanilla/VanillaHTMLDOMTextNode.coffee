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

# The VanillaHTMLDOMTextNode class is official implementation of
# {hatemile.util.html.HTMLDOMTextNode} interface for the Javascript.
#
# @extend hatemile.util.html.HTMLDOMTextNode
#
class @hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
  
  # Initializes a new object that encapsulate the text node.
  #
  # @param [Text] data The native text node.
  #
  constructor: (@data) ->
  
  # Change the text content of text node.
  #
  # @param [string] text The new text content.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#setTextContent
  #
  setTextContent: (text) ->
    @data.nodeValue = text
    return
  
  # Returns the text content of node.
  #
  # @return [string] The text content of node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#getTextContent
  #
  getTextContent: () ->
    return @data.nodeValue
  
  # Insert a node before this node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that be inserted.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#insertBefore
  #
  insertBefore: (newNode) ->
    @data.parentNode.insertBefore(newNode.getData(), @data)
    return this
  
  # Insert a node after this node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that be inserted.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#insertAfter
  #
  insertAfter: (newNode) ->
    parent = @data.parentNode
    childs = parent.childNodes
    found = false
    for child in childs
      if (found)
        parent.insertBefore(newNode.getData(), child)
        return
      else if (child is @data)
        found = true
    parent.appendChild(newNode.getData())
    return this
  
  # Remove this node of the parser.
  #
  # @return [hatemile.util.html.HTMLDOMNode] The removed node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#removeNode
  #
  removeNode: () ->
    @data.remove()
    return this
  
  # Replace this node for other node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that replace this node.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#replaceNode
  #
  replaceNode: (newNode) ->
    @data.parentNode.replaceChild(newNode.getData(), @data)
    return this
  
  # Append a text content in node.
  #
  # @param [string] text The text content.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#appendText
  #
  appendText: (text) ->
    @setTextContent("#{@getTextContent()}#{text}")
    return this
  
  # Prepend a text content in node.
  #
  # @param [string] text The text content.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#prependText
  #
  prependText: (text) ->
    @setTextContent("#{text}#{@getTextContent()}")
    return this
  
  # Returns the parent element of this node.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The parent element of this node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#getParentElement
  #
  getParentElement: () ->
    parentNode = @data.parentNode
    if (parentNode is undefined) or (parentNode is null)
      return null
    return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(parentNode)
  
  # Returns the native object of this node.
  #
  # @return [Text] The native object of this node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#getData
  #
  getData: () ->
    return @data
  
  # Modify the native object of this node.
  #
  # @param [Text] data The native object of this node.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#setData
  #
  setData: (data) ->
    @data = data
    return
  
  # Indicates whether some other object is equal to this one.
  #
  # @param [Object] node The reference object with which to compare.
  #
  # @return [boolean] True if the node is the other object is equals to this one or if the node is not the other object is equals to this one.
  #
  # @see hatemile.util.html.HTMLDOMTextNode#equals
  #
  equals: (node) ->
    if node instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
      if @data is node.getData()
        return true
    return false
