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
__exports = this

###*
 * @namespace hatemile
###
__exports.hatemile or= {}

###*
 * @namespace hatemile.util
###
__exports.hatemile.util or= {}

###*
 * The CommonFuncionts class contains the used methods by HaTeMiLe classes.
 * @class hatemile.util.CommonFunctions
###
class __exports.hatemile.util.CommonFunctions
	
	DATA_IGNORE = 'data-ignoreaccessibilityfix'
	_count = 0
	
	###*
	 * Generate a id for a element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} prefix The prefix of id.
	 * @public
	 * @function hatemile.util.CommonFunctions.generateId
	###
	@generateId: (element, prefix) ->
		if not element.hasAttribute('id')
			element.setAttribute('id', prefix + _count.toString())
			_count++
		return
	
	###*
	 * Reset the count number of ids.
	 * @public
	 * @function hatemile.util.CommonFunctions.resetCount
	###
	@resetCount: () ->
		_count = 0
		return
	
	###*
	 * Copy a list of attributes of a element for other element.
	 * @param {hatemile.util.html.HTMLDOMElement} element1 The element that have
	 * attributes copied.
	 * @param {hatemile.util.html.HTMLDOMElement} element2 The element that copy the
	 * attributes.
	 * @param {string[]} attributes The list of attributes that will be copied.
	 * @public
	 * @function hatemile.util.CommonFunctions.setListAttributes
	###
	@setListAttributes: (element1, element2, attributes) ->
		for attribute in attributes
			if element1.hasAttribute(attribute)
				element2.setAttribute(attribute, element1.getAttribute(attribute))
		return
	
	###*
	 * Increase a item in a HTML list.
	 * @param {string} list The list.
	 * @param {string} stringToIncrease The value of item.
	 * @returns {string} The HTML list with the item added, if the item not was
	 * contained in list.
	 * @public
	 * @function hatemile.util.CommonFunctions.increaseInList
	###
	@increaseInList: (list, stringToIncrease) ->
		if not (isEmpty(list) or isEmpty(stringToIncrease))
			if @inList(list, stringToIncrease)
				return list
			else
				return "#{list} #{stringToIncrease}"
		else if isEmpty(list)
			return stringToIncrease
		else
			return list
	
	###*
	 * Verify if the list contains the item.
	 * @param {string} list The list.
	 * @param {string} stringToSearch The value of item.
	 * @returns {boolean} True if the list contains the item or false is not
	 * contains.
	 * @public
	 * @function hatemile.util.CommonFunctions.inList
	###
	@inList: (list, stringToSearch) ->
		if not (isEmpty(list) or isEmpty(stringToSearch))
			array = list.split(new RegExp('[ \n\t\r]+'))
			for item in array
				if item is stringToSearch
					return true
		return false
	
	###*
	 * Check that the element can be manipulated by HaTeMiLe.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element
	 * @returns {boolean} True if element can be manipulated or false if element
	 * and  element can be manipulated.
	 * @public
	 * @function hatemile.util.CommonFunctions.isValidElement
	###
	@isValidElement: (element) ->
		if element.hasAttribute(DATA_IGNORE)
			return false
		else
			parentElement = element.getParentElement()
			if not isEmpty(parentElement)
				tagName = parentElement.getTagName()
				if (tagName isnt 'BODY') and (tagName isnt 'HTML')
					return @isValidElement(parentElement)
				else
					return true
			else
				return true