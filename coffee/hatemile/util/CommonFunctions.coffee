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

# The CommonFuncionts class contains the used methods by HaTeMiLe classes.
#
class @hatemile.util.CommonFunctions
  
  DATA_IGNORE = 'data-ignoreaccessibilityfix'
  
  # Copy a list of attributes of a element for other element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element1 The element that have attributes copied.
  # @param [hatemile.util.html.HTMLDOMElement] element2 The element that copy the attributes.
  # @param [Array<string>] attributes The list of attributes that will be copied.
  #
  @setListAttributes: (element1, element2, attributes) ->
    for attribute in attributes
      if element1.hasAttribute(attribute)
        element2.setAttribute(attribute, element1.getAttribute(attribute))
    return
  
  # Increase a item in a HTML list.
  #
  # @param [string] list The list.
  # @param [string] stringToIncrease The value of item.
  #
  # @return [string] The HTML list with the item added, if the item not was contained in list.
  #
  @increaseInList: (list, stringToIncrease) ->
    if (list isnt null) and (list.length > 0) and (stringToIncrease isnt null) \
        and (stringToIncrease.length > 0)
      if @inList(list, stringToIncrease)
        return list
      else
        return "#{list} #{stringToIncrease}"
    else if (stringToIncrease isnt null) and (stringToIncrease.length > 0)
      return stringToIncrease
    else
      return list
  
  # Verify if the list contains the item.
  #
  # @param [string] list The list.
  # @param [string] stringToSearch The value of item.
  #
  # @return [boolean] True if the list contains the item or false is not contains.
  #
  @inList: (list, stringToSearch) ->
    if (list isnt null) and (list.length > 0) and (stringToSearch isnt null) \
        and (stringToSearch.length > 0)
      array = list.split(new RegExp('[ \n\t\r]+'))
      for item in array
        if item is stringToSearch
          return true
    return false
  
  # Check that the element can be manipulated by HaTeMiLe.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @return [boolean] True if element can be manipulated or false if element cannot be manipulated.
  #
  @isValidElement: (element) ->
    if element.hasAttribute(DATA_IGNORE)
      return false
    else
      parentElement = element.getParentElement()
      if parentElement isnt null
        tagName = parentElement.getTagName()
        if (tagName isnt 'BODY') and (tagName isnt 'HTML')
          return @isValidElement(parentElement)
        else
          return true
      else
        return true
