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
 * @namespace hatemile.util
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace hatemile.util.html
 */
(_base1 = exports.hatemile.util).html || (_base1.html = {});

/**
 * @namespace hatemile.util.html.vanilla
 */
(_base2 = exports.hatemile.util.html).vanilla || (_base2.vanilla = {});

exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode = (function() {
	/**
	 * Initializes a new object that encapsulate the text node.
	 * @param {Text} data The native text node.
	 * @class The VanillaHTMLDOMTextNode class is official implementation of
	 * HTMLDOMTextNode interface for the Javascript.
	 * @implements {hatemile.util.html.HTMLDOMTextNode}
	 * @constructs hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
	 */
	function VanillaHTMLDOMTextNode(data) {
		this.data = data;
	}

	VanillaHTMLDOMTextNode.prototype.setTextContent = function(text) {
		this.data.nodeValue = text;
	};

	VanillaHTMLDOMTextNode.prototype.getTextContent = function() {
		return this.data.nodeValue;
	};

	VanillaHTMLDOMTextNode.prototype.insertBefore = function(newNode) {
		this.data.parentNode.insertBefore(newNode.getData(), this.data);
		return this;
	};

	VanillaHTMLDOMTextNode.prototype.insertAfter = function(newNode) {
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

	VanillaHTMLDOMTextNode.prototype.removeNode = function() {
		this.data.remove();
		return this;
	};

	VanillaHTMLDOMTextNode.prototype.replaceNode = function(newNode) {
		this.data.parentNode.replaceChild(newNode.getData(), this.data);
		return this;
	};

	VanillaHTMLDOMTextNode.prototype.appendText = function(text) {
		this.setTextContent("" + (this.getTextContent()) + text);
		return this;
	};

	VanillaHTMLDOMTextNode.prototype.prependText = function(text) {
		this.setTextContent("" + text + (this.getTextContent()));
		return this;
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