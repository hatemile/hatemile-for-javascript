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
    var base, base1, base2;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    (base1 = this.hatemile.util).css || (base1.css = {});

    (base2 = this.hatemile.util.css).jscssp || (base2.jscssp = {});

    this.hatemile.util.css.jscssp.JSCSSPDeclaration = (function () {
        function JSCSSPDeclaration(declaration) {
            this.declaration = declaration;
        }

        JSCSSPDeclaration.prototype.getValue = function () {
            return this.declaration.valueText.trim();
        };

        JSCSSPDeclaration.prototype.getValues = function () {
            var i, len, propertyValue, ref, values;
            values = [];
            ref = this.declaration.values;
            for (i = 0, len = ref.length; i < len; i++) {
                propertyValue = ref[i];
                values.push(propertyValue.value);
            }
            return values;
        };

        JSCSSPDeclaration.prototype.getProperty = function () {
            return this.declaration.property;
        };

        return JSCSSPDeclaration;

    })();

}).call(this);
