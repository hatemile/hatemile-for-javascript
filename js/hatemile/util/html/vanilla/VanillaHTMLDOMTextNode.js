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
 * @class VanillaHTMLDOMTextNode
 * @classdesc The VanillaHTMLDOMTextNode class is official implementation of
 * HTMLDOMElement interface for the Javascript.
 * @extends hatemile.util.html.HTMLDOMElement
 * @memberof hatemile.util.html.vanilla
 */
exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode = (function() {
	/**
	 * Initializes a new object that encapsulate the HTMLElement.
	 * @param {HTMLElement} data The native element.
	 * @memberof hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
	 */
	function VanillaHTMLDOMTextNode(data) {
		this.data = data;
	}

	VanillaHTMLDOMTextNode.prototype.setTextContent = function(text) {
		return this.data.nodeValue = text;
	};

	VanillaHTMLDOMTextNode.prototype.getTextContent = function() {
		return this.data.nodeValue;
	};

	VanillaHTMLDOMTextNode.prototype.removeNode = function() {
		this.data.remove();
		return this;
	};

	VanillaHTMLDOMTextNode.prototype.replaceNode = function(newElement) {
		var parent;
		parent = this.data.parentNode;
		parent.replaceChild(newElement.getData(), this.data);
		return newElement;
	};

	VanillaHTMLDOMTextNode.prototype.appendText = function(text) {
		this.data.appendChild(this.data.ownerDocument.createTextNode(text));
	};

	VanillaHTMLDOMTextNode.prototype.prependText = function(text) {
		var firstChildNode;
		if (isEmpty(this.data.childNodes)) {
			appendText(text);
		} else {
			firstChildNode = this.data.childNodes[0];
			this.data.insertBefore(document.createTextNode(text), firstChildNode);
		}
		return element;
	};

	VanillaHTMLDOMTextNode.prototype.getParentElement = function() {
		if (isEmpty(this.data.parentNode)) {
			return void 0;
		}
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(this.data.parentNode);
	};

	VanillaHTMLDOMTextNode.prototype.getData = function() {
		return this.data;
	};

	VanillaHTMLDOMTextNode.prototype.setData = function(data) {
		this.data = data;
	};

	VanillaHTMLDOMTextNode.prototype.cloneElement = function() {
		var div;
		div = this.data.ownerDocument.createElement('div');
		div.innerHTML = this.getOuterHTML();
		return new exports.hatemile.util.html.vanilla.VanillaHTMLDOMElement(div.firstElementChild);
	};

	VanillaHTMLDOMTextNode.prototype.equals = function(node) {
		if (node instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode) {
			if (this.data === node.getData()) {
				return true;
			}
		}
		return false;
	};

	return VanillaHTMLDOMTextNode;

})();
