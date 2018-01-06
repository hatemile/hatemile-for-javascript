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
    var base, base1,
        extend = function (child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    (base1 = this.hatemile.util).html || (base1.html = {});

    this.hatemile.util.html.HTMLDOMElement = (function (superClass) {
        extend(HTMLDOMElement, superClass);

        function HTMLDOMElement() {
            return HTMLDOMElement.__super__.constructor.apply(this, arguments);
        }

        HTMLDOMElement.prototype.getTagName = function () {};

        HTMLDOMElement.prototype.getAttribute = function (name) {};

        HTMLDOMElement.prototype.setAttribute = function (name, value) {};

        HTMLDOMElement.prototype.removeAttribute = function (name) {};

        HTMLDOMElement.prototype.hasAttribute = function (name) {};

        HTMLDOMElement.prototype.hasAttributes = function () {};

        HTMLDOMElement.prototype.appendElement = function (element) {};

        HTMLDOMElement.prototype.prependElement = function (element) {};

        HTMLDOMElement.prototype.getChildrenElements = function () {};

        HTMLDOMElement.prototype.getChildren = function () {};

        HTMLDOMElement.prototype.normalize = function () {};

        HTMLDOMElement.prototype.hasChildrenElements = function () {};

        HTMLDOMElement.prototype.hasChildren = function () {};

        HTMLDOMElement.prototype.getInnerHTML = function () {};

        HTMLDOMElement.prototype.getOuterHTML = function () {};

        HTMLDOMElement.prototype.cloneElement = function () {};

        HTMLDOMElement.prototype.getFirstElementChild = function () {};

        HTMLDOMElement.prototype.getLastElementChild = function () {};

        HTMLDOMElement.prototype.getFirstNodeChild = function () {};

        HTMLDOMElement.prototype.getLastNodeChild = function () {};

        return HTMLDOMElement;

    })(this.hatemile.util.html.HTMLDOMNode);

}).call(this);
