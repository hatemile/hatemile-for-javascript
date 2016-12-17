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

var exports, _base, _base1, _ref
		, __hasProp = {}.hasOwnProperty
		, __extends = function(child, parent) {
			for (var key in parent) {
				if (__hasProp.call(parent, key))
					child[key] = parent[key];
			}
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		};

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
 * The HTMLDOMTextNode interface contains the methods for access of the Text.
 * @interface hatemile.util.html.HTMLDOMTextNode
 * @extends hatemile.util.html.HTMLDOMNode
 */
exports.hatemile.util.html.HTMLDOMTextNode = (function(_super) {
	__extends(HTMLDOMTextNode, _super);

	function HTMLDOMTextNode() {
		_ref = HTMLDOMTextNode.__super__.constructor.apply(this, arguments);
		return _ref;
	}

	/**
	 * Change the text content of text node.
	 * @param {string} text The new text content.
	 * @public
	 * @function hatemile.util.html.HTMLDOMTextNode#setTextContent
	 */
	HTMLDOMTextNode.prototype.setTextContent = function(text) {
	};

	return HTMLDOMTextNode;

})(exports.hatemile.util.html.HTMLDOMNode);