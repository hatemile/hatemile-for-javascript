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

    this.hatemile.util.html.vanilla.VanillaHTMLDOMElement = (function () {
        function VanillaHTMLDOMElement(data1) {
            this.data = data1;
        }

        VanillaHTMLDOMElement.prototype.getTagName = function () {
            return this.data.tagName.toUpperCase();
        };

        VanillaHTMLDOMElement.prototype.getAttribute = function (name) {
            if (this.hasAttribute(name)) {
                return this.data.getAttribute(name);
            } else {
                return null;
            }
        };

        VanillaHTMLDOMElement.prototype.setAttribute = function (name, value) {
            this.data.setAttribute(name, value);
        };

        VanillaHTMLDOMElement.prototype.removeAttribute = function (name) {
            if (this.hasAttribute(name)) {
                this.data.removeAttribute(name);
            }
        };

        VanillaHTMLDOMElement.prototype.hasAttribute = function (name) {
            return this.data.hasAttribute(name);
        };

        VanillaHTMLDOMElement.prototype.hasAttributes = function () {
            return this.data.hasAttributes();
        };

        VanillaHTMLDOMElement.prototype.getTextContent = function () {
            var child, childs, elementChild, i, len, text;
            if (this.data.textContent !== void 0) {
                return this.data.textContent;
            }
            if (this.data.innerText !== void 0) {
                return this.data.innerText;
            }
            text = '';
            childs = this.data.childNodes;
            for (i = 0, len = childs.length; i < len; i++) {
                child = childs[i];
                if (child.nodeType === this.data.ownerDocument.TEXT_NODE) {
                    text += child.nodeValue;
                } else if (child.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
                    elementChild = new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child);
                    text += elementChild.getTextContent();
                }
            }
            return text;
        };

        VanillaHTMLDOMElement.prototype.insertBefore = function (newNode) {
            this.data.parentNode.insertBefore(newNode.getData(), this.data);
            return this;
        };

        VanillaHTMLDOMElement.prototype.insertAfter = function (newNode) {
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

        VanillaHTMLDOMElement.prototype.removeNode = function () {
            this.data.remove();
            return this;
        };

        VanillaHTMLDOMElement.prototype.replaceNode = function (newNode) {
            this.data.parentNode.replaceChild(newNode.getData(), this.data);
            return this;
        };

        VanillaHTMLDOMElement.prototype.appendElement = function (element) {
            this.data.appendChild(element.getData());
            return this;
        };

        VanillaHTMLDOMElement.prototype.prependElement = function (element) {
            if (this.data.childNodes.length === 0) {
                this.appendElement(element);
            } else {
                this.data.insertBefore(element.getData(), this.data.childNodes[0]);
            }
            return this;
        };

        VanillaHTMLDOMElement.prototype.getChildrenElements = function () {
            var array, child, children, i, len;
            children = this.data.children;
            array = [];
            for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child));
            }
            return array;
        };

        VanillaHTMLDOMElement.prototype.getChildren = function () {
            var array, child, children, i, len;
            children = this.data.childNodes;
            array = [];
            for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                if (child.nodeType === this.data.ownerDocument.TEXT_NODE) {
                    array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child));
                } else if (child.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
                    array.push(new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child));
                }
            }
            return array;
        };

        VanillaHTMLDOMElement.prototype.appendText = function (text) {
            var child;
            child = this.getLastNodeChild();
            if ((child !== null) && (child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode)) {
                child.appendText(text);
            } else {
                this.data.appendChild(this.data.ownerDocument.createTextNode(text));
            }
            return this;
        };

        VanillaHTMLDOMElement.prototype.prependText = function (text) {
            var child;
            if (!this.hasChildren()) {
                this.appendText(text);
            } else {
                child = this.getFirstNodeChild();
                if (child instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
                    child.prependText(text);
                } else {
                    this.data.insertBefore(this.data.ownerDocument.createTextNode(text), child.getData());
                }
            }
            return this;
        };

        VanillaHTMLDOMElement.prototype.normalize = function () {
            if (this.data.normalize) {
                this.data.normalize();
            }
            return this;
        };

        VanillaHTMLDOMElement.prototype.hasChildrenElements = function () {
            return this.data.children.length > 0;
        };

        VanillaHTMLDOMElement.prototype.hasChildren = function () {
            var child, children, i, len;
            if (!this.data.hasChildNodes()) {
                return false;
            } else {
                children = this.data.childNodes;
                for (i = 0, len = children.length; i < len; i++) {
                    child = children[i];
                    if ((child.nodeType === this.data.ownerDocument.TEXT_NODE) || (child.nodeType === this.data.ownerDocument.ELEMENT_NODE)) {
                        return true;
                    }
                }
                return false;
            }
        };

        VanillaHTMLDOMElement.prototype.getParentElement = function () {
            var parentNode;
            parentNode = this.data.parentNode;
            if (this.getTagName() === 'HTML') {
                return null;
            } else if ((parentNode === void 0) || (parentNode === null)) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(parentNode);
        };

        VanillaHTMLDOMElement.prototype.getInnerHTML = function () {
            return this.data.innerHTML;
        };

        VanillaHTMLDOMElement.prototype.getOuterHTML = function () {
            return this.data.outerHTML;
        };

        VanillaHTMLDOMElement.prototype.getData = function () {
            return this.data;
        };

        VanillaHTMLDOMElement.prototype.setData = function (data) {
            this.data = data;
        };

        VanillaHTMLDOMElement.prototype.cloneElement = function () {
            var div;
            div = this.data.ownerDocument.createElement('div');
            div.innerHTML = this.getOuterHTML();
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(div.firstElementChild);
        };

        VanillaHTMLDOMElement.prototype.getFirstElementChild = function () {
            if (!this.hasChildrenElements()) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.data.firstElementChild);
        };

        VanillaHTMLDOMElement.prototype.getLastElementChild = function () {
            if (!this.hasChildrenElements()) {
                return null;
            }
            return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.data.lastElementChild);
        };

        VanillaHTMLDOMElement.prototype.getFirstNodeChild = function () {
            var child, children, i, len;
            if (!this.hasChildren()) {
                return null;
            }
            children = this.data.childNodes;
            for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                if (child.nodeType === this.data.ownerDocument.TEXT_NODE) {
                    return new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child);
                } else if (child.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
                    return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child);
                }
            }
            return null;
        };

        VanillaHTMLDOMElement.prototype.getLastNodeChild = function () {
            var child, children, i, lastChild, len;
            if (!this.hasChildren()) {
                return null;
            }
            children = this.data.childNodes;
            lastChild = null;
            for (i = 0, len = children.length; i < len; i++) {
                child = children[i];
                if ((child.nodeType === this.data.ownerDocument.TEXT_NODE) || (child.nodeType === this.data.ownerDocument.ELEMENT_NODE)) {
                    lastChild = child;
                }
            }
            if (lastChild === null) {
                return null;
            } else if (lastChild.nodeType === this.data.ownerDocument.TEXT_NODE) {
                return new self.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(lastChild);
            } else if (lastChild.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
                return new self.hatemile.util.html.vanilla.VanillaHTMLDOMElement(lastChild);
            }
        };

        VanillaHTMLDOMElement.prototype.equals = function (node) {
            if (node instanceof self.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
                if (this.data === node.getData()) {
                    return true;
                }
            }
            return false;
        };

        return VanillaHTMLDOMElement;

    })();

}).call(this);
