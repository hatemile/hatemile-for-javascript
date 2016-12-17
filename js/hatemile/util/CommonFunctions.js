/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var exports, _base;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace util
 * @memberof hatemile
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @class CommonFunctions
 * @classdesc The CommonFuncionts class contains the used methods by HaTeMiLe
 * classes.
 * @memberof hatemile.util
 */
exports.hatemile.util.CommonFunctions = (function() {
	var DATA_IGNORE, _count;

	function CommonFunctions() {
	}

	DATA_IGNORE = 'data-ignoreaccessibilityfix';

	_count = 0;

	/**
	 * Generate a id for a element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} prefix The prefix of id.
	 * @memberof hatemile.util.CommonFunctions
	 */
	CommonFunctions.generateId = function(element, prefix) {
		if (!element.hasAttribute('id')) {
			element.setAttribute('id', prefix + _count.toString());
			_count++;
		}
	};

	/**
	 * Reset the count number of ids.
	 * @memberof hatemile.util.CommonFunctions
	 */
	CommonFunctions.resetCount = function() {
		_count = 0;
	};

	/**
	 * Copy a list of attributes of a element for other element.
	 * @param {hatemile.util.html.HTMLDOMElement} element1 The element that have
	 * attributes copied.
	 * @param {hatemile.util.html.HTMLDOMElement} element2 The element that copy the
	 * attributes.
	 * @param {String[]} attributes The list of attributes that will be copied.
	 * @memberof hatemile.util.CommonFunctions
	 */
	CommonFunctions.setListAttributes = function(element1, element2, attributes) {
		var attribute, _i, _len;
		for (_i = 0, _len = attributes.length; _i < _len; _i++) {
			attribute = attributes[_i];
			if (element1.hasAttribute(attribute)) {
				element2.setAttribute(attribute, element1.getAttribute(attribute));
			}
		}
	};

	/**
	 * Increase a item in a HTML list.
	 * @param {string} list The list.
	 * @param {string} stringToIncrease The value of item.
	 * @return {string} The HTML list with the item added, if the item not was
	 * contained in list.
	 * @memberof hatemile.util.CommonFunctions
	 */
	CommonFunctions.increaseInList = function(list, stringToIncrease) {
		if (!(isEmpty(list) || isEmpty(stringToIncrease))) {
			if (this.inList(list, stringToIncrease)) {
				return list;
			} else {
				return "" + list + " " + stringToIncrease;
			}
		} else if (isEmpty(list)) {
			return stringToIncrease;
		} else {
			return list;
		}
	};

	/**
	 * Verify if the list contains the item.
	 * @param {string} list The list.
	 * @param {string} stringToSearch The value of item.
	 * @return {boolean} True if the list contains the item or false is not
	 * contains.
	 * @memberof hatemile.util.CommonFunctions
	 */
	CommonFunctions.inList = function(list, stringToSearch) {
		var array, item, _i, _len;
		if (!(isEmpty(list) || isEmpty(stringToSearch))) {
			array = list.split(new RegExp('[ \n\t\r]+'));
			for (_i = 0, _len = array.length; _i < _len; _i++) {
				item = array[_i];
				if (item === stringToSearch) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Check that the element can be manipulated by HaTeMiLe.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element
	 * @returns {boolean} True if element can be manipulated or false if element
	 * and  element can be manipulated.
	 * @public
	 * @function hatemile.util.CommonFunctions.isValidElement
	 */
	CommonFunctions.isValidElement = function(element) {
		var parentElement, tagName;
		if (element.hasAttribute(DATA_IGNORE)) {
			return false;
		} else {
			parentElement = element.getParentElement();
			if (!isEmpty(parentElement)) {
				tagName = parentElement.getTagName();
				if ((tagName !== 'BODY') && (tagName !== 'HTML')) {
					return this.isValidElement(parentElement);
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	};

	return CommonFunctions;

})();