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
  */

  var fixControlAutoComplete, fixLabelRequiredField;

  function AccessibleFormImpl(parser, configure) {
    this.parser = parser;
    this.prefixId = configure.getParameter('prefix-generated-ids');
    this.prefixRequiredField = configure.getParameter('prefix-required-field');
    this.suffixRequiredField = configure.getParameter('suffix-required-field');
    this.dataLabelRequiredField = "data-" + (configure.getParameter('data-label-required-field'));
    this.dataIgnore = "data-" + (configure.getParameter('data-ignore'));
  }

  /**
  	 * Do the label or the aria-label to inform in label that the field is
  	 * required.
  	 * @param {hatemile.util.HTMLDOMElement} label The label.
  	 * @param {hatemile.util.HTMLDOMElement} requiredField The required field.
  	 * @param {String} dataLabelRequiredField The name of attribute for the label
  	 * of a required field.
  	 * @param {String} prefixRequiredField The prefix of required field.
  	 * @param {String} suffixRequiredField The suffix of required field.
  	 * @memberof hatemile.implementation.AccessibleFormImpl
  */


  fixLabelRequiredField = function(label, requiredField, dataLabelRequiredField, prefixRequiredField, suffixRequiredField) {
    var contentLabel;
    if ((requiredField.hasAttribute('required')) || ((requiredField.hasAttribute('aria-required')) && (requiredField.getAttribute('aria-required').toLowerCase() === 'true'))) {
      if (!label.hasAttribute(dataLabelRequiredField)) {
        label.setAttribute(dataLabelRequiredField, 'true');
      }
      if (requiredField.hasAttribute('aria-label')) {
        contentLabel = requiredField.getAttribute('aria-label');
        if ((!isEmpty(prefixRequiredField)) && (contentLabel.indexOf(prefixRequiredField) === -1)) {
          contentLabel = "" + prefixRequiredField + " " + contentLabel;
        }
        if ((!isEmpty(suffixRequiredField)) && (contentLabel.indexOf(suffixRequiredField) === -1)) {
          contentLabel += " " + suffixRequiredField;
        }
        requiredField.setAttribute('aria-label', contentLabel);
      }
    }
  };

  /**
  	 * Fix the control to inform if it has autocomplete and the type.
  	 * @param {hatemile.util.HTMLDOMElement} control The form control.
  	 * @param {Boolean} active If the element has autocomplete.
  	 * @memberof hatemile.implementation.AccessibleFormImpl
  */


  fixControlAutoComplete = function(control, active, parser) {
    var list;
    if (active) {
      control.setAttribute('aria-autocomplete', 'both');
    } else if (!((active !== void 0) && (control.hasAttribute('aria-autocomplete')))) {
      if (control.hasAttribute('list')) {
        list = parser.find("datalist[id=" + (control.getAttribute('list')) + "]").firstResult();
        if (!isEmpty(list)) {
          control.setAttribute('aria-autocomplete', 'list');
        }
      }
      if ((active === false) && ((!control.hasAttribute('aria-autocomplete')) || (!control.getAttribute('aria-autocomplete').toLowerCase() === 'list'))) {
        control.setAttribute('aria-autocomplete', 'none');
      }
    }
  };

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
        fixLabelRequiredField(label, requiredField, this.dataLabelRequiredField, this.prefixRequiredField, this.suffixRequiredField);
      }
    }
  };

  AccessibleFormImpl.prototype.fixRequiredFields = function() {
    var requiredField, requiredFields, _i, _len;
    requiredFields = this.parser.find('[required]').listResults();
    for (_i = 0, _len = requiredFields.length; _i < _len; _i++) {
      requiredField = requiredFields[_i];
      if (!requiredField.hasAttribute(this.dataIgnore)) {
        this.fixRequiredField(requiredField);
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
    var rangeField, rangeFields, _i, _len;
    rangeFields = this.parser.find('[min],[max]').listResults();
    for (_i = 0, _len = rangeFields.length; _i < _len; _i++) {
      rangeField = rangeFields[_i];
      if (!rangeField.hasAttribute(this.dataIgnore)) {
        this.fixRangeField(rangeField);
      }
    }
  };

  AccessibleFormImpl.prototype.fixLabel = function(label) {
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
        fixLabelRequiredField(label, field, this.dataLabelRequiredField, this.prefixRequiredField, this.suffixRequiredField);
        exports.hatemile.util.CommonFunctions.generateId(label, this.prefixId);
        field.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')));
      }
    }
  };

  AccessibleFormImpl.prototype.fixLabels = function() {
    var label, labels, _i, _len;
    labels = this.parser.find('label').listResults();
    for (_i = 0, _len = labels.length; _i < _len; _i++) {
      label = labels[_i];
      if (!label.hasAttribute(this.dataIgnore)) {
        this.fixLabel(label);
      }
    }
  };

  AccessibleFormImpl.prototype.fixAutoComplete = function(element) {
    var active, autoCompleteControlFormValue, control, controls, fix, id, type, value, _i, _len;
    if (element.hasAttribute('autocomplete')) {
      value = element.getAttribute('autocomplete');
      if (value === 'on') {
        active = true;
      } else if (value === 'off') {
        active = false;
      } else {
        active = void 0;
      }
      if (active !== void 0) {
        if (element.getTagName() === 'FORM') {
          controls = this.parser.find(element).findDescendants('input,textarea').listResults();
          if (element.hasAttribute('id')) {
            id = element.getAttribute('id');
            controls = controls.concat(this.parser.find("input[form=" + id + "],textarea[form=" + id + "]").listResults());
          }
          for (_i = 0, _len = controls.length; _i < _len; _i++) {
            control = controls[_i];
            fix = true;
            if ((control.getTagName() === 'INPUT') && (control.hasAttribute('type'))) {
              type = control.getAttribute('type').toLowerCase();
              if ((type === 'button') || (type === 'submit') || (type === 'reset') || (type === 'image') || (type === 'file') || (type === 'checkbox') || (type === 'radio') || (type === 'password') || (type === 'hidden')) {
                fix = false;
              }
            }
            if (fix) {
              autoCompleteControlFormValue = control.getAttribute('autocomplete');
              if (autoCompleteControlFormValue === 'on') {
                fixControlAutoComplete(control, true, this.parser);
              } else if (autoCompleteControlFormValue === 'off') {
                fixControlAutoComplete(control, false, this.parser);
              } else {
                fixControlAutoComplete(control, active, this.parser);
              }
            }
          }
        } else {
          fixControlAutoComplete(element, active, this.parser);
        }
      }
    }
    if ((!element.hasAttribute('aria-autocomplete')) && (element.hasAttribute('list'))) {
      fixControlAutoComplete(element, void 0, this.parser);
    }
  };

  AccessibleFormImpl.prototype.fixAutoCompletes = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[autocomplete],[list]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixAutoComplete(element);
      }
    }
  };

  return AccessibleFormImpl;

})();
