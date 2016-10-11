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
 * @namespace css
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).css || (_base1.css = {});

(_base2 = exports.hatemile.util.css).jscssp || (_base2.jscssp = {});

exports.hatemile.util.css.jscssp.JSCSSPParser = (function() {
	var getCSSContent, getContentFromElement, getContentFromURL;

	function JSCSSPParser(parser) {
		this.parser = parser;
		if (!(this.parser instanceof jscsspStylesheet)) {
			parser = new CSSParser();
			if (this.parser instanceof exports.HTMLDocument) {
				this.parser = getCSSContent(this.parser);
			}
			if (typeof this.parser === typeof '') {
				this.parser = parser.parse("body{}" + this.parser, false, false);
			}
		}
	}

	getCSSContent = function(doc) {
		var child, content, head, style, styles, tagName, _i, _j, _len, _len1, _ref;
		content = '';
		head = doc.getElementsByTagName('head')[0];
		_ref = head.children;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			child = _ref[_i];
			tagName = child.tagName.toUpperCase();
			if ((tagName === 'LINK') && (child.hasAttribute('rel')) && (child.getAttribute('rel') === 'stylesheet')) {
				content = "" + content + "\n" + (getContentFromURL(child.getAttribute('href')));
			} else if (tagName === 'STYLE') {
				content = "" + content + "\n" + (getContentFromElement(child));
			}
		}
		styles = doc.getElementsByTagName('style');
		for (_j = 0, _len1 = styles.length; _j < _len1; _j++) {
			style = styles[_j];
			if (style.parentNode !== head) {
				content = "" + content + "\n" + (getContentFromElement(style));
			}
		}
		return content;
	};

	getContentFromURL = function(url) {
		var content, e, httpRequest;
		content = null;
		if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (_error) {
				e = _error;
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
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
		return content;
	};

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

	JSCSSPParser.prototype.getRules = function(properties) {
		var nativeRule, property, rule, rules, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
		rules = [];
		if (isEmpty(properties)) {
			_ref = this.parser.cssRules;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				nativeRule = _ref[_i];
				if (nativeRule.type === 1) {
					rules.push(new exports.hatemile.util.css.jscssp.JSCSSPRule(nativeRule));
				}
			}
		} else {
			_ref1 = this.parser.cssRules;
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				nativeRule = _ref1[_j];
				if (nativeRule.type === 1) {
					rule = new exports.hatemile.util.css.jscssp.JSCSSPRule(nativeRule);
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
