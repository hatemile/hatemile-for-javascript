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
  /**
  	 * Initializes a new object that manipulate the accessibility of the forms
  	 * of parser.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @memberof hatemile.implementation.AccessibleFormImplementation
  */

  var addPrefixSuffix, fixLabelAutoCompleteField, fixLabelRangeField, fixLabelRequiredField, getARIAAutoComplete, getLabels;

  function AccessibleFormImplementation(parser, configure) {
    this.parser = parser;
    this.dataLabelPrefixRequiredField = 'data-prefixrequiredfield';
    this.dataLabelSuffixRequiredField = 'data-suffixrequiredfield';
    this.dataLabelPrefixRangeMinField = 'data-prefixvalueminfield';
    this.dataLabelSuffixRangeMinField = 'data-suffixvalueminfield';
    this.dataLabelPrefixRangeMaxField = 'data-prefixvaluemaxfield';
    this.dataLabelSuffixRangeMaxField = 'data-suffixvaluemaxfield';
    this.dataLabelPrefixAutoCompleteField = 'data-prefixautocompletefield';
    this.dataLabelSuffixAutoCompleteField = 'data-suffixautocompletefield';
    this.dataIgnore = 'data-ignoreaccessibilityfix';
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
  	 * @param {hatemile.util.HTMLDOMElement} label The label.
  	 * @param {hatemile.util.HTMLDOMElement} field The field.
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
  	 * @param {hatemile.util.HTMLDOMElement} label The label.
  	 * @param {hatemile.util.HTMLDOMElement} requiredField The required field.
  	 * @param {String} dataLabelPrefixRequiredField The name of attribute that
  	 * store the description prefix of required fields.
  	 * @param {String} dataLabelSuffixRequiredField The name of attribute that
  	 * store the description prefix of required fields.
  	 * @param {String} prefixRequiredField The description prefix of required
  	 * fields.
  	 * @param {String} suffixRequiredField The description suffix of required
  	 * fields.
  	 * @memberof hatemile.implementation.AccessibleFormImplementation
  */


  fixLabelRequiredField = function(label, requiredField, dataLabelPrefixRequiredField, dataLabelSuffixRequiredField, prefixRequiredField, suffixRequiredField) {
    if ((requiredField.hasAttribute('required') || (requiredField.hasAttribute('aria-required') && (requiredField.getAttribute('aria-required').toLowerCase() === 'true'))) && (!label.hasAttribute(dataLabelPrefixRequiredField)) && (!label.hasAttribute(dataLabelSuffixRequiredField)) && requiredField.hasAttribute('aria-label')) {
      addPrefixSuffix(label, requiredField, prefixRequiredField, suffixRequiredField, dataLabelPrefixRequiredField, dataLabelSuffixRequiredField);
    }
  };

  /**
  	 * Display in label the information of range of field.
  	 * @param {hatemile.util.HTMLDOMElement} label The label.
  	 * @param {hatemile.util.HTMLDOMElement} rangeField The range field.
  	 * @param {String} dataLabelPrefixRangeMinField The name of attribute that
  	 * store the description prefix of range fields for minimum value.
  	 * @param {String} dataLabelSuffixRangeMinField The name of attribute that
  	 * store the description suffix of range fields for minimum value.
  	 * @param {String} dataLabelPrefixRangeMaxField The name of attribute that
  	 * store the description prefix of range fields for maximum value.
  	 * @param {String} dataLabelSuffixRangeMaxField The name of attribute that
  	 * store the description suffix of range fields for maximum value.
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


  fixLabelRangeField = function(label, rangeField, dataLabelPrefixRangeMinField, dataLabelSuffixRangeMinField, dataLabelPrefixRangeMaxField, dataLabelSuffixRangeMaxField, prefixRangeMinField, suffixRangeMinField, prefixRangeMaxField, suffixRangeMaxField) {
    var prefixRangeMaxFieldModified, prefixRangeMinFieldModified, suffixRangeMaxFieldModified, suffixRangeMinFieldModified, value;
    prefixRangeMinFieldModified = void 0;
    suffixRangeMinFieldModified = void 0;
    prefixRangeMaxFieldModified = void 0;
    suffixRangeMaxFieldModified = void 0;
    if (rangeField.hasAttribute('aria-label')) {
      if ((rangeField.hasAttribute('min') || rangeField.hasAttribute('aria-valuemin')) && (!label.hasAttribute(dataLabelPrefixRangeMinField)) && (!label.hasAttribute(dataLabelSuffixRangeMinField))) {
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
        addPrefixSuffix(label, rangeField, prefixRangeMinFieldModified, suffixRangeMinFieldModified, dataLabelPrefixRangeMinField, dataLabelSuffixRangeMinField);
      }
      if ((rangeField.hasAttribute('max') || rangeField.hasAttribute('aria-valuemax')) && (!label.hasAttribute(dataLabelPrefixRangeMaxField)) && (!label.hasAttribute(dataLabelSuffixRangeMaxField))) {
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
        addPrefixSuffix(label, rangeField, prefixRangeMaxFieldModified, suffixRangeMaxFieldModified, dataLabelPrefixRangeMaxField, dataLabelSuffixRangeMaxField);
      }
    }
  };

  /**
  	 * Display in label the information if the field has autocomplete.
  	 * @param {hatemile.util.HTMLDOMElement} label The label.
  	 * @param {hatemile.util.HTMLDOMElement} autoCompleteField The autocomplete
  	 * field.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} dataLabelPrefixAutoCompleteField The name of attribute that
  	 * store the description prefix of autocomplete fields.
  	 * @param {String} dataLabelSuffixAutoCompleteField The name of attribute that
  	 * store the description suffix of autocomplete fields.
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


  fixLabelAutoCompleteField = function(label, autoCompleteField, parser, dataLabelPrefixAutoCompleteField, dataLabelSuffixAutoCompleteField, prefixAutoCompleteField, suffixAutoCompleteField, textAutoCompleteValueBoth, textAutoCompleteValueList, textAutoCompleteValueInline, textAutoCompleteValueNone) {
    var ariaAutocomplete, prefixAutoCompleteFieldModified, suffixAutoCompleteFieldModified;
    if (autoCompleteField.hasAttribute('aria-label') && (!label.hasAttribute(dataLabelPrefixAutoCompleteField)) && (!label.hasAttribute(dataLabelSuffixAutoCompleteField))) {
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
        addPrefixSuffix(label, autoCompleteField, prefixAutoCompleteFieldModified, suffixAutoCompleteFieldModified, dataLabelPrefixAutoCompleteField, dataLabelSuffixAutoCompleteField);
      }
    }
  };

  /**
  	 * Returns the appropriate value for attribute aria-autocomplete of field.
  	 * @param {hatemile.util.HTMLDOMElement} field The field.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
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
  	 * @param {hatemile.util.HTMLDOMElement} field The field.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @return {hatemile.util.HTMLDOMElement[]} The labels of field.
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

  AccessibleFormImplementation.prototype.fixRequiredField = function(requiredField) {
    var label, labels, _i, _len;
    if (requiredField.hasAttribute('required')) {
      requiredField.setAttribute('aria-required', 'true');
      labels = getLabels(requiredField, this.parser);
      for (_i = 0, _len = labels.length; _i < _len; _i++) {
        label = labels[_i];
        fixLabelRequiredField(label, requiredField, this.dataLabelPrefixRequiredField, this.dataLabelSuffixRequiredField, this.prefixRequiredField, this.suffixRequiredField);
      }
    }
  };

  AccessibleFormImplementation.prototype.fixRequiredFields = function() {
    var requiredField, requiredFields, _i, _len;
    requiredFields = this.parser.find('[required]').listResults();
    for (_i = 0, _len = requiredFields.length; _i < _len; _i++) {
      requiredField = requiredFields[_i];
      if (!requiredField.hasAttribute(this.dataIgnore)) {
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
      fixLabelRangeField(label, rangeField, this.dataLabelPrefixRangeMinField, this.dataLabelSuffixRangeMinField, this.dataLabelPrefixRangeMaxField, this.dataLabelSuffixRangeMaxField, this.prefixRangeMinField, this.suffixRangeMinField, this.prefixRangeMaxField, this.suffixRangeMaxField);
    }
  };

  AccessibleFormImplementation.prototype.fixRangeFields = function() {
    var rangeField, rangeFields, _i, _len;
    rangeFields = this.parser.find('[min],[max]').listResults();
    for (_i = 0, _len = rangeFields.length; _i < _len; _i++) {
      rangeField = rangeFields[_i];
      if (!rangeField.hasAttribute(this.dataIgnore)) {
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
        fixLabelAutoCompleteField(label, autoCompleteField, this.parser, this.dataLabelPrefixAutoCompleteField, this.dataLabelSuffixAutoCompleteField, this.prefixAutoCompleteField, this.suffixAutoCompleteField, this.textAutoCompleteValueBoth, this.textAutoCompleteValueList, this.textAutoCompleteValueInline, this.textAutoCompleteValueNone);
      }
    }
  };

  AccessibleFormImplementation.prototype.fixAutoCompleteFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('input[autocomplete],textarea[autocomplete],form[autocomplete] input,form[autocomplete] textarea,[list],[form]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
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
        fixLabelRequiredField(label, field, this.dataLabelPrefixRequiredField, this.dataLabelSuffixRequiredField, this.prefixRequiredField, this.suffixRequiredField);
        fixLabelRangeField(label, field, this.dataLabelPrefixRangeMinField, this.dataLabelSuffixRangeMinField, this.dataLabelPrefixRangeMaxField, this.dataLabelSuffixRangeMaxField, this.prefixRangeMinField, this.suffixRangeMinField, this.prefixRangeMaxField, this.suffixRangeMaxField);
        fixLabelAutoCompleteField(label, field, this.parser, this.dataLabelPrefixAutoCompleteField, this.dataLabelSuffixAutoCompleteField, this.prefixAutoCompleteField, this.suffixAutoCompleteField, this.textAutoCompleteValueBoth, this.textAutoCompleteValueList, this.textAutoCompleteValueInline, this.textAutoCompleteValueNone);
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
      if (!label.hasAttribute(this.dataIgnore)) {
        this.fixLabel(label);
      }
    }
  };

  return AccessibleFormImplementation;

})();
