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

# The VanillaHTMLDOMElement class is official implementation of
# {hatemile.util.html.HTMLDOMElement} interface for the Javascript.
#
# @extend hatemile.util.html.HTMLDOMElement
#
class @hatemile.util.html.vanilla.VanillaHTMLDOMElement
  
  # Initializes a new object that encapsulate the HTMLElement.
  #
  # @param [HTMLElement] data The HTMLElement instance.
  #
  constructor: (@data) ->
  
  # Returns the tag name of element.
  #
  # @return [string] The tag name of element in uppercase letters.
  #
  # @see hatemile.util.html.HTMLDOMElement#getTagName
  #
  getTagName: () ->
    return @data.tagName.toUpperCase()
  
  # Returns the value of a attribute.
  #
  # @param [string] name The name of attribute.
  #
  # @return [string] The value of the attribute.
  #
  # @see hatemile.util.html.HTMLDOMElement#getAttribute
  #
  getAttribute: (name) ->
    if @hasAttribute(name)
      return @data.getAttribute(name)
    else
      return null
  
  # Create or modify a attribute.
  #
  # @param [string] name The name of attribute.
  # @param [string] value The value of attribute.
  #
  # @see hatemile.util.html.HTMLDOMElement#setAttribute
  #
  setAttribute: (name, value) ->
    @data.setAttribute(name, value)
    return
  
  # Remove a attribute of element.
  #
  # @param [string] name The name of attribute.
  #
  # @see hatemile.util.html.HTMLDOMElement#removeAttribute
  #
  removeAttribute: (name) ->
    if @hasAttribute(name)
      @data.removeAttribute(name)
    return
  
  # Check that the element has an attribute.
  #
  # @param [string] name The name of attribute.
  #
  # @return [boolean] True if the element has the attribute or false if the element not has the attribute.
  #
  # @see hatemile.util.html.HTMLDOMElement#hasAttribute
  #
  hasAttribute: (name) ->
    return @data.hasAttribute(name)
  
  # Check that the element has attributes.
  #
  # @return [boolean] True if the element has attributes or false if the element not has attributes.
  #
  # @see hatemile.util.html.HTMLDOMElement#hasAttributes
  #
  hasAttributes: () ->
    return @data.hasAttributes()
  
  # Returns the text content of node.
  #
  # @return [string] The text content of node.
  #
  # @see hatemile.util.html.HTMLDOMElement#getTextContent
  #
  getTextContent: () ->
    if @data.textContent isnt undefined
      return @data.textContent
    if @data.innerText isnt undefined
      return @data.innerText
    text = ''
    childs = @data.childNodes
    for child in childs
      if (child.nodeType is @data.ownerDocument.TEXT_NODE)
        text += child.nodeValue
      else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
        elementChild = new self.hatemile.util.html.vanilla
            .VanillaHTMLDOMElement(child)
        text += elementChild.getTextContent()
    return text
  
  # Insert a node before this element.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that be inserted.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#insertBefore
  #
  insertBefore: (newNode) ->
    @data.parentNode.insertBefore(newNode.getData(), @data)
    return this
  
  # Insert a node after this element.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that be inserted.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#insertAfter
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
  
  # Remove this element of the parser.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#removeNode
  #
  removeNode: () ->
    @data.remove()
    return this
  
  # Replace this element for other node.
  #
  # @param [hatemile.util.html.HTMLDOMNode] newNode The node that replace this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#replaceNode
  #
  replaceNode: (newNode) ->
    @data.parentNode.replaceChild(newNode.getData(), @data)
    return this
  
  # Append a element child.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element that be inserted.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#appendElement
  #
  appendElement: (element) ->
    @data.appendChild(element.getData())
    return this
  
  # Prepend a element child.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element that be inserted.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#prependElement
  #
  prependElement: (element) ->
    if @data.childNodes.length is 0
      @appendElement(element)
    else
      @data.insertBefore(element.getData(), @data.childNodes[0])
    return this
  
  # Returns the elements children of this element.
  #
  # @return [Array<hatemile.util.html.vanilla.VanillaHTMLDOMElement>] The elements children of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getChildrenElements
  #
  getChildrenElements: () ->
    children = @data.children
    array = []
    for child in children
      array.push(new self.hatemile.util.html.vanilla
          .VanillaHTMLDOMElement(child))
    return array
  
  # Returns the children of this element.
  #
  # @return [Array<hatemile.util.html.vanilla.VanillaHTMLDOMElement>] The children of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getChildren
  #
  getChildren: () ->
    children = @data.childNodes
    array = []
    for child in children
      if (child.nodeType is @data.ownerDocument.TEXT_NODE)
        array.push(new self.hatemile.util.html.vanilla
            .VanillaHTMLDOMTextNode(child))
      else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
        array.push(new self.hatemile.util.html.vanilla
            .VanillaHTMLDOMElement(child))
    return array
  
  # Append a text content in element.
  #
  # @param [string] text The text content.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#appendText
  #
  appendText: (text) ->
    child = @getLastNodeChild()
    if (child isnt null) and (child instanceof self.hatemile.util.html
        .vanilla.VanillaHTMLDOMTextNode)
      child.appendText(text)
    else
      @data.appendChild(@data.ownerDocument.createTextNode(text))
    return this
  
  # Prepend a text content in element.
  #
  # @param [string] text The text content.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#prependText
  #
  prependText: (text) ->
    if (not @hasChildren())
      @appendText(text)
    else
      child = @getFirstNodeChild()
      if child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
        child.prependText(text)
      else
        @data.insertBefore(@data.ownerDocument.createTextNode(text), \
            child.getData())
    return this
  
  # Joins adjacent Text nodes.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement} This element.
  #
  # @see hatemile.util.html.HTMLDOMElement#normalize
  #
  normalize: () ->
    if (@data.normalize)
      @data.normalize()
    return this
  
  # Check that the element has elements children.
  #
  # @return [boolean] True if the element has elements children or false if the element not has elements children.
  #
  # @see hatemile.util.html.HTMLDOMElement#hasChildrenElements
  #
  hasChildrenElements: () ->
    return @data.children.length > 0
  
  # Check that the element has children.
  #
  # @return [boolean] True if the element has children or false if the element not has children.
  #
  # @see hatemile.util.html.HTMLDOMElement#hasChildren
  #
  hasChildren: () ->
    if not @data.hasChildNodes()
      return false
    else
      children = @data.childNodes
      for child in children
        if (child.nodeType is @data.ownerDocument.TEXT_NODE) or \
            (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
          return true
      return false
  
  # Returns the parent element of this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The parent element of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getParentElement
  #
  getParentElement: () ->
    parentNode = @data.parentNode
    if @getTagName() is 'HTML'
      return null
    else if (parentNode is undefined) or (parentNode is null)
      return null
    return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(parentNode)
  
  # Returns the inner HTML code of this element.
  #
  # @return [string] The inner HTML code of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getInnerHTML
  #
  getInnerHTML: () ->
    return @data.innerHTML
  
  # Returns the HTML code of this element.
  #
  # @return [string] The HTML code of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getOuterHTML
  #
  getOuterHTML: () ->
    return @data.outerHTML
  
  # Returns the native object of this element.
  #
  # @return [HTMLElement] The native object of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getData
  #
  getData: () ->
    return @data
  
  # Modify the native object of this element.
  #
  # @param [HTMLElement] data The native object of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#setData
  #
  setData: (data) ->
    @data = data
    return
  
  # Clone this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The clone.
  #
  # @see hatemile.util.html.HTMLDOMElement#cloneElement
  #
  cloneElement: () ->
    div = @data.ownerDocument.createElement('div')
    div.innerHTML = @getOuterHTML()
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(div.firstElementChild)
  
  # Returns the first element child of this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The first element child of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getFirstElementChild
  #
  getFirstElementChild: () ->
    if not @hasChildrenElements()
      return null
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@data.firstElementChild)
  
  # Returns the last element child of this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The last element child of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getLastElementChild
  #
  getLastElementChild: () ->
    if not @hasChildrenElements()
      return null
    return new self.hatemile.util.html.vanilla
        .VanillaHTMLDOMElement(@data.lastElementChild)
  
  # Returns the first node child of this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The first node child of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getFirstNodeChild
  #
  getFirstNodeChild: () ->
    if not @hasChildren()
      return null
    children = @data.childNodes
    for child in children
      if (child.nodeType is @data.ownerDocument.TEXT_NODE)
        return new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child)
      else if (child.nodeType is @data.ownerDocument.ELEMENT_NODE)
        return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child)
    return null
  
  # Returns the last node child of this element.
  #
  # @return [hatemile.util.html.vanilla.VanillaHTMLDOMElement] The last node child of this element.
  #
  # @see hatemile.util.html.HTMLDOMElement#getLastNodeChild
  #
  getLastNodeChild: () ->
    if not @hasChildren()
      return null
    children = @data.childNodes
    lastChild = null
    for child in children
      if ((child.nodeType is @data.ownerDocument.TEXT_NODE) or \
          (child.nodeType is @data.ownerDocument.ELEMENT_NODE))
        lastChild = child
    if lastChild is null
      return null
    else if (lastChild.nodeType is @data.ownerDocument.TEXT_NODE)
      return new self.hatemile.util.html.vanilla
          .VanillaHTMLDOMTextNode(lastChild)
    else if (lastChild.nodeType is @data.ownerDocument.ELEMENT_NODE)
      return new self.hatemile.util.html.vanilla
          .VanillaHTMLDOMElement(lastChild)
  
  # Indicates whether some other object is equal to this one.
  #
  # @param [Object] node The reference object with which to compare.
  #
  # @return [boolean] True if the node is the other object is equals to this one or if the node is not the other object is equals to this one.
  #
  # @see hatemile.util.html.HTMLDOMElement#equals
  #
  equals: (node) ->
    if node instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement
      if @data is node.getData()
        return true
    return false
