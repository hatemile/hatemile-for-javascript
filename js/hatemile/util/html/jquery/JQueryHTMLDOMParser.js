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
 * @namespace util
 * @memberof hatemile
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace html
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).html || (_base1.html = {});

/**
 * @namespace jquery
 * @memberof hatemile.util
 */
(_base2 = exports.hatemile.util.html).jquery || (_base2.jquery = {});

/**
 * @class JQueryHTMLDOMParser
 * @classdesc The class JQueryHTMLDOMParser is official implementation of
 * HTMLDOMParser interface for the jQuery library.
 * @extends hatemile.util.html.HTMLDOMParser
 * @memberof hatemile.util.html.jquery
 */
exports.hatemile.util.html.jquery.JQueryHTMLDOMParser = (function() {
	/**
	 * Initializes a new object that encapsulate the jQuery.
	 * @memberof hatemile.util.html.jquery.JQueryHTMLDOMParser
	 */
	function JQueryHTMLDOMParser(html, ownerDocument) {
		this.root = jQuery(html);
		this.results = void 0;
		if (!isEmpty(ownerDocument)) {
			this.ownerDocument = ownerDocument;
		} else if (!isEmpty(html.ownerDocument)) {
			this.ownerDocument = html.ownerDocument;
		} else {
			this.ownerDocument = document;
		}
	}

	JQueryHTMLDOMParser.prototype.find = function(selector) {
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			selector = selector.getData();
		}
		this.results = this.root.find(selector);
		return this;
	};

	JQueryHTMLDOMParser.prototype.findChildren = function(selector) {
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			selector = selector.getData();
		}
		this.results = jQuery(this.results).children(selector);
		return this;
	};

	JQueryHTMLDOMParser.prototype.findDescendants = function(selector) {
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			selector = selector.getData();
		}
		this.results = jQuery(this.results).find(selector);
		return this;
	};

	JQueryHTMLDOMParser.prototype.findAncestors = function(selector) {
		if (selector instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			selector = selector.getData();
		}
		this.results = jQuery(this.results).parents(selector);
		return this;
	};

	JQueryHTMLDOMParser.prototype.firstResult = function() {
		if (isEmpty(this.results)) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results.get(0));
	};

	JQueryHTMLDOMParser.prototype.lastResult = function() {
		if (isEmpty(this.results)) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results.get(this.results.length - 1));
	};

	JQueryHTMLDOMParser.prototype.listResults = function() {
		var array, result, _i, _len, _ref;
		array = [];
		if (!isEmpty(this.results)) {
			_ref = this.results;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				result = _ref[_i];
				array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(result));
			}
		}
		return array;
	};

	JQueryHTMLDOMParser.prototype.createElement = function(tag) {
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.ownerDocument.createElement(tag));
	};

	JQueryHTMLDOMParser.prototype.getHTML = function() {
		return this.ownerDocument.documentElement.outerHTML;
	};

	JQueryHTMLDOMParser.prototype.getParser = function() {
		return this.root;
	};

	JQueryHTMLDOMParser.prototype.clearParser = function() {
		this.results = void 0;
	};

	return JQueryHTMLDOMParser;

})();