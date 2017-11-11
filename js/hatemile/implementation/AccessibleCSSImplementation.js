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

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleCSSImplementation = (function () {
        var DATA_IGNORE, DATA_ISOLATOR_ELEMENT, DATA_SPEAK, DATA_SPEAK_AS, VALID_INHERIT_TAGS, VALID_TAGS, createAuralContentElement, createContentElement, createVisualContentElement, getDescriptionOfSymbol, getFormatedSymbol, getRegularExpressionOfSymbols, isValidElement, isValidInheritElement, isolateTextNode, replaceElementByOwnContent, reverseSpeakAs, speakAs, speakAsContinuousInherit, speakAsDigits, speakAsDigitsInherit, speakAsLiteralPunctuation, speakAsLiteralPunctuationInherit, speakAsNoPunctuation, speakAsNoPunctuationInherit, speakAsNormal, speakAsSpellOut, speakAsSpellOutInherit, speakHeaderAlways, speakHeaderAlwaysInherit, speakHeaderOnceInherit, speakNone, speakNoneInherit, speakNormal, speakNormalInherit, visit;

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        DATA_ISOLATOR_ELEMENT = 'data-auxiliarspan';

        DATA_SPEAK = 'data-cssspeak';

        DATA_SPEAK_AS = 'data-cssspeakas';

        VALID_INHERIT_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'HGROUP', 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TFOOT'];

        VALID_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'LI', 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', 'SUMMARY', 'DETAILS', 'TD', 'TH'];

        getFormatedSymbol = function (symbol) {
            return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+').replace('*', '\\*').replace('?', '\\?').replace('^', '\\^').replace('$', '\\$').replace('[', '\\[').replace(']', '\\[').replace('{', '\\{').replace('}', '\\}').replace('(', '\\(').replace(')', '\\)').replace('|', '\\|').replace('/', '\\/').replace(',', '\\,').replace('!', '\\!').replace('=', '\\=').replace(':', '\\:').replace('-', '\\-');
        };

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

        getRegularExpressionOfSymbols = function (symbols) {
            var formatedSymbol, i, len, regularExpression, symbol;
            regularExpression = null;
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

        isValidInheritElement = function (element) {
            return (VALID_INHERIT_TAGS.indexOf(element.getTagName()) !== -1) && (!element.hasAttribute(DATA_IGNORE));
        };

        isValidElement = function (element) {
            return VALID_TAGS.indexOf(element.getTagName()) !== -1;
        };

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

        createContentElement = function (content, dataPropertyValue, htmlParser) {
            var contentElement;
            contentElement = htmlParser.createElement('span');
            contentElement.setAttribute(DATA_ISOLATOR_ELEMENT, 'true');
            contentElement.setAttribute(DATA_SPEAK_AS, dataPropertyValue);
            contentElement.appendText(content);
            return contentElement;
        };

        createAuralContentElement = function (content, dataPropertyValue, htmlParser) {
            var contentElement;
            contentElement = createContentElement(content, dataPropertyValue, htmlParser);
            contentElement.setAttribute('unselectable', 'on');
            contentElement.setAttribute('class', 'screen-reader-only');
            return contentElement;
        };

        createVisualContentElement = function (content, dataPropertyValue, htmlParser) {
            var contentElement;
            contentElement = createContentElement(content, dataPropertyValue, htmlParser);
            contentElement.setAttribute('aria-hidden', 'true');
            contentElement.setAttribute('role', 'presentation');
            return contentElement;
        };

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

        speakNormalInherit = function (element, htmlParser) {
            visit(element, htmlParser, null, speakNormal);
            element.normalize();
        };

        speakNone = function (element) {
            element.setAttribute('role', 'presentation');
            element.setAttribute('aria-hidden', 'true');
            element.setAttribute(DATA_SPEAK, 'none');
        };

        speakNoneInherit = function (element, htmlParser) {
            isolateTextNode(element, htmlParser);
            visit(element, htmlParser, null, speakNone);
        };

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

        reverseSpeakAs = function (element, dataPropertyValue, htmlParser) {
            var auxiliarElement, auxiliarElements, contentElement, contentElements, dataProperty, i, j, len, len1;
            dataProperty = "[" + DATA_SPEAK_AS + "=\"" + dataPropertyValue + "\"]";
            auxiliarElements = htmlParser.find(element).findDescendants(dataProperty + "[unselectable=\"on\"]").listResults();
            for (i = 0, len = auxiliarElements.length; i < len; i++) {
                auxiliarElement = auxiliarElements[i];
                auxiliarElement.removeNode();
            }
            contentElements = htmlParser.find(element).findDescendants(dataProperty + "[" + DATA_ISOLATOR_ELEMENT + "=\"true\"]").listResults();
            for (j = 0, len1 = contentElements.length; j < len1; j++) {
                contentElement = contentElements[j];
                replaceElementByOwnContent(contentElement);
            }
            element.normalize();
        };

        speakAsNormal = function (element, htmlParser) {
            reverseSpeakAs(element, 'spell-out', htmlParser);
            reverseSpeakAs(element, 'literal-punctuation', htmlParser);
            reverseSpeakAs(element, 'no-punctuation', htmlParser);
            reverseSpeakAs(element, 'digits', htmlParser);
        };

        speakAsSpellOut = function (element, htmlParser) {
            var dataPropertyValue;
            dataPropertyValue = 'spell-out';
            speakAs(element, '[a-zA-Z]', dataPropertyValue, htmlParser, function (content, index, children) {
                children.push(createContentElement(content.substr(0, index + 1), dataPropertyValue, htmlParser));
                return children.push(createAuralContentElement(' ', dataPropertyValue, htmlParser));
            });
        };

        speakAsSpellOutInherit = function (element, htmlParser) {
            reverseSpeakAs(element, 'spell-out', htmlParser);
            isolateTextNode(element, htmlParser);
            visit(element, htmlParser, null, speakAsSpellOut);
        };

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

        speakAsLiteralPunctuationInherit = function (element, htmlParser, symbols) {
            reverseSpeakAs(element, 'literal-punctuation', htmlParser);
            reverseSpeakAs(element, 'no-punctuation', htmlParser);
            isolateTextNode(element, htmlParser);
            visit(element, htmlParser, symbols, speakAsLiteralPunctuation);
        };

        speakAsNoPunctuation = function (element, htmlParser) {
            var dataPropertyValue;
            dataPropertyValue = 'no-punctuation';
            speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|' + '\\}\\~]', dataPropertyValue, htmlParser, function (content, index, children) {
                if (index !== 0) {
                    children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser));
                }
                return children.push(createVisualContentElement(content.charAt(index), dataPropertyValue, htmlParser));
            });
        };

        speakAsNoPunctuationInherit = function (element, htmlParser) {
            reverseSpeakAs(element, 'literal-punctuation', htmlParser);
            reverseSpeakAs(element, 'no-punctuation', htmlParser);
            isolateTextNode(element, htmlParser);
            visit(element, htmlParser, null, speakAsNoPunctuation);
        };

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

        speakAsDigitsInherit = function (element, htmlParser) {
            reverseSpeakAs(element, 'digits', htmlParser);
            isolateTextNode(element, htmlParser);
            visit(element, htmlParser, null, speakAsDigits);
        };

        speakAsContinuousInherit = function (element, htmlParser) {
            reverseSpeakAs(element, 'digits', htmlParser);
        };

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

        speakHeaderAlwaysInherit = function (element, htmlParser) {
            var cellElement, cellElements, i, len;
            speakHeaderOnceInherit(element, htmlParser);
            cellElements = htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults();
            for (i = 0, len = cellElements.length; i < len; i++) {
                cellElement = cellElements[i];
                speakHeaderAlways(cellElement, htmlParser);
            }
        };

        speakHeaderOnceInherit = function (element, htmlParser) {
            var headerElement, headerElements, i, len;
            headerElements = htmlParser.find(element).findDescendants("span[" + DATA_SPEAK_AS + "=\"always\"]").listResults();
            for (i = 0, len = headerElements.length; i < len; i++) {
                headerElement = headerElements[i];
                headerElement.removeNode();
            }
        };

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
                                pattern = new RegExp('^((normal)|(inherit)|(initial)|(digits)|' + '(literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)' + '|((digits) ((literal\\-punctuation)|(no\\-punctuation)|' + '(spell\\-out)))|(((literal\\-punctuation)|' + '(no\\-punctuation)|(spell\\-out)) (digits))|' + '(((literal\\-punctuation)|(no\\-punctuation)) ' + '(spell\\-out))|((spell\\-out) ((literal\\-punctuation)|' + '(no\\-punctuation)))|((digits) ((literal\\-punctuation)|' + '(no\\-punctuation)) (spell\\-out))|((digits) ' + '(spell\\-out) ((literal\\-punctuation)|' + '(no\\-punctuation)))|(((literal\\-punctuation)|' + '(no\\-punctuation)) (digits) (spell\\-out))|' + '(((literal\\-punctuation)|(no\\-punctuation)) ' + '(spell\\-out) (digits))|((spell\\-out) (digits) ' + '((literal\\-punctuation)|(no\\-punctuation)))|' + '((spell\\-out) ((literal\\-punctuation)|' + '(no\\-punctuation)) (digits)))$', 'g');
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
            selector = null;
            rules = this.cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as']);
            for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                if (selector === null) {
                    selector = rule.getSelector();
                } else {
                    selector = selector + "," + (rule.getSelector());
                }
            }
            if (selector !== null) {
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
