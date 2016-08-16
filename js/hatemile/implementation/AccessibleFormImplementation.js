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

var exports, _base;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace implementation
 * @memberof hatemile
 */
(_base = exports.hatemile).implementation || (_base.implementation = {});

/**
 * @class AccessibleFormImplementation
 * @classdesc The AccessibleFormImplementation class is official implementation
 * of AccessibleForm interface.
 * @extends hatemile.AccessibleForm
 * @memberof hatemile.implementation
 */
exports.hatemile.implementation.AccessibleFormImplementation = (function() {
	var addEventHandler, addPrefixSuffix, fixLabelAutoCompleteField, fixLabelRangeField, fixLabelRequiredField, getARIAAutoComplete, getLabels, hasEvent, isValid, isValidDate, isValidDateTime, isValidEmail, isValidLength, isValidMonth, isValidPattern, isValidRange, isValidRegularExpression, isValidRequired, isValidTime, isValidURL, isValidWeek, validate, validateNow, _dataEventChangeAdded, _dataIgnore, _dataInvalidDate, _dataInvalidDateTime, _dataInvalidEmail, _dataInvalidLength, _dataInvalidMonth, _dataInvalidPattern, _dataInvalidRange, _dataInvalidRequired, _dataInvalidTime, _dataInvalidURL, _dataInvalidWeek, _dataLabelPrefixAutoCompleteField, _dataLabelPrefixRangeMaxField, _dataLabelPrefixRangeMinField, _dataLabelPrefixRequiredField, _dataLabelSuffixAutoCompleteField, _dataLabelSuffixRangeMaxField, _dataLabelSuffixRangeMinField, _dataLabelSuffixRequiredField, _validationLength, _validationPattern, _validationRequired, _validationType;

	_dataLabelPrefixRequiredField = 'data-prefixrequiredfield';

	_dataLabelSuffixRequiredField = 'data-suffixrequiredfield';

	_dataLabelPrefixRangeMinField = 'data-prefixvalueminfield';

	_dataLabelSuffixRangeMinField = 'data-suffixvalueminfield';

	_dataLabelPrefixRangeMaxField = 'data-prefixvaluemaxfield';

	_dataLabelSuffixRangeMaxField = 'data-suffixvaluemaxfield';

	_dataLabelPrefixAutoCompleteField = 'data-prefixautocompletefield';

	_dataLabelSuffixAutoCompleteField = 'data-suffixautocompletefield';

	_dataIgnore = 'data-ignoreaccessibilityfix';

	_dataEventChangeAdded = 'data-changeadded';

	_dataInvalidURL = 'data-invalidurl';

	_dataInvalidEmail = 'data-invalidemail';

	_dataInvalidRange = 'data-invalidrange';

	_dataInvalidLength = 'data-invalidlength';

	_dataInvalidPattern = 'data-invalidpattern';

	_dataInvalidRequired = 'data-invalidrequired';

	_dataInvalidDate = 'data-invaliddate';

	_dataInvalidTime = 'data-invalidtime';

	_dataInvalidDateTime = 'data-invaliddatetime';

	_dataInvalidMonth = 'data-invalidmonth';

	_dataInvalidWeek = 'data-invalidweek';

	_validationType = 'type';

	_validationRequired = 'required';

	_validationPattern = 'pattern';

	_validationLength = 'length';

	/**
	 * Initializes a new object that manipulate the accessibility of the forms
	 * of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	 */
	function AccessibleFormImplementation(parser, configure) {
		this.parser = parser;
		this.prefixId = configure.getParameter('prefix-generated-ids');
		this.prefixRequiredField = configure.getParameter('prefix-required-field');
		this.suffixRequiredField = configure.getParameter('suffix-required-field');
		this.prefixRangeMinField = configure.getParameter('prefix-range-min-field');
		this.suffixRangeMinField = configure.getParameter('suffix-range-min-field');
		this.prefixRangeMaxField = configure.getParameter('prefix-range-max-field');
		this.suffixRangeMaxField = configure.getParameter('suffix-range-max-field');
		this.prefixAutoCompleteField = configure.getParameter('prefix-autocomplete-field');
		this.suffixAutoCompleteField = configure.getParameter('suffix-autocomplete-field');
		this.textAutoCompleteValueBoth = configure.getParameter('text-autocomplete-value-both');
		this.textAutoCompleteValueList = configure.getParameter('text-autocomplete-value-list');
		this.textAutoCompleteValueInline = configure.getParameter('text-autocomplete-value-inline');
		this.textAutoCompleteValueNone = configure.getParameter('text-autocomplete-value-none');
	}

	/**
	 * Display in label the information of field.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @param {String} prefix The prefix.
	 * @param {String} suffix The suffix.
	 * @param {String} dataPrefix The name of prefix attribute.
	 * @param {String} dataSuffix The name of suffix attribute.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	 */
	addPrefixSuffix = function(label, field, prefix, suffix, dataPrefix, dataSuffix) {
		var content;
		content = field.getAttribute('aria-label');
		if (!isEmpty(prefix)) {
			label.setAttribute(dataPrefix, prefix);
			if (content.indexOf(prefix) === -1) {
				content = "" + prefix + " " + content;
			}
		}
		if (!isEmpty(suffix)) {
			label.setAttribute(dataSuffix, suffix);
			if (content.indexOf(suffix) === -1) {
				content += " " + suffix;
			}
		}
		field.setAttribute('aria-label', content);
	};

	/**
	 * Display in label the information if the field is required.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @param {hatemile.util.html.HTMLDOMElement} requiredField The required field.
	 * @param {String} prefixRequiredField The description prefix of required
	 * fields.
	 * @param {String} suffixRequiredField The description suffix of required
	 * fields.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	 */
	fixLabelRequiredField = function(label, requiredField, prefixRequiredField, suffixRequiredField) {
		if ((requiredField.hasAttribute('required') || (requiredField.hasAttribute('aria-required') && (requiredField.getAttribute('aria-required').toLowerCase() === 'true'))) && (!label.hasAttribute(_dataLabelPrefixRequiredField)) && (!label.hasAttribute(_dataLabelSuffixRequiredField)) && requiredField.hasAttribute('aria-label')) {
			addPrefixSuffix(label, requiredField, prefixRequiredField, suffixRequiredField, _dataLabelPrefixRequiredField, _dataLabelSuffixRequiredField);
		}
	};

	/**
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
	 */
	fixLabelRangeField = function(label, rangeField, prefixRangeMinField, suffixRangeMinField, prefixRangeMaxField, suffixRangeMaxField) {
		var prefixRangeMaxFieldModified, prefixRangeMinFieldModified, suffixRangeMaxFieldModified, suffixRangeMinFieldModified, value;
		prefixRangeMinFieldModified = void 0;
		suffixRangeMinFieldModified = void 0;
		prefixRangeMaxFieldModified = void 0;
		suffixRangeMaxFieldModified = void 0;
		if (rangeField.hasAttribute('aria-label')) {
			if ((rangeField.hasAttribute('min') || rangeField.hasAttribute('aria-valuemin')) && (!label.hasAttribute(_dataLabelPrefixRangeMinField)) && (!label.hasAttribute(_dataLabelSuffixRangeMinField))) {
				if (rangeField.hasAttribute('min')) {
					value = rangeField.getAttribute('min');
				} else {
					value = rangeField.getAttribute('aria-valuemin');
				}
				if (!isEmpty(prefixRangeMinField)) {
					prefixRangeMinFieldModified = prefixRangeMinField.replace('{{value}}', value);
				}
				if (!isEmpty(suffixRangeMinField)) {
					suffixRangeMinFieldModified = suffixRangeMinField.replace('{{value}}', value);
				}
				addPrefixSuffix(label, rangeField, prefixRangeMinFieldModified, suffixRangeMinFieldModified, _dataLabelPrefixRangeMinField, _dataLabelSuffixRangeMinField);
			}
			if ((rangeField.hasAttribute('max') || rangeField.hasAttribute('aria-valuemax')) && (!label.hasAttribute(_dataLabelPrefixRangeMaxField)) && (!label.hasAttribute(_dataLabelSuffixRangeMaxField))) {
				if (rangeField.hasAttribute('max')) {
					value = rangeField.getAttribute('max');
				} else {
					value = rangeField.getAttribute('aria-valuemax');
				}
				if (!isEmpty(prefixRangeMaxField)) {
					prefixRangeMaxFieldModified = prefixRangeMaxField.replace('{{value}}', value);
				}
				if (!isEmpty(suffixRangeMaxField)) {
					suffixRangeMaxFieldModified = suffixRangeMaxField.replace('{{value}}', value);
				}
				addPrefixSuffix(label, rangeField, prefixRangeMaxFieldModified, suffixRangeMaxFieldModified, _dataLabelPrefixRangeMaxField, _dataLabelSuffixRangeMaxField);
			}
		}
	};

	/**
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
	 */
	fixLabelAutoCompleteField = function(label, autoCompleteField, parser, prefixAutoCompleteField, suffixAutoCompleteField, textAutoCompleteValueBoth, textAutoCompleteValueList, textAutoCompleteValueInline, textAutoCompleteValueNone) {
		var ariaAutocomplete, prefixAutoCompleteFieldModified, suffixAutoCompleteFieldModified;
		if (autoCompleteField.hasAttribute('aria-label') && (!label.hasAttribute(_dataLabelPrefixAutoCompleteField)) && (!label.hasAttribute(_dataLabelSuffixAutoCompleteField))) {
			ariaAutocomplete = getARIAAutoComplete(autoCompleteField, parser);
			if (!isEmpty(ariaAutocomplete)) {
				if (ariaAutocomplete === 'both') {
					if (!isEmpty(prefixAutoCompleteField)) {
						prefixAutoCompleteFieldModified = prefixAutoCompleteField.replace('{{value}}', textAutoCompleteValueBoth);
					}
					if (!isEmpty(suffixAutoCompleteField)) {
						suffixAutoCompleteFieldModified = suffixAutoCompleteField.replace('{{value}}', textAutoCompleteValueBoth);
					}
				} else if (ariaAutocomplete === 'none') {
					if (!isEmpty(prefixAutoCompleteField)) {
						prefixAutoCompleteFieldModified = prefixAutoCompleteField.replace('{{value}}', textAutoCompleteValueNone);
					}
					if (!isEmpty(suffixAutoCompleteField)) {
						suffixAutoCompleteFieldModified = suffixAutoCompleteField.replace('{{value}}', textAutoCompleteValueNone);
					}
				} else if (ariaAutocomplete === 'list') {
					if (!isEmpty(prefixAutoCompleteField)) {
						prefixAutoCompleteFieldModified = prefixAutoCompleteField.replace('{{value}}', textAutoCompleteValueList);
					}
					if (!isEmpty(suffixAutoCompleteField)) {
						suffixAutoCompleteFieldModified = suffixAutoCompleteField.replace('{{value}}', textAutoCompleteValueList);
					}
				}
				addPrefixSuffix(label, autoCompleteField, prefixAutoCompleteFieldModified, suffixAutoCompleteFieldModified, _dataLabelPrefixAutoCompleteField, _dataLabelSuffixAutoCompleteField);
			}
		}
	};

	/**
	 * Returns the appropriate value for attribute aria-autocomplete of field.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {String} The ARIA value of field.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	 */
	getARIAAutoComplete = function(field, parser) {
		var form, tagName, type, value;
		tagName = field.getTagName();
		if (field.hasAttribute('type')) {
			type = field.getAttribute('type').toLowerCase();
		}
		if ((tagName === 'TEXTAREA') || ((tagName === 'INPUT') && (!(('button' === type) || ('submit' === type) || ('reset' === type) || ('image' === type) || ('file' === type) || ('checkbox' === type) || ('radio' === type) || ('hidden' === type))))) {
			if (field.hasAttribute('autocomplete')) {
				value = field.getAttribute('autocomplete').toLowerCase();
			} else {
				form = parser.find(field).findAncestors('form').firstResult();
				if ((isEmpty(form)) && (field.hasAttribute('form'))) {
					form = parser.find("#" + (field.getAttribute('form'))).firstResult();
				}
				if ((!isEmpty(form)) && (form.hasAttribute('autocomplete'))) {
					value = form.getAttribute('autocomplete').toLowerCase();
				}
			}
			if ('on' === value) {
				return 'both';
			} else if ((field.hasAttribute('list')) && (!isEmpty(parser.find("datalist[id=\"" + (field.getAttribute('list')) + "\"]").firstResult()))) {
				return 'list';
			} else if ('off' === value) {
				return 'none';
			}
		}
		return void 0;
	};

	/**
	 * Returns the labels of field.
	 * @param {hatemile.util.html.HTMLDOMElement} field The field.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The labels of field.
	 * @memberof hatemile.implementation.AccessibleFormImplementation
	 */
	getLabels = function(field, parser) {
		var labels;
		if (field.hasAttribute('id')) {
			labels = parser.find("label[for=\"" + (field.getAttribute('id')) + "\"]").listResults();
		}
		if (isEmpty(labels)) {
			labels = parser.find(field).findAncestors('label').listResults();
		}
		return labels;
	};

	addEventHandler = function(element, typeEvent, typeDataEvent, typeFix, functionForEventHandler) {
		var attribute, found, nativeElement;
		if (!hasEvent(element, typeEvent, typeDataEvent, typeFix)) {
			found = false;
			attribute = element.getAttribute(typeDataEvent);
			nativeElement = element.getData();
			if (!hasEvent(element, typeEvent)) {
				nativeElement["liston" + typeEvent] = [];
				nativeElement["on" + typeEvent] = function(event) {
					var addedEvent, _i, _len, _ref;
					_ref = nativeElement["liston" + typeEvent];
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						addedEvent = _ref[_i];
						addedEvent(event);
					}
				};
			} else {
				found = exports.hatemile.util.CommonFunctions.inList(attribute, typeFix);
			}
			if (!found) {
				nativeElement["liston" + typeEvent].push(functionForEventHandler);
				attribute = exports.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix);
				element.setAttribute(typeDataEvent, attribute);
			}
		}
	};

	hasEvent = function(element, typeEvent, typeDataEvent, typeFix) {
		var attribute, nativeElement;
		nativeElement = element.getData();
		if (isEmpty(typeDataEvent) || isEmpty(typeFix)) {
			return (!isEmpty(nativeElement["on" + typeEvent])) || ((!isEmpty(nativeElement.eventListenerList)) && (!isEmpty(nativeElement.eventListenerList[typeEvent])));
		} else {
			attribute = element.getAttribute(typeDataEvent);
			return (hasEvent(element, typeEvent) && (!element.hasAttribute(typeDataEvent))) || exports.hatemile.util.CommonFunctions.inList(attribute, typeFix);
		}
	};

	isValid = function(field) {
		if (field.hasAttribute(_dataInvalidURL)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidEmail)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidRange)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidLength)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidPattern)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidRequired)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidDate)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidTime)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidDateTime)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidMonth)) {
			return false;
		} else if (field.hasAttribute(_dataInvalidWeek)) {
			return false;
		} else {
			return true;
		}
	};

	validateNow = function(field, dataInvalid, validateFunction) {
		if (validateFunction(field)) {
			if (field.hasAttribute(dataInvalid)) {
				field.removeAttribute(dataInvalid);
				if ((field.hasAttribute('aria-invalid')) && (isValid(field))) {
					field.removeAttribute('aria-invalid');
				}
			}
		} else {
			field.setAttribute(dataInvalid, 'true');
			field.setAttribute('aria-invalid', 'true');
		}
	};

	validate = function(field, dataInvalid, typeDataEvent, typeFix, validateFunction) {
		validateNow(field, dataInvalid, validateFunction);
		addEventHandler(field, 'change', typeDataEvent, typeFix, function(event) {
			return validateNow(field, dataInvalid, validateFunction);
		});
	};

	isValidRegularExpression = function(value, pattern) {
		var regularExpression;
		regularExpression = new RegExp(pattern);
		return regularExpression.test(value);
	};

	isValidURL = function(field) {
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, '([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/\\/)?(?:(?:(?:[a-zA-Z0-9_\\.\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\\-\\.]|%[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\\]))(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!:\\.\\?\\+=&@!$\'~*,;\\/\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?');
	};

	isValidEmail = function(field) {
		var regularExpression;
		regularExpression = '(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])';
		if (field.hasAttribute('multiple')) {
			regularExpression = "" + regularExpression + "( *, *" + regularExpression + ")*";
		}
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, "^(" + regularExpression + ")?$");
	};

	isValidRange = function(field) {
		var maxValue, minValue, value;
		if (!isEmpty(field.getData().value)) {
			if (!isValidRegularExpression(field.getData().value, '^[-+]?[0-9]+([.,][0-9]+)?$')) {
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

	isValidDate = function(field) {
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, '^([0-9]{2}(((([02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|([12][0-9])|(3[01])))))))?$');
	};

	isValidTime = function(field) {
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, '^((([01][0-9])|(2[0-3])):[0-5][0-9])?$');
	};

	isValidDateTime = function(field) {
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, '^([0-9]{2}(((([02468][048])|([13579][26]))-(02)-((0[1-9])|([12][0-9])))|(([0-9]{2})-((02-((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))-((0[1-9])|([12][0-9])|(30)))|(((0[13578])|(10)|(12))-((0[1-9])|([12][0-9])|(3[01]))))))T(([01][0-9])|(2[0-3])):[0-5][0-9]((:[0-5][0-9].[0-9])|(Z))?)?$');
	};

	isValidMonth = function(field) {
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, '^([0-9]{4}-((0[1-9])|(1[0-2])))?$');
	};

	isValidWeek = function(field) {
		return isEmpty(field.getData().value) || isValidRegularExpression(field.getData().value, '^([0-9]{4}-W((0[1-9])|([1-4][0-9])|(5[0-3])))?$');
	};

	isValidLength = function(field) {
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

	isValidPattern = function(field) {
		return isValidRegularExpression(field.getData().value, field.getAttribute('pattern'));
	};

	isValidRequired = function(field) {
		return !isEmpty(field.getData().value);
	};

	AccessibleFormImplementation.prototype.fixRequiredField = function(requiredField) {
		var label, labels, _i, _len;
		if (requiredField.hasAttribute('required')) {
			requiredField.setAttribute('aria-required', 'true');
			labels = getLabels(requiredField, this.parser);
			for (_i = 0, _len = labels.length; _i < _len; _i++) {
				label = labels[_i];
				fixLabelRequiredField(label, requiredField, this.prefixRequiredField, this.suffixRequiredField);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixRequiredFields = function() {
		var requiredField, requiredFields, _i, _len;
		requiredFields = this.parser.find('[required]').listResults();
		for (_i = 0, _len = requiredFields.length; _i < _len; _i++) {
			requiredField = requiredFields[_i];
			if (!requiredField.hasAttribute(_dataIgnore)) {
				this.fixRequiredField(requiredField);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixRangeField = function(rangeField) {
		var label, labels, _i, _len;
		if (rangeField.hasAttribute('min')) {
			rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'));
		}
		if (rangeField.hasAttribute('max')) {
			rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'));
		}
		labels = getLabels(rangeField, this.parser);
		for (_i = 0, _len = labels.length; _i < _len; _i++) {
			label = labels[_i];
			fixLabelRangeField(label, rangeField, this.prefixRangeMinField, this.suffixRangeMinField, this.prefixRangeMaxField, this.suffixRangeMaxField);
		}
	};

	AccessibleFormImplementation.prototype.fixRangeFields = function() {
		var rangeField, rangeFields, _i, _len;
		rangeFields = this.parser.find('[min],[max]').listResults();
		for (_i = 0, _len = rangeFields.length; _i < _len; _i++) {
			rangeField = rangeFields[_i];
			if (!rangeField.hasAttribute(_dataIgnore)) {
				this.fixRangeField(rangeField);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixAutoCompleteField = function(autoCompleteField) {
		var ariaAutoComplete, label, labels, _i, _len;
		ariaAutoComplete = getARIAAutoComplete(autoCompleteField, this.parser);
		if (!isEmpty(ariaAutoComplete)) {
			autoCompleteField.setAttribute('aria-autocomplete', ariaAutoComplete);
			labels = getLabels(autoCompleteField, this.parser);
			for (_i = 0, _len = labels.length; _i < _len; _i++) {
				label = labels[_i];
				fixLabelAutoCompleteField(label, autoCompleteField, this.parser, this.prefixAutoCompleteField, this.suffixAutoCompleteField, this.textAutoCompleteValueBoth, this.textAutoCompleteValueList, this.textAutoCompleteValueInline, this.textAutoCompleteValueNone);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixAutoCompleteFields = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('input[autocomplete],textarea[autocomplete],form[autocomplete] input,form[autocomplete] textarea,[list],[form]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (!element.hasAttribute(_dataIgnore)) {
				this.fixAutoCompleteField(element);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixLabel = function(label) {
		var field;
		if (label.getTagName() === 'LABEL') {
			if (label.hasAttribute('for')) {
				field = this.parser.find("#" + (label.getAttribute('for'))).firstResult();
			} else {
				field = this.parser.find(label).findDescendants('input,select,textarea').firstResult();
				if (!isEmpty(field)) {
					exports.hatemile.util.CommonFunctions.generateId(field, this.prefixId);
					label.setAttribute('for', field.getAttribute('id'));
				}
			}
			if (!isEmpty(field)) {
				if (!field.hasAttribute('aria-label')) {
					field.setAttribute('aria-label', label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' '));
				}
				fixLabelRequiredField(label, field, this.prefixRequiredField, this.suffixRequiredField);
				fixLabelRangeField(label, field, this.prefixRangeMinField, this.suffixRangeMinField, this.prefixRangeMaxField, this.suffixRangeMaxField);
				fixLabelAutoCompleteField(label, field, this.parser, this.prefixAutoCompleteField, this.suffixAutoCompleteField, this.textAutoCompleteValueBoth, this.textAutoCompleteValueList, this.textAutoCompleteValueInline, this.textAutoCompleteValueNone);
				exports.hatemile.util.CommonFunctions.generateId(label, this.prefixId);
				field.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')));
			}
		}
	};

	AccessibleFormImplementation.prototype.fixLabels = function() {
		var label, labels, _i, _len;
		labels = this.parser.find('label').listResults();
		for (_i = 0, _len = labels.length; _i < _len; _i++) {
			label = labels[_i];
			if (!label.hasAttribute(_dataIgnore)) {
				this.fixLabel(label);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixValidation = function(field) {
		var type;
		if ((field.hasAttribute('required')) || ((field.hasAttribute('aria-required')) && (field.getAttribute('aria-required').toLowerCase() === 'true'))) {
			validate(field, _dataInvalidRequired, _dataEventChangeAdded, _validationRequired, isValidRequired);
		}
		if (field.hasAttribute('pattern')) {
			validate(field, _dataInvalidPattern, _dataEventChangeAdded, _validationPattern, isValidPattern);
		}
		if ((field.hasAttribute('minlength')) || (field.hasAttribute('maxlength'))) {
			validate(field, _dataInvalidLength, _dataEventChangeAdded, _validationLength, isValidLength);
		}
		if ((field.hasAttribute('aria-valuemin')) || (field.hasAttribute('aria-valuemax'))) {
			validate(field, _dataInvalidRange, _dataEventChangeAdded, _validationType, isValidRange);
		}
		if (field.hasAttribute('type')) {
			type = field.getAttribute('type').toLowerCase();
			if (type === 'week') {
				validate(field, _dataInvalidWeek, _dataEventChangeAdded, _validationType, isValidWeek);
			} else if (type === 'month') {
				validate(field, _dataInvalidMonth, _dataEventChangeAdded, _validationType, isValidMonth);
			} else if ((type === 'datetime-local') || (type === 'datetime')) {
				validate(field, _dataInvalidDateTime, _dataEventChangeAdded, _validationType, isValidDateTime);
			} else if (type === 'time') {
				validate(field, _dataInvalidTime, _dataEventChangeAdded, _validationType, isValidTime);
			} else if (type === 'date') {
				validate(field, _dataInvalidDate, _dataEventChangeAdded, _validationType, isValidDate);
			} else if ((type === 'number') || (type === 'range')) {
				validate(field, _dataInvalidRange, _dataEventChangeAdded, _validationType, isValidRange);
			} else if (type === 'email') {
				validate(field, _dataInvalidEmail, _dataEventChangeAdded, _validationType, isValidEmail);
			} else if (type === 'url') {
				validate(field, _dataInvalidURL, _dataEventChangeAdded, _validationType, isValidURL);
			}
		}
	};

	AccessibleFormImplementation.prototype.fixValidations = function() {
		var field, fields, _i, _len;
		fields = this.parser.find('[required],input[pattern],input[minlength],input[maxlength],textarea[minlength],textarea[maxlength],input[type=week],input[type=month],input[type=datetime-local],input[type=datetime],input[type=time],input[type=date],input[type=number],input[type=range],input[type=email],input[type=url],[aria-required=true],input[aria-valuemin],input[aria-valuemax]').listResults();
		for (_i = 0, _len = fields.length; _i < _len; _i++) {
			field = fields[_i];
			if (!field.hasAttribute(_dataIgnore)) {
				this.fixValidation(field);
			}
		}
	};

	return AccessibleFormImplementation;

})();
