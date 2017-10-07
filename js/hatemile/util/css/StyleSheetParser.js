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


/**
 * @namespace hatemile
 */

(function () {
    var base, base1;

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
     * The StyleSheetParser interface contains the methods for access the CSS
     * parser.
     * @interface hatemile.util.css.StyleSheetParser
     */

    this.hatemile.util.css.StyleSheetParser = (function () {
        function StyleSheetParser() {}


        /**
         * Returns the rules of parser by properties.
         * @param {string[]} properties The properties.
         * @returns {hatemile.util.css.StyleSheetRule[]} The rules.
         * @public
         * @function hatemile.util.css.StyleSheetParser#getRules
         */

        StyleSheetParser.prototype.getRules = function (properties) {};

        return StyleSheetParser;

    })();

}).call(this);
