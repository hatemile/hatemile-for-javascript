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
 * @namespace hatemile.implementation
 */
(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleCSSImplementation = (function() {
	var DATA_IGNORE, DATA_ISOLATOR_ELEMENT, DATA_SPEAK, DATA_SPEAK_AS, VALID_INHERIT_TAGS, VALID_TAGS, createAuralContentElement, createContentElement, createVisualContentElement, getDescriptionOfSymbol, getFormatedSymbol, getRegularExpressionOfSymbols, isValidElement, isValidInheritElement, isolateTextNode, replaceElementByOwnContent, reverseSpeakAs, speakAs, speakAsContinuousInherit, speakAsDigits, speakAsDigitsInherit, speakAsLiteralPunctuation, speakAsLiteralPunctuationInherit, speakAsNoPunctuation, speakAsNoPunctuationInherit, speakAsNormal, speakAsSpellOut, speakAsSpellOutInherit, speakHeaderAlways, speakHeaderAlwaysInherit, speakHeaderOnceInherit, speakNone, speakNoneInherit, speakNormal, speakNormalInherit, visit;

	DATA_IGNORE = 'data-ignoreaccessibilityfix';
	DATA_ISOLATOR_ELEMENT = 'data-auxiliarspan';
	DATA_SPEAK = 'data-cssspeak';
	DATA_SPEAK_AS = 'data-cssspeakas';
	VALID_INHERIT_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'HGROUP', 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TFOOT'];
	VALID_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'LI', 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', 'SUMMARY', 'DETAILS', 'TD', 'TH'];

	/**
	 * Returns the symbol formated to be searched by regular expression.
	 * @param {string} symbol The symbol.
	 * @returns {string} The symbol formated.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.getFormatedSymbol
	 */
	getFormatedSymbol = function(symbol) {
		return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+').replace('*', '\\*').replace('?', '\\?').replace('^', '\\^').replace('$', '\\$').replace('[', '\\[').replace(']', '\\[').replace('{', '\\{').replace('}', '\\}').replace('(', '\\(').replace(')', '\\)').replace('|', '\\|').replace('/', '\\/').replace(',', '\\,').replace('!', '\\!').replace('=', '\\=').replace(':', '\\:').replace('-', '\\-');
	};

	/**
	 * Returns the description of symbol.
	 * @param {object[]} symbols The list of symbols and its respective
	 * descriptions.
	 * @param {string} symbols[].symbol The symbol.
	 * @param {string} symbols[].description The description of symbol.
	 * @param {string} symbol The symbol.
	 * @returns {string} The description of symbol.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.getDescriptionOfSymbol
	 */
	getDescriptionOfSymbol = function(symbols, symbol) {
		var _i, _len, _symbol;
		for (_i = 0, _len = symbols.length; _i < _len; _i++) {
			_symbol = symbols[_i];
			if (_symbol.symbol === symbol) {
				return _symbol.description;
			}
		}
		return null;
	};

	/**
	 * Returns the regular expression to search all symbols.
	 * @param {object[]} symbols The list of symbols and its respective
	 * descriptions.
	 * @param {string} symbols[].symbol The symbol.
	 * @param {string} symbols[].description The description of symbol.
	 * @returns {string} The regular expression to search all symbols.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.getRegularExpressionOfSymbols
	 */
	getRegularExpressionOfSymbols = function(symbols) {
		var formatedSymbol, regularExpression, symbol, _i, _len;
		regularExpression = void 0;
		for (_i = 0, _len = symbols.length; _i < _len; _i++) {
			symbol = symbols[_i];
			formatedSymbol = getFormatedSymbol(symbol.symbol);
			if (isEmpty(regularExpression)) {
				regularExpression = "(" + formatedSymbol + ")";
			} else {
				regularExpression = "" + regularExpression + "|(" + formatedSymbol + ")";
			}
		}
		return regularExpression;
	};

	/**
	 * Check that the children of element can be manipulated to apply the CSS
	 * properties.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @returns {boolean} True if the children of element can be manipulated to
	 * apply the CSS properties or false if the children of element can be
	 * manipulated to apply the CSS properties.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.isValidInheritElement
	 */
	isValidInheritElement = function(element) {
		return (VALID_INHERIT_TAGS.indexOf(element.getTagName()) !== -1) && (!element.hasAttribute(DATA_IGNORE));
	};

	/**
	 * Check that the element can be manipulated to apply the CSS properties.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @returns {boolean} True if the element can be manipulated to apply the CSS
	 * properties or false if the element cannot be manipulated to apply the CSS
	 * properties.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.isValidElement
	 */
	isValidElement = function(element) {
		return VALID_TAGS.indexOf(element.getTagName()) !== -1;
	};

	/**
	 * Isolate text nodes of element nodes.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.isolateTextNode
	 */
	isolateTextNode = function(element, htmlParser) {
		var child, children, elementChild, span, _i, _j, _len, _len1;
		if ((element.hasChildrenElements()) && (isValidElement(element))) {
			if (isValidElement(element)) {
				children = element.getChildren();
				for (_i = 0, _len = children.length; _i < _len; _i++) {
					child = children[_i];
					if (child instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
						span = htmlParser.createElement('span');
						span.setAttribute(DATA_ISOLATOR_ELEMENT, 'true');
						span.appendText(child.getTextContent());
						child.replaceNode(span);
					}
				}
			}
			children = element.getChildrenElements();
			for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
				elementChild = children[_j];
				isolateTextNode(elementChild, htmlParser);
			}
		}
	};

	/**
	 * Replace the element by own text content.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.replaceElementByOwnContent
	 */
	replaceElementByOwnContent = function(element) {
		var child, children, _i, _len;
		if (element.hasChildrenElements()) {
			children = element.getChildrenElements();
			for (_i = 0, _len = children.length; _i < _len; _i++) {
				child = children[_i];
				element.insertBefore(child);
			}
			element.removeNode();
		} else if (element.hasChildren()) {
			element.replaceNode(element.getFirstNodeChild());
		}
	};

	/**
	 * Visit and execute a operation in element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @param {object[]} symbols The list of symbols and its respective
	 * descriptions.
	 * @param {string} symbols[].symbol The symbol.
	 * @param {string} symbols[].description The description of symbol.
	 * @param {function} operation The operation to be executed.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.visit
	 */
	visit = function(element, htmlParser, symbols, operation) {
		var child, children, _i, _len;
		if (isValidInheritElement(element)) {
			if (element.hasChildrenElements()) {
				children = element.getChildrenElements();
				for (_i = 0, _len = children.length; _i < _len; _i++) {
					child = children[_i];
					visit(child, htmlParser, symbols, operation);
				}
			} else if (isValidElement(element)) {
				operation(element, htmlParser, symbols);
			}
		}
	};

	/**
	 * Create a element to show the content.
	 * @param {string} content The text content of element.
	 * @param {string} dataPropertyValue The value of custom attribute used to
	 * identify the fix.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @returns {hatemile.util.html.HTMLDOMElement} The element to show the
	 * content.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.createContentElement
	 */
	createContentElement = function(content, dataPropertyValue, htmlParser) {
		var contentElement;
		contentElement = htmlParser.createElement('span');
		contentElement.setAttribute(DATA_ISOLATOR_ELEMENT, 'true');
		contentElement.setAttribute(DATA_SPEAK_AS, dataPropertyValue);
		contentElement.appendText(content);
		return contentElement;
	};

	/**
	 * Create a element to show the content, only to aural displays.
	 * @param {string} content The text content of element.
	 * @param {string} dataPropertyValue The value of custom attribute used to
	 * identify the fix.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @returns {hatemile.util.html.HTMLDOMElement} The element to show the
	 * content.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.createAuralContentElement
	 */
	createAuralContentElement = function(content, dataPropertyValue, htmlParser) {
		var contentElement;
		contentElement = createContentElement(content, dataPropertyValue, htmlParser);
		contentElement.setAttribute('unselectable', 'on');
		contentElement.setAttribute('class', 'screen-reader-only');
		return contentElement;
	};

	/**
	 * Create a element to show the content, only to visual displays.
	 * @param {string} content The text content of element.
	 * @param {string} dataPropertyValue The value of custom attribute used to
	 * identify the fix.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @returns {hatemile.util.html.HTMLDOMElement} The element to show the
	 * content.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.createVisualContentElement
	 */
	createVisualContentElement = function(content, dataPropertyValue, htmlParser) {
		var contentElement;
		contentElement = createContentElement(content, dataPropertyValue, htmlParser);
		contentElement.setAttribute('aria-hidden', 'true');
		contentElement.setAttribute('role', 'presentation');
		return contentElement;
	};

	/**
	 * Speak the content of element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakNormal
	 */
	speakNormal = function(element) {
		if (element.hasAttribute(DATA_SPEAK)) {
			if ((element.getAttribute(DATA_SPEAK) === 'none') && (!element.hasAttribute(DATA_ISOLATOR_ELEMENT))) {
				element.removeAttribute('role');
				element.removeAttribute('aria-hidden');
				element.removeAttribute(DATA_SPEAK);
			} else {
				replaceElementByOwnContent(element);
			}
		}
	};

	/**
	 * Speak the content of element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakNormalInherit
	 */
	speakNormalInherit = function(element, htmlParser) {
		visit(element, htmlParser, null, speakNormal);
		element.normalize();
	};

	/**
	 * No speak any content of element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakNone
	 */
	speakNone = function(element) {
		element.setAttribute('role', 'presentation');
		element.setAttribute('aria-hidden', 'true');
		element.setAttribute(DATA_SPEAK, 'none');
	};

	/**
	 * No speak any content of element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakNoneInherit
	 */
	speakNoneInherit = function(element, htmlParser) {
		isolateTextNode(element, htmlParser);
		visit(element, htmlParser, null, speakNone);
	};

	/**
	 * Execute a operation by regular expression for element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} regularExpression The regular expression.
	 * @param {string} dataPropertyValue The value of custom attribute used to
	 * identify the fix.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @param {function} operation The operation to be executed.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAs
	 */
	speakAs = function(element, regularExpression, dataPropertyValue, htmlParser, operation) {
		var child, children, content, index, _i, _len;
		children = [];
		index = -1;
		content = element.getTextContent();
		while (content.length > 0) {
			index = content.search(new RegExp(regularExpression));
			if (index !== -1) {
				operation(content, index, children);
				index = index + 1;
				content = content.substr(index);
			} else {
				break;
			}
		}
		if (children.length > 0) {
			if (content.length > 0) {
				children.push(createContentElement(content, dataPropertyValue, htmlParser));
			}
			while (element.hasChildren()) {
				element.getFirstNodeChild().removeNode();
			}
			for (_i = 0, _len = children.length; _i < _len; _i++) {
				child = children[_i];
				element.appendElement(child);
			}
		}
	};

	/**
	 * Revert changes of a speakAs method for element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} dataPropertyValue The value of custom attribute used to
	 * identify the fix.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.reverseSpeakAs
	 */
	reverseSpeakAs = function(element, dataPropertyValue, htmlParser) {
		var auxiliarElement, auxiliarElements, contentElement, contentElements, _i, _j, _len, _len1;
		auxiliarElements = htmlParser.find(element).findDescendants("[" + DATA_SPEAK_AS + "=\"" + dataPropertyValue + "\"][unselectable=\"on\"]").listResults();
		for (_i = 0, _len = auxiliarElements.length; _i < _len; _i++) {
			auxiliarElement = auxiliarElements[_i];
			auxiliarElement.removeNode();
		}
		contentElements = htmlParser.find(element).findDescendants("[" + DATA_SPEAK_AS + "=\"" + dataPropertyValue + "\"][" + DATA_ISOLATOR_ELEMENT + "=\"true\"]").listResults();
		for (_j = 0, _len1 = contentElements.length; _j < _len1; _j++) {
			contentElement = contentElements[_j];
			replaceElementByOwnContent(contentElement);
		}
		element.normalize();
	};

	/**
	 * Use the default speak configuration of user agent for element and
	 * descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsNormal
	 */
	speakAsNormal = function(element, htmlParser) {
		reverseSpeakAs(element, 'spell-out', htmlParser);
		reverseSpeakAs(element, 'literal-punctuation', htmlParser);
		reverseSpeakAs(element, 'no-punctuation', htmlParser);
		reverseSpeakAs(element, 'digits', htmlParser);
	};

	/**
	 * Speak one letter at a time for each word for element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsSpellOut
	 */
	speakAsSpellOut = function(element, htmlParser) {
		speakAs(element, '[a-zA-Z]', 'spell-out', htmlParser, function(content, index, children) {
			children.push(createContentElement(content.substr(0, index + 1), dataPropertyValue, htmlParser));
			return children.push(createAuralContentElement(' ', dataPropertyValue, htmlParser));
		});
	};

	/**
	 * Speak one letter at a time for each word for elements and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsSpellOutInherit
	 */
	speakAsSpellOutInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'spell-out', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, htmlParser, null, speakAsSpellOut);
	};

	/**
	 * Speak the punctuation for elements only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @param {object[]} symbols The list of symbols and its respective
	 * descriptions.
	 * @param {string} symbols[].symbol The symbol.
	 * @param {string} symbols[].description The description of symbol.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsLiteralPunctuation
	 */
	speakAsLiteralPunctuation = function(element, htmlParser, symbols) {
		speakAs(element, getRegularExpressionOfSymbols(symbols), 'literal-punctuation', htmlParser, function(content, index, children) {
			if (index !== 0) {
				children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser));
			}
			children.push(createAuralContentElement(" " + (getDescriptionOfSymbol(symbols, content.charAt(index))) + " ", dataPropertyValue, htmlParser));
			return children.push(createVisualContentElement(content.charAt(index), dataPropertyValue, htmlParser));
		});
	};

	/**
	 * Speak the punctuation for elements and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @param {object[]} symbols The list of symbols and its respective
	 * descriptions.
	 * @param {string} symbols[].symbol The symbol.
	 * @param {string} symbols[].description The description of symbol.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsLiteralPunctuationInherit
	 */
	speakAsLiteralPunctuationInherit = function(element, htmlParser, symbols) {
		reverseSpeakAs(element, 'literal-punctuation', htmlParser);
		reverseSpeakAs(element, 'no-punctuation', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, htmlParser, symbols, speakAsLiteralPunctuation);
	};

	/**
	 * No speak the punctuation for element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsNoPunctuation
	 */
	speakAsNoPunctuation = function(element, htmlParser) {
		speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', 'no-punctuation', htmlParser, function(content, index, children) {
			if (index !== 0) {
				children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser));
			}
			return children.push(createVisualContentElement(content.charAt(index), dataPropertyValue, htmlParser));
		});
	};

	/**
	 * No speak the punctuation for element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsNoPunctuationInherit
	 */
	speakAsNoPunctuationInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'literal-punctuation', htmlParser);
		reverseSpeakAs(element, 'no-punctuation', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, htmlParser, null, speakAsNoPunctuation);
	};

	/**
	 * Speak the digit at a time for each number for element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsDigits
	 */
	speakAsDigits = function(element, htmlParser) {
		speakAs(element, '[0-9]', 'no-punctuation', htmlParser, function(content, index, children) {
			if (index !== 0) {
				children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser));
			}
			children.push(createAuralContentElement(' ', dataPropertyValue, htmlParser));
			return children.push(createContentElement(content.charAt(index), dataPropertyValue, htmlParser));
		});
	};

	/**
	 * Speak the digit at a time for each number for element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsDigitsInherit
	 */
	speakAsDigitsInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'digits', htmlParser);
		isolateTextNode(element, htmlParser);
		visit(element, htmlParser, null, speakAsDigits);
	};

	/**
	 * Speaks the numbers for element and descendants as a word number.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakAsContinuousInherit
	 */
	speakAsContinuousInherit = function(element, htmlParser) {
		reverseSpeakAs(element, 'digits', htmlParser);
	};

	/**
	 * The cells headers of data cell will be spoken for element only.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakHeaderAlways
	 */
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
			element.prependElement(createAuralContentElement(textHeader, 'always', htmlParser));
		}
	};

	/**
	 * The cells headers will be spoken for every data cell for element and
	 * descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakHeaderAlwaysInherit
	 */
	speakHeaderAlwaysInherit = function(element, htmlParser) {
		var cellElement, cellElements, _i, _len;
		speakHeaderOnceInherit(element, htmlParser);
		cellElements = htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults();
		for (_i = 0, _len = cellElements.length; _i < _len; _i++) {
			cellElement = cellElements[_i];
			speakHeaderAlways(cellElement, htmlParser);
		}
	};

	/**
	 * The cells headers will be spoken one time for element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleCSSImplementation.speakHeaderOnceInherit
	 */
	speakHeaderOnceInherit = function(element, htmlParser) {
		var headerElement, headerElements, _i, _len;
		headerElements = htmlParser.find(element).findDescendants("span[" + DATA_SPEAK_AS + "=\"always\"]").listResults();
		for (_i = 0, _len = headerElements.length; _i < _len; _i++) {
			headerElement = headerElements[_i];
			headerElement.removeNode();
		}
	};

	/**
	 * Initializes a new object that manipulate the accessibility of the CSS of
	 * parser.
	 * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
	 * @param {hatemile.util.css.StyleSheetParser} cssParser The CSS parser.
	 * @param {object[]} symbols The symbols with descriptions.
	 * @param {string} symbols[].symbol The symbol.
	 * @param {string} symbols[].description The description of symbol.
	 * @class The AccessibleCSSImplementation class is official implementation of
	 * AccessibleCSS interface.
	 * @implements {hatemile.AccessibleCSS}
	 * @constructs hatemile.implementation.AccessibleCSSImplementation
	 */
	function AccessibleCSSImplementation(htmlParser, cssParser, symbols) {
		this.htmlParser = htmlParser;
		this.cssParser = cssParser;
		this.symbols = symbols;
	}

	AccessibleCSSImplementation.prototype.provideSpeakProperties = function(element) {
		var declaration, declarations, pattern, propertyValue, propertyValues, rule, rules, speakElement, speakElements, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p;
		rules = this.cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as']);
		for (_i = 0, _len = rules.length; _i < _len; _i++) {
			rule = rules[_i];
			speakElements = this.htmlParser.find(rule.getSelector()).listResults();
			for (_j = 0, _len1 = speakElements.length; _j < _len1; _j++) {
				speakElement = speakElements[_j];
				if (speakElement.equals(element)) {
					if (rule.hasProperty('speak')) {
						declarations = rule.getDeclarations('speak');
						for (_k = 0, _len2 = declarations.length; _k < _len2; _k++) {
							declaration = declarations[_k];
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
						for (_l = 0, _len3 = declarations.length; _l < _len3; _l++) {
							declaration = declarations[_l];
							propertyValue = declaration.getValue();
							pattern = new RegExp('^((normal)|(inherit)|(initial)|(digits)|(literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)|((digits) ((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)))|(((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)) (digits))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|((digits) ((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((digits) (spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|(((literal\\-punctuation)|(no\\-punctuation)) (digits) (spell\\-out))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out) (digits))|((spell\\-out) (digits) ((literal\\-punctuation)|(no\\-punctuation)))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)) (digits)))$', 'g');
							if (pattern.test(propertyValue)) {
								propertyValues = declaration.getValues();
								speakAsNormal(element, this.htmlParser);
								for (_m = 0, _len4 = propertyValues.length; _m < _len4; _m++) {
									propertyValue = propertyValues[_m];
									if (propertyValue === 'spell-out') {
										speakAsSpellOutInherit(element, this.htmlParser);
									} else if (propertyValue === 'literal-punctuation') {
										speakAsLiteralPunctuationInherit(element, this.htmlParser, this.symbols);
									} else if (propertyValue === 'no-punctuation') {
										speakAsNoPunctuationInherit(element, this.htmlParser);
									} else if (propertyValue === 'digits') {
										speakAsDigitsInherit(element, this.htmlParser);
									}
								}
							}
						}
					}
					if (rule.hasProperty('speak-punctuation')) {
						declarations = rule.getDeclarations('speak-punctuation');
						for (_n = 0, _len5 = declarations.length; _n < _len5; _n++) {
							declaration = declarations[_n];
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
						for (_o = 0, _len6 = declarations.length; _o < _len6; _o++) {
							declaration = declarations[_o];
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
						for (_p = 0, _len7 = declarations.length; _p < _len7; _p++) {
							declaration = declarations[_p];
							propertyValue = declaration.getValue();
							if (propertyValue === 'always') {
								speakHeaderAlwaysInherit(element, this.htmlParser);
							} else if (propertyValue === 'once') {
								speakHeaderOnceInherit(element, this.htmlParser);
							}
						}
					}
				}
			}
		}
	};

	AccessibleCSSImplementation.prototype.provideAllSpeakProperties = function() {
		var element, elements, rule, rules, selector, _i, _j, _len, _len1;
		selector = void 0;
		rules = this.cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as']);
		for (_i = 0, _len = rules.length; _i < _len; _i++) {
			rule = rules[_i];
			if (selector === void 0) {
				selector = rule.getSelector();
			} else {
				selector = "" + selector + "," + (rule.getSelector());
			}
		}
		if (selector !== void 0) {
			elements = this.htmlParser.find(selector).listResults();
			for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
				element = elements[_j];
				if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
					this.provideSpeakProperties(element);
				}
			}
		}
	};

	return AccessibleCSSImplementation;

})();