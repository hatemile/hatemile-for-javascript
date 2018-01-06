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
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    this.hatemile.util.IDGenerator = (function () {
        function IDGenerator(prefixPart) {
            var randomNumber;
            randomNumber = Math.floor(Math.random() * 9007199254740991).toString();
            if (prefixPart === void 0) {
                this.prefixId = "id-hatemile-" + randomNumber + "-";
            } else {
                this.prefixId = "id-hatemile-" + prefixPart + "-" + randomNumber + "-";
            }
            this.count = 0;
        }

        IDGenerator.prototype.generateId = function (element) {
            if (!element.hasAttribute('id')) {
                element.setAttribute('id', this.prefixId + this.count.toString());
                this.count = this.count + 1;
            }
        };

        return IDGenerator;

    })();

}).call(this);
