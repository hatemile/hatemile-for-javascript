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
    var base, base1, base2, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    (base1 = this.hatemile.util).css || (base1.css = {});

    (base2 = this.hatemile.util.css).jscssp || (base2.jscssp = {});

    this.hatemile.util.css.jscssp.JSCSSPParser = (function () {
        var _getAbsolutePath, _getCSSContent, _getContentFromURL;

        _getAbsolutePath = function (currentURL, otherURL) {
            var i, len, relativePart, relativeParts, stackURL, urlRegularExpression;
            if (otherURL.indexOf('//') === 0) {
                if (currentURL.indexOf('https://') === 0) {
                    return "https:" + otherURL;
                } else {
                    return "http:" + otherURL;
                }
            } else if (otherURL.indexOf('data:') === 0) {
                return null;
            } else {
                urlRegularExpression = new RegExp('([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/' + '\\/)?(?:(?:(?:[a-zA-Z0-9_\\.\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]' + '{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2}' + ')+@)?(?:(?:[a-z0-9\\-\\.]|%[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:' + ')*(?:[0-9a-f]{0,4})\\]))(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!' + ':\\.\\?\\+=&@!$\'~*,;\\/\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?');
                if (urlRegularExpression.test(otherURL)) {
                    return otherURL;
                } else {
                    stackURL = currentURL.split('/');
                    stackURL.pop();
                    if (otherURL.indexOf('/') === 0) {
                        return stackURL[0] + "//" + stackURL[2] + otherURL;
                    } else {
                        relativeParts = otherURL.split('/');
                        for (i = 0, len = relativeParts.length; i < len; i++) {
                            relativePart = relativeParts[i];
                            if (relativePart === '..') {
                                stackURL.pop();
                            } else if (relativePart !== '.') {
                                stackURL.push(relativePart);
                            }
                        }
                        return stackURL.join('/');
                    }
                }
            }
        };

        _getCSSContent = function (htmlParser, currentURL) {
            var content, element, elements, i, len;
            content = '';
            elements = htmlParser.find('style,link[rel=stylesheet]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (element.getTagName() === 'STYLE') {
                    content += element.getTextContent();
                }
                if ((element.hasAttribute('rel')) && (element.getAttribute('rel') === 'stylesheet')) {
                    content += _getContentFromURL(_getAbsolutePath(currentURL, element.getAttribute('href')));
                }
            }
            return content;
        };

        _getContentFromURL = function (url) {
            var content, e, error, error1, httpRequest;
            content = '';
            if (url.length > 0) {
                httpRequest = false;
                if (window.XMLHttpRequest) {
                    httpRequest = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    try {
                        httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
                    } catch (error) {
                        e = error;
                        try {
                            httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
                        } catch (error1) {
                            e = error1;
                        }
                    }
                }
                if (httpRequest) {
                    httpRequest.onreadystatechange = function () {
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

        function JSCSSPParser(parser1, currentURL1) {
            var parser;
            this.parser = parser1;
            this.currentURL = currentURL1;
            if (!(this.parser instanceof jscsspStylesheet)) {
                parser = new CSSParser();
                if ((this.parser.find instanceof Function) && (this.parser.listResults instanceof Function) && (this.parser.getParser instanceof Function)) {
                    this.parser = _getCSSContent(this.parser, this.currentURL);
                }
                if (typeof this.parser === typeof '') {
                    this.parser = parser.parse("body{}" + this.parser, false, false);
                }
            }
        }

        JSCSSPParser.prototype.getRules = function (properties) {
            var i, j, k, len, len1, len2, nativeRule, property, ref, ref1, rule, rules;
            rules = [];
            if ((properties === void 0) || (properties.length === 0)) {
                ref = this.parser.cssRules;
                for (i = 0, len = ref.length; i < len; i++) {
                    nativeRule = ref[i];
                    if (nativeRule.type === 1) {
                        rules.push(new self.hatemile.util.css.jscssp.JSCSSPRule(nativeRule));
                    }
                }
            } else {
                ref1 = this.parser.cssRules;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    nativeRule = ref1[j];
                    if (nativeRule.type === 1) {
                        rule = new self.hatemile.util.css.jscssp.JSCSSPRule(nativeRule);
                        for (k = 0, len2 = properties.length; k < len2; k++) {
                            property = properties[k];
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

}).call(this);
