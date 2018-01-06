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

self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.implementation
#
@hatemile.implementation or= {}

# The AccessibleFormImplementation class is official implementation of
# {hatemile.AccessibleForm}.
#
# @extend hatemile.AccessibleForm
#
class @hatemile.implementation.AccessibleFormImplementation
  
  DATA_IGNORE = 'data-ignoreaccessibilityfix'
  DATA_EVENT_CHANGE_ADDED = 'data-changeadded'
  DATA_INVALID_URL = 'data-invalidurl'
  DATA_INVALID_EMAIL = 'data-invalidemail'
  DATA_INVALID_RANGE = 'data-invalidrange'
  DATA_INVALID_LENGTH = 'data-invalidlength'
  DATA_INVALID_PATTERN = 'data-invalidpattern'
  DATA_INVALID_REQUIRED = 'data-invalidrequired'
  DATA_INVALID_DATE = 'data-invaliddate'
  DATA_INVALID_TIME = 'data-invalidtime'
  DATA_INVALID_DATETIME = 'data-invaliddatetime'
  DATA_INVALID_MONTH = 'data-invalidmonth'
  DATA_INVALID_WEEK = 'data-invalidweek'
  VALIDATION_TYPE = 'type'
  VALIDATION_REQUIRED = 'required'
  VALIDATION_PATTERN = 'pattern'
  VALIDATION_LENGTH = 'length'
  
  # Check that the field is valid.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field is valid or if the field is not valid.
  #
  _isValid = (field) ->
    if field.hasAttribute(DATA_INVALID_URL)
      return false
    else if field.hasAttribute(DATA_INVALID_EMAIL)
      return false
    else if field.hasAttribute(DATA_INVALID_RANGE)
      return false
    else if field.hasAttribute(DATA_INVALID_LENGTH)
      return false
    else if field.hasAttribute(DATA_INVALID_PATTERN)
      return false
    else if field.hasAttribute(DATA_INVALID_REQUIRED)
      return false
    else if field.hasAttribute(DATA_INVALID_DATE)
      return false
    else if field.hasAttribute(DATA_INVALID_TIME)
      return false
    else if field.hasAttribute(DATA_INVALID_DATETIME)
      return false
    else if field.hasAttribute(DATA_INVALID_MONTH)
      return false
    else if field.hasAttribute(DATA_INVALID_WEEK)
      return false
    else
      return true
  
  # Validate the field.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  # @param [string] dataInvalid The custom attribute used if the element is not valid.
  # @param [Function] validateFunction The validate function.
  #
  _validateNow = (field, dataInvalid, validateFunction) ->
    if validateFunction(field)
      if field.hasAttribute(dataInvalid)
        field.removeAttribute(dataInvalid)
        if (field.hasAttribute('aria-invalid')) and (_isValid(field))
          field.removeAttribute('aria-invalid')
    else
      field.setAttribute(dataInvalid, 'true')
      field.setAttribute('aria-invalid', 'true')
    return
  
  # Check that the value match with regular expression.
  #
  # @private
  #
  # @param [string] value The value.
  # @param [string] pattern The regular expression.
  #
  # @return [boolean] True if the value match with regular expression or false if the value not match with regular expression.
  #
  _isValidRegularExpression = (value, pattern) ->
    regularExpression = new RegExp(pattern)
    return regularExpression.test(value)
  
  # Check that the field has a valid URL value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid URL value or false if the field have not a valid URL value.
  #
  _isValidURL = (field) ->
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, \
        '([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/\\/)?(?:(?:(?:[a-zA-Z0-9_\\.' \
        + '\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+' \
        + '%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\\-\\.]|%' \
        + '[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\\]))' \
        + '(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!:\\.\\?\\+=&@!$\'~*,;\\/' \
        + '\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?')
  
  # Check that the field has a valid e-mail address value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid e-mail address value or false if the field have not a valid e-mail address value.
  #
  _isValidEmail = (field) ->
    regularExpression = '(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&' \
        + '\'*+\/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21' \
        + '\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")' \
        + '@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*' \
        + '[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}' \
        + '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:' \
        + '[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|' \
        + '\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])'
    if field.hasAttribute('multiple')
      regularExpression = "#{regularExpression}( *, *#{regularExpression})*"
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, \
        "^(#{regularExpression})?$")
  
  # Check that the field has a valid date value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid date value or false if the field have not a valid date value.
  #
  _isValidDate = (field) ->
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, '^([0-9]{2}((((' \
        + '[02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|' \
        + '(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-' \
        + '((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|' \
        + '([12][0-9])|(3[01])))))))?$')
  
  # Check that the field has a valid time value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid time value or false if the field have not a valid time value.
  #
  _isValidTime = (field) ->
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, '^((([01][0-9])|' \
        + '(2[0-3])):[0-5][0-9])?$')
  
  # Check that the field has a valid date and time value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid date and time value or false if the field have not a valid date and time value.
  #
  _isValidDateTime = (field) ->
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, '^([0-9]{2}((((' \
        + '[02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|' \
        + '(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-' \
        + '((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|' \
        + '([12][0-9])|(3[01]))))))T(([01][0-9])|(2[0-3])):[0-5][0-9]((:[0-5]' \
        + '[0-9].[0-9])|(Z))?)?$')
  
  # Check that the field has a valid month value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid month value or false if the field have not a valid month value.
  #
  _isValidMonth = (field) ->
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, '^([0-9]{4}-' \
        + '((0[1-9])|(1[0-2])))?$')
  
  # Check that the field has a valid week value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a valid week value or false if the field have not a valid week value.
  #
  _isValidWeek = (field) ->
    return (field.getData().value.length is 0) or \
        _isValidRegularExpression(field.getData().value, '^([0-9]{4}-W' \
        + '((0[1-9])|([1-4][0-9])|(5[0-3])))?$')
  
  # Check that the value in field is between its range.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the value in field is between its range or false if the value in field is not between its range.
  #
  _isValidRange = (field) ->
    if field.getData().value.length > 0
      if not _isValidRegularExpression(field.getData().value, \
          '^[-+]?[0-9]+([.,][0-9]+)?$')
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
  
  # Check that the length of the value in field is between its range.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the length of the value in field is between its range or false if the length of the value in field is not between its range.
  #
  _isValidLength = (field) ->
    if field.hasAttribute('minlength')
      if field.getData().value.length < \
          parseInt(field.getAttribute('minlength'))
        return false
    if field.hasAttribute('maxlength')
      if field.getData().value.length > \
          parseInt(field.getAttribute('maxlength'))
        return false
    return true
  
  # Check that the value in field match with its pattern.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the value in field match with its pattern or false if the value in field not match with its pattern.
  #
  _isValidPattern = (field) ->
    return _isValidRegularExpression(field.getData().value, \
        field.getAttribute('pattern'))
  
  # Check that the field has a value.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [boolean] True if the field has a value or false if the field not has a value.
  #
  _isValidRequired = (field) ->
    return field.getData().value.length > 0
  
  # Returns the appropriate value for attribute aria-autocomplete of field.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @return [string] The ARIA value of field.
  #
  _getARIAAutoComplete: (field) ->
    tagName = field.getTagName()
    if field.hasAttribute('type')
      type = field.getAttribute('type').toLowerCase()
    if (tagName is 'TEXTAREA') or ((tagName is 'INPUT') and \
        (not (('button' is type) or ('submit' is type) or ('reset' is type) or \
        ('image' is type) or ('file' is type) or ('checkbox' is type) or \
        ('radio' is type) or ('hidden' is type))))
      if field.hasAttribute('autocomplete')
        value = field.getAttribute('autocomplete').toLowerCase()
      else
        form = @parser.find(field).findAncestors('form').firstResult()
        if (form is null) and (field.hasAttribute('form'))
          form = @parser.find("##{field.getAttribute('form')}").firstResult()
        if (form isnt null) and (form.hasAttribute('autocomplete'))
          value = form.getAttribute('autocomplete').toLowerCase()
      if ('on' is value)
        return 'both'
      else if (field.hasAttribute('list')) and \
          (@parser.find("datalist[id=\"#{field.getAttribute('list')}\"]")
          .firstResult() isnt null)
        return 'list'
      else if ('off' is value)
        return 'none'
    return null
  
  # Check that the element has the event added by developer or fixed by
  # HaTeMiLe.
  #
  # @private
  #
  # @overload _hasEvent(element, typeEvent)
  #   Check that the element has a event of type.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @param [string] typeEvent The type of event.
  #   @return [boolean] True if the element has a event of type or false if it
  #   not has.
  #
  # @overload _hasEvent(element, typeEvent, typeDataEvent, typeFix)
  #   Check that the element has a event to solve the same problem.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @param [string] typeEvent The type of event.
  #   @param [string] typeDataEvent The custom attribute of type of event.
  #   @param [string] typeFix The id of fix method.
  #   @return [boolean] True if the element has a event to solve the same
  #   problem or false if it not has.
  #
  _hasEvent: (element, typeEvent, typeDataEvent, typeFix) ->
    nativeElement = element.getData()
    if (typeDataEvent is undefined) or (typeFix is undefined)
      return (nativeElement["on#{typeEvent}"] instanceof Function) or \
          ((nativeElement.eventListenerList isnt undefined) and \
          (nativeElement.eventListenerList[typeEvent] instanceof Function))
    else
      attribute = element.getAttribute(typeDataEvent)
      return (@_hasEvent(element, typeEvent) and \
          (not element.hasAttribute(typeDataEvent))) or \
          self.hatemile.util.CommonFunctions.inList(attribute, typeFix)
  
  # Increase a function on event.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [string] typeEvent The type of event.
  # @param [string] typeDataEvent The name of attribute that store the type of event fixed.
  # @param [string] typeFix The id of fix method.
  # @param [Function] operation The function.
  #
  _addEventHandler: (element, typeEvent, typeDataEvent, typeFix, operation) ->
    if not @_hasEvent(element, typeEvent, typeDataEvent, typeFix)
      found = false
      attribute = element.getAttribute(typeDataEvent)
      nativeElement = element.getData()
      if not @_hasEvent(element, typeEvent)
        nativeElement["liston#{typeEvent}"] = []
        nativeElement["on#{typeEvent}"] = (event) ->
          for addedEvent in nativeElement["liston#{typeEvent}"]
            addedEvent(event)
          return
      else
        found = self.hatemile.util.CommonFunctions.inList(attribute, typeFix)
      if not found
        nativeElement["liston#{typeEvent}"].push(operation)
        attribute = self.hatemile.util.CommonFunctions
            .increaseInList(attribute, typeFix)
        element.setAttribute(typeDataEvent, attribute)
    return
  
  # Validate the field when its value change.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  # @param [string] dataInvalid The custom attribute used if the element is not valid.
  # @param [string] typeFix The id of fix method.
  # @param [Function] validateFunction The validate function.
  #
  _validate: (field, dataInvalid, typeFix, validateFunction) ->
    context = this
    _validateNow(field, dataInvalid, validateFunction)
    @_addEventHandler(field, 'change', DATA_EVENT_CHANGE_ADDED, typeFix, \
        (event) ->
      _validateNow(field, dataInvalid, validateFunction)
    )
    return
  
  # Initializes a new object that manipulate the accessibility of the forms of
  # parser.
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  #
  constructor: (@parser, configure) ->
  
  # Mark that the field is required.
  #
  # @param [hatemile.util.html.HTMLDOMElement] requiredField The required field.
  #
  # @see hatemile.AccessibleForm#markRequiredField
  #
  markRequiredField: (requiredField) ->
    if requiredField.hasAttribute('required')
      requiredField.setAttribute('aria-required', 'true')
    return
  
  # Mark that the fields is required.
  #
  # @see hatemile.AccessibleForm#markAllRequiredFields
  #
  markAllRequiredFields: () ->
    requiredFields = @parser.find('[required]').listResults()
    for requiredField in requiredFields
      if self.hatemile.util.CommonFunctions.isValidElement(requiredField)
        @markRequiredField(requiredField)
    return
  
  # Mark that the field have range.
  #
  # @param [hatemile.util.html.HTMLDOMElement] rangeField The range field.
  #
  # @see hatemile.AccessibleForm#markRangeField
  #
  markRangeField: (rangeField) ->
    if rangeField.hasAttribute('min')
      rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'))
    if rangeField.hasAttribute('max')
      rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'))
    return
  
  # Mark that the fields have range.
  #
  # @see hatemile.AccessibleForm#markAllRangeFields
  #
  markAllRangeFields: () ->
    rangeFields = @parser.find('[min],[max]').listResults()
    for rangeField in rangeFields
      if self.hatemile.util.CommonFunctions.isValidElement(rangeField)
        @markRangeField(rangeField)
    return
  
  # Mark that the field have autocomplete.
  #
  # @param [hatemile.util.html.HTMLDOMElement] autoCompleteField The field with autocomplete.
  #
  # @see hatemile.AccessibleForm#markAutoCompleteField
  #
  markAutoCompleteField: (autoCompleteField) ->
    ariaAutoComplete = @_getARIAAutoComplete(autoCompleteField)
    if ariaAutoComplete isnt null
      autoCompleteField.setAttribute('aria-autocomplete', ariaAutoComplete)
    return
  
  # Mark that the fields have autocomplete.
  #
  # @see hatemile.AccessibleForm#markAllAutoCompleteFields
  #
  markAllAutoCompleteFields: () ->
    elements = @parser.find('input[autocomplete],textarea[autocomplete],' \
        + 'form[autocomplete] input,form[autocomplete] textarea,[list],[form]')
        .listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @markAutoCompleteField(element)
    return
  
  # Mark a solution to display that this field is invalid.
  #
  # @param [hatemile.util.html.HTMLDOMElement] field The field.
  #
  # @see hatemile.AccessibleForm#markInvalidField
  #
  markInvalidField: (field) ->
    if (field.hasAttribute('required')) or \
        ((field.hasAttribute('aria-required')) and \
        (field.getAttribute('aria-required').toLowerCase() is 'true'))
      @_validate(field, DATA_INVALID_REQUIRED, VALIDATION_REQUIRED, \
          _isValidRequired)
    if field.hasAttribute('pattern')
      @_validate(field, DATA_INVALID_PATTERN, VALIDATION_PATTERN, \
          _isValidPattern)
    if (field.hasAttribute('minlength')) or (field.hasAttribute('maxlength'))
      @_validate(field, DATA_INVALID_LENGTH, VALIDATION_LENGTH, _isValidLength)
    if (field.hasAttribute('aria-valuemin')) or \
        (field.hasAttribute('aria-valuemax'))
      @_validate(field, DATA_INVALID_RANGE, VALIDATION_TYPE, _isValidRange)
    if field.hasAttribute('type')
      type = field.getAttribute('type').toLowerCase()
      if type is 'week'
        @_validate(field, DATA_INVALID_WEEK, VALIDATION_TYPE, _isValidWeek)
      else if type is 'month'
        @_validate(field, DATA_INVALID_MONTH, VALIDATION_TYPE, _isValidMonth)
      else if (type is 'datetime-local') or (type is 'datetime')
        @_validate(field, DATA_INVALID_DATETIME, VALIDATION_TYPE, \
            _isValidDateTime)
      else if type is 'time'
        @_validate(field, DATA_INVALID_TIME, VALIDATION_TYPE, _isValidTime)
      else if type is 'date'
        @_validate(field, DATA_INVALID_DATE, VALIDATION_TYPE, _isValidDate)
      else if (type is 'number') or (type is 'range')
        @_validate(field, DATA_INVALID_RANGE, VALIDATION_TYPE, _isValidRange)
      else if type is 'email'
        @_validate(field, DATA_INVALID_EMAIL, VALIDATION_TYPE, _isValidEmail)
      else if type is 'url'
        @_validate(field, DATA_INVALID_URL, VALIDATION_TYPE, _isValidURL)
    return
  
  # Mark a solution to display that a fields are invalid.
  #
  # @see hatemile.AccessibleForm#markAllInvalidFields
  #
  markAllInvalidFields: () ->
    fields = @parser.find('[required],input[pattern],input[minlength],' \
        + 'input[maxlength],textarea[minlength],textarea[maxlength],' \
        + 'input[type=week],input[type=month],input[type=datetime-local],' \
        + 'input[type=datetime],input[type=time],input[type=date],' \
        + 'input[type=number],input[type=range],input[type=email],' \
        + 'input[type=url],[aria-required=true],input[aria-valuemin],' \
        + 'input[aria-valuemax]').listResults()
    for field in fields
      if self.hatemile.util.CommonFunctions.isValidElement(field)
        @markInvalidField(field)
    return
