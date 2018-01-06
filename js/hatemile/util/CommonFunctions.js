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

(function () {
    'use strict';
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    this.hatemile.util.CommonFunctions = (function () {
        var DATA_IGNORE;

        function CommonFunctions() {}

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        CommonFunctions.setListAttributes = function (element1, element2, attributes) {
            var attribute, i, len;
            for (i = 0, len = attributes.length; i < len; i++) {
                attribute = attributes[i];
                if (element1.hasAttribute(attribute)) {
                    element2.setAttribute(attribute, element1.getAttribute(attribute));
                }
            }
        };

        CommonFunctions.increaseInList = function (list, stringToIncrease) {
            if ((list !== null) && (list.length > 0) && (stringToIncrease !== null) && (stringToIncrease.length > 0)) {
                if (this.inList(list, stringToIncrease)) {
                    return list;
                } else {
                    return list + " " + stringToIncrease;
                }
            } else if ((stringToIncrease !== null) && (stringToIncrease.length > 0)) {
                return stringToIncrease;
            } else {
                return list;
            }
        };

        CommonFunctions.inList = function (list, stringToSearch) {
            var array, i, item, len;
            if ((list !== null) && (list.length > 0) && (stringToSearch !== null) && (stringToSearch.length > 0)) {
                array = list.split(new RegExp('[ \n\t\r]+'));
                for (i = 0, len = array.length; i < len; i++) {
                    item = array[i];
                    if (item === stringToSearch) {
                        return true;
                    }
                }
            }
            return false;
        };

        CommonFunctions.isValidElement = function (element) {
            var parentElement, tagName;
            if (element.hasAttribute(DATA_IGNORE)) {
                return false;
            } else {
                parentElement = element.getParentElement();
                if (parentElement !== null) {
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

}).call(this);
