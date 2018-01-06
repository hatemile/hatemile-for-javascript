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
    this.hatemile || (this.hatemile = {});

    this.hatemile.AccessibleForm = (function () {
        function AccessibleForm() {}

        AccessibleForm.prototype.markRequiredField = function (requiredField) {};

        AccessibleForm.prototype.markAllRequiredFields = function () {};

        AccessibleForm.prototype.markRangeField = function (rangeField) {};

        AccessibleForm.prototype.markAllRangeFields = function () {};

        AccessibleForm.prototype.markAutoCompleteField = function (autoCompleteField) {};

        AccessibleForm.prototype.markAllAutoCompleteFields = function () {};

        AccessibleForm.prototype.markInvalidField = function (field) {};

        AccessibleForm.prototype.markAllInvalidFields = function () {};

        return AccessibleForm;

    })();

}).call(this);
