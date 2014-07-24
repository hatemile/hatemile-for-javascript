###
Copyright 2014 Carlson Santana Cruz

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
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

class exports.hatemile.implementation.AccessibleFormImpl
	
	###*
	 * Initializes a new object that manipulate the accessibility of the forms of
	 * parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class AccessibleFormImpl
	 * @classdesc The AccessibleFormImpl class is official implementation of
	 * AccessibleForm interface.
	 * @extends hatemile.AccessibleForm
	 * @version 2014-07-23
	 * @memberof hatemile.implementation
	###
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
		@prefixRequiredField = configure.getParameter('prefix-required-field')
		@suffixRequiredField = configure.getParameter('suffix-required-field')
		@dataLabelRequiredField = "data-#{configure.getParameter('data-label-required-field')}"
		@dataIgnore = "data-#{configure.getParameter('data-ignore')}"
	
	###*
	 * Do the label or the aria-label to inform in label that the field is
	 * required.
	 * @param {hatemile.util.HTMLDOMElement} label The label.
	 * @param {hatemile.util.HTMLDOMElement} requiredField The required field.
	 * @param {String} dataLabelRequiredField The name of attribute for the label
	 * of a required field.
	 * @param {String} prefixRequiredField The prefix of required field.
	 * @param {String} suffixRequiredField The suffix of required field.
	 * @memberof hatemile.implementation.AccessibleFormImpl
	###
	fixLabelRequiredField = (label, requiredField, dataLabelRequiredField, prefixRequiredField, suffixRequiredField) ->
		if (requiredField.hasAttribute('required')) or ((requiredField.hasAttribute('aria-required')) and (requiredField.getAttribute('aria-required').toLowerCase() is 'true'))
			if not label.hasAttribute(dataLabelRequiredField)
				label.setAttribute(dataLabelRequiredField, 'true')
			
			if requiredField.hasAttribute('aria-label')
				contentLabel = requiredField.getAttribute('aria-label')
				if (not isEmpty(prefixRequiredField)) and (contentLabel.indexOf(prefixRequiredField) is -1)
					contentLabel = "#{prefixRequiredField} #{contentLabel}"
				if (not isEmpty(suffixRequiredField)) and (contentLabel.indexOf(suffixRequiredField) is -1)
					contentLabel += " #{suffixRequiredField}"
				requiredField.setAttribute('aria-label', contentLabel)
		return
	
	###*
	 * Fix the control to inform if it has autocomplete and the type.
	 * @param {hatemile.util.HTMLDOMElement} control The form control.
	 * @param {Boolean} active If the element has autocomplete.
	 * @memberof hatemile.implementation.AccessibleFormImpl
	###
	fixControlAutoComplete = (control, active, parser) ->
		if active
			control.setAttribute('aria-autocomplete', 'both')
		else if not ((active isnt undefined) and (control.hasAttribute('aria-autocomplete')))
			if control.hasAttribute('list')
				list = parser.find("datalist[id=#{control.getAttribute('list')}]").firstResult()
				if not isEmpty(list)
					control.setAttribute('aria-autocomplete', 'list')
			if (active is false) and ((not control.hasAttribute('aria-autocomplete')) or (not control.getAttribute('aria-autocomplete').toLowerCase() is 'list'))
				control.setAttribute('aria-autocomplete', 'none')
		return
	
	fixRequiredField: (requiredField) ->
		if requiredField.hasAttribute('required')
			requiredField.setAttribute('aria-required', 'true')
			
			if requiredField.hasAttribute('id')
				labels = @parser.find("label[for=#{requiredField.getAttribute('id')}]").listResults()
			if isEmpty(labels)
				labels = @parser.find(requiredField).findAncestors('label').listResults()
			for label in labels
				fixLabelRequiredField(label, requiredField, @dataLabelRequiredField, @prefixRequiredField, @suffixRequiredField)
		return
	
	fixRequiredFields: () ->
		requiredFields = @parser.find('[required]').listResults()
		for requiredField in requiredFields
			if not requiredField.hasAttribute(@dataIgnore)
				@fixRequiredField(requiredField)
		return
	
	fixRangeField: (rangeField) ->
		if rangeField.hasAttribute('min')
			rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'))
		if rangeField.hasAttribute('max')
			rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'))
		return
	
	fixRangeFields: () ->
		rangeFields = @parser.find('[min],[max]').listResults()
		for rangeField in rangeFields
			if not rangeField.hasAttribute(@dataIgnore)
				@fixRangeField(rangeField)
		return
	
	fixLabel: (label) ->
		if label.getTagName() is 'LABEL'
			if label.hasAttribute('for')
				field = @parser.find("##{label.getAttribute('for')}").firstResult()
			else
				field = @parser.find(label).findDescendants('input,select,textarea').firstResult()
				
				if not isEmpty(field)
					exports.hatemile.util.CommonFunctions.generateId(field, @prefixId)
					label.setAttribute('for', field.getAttribute('id'))
			if not isEmpty(field)
				if not field.hasAttribute('aria-label')
					field.setAttribute('aria-label', label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' '))
				
				fixLabelRequiredField(label, field, @dataLabelRequiredField, @prefixRequiredField, @suffixRequiredField)
				
				exports.hatemile.util.CommonFunctions.generateId(label, @prefixId)
				field.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')))
		return
	
	fixLabels: () ->
		labels = @parser.find('label').listResults()
		for label in labels
			if not label.hasAttribute(@dataIgnore)
				@fixLabel(label)
		return
	
	fixAutoComplete: (element) ->
		if element.hasAttribute('autocomplete')
			value = element.getAttribute('autocomplete')
			if value is 'on'
				active = true
			else if value is 'off'
				active = false
			else
				active = undefined
			if active isnt undefined
				if element.getTagName() is 'FORM'
					controls = @parser.find(element).findDescendants('input,textarea').listResults()
					if element.hasAttribute('id')
						id = element.getAttribute('id')
						controls = controls.concat(@parser.find("input[form=#{id}],textarea[form=#{id}]").listResults())
					for control in controls
						fix = true
						if (control.getTagName() is 'INPUT') and (control.hasAttribute('type'))
							type = control.getAttribute('type').toLowerCase()
							if (type is 'button') or (type is 'submit') or (type is 'reset') or (type is 'image') or (type is 'file') or (type is 'checkbox') or (type is 'radio') or (type is 'password') or (type is 'hidden')
								fix = false
						if (fix)
							autoCompleteControlFormValue = control.getAttribute('autocomplete')
							if autoCompleteControlFormValue is 'on'
								fixControlAutoComplete(control, true, @parser)
							else if autoCompleteControlFormValue is 'off'
								fixControlAutoComplete(control, false, @parser)
							else
								fixControlAutoComplete(control, active, @parser)
				else
					fixControlAutoComplete(element, active, @parser)
		if (not element.hasAttribute('aria-autocomplete')) and (element.hasAttribute('list'))
			fixControlAutoComplete(element, undefined, @parser)
		return
	
	fixAutoCompletes: () ->
		elements = @parser.find('[autocomplete],[list]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixAutoComplete(element)
		return