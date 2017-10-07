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
    var base, base1, base2, self;

    self = this;


    /**
     * @namespace hatemile
     */

    this.hatemile || (this.hatemile = {});


    /**
     * @namespace hatemile.util
     */

    (base = this.hatemile).util || (base.util = {});


    /**
     * @namespace hatemile.util.css
     */

    (base1 = this.hatemile.util).css || (base1.css = {});


    /**
     * @namespace hatemile.util.css.jscssp
     */

    (base2 = this.hatemile.util.css).jscssp || (base2.jscssp = {});

    this.hatemile.util.css.jscssp.JSCSSPRule = (function () {

        /**
         * Initializes a new object that encapsulate the CSS rule.
         * @param {jscsspStyleRule} rule The JSCSSP rule.
         * @class The JSCSSPRule class is official implementation of StyleSheetRule
         * interface for JSCSSP.
         * @implements {hatemile.util.css.StyleSheetRule}
         * @constructs hatemile.util.css.jscssp.JSCSSPRule
         */
        function JSCSSPRule(rule) {
            this.rule = rule;
        }

        JSCSSPRule.prototype.hasProperty = function (propertyName) {
            var declaration, i, len, nativeDeclaration, ref;
            ref = this.rule.declarations;
            for (i = 0, len = ref.length; i < len; i++) {
                nativeDeclaration = ref[i];
                declaration = new self.hatemile.util.css.jscssp.JSCSSPDeclaration(nativeDeclaration);
                if (propertyName === declaration.getProperty()) {
                    return true;
                }
            }
            return false;
        };

        JSCSSPRule.prototype.hasDeclarations = function () {
            return this.rule.declarations.length > 0;
        };

        JSCSSPRule.prototype.getDeclarations = function (propertyName) {
            var declaration, declarations, i, len, nativeDeclaration, ref;
            declarations = [];
            ref = this.rule.declarations;
            for (i = 0, len = ref.length; i < len; i++) {
                nativeDeclaration = ref[i];
                declaration = new self.hatemile.util.css.jscssp.JSCSSPDeclaration(nativeDeclaration);
                if (propertyName === declaration.getProperty()) {
                    declarations.push(declaration);
                }
            }
            return declarations;
        };

        JSCSSPRule.prototype.getSelector = function () {
            return this.rule.mSelectorText;
        };

        return JSCSSPRule;

    })();

}).call(this);
