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

var exports, _base, _base1, _base2;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace util
 * @memberof hatemile
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace html
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).html || (_base1.html = {});

/**
 * @namespace vanilla
 * @memberof hatemile.util.html
 */
(_base2 = exports.hatemile.util.html).vanilla || (_base2.vanilla = {});

/**
 * @class VanillaHTMLDOMElement
 * @classdesc The VanillaHTMLDOMElement class is official implementation of
 * HTMLDOMElement interface for the Javascript.
 * @extends hatemile.util.html.HTMLDOMElement
 * @memberof hatemile.util.html.vanilla
 */
exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement = (function() {
	/**
	 * Initializes a new object that encapsulate the HTMLElement.
	 * @param {HTMLElement} data The native element.
	 * @memberof hatemile.util.html.vanilla.VanillaHTMLDOMElement
	 */
	function VanillaHTMLDOMElement(data) {
		this.data = data;
	}

	VanillaHTMLDOMElement.prototype.getTagName = function() {
		return this.data.tagName.toUpperCase();
	};

	VanillaHTMLDOMElement.prototype.getAttribute = function(name) {
		if (this.hasAttribute(name)) {
			return this.data.getAttribute(name);
		} else {
			return null;
		}
	};

	VanillaHTMLDOMElement.prototype.setAttribute = function(name, value) {
		this.data.setAttribute(name, value);
	};

	VanillaHTMLDOMElement.prototype.removeAttribute = function(name) {
		if (this.hasAttribute(name)) {
			this.data.removeAttribute(name);
		}
	};

	VanillaHTMLDOMElement.prototype.hasAttribute = function(name) {
		return this.data.hasAttribute(name);
	};

	VanillaHTMLDOMElement.prototype.hasAttributes = function() {
		return this.data.hasAttributes();
	};

	VanillaHTMLDOMElement.prototype.getTextContent = function() {
		var child, childs, elementChild, text, _i, _len;
		if (!isEmpty(this.data.textContent)) {
			return this.data.textContent;
		}
		if (!isEmpty(this.data.innerText)) {
			return this.data.innerText;
		}
		text = '';
		childs = this.data.childNodes;
		for (_i = 0, _len = childs.length; _i < _len; _i++) {
			child = childs[_i];
			if (child.nodeType === this.data.ownerDocument.TEXT_NODE) {
				text += child.nodeValue;
			} else if (child.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
				elementChild = new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child);
				text += elementChild.getTextContent();
			}
		}
		return text;
	};

	VanillaHTMLDOMElement.prototype.insertBefore = function(newNode) {
		this.data.parentNode.insertBefore(newNode.getData(), this.data);
		return this;
	};

	VanillaHTMLDOMElement.prototype.insertAfter = function(newNode) {
		var child, childs, found, parent, _i, _len;
		parent = this.data.parentNode;
		childs = parent.childNodes;
		found = false;
		for (_i = 0, _len = childs.length; _i < _len; _i++) {
			child = childs[_i];
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

	VanillaHTMLDOMElement.prototype.removeNode = function() {
		this.data.remove();
		return this;
	};

	VanillaHTMLDOMElement.prototype.replaceNode = function(newNode) {
		this.data.parentNode.replaceChild(newNode.getData(), this.data);
		return this;
	};

	VanillaHTMLDOMElement.prototype.appendElement = function(element) {
		this.data.appendChild(element.getData());
		return this;
	};

	VanillaHTMLDOMElement.prototype.prependElement = function(element) {
		if (isEmpty(this.data.childNodes)) {
			this.appendElement(element);
		} else {
			this.data.insertBefore(element.getData(), this.data.childNodes[0]);
		}
		return this;
	};

	VanillaHTMLDOMElement.prototype.getChildrenElements = function() {
		var array, child, children, _i, _len;
		children = this.data.children;
		array = [];
		for (_i = 0, _len = children.length; _i < _len; _i++) {
			child = children[_i];
			array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child));
		}
		return array;
	};

	VanillaHTMLDOMElement.prototype.getChildren = function() {
		var array, child, children, _i, _len;
		children = this.data.childNodes;
		array = [];
		for (_i = 0, _len = children.length; _i < _len; _i++) {
			child = children[_i];
			if (child.nodeType === this.data.ownerDocument.TEXT_NODE) {
				array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child));
			} else if (child.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
				array.push(new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child));
			}
		}
		return array;
	};

	VanillaHTMLDOMElement.prototype.appendText = function(text) {
		var child;
		child = this.getLastNodeChild();
		if ((child !== void 0) && (child instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode)) {
			child.appendText(text);
		} else {
			this.data.appendChild(this.data.ownerDocument.createTextNode(text));
		}
		return this;
	};

	VanillaHTMLDOMElement.prototype.prependText = function(text) {
		var child;
		if (!this.hasChildren()) {
			this.appendText(text);
		} else {
			child = this.getFirstNodeChild();
			if (child instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
				child.prependText(text);
			} else {
				this.data.insertBefore(this.data.ownerDocument.createTextNode(text), child.getData());
			}
		}
		return this;
	};

	VanillaHTMLDOMElement.prototype.normalize = function() {
		if (this.data.normalize) {
			this.data.normalize();
		}
		return this;
	};

	VanillaHTMLDOMElement.prototype.hasChildrenElements = function() {
		return !isEmpty(this.data.children);
	};

	VanillaHTMLDOMElement.prototype.hasChildren = function() {
		var child, children, _i, _len;
		if (!this.data.hasChildNodes()) {
			return false;
		} else {
			children = this.data.childNodes;
			for (_i = 0, _len = children.length; _i < _len; _i++) {
				child = children[_i];
				if ((child.nodeType === this.data.ownerDocument.TEXT_NODE) || (child.nodeType === this.data.ownerDocument.ELEMENT_NODE)) {
					return true;
				}
			}
			return false;
		}
	};

	VanillaHTMLDOMElement.prototype.getParentElement = function() {
		if (this.getTagName() === 'HTML') {
			return void 0;
		} else if (isEmpty(this.data.parentNode)) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.data.parentNode);
	};

	VanillaHTMLDOMElement.prototype.getInnerHTML = function() {
		return this.data.innerHTML;
	};

	VanillaHTMLDOMElement.prototype.setInnerHTML = function(html) {
		this.data.innerHTML = html;
	};

	VanillaHTMLDOMElement.prototype.getOuterHTML = function() {
		return this.data.outerHTML;
	};

	VanillaHTMLDOMElement.prototype.getData = function() {
		return this.data;
	};

	VanillaHTMLDOMElement.prototype.setData = function(data) {
		this.data = data;
	};

	VanillaHTMLDOMElement.prototype.cloneElement = function() {
		var div;
		div = this.data.ownerDocument.createElement('div');
		div.innerHTML = this.getOuterHTML();
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(div.firstElementChild);
	};

	VanillaHTMLDOMElement.prototype.getFirstElementChild = function() {
		if (!this.hasChildrenElements()) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.data.firstElementChild);
	};

	VanillaHTMLDOMElement.prototype.getLastElementChild = function() {
		if (!this.hasChildrenElements()) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.data.lastElementChild);
	};

	VanillaHTMLDOMElement.prototype.getFirstNodeChild = function() {
		var child, children, _i, _len;
		if (!this.hasChildren()) {
			return void 0;
		}
		children = this.data.childNodes;
		for (_i = 0, _len = children.length; _i < _len; _i++) {
			child = children[_i];
			if (child.nodeType === this.data.ownerDocument.TEXT_NODE) {
				return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(child);
			} else if (child.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
				return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(child);
			}
		}
		return void 0;
	};

	VanillaHTMLDOMElement.prototype.getLastNodeChild = function() {
		var child, children, lastChild, _i, _len;
		if (!this.hasChildren()) {
			return void 0;
		}
		children = this.data.childNodes;
		lastChild = void 0;
		for (_i = 0, _len = children.length; _i < _len; _i++) {
			child = children[_i];
			if ((child.nodeType === this.data.ownerDocument.TEXT_NODE) || (child.nodeType === this.data.ownerDocument.ELEMENT_NODE)) {
				lastChild = child;
			}
		}
		if (lastChild === void 0) {
			return void 0;
		} else if (lastChild.nodeType === this.data.ownerDocument.TEXT_NODE) {
			return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode(lastChild);
		} else if (lastChild.nodeType === this.data.ownerDocument.ELEMENT_NODE) {
			return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(lastChild);
		}
	};

	VanillaHTMLDOMElement.prototype.equals = function(node) {
		if (node instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement) {
			if (this.data === node.getData()) {
				return true;
			}
		}
		return false;
	};

	return VanillaHTMLDOMElement;

})();
