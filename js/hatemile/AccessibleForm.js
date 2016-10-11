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

var exports;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @class AccessibleForm
 * @classdesc The AccessibleForm interface fixes accessibility problems
 * associated with forms.
 * @memberof hatemile
 */
exports.hatemile.AccessibleForm = (function() {
	function AccessibleForm() {
	}

	/**
	 * Display that the field is required.
	 * @param {hatemile.util.html.HTMLDOMElement} requiredField The required field.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixRequiredField = function(requiredField) {
	};

	/**
	 * Display that the fields is required.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixAllRequiredFields = function() {
	};

	/**
	 * Display that the field have range.
	 * @param {hatemile.util.html.HTMLDOMElement} rangeField The range field.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixRangeField = function(rangeField) {
	};

	/**
	 * Display that the fields have range.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixAllRangeFields = function() {
	};

	/**
	 * Display that the field have autocomplete.
	 * @param {hatemile.util.html.HTMLDOMElement} autoCompleteField The field
	 * with autocomplete.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixAutoCompleteField = function(autoCompleteField) {
	};

	/**
	 * Display that the fields have autocomplete.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixAllAutoCompleteFields = function() {
	};

	/**
	 * Associate label with field.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixLabel = function(label) {
	};

	/**
	 * Associate labels with fields.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixAllLabels = function() {
	};

	/**
	 * Provide a solution to display when this field is invalid.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixValidation = function(field) {
	};

	/**
	 * Provide a solution to display when fields are invalid.
	 * @memberof hatemile.AccessibleForm
	 */
	AccessibleForm.prototype.fixAllValidations = function() {
	};

	return AccessibleForm;

})();
