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

var exports, _base, _base1;

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
 * @namespace jqueryandvanilla
 * @memberof hatemile.util
*/


(_base1 = exports.hatemile.util).jqueryandvanilla || (_base1.jqueryandvanilla = {});

exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement = (function() {
  /**
  	 * Initializes a new object that encapsulate the
  	 * HTMLElement.
  	 * @param {HTMLElement} element The element.
  	 * @class VanillaHTMLDOMElement
  	 * @classdesc The VanillaHTMLDOMElement class is official implementation of
  	 * HTMLDOMElement interface for the javascript.
  	 * @extends hatemile.util.HTMLDOMElement
  	 * @version 1.0
  	 * @memberof hatemile.util.jqueryandvanilla
  */

  function VanillaHTMLDOMElement(data) {
    this.data = data;
  }

  VanillaHTMLDOMElement.prototype.getTagName = function() {
    return this.data.tagName.toUpperCase();
  };

  VanillaHTMLDOMElement.prototype.getAttribute = function(name) {
    return this.data.getAttribute(name);
  };

  VanillaHTMLDOMElement.prototype.setAttribute = function(name, value) {
    this.data.setAttribute(name, value);
  };

  VanillaHTMLDOMElement.prototype.removeAttribute = function(name) {
    this.data.removeAttribute(name);
  };

  VanillaHTMLDOMElement.prototype.hasAttribute = function(name) {
    return this.data.hasAttribute(name);
  };

  VanillaHTMLDOMElement.prototype.hasAttributes = function() {
    return this.data.hasAttributes();
  };

  VanillaHTMLDOMElement.prototype.getTextContent = function() {
    var child, childs, elementChild, text, _i, _len;
    if (!isEmpty(this.data.textContent)) {
      return this.data.textContent;
    }
    if (!isEmpty(this.data.innerText)) {
      return this.data.innerText;
    }
    text = '';
    childs = this.data.childNodes;
    for (_i = 0, _len = childs.length; _i < _len; _i++) {
      child = childs[_i];
      if (child.nodeType === document.TEXT_NODE) {
        text += child.nodeValue;
      } else if (child.nodeType === document.ELEMENT_NODE) {
        elementChild = new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(child);
        text += elementChild.getTextContent();
      }
    }
    return text;
  };

  VanillaHTMLDOMElement.prototype.insertBefore = function(newElement) {
    var parent;
    parent = this.data.parentElement;
    parent.insertBefore(newElement.getData(), this.data);
    return newElement;
  };

  VanillaHTMLDOMElement.prototype.insertAfter = function(newElement) {
    var child, childs, found, parent, _i, _len;
    parent = this.data.parentElement;
    childs = parent.childNodes;
    found = false;
    for (_i = 0, _len = childs.length; _i < _len; _i++) {
      child = childs[_i];
      if (found) {
        parent.insertBefore(newElement.getData(), child);
        return;
      } else if (child === this.data) {
        found = true;
      }
    }
    parent.appendChild(newElement.getData());
    return newElement;
  };

  VanillaHTMLDOMElement.prototype.removeElement = function() {
    this.data.remove();
    return this.data;
  };

  VanillaHTMLDOMElement.prototype.replaceElement = function(newElement) {
    var parent;
    parent = this.data.parentElement;
    parent.replaceChild(newElement.getData(), this.data);
    return newElement;
  };

  VanillaHTMLDOMElement.prototype.appendElement = function(element) {
    this.data.appendChild(element.getData());
    return element;
  };

  VanillaHTMLDOMElement.prototype.getChildren = function() {
    var array, child, children, _i, _len;
    children = this.data.children;
    array = [];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      child = children[_i];
      array.push(new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(child));
    }
    return array;
  };

  VanillaHTMLDOMElement.prototype.appendText = function(text) {
    this.data.appendChild(document.createTextNode(text));
  };

  VanillaHTMLDOMElement.prototype.hasChildren = function() {
    return !isEmpty(this.data.children);
  };

  VanillaHTMLDOMElement.prototype.getParentElement = function() {
    if (isEmpty(this.data.parentElement)) {
      return void 0;
    }
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(this.data.parentElement);
  };

  VanillaHTMLDOMElement.prototype.getInnerHTML = function() {
    return this.data.innerHTML;
  };

  VanillaHTMLDOMElement.prototype.setInnerHTML = function(html) {
    this.data.innerHTML = html;
  };

  VanillaHTMLDOMElement.prototype.getOuterHTML = function() {
    return this.data.outerHTML;
  };

  VanillaHTMLDOMElement.prototype.getData = function() {
    return this.data;
  };

  VanillaHTMLDOMElement.prototype.setData = function(data) {
    return this.data = data;
  };

  VanillaHTMLDOMElement.prototype.cloneElement = function() {
    var div;
    div = document.createElement('div');
    div.innerHTML = this.getOuterHTML();
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(div.firstElementChild);
  };

  VanillaHTMLDOMElement.prototype.getFirstElementChild = function() {
    if (!this.hasChildren) {
      return void 0;
    }
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(this.data.firstElementChild);
  };

  VanillaHTMLDOMElement.prototype.getLastElementChild = function() {
    if (!this.hasChildren) {
      return void 0;
    }
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(this.data.lastElementChild);
  };

  return VanillaHTMLDOMElement;

})();
