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
    var base, base1;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    (base1 = this.hatemile.util).html || (base1.html = {});

    this.hatemile.util.html.HTMLDOMParser = (function () {
        function HTMLDOMParser() {}

        HTMLDOMParser.prototype.find = function (selector) {};

        HTMLDOMParser.prototype.findChildren = function (selector) {};

        HTMLDOMParser.prototype.findDescendants = function (selector) {};

        HTMLDOMParser.prototype.findAncestors = function (selector) {};

        HTMLDOMParser.prototype.firstResult = function () {};

        HTMLDOMParser.prototype.lastResult = function () {};

        HTMLDOMParser.prototype.listResults = function () {};

        HTMLDOMParser.prototype.createElement = function (tag) {};

        HTMLDOMParser.prototype.getHTML = function () {};

        HTMLDOMParser.prototype.getParser = function () {};

        HTMLDOMParser.prototype.clearParser = function () {};

        return HTMLDOMParser;

    })();

}).call(this);
