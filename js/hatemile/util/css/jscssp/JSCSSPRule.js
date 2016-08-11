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
 * @namespace css
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).css || (_base1.css = {});

(_base2 = exports.hatemile.util.css).jsccssp || (_base2.jsccssp = {});

exports.hatemile.util.css.jsccssp.JSCSSPRule = (function() {
	function JSCSSPRule(rule) {
		this.rule = rule;
	}

	JSCSSPRule.prototype.hasProperty = function(propertyName) {
		var declaration, nativeDeclaration, _i, _len, _ref;
		_ref = this.rule.declarations;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			nativeDeclaration = _ref[_i];
			declaration = new hatemile.util.css.jsccssp.JSCSSPDeclaration(nativeDeclaration);
			if (propertyName === declaration.getProperty()) {
				return true;
			}
		}
		return false;
	};

	JSCSSPRule.prototype.hasDeclarations = function() {
		return this.rule.declarations.length > 0;
	};

	JSCSSPRule.prototype.getDeclarations = function(propertyName) {
		var declaration, declarations, nativeDeclaration, _i, _len, _ref;
		declarations = [];
		_ref = this.rule.declarations;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			nativeDeclaration = _ref[_i];
			declaration = new hatemile.util.css.jsccssp.JSCSSPDeclaration(nativeDeclaration);
			if (propertyName === declaration.getProperty()) {
				declarations.push(declaration);
			}
		}
		return declarations;
	};

	JSCSSPRule.prototype.getSelector = function() {
		return this.rule.mSelectorText;
	};

	return JSCSSPRule;

})();
