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

exports.hatemile || (exports.hatemile = {});

(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleFormImp = (function() {
  function AccessibleFormImp(parser, configuration) {
    this.parser = parser;
    this.prefixId = configuration.getParameter('prefix-generated-ids');
    this.classRequiredField = configuration.getParameter('class-required-field');
    this.sufixRequiredField = configuration.getParameter('sufix-required-field');
    this.dataIgnore = configuration.getParameter('data-ignore');
  }

  AccessibleFormImp.prototype.fixRequiredField = function(element) {
    var label, labels, _i, _len;
    if (element.hasAttribute('required')) {
      element.setAttribute('aria-required', 'true');
      if (element.hasAttribute('id')) {
        labels = this.parser.find("label[for=" + (element.getAttribute('id')) + "]").listResults();
      }
      if (isEmpty(labels)) {
        labels = this.parser.find(element).findAncestors('label').listResults();
      }
      for (_i = 0, _len = labels.length; _i < _len; _i++) {
        label = labels[_i];
        label.setAttribute('class', exports.hatemile.util.CommonFunctions.increaseInList(label.getAttribute('class'), this.classRequiredField));
      }
    }
  };

  AccessibleFormImp.prototype.fixRequiredFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[required]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixRequiredField(element);
      }
    }
  };

  AccessibleFormImp.prototype.fixDisabledField = function(element) {
    if (element.hasAttribute('disabled')) {
      element.setAttribute('aria-disabled', 'true');
    }
  };

  AccessibleFormImp.prototype.fixDisabledFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[disabled]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixDisabledField(element);
      }
    }
  };

  AccessibleFormImp.prototype.fixReadOnlyField = function(element) {
    if (element.hasAttribute('readonly')) {
      element.setAttribute('aria-readonly', 'true');
    }
  };

  AccessibleFormImp.prototype.fixReadOnlyFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[readonly]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixReadOnlyField(element);
      }
    }
  };

  AccessibleFormImp.prototype.fixRangeField = function(element) {
    if (element.hasAttribute('min')) {
      element.setAttribute('aria-valuemin', element.getAttribute('min'));
    }
    if (element.hasAttribute('max')) {
      element.setAttribute('aria-valuemax', element.getAttribute('max'));
    }
  };

  AccessibleFormImp.prototype.fixRangeFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[min],[max]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixRangeField(element);
      }
    }
  };

  AccessibleFormImp.prototype.fixTextField = function(element) {
    var type, types;
    if ((element.getTagName() === 'INPUT') && (element.hasAttribute('type'))) {
      type = element.getAttribute('type').toLowerCase();
      types = ['text', 'search', 'email', 'url', 'tel', 'number'];
      if (types.indexOf(type) > -1) {
        element.setAttribute('aria-multiline', 'false');
      }
    } else if (element.getTagName() === 'TEXTAREA') {
      element.setAttribute('aria-multiline', 'true');
    }
  };

  AccessibleFormImp.prototype.fixTextFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('input[type=text],input[type=search],input[type=email],input[type=url],input[type=tel],input[type=number],textarea').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixTextField(element);
      }
    }
  };

  AccessibleFormImp.prototype.fixSelectField = function(element) {
    if (element.getTagName() === 'SELECT') {
      if (element.hasAttribute('multiple')) {
        element.setAttribute('aria-multiselectable', 'true');
      } else {
        element.setAttribute('aria-multiselectable', 'false');
      }
    }
  };

  AccessibleFormImp.prototype.fixSelectFields = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('select').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixSelectField(element);
      }
    }
  };

  AccessibleFormImp.prototype.fixLabel = function(element) {
    var input, label;
    if (element.getTagName() === 'LABEL') {
      if (element.hasAttribute('for')) {
        input = this.parser.find("#" + (element.getAttribute('for'))).firstResult();
      } else {
        input = this.parser.find(element).findDescendants('input,select,textarea').firstResult();
        if (!isEmpty(input)) {
          exports.hatemile.util.CommonFunctions.generateId(input, this.prefixId);
          element.setAttribute('for', input.getAttribute('id'));
        }
      }
      if (!isEmpty(input)) {
        if (!input.hasAttribute('aria-label')) {
          label = element.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' ');
          if (input.hasAttribute('aria-required')) {
            if ((input.getAttribute('aria-required').toLowerCase() === 'true') && (label.indexOf(this.sufixRequiredField) === -1)) {
              label += " " + this.sufixRequiredField;
            }
          }
          input.setAttribute('aria-label', label);
        }
        exports.hatemile.util.CommonFunctions.generateId(element, this.prefixId);
        input.setAttribute('aria-labelledby', exports.hatemile.util.CommonFunctions.increaseInList(input.getAttribute('aria-labelledby'), element.getAttribute('id')));
      }
    }
  };

  AccessibleFormImp.prototype.fixLabels = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('label').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixLabel(element);
      }
    }
  };

  return AccessibleFormImp;

})();
