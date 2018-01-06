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
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleFormImplementation = (function () {
        var DATA_EVENT_CHANGE_ADDED, DATA_IGNORE, DATA_INVALID_DATE, DATA_INVALID_DATETIME, DATA_INVALID_EMAIL, DATA_INVALID_LENGTH, DATA_INVALID_MONTH, DATA_INVALID_PATTERN, DATA_INVALID_RANGE, DATA_INVALID_REQUIRED, DATA_INVALID_TIME, DATA_INVALID_URL, DATA_INVALID_WEEK, VALIDATION_LENGTH, VALIDATION_PATTERN, VALIDATION_REQUIRED, VALIDATION_TYPE, _isValid, _isValidDate, _isValidDateTime, _isValidEmail, _isValidLength, _isValidMonth, _isValidPattern, _isValidRange, _isValidRegularExpression, _isValidRequired, _isValidTime, _isValidURL, _isValidWeek, _validateNow;

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        DATA_EVENT_CHANGE_ADDED = 'data-changeadded';

        DATA_INVALID_URL = 'data-invalidurl';

        DATA_INVALID_EMAIL = 'data-invalidemail';

        DATA_INVALID_RANGE = 'data-invalidrange';

        DATA_INVALID_LENGTH = 'data-invalidlength';

        DATA_INVALID_PATTERN = 'data-invalidpattern';

        DATA_INVALID_REQUIRED = 'data-invalidrequired';

        DATA_INVALID_DATE = 'data-invaliddate';

        DATA_INVALID_TIME = 'data-invalidtime';

        DATA_INVALID_DATETIME = 'data-invaliddatetime';

        DATA_INVALID_MONTH = 'data-invalidmonth';

        DATA_INVALID_WEEK = 'data-invalidweek';

        VALIDATION_TYPE = 'type';

        VALIDATION_REQUIRED = 'required';

        VALIDATION_PATTERN = 'pattern';

        VALIDATION_LENGTH = 'length';

        _isValid = function (field) {
            if (field.hasAttribute(DATA_INVALID_URL)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_EMAIL)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_RANGE)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_LENGTH)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_PATTERN)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_REQUIRED)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_DATE)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_TIME)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_DATETIME)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_MONTH)) {
                return false;
            } else if (field.hasAttribute(DATA_INVALID_WEEK)) {
                return false;
            } else {
                return true;
            }
        };

        _validateNow = function (field, dataInvalid, validateFunction) {
            if (validateFunction(field)) {
                if (field.hasAttribute(dataInvalid)) {
                    field.removeAttribute(dataInvalid);
                    if ((field.hasAttribute('aria-invalid')) && (_isValid(field))) {
                        field.removeAttribute('aria-invalid');
                    }
                }
            } else {
                field.setAttribute(dataInvalid, 'true');
                field.setAttribute('aria-invalid', 'true');
            }
        };

        _isValidRegularExpression = function (value, pattern) {
            var regularExpression;
            regularExpression = new RegExp(pattern);
            return regularExpression.test(value);
        };

        _isValidURL = function (field) {
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, '([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/\\/)?(?:(?:(?:[a-zA-Z0-9_\\.' + '\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+' + '%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\\-\\.]|%' + '[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\\]))' + '(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!:\\.\\?\\+=&@!$\'~*,;\\/' + '\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?');
        };

        _isValidEmail = function (field) {
            var regularExpression;
            regularExpression = '(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&' + '\'*+\/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21' + '\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")' + '@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*' + '[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}' + '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:' + '[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|' + '\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])';
            if (field.hasAttribute('multiple')) {
                regularExpression = regularExpression + "( *, *" + regularExpression + ")*";
            }
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, "^(" + regularExpression + ")?$");
        };

        _isValidDate = function (field) {
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, '^([0-9]{2}((((' + '[02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|' + '(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-' + '((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|' + '([12][0-9])|(3[01])))))))?$');
        };

        _isValidTime = function (field) {
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, '^((([01][0-9])|' + '(2[0-3])):[0-5][0-9])?$');
        };

        _isValidDateTime = function (field) {
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, '^([0-9]{2}((((' + '[02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|' + '(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-' + '((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|' + '([12][0-9])|(3[01]))))))T(([01][0-9])|(2[0-3])):[0-5][0-9]((:[0-5]' + '[0-9].[0-9])|(Z))?)?$');
        };

        _isValidMonth = function (field) {
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, '^([0-9]{4}-' + '((0[1-9])|(1[0-2])))?$');
        };

        _isValidWeek = function (field) {
            return (field.getData().value.length === 0) || _isValidRegularExpression(field.getData().value, '^([0-9]{4}-W' + '((0[1-9])|([1-4][0-9])|(5[0-3])))?$');
        };

        _isValidRange = function (field) {
            var maxValue, minValue, value;
            if (field.getData().value.length > 0) {
                if (!_isValidRegularExpression(field.getData().value, '^[-+]?[0-9]+([.,][0-9]+)?$')) {
                    return false;
                }
                value = parseFloat(field.getData().value);
                if (field.hasAttribute('min') || field.hasAttribute('aria-valuemin')) {
                    if (field.hasAttribute('min')) {
                        minValue = parseFloat(field.getAttribute('min'));
                    } else if (field.hasAttribute('aria-valuemin')) {
                        minValue = parseFloat(field.getAttribute('aria-valuemin'));
                    }
                    if (value < minValue) {
                        return false;
                    }
                }
                if (field.hasAttribute('max') || field.hasAttribute('aria-valuemax')) {
                    if (field.hasAttribute('max')) {
                        maxValue = parseFloat(field.getAttribute('max'));
                    } else if (field.hasAttribute('aria-valuemax')) {
                        maxValue = parseFloat(field.getAttribute('aria-valuemax'));
                    }
                    if (value > maxValue) {
                        return false;
                    }
                }
            }
            return true;
        };

        _isValidLength = function (field) {
            if (field.hasAttribute('minlength')) {
                if (field.getData().value.length < parseInt(field.getAttribute('minlength'))) {
                    return false;
                }
            }
            if (field.hasAttribute('maxlength')) {
                if (field.getData().value.length > parseInt(field.getAttribute('maxlength'))) {
                    return false;
                }
            }
            return true;
        };

        _isValidPattern = function (field) {
            return _isValidRegularExpression(field.getData().value, field.getAttribute('pattern'));
        };

        _isValidRequired = function (field) {
            return field.getData().value.length > 0;
        };

        AccessibleFormImplementation.prototype._getARIAAutoComplete = function (field) {
            var form, tagName, type, value;
            tagName = field.getTagName();
            if (field.hasAttribute('type')) {
                type = field.getAttribute('type').toLowerCase();
            }
            if ((tagName === 'TEXTAREA') || ((tagName === 'INPUT') && (!(('button' === type) || ('submit' === type) || ('reset' === type) || ('image' === type) || ('file' === type) || ('checkbox' === type) || ('radio' === type) || ('hidden' === type))))) {
                if (field.hasAttribute('autocomplete')) {
                    value = field.getAttribute('autocomplete').toLowerCase();
                } else {
                    form = this.parser.find(field).findAncestors('form').firstResult();
                    if ((form === null) && (field.hasAttribute('form'))) {
                        form = this.parser.find("#" + (field.getAttribute('form'))).firstResult();
                    }
                    if ((form !== null) && (form.hasAttribute('autocomplete'))) {
                        value = form.getAttribute('autocomplete').toLowerCase();
                    }
                }
                if ('on' === value) {
                    return 'both';
                } else if ((field.hasAttribute('list')) && (this.parser.find("datalist[id=\"" + (field.getAttribute('list')) + "\"]").firstResult() !== null)) {
                    return 'list';
                } else if ('off' === value) {
                    return 'none';
                }
            }
            return null;
        };

        AccessibleFormImplementation.prototype._hasEvent = function (element, typeEvent, typeDataEvent, typeFix) {
            var attribute, nativeElement;
            nativeElement = element.getData();
            if ((typeDataEvent === void 0) || (typeFix === void 0)) {
                return (nativeElement["on" + typeEvent] instanceof Function) || ((nativeElement.eventListenerList !== void 0) && (nativeElement.eventListenerList[typeEvent] instanceof Function));
            } else {
                attribute = element.getAttribute(typeDataEvent);
                return (this._hasEvent(element, typeEvent) && (!element.hasAttribute(typeDataEvent))) || self.hatemile.util.CommonFunctions.inList(attribute, typeFix);
            }
        };

        AccessibleFormImplementation.prototype._addEventHandler = function (element, typeEvent, typeDataEvent, typeFix, operation) {
            var attribute, found, nativeElement;
            if (!this._hasEvent(element, typeEvent, typeDataEvent, typeFix)) {
                found = false;
                attribute = element.getAttribute(typeDataEvent);
                nativeElement = element.getData();
                if (!this._hasEvent(element, typeEvent)) {
                    nativeElement["liston" + typeEvent] = [];
                    nativeElement["on" + typeEvent] = function (event) {
                        var addedEvent, i, len, ref;
                        ref = nativeElement["liston" + typeEvent];
                        for (i = 0, len = ref.length; i < len; i++) {
                            addedEvent = ref[i];
                            addedEvent(event);
                        }
                    };
                } else {
                    found = self.hatemile.util.CommonFunctions.inList(attribute, typeFix);
                }
                if (!found) {
                    nativeElement["liston" + typeEvent].push(operation);
                    attribute = self.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix);
                    element.setAttribute(typeDataEvent, attribute);
                }
            }
        };

        AccessibleFormImplementation.prototype._validate = function (field, dataInvalid, typeFix, validateFunction) {
            var context;
            context = this;
            _validateNow(field, dataInvalid, validateFunction);
            this._addEventHandler(field, 'change', DATA_EVENT_CHANGE_ADDED, typeFix, function (event) {
                return _validateNow(field, dataInvalid, validateFunction);
            });
        };

        function AccessibleFormImplementation(parser, configure) {
            this.parser = parser;
        }

        AccessibleFormImplementation.prototype.markRequiredField = function (requiredField) {
            if (requiredField.hasAttribute('required')) {
                requiredField.setAttribute('aria-required', 'true');
            }
        };

        AccessibleFormImplementation.prototype.markAllRequiredFields = function () {
            var i, len, requiredField, requiredFields;
            requiredFields = this.parser.find('[required]').listResults();
            for (i = 0, len = requiredFields.length; i < len; i++) {
                requiredField = requiredFields[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(requiredField)) {
                    this.markRequiredField(requiredField);
                }
            }
        };

        AccessibleFormImplementation.prototype.markRangeField = function (rangeField) {
            if (rangeField.hasAttribute('min')) {
                rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'));
            }
            if (rangeField.hasAttribute('max')) {
                rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'));
            }
        };

        AccessibleFormImplementation.prototype.markAllRangeFields = function () {
            var i, len, rangeField, rangeFields;
            rangeFields = this.parser.find('[min],[max]').listResults();
            for (i = 0, len = rangeFields.length; i < len; i++) {
                rangeField = rangeFields[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(rangeField)) {
                    this.markRangeField(rangeField);
                }
            }
        };

        AccessibleFormImplementation.prototype.markAutoCompleteField = function (autoCompleteField) {
            var ariaAutoComplete;
            ariaAutoComplete = this._getARIAAutoComplete(autoCompleteField);
            if (ariaAutoComplete !== null) {
                autoCompleteField.setAttribute('aria-autocomplete', ariaAutoComplete);
            }
        };

        AccessibleFormImplementation.prototype.markAllAutoCompleteFields = function () {
            var element, elements, i, len;
            elements = this.parser.find('input[autocomplete],textarea[autocomplete],' + 'form[autocomplete] input,form[autocomplete] textarea,[list],[form]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.markAutoCompleteField(element);
                }
            }
        };

        AccessibleFormImplementation.prototype.markInvalidField = function (field) {
            var type;
            if ((field.hasAttribute('required')) || ((field.hasAttribute('aria-required')) && (field.getAttribute('aria-required').toLowerCase() === 'true'))) {
                this._validate(field, DATA_INVALID_REQUIRED, VALIDATION_REQUIRED, _isValidRequired);
            }
            if (field.hasAttribute('pattern')) {
                this._validate(field, DATA_INVALID_PATTERN, VALIDATION_PATTERN, _isValidPattern);
            }
            if ((field.hasAttribute('minlength')) || (field.hasAttribute('maxlength'))) {
                this._validate(field, DATA_INVALID_LENGTH, VALIDATION_LENGTH, _isValidLength);
            }
            if ((field.hasAttribute('aria-valuemin')) || (field.hasAttribute('aria-valuemax'))) {
                this._validate(field, DATA_INVALID_RANGE, VALIDATION_TYPE, _isValidRange);
            }
            if (field.hasAttribute('type')) {
                type = field.getAttribute('type').toLowerCase();
                if (type === 'week') {
                    this._validate(field, DATA_INVALID_WEEK, VALIDATION_TYPE, _isValidWeek);
                } else if (type === 'month') {
                    this._validate(field, DATA_INVALID_MONTH, VALIDATION_TYPE, _isValidMonth);
                } else if ((type === 'datetime-local') || (type === 'datetime')) {
                    this._validate(field, DATA_INVALID_DATETIME, VALIDATION_TYPE, _isValidDateTime);
                } else if (type === 'time') {
                    this._validate(field, DATA_INVALID_TIME, VALIDATION_TYPE, _isValidTime);
                } else if (type === 'date') {
                    this._validate(field, DATA_INVALID_DATE, VALIDATION_TYPE, _isValidDate);
                } else if ((type === 'number') || (type === 'range')) {
                    this._validate(field, DATA_INVALID_RANGE, VALIDATION_TYPE, _isValidRange);
                } else if (type === 'email') {
                    this._validate(field, DATA_INVALID_EMAIL, VALIDATION_TYPE, _isValidEmail);
                } else if (type === 'url') {
                    this._validate(field, DATA_INVALID_URL, VALIDATION_TYPE, _isValidURL);
                }
            }
        };

        AccessibleFormImplementation.prototype.markAllInvalidFields = function () {
            var field, fields, i, len;
            fields = this.parser.find('[required],input[pattern],input[minlength],' + 'input[maxlength],textarea[minlength],textarea[maxlength],' + 'input[type=week],input[type=month],input[type=datetime-local],' + 'input[type=datetime],input[type=time],input[type=date],' + 'input[type=number],input[type=range],input[type=email],' + 'input[type=url],[aria-required=true],input[aria-valuemin],' + 'input[aria-valuemax]').listResults();
            for (i = 0, len = fields.length; i < len; i++) {
                field = fields[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(field)) {
                    this.markInvalidField(field);
                }
            }
        };

        return AccessibleFormImplementation;

    })();

}).call(this);
