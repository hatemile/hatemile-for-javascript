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
'use strict'

# @namespace hatemile
#
@hatemile or= {}

# The AccessibleForm interface improve the accessibility of forms.
#
# @abstract
#
class @hatemile.AccessibleForm
  
  # Mark that the field is required.
  #
  # @param [hatemile.util.html.HTMLDOMElement] requiredField The required field.
  #
  markRequiredField: (requiredField) ->
  
  # Mark that the fields is required.
  #
  markAllRequiredFields: () ->
  
  # Mark that the field have range.
  #
  # @param [hatemile.util.html.HTMLDOMElement] rangeField The range field.
  #
  markRangeField: (rangeField) ->
  
  # Mark that the fields have range.
  #
  markAllRangeFields: () ->
  
  # Mark that the field have autocomplete.
  #
  # @param [hatemile.util.html.HTMLDOMElement] autoCompleteField The field with autocomplete.
  #
  markAutoCompleteField: (autoCompleteField) ->
  
  # Mark that the fields have autocomplete.
  #
  markAllAutoCompleteFields: () ->
  
  # Mark a solution to display that this field is invalid.
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  markInvalidField: (field) ->
  
  # Mark a solution to display that a fields are invalid.
  #
  markAllInvalidFields: () ->
