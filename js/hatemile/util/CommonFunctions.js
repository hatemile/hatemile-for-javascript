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

exports.hatemile || (exports.hatemile = {});

(_base = exports.hatemile).util || (_base.util = {});

exports.hatemile.util.CommonFunctions = {
  count: 0,
  generateId: function(element, prefix) {
    if (!element.hasAttribute('id')) {
      element.setAttribute('id', prefix + this.count.toString());
      this.count++;
    }
  },
  setListAttributes: function(element1, element2, attributes) {
    var attribute, _i, _len;
    for (_i = 0, _len = attributes.length; _i < _len; _i++) {
      attribute = attributes[_i];
      if (element1.hasAttribute(attribute)) {
        element2.setAttribute(attribute, element1.getAttribute(attribute));
      }
    }
  },
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
