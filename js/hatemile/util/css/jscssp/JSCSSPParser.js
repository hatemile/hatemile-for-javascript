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

var __exports, _base, _base1, _base2;

__exports = this;

/**
 * @namespace hatemile
 */
__exports.hatemile || (__exports.hatemile = {});

/**
 * @namespace hatemile.util
 */
(_base = __exports.hatemile).util || (_base.util = {});

/**
 * @namespace hatemile.util.css
 */
(_base1 = __exports.hatemile.util).css || (_base1.css = {});

/**
 * @namespace hatemile.util.css.jscssp
 */
(_base2 = __exports.hatemile.util.css).jscssp || (_base2.jscssp = {});

__exports.hatemile.util.css.jscssp.JSCSSPParser = (function() {
	var getAbsolutePath, getCSSContent, getContentFromElement, getContentFromURL;
	
	/*
	 * Returns the absolute path of a URL.
	 * @param {string} currentURL The current URL of document.
	 * @param {string} otherURL The other URL.
	 * @returns {string} The absolute path of other URL.
	 * @private
	 * @function hatemile.util.css.jscssp.JSCSSPParser.getAbsolutePath
	 */
	getAbsolutePath = function(currentURL, otherURL) {
		var relativePart, relativeParts, stackURL, urlRegularExpression, _i, _len;
		if (otherURL.indexOf('//') === 0) {
			if (currentURL.indexOf('https://') === 0) {
				return "https:" + otherURL;
			} else {
				return "http:" + otherURL;
			}
		} else if (otherURL.indexOf('data:') === 0) {
			return null;
		} else {
			urlRegularExpression = new RegExp('([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/\\/)?(?:(?:(?:[a-zA-Z0-9_\\.\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\\-\\.]|%[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\\]))(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!:\\.\\?\\+=&@!$\'~*,;\\/\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?');
			if (urlRegularExpression.test(otherURL)) {
				return otherURL;
			} else {
				if (currentURL.indexOf('/') === -1) {
					currentURL += '/';
				}
				stackURL = currentURL.split('/');
				stackURL.pop();
				relativeParts = otherURL.split('/');
				for (_i = 0, _len = relativeParts.length; _i < _len; _i++) {
					relativePart = relativeParts[_i];
					if (relativePart === '..') {
						stackURL.pop();
					} else if (relativePart !== '.') {
						stackURL.push(relativePart);
					}
				}
				return stackURL.join('/');
			}
		}
	};

	/*
	 * Returns the text content of document.
	 * @param {HTMLDocument} doc The document.
	 * @returns {string} The text content of document.
	 * @private
	 * @function hatemile.util.css.jscssp.JSCSSPParser.getCSSContent
	 */
	getCSSContent = function(doc, currentURL) {
		var child, content, head, style, styles, tagName, _i, _j, _len, _len1, _ref;
		content = '';
		head = doc.getElementsByTagName('head')[0];
		_ref = head.children;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			child = _ref[_i];
			tagName = child.tagName.toUpperCase();
			if ((tagName === 'LINK') && (child.hasAttribute('rel')) && (child.getAttribute('rel') === 'stylesheet')) {
				content += getContentFromURL(getAbsolutePath(currentURL, child.getAttribute('href')));
			} else if (tagName === 'STYLE') {
				content += getContentFromElement(child);
			}
		}
		styles = doc.getElementsByTagName('style');
		for (_j = 0, _len1 = styles.length; _j < _len1; _j++) {
			style = styles[_j];
			if (style.parentNode !== head) {
				content += getContentFromElement(style);
			}
		}
		return content;
	};

	/*
	 * Returns the text content of URL.
	 * @param {string} url The URL.
	 * @returns {string} The text content of URL.
	 * @private
	 * @function hatemile.util.css.jscssp.JSCSSPParser.getContentFromURL
	 */
	getContentFromURL = function(url) {
		var content, e, httpRequest;
		content = '';
		if (!isEmpty(url)) {
			httpRequest = false;
			if (window.XMLHttpRequest) {
				httpRequest = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				try {
					httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
				} catch (_error) {
					e = _error;
					try {
						httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
					} catch (_error) {
						e = _error;
					}
				}
			}
			if (httpRequest) {
				httpRequest.onreadystatechange = function() {
					if ((this.readyState === 4) && (this.status === 200)) {
						return content = httpRequest.responseText;
					}
				};
				httpRequest.open('GET', url, false);
				httpRequest.send();
			}
		}
		return content;
	};

	/*
	 * Returns the text content of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @returns {string} The text content of element.
	 * @private
	 * @function hatemile.util.css.jscssp.JSCSSPParser.getContentFromElement
	 */
	getContentFromElement = function(element) {
		var child, childs, text, _i, _len;
		if (!isEmpty(element.textContent)) {
			return element.textContent;
		}
		if (!isEmpty(element.innerText)) {
			return element.innerText;
		}
		text = '';
		childs = element.childNodes;
		for (_i = 0, _len = childs.length; _i < _len; _i++) {
			child = childs[_i];
			if (child.nodeType === element.ownerDocument.TEXT_NODE) {
				text += child.nodeValue;
			} else if (child.nodeType === element.ownerDocument.ELEMENT_NODE) {
				text += getContentFromElement(elementChild);
			}
		}
		return text;
	};

	/**
	 * Initializes a new object that encapsulate the CSS parser.
	 * @param {jscsspStylesheet|HTMLDocument|string} parser The JSCSSP parser, the
	 * document object or a string with CSS rules.
	 * @param {string} currentURL The current URL of page.
	 * @class The JSCSSPParser class is official implementation of
	 * StyleSheetParser interface for JSCSSP.
	 * @implements {hatemile.util.css.StyleSheetParser}
	 * @constructs hatemile.util.css.jscssp.JSCSSPParser
	 */
	function JSCSSPParser(parser, currentURL) {
		this.parser = parser;
		this.currentURL = currentURL;
		if (!(this.parser instanceof jscsspStylesheet)) {
			parser = new CSSParser();
			if (this.parser instanceof __exports.HTMLDocument) {
				this.parser = getCSSContent(this.parser, this.currentURL);
			}
			if (typeof this.parser === typeof '') {
				this.parser = parser.parse("body{}" + this.parser, false, false);
			}
		}
	}

	JSCSSPParser.prototype.getRules = function(properties) {
		var nativeRule, property, rule, rules, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
		rules = [];
		if (isEmpty(properties)) {
			_ref = this.parser.cssRules;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				nativeRule = _ref[_i];
				if (nativeRule.type === 1) {
					rules.push(new __exports.hatemile.util.css.jscssp.JSCSSPRule(nativeRule));
				}
			}
		} else {
			_ref1 = this.parser.cssRules;
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				nativeRule = _ref1[_j];
				if (nativeRule.type === 1) {
					rule = new __exports.hatemile.util.css.jscssp.JSCSSPRule(nativeRule);
					for (_k = 0, _len2 = properties.length; _k < _len2; _k++) {
						property = properties[_k];
						if (rule.hasProperty(property)) {
							rules.push(rule);
							break;
						}
					}
				}
			}
		}
		return rules;
	};

	return JSCSSPParser;

})();