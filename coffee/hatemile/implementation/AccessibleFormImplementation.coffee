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
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

###*
 * @class AccessibleFormImplementation
 * @classdesc The AccessibleFormImplementation class is official implementation
 * of AccessibleForm interface.
 * @extends hatemile.AccessibleForm
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleFormImplementation
	
	_dataLabelPrefixRequiredField = 'data-prefixrequiredfield'
	_dataLabelSuffixRequiredField = 'data-suffixrequiredfield'
	_dataLabelPrefixRangeMinField = 'data-prefixvalueminfield'
	_dataLabelSuffixRangeMinField = 'data-suffixvalueminfield'
	_dataLabelPrefixRangeMaxField = 'data-prefixvaluemaxfield'
	_dataLabelSuffixRangeMaxField = 'data-suffixvaluemaxfield'
	_dataLabelPrefixAutoCompleteField = 'data-prefixautocompletefield'
	_dataLabelSuffixAutoCompleteField = 'data-suffixautocompletefield'
	_dataIgnore = 'data-ignoreaccessibilityfix'
	
	###*
	 * Initializes a new object that manipulate the accessibility of the forms
	 * of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
		@prefixRequiredField = configure.getParameter('prefix-required-field')
		@suffixRequiredField = configure.getParameter('suffix-required-field')
		@prefixRangeMinField = configure.getParameter('prefix-range-min-field')
		@suffixRangeMinField = configure.getParameter('suffix-range-min-field')
		@prefixRangeMaxField = configure.getParameter('prefix-range-max-field')
		@suffixRangeMaxField = configure.getParameter('suffix-range-max-field')
		@prefixAutoCompleteField = configure.getParameter('prefix-autocomplete-field')
		@suffixAutoCompleteField = configure.getParameter('suffix-autocomplete-field')
		@textAutoCompleteValueBoth = configure.getParameter('text-autocomplete-value-both')
		@textAutoCompleteValueList = configure.getParameter('text-autocomplete-value-list')
		@textAutoCompleteValueInline = configure.getParameter('text-autocomplete-value-inline')
		@textAutoCompleteValueNone = configure.getParameter('text-autocomplete-value-none')
	
	###*
	 * Display in label the information of field.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @param {String} prefix The prefix.
	 * @param {String} suffix The suffix.
	 * @param {String} dataPrefix The name of prefix attribute.
	 * @param {String} dataSuffix The name of suffix attribute.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	addPrefixSuffix = (label, field, prefix, suffix, dataPrefix, dataSuffix) ->
		content = field.getAttribute('aria-label')
		if not isEmpty(prefix)
			label.setAttribute(dataPrefix, prefix)
			if content.indexOf(prefix) is -1
				content = "#{prefix} #{content}"
		if not isEmpty(suffix)
			label.setAttribute(dataSuffix, suffix)
			if content.indexOf(suffix) is -1
				content += " #{suffix}"
		field.setAttribute('aria-label', content)
		return
	
	###*
	 * Display in label the information if the field is required.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @param {hatemile.util.html.HTMLDOMElement} requiredField The required field.
	 * @param {String} prefixRequiredField The description prefix of required
	 * fields.
	 * @param {String} suffixRequiredField The description suffix of required
	 * fields.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	fixLabelRequiredField = (label, requiredField, prefixRequiredField, suffixRequiredField) ->
		if (requiredField.hasAttribute('required') or (requiredField.hasAttribute('aria-required') and (requiredField.getAttribute('aria-required').toLowerCase() is 'true'))) and (not label.hasAttribute(_dataLabelPrefixRequiredField)) and (not label.hasAttribute(_dataLabelSuffixRequiredField)) and requiredField.hasAttribute('aria-label')
			addPrefixSuffix(label, requiredField, prefixRequiredField, suffixRequiredField, _dataLabelPrefixRequiredField, _dataLabelSuffixRequiredField)
		return
	
	###*
	 * Display in label the information of range of field.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @param {hatemile.util.html.HTMLDOMElement} rangeField The range field.
	 * @param {String} prefixRangeMinField The description prefix of range fields
	 * for minimum value.
	 * @param {String} suffixRangeMinField The description suffix of range fields
	 * for minimum value.
	 * @param {String} prefixRangeMaxField The description prefix of range fields
	 * for maximum value.
	 * @param {String} suffixRangeMaxField The description suffix of range fields
	 * for maximum value.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	fixLabelRangeField = (label, rangeField, prefixRangeMinField, suffixRangeMinField, prefixRangeMaxField, suffixRangeMaxField) ->
		prefixRangeMinFieldModified = undefined
		suffixRangeMinFieldModified = undefined
		prefixRangeMaxFieldModified = undefined
		suffixRangeMaxFieldModified = undefined
		if rangeField.hasAttribute('aria-label')
			if (rangeField.hasAttribute('min') or rangeField.hasAttribute('aria-valuemin')) and (not label.hasAttribute(_dataLabelPrefixRangeMinField)) and (not label.hasAttribute(_dataLabelSuffixRangeMinField))
				if rangeField.hasAttribute('min')
					value = rangeField.getAttribute('min')
				else
					value = rangeField.getAttribute('aria-valuemin')
				if not isEmpty(prefixRangeMinField)
					prefixRangeMinFieldModified = prefixRangeMinField.replace('{{value}}', value)
				if not isEmpty(suffixRangeMinField)
					suffixRangeMinFieldModified = suffixRangeMinField.replace('{{value}}', value)
				addPrefixSuffix(label, rangeField, prefixRangeMinFieldModified, suffixRangeMinFieldModified, _dataLabelPrefixRangeMinField, _dataLabelSuffixRangeMinField)
			
			if (rangeField.hasAttribute('max') or rangeField.hasAttribute('aria-valuemax')) and (not label.hasAttribute(_dataLabelPrefixRangeMaxField)) and (not label.hasAttribute(_dataLabelSuffixRangeMaxField))
				if rangeField.hasAttribute('max')
					value = rangeField.getAttribute('max')
				else
					value = rangeField.getAttribute('aria-valuemax')
				if not isEmpty(prefixRangeMaxField)
					prefixRangeMaxFieldModified = prefixRangeMaxField.replace('{{value}}', value)
				if not isEmpty(suffixRangeMaxField)
					suffixRangeMaxFieldModified = suffixRangeMaxField.replace('{{value}}', value)
				addPrefixSuffix(label, rangeField, prefixRangeMaxFieldModified, suffixRangeMaxFieldModified, _dataLabelPrefixRangeMaxField, _dataLabelSuffixRangeMaxField)
		return
	
	###*
	 * Display in label the information if the field has autocomplete.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @param {hatemile.util.html.HTMLDOMElement} autoCompleteField The autocomplete
	 * field.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {String} prefixAutoCompleteField The description prefix of
	 * autocomplete fields.
	 * @param {String} suffixAutoCompleteField The description suffix of
	 * autocomplete fields.
	 * @param {String} textAutoCompleteValueBoth The value for description of
	 * field, when it has inline and list autocomplete.
	 * @param {String} textAutoCompleteValueList The value for description of
	 * field, when it has list autocomplete.
	 * @param {String} textAutoCompleteValueInline The value for description of
	 * field, when it has inline autocomplete.
	 * @param {String} textAutoCompleteValueNone The value for description of
	 * field, when it not has autocomplete.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	fixLabelAutoCompleteField = (label, autoCompleteField, parser, prefixAutoCompleteField, suffixAutoCompleteField, textAutoCompleteValueBoth, textAutoCompleteValueList, textAutoCompleteValueInline, textAutoCompleteValueNone) ->
		if autoCompleteField.hasAttribute('aria-label') and (not label.hasAttribute(_dataLabelPrefixAutoCompleteField)) and (not label.hasAttribute(_dataLabelSuffixAutoCompleteField))
			ariaAutocomplete = getARIAAutoComplete(autoCompleteField, parser)
			if not isEmpty(ariaAutocomplete)
				if ariaAutocomplete is 'both'
					if not isEmpty(prefixAutoCompleteField)
						prefixAutoCompleteFieldModified = prefixAutoCompleteField.replace('{{value}}', textAutoCompleteValueBoth)
					if not isEmpty(suffixAutoCompleteField)
						suffixAutoCompleteFieldModified = suffixAutoCompleteField.replace('{{value}}', textAutoCompleteValueBoth)
				else if ariaAutocomplete is 'none'
					if not isEmpty(prefixAutoCompleteField)
						prefixAutoCompleteFieldModified = prefixAutoCompleteField.replace('{{value}}', textAutoCompleteValueNone)
					if not isEmpty(suffixAutoCompleteField)
						suffixAutoCompleteFieldModified = suffixAutoCompleteField.replace('{{value}}', textAutoCompleteValueNone)
				else if ariaAutocomplete is 'list'
					if not isEmpty(prefixAutoCompleteField)
						prefixAutoCompleteFieldModified = prefixAutoCompleteField.replace('{{value}}', textAutoCompleteValueList)
					if not isEmpty(suffixAutoCompleteField)
						suffixAutoCompleteFieldModified = suffixAutoCompleteField.replace('{{value}}', textAutoCompleteValueList)
				addPrefixSuffix(label, autoCompleteField, prefixAutoCompleteFieldModified, suffixAutoCompleteFieldModified, _dataLabelPrefixAutoCompleteField, _dataLabelSuffixAutoCompleteField)
		return
	
	###*
	 * Returns the appropriate value for attribute aria-autocomplete of field.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {String} The ARIA value of field.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	getARIAAutoComplete = (field, parser) ->
		tagName = field.getTagName()
		if field.hasAttribute('type')
			type = field.getAttribute('type').toLowerCase()
		if (tagName is 'TEXTAREA') or ((tagName is 'INPUT') and (not (('button' is type) or ('submit' is type) or ('reset' is type) or ('image' is type) or ('file' is type) or ('checkbox' is type) or ('radio' is type) or ('hidden' is type))))
			if field.hasAttribute('autocomplete')
				value = field.getAttribute('autocomplete').toLowerCase()
			else
				form = parser.find(field).findAncestors('form').firstResult()
				if (isEmpty(form)) and (field.hasAttribute('form'))
					form = parser.find("##{field.getAttribute('form')}").firstResult()
				if (not isEmpty(form)) and (form.hasAttribute('autocomplete'))
					value = form.getAttribute('autocomplete').toLowerCase()
			if ('on' is value)
				return 'both'
			else if (field.hasAttribute('list')) and (not isEmpty(parser.find("datalist[id=\"#{field.getAttribute('list')}\"]").firstResult()))
				return 'list'
			else if ('off' is value)
				return 'none'
		return undefined
	
	###*
	 * Returns the labels of field.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The labels of field.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	getLabels = (field, parser) ->
		if field.hasAttribute('id')
			labels = parser.find("label[for=\"#{field.getAttribute('id')}\"]").listResults()
		if isEmpty(labels)
			labels = parser.find(field).findAncestors('label').listResults()
		return labels
	
	fixRequiredField: (requiredField) ->
		if requiredField.hasAttribute('required')
			requiredField.setAttribute('aria-required', 'true')
			
			labels = getLabels(requiredField, @parser)
			for label in labels
				fixLabelRequiredField(label, requiredField, @prefixRequiredField, @suffixRequiredField)
		return
	
	fixRequiredFields: () ->
		requiredFields = @parser.find('[required]').listResults()
		for requiredField in requiredFields
			if not requiredField.hasAttribute(_dataIgnore)
				@fixRequiredField(requiredField)
		return
	
	fixRangeField: (rangeField) ->
		if rangeField.hasAttribute('min')
			rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'))
		if rangeField.hasAttribute('max')
			rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'))
		
		labels = getLabels(rangeField, @parser)
		for label in labels
			fixLabelRangeField(label, rangeField, @prefixRangeMinField, @suffixRangeMinField, @prefixRangeMaxField, @suffixRangeMaxField)
		return
	
	fixRangeFields: () ->
		rangeFields = @parser.find('[min],[max]').listResults()
		for rangeField in rangeFields
			if not rangeField.hasAttribute(_dataIgnore)
				@fixRangeField(rangeField)
		return
	
	fixAutoCompleteField: (autoCompleteField) ->
		ariaAutoComplete = getARIAAutoComplete(autoCompleteField, @parser)
		if not isEmpty(ariaAutoComplete)
			autoCompleteField.setAttribute('aria-autocomplete', ariaAutoComplete)
			
			labels = getLabels(autoCompleteField, @parser)
			for label in labels
				fixLabelAutoCompleteField(label, autoCompleteField, @parser, @prefixAutoCompleteField, @suffixAutoCompleteField, @textAutoCompleteValueBoth, @textAutoCompleteValueList, @textAutoCompleteValueInline, @textAutoCompleteValueNone)
		return
	
	fixAutoCompleteFields: () ->
		elements = @parser.find('input[autocomplete],textarea[autocomplete],form[autocomplete] input,form[autocomplete] textarea,[list],[form]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@fixAutoCompleteField(element)
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
				
				fixLabelRequiredField(label, field, @prefixRequiredField, @suffixRequiredField)
				fixLabelRangeField(label, field, @prefixRangeMinField, @suffixRangeMinField, @prefixRangeMaxField, @suffixRangeMaxField)
				fixLabelAutoCompleteField(label, field, @parser, @prefixAutoCompleteField, @suffixAutoCompleteField, @textAutoCompleteValueBoth, @textAutoCompleteValueList, @textAutoCompleteValueInline, @textAutoCompleteValueNone)
				
				exports.hatemile.util.CommonFunctions.generateId(label, @prefixId)
				field.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')))
		return
	
	fixLabels: () ->
		labels = @parser.find('label').listResults()
		for label in labels
			if not label.hasAttribute(_dataIgnore)
				@fixLabel(label)
		return