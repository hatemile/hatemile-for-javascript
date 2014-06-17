/*
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
 * @version 1.0
 * @memberof hatemile.util
*/


exports.hatemile.util.CommonFunctions = {
  /**
  	 * Count the number of ids created.
  	 * @type {Number}
  	 * @memberof hatemile.util.CommonFunctions
  */

  count: 0,
  /**
  	 * Generate a id for a element.
  	 * @param {hatemile.util.HTMLDOMElement} element The element.
  	 * @param {String} prefix The prefix of id.
  	 * @memberof hatemile.util.CommonFunctions
  */

  generateId: function(element, prefix) {
    if (!element.hasAttribute('id')) {
      element.setAttribute('id', prefix + this.count.toString());
      this.count++;
    }
  },
  /**
  	 * Copy a list of attributes of a element for other element.
  	 * @param {hatemile.util.HTMLDOMElement} element1 The element that have attributes copied.
  	 * @param {hatemile.util.HTMLDOMElement} element2 The element that copy the attributes.
  	 * @param {String[]} attributes The list of attributes that will be copied.
  	 * @memberof hatemile.util.CommonFunctions
  */

  setListAttributes: function(element1, element2, attributes) {
    var attribute, _i, _len;
    for (_i = 0, _len = attributes.length; _i < _len; _i++) {
      attribute = attributes[_i];
      if (element1.hasAttribute(attribute)) {
        element2.setAttribute(attribute, element1.getAttribute(attribute));
      }
    }
  },
  /**
  	 * Increase a item in a HTML list.
  	 * @param {String} list The HTML list.
  	 * @param {String} stringToIncrease The value of item.
  	 * @return {String} The HTML list with the item added, if the item
  	 * not was contained in list.
  	 * @memberof hatemile.util.CommonFunctions
  */

  increaseInList: function(list, stringToIncrease) {
    var array, item, _i, _len;
    if (!(isEmpty(list) || isEmpty(stringToIncrease))) {
      array = list.split(new RegExp('[ \n\t\r]+'));
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        item = array[_i];
        if (item === stringToIncrease) {
          return list;
        }
      }
      return "" + list + " " + stringToIncrease;
    } else if (isEmpty(list)) {
      return stringToIncrease;
    } else {
      return list;
    }
  }
};
