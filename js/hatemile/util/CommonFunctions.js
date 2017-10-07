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


/**
 * @namespace hatemile
 */

(function () {
    var base;

    this.hatemile || (this.hatemile = {});


    /**
     * @namespace hatemile.util
     */

    (base = this.hatemile).util || (base.util = {});


    /**
     * The CommonFuncionts class contains the used methods by HaTeMiLe classes.
     * @class hatemile.util.CommonFunctions
     */

    this.hatemile.util.CommonFunctions = (function () {
        var DATA_IGNORE, _count;

        function CommonFunctions() {}

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        _count = 0;


        /**
         * Generate a id for a element.
         * @param {hatemile.util.html.HTMLDOMElement} element The element.
         * @param {string} prefix The prefix of id.
         * @public
         * @function hatemile.util.CommonFunctions.generateId
         */

        CommonFunctions.generateId = function (element, prefix) {
            if (!element.hasAttribute('id')) {
                element.setAttribute('id', prefix + _count.toString());
                _count++;
            }
        };


        /**
         * Reset the count number of ids.
         * @public
         * @function hatemile.util.CommonFunctions.resetCount
         */

        CommonFunctions.resetCount = function () {
            _count = 0;
        };


        /**
         * Copy a list of attributes of a element for other element.
         * @param {hatemile.util.html.HTMLDOMElement} element1 The element that have
         * attributes copied.
         * @param {hatemile.util.html.HTMLDOMElement} element2 The element that copy the
         * attributes.
         * @param {string[]} attributes The list of attributes that will be copied.
         * @public
         * @function hatemile.util.CommonFunctions.setListAttributes
         */

        CommonFunctions.setListAttributes = function (element1, element2, attributes) {
            var attribute, i, len;
            for (i = 0, len = attributes.length; i < len; i++) {
                attribute = attributes[i];
                if (element1.hasAttribute(attribute)) {
                    element2.setAttribute(attribute, element1.getAttribute(attribute));
                }
            }
        };


        /**
         * Increase a item in a HTML list.
         * @param {string} list The list.
         * @param {string} stringToIncrease The value of item.
         * @returns {string} The HTML list with the item added, if the item not was
         * contained in list.
         * @public
         * @function hatemile.util.CommonFunctions.increaseInList
         */

        CommonFunctions.increaseInList = function (list, stringToIncrease) {
            if (!(self.isEmpty(list) || self.isEmpty(stringToIncrease))) {
                if (this.inList(list, stringToIncrease)) {
                    return list;
                } else {
                    return list + " " + stringToIncrease;
                }
            } else if (self.isEmpty(list)) {
                return stringToIncrease;
            } else {
                return list;
            }
        };


        /**
         * Verify if the list contains the item.
         * @param {string} list The list.
         * @param {string} stringToSearch The value of item.
         * @returns {boolean} True if the list contains the item or false is not
         * contains.
         * @public
         * @function hatemile.util.CommonFunctions.inList
         */

        CommonFunctions.inList = function (list, stringToSearch) {
            var array, i, item, len;
            if (!(self.isEmpty(list) || self.isEmpty(stringToSearch))) {
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


        /**
         * Check that the element can be manipulated by HaTeMiLe.
         * @param {hatemile.util.html.HTMLDOMElement} element The element
         * @returns {boolean} True if element can be manipulated or false if element
         * and  element can be manipulated.
         * @public
         * @function hatemile.util.CommonFunctions.isValidElement
         */

        CommonFunctions.isValidElement = function (element) {
            var parentElement, tagName;
            if (element.hasAttribute(DATA_IGNORE)) {
                return false;
            } else {
                parentElement = element.getParentElement();
                if (!self.isEmpty(parentElement)) {
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
