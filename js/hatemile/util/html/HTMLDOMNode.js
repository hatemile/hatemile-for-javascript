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

    this.hatemile.util.html.HTMLDOMNode = (function () {
        function HTMLDOMNode() {}

        HTMLDOMNode.prototype.getTextContent = function () {};

        HTMLDOMNode.prototype.insertBefore = function (newNode) {};

        HTMLDOMNode.prototype.insertAfter = function (newNode) {};

        HTMLDOMNode.prototype.removeNode = function () {};

        HTMLDOMNode.prototype.replaceNode = function (newNode) {};

        HTMLDOMNode.prototype.appendText = function (text) {};

        HTMLDOMNode.prototype.prependText = function (text) {};

        HTMLDOMNode.prototype.getParentElement = function () {};

        HTMLDOMNode.prototype.getData = function () {};

        HTMLDOMNode.prototype.setData = function (data) {};

        HTMLDOMNode.prototype.equals = function (node) {};

        return HTMLDOMNode;

    })();

}).call(this);
