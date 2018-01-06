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
    var base;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).util || (base.util = {});

    this.hatemile.util.Configure = (function () {
        function Configure(parameters) {
            this.parameters = parameters;
        }

        Configure.prototype.getParameters = function () {
            var clonedParameters, key, ref, value;
            clonedParameters = {};
            ref = this.parameters;
            for (key in ref) {
                value = ref[key];
                clonedParameters[key] = value;
            }
            return clonedParameters;
        };

        Configure.prototype.hasParameter = function (parameter) {
            return this.parameters[parameter] !== void 0;
        };

        Configure.prototype.getParameter = function (name) {
            if (!this.hasParameter(name)) {
                throw new Error("Parameter '" + name + "' not found.");
            }
            return this.parameters[name];
        };

        return Configure;

    })();

}).call(this);
