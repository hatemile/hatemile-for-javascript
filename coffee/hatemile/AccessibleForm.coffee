###
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * The AccessibleForm interface improve the accessibility of forms.
 * @interface hatemile.AccessibleForm
###
class exports.hatemile.AccessibleForm
	
	###*
	 * Mark that the field is required.
	 * @param {hatemile.util.html.HTMLDOMElement} requiredField The required field.
	 * @public
	 * @function hatemile.AccessibleForm#markRequiredField
	###
	markRequiredField: (requiredField) ->
	
	###*
	 * Mark that the fields is required.
	 * @public
	 * @function hatemile.AccessibleForm#markAllRequiredFields
	###
	markAllRequiredFields: () ->
	
	###*
	 * Mark that the field have range.
	 * @param {hatemile.util.html.HTMLDOMElement} rangeField The range field.
	 * @public
	 * @function hatemile.AccessibleForm#markRangeField
	###
	markRangeField: (rangeField) ->
	
	###*
	 * Mark that the fields have range.
	 * @public
	 * @function hatemile.AccessibleForm#markAllRangeFields
	###
	markAllRangeFields: () ->
	
	###*
	 * Mark that the field have autocomplete.
	 * @param {hatemile.util.html.HTMLDOMElement} autoCompleteField The field
	 * with autocomplete.
	 * @public
	 * @function hatemile.AccessibleForm#markAutoCompleteField
	###
	markAutoCompleteField: (autoCompleteField) ->
	
	###*
	 * Mark that the fields have autocomplete.
	 * @public
	 * @function hatemile.AccessibleForm#markAllAutoCompleteFields
	###
	markAllAutoCompleteFields: () ->
	
	###*
	 * Associate label with field.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @public
	 * @function hatemile.AccessibleForm#associateLabelWithField
	###
	associateLabelWithField: (label) ->
	
	###*
	 * Associate all labels of page with fields.
	 * @public
	 * @function hatemile.AccessibleForm#associateAllLabelsWithFields
	###
	associateAllLabelsWithFields: () ->
	
	###*
	 * Mark a solution to display that this field is invalid.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @public
	 * @function hatemile.AccessibleForm#markInvalidField
	###
	markInvalidField: (field) ->
	
	###*
	 * Mark a solution to display that a fields are invalid.
	 * @public
	 * @function hatemile.AccessibleForm#markAllInvalidFields
	###
	markAllInvalidFields: () ->