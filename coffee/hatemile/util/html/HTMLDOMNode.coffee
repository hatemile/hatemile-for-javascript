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

# The HTMLDOMNode interface contains the methods for access the Node.
#
# @abstract
#
class @hatemile.util.html.HTMLDOMNode
  
  # Returns the text content of node.
  #
  # @return [string] The text content of node.
  #
  getTextContent: () ->
  
  # Insert a node before this node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that be inserted.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  insertBefore: (newNode) ->
  
  # Insert a node after this node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that be inserted.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  insertAfter: (newNode) ->
  
  # Remove this node of the parser.
  #
  # @return [hatemile.util.html.HTMLDOMNode] The removed node.
  #
  removeNode: () ->
  
  # Replace this node for other node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that replace this node.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  replaceNode: (newNode) ->
  
  # Append a text content in node.
  #
  # @param [string] text The text content.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  appendText: (text) ->
  
  # Prepend a text content in node.
  #
  # @param [string] text The text content.
  #
  # @return [hatemile.util.html.HTMLDOMNode] This node.
  #
  prependText: (text) ->
  
  # Returns the parent element of this node.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The parent element of this node.
  #
  getParentElement: () ->
  
  # Returns the native object of this node.
  #
  # @return [Object] The native object of this node.
  #
  getData: () ->
  
  # Modify the native object of this node.
  #
  # @param [Object] data The native object of this node.
  #
  setData: (data) ->
  
  # Indicates whether some other object is equal to this one.
  #
  # @param [Object] node The reference object with which to compare.
  #
  # @return [boolean] True if the node is the other object is equals to this one or if the node is not the other object is equals to this one.
  #
  equals: (node) ->
