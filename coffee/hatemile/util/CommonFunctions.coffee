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
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @namespace util
 * @memberof hatemile
###
exports.hatemile.util or= {}

###*
 * @class CommonFunctions
 * @classdesc The CommonFuncionts class contains the used methods by HaTeMiLe
 * classes.
 * @memberof hatemile.util
###
exports.hatemile.util.CommonFunctions = {
	
	###*
	 * Count the number of ids created.
	 * @type {Number}
	 * @memberof hatemile.util.CommonFunctions
	###
	count: 0,
	
	###*
	 * Generate a id for a element.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {String} prefix The prefix of id.
	 * @memberof hatemile.util.CommonFunctions
	###
	generateId: (element, prefix) ->
		if !element.hasAttribute('id')
			element.setAttribute('id', prefix + @count.toString())
			@count++
		return
	
	###*
	 * Copy a list of attributes of a element for other element.
	 * @param {hatemile.util.HTMLDOMElement} element1 The element that have
	 * attributes copied.
	 * @param {hatemile.util.HTMLDOMElement} element2 The element that copy the
	 * attributes.
	 * @param {String[]} attributes The list of attributes that will be copied.
	 * @memberof hatemile.util.CommonFunctions
	###
	setListAttributes: (element1, element2, attributes) ->
		for attribute in attributes
			if element1.hasAttribute(attribute)
				element2.setAttribute(attribute, element1.getAttribute(attribute))
		return
	
	###*
	 * Increase a item in a HTML list.
	 * @param {String} list The list.
	 * @param {String} stringToIncrease The value of item.
	 * @return {String} The HTML list with the item added, if the item not was
	 * contained in list.
	 * @memberof hatemile.util.CommonFunctions
	###
	increaseInList: (list, stringToIncrease) ->
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
	 * @param {String} list The list.
	 * @param {String} stringToSearch The value of item.
	 * @return {Boolean} True if the list contains the item or false is not
	 * contains.
	 * @memberof hatemile.util.CommonFunctions
	###
	inList: (list, stringToSearch) ->
		if not (isEmpty(list) or isEmpty(stringToSearch))
			array = list.split(new RegExp('[ \n\t\r]+'))
			for item in array
				if item is stringToSearch
					return true
		return false
}