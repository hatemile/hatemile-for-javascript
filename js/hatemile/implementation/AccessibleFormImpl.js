/*
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

exports.hatemile.implementation.AccessibleFormImpl = (function() {
  /**
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
  */

  function AccessibleFormImpl(parser, configuration) {
    this.parser = parser;
    this.prefixId = configuration.getParameter('prefix-generated-ids');
    this.dataLabelRequiredField = configuration.getParameter('data-label-required-field');
    this.prefixRequiredField = configuration.getParameter('prefix-required-field');
    this.suffixRequiredField = configuration.getParameter('suffix-required-field');
    this.dataIgnore = configuration.getParameter('data-ignore');
  }

  AccessibleFormImpl.prototype.fixRequiredField = function(requiredField) {
    var label, labels, _i, _len;
    if (requiredField.hasAttribute('required')) {
      requiredField.setAttribute('aria-required', 'true');
      if (requiredField.hasAttribute('id')) {
        labels = this.parser.find("label[for=" + (requiredField.getAttribute('id')) + "]").listResults();
      }
      if (isEmpty(labels)) {
        labels = this.parser.find(requiredField).findAncestors('label').listResults();
      }
      for (_i = 0, _len = labels.length; _i < _len; _i++) {
        label = labels[_i];
        label.setAttribute(this.dataLabelRequiredField, 'true');
      }
    }
  };

  AccessibleFormImpl.prototype.fixRequiredFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[required]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixRequiredField(element);
      }
    }
  };

  AccessibleFormImpl.prototype.fixDisabledField = function(disabledField) {
    if (disabledField.hasAttribute('disabled')) {
      disabledField.setAttribute('aria-disabled', 'true');
    }
  };

  AccessibleFormImpl.prototype.fixDisabledFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[disabled]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixDisabledField(element);
      }
    }
  };

  AccessibleFormImpl.prototype.fixReadOnlyField = function(readOnlyField) {
    if (readOnlyField.hasAttribute('readonly')) {
      readOnlyField.setAttribute('aria-readonly', 'true');
    }
  };

  AccessibleFormImpl.prototype.fixReadOnlyFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[readonly]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixReadOnlyField(element);
      }
    }
  };

  AccessibleFormImpl.prototype.fixRangeField = function(rangeField) {
    if (rangeField.hasAttribute('min')) {
      rangeField.setAttribute('aria-valuemin', rangeField.getAttribute('min'));
    }
    if (rangeField.hasAttribute('max')) {
      rangeField.setAttribute('aria-valuemax', rangeField.getAttribute('max'));
    }
  };

  AccessibleFormImpl.prototype.fixRangeFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[min],[max]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixRangeField(element);
      }
    }
  };

  AccessibleFormImpl.prototype.fixTextField = function(textField) {
    var type, types;
    if ((textField.getTagName() === 'INPUT') && (textField.hasAttribute('type'))) {
      type = textField.getAttribute('type').toLowerCase();
      types = ['text', 'search', 'email', 'url', 'tel', 'number'];
      if (types.indexOf(type) > -1) {
        textField.setAttribute('aria-multiline', 'false');
      }
    } else if (textField.getTagName() === 'TEXTAREA') {
      textField.setAttribute('aria-multiline', 'true');
    }
  };

  AccessibleFormImpl.prototype.fixTextFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('input[type=text],input[type=search],input[type=email],input[type=url],input[type=tel],input[type=number],textarea').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixTextField(element);
      }
    }
  };

  AccessibleFormImpl.prototype.fixSelectField = function(selectField) {
    if (selectField.getTagName() === 'SELECT') {
      if (selectField.hasAttribute('multiple')) {
        selectField.setAttribute('aria-multiselectable', 'true');
      } else {
        selectField.setAttribute('aria-multiselectable', 'false');
      }
    }
  };

  AccessibleFormImpl.prototype.fixSelectFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('select').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixSelectField(element);
      }
    }
  };

  AccessibleFormImpl.prototype.fixLabel = function(label) {
    var contentLabel, input;
    if (label.getTagName() === 'LABEL') {
      if (label.hasAttribute('for')) {
        input = this.parser.find("#" + (label.getAttribute('for'))).firstResult();
      } else {
        input = this.parser.find(label).findDescendants('input,select,textarea').firstResult();
        if (!isEmpty(input)) {
          exports.hatemile.util.CommonFunctions.generateId(input, this.prefixId);
          label.setAttribute('for', input.getAttribute('id'));
        }
      }
      if (!isEmpty(input)) {
        if (!input.hasAttribute('aria-label')) {
          contentLabel = label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' ');
          if (input.hasAttribute('aria-required')) {
            if ((input.getAttribute('aria-required').toLowerCase() === 'true') && (contentLabel.indexOf(this.prefixRequiredField) === -1)) {
              contentLabel = "" + this.prefixRequiredField + " " + contentLabel;
            }
            if ((input.getAttribute('aria-required').toLowerCase() === 'true') && (contentLabel.indexOf(this.suffixRequiredField) === -1)) {
              contentLabel += " " + this.suffixRequiredField;
            }
          }
          input.setAttribute('aria-label', contentLabel);
        }
        exports.hatemile.util.CommonFunctions.generateId(label, this.prefixId);
        input.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(input.getAttribute('aria-labelledby'), label.getAttribute('id')));
      }
    }
  };

  AccessibleFormImpl.prototype.fixLabels = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('label').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixLabel(element);
      }
    }
  };

  return AccessibleFormImpl;

})();
