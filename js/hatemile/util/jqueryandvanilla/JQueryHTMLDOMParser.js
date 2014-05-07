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

exports.hatemile || (exports.hatemile = {});

(_base = exports.hatemile).util || (_base.util = {});

(_base1 = exports.hatemile.util).jqueryandvanilla || (_base1.jqueryandvanilla = {});

exports.hatemile.util.jqueryandvanilla.JQueryHTMLDOMParser = (function() {
  var results;

  function JQueryHTMLDOMParser() {}

  results = void 0;

  JQueryHTMLDOMParser.prototype.find = function(selector) {
    if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement) {
      selector = selector.getData();
    }
    results = jQuery(selector);
    return this;
  };

  JQueryHTMLDOMParser.prototype.findChildren = function(selector) {
    if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement) {
      selector = selector.getData();
    }
    results = jQuery(results).children(selector);
    return this;
  };

  JQueryHTMLDOMParser.prototype.findDescendants = function(selector) {
    if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement) {
      selector = selector.getData();
    }
    results = jQuery(results).find(selector);
    return this;
  };

  JQueryHTMLDOMParser.prototype.findAncestors = function(selector) {
    if (selector instanceof exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement) {
      selector = selector.getData();
    }
    results = jQuery(results).parents(selector);
    return this;
  };

  JQueryHTMLDOMParser.prototype.firstResult = function() {
    if (isEmpty(results)) {
      return void 0;
    }
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(results.get(0));
  };

  JQueryHTMLDOMParser.prototype.lastResult = function() {
    if (isEmpty(results)) {
      return void 0;
    }
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(results.get(results.length - 1));
  };

  JQueryHTMLDOMParser.prototype.listResults = function() {
    var array, result, _i, _len;
    array = [];
    if (!isEmpty(results)) {
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        array.push(new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(result));
      }
    }
    return array;
  };

  JQueryHTMLDOMParser.prototype.createElement = function(tagName) {
    return new exports.hatemile.util.jqueryandvanilla.VanillaHTMLDOMElement(document.createElement(tagName));
  };

  JQueryHTMLDOMParser.prototype.getHTML = function() {};

  JQueryHTMLDOMParser.prototype.clearParser = function() {
    results = void 0;
  };

  return JQueryHTMLDOMParser;

})();
