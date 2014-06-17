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
	 * Initializes a new object that manipulate the accessibility of the
	 * forms of parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class AccessibleFormImpl
	 * @classdesc The AccessibleFormImpl class is official implementation of
	 * AccessibleForm interface.
	 * @extends hatemile.AccessibleForm
	 * @version 1.0
	 * @memberof hatemile.implementation
	###
	constructor: (@parser, configuration) ->
		@prefixId = configuration.getParameter('prefix-generated-ids')
		@dataLabelRequiredField = configuration.getParameter('data-label-required-field')
		@prefixRequiredField = configuration.getParameter('prefix-required-field')
		@suffixRequiredField = configuration.getParameter('suffix-required-field')
		@dataIgnore = configuration.getParameter('data-ignore')

	fixRequiredField: (requiredField) ->
		if requiredField.hasAttribute('required')
			requiredField.setAttribute('aria-required', 'true')
			if requiredField.hasAttribute('id')
				labels = @parser.find("label[for=#{requiredField.getAttribute('id')}]").listResults()
			if isEmpty(labels)
				labels = @parser.find(requiredField).findAncestors('label').listResults()
			for label in labels
				label.setAttribute(@dataLabelRequiredField, 'true')
		return

	fixRequiredFields: () ->
		elements = @parser.find('[required]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixRequiredField(element)
		return

	fixDisabledField: (disabledField) ->
		if disabledField.hasAttribute('disabled')
			disabledField.setAttribute('aria-disabled', 'true')
		return

	fixDisabledFields: () ->
		elements = @parser.find('[disabled]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixDisabledField(element)
		return

	fixReadOnlyField: (readOnlyField) ->
		if readOnlyField.hasAttribute('readonly')
			readOnlyField.setAttribute('aria-readonly', 'true')
		return

	fixReadOnlyFields: () ->
		elements = @parser.find('[readonly]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixReadOnlyField(element)
		return

	fixRangeField: (rangeField) ->
		if rangeField.hasAttribute('min')
			rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'))
		if rangeField.hasAttribute('max')
			rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'))
		return

	fixRangeFields: () ->
		elements = @parser.find('[min],[max]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixRangeField(element)
		return

	fixTextField: (textField) ->
		if (textField.getTagName() is 'INPUT') and (textField.hasAttribute('type'))
			type = textField.getAttribute('type').toLowerCase()
			types = ['text', 'search', 'email', 'url', 'tel', 'number']
			if types.indexOf(type) > -1
				textField.setAttribute('aria-multiline', 'false')
		else if textField.getTagName() is 'TEXTAREA'
			textField.setAttribute('aria-multiline', 'true')
		return

	fixTextFields: () ->
		elements = @parser.find('input[type=text],input[type=search],input[type=email],input[type=url],input[type=tel],input[type=number],textarea').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixTextField(element)
		return

	fixSelectField: (selectField) ->
		if selectField.getTagName() is 'SELECT'
			if selectField.hasAttribute('multiple')
				selectField.setAttribute('aria-multiselectable', 'true')
			else
				selectField.setAttribute('aria-multiselectable', 'false')
		return

	fixSelectFields: () ->
		elements = @parser.find('select').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixSelectField(element)
		return

	fixLabel: (label) ->
		if label.getTagName() is 'LABEL'
			if label.hasAttribute('for')
				input = @parser.find("##{label.getAttribute('for')}").firstResult()
			else
				input = @parser.find(label).findDescendants('input,select,textarea').firstResult()
				if not isEmpty(input)
					exports.hatemile.util.CommonFunctions.generateId(input, @prefixId)
					label.setAttribute('for', input.getAttribute('id'))
			if not isEmpty(input)
				if not input.hasAttribute('aria-label')
					contentLabel = label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' ')
					if input.hasAttribute('aria-required')
						if (input.getAttribute('aria-required').toLowerCase() is 'true') and (contentLabel.indexOf(@prefixRequiredField) is -1)
							contentLabel = "#{@prefixRequiredField} #{contentLabel}"
						if (input.getAttribute('aria-required').toLowerCase() is 'true') and (contentLabel.indexOf(@suffixRequiredField) is -1)
							contentLabel += " #{@suffixRequiredField}"
					input.setAttribute('aria-label', contentLabel)
				exports.hatemile.util.CommonFunctions.generateId(label, @prefixId)
				input.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(input.getAttribute('aria-labelledby'), label.getAttribute('id')))
		return

	fixLabels: () ->
		elements = @parser.find('label').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixLabel(element)
		return