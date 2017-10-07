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

(function () {
    var base, self;

    self = this;


    /**
     * @namespace hatemile
     */

    this.hatemile || (this.hatemile = {});


    /**
     * @namespace hatemile.implementation
     */

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleCSSImplementation = (function () {
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

        getFormatedSymbol = function (symbol) {
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

        getDescriptionOfSymbol = function (symbols, symbol) {
            var _symbol, i, len;
            for (i = 0, len = symbols.length; i < len; i++) {
                _symbol = symbols[i];
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

        getRegularExpressionOfSymbols = function (symbols) {
            var formatedSymbol, i, len, regularExpression, symbol;
            regularExpression = void 0;
            for (i = 0, len = symbols.length; i < len; i++) {
                symbol = symbols[i];
                formatedSymbol = getFormatedSymbol(symbol.symbol);
                if (self.isEmpty(regularExpression)) {
                    regularExpression = "(" + formatedSymbol + ")";
                } else {
                    regularExpression = regularExpression + "|(" + formatedSymbol + ")";
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

        isValidInheritElement = function (element) {
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

        isValidElement = function (element) {
            return VALID_TAGS.indexOf(element.getTagName()) !== -1;
        };


        /**
         * Isolate text nodes of element nodes.
         * @param {hatemile.util.html.HTMLDOMElement} element The element.
         * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
         * @private
         * @function hatemile.implementation.AccessibleCSSImplementation.isolateTextNode
         */

        isolateTextNode = function (element, htmlParser) {
            var child, children, elementChild, i, j, len, len1, span;
            if ((element.hasChildrenElements()) && (isValidElement(element))) {
                if (isValidElement(element)) {
                    children = element.getChildren();
                    for (i = 0, len = children.length; i < len; i++) {
                        child = children[i];
                        if (child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
                            span = htmlParser.createElement('span');
                            span.setAttribute(DATA_ISOLATOR_ELEMENT, 'true');
                            span.appendText(child.getTextContent());
                            child.replaceNode(span);
                        }
                    }
                }
                children = element.getChildrenElements();
                for (j = 0, len1 = children.length; j < len1; j++) {
                    elementChild = children[j];
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

        replaceElementByOwnContent = function (element) {
            var child, children, i, len;
            if (element.hasChildrenElements()) {
                children = element.getChildrenElements();
                for (i = 0, len = children.length; i < len; i++) {
                    child = children[i];
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

        visit = function (element, htmlParser, symbols, operation) {
            var child, children, i, len;
            if (isValidInheritElement(element)) {
                if (element.hasChildrenElements()) {
                    children = element.getChildrenElements();
                    for (i = 0, len = children.length; i < len; i++) {
                        child = children[i];
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

        createContentElement = function (content, dataPropertyValue, htmlParser) {
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

        createAuralContentElement = function (content, dataPropertyValue, htmlParser) {
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

        createVisualContentElement = function (content, dataPropertyValue, htmlParser) {
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

        speakNormal = function (element) {
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

        speakNormalInherit = function (element, htmlParser) {
            visit(element, htmlParser, null, speakNormal);
            element.normalize();
        };


        /**
         * No speak any content of element only.
         * @param {hatemile.util.html.HTMLDOMElement} element The element.
         * @private
         * @function hatemile.implementation.AccessibleCSSImplementation.speakNone
         */

        speakNone = function (element) {
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

        speakNoneInherit = function (element, htmlParser) {
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

        speakAs = function (element, regularExpression, dataPropertyValue, htmlParser, operation) {
            var child, children, content, i, index, len;
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
                for (i = 0, len = children.length; i < len; i++) {
                    child = children[i];
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

        reverseSpeakAs = function (element, dataPropertyValue, htmlParser) {
            var auxiliarElement, auxiliarElements, contentElement, contentElements, i, j, len, len1;
            auxiliarElements = htmlParser.find(element).findDescendants("[" + DATA_SPEAK_AS + "=\"" + dataPropertyValue + "\"][unselectable=\"on\"]").listResults();
            for (i = 0, len = auxiliarElements.length; i < len; i++) {
                auxiliarElement = auxiliarElements[i];
                auxiliarElement.removeNode();
            }
            contentElements = htmlParser.find(element).findDescendants("[" + DATA_SPEAK_AS + "=\"" + dataPropertyValue + "\"][" + DATA_ISOLATOR_ELEMENT + "=\"true\"]").listResults();
            for (j = 0, len1 = contentElements.length; j < len1; j++) {
                contentElement = contentElements[j];
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

        speakAsNormal = function (element, htmlParser) {
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

        speakAsSpellOut = function (element, htmlParser) {
            var dataPropertyValue;
            dataPropertyValue = 'spell-out';
            speakAs(element, '[a-zA-Z]', dataPropertyValue, htmlParser, function (content, index, children) {
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

        speakAsSpellOutInherit = function (element, htmlParser) {
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

        speakAsLiteralPunctuation = function (element, htmlParser, symbols) {
            var dataPropertyValue;
            dataPropertyValue = 'literal-punctuation';
            speakAs(element, getRegularExpressionOfSymbols(symbols), dataPropertyValue, htmlParser, function (content, index, children) {
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

        speakAsLiteralPunctuationInherit = function (element, htmlParser, symbols) {
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

        speakAsNoPunctuation = function (element, htmlParser) {
            var dataPropertyValue;
            dataPropertyValue = 'no-punctuation';
            speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', dataPropertyValue, htmlParser, function (content, index, children) {
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

        speakAsNoPunctuationInherit = function (element, htmlParser) {
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

        speakAsDigits = function (element, htmlParser) {
            var dataPropertyValue;
            dataPropertyValue = 'digits';
            speakAs(element, '[0-9]', dataPropertyValue, htmlParser, function (content, index, children) {
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

        speakAsDigitsInherit = function (element, htmlParser) {
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

        speakAsContinuousInherit = function (element, htmlParser) {
            reverseSpeakAs(element, 'digits', htmlParser);
        };


        /**
         * The cells headers of data cell will be spoken for element only.
         * @param {hatemile.util.html.HTMLDOMElement} element The element.
         * @param {hatemile.util.html.HTMLDOMParser} htmlParser The HTML parser.
         * @private
         * @function hatemile.implementation.AccessibleCSSImplementation.speakHeaderAlways
         */

        speakHeaderAlways = function (element, htmlParser) {
            var header, i, idHeader, idsHeaders, len, textHeader;
            idsHeaders = element.getAttribute('headers').split(new RegExp('[ \n\t\r]+'));
            textHeader = '';
            for (i = 0, len = idsHeaders.length; i < len; i++) {
                idHeader = idsHeaders[i];
                header = htmlParser.find("#" + idHeader).firstResult();
                if (!self.isEmpty(header)) {
                    textHeader = "" + textHeader + (header.getTextContent()) + " ";
                }
            }
            if (!self.isEmpty(textHeader)) {
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

        speakHeaderAlwaysInherit = function (element, htmlParser) {
            var cellElement, cellElements, i, len;
            speakHeaderOnceInherit(element, htmlParser);
            cellElements = htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults();
            for (i = 0, len = cellElements.length; i < len; i++) {
                cellElement = cellElements[i];
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

        speakHeaderOnceInherit = function (element, htmlParser) {
            var headerElement, headerElements, i, len;
            headerElements = htmlParser.find(element).findDescendants("span[" + DATA_SPEAK_AS + "=\"always\"]").listResults();
            for (i = 0, len = headerElements.length; i < len; i++) {
                headerElement = headerElements[i];
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

        function AccessibleCSSImplementation(htmlParser1, cssParser, symbols1) {
            this.htmlParser = htmlParser1;
            this.cssParser = cssParser;
            this.symbols = symbols1;
        }

        AccessibleCSSImplementation.prototype.provideSpeakProperties = function (element) {
            var declaration, declarations, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, n, o, p, pattern, propertyValue, propertyValues, rule, rules, speakElement, speakElements;
            rules = this.cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as']);
            for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                speakElements = this.htmlParser.find(rule.getSelector()).listResults();
                for (j = 0, len1 = speakElements.length; j < len1; j++) {
                    speakElement = speakElements[j];
                    if (speakElement.equals(element)) {
                        if (rule.hasProperty('speak')) {
                            declarations = rule.getDeclarations('speak');
                            for (k = 0, len2 = declarations.length; k < len2; k++) {
                                declaration = declarations[k];
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
                            for (l = 0, len3 = declarations.length; l < len3; l++) {
                                declaration = declarations[l];
                                propertyValue = declaration.getValue();
                                pattern = new RegExp('^((normal)|(inherit)|(initial)|(digits)|(literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)|((digits) ((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)))|(((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)) (digits))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|((digits) ((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((digits) (spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|(((literal\\-punctuation)|(no\\-punctuation)) (digits) (spell\\-out))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out) (digits))|((spell\\-out) (digits) ((literal\\-punctuation)|(no\\-punctuation)))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)) (digits)))$', 'g');
                                if (pattern.test(propertyValue)) {
                                    propertyValues = declaration.getValues();
                                    speakAsNormal(element, this.htmlParser);
                                    for (m = 0, len4 = propertyValues.length; m < len4; m++) {
                                        propertyValue = propertyValues[m];
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
                            for (n = 0, len5 = declarations.length; n < len5; n++) {
                                declaration = declarations[n];
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
                            for (o = 0, len6 = declarations.length; o < len6; o++) {
                                declaration = declarations[o];
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
                            for (p = 0, len7 = declarations.length; p < len7; p++) {
                                declaration = declarations[p];
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

        AccessibleCSSImplementation.prototype.provideAllSpeakProperties = function () {
            var element, elements, i, j, len, len1, rule, rules, selector;
            selector = void 0;
            rules = this.cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as']);
            for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                if (selector === void 0) {
                    selector = rule.getSelector();
                } else {
                    selector = selector + "," + (rule.getSelector());
                }
            }
            if (selector !== void 0) {
                elements = this.htmlParser.find(selector).listResults();
                for (j = 0, len1 = elements.length; j < len1; j++) {
                    element = elements[j];
                    if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                        this.provideSpeakProperties(element);
                    }
                }
            }
        };

        return AccessibleCSSImplementation;

    })();

}).call(this);
