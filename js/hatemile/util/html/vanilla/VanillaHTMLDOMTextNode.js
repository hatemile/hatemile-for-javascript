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

    this.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode = (function () {
        function VanillaHTMLDOMTextNode(data1) {
            this.data = data1;
        }

        VanillaHTMLDOMTextNode.prototype.setTextContent = function (text) {
            this.data.nodeValue = text;
        };

        VanillaHTMLDOMTextNode.prototype.getTextContent = function () {
            return this.data.nodeValue;
        };

        VanillaHTMLDOMTextNode.prototype.insertBefore = function (newNode) {
            this.data.parentNode.insertBefore(newNode.getData(), this.data);
            return this;
        };

        VanillaHTMLDOMTextNode.prototype.insertAfter = function (newNode) {
            var child, childs, found, i, len, parent;
            parent = this.data.parentNode;
            childs = parent.childNodes;
            found = false;
            for (i = 0, len = childs.length; i < len; i++) {
                child = childs[i];
                if (found) {
                    parent.insertBefore(newNode.getData(), child);
                    return;
                } else if (child === this.data) {
                    found = true;
                }
            }
            parent.appendChild(newNode.getData());
            return this;
        };

        VanillaHTMLDOMTextNode.prototype.removeNode = function () {
            this.data.remove();
            return this;
        };

        VanillaHTMLDOMTextNode.prototype.replaceNode = function (newNode) {
            this.data.parentNode.replaceChild(newNode.getData(), this.data);
            return this;
        };

        VanillaHTMLDOMTextNode.prototype.appendText = function (text) {
            this.setTextContent("" + (this.getTextContent()) + text);
            return this;
        };

        VanillaHTMLDOMTextNode.prototype.prependText = function (text) {
            this.setTextContent("" + text + (this.getTextContent()));
            return this;
        };

        VanillaHTMLDOMTextNode.prototype.getParentElement = function () {
            var parentNode;
            parentNode = this.data.parentNode;
            if ((parentNode === void 0) || (parentNode === null)) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(parentNode);
        };

        VanillaHTMLDOMTextNode.prototype.getData = function () {
            return this.data;
        };

        VanillaHTMLDOMTextNode.prototype.setData = function (data) {
            this.data = data;
        };

        VanillaHTMLDOMTextNode.prototype.equals = function (node) {
            if (node instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
                if (this.data === node.getData()) {
                    return true;
                }
            }
            return false;
        };

        return VanillaHTMLDOMTextNode;

    })();

}).call(this);
