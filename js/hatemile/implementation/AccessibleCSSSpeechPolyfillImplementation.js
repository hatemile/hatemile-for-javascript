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
 * @namespace implementation
 * @memberof hatemile
 */
(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleCSSSpeechPolyfillImplementation = (function() {
	var createAuralContentElement, createContentElement, createVisualContentElement, isValidElement, isValidInheritElement, isolateTextNode, normalize, replaceElementByOwnContent, reverseSpeakAs, speakAs, speakAsContinuousInherit, speakAsDigits, speakAsDigitsInherit, speakAsLiteralPunctuation, speakAsLiteralPunctuationInherit, speakAsNoPunctuation, speakAsNoPunctuationInherit, speakAsNormal, speakAsSpellOut, speakAsSpellOutInherit, speakHeaderAlways, speakHeaderAlwaysInherit, speakHeaderOnceInherit, speakNone, speakNoneInherit, speakNormal, speakNormalInherit, visit, _dataIsolatorElement, _dataSpeak, _dataSpeakAs, _dataSpeakHeader, _invalidTags, _validInheritTags;

	_dataIsolatorElement = 'data-auxiliarspan';

	_dataSpeak = 'data-cssspeak';

	_dataSpeakAs = 'data-cssspeakas';

	_dataSpeakHeader = 'data-cssspeakheader';

	_validInheritTags = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'HGROUP', 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TFOOT'];

	_invalidTags = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'LI', 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', 'SUMMARY', 'DETAILS', 'TD', 'TH'];

	function AccessibleCSSSpeechPolyfillImplementation(cssParser, htmlParser, symbols) {
		this.cssParser = cssParser;
		this.htmlParser = htmlParser;
		this.symbols = symbols;
	}

	isValidInheritElement = function(element) {
		return _validInheritTags.indexOf(element.getTagName()) !== -1;
	};

	isValidElement = function(element) {
		return _invalidTags.indexOf(element.getTagName()) === -1;
	};

	normalize = function(element) {
		if ((element.getData().normalize)) {
			element.getData().normalize();
		}
	};

	isolateTextNode = function(element, htmlParser) {
		var child, children, elementChild, nativeChildren, nativeElement, span, _i, _j, _len, _len1;
		if ((element.hasChildren()) && (isValidElement(element))) {
			if (isValidElement(element)) {
				nativeElement = element.getData();
				nativeChildren = nativeElement.childNodes;
				for (_i = 0, _len = nativeChildren.length; _i < _len; _i++) {
					child = nativeChildren[_i];
					if (child.nodeType === nativeElement.ownerDocument.TEXT_NODE) {
						span = htmlParser.createElement('span');
						span.setAttribute(_dataIsolatorElement, 'true');
						span.appendText(child.nodeValue);
						nativeElement.replaceChild(span.getData(), child);
					}
				}
			}
			children = element.getChildren();
			for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
				elementChild = children[_j];
				isolateTextNode(elementChild, htmlParser);
			}
		}
	};

	replaceElementByOwnContent = function(element) {
		var child, children, textNode, _i, _len;
		if (element.hasChildren()) {
			children = element.getChildren();
			for (_i = 0, _len = children.length; _i < _len; _i++) {
				child = children[_i];
				element.insertBefore(child);
			}
			element.removeElement();
		} else {
			textNode = element.getData().ownerDocument.createTextNode(element.getTextContent());
			element.getParentElement().getData().replaceChild(textNode, element.getData());
		}
	};

	visit = function(element, dataProperty, dataPropertyValue, htmlParser, symbols, operation) {
		var child, children, _i, _len;
		if (isValidElement(element)) {
			if (element.hasChildren()) {
				children = element.getChildren();
				for (_i = 0, _len = children.length; _i < _len; _i++) {
					child = children[_i];
					visit(child, dataProperty, dataPropertyValue, htmlParser, symbols, operation);
				}
			} else {
				operation(element, dataProperty, dataPropertyValue, htmlParser, symbols);
			}
		}
	};

	createContentElement = function(content, dataProperty, dataPropertyValue, htmlParser) {
		var contentElement;
		contentElement = htmlParser.createElement('span');
		contentElement.setAttribute(_dataIsolatorElement, 'true');
		contentElement.setAttribute(dataProperty, dataPropertyValue);
		contentElement.appendText(content);
		return contentElement;
	};

	createAuralContentElement = function(content, dataProperty, dataPropertyValue, htmlParser) {
		var contentElement;
		contentElement = createContentElement(content, dataProperty, dataPropertyValue, htmlParser);
		contentElement.setAttribute('unselectable', 'on');
		contentElement.setAttribute('class', 'screen-reader-only');
		return contentElement;
	};

	createVisualContentElement = function(content, dataProperty, dataPropertyValue, htmlParser) {
		var contentElement;
		contentElement = createContentElement(content, dataProperty, dataPropertyValue, htmlParser);
		contentElement.setAttribute('aria-hidden', 'true');
		contentElement.setAttribute('role', 'presentation');
		return contentElement;
	};

	speakNormal = function(element) {
		if (element.hasAttribute(_dataSpeak)) {
			if ((element.getAttribute(_dataSpeak) === 'none') && (!element.hasAttribute(_dataIsolatorElement))) {
				element.removeAttribute('role');
				element.removeAttribute('aria-hidden');
				element.removeAttribute(_dataSpeak);
			} else {
				replaceElementByOwnContent(element);
			}
		}
	};

	speakNormalInherit = function(element, htmlParser) {
		visit(element, null, null, htmlParser, null, speakNormal);
		normalize(element);
	};

	speakNone = function(element) {
		element.setAttribute('role', 'presentation');
		element.setAttribute('aria-hidden', 'true');
		element.setAttribute(_dataSpeak, 'none');
	};

	speakNoneInherit = function(element, htmlParser) {
		isolateTextNode(element, htmlParser);
		visit(element, null, null, htmlParser, null, speakNone);
	};

	speakAs = function(element, regex, dataValue, htmlParser, callback) {
		var child, content, index, nativeElement, newChildren, _i, _len;
		newChildren = [];
		index = -1;
		content = element.getTextContent();
		while (content.length > 0) {
			index = content.search(new RegExp(regex));
			if (index !== -1) {
				callback(content, index, newChildren);
				index = index + 1;
				content = content.substr(index);
			} else {
				break;
			}
		}
		if (newChildren.length > 0) {
			if (content.length > 0) {
				newChildren.push(createContentElement(content, _dataSpeakAs, dataValue, htmlParser));
			}
			nativeElement = element.getData();
			while (nativeElement.childNodes.length > 0) {
				nativeElement.removeChild(nativeElement.childNodes[0]);
			}
			for (_i = 0, _len = newChildren.length; _i < _len; _i++) {
				child = newChildren[_i];
				element.appendElement(child);
			}
		}
	};

	reverseSpeakAs = function(element, dataValue, htmlParser) {
		var auxiliarElement, auxiliarElements, contentElement, contentElements, _i, _j, _len, _len1;
		auxiliarElements = htmlParser.find(element).findDescendants("[" + _dataSpeakAs + "=\"" + dataValue + "\"][unselectable=\"on\"]").listResults();
		for (_i = 0, _len = auxiliarElements.length; _i < _len; _i++) {
			auxiliarElement = auxiliarElements[_i];
			auxiliarElement.removeElement();
		}
		contentElements = htmlParser.find(element).findDescendants("[" + _dataSpeakAs + "=\"" + dataValue + "\"][" + _dataIsolatorElement + "=\"true\"]").listResults();
		for (_j = 0, _len1 = contentElements.length; _j < _len1; _j++) {
			contentElement = contentElements[_j];
			replaceElementByOwnContent(contentElement);
		}
		if ((element.getData().normalize)) {
			element.getData().normalize();
		}
	};

	speakAsNormal = function(element, htmlParser) {
		reverseSpeakAs(element, 'spell-out', htmlParser);
		reverseSpeakAs(element, 'literal-punctuation', htmlParser);
		reverseSpeakAs(element, 'no-punctuation', htmlParser);
		reverseSpeakAs(element, 'digits', htmlParser);
	};

	speakAsSpellOut = function(element, dataProperty, dataPropertyValue, htmlParser) {
		speakAs(element, '[a-zA-Z]', dataPropertyValue, htmlParser, function(content, index, newChildren) {
			newChildren.push(createContentElement(content.substr(0, index + 1), dataProperty, dataPropertyValue, htmlParser));
			return newChildren.push(createAuralContentElement(' ', dataProperty, dataPropertyValue, htmlParser));
		});
	};

	speakAsSpellOutInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'spell-out', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, _dataSpeakAs, 'spell-out', htmlParser, null, speakAsSpellOut);
	};

	speakAsLiteralPunctuation = function(element, dataProperty, dataPropertyValue, htmlParser, symbols) {
		speakAs(element, symbols.getRegularExpression(), dataPropertyValue, htmlParser, function(content, index, newChildren) {
			if (index !== 0) {
				newChildren.push(createContentElement(content.substr(0, index), dataProperty, dataPropertyValue, htmlParser));
			}
			newChildren.push(createAuralContentElement(" " + (symbols.getDescriptionOf(content.charAt(index))) + " ", dataProperty, dataPropertyValue, htmlParser));
			return newChildren.push(createVisualContentElement(content.charAt(index), dataProperty, dataPropertyValue, htmlParser));
		});
	};

	speakAsLiteralPunctuationInherit = function(element, htmlParser, symbols) {
		reverseSpeakAs(element, 'literal-punctuation', htmlParser);
		reverseSpeakAs(element, 'no-punctuation', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, _dataSpeakAs, 'literal-punctuation', htmlParser, symbols, speakAsLiteralPunctuation);
	};

	speakAsNoPunctuation = function(element, dataProperty, dataPropertyValue, htmlParser) {
		speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', dataPropertyValue, htmlParser, function(content, index, newChildren) {
			if (index !== 0) {
				newChildren.push(createContentElement(content.substr(0, index), dataProperty, dataPropertyValue, htmlParser));
			}
			return newChildren.push(createVisualContentElement(content.charAt(index), dataProperty, dataPropertyValue, htmlParser));
		});
	};

	speakAsNoPunctuationInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'literal-punctuation', htmlParser);
		reverseSpeakAs(element, 'no-punctuation', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, _dataSpeakAs, 'no-punctuation', htmlParser, null, speakAsNoPunctuation);
	};

	speakAsDigits = function(element, dataProperty, dataPropertyValue, htmlParser) {
		speakAs(element, '[0-9]', dataPropertyValue, htmlParser, function(content, index, newChildren) {
			if (index !== 0) {
				newChildren.push(createContentElement(content.substr(0, index), dataProperty, dataPropertyValue, htmlParser));
			}
			newChildren.push(createAuralContentElement(' ', dataProperty, dataPropertyValue, htmlParser));
			return newChildren.push(createContentElement(content.charAt(index), dataProperty, dataPropertyValue, htmlParser));
		});
	};

	speakAsDigitsInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'digits', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, _dataSpeakAs, 'digits', htmlParser, null, speakAsDigits);
	};

	speakAsContinuousInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'digits', htmlParser);
	};

	speakHeaderAlways = function(element, htmlParser) {
		var header, idHeader, idsHeaders, textHeader, _i, _len;
		idsHeaders = element.getAttribute('headers').split(new RegExp('[ \n\t\r]+'));
		textHeader = '';
		for (_i = 0, _len = idsHeaders.length; _i < _len; _i++) {
			idHeader = idsHeaders[_i];
			header = htmlParser.find("#" + idHeader).firstResult();
			if (!isEmpty(header)) {
				textHeader = "" + textHeader + (header.getTextContent()) + " ";
			}
		}
		if (!isEmpty(textHeader)) {
			element.prependElement(createAuralContentElement(textHeader, _dataSpeakHeader, 'always', htmlParser));
		}
	};

	speakHeaderAlwaysInherit = function(element, htmlParser) {
		var cellElement, cellElements, _i, _len;
		speakHeaderOnceInherit(element, htmlParser);
		cellElements = htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults();
		for (_i = 0, _len = cellElements.length; _i < _len; _i++) {
			cellElement = cellElements[_i];
			speakHeaderAlways(cellElement, htmlParser);
		}
	};

	speakHeaderOnceInherit = function(element, htmlParser) {
		var headerElement, headerElements, _i, _len;
		headerElements = htmlParser.find(element).findDescendants("span[" + _dataSpeakHeader + "=\"always\"]").listResults();
		for (_i = 0, _len = headerElements.length; _i < _len; _i++) {
			headerElement = headerElements[_i];
			headerElement.removeElement();
		}
	};

	AccessibleCSSSpeechPolyfillImplementation.prototype.fixSpeak = function(element, rule) {
		var declaration, declarations, pattern, propertyValue, propertyValues, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n;
		if (rule.hasProperty('speak')) {
			declarations = rule.getDeclarations('speak');
			for (_i = 0, _len = declarations.length; _i < _len; _i++) {
				declaration = declarations[_i];
				propertyValue = declaration.getValue();
				if (propertyValue === 'none') {
					speakNoneInherit(element, this.htmlParser);
				} else if (propertyValue === 'normal') {
					speakNormalInherit(element, this.htmlParser);
				} else if (propertyValue === 'spell-out') {
					speakAsSpellOutInherit(element, this.htmlParser);
				}
			}
		}
		if (rule.hasProperty('speak-as')) {
			declarations = rule.getDeclarations('speak-as');
			for (_j = 0, _len1 = declarations.length; _j < _len1; _j++) {
				declaration = declarations[_j];
				propertyValue = declaration.getValue();
				pattern = new RegExp('^((normal)|(inherit)|(initial)|(digits)|(literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)|((digits) ((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)))|(((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)) (digits))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|((digits) ((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((digits) (spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|(((literal\\-punctuation)|(no\\-punctuation)) (digits) (spell\\-out))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out) (digits))|((spell\\-out) (digits) ((literal\\-punctuation)|(no\\-punctuation)))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)) (digits)))$', 'g');
				if (pattern.test(propertyValue)) {
					propertyValues = declaration.getValues();
					speakAsNormal(element, this.htmlParser);
					for (_k = 0, _len2 = propertyValues.length; _k < _len2; _k++) {
						propertyValue = propertyValues[_k];
						if (propertyValue === 'spell-out') {
							speakAsSpellOutInherit(element, this.htmlParser);
						} else if (propertyValue === 'literal-punctuation') {
							speakAsLiteralPunctuationInherit(element, this.htmlParser, this.symbols);
						} else if (propertyValue === 'no-punctuation') {
							speakAsNoPunctuationInherit(element, this.htmlParser);
						} else if (propertyValue === 'digits') {
							speakAsDigitsInherit(element, this.htmlParser);
						} else if (propertyValue === 'normal') {
							speakAsNormal(element, this.htmlParser);
						}
					}
				}
			}
		}
		if (rule.hasProperty('speak-punctuation')) {
			declarations = rule.getDeclarations('speak-punctuation');
			for (_l = 0, _len3 = declarations.length; _l < _len3; _l++) {
				declaration = declarations[_l];
				propertyValue = declaration.getValue();
				if (propertyValue === 'code') {
					speakAsLiteralPunctuationInherit(element, this.htmlParser, this.symbols);
				} else if (propertyValue === 'none') {
					speakAsNoPunctuationInherit(element, this.htmlParser);
				}
			}
		}
		if (rule.hasProperty('speak-numeral')) {
			declarations = rule.getDeclarations('speak-numeral');
			for (_m = 0, _len4 = declarations.length; _m < _len4; _m++) {
				declaration = declarations[_m];
				propertyValue = declaration.getValue();
				if (propertyValue === 'digits') {
					speakAsDigitsInherit(element, this.htmlParser);
				} else if (propertyValue === 'continuous') {
					speakAsContinuousInherit(element, this.htmlParser);
				}
			}
		}
		if (rule.hasProperty('speak-header')) {
			declarations = rule.getDeclarations('speak-header');
			for (_n = 0, _len5 = declarations.length; _n < _len5; _n++) {
				declaration = declarations[_n];
				propertyValue = declaration.getValue();
				if (propertyValue === 'always') {
					speakHeaderAlwaysInherit(element, this.htmlParser);
				} else if (propertyValue === 'once') {
					speakHeaderOnceInherit(element, this.htmlParser);
				}
			}
		}
	};

	AccessibleCSSSpeechPolyfillImplementation.prototype.fixSpeaks = function() {
		var element, elements, rule, rules, _i, _j, _len, _len1;
		rules = this.cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as']);
		for (_i = 0, _len = rules.length; _i < _len; _i++) {
			rule = rules[_i];
			if ((rule.hasProperty('speak')) || (rule.hasProperty('speak-punctuation')) || (rule.hasProperty('speak-numeral')) || (rule.hasProperty('speak-header')) || (rule.hasProperty('speak-as'))) {
				elements = this.htmlParser.find(rule.getSelector()).listResults();
				for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
					element = elements[_j];
					this.fixSpeak(element, rule);
				}
			}
		}
	};

	return AccessibleCSSSpeechPolyfillImplementation;

})();
