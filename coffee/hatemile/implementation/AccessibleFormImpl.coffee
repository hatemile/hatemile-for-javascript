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
exports.hatemile or= {}
exports.hatemile.implementation or= {}
class exports.hatemile.implementation.AccessibleFormImp
	constructor: (@parser, configuration) ->
		@prefixId = configuration.getParameter('prefix-generated-ids')
		@classRequiredField = configuration.getParameter('class-required-field')
		@sufixRequiredField = configuration.getParameter('sufix-required-field')
		@dataIgnore = configuration.getParameter('data-ignore')

	fixRequiredField: (element) ->
		if element.hasAttribute('required')
			element.setAttribute('aria-required', 'true')
			if element.hasAttribute('id')
				labels = @parser.find("label[for=#{element.getAttribute('id')}]").listResults()
			if isEmpty(labels)
				labels = @parser.find(element).findAncestors('label').listResults()
			for label in labels
				label.setAttribute('class', exports.hatemile.util.CommonFunctions.increaseInList(label.getAttribute('class'), @classRequiredField))
		return

	fixRequiredFields: () ->
		elements = @parser.find('[required]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixRequiredField(element)
		return

	fixDisabledField: (element) ->
		if element.hasAttribute('disabled')
			element.setAttribute('aria-disabled', 'true')
		return

	fixDisabledFields: () ->
		elements = @parser.find('[disabled]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixDisabledField(element)
		return

	fixReadOnlyField: (element) ->
		if element.hasAttribute('readonly')
			element.setAttribute('aria-readonly', 'true')
		return

	fixReadOnlyFields: () ->
		elements = @parser.find('[readonly]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixReadOnlyField(element)
		return

	fixRangeField: (element) ->
		if element.hasAttribute('min')
			element.setAttribute('aria-valuemin', element.getAttribute('min'))
		if element.hasAttribute('max')
			element.setAttribute('aria-valuemax', element.getAttribute('max'))
		return

	fixRangeFields: () ->
		elements = @parser.find('[min],[max]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixRangeField(element)
		return

	fixTextField: (element) ->
		if (element.getTagName() is 'INPUT') and (element.hasAttribute('type'))
			type = element.getAttribute('type').toLowerCase()
			types = ['text', 'search', 'email', 'url', 'tel', 'number']
			if types.indexOf(type) > -1
				element.setAttribute('aria-multiline', 'false')
		else if element.getTagName() is 'TEXTAREA'
			element.setAttribute('aria-multiline', 'true')
		return

	fixTextFields: () ->
		elements = @parser.find('input[type=text],input[type=search],input[type=email],input[type=url],input[type=tel],input[type=number],textarea').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixTextField(element)
		return

	fixSelectField: (element) ->
		if element.getTagName() is 'SELECT'
			if element.hasAttribute('multiple')
				element.setAttribute('aria-multiselectable', 'true')
			else
				element.setAttribute('aria-multiselectable', 'false')
		return

	fixSelectFields: () ->
		elements = @parser.find('select').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixSelectField(element)
		return

	fixLabel: (element) ->
		if element.getTagName() is 'LABEL'
			if element.hasAttribute('for')
				input = @parser.find("##{element.getAttribute('for')}").firstResult()
			else
				input = @parser.find(element).findDescendants('input,select,textarea').firstResult()
				if not isEmpty(input)
					exports.hatemile.util.CommonFunctions.generateId(input, @prefixId)
					element.setAttribute('for', input.getAttribute('id'))
			if not isEmpty(input)
				if not input.hasAttribute('aria-label')
					label = element.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' ')
					if input.hasAttribute('aria-required')
						if (input.getAttribute('aria-required').toLowerCase() is 'true') and (label.indexOf(@sufixRequiredField) is -1)
							label += " #{@sufixRequiredField}"
					input.setAttribute('aria-label', label)
				exports.hatemile.util.CommonFunctions.generateId(element, @prefixId)
				input.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(input.getAttribute('aria-labelledby'), element.getAttribute('id')))
		return

	fixLabels: () ->
		elements = @parser.find('label').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixLabel(element)
		return