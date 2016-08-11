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

exports.hatemile.util.css.jsccssp.JSCSSPParser = (function() {
	function JSCSSPParser(parser) {
		this.parser = parser;
		if (!(this.parser instanceof jscsspStylesheet)) {
			parser = new CSSParser();
			this.parser = parser.parse(this.parser, false, false);
		}
	}

	JSCSSPParser.prototype.getRules = function(properties) {
		var nativeRule, property, rule, rules, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
		rules = [];
		if (isEmpty(properties)) {
			_ref = this.parser.cssRules;
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				nativeRule = _ref[_i];
				if (nativeRule.type === 1) {
					rules.push(new exports.hatemile.util.css.jsccssp.JSCSSPRule(nativeRule));
				}
			}
		} else {
			_ref1 = this.parser.cssRules;
			for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
				nativeRule = _ref1[_j];
				if (nativeRule.type === 1) {
					rule = new exports.hatemile.util.css.jsccssp.JSCSSPRule(nativeRule);
					if (!isEmpty(properties)) {
						for (_k = 0, _len2 = properties.length; _k < _len2; _k++) {
							property = properties[_k];
							if (rule.hasProperty(property)) {
								rules.push(rule);
								break;
							}
						}
					}
				}
			}
		}
		return rules;
	};

	return JSCSSPParser;

})();
