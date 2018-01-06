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

    (base2 = this.hatemile.util.html).jquery || (base2.jquery = {});

    this.hatemile.util.html.jquery.JQueryHTMLDOMParser = (function () {
        function JQueryHTMLDOMParser(html, ownerDocument) {
            this.root = jQuery(html);
            this.results = [];
            if (ownerDocument !== void 0) {
                this.ownerDocument = ownerDocument;
            } else if (html.ownerDocument !== void 0) {
                this.ownerDocument = html.ownerDocument;
            } else {
                this.ownerDocument = document;
            }
        }

        JQueryHTMLDOMParser.prototype.find = function (selector) {
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                selector = selector.getData();
            }
            this.results = this.root.find(selector);
            return this;
        };

        JQueryHTMLDOMParser.prototype.findChildren = function (selector) {
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                selector = selector.getData();
            }
            this.results = jQuery(this.results).children(selector);
            return this;
        };

        JQueryHTMLDOMParser.prototype.findDescendants = function (selector) {
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                selector = selector.getData();
            }
            this.results = jQuery(this.results).find(selector);
            return this;
        };

        JQueryHTMLDOMParser.prototype.findAncestors = function (selector) {
            if (selector instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                selector = selector.getData();
            }
            this.results = jQuery(this.results).parents(selector);
            return this;
        };

        JQueryHTMLDOMParser.prototype.firstResult = function () {
            if (this.results.length === 0) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results.get(0));
        };

        JQueryHTMLDOMParser.prototype.lastResult = function () {
            if (this.results.length === 0) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.results.get(this.results.length - 1));
        };

        JQueryHTMLDOMParser.prototype.listResults = function () {
            var array, i, len, ref, result;
            array = [];
            if (this.results.length > 0) {
                ref = this.results;
                for (i = 0, len = ref.length; i < len; i++) {
                    result = ref[i];
                    array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(result));
                }
            }
            return array;
        };

        JQueryHTMLDOMParser.prototype.createElement = function (tag) {
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.ownerDocument.createElement(tag));
        };

        JQueryHTMLDOMParser.prototype.getHTML = function () {
            return this.ownerDocument.documentElement.outerHTML;
        };

        JQueryHTMLDOMParser.prototype.getParser = function () {
            return this.root;
        };

        JQueryHTMLDOMParser.prototype.clearParser = function () {
            this.results = [];
        };

        return JQueryHTMLDOMParser;

    })();

}).call(this);
