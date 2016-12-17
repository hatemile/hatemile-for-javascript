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

var exports, _base, _base1, _base2;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace hatemile.util
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace hatemile.util.html
 */
(_base1 = exports.hatemile.util).html || (_base1.html = {});

/**
 * @namespace hatemile.util.html.vanilla
 */
(_base2 = exports.hatemile.util.html).vanilla || (_base2.vanilla = {});

exports.hatemile.util.html.vanilla.VanillaHTMLDOMParser = (function() {
	var isDescendant;

	/**
	 * Initializes a new object that encapsulate the HTMLDocument.
	 * @param {HTMLDocument} ownerDocument The owner document of parser.
	 * @class The class VanillaHTMLDOMParser is official implementation of
	 * HTMLDOMParser interface for JavaScript.
	 * @implements {hatemile.util.html.HTMLDOMParser}
	 * @constructs hatemile.util.html.vanilla.VanillaHTMLDOMParser
	 */
	function VanillaHTMLDOMParser(ownerDocument) {
		this.ownerDocument = ownerDocument;
		this.results = [];
	}
	
	/**
	 * Check that the element is descendant of other.
	 * @param {hatemile.util.html.HTMLDOMElement} possibleAncestor The possible
	 * ancestor.
	 * @param {hatemile.util.html.HTMLDOMElement} possibleDescendant The possible
	 * descendant.
	 * @returns {boolean} True if the element is descendant of other or false if
	 * the element is not descendant of other.
	 * @private
	 * @function hatemile.util.html.vanilla.VanillaHTMLDOMParser.isDescendant
	 */
	isDescendant = function(possibleAncestor, possibleDescendant) {
		var ancestor;
		ancestor = possibleDescendant.parentNode;
		while (!isEmpty(ancestor)) {
			if (ancestor === possibleAncestor) {
				return true;
			}
			ancestor = ancestor.parentNode;
		}
		return false;
	};

	VanillaHTMLDOMParser.prototype.find = function(selector) {
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			this.results = [selector.getData()];
		} else {
			this.results = this.ownerDocument.querySelectorAll(selector);
		}
		return this;
	};

	VanillaHTMLDOMParser.prototype.findChildren = function(selector) {
		var children, descendant, descendants, result, resultChild, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
		children = [];
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			_ref = this.results;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				result = _ref[_i];
				_ref1 = result.children;
				for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
					resultChild = _ref1[_j];
					if (selector.getData() === resultChild) {
						children.push(selector.getData());
						break;
					}
				}
				if (!isEmpty(children)) {
					break;
				}
			}
		} else {
			_ref2 = this.results;
			for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
				result = _ref2[_k];
				descendants = result.querySelectorAll(selector);
				for (_l = 0, _len3 = descendants.length; _l < _len3; _l++) {
					descendant = descendants[_l];
					if (descendant.parentNode === result) {
						children.push(descendant);
					}
				}
			}
		}
		this.results = children;
		return this;
	};

	VanillaHTMLDOMParser.prototype.findDescendants = function(selector) {
		var descendants, result, resultDescendant, resultDescendants, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
		descendants = [];
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			_ref = this.results;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				result = _ref[_i];
				if (isDescendant(result, selector.getData())) {
					descendants.push(selector.getData());
					break;
				}
			}
		} else {
			_ref1 = this.results;
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				result = _ref1[_j];
				resultDescendants = result.querySelectorAll(selector);
				for (_k = 0, _len2 = resultDescendants.length; _k < _len2; _k++) {
					resultDescendant = resultDescendants[_k];
					descendants.push(resultDescendant);
				}
			}
		}
		this.results = descendants;
		return this;
	};

	VanillaHTMLDOMParser.prototype.findAncestors = function(selector) {
		var ancestors, element, elements, result, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
		ancestors = [];
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			_ref = this.results;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				result = _ref[_i];
				if (isDescendant(selector.getData(), result)) {
					ancestors.push(selector.getData());
					break;
				}
			}
		} else {
			elements = this.ownerDocument.querySelectorAll(selector);
			_ref1 = this.results;
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				result = _ref1[_j];
				for (_k = 0, _len2 = elements.length; _k < _len2; _k++) {
					element = elements[_k];
					if (isDescendant(element, result)) {
						ancestors.push(element);
					}
				}
			}
		}
		this.results = ancestors;
		return this;
	};

	VanillaHTMLDOMParser.prototype.firstResult = function() {
		if (isEmpty(this.results)) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results[0]);
	};

	VanillaHTMLDOMParser.prototype.lastResult = function() {
		if (isEmpty(this.results)) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results[this.results.length - 1]);
	};

	VanillaHTMLDOMParser.prototype.listResults = function() {
		var array, result, _i, _len, _ref;
		array = [];
		_ref = this.results;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			result = _ref[_i];
			array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(result));
		}
		return array;
	};

	VanillaHTMLDOMParser.prototype.createElement = function(tag) {
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.ownerDocument.createElement(tag));
	};

	VanillaHTMLDOMParser.prototype.getHTML = function() {
		return this.ownerDocument.documentElement.outerHTML;
	};

	VanillaHTMLDOMParser.prototype.getParser = function() {
		return this.ownerDocument;
	};

	VanillaHTMLDOMParser.prototype.clearParser = function() {
		this.results = [];
	};

	return VanillaHTMLDOMParser;

})();