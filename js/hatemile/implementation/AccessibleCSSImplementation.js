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
    'use strict';
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleCSSImplementation = (function () {
        var DATA_ATTRIBUTE_HEADERS_AFTER_OF, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, DATA_IGNORE, DATA_ISOLATOR_ELEMENT, DATA_SPEAK, DATA_SPEAK_AS, VALID_INHERIT_TAGS, VALID_TAGS;

        DATA_ATTRIBUTE_HEADERS_BEFORE_OF = 'data-headersbeforeof';

        DATA_ATTRIBUTE_HEADERS_AFTER_OF = 'data-headersafterof';

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        DATA_ISOLATOR_ELEMENT = 'data-auxiliarspan';

        DATA_SPEAK = 'data-cssspeak';

        DATA_SPEAK_AS = 'data-cssspeakas';

        VALID_INHERIT_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'HGROUP', 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TFOOT'];

        VALID_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'LI', 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', 'SUMMARY', 'DETAILS', 'TD', 'TH'];

        AccessibleCSSImplementation.prototype._getFormatedSymbol = function (symbol) {
            return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+').replace('*', '\\*').replace('?', '\\?').replace('^', '\\^').replace('$', '\\$').replace('[', '\\[').replace(']', '\\[').replace('{', '\\{').replace('}', '\\}').replace('(', '\\(').replace(')', '\\)').replace('|', '\\|').replace('/', '\\/').replace(',', '\\,').replace('!', '\\!').replace('=', '\\=').replace(':', '\\:').replace('-', '\\-');
        };

        AccessibleCSSImplementation.prototype._getDescriptionOfSymbol = function (symbol) {
            var _symbol, i, len, ref;
            ref = this.symbols;
            for (i = 0, len = ref.length; i < len; i++) {
                _symbol = ref[i];
                if (_symbol.symbol === symbol) {
                    return this.configure.getParameter(_symbol.description);
                }
            }
            return null;
        };

        AccessibleCSSImplementation.prototype._getRegularExpressionOfSymbols = function () {
            var formatedSymbol, i, len, ref, regularExpression, symbol;
            regularExpression = null;
            ref = this.symbols;
            for (i = 0, len = ref.length; i < len; i++) {
                symbol = ref[i];
                formatedSymbol = this._getFormatedSymbol(symbol.symbol);
                if (regularExpression === null) {
                    regularExpression = "(" + formatedSymbol + ")";
                } else {
                    regularExpression = regularExpression + "|(" + formatedSymbol + ")";
                }
            }
            return regularExpression;
        };

        AccessibleCSSImplementation.prototype._isValidInheritElement = function (element) {
            return (VALID_INHERIT_TAGS.indexOf(element.getTagName()) !== -1) && (!element.hasAttribute(DATA_IGNORE));
        };

        AccessibleCSSImplementation.prototype._isValidElement = function (element) {
            return VALID_TAGS.indexOf(element.getTagName()) !== -1;
        };

        AccessibleCSSImplementation.prototype._isolateTextNode = function (element) {
            var child, children, elementChild, i, j, len, len1, span;
            if ((element.hasChildrenElements()) && (this._isValidElement(element))) {
                if (this._isValidElement(element)) {
                    children = element.getChildren();
                    for (i = 0, len = children.length; i < len; i++) {
                        child = children[i];
                        if (child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
                            span = this.htmlParser.createElement('span');
                            span.setAttribute(DATA_ISOLATOR_ELEMENT, 'true');
                            span.appendText(child.getTextContent());
                            child.replaceNode(span);
                        }
                    }
                }
                children = element.getChildrenElements();
                for (j = 0, len1 = children.length; j < len1; j++) {
                    elementChild = children[j];
                    this._isolateTextNode(elementChild);
                }
            }
        };

        AccessibleCSSImplementation.prototype._replaceElementByOwnContent = function (element) {
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

        AccessibleCSSImplementation.prototype._visit = function (element, operation) {
            var child, children, i, len;
            if (this._isValidInheritElement(element)) {
                if (element.hasChildrenElements()) {
                    children = element.getChildrenElements();
                    for (i = 0, len = children.length; i < len; i++) {
                        child = children[i];
                        this._visit(child, operation);
                    }
                } else if (this._isValidElement(element)) {
                    operation.call(this, element);
                }
            }
        };

        AccessibleCSSImplementation.prototype._createContentElement = function (content, dataPropertyValue) {
            var contentElement;
            contentElement = this.htmlParser.createElement('span');
            contentElement.setAttribute(DATA_ISOLATOR_ELEMENT, 'true');
            contentElement.setAttribute(DATA_SPEAK_AS, dataPropertyValue);
            contentElement.appendText(content);
            return contentElement;
        };

        AccessibleCSSImplementation.prototype._createAuralContentElement = function (content, dataPropertyValue) {
            var contentElement;
            contentElement = this._createContentElement(content, dataPropertyValue);
            contentElement.setAttribute('unselectable', 'on');
            contentElement.setAttribute('class', 'screen-reader-only');
            return contentElement;
        };

        AccessibleCSSImplementation.prototype._createVisualContentElement = function (content, dataPropertyValue) {
            var contentElement;
            contentElement = this._createContentElement(content, dataPropertyValue);
            contentElement.setAttribute('aria-hidden', 'true');
            contentElement.setAttribute('role', 'presentation');
            return contentElement;
        };

        AccessibleCSSImplementation.prototype._speakNormal = function (element) {
            if (element.hasAttribute(DATA_SPEAK)) {
                if ((element.getAttribute(DATA_SPEAK) === 'none') && (!element.hasAttribute(DATA_ISOLATOR_ELEMENT))) {
                    element.removeAttribute('role');
                    element.removeAttribute('aria-hidden');
                    element.removeAttribute(DATA_SPEAK);
                } else {
                    this._replaceElementByOwnContent(element);
                }
            }
        };

        AccessibleCSSImplementation.prototype._speakNormalInherit = function (element) {
            this._visit(element, this._speakNormal);
            element.normalize();
        };

        AccessibleCSSImplementation.prototype._speakNone = function (element) {
            element.setAttribute('role', 'presentation');
            element.setAttribute('aria-hidden', 'true');
            element.setAttribute(DATA_SPEAK, 'none');
        };

        AccessibleCSSImplementation.prototype._speakNoneInherit = function (element) {
            this._isolateTextNode(element);
            this._visit(element, this._speakNone);
        };

        AccessibleCSSImplementation.prototype._speakAs = function (element, regularExpression, dataPropertyValue, operation) {
            var child, children, content, i, index, len;
            children = [];
            index = -1;
            content = element.getTextContent();
            while (content.length > 0) {
                index = content.search(new RegExp(regularExpression));
                if (index !== -1) {
                    operation.call(this, content, index, children);
                    index = index + 1;
                    content = content.substr(index);
                } else {
                    break;
                }
            }
            if (children.length > 0) {
                if (content.length > 0) {
                    children.push(this._createContentElement(content, dataPropertyValue));
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

        AccessibleCSSImplementation.prototype._reverseSpeakAs = function (element, dataPropertyValue) {
            var auxiliarElement, auxiliarElements, contentElement, contentElements, dataProperty, i, j, len, len1;
            dataProperty = "[" + DATA_SPEAK_AS + "=\"" + dataPropertyValue + "\"]";
            auxiliarElements = this.htmlParser.find(element).findDescendants(dataProperty + "[unselectable=\"on\"]").listResults();
            for (i = 0, len = auxiliarElements.length; i < len; i++) {
                auxiliarElement = auxiliarElements[i];
                auxiliarElement.removeNode();
            }
            contentElements = this.htmlParser.find(element).findDescendants(dataProperty + "[" + DATA_ISOLATOR_ELEMENT + "=\"true\"]").listResults();
            for (j = 0, len1 = contentElements.length; j < len1; j++) {
                contentElement = contentElements[j];
                this._replaceElementByOwnContent(contentElement);
            }
            element.normalize();
        };

        AccessibleCSSImplementation.prototype._speakAsNormal = function (element) {
            this._reverseSpeakAs(element, 'spell-out');
            this._reverseSpeakAs(element, 'literal-punctuation');
            this._reverseSpeakAs(element, 'no-punctuation');
            this._reverseSpeakAs(element, 'digits');
        };

        AccessibleCSSImplementation.prototype._speakAsSpellOut = function (element) {
            var dataPropertyValue;
            dataPropertyValue = 'spell-out';
            this._speakAs(element, '[a-zA-Z]', dataPropertyValue, function (content, index, children) {
                children.push(this._createContentElement(content.substr(0, index + 1), dataPropertyValue));
                return children.push(this._createAuralContentElement(' ', dataPropertyValue));
            });
        };

        AccessibleCSSImplementation.prototype._speakAsSpellOutInherit = function (element) {
            this._reverseSpeakAs(element, 'spell-out');
            this._isolateTextNode(element);
            this._visit(element, this._speakAsSpellOut);
        };

        AccessibleCSSImplementation.prototype._speakAsLiteralPunctuation = function (element) {
            var dataPropertyValue;
            dataPropertyValue = 'literal-punctuation';
            this._speakAs(element, this._getRegularExpressionOfSymbols(), dataPropertyValue, function (content, index, children) {
                if (index !== 0) {
                    children.push(this._createContentElement(content.substr(0, index), dataPropertyValue));
                }
                children.push(this._createAuralContentElement(" " + (this._getDescriptionOfSymbol(content.charAt(index))) + " ", dataPropertyValue));
                return children.push(this._createVisualContentElement(content.charAt(index), dataPropertyValue));
            });
        };

        AccessibleCSSImplementation.prototype._speakAsLiteralPunctuationInherit = function (element) {
            this._reverseSpeakAs(element, 'literal-punctuation');
            this._reverseSpeakAs(element, 'no-punctuation');
            this._isolateTextNode(element);
            this._visit(element, this._speakAsLiteralPunctuation);
        };

        AccessibleCSSImplementation.prototype._speakAsNoPunctuation = function (element) {
            var dataPropertyValue;
            dataPropertyValue = 'no-punctuation';
            this._speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', dataPropertyValue, function (content, index, children) {
                if (index !== 0) {
                    children.push(this._createContentElement(content.substr(0, index), dataPropertyValue));
                }
                return children.push(this._createVisualContentElement(content.charAt(index), dataPropertyValue));
            });
        };

        AccessibleCSSImplementation.prototype._speakAsNoPunctuationInherit = function (element) {
            this._reverseSpeakAs(element, 'literal-punctuation');
            this._reverseSpeakAs(element, 'no-punctuation');
            this._isolateTextNode(element);
            this._visit(element, this._speakAsNoPunctuation);
        };

        AccessibleCSSImplementation.prototype._speakAsDigits = function (element) {
            var dataPropertyValue;
            dataPropertyValue = 'digits';
            this._speakAs(element, '[0-9]', dataPropertyValue, function (content, index, children) {
                if (index !== 0) {
                    children.push(this._createContentElement(content.substr(0, index), dataPropertyValue));
                }
                children.push(this._createAuralContentElement(' ', dataPropertyValue));
                return children.push(this._createContentElement(content.charAt(index), dataPropertyValue));
            });
        };

        AccessibleCSSImplementation.prototype._speakAsDigitsInherit = function (element) {
            this._reverseSpeakAs(element, 'digits');
            this._isolateTextNode(element);
            this._visit(element, this._speakAsDigits);
        };

        AccessibleCSSImplementation.prototype._speakAsContinuousInherit = function (element) {
            this._reverseSpeakAs(element, 'digits');
        };

        AccessibleCSSImplementation.prototype._speakHeaderAlwaysInherit = function (element) {
            var accessibleDisplay, elements, i, len;
            this._speakHeaderOnceInherit(element);
            elements = this.htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults();
            accessibleDisplay = new self.hatemile.implementation.AccessibleDisplayScreenReaderImplementation(this.htmlParser, this.configure);
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                accessibleDisplay.displayCellHeader(element);
            }
        };

        AccessibleCSSImplementation.prototype._speakHeaderOnceInherit = function (element) {
            var elements, i, len;
            elements = this.htmlParser.find(element).findDescendants(("[" + DATA_ATTRIBUTE_HEADERS_BEFORE_OF + "],") + ("[" + DATA_ATTRIBUTE_HEADERS_AFTER_OF + "]")).listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                element.removeNode();
            }
        };

        function AccessibleCSSImplementation(htmlParser, cssParser, configure, symbols) {
            this.htmlParser = htmlParser;
            this.cssParser = cssParser;
            this.configure = configure;
            this.symbols = symbols;
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
                                    this._speakNoneInherit(element);
                                } else if (propertyValue === 'normal') {
                                    this._speakNormalInherit(element);
                                } else if (propertyValue === 'spell-out') {
                                    this._speakAsSpellOutInherit(element);
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
                                    this._speakAsNormal(element);
                                    for (m = 0, len4 = propertyValues.length; m < len4; m++) {
                                        propertyValue = propertyValues[m];
                                        if (propertyValue === 'spell-out') {
                                            this._speakAsSpellOutInherit(element);
                                        } else if (propertyValue === 'literal-punctuation') {
                                            this._speakAsLiteralPunctuationInherit(element);
                                        } else if (propertyValue === 'no-punctuation') {
                                            this._speakAsNoPunctuationInherit(element);
                                        } else if (propertyValue === 'digits') {
                                            this._speakAsDigitsInherit(element);
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
                                    this._speakAsLiteralPunctuationInherit(element);
                                } else if (propertyValue === 'none') {
                                    this._speakAsNoPunctuationInherit(element);
                                }
                            }
                        }
                        if (rule.hasProperty('speak-numeral')) {
                            declarations = rule.getDeclarations('speak-numeral');
                            for (o = 0, len6 = declarations.length; o < len6; o++) {
                                declaration = declarations[o];
                                propertyValue = declaration.getValue();
                                if (propertyValue === 'digits') {
                                    this._speakAsDigitsInherit(element);
                                } else if (propertyValue === 'continuous') {
                                    this._speakAsContinuousInherit(element);
                                }
                            }
                        }
                        if (rule.hasProperty('speak-header')) {
                            declarations = rule.getDeclarations('speak-header');
                            for (p = 0, len7 = declarations.length; p < len7; p++) {
                                declaration = declarations[p];
                                propertyValue = declaration.getValue();
                                if (propertyValue === 'always') {
                                    this._speakHeaderAlwaysInherit(element);
                                } else if (propertyValue === 'once') {
                                    this._speakHeaderOnceInherit(element);
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
