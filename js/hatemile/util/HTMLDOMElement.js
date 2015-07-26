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
 * @class HTMLDOMElement
 * @classdesc The HTMLDOMElement interface contains the methods for access of
 * the HTML element.
 * @memberof hatemile.util
*/


exports.hatemile.util.HTMLDOMElement = (function() {
  function HTMLDOMElement() {}

  /**
  	 * Returns the tag name of element.
  	 * @return {String} The tag name of element in uppercase letters.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getTagName = function() {};

  /**
  	 * Returns the value of a attribute.
  	 * @param {String} name The name of attribute.
  	 * @return {String} The value of the attribute, if the element not contains
  	 * the attribute returns null.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getAttribute = function(name) {};

  /**
  	 * Create or modify a attribute.
  	 * @param {String} name The name of attribute.
  	 * @param {String} value The value of attribute.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.setAttribute = function(name, value) {};

  /**
  	 * Remove a attribute of element.
  	 * @param {String} name The name of attribute.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.removeAttribute = function(name) {};

  /**
  	 * Returns if the element has an attribute.
  	 * @param {String} name The name of attribute.
  	 * @return {Boolean} True if the element has the attribute or false if the
  	 * element not has the attribute.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.hasAttribute = function(name) {};

  /**
  	 * Returns if the element has attributes.
  	 * @return {Boolean} True if the element has attributes or false if the
  	 * element not has attributes.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.hasAttributes = function() {};

  /**
  	 * Returns the text of element.
  	 * @return {String} The text of element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getTextContent = function() {};

  /**
  	 * Insert a element before this element.
  	 * @param {hatemile.util.HTMLDOMElement} newElement The element that be
  	 * inserted.
  	 * @return {hatemile.util.HTMLDOMElement} The element inserted.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.insertBefore = function(newElement) {};

  /**
  	 * Insert a element after this element.
  	 * @param {hatemile.util.HTMLDOMElement} newElement The element that be
  	 * inserted.
  	 * @return {hatemile.util.HTMLDOMElement} The element inserted.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.insertAfter = function(newElement) {};

  /**
  	 * Remove this element of the parser.
  	 * @return {hatemile.util.HTMLDOMElement} The removed element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.removeElement = function() {};

  /**
  	 * Replace this element for other element.
  	 * @param {hatemile.util.HTMLDOMElement} newElement The element that replace
  	 * this element.
  	 * @return {hatemile.util.HTMLDOMElement} The element replaced.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.replaceElement = function(newElement) {};

  /**
  	 * Append a element child.
  	 * @param {hatemile.util.HTMLDOMElement} element The element that be inserted.
  	 * @return {hatemile.util.HTMLDOMElement} The element inserted.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.appendElement = function(element) {};

  /**
  	 * Returns the children of this element.
  	 * @return {hatemile.util.HTMLDOMElement[]} The children of this element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getChildren = function() {};

  /**
  	 * Append a text child.
  	 * @param {String} text The text.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.appendText = function(text) {};

  /**
  	 * Returns if the element has children.
  	 * @return {Boolean} True if the element has children or false if the element
  	 * not has children.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.hasChildren = function() {};

  /**
  	 * Returns the parent element of this element.
  	 * @return {hatemile.util.HTMLDOMElement} The parent element of this element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getParentElement = function() {};

  /**
  	 * Returns the inner HTML code of this element.
  	 * @return {String} The inner HTML code of this element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getInnerHTML = function() {};

  /**
  	 * Modify the inner HTML code of this element.
  	 * @param {String} html The HTML code.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.setInnerHTML = function(html) {};

  /**
  	 * Returns the HTML code of this element.
  	 * @return {String} The HTML code of this element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getOuterHTML = function() {};

  /**
  	 * Returns the native object of this element.
  	 * @return {Object} The native object of this element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getData = function() {};

  /**
  	 * Modify the native object of this element.
  	 * @param {Object} data The native object of this element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.setData = function(data) {};

  /**
  	 * Clone this element.
  	 * @return {hatemile.util.HTMLDOMElement} The clone.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.cloneElement = function() {};

  /**
  	 * Returns the first element child of this element.
  	 * @return {hatemile.util.HTMLDOMElement} The first element child of this
  	 * element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getFirstElementChild = function() {};

  /**
  	 * Returns the last element child of this element.
  	 * @return {hatemile.util.HTMLDOMElement} The last element child of this
  	 * element.
  	 * @memberof hatemile.util.HTMLDOMElement
  */


  HTMLDOMElement.prototype.getLastElementChild = function() {};

  return HTMLDOMElement;

})();
