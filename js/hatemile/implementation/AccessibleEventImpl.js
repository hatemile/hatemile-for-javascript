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

exports.hatemile.implementation.AccessibleEventsImp = (function() {
  function AccessibleEventsImp(parser, configuration) {
    this.parser = parser;
    this.dataFocused = configuration.getParameter('data-focused');
    this.dataPressed = configuration.getParameter('data-pressed');
    this.dataIgnore = configuration.getParameter('data-ignore');
  }

  AccessibleEventsImp.prototype.fixOnHover = function(element) {
    var tag, _dataFocused;
    tag = element.getTagName();
    if (!((tag === 'INPUT') || (tag === 'BUTTON') || (tag === 'A') || (tag === 'SELECT') || (tag === 'TEXTAREA') || (element.hasAttribute('tabindex')))) {
      element.setAttribute('tabindex', '0');
    }
    _dataFocused = this.dataFocused;
    if (isEmpty(element.getData().onfocus)) {
      element.getData().onfocus = function() {
        element.setAttribute(_dataFocused, 'true');
        if (!isEmpty(element.getData().onmouseover)) {
          return element.getData().onmouseover();
        }
      };
    }
    if (isEmpty(element.getData().onblur)) {
      element.getData().onblur = function() {
        if (element.hasAttribute(_dataFocused)) {
          if ((element.getAttribute(_dataFocused).toLowerCase() === 'true') && (!isEmpty(element.getData().onmouseout))) {
            element.getData().onmouseout();
          }
          return element.setAttribute(_dataFocused, 'false');
        }
      };
    }
  };

  AccessibleEventsImp.prototype.fixOnHovers = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('body *').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if ((!element.hasAttribute(this.dataIgnore)) && ((!isEmpty(element.getData().onmouseover)) || (!isEmpty(element.getData().onmouseout)))) {
        this.fixOnHover(element);
      }
    }
  };

  AccessibleEventsImp.prototype.fixOnClick = function(element) {
    var tag, _dataPressed;
    tag = element.getTagName();
    if (!((tag === 'INPUT') || (tag === 'BUTTON') || (tag === 'A'))) {
      if (!((element.hasAttribute('tabindex')) || (tag === 'SELECT') || (tag === 'TEXTAREA'))) {
        element.setAttribute('tabindex', '0');
      }
      if ((isEmpty(element.getData().onkeypress)) && (isEmpty(element.getData().onkeyup)) && (isEmpty(element.getData().onkeydown))) {
        _dataPressed = this.dataPressed;
        element.getData().onkeypress = function(event) {
          return element.setAttribute(_dataPressed, event.keyCode);
        };
        element.getData().onkeyup = function(event) {
          var enter1, enter2, key;
          key = event.keyCode;
          enter1 = "\n".charCodeAt(0);
          enter2 = "\r".charCodeAt(0);
          if ((key === enter1) || (key === enter2)) {
            if (element.hasAttribute(_dataPressed)) {
              if (key === parseInt(element.getAttribute(_dataPressed))) {
                if (!isEmpty(element.getData().onclick)) {
                  element.getData().click();
                }
                return element.removeAttribute(_dataPressed);
              }
            }
          }
        };
      }
    }
  };

  AccessibleEventsImp.prototype.fixOnClicks = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('body *').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if ((!element.hasAttribute(this.dataIgnore)) && (!isEmpty(element.getData().onclick))) {
        this.fixOnClick(element);
      }
    }
  };

  return AccessibleEventsImp;

})();
