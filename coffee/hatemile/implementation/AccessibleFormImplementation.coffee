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
	
	_dataIgnore = 'data-ignoreaccessibilityfix'
	_dataEventChangeAdded = 'data-changeadded'
	_dataInvalidURL = 'data-invalidurl'
	_dataInvalidEmail = 'data-invalidemail'
	_dataInvalidRange = 'data-invalidrange'
	_dataInvalidLength = 'data-invalidlength'
	_dataInvalidPattern = 'data-invalidpattern'
	_dataInvalidRequired = 'data-invalidrequired'
	_dataInvalidDate = 'data-invaliddate'
	_dataInvalidTime = 'data-invalidtime'
	_dataInvalidDateTime = 'data-invaliddatetime'
	_dataInvalidMonth = 'data-invalidmonth'
	_dataInvalidWeek = 'data-invalidweek'
	_validationType = 'type'
	_validationRequired = 'required'
	_validationPattern = 'pattern'
	_validationLength = 'length'
	
	###*
	 * Initializes a new object that manipulate the accessibility of the forms
	 * of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	###
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
	
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
	
	addEventHandler = (element, typeEvent, typeDataEvent, typeFix, functionForEventHandler) ->
		if not hasEvent(element, typeEvent, typeDataEvent, typeFix)
			found = false
			attribute = element.getAttribute(typeDataEvent)
			nativeElement = element.getData()
			if not hasEvent(element, typeEvent)
				nativeElement["liston#{typeEvent}"] = []
				nativeElement["on#{typeEvent}"] = (event) ->
					for addedEvent in nativeElement["liston#{typeEvent}"]
						addedEvent(event)
					return
			else
				found = exports.hatemile.util.CommonFunctions.inList(attribute, typeFix)
			if not found
				nativeElement["liston#{typeEvent}"].push(functionForEventHandler)
				attribute = exports.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix)
				element.setAttribute(typeDataEvent, attribute)
		return
	
	hasEvent = (element, typeEvent, typeDataEvent, typeFix) ->
		nativeElement = element.getData()
		if isEmpty(typeDataEvent) or isEmpty(typeFix)
			return (not isEmpty(nativeElement["on#{typeEvent}"])) or ((not isEmpty(nativeElement.eventListenerList)) and (not isEmpty(nativeElement.eventListenerList[typeEvent])))
		else
			attribute = element.getAttribute(typeDataEvent)
			return (hasEvent(element, typeEvent) and (not element.hasAttribute(typeDataEvent))) or exports.hatemile.util.CommonFunctions.inList(attribute, typeFix)
	
	isValid = (field) ->
		if field.hasAttribute(_dataInvalidURL)
			return false
		else if field.hasAttribute(_dataInvalidEmail)
			return false
		else if field.hasAttribute(_dataInvalidRange)
			return false
		else if field.hasAttribute(_dataInvalidLength)
			return false
		else if field.hasAttribute(_dataInvalidPattern)
			return false
		else if field.hasAttribute(_dataInvalidRequired)
			return false
		else if field.hasAttribute(_dataInvalidDate)
			return false
		else if field.hasAttribute(_dataInvalidTime)
			return false
		else if field.hasAttribute(_dataInvalidDateTime)
			return false
		else if field.hasAttribute(_dataInvalidMonth)
			return false
		else if field.hasAttribute(_dataInvalidWeek)
			return false
		else
			return true
	
	validateNow = (field, dataInvalid, validateFunction) ->
		if validateFunction(field)
			if field.hasAttribute(dataInvalid)
				field.removeAttribute(dataInvalid)
				if (field.hasAttribute('aria-invalid')) and (isValid(field))
					field.removeAttribute('aria-invalid')
		else
			field.setAttribute(dataInvalid, 'true')
			field.setAttribute('aria-invalid', 'true')
		return
	
	validate = (field, dataInvalid, typeDataEvent, typeFix, validateFunction) ->
		validateNow(field, dataInvalid, validateFunction)
		addEventHandler(field, 'change', typeDataEvent, typeFix, (event) ->
			validateNow(field, dataInvalid, validateFunction)
		)
		return
	
	isValidRegularExpression = (value, pattern) ->
		regularExpression = new RegExp(pattern)
		return regularExpression.test(value)
	
	isValidURL = (field) ->
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, '([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/\\/)?(?:(?:(?:[a-zA-Z0-9_\\.\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\\-\\.]|%[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\\]))(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!:\\.\\?\\+=&@!$\'~*,;\\/\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?')
	
	isValidEmail = (field) ->
		regularExpression = '(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'
		if field.hasAttribute('multiple')
			regularExpression = "#{regularExpression}( *, *#{regularExpression})*"
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, "^(#{regularExpression})?$")
	
	isValidRange = (field) ->
		if not isEmpty(field.getData().value)
			if not isValidRegularExpression(field.getData().value, '^[-+]?[0-9]+([.,][0-9]+)?$')
				return false
			value = parseFloat(field.getData().value)
			if field.hasAttribute('min') or field.hasAttribute('aria-valuemin')
				if field.hasAttribute('min')
					minValue = parseFloat(field.getAttribute('min'))
				else if field.hasAttribute('aria-valuemin')
					minValue = parseFloat(field.getAttribute('aria-valuemin'))
				if value < minValue
					return false
			if field.hasAttribute('max') or field.hasAttribute('aria-valuemax')
				if field.hasAttribute('max')
					maxValue = parseFloat(field.getAttribute('max'))
				else if field.hasAttribute('aria-valuemax')
					maxValue = parseFloat(field.getAttribute('aria-valuemax'))
				if value > maxValue
					return false
		return true
	
	isValidDate = (field) ->
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, '^([0-9]{2}(((([02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|([12][0-9])|(3[01])))))))?$')
	
	isValidTime = (field) ->
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, '^((([01][0-9])|(2[0-3])):[0-5][0-9])?$')
	
	isValidDateTime = (field) ->
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, '^([0-9]{2}(((([02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|([12][0-9])|(3[01]))))))T(([01][0-9])|(2[0-3])):[0-5][0-9]((:[0-5][0-9].[0-9])|(Z))?)?$')
	
	isValidMonth = (field) ->
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, '^([0-9]{4}-((0[1-9])|(1[0-2])))?$')
	
	isValidWeek = (field) ->
		return isEmpty(field.getData().value) or isValidRegularExpression(field.getData().value, '^([0-9]{4}-W((0[1-9])|([1-4][0-9])|(5[0-3])))?$')
	
	isValidLength = (field) ->
		if field.hasAttribute('minlength')
			if field.getData().value.length < parseInt(field.getAttribute('minlength'))
				return false
		if field.hasAttribute('maxlength')
			if field.getData().value.length > parseInt(field.getAttribute('maxlength'))
				return false
		return true
	
	isValidPattern = (field) ->
		return isValidRegularExpression(field.getData().value, field.getAttribute('pattern'))
	
	isValidRequired = (field) ->
		return not isEmpty(field.getData().value)
	
	fixRequiredField: (requiredField) ->
		if requiredField.hasAttribute('required')
			requiredField.setAttribute('aria-required', 'true')
		return
	
	fixAllRequiredFields: () ->
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
		return
	
	fixAllRangeFields: () ->
		rangeFields = @parser.find('[min],[max]').listResults()
		for rangeField in rangeFields
			if not rangeField.hasAttribute(_dataIgnore)
				@fixRangeField(rangeField)
		return
	
	fixAutoCompleteField: (autoCompleteField) ->
		ariaAutoComplete = getARIAAutoComplete(autoCompleteField, @parser)
		if not isEmpty(ariaAutoComplete)
			autoCompleteField.setAttribute('aria-autocomplete', ariaAutoComplete)
		return
	
	fixAllAutoCompleteFields: () ->
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
				exports.hatemile.util.CommonFunctions.generateId(label, @prefixId)
				field.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')))
		return
	
	fixAllLabels: () ->
		labels = @parser.find('label').listResults()
		for label in labels
			if not label.hasAttribute(_dataIgnore)
				@fixLabel(label)
		return
	
	fixValidation: (field) ->
		if (field.hasAttribute('required')) or ((field.hasAttribute('aria-required')) and (field.getAttribute('aria-required').toLowerCase() is 'true'))
			validate(field, _dataInvalidRequired, _dataEventChangeAdded, _validationRequired, isValidRequired)
		if field.hasAttribute('pattern')
			validate(field, _dataInvalidPattern, _dataEventChangeAdded, _validationPattern, isValidPattern)
		if (field.hasAttribute('minlength')) or (field.hasAttribute('maxlength'))
			validate(field, _dataInvalidLength, _dataEventChangeAdded, _validationLength, isValidLength)
		if (field.hasAttribute('aria-valuemin')) or (field.hasAttribute('aria-valuemax'))
			validate(field, _dataInvalidRange, _dataEventChangeAdded, _validationType, isValidRange)
		if field.hasAttribute('type')
			type = field.getAttribute('type').toLowerCase()
			if type is 'week'
				validate(field, _dataInvalidWeek, _dataEventChangeAdded, _validationType, isValidWeek)
			else if type is 'month'
				validate(field, _dataInvalidMonth, _dataEventChangeAdded, _validationType, isValidMonth)
			else if (type is 'datetime-local') or (type is 'datetime')
				validate(field, _dataInvalidDateTime, _dataEventChangeAdded, _validationType, isValidDateTime)
			else if type is 'time'
				validate(field, _dataInvalidTime, _dataEventChangeAdded, _validationType, isValidTime)
			else if type is 'date'
				validate(field, _dataInvalidDate, _dataEventChangeAdded, _validationType, isValidDate)
			else if (type is 'number') or (type is 'range')
				validate(field, _dataInvalidRange, _dataEventChangeAdded, _validationType, isValidRange)
			else if type is 'email'
				validate(field, _dataInvalidEmail, _dataEventChangeAdded, _validationType, isValidEmail)
			else if type is 'url'
				validate(field, _dataInvalidURL, _dataEventChangeAdded, _validationType, isValidURL)
		return
	
	fixAllValidations: () ->
		fields = @parser.find('[required],input[pattern],input[minlength],input[maxlength],textarea[minlength],textarea[maxlength],input[type=week],input[type=month],input[type=datetime-local],input[type=datetime],input[type=time],input[type=date],input[type=number],input[type=range],input[type=email],input[type=url],[aria-required=true],input[aria-valuemin],input[aria-valuemax]').listResults()
		for field in fields
			if not field.hasAttribute(_dataIgnore)
				@fixValidation(field)
		return