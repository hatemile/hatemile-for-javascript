###
Copyright 2014 Carlson Santana Cruz

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
exports.hatemile or= {}
exports.hatemile.util or= {}
exports.hatemile.util.CommonFunctions = {
	count: 0,
	generateId: (element, prefix) ->
		if !element.hasAttribute('id')
			element.setAttribute('id', prefix + @count.toString())
			@count++
		return
	setListAttributes: (element1, element2, attributes) ->
		for attribute in attributes
			if element1.hasAttribute(attribute)
				element2.setAttribute(attribute, element1.getAttribute(attribute))
		return
	increaseInList: (list, stringToIncrease) ->
		if not (isEmpty(list) || isEmpty(stringToIncrease))
			array = list.split(new RegExp('[ \n\t\r]+'))
			for item in array
				if item is stringToIncrease
					return list
			return "#{list} #{stringToIncrease}"
		else if isEmpty(list)
			return stringToIncrease
		else
			return list
}