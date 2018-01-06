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

    (base1 = this.hatemile.util).html || (base1.html = {});

    (base2 = this.hatemile.util.html).vanilla || (base2.vanilla = {});

    this.hatemile.util.html.vanilla.VanillaHTMLDOMParser = (function () {
        var _isDescendant;

        _isDescendant = function (possibleAncestor, possibleDescendant) {
            var ancestor;
            ancestor = possibleDescendant.parentNode;
            while ((ancestor !== void 0) && (ancestor !== null)) {
                if (ancestor === possibleAncestor) {
                    return true;
                }
                ancestor = ancestor.parentNode;
            }
            return false;
        };

        function VanillaHTMLDOMParser(ownerDocument) {
            this.ownerDocument = ownerDocument;
            this.results = [];
        }

        VanillaHTMLDOMParser.prototype.find = function (selector) {
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                this.results = [selector.getData()];
            } else {
                this.results = this.ownerDocument.querySelectorAll(selector);
            }
            return this;
        };

        VanillaHTMLDOMParser.prototype.findChildren = function (selector) {
            var children, descendant, descendants, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, result, resultChild;
            children = [];
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                ref = this.results;
                for (i = 0, len = ref.length; i < len; i++) {
                    result = ref[i];
                    ref1 = result.children;
                    for (j = 0, len1 = ref1.length; j < len1; j++) {
                        resultChild = ref1[j];
                        if (selector.getData() === resultChild) {
                            children.push(selector.getData());
                            break;
                        }
                    }
                    if (children.length > 0) {
                        break;
                    }
                }
            } else {
                ref2 = this.results;
                for (k = 0, len2 = ref2.length; k < len2; k++) {
                    result = ref2[k];
                    descendants = result.querySelectorAll(selector);
                    for (l = 0, len3 = descendants.length; l < len3; l++) {
                        descendant = descendants[l];
                        if (descendant.parentNode === result) {
                            children.push(descendant);
                        }
                    }
                }
            }
            this.results = children;
            return this;
        };

        VanillaHTMLDOMParser.prototype.findDescendants = function (selector) {
            var descendants, i, j, k, len, len1, len2, ref, ref1, result, resultDescendant, resultDescendants;
            descendants = [];
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                ref = this.results;
                for (i = 0, len = ref.length; i < len; i++) {
                    result = ref[i];
                    if (_isDescendant(result, selector.getData())) {
                        descendants.push(selector.getData());
                        break;
                    }
                }
            } else {
                ref1 = this.results;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    result = ref1[j];
                    resultDescendants = result.querySelectorAll(selector);
                    for (k = 0, len2 = resultDescendants.length; k < len2; k++) {
                        resultDescendant = resultDescendants[k];
                        descendants.push(resultDescendant);
                    }
                }
            }
            this.results = descendants;
            return this;
        };

        VanillaHTMLDOMParser.prototype.findAncestors = function (selector) {
            var ancestors, element, elements, i, j, k, len, len1, len2, ref, ref1, result;
            ancestors = [];
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                ref = this.results;
                for (i = 0, len = ref.length; i < len; i++) {
                    result = ref[i];
                    if (_isDescendant(selector.getData(), result)) {
                        ancestors.push(selector.getData());
                        break;
                    }
                }
            } else {
                elements = this.ownerDocument.querySelectorAll(selector);
                ref1 = this.results;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    result = ref1[j];
                    for (k = 0, len2 = elements.length; k < len2; k++) {
                        element = elements[k];
                        if (_isDescendant(element, result)) {
                            ancestors.push(element);
                        }
                    }
                }
            }
            this.results = ancestors;
            return this;
        };

        VanillaHTMLDOMParser.prototype.firstResult = function () {
            if (this.results.length === 0) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results[0]);
        };

        VanillaHTMLDOMParser.prototype.lastResult = function () {
            if (this.results.length === 0) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results[this.results.length - 1]);
        };

        VanillaHTMLDOMParser.prototype.listResults = function () {
            var array, i, len, ref, result;
            array = [];
            ref = this.results;
            for (i = 0, len = ref.length; i < len; i++) {
                result = ref[i];
                array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(result));
            }
            return array;
        };

        VanillaHTMLDOMParser.prototype.createElement = function (tag) {
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.ownerDocument.createElement(tag));
        };

        VanillaHTMLDOMParser.prototype.getHTML = function () {
            return this.ownerDocument.documentElement.outerHTML;
        };

        VanillaHTMLDOMParser.prototype.getParser = function () {
            return this.ownerDocument;
        };

        VanillaHTMLDOMParser.prototype.clearParser = function () {
            this.results = [];
        };

        return VanillaHTMLDOMParser;

    })();

}).call(this);
