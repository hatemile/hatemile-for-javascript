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
 * @class AccessibleNavigationImplementation
 * @classdesc The AccessibleNavigationImplementation class is official
 * implementation of AccessibleNavigation interface.
 * @extends hatemile.AccessibleNavigation
 * @memberof hatemile.implementation
*/


exports.hatemile.implementation.AccessibleNavigationImplementation = (function() {
  /**
  	 * Initializes a new object that manipulate the accessibility of the
  	 * navigation of parser.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @param {String} userAgent The user agent of the user.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */

  var executeFixShortcut, executeFixSkipper, freeShortcut, generateAnchorFor, generateListHeading, generateListShortcuts, generateListSkippers, getDescription, getHeadingLevel, isValidHeading;

  function AccessibleNavigationImplementation(parser, configure, userAgent) {
    var chrome, firefox, ie, konqueror, mac, opera, safari, spoofer, windows;
    this.parser = parser;
    this.idContainerShortcuts = 'container-shortcuts';
    this.idContainerSkippers = 'container-skippers';
    this.idContainerHeading = 'container-heading';
    this.idTextShortcuts = 'text-shortcuts';
    this.idTextHeading = 'text-heading';
    this.classSkipperAnchor = 'skipper-anchor';
    this.classHeadingAnchor = 'heading-anchor';
    this.dataAccessKey = 'data-shortcutdescriptionfor';
    this.dataIgnore = 'data-ignoreaccessibilityfix';
    this.dataAnchorFor = 'data-anchorfor';
    this.dataHeadingAnchorFor = 'data-headinganchorfor';
    this.dataHeadingLevel = 'data-headinglevel';
    this.prefixId = configure.getParameter('prefix-generated-ids');
    this.textShortcuts = configure.getParameter('text-shortcuts');
    this.textHeading = configure.getParameter('text-heading');
    this.standartPrefix = configure.getParameter('text-standart-shortcut-prefix');
    this.skippers = configure.getSkippers();
    this.listShortcutsAdded = false;
    this.listSkippersAdded = false;
    this.validateHeading = false;
    this.validHeading = false;
    this.listShortcuts = void 0;
    this.listSkippers = void 0;
    if (!isEmpty(userAgent)) {
      userAgent = userAgent.toLowerCase();
      opera = userAgent.indexOf('opera') > -1;
      mac = userAgent.indexOf('mac') > -1;
      konqueror = userAgent.indexOf('konqueror') > -1;
      spoofer = userAgent.indexOf('spoofer') > -1;
      safari = userAgent.indexOf('applewebkit') > -1;
      windows = userAgent.indexOf('windows') > -1;
      chrome = userAgent.indexOf('chrome') > -1;
      firefox = /firefox\/[2-9]|minefield\/3/.test(userAgent);
      ie = (userAgent.indexOf('msie') > -1) || (userAgent.indexOf('trident') > -1);
      if (opera) {
        this.prefix = 'SHIFT + ESC';
      } else if (chrome && mac && (!spoofer)) {
        this.prefix = 'CTRL + OPTION';
      } else if (safari && (!windows) && (!spoofer)) {
        this.prefix = 'CTRL + ALT';
      } else if ((!windows) && (safari || mac || konqueror)) {
        this.prefix = 'CTRL';
      } else if (firefox) {
        this.prefix = 'ALT + SHIFT';
      } else if (chrome || ie) {
        this.prefix = 'ALT';
      } else {
        this.prefix = this.standartPrefix;
      }
    } else {
      this.prefix = this.standartPrefix;
    }
  }

  /**
  	 * Returns the description of element.
  	 * @param {hatemile.util.HTMLDOMElement} element The element with description.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @return {String} The description of element.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  getDescription = function(element, parser) {
    var description, descriptionId, descriptionIds, elementDescription, type, _i, _len;
    description = void 0;
    if (element.hasAttribute('title')) {
      description = element.getAttribute('title');
    } else if (element.hasAttribute('aria-label')) {
      description = element.getAttribute('aria-label');
    } else if (element.hasAttribute('alt')) {
      description = element.getAttribute('alt');
    } else if (element.hasAttribute('label')) {
      description = element.getAttribute('label');
    } else if (element.hasAttribute('aria-labelledby') || element.hasAttribute('aria-describedby')) {
      if (element.hasAttribute('aria-labelledby')) {
        descriptionIds = element.getAttribute('aria-labelledby').split(new RegExp('[ \n\t\r]+'));
      } else {
        descriptionIds = element.getAttribute('aria-describedby').split(new RegExp('[ \n\t\r]+'));
      }
      for (_i = 0, _len = descriptionIds.length; _i < _len; _i++) {
        descriptionId = descriptionIds[_i];
        elementDescription = parser.find("#" + descriptionId).firstResult();
        if (!isEmpty(elementDescription)) {
          description = elementDescription.getTextContent();
          break;
        }
      }
    } else if ((element.getTagName() === 'INPUT') && (element.hasAttribute('type'))) {
      type = element.getAttribute('type').toLowerCase();
      if (((type === 'button') || (type === 'submit') || (type === 'reset')) && (element.hasAttribute('value'))) {
        description = element.getAttribute('value');
      }
    }
    if (isEmpty(description)) {
      description = element.getTextContent();
    }
    return description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ');
  };

  /**
  	 * Generate the list of shortcuts of page.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} idContainerShortcuts The id of list element that contains
  	 * the description of shortcuts.
  	 * @param {String} idTextShortcuts The id of text of description of container
  	 * of shortcuts descriptions.
  	 * @param {String} textShortcuts The text of description of container of
  	 * shortcuts descriptions.
  	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
  	 * callback This class.
  	 * @return {hatemile.util.HTMLDOMElement} The list of shortcuts of page.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  generateListShortcuts = function(parser, idContainerShortcuts, idTextShortcuts, textShortcuts, callback) {
    var container, list, local, textContainer;
    container = parser.find("#" + idContainerShortcuts).firstResult();
    if (isEmpty(container)) {
      local = parser.find('body').firstResult();
      if (!isEmpty(local)) {
        container = parser.createElement('div');
        container.setAttribute('id', idContainerShortcuts);
        textContainer = parser.createElement('span');
        textContainer.setAttribute('id', idTextShortcuts);
        textContainer.appendText(textShortcuts);
        container.appendElement(textContainer);
        local.appendElement(container);
        executeFixSkipper(container, callback);
        executeFixSkipper(textContainer, callback);
      }
    }
    list = void 0;
    if (!isEmpty(container)) {
      list = parser.find(container).findChildren('ul').firstResult();
      if (isEmpty(list)) {
        list = parser.createElement('ul');
        container.appendElement(list);
      }
      executeFixSkipper(list, callback);
    }
    return list;
  };

  /**
  	 * Generate the list of skippers of page.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} idContainerSkippers The id of list element that contains
  	 * the skippers.
  	 * @return {hatemile.util.HTMLDOMElement} The list of skippers of page.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  generateListSkippers = function(parser, idContainerSkippers) {
    var container, list, local;
    container = parser.find("#" + idContainerSkippers).firstResult();
    if (isEmpty(container)) {
      local = parser.find('body').firstResult();
      if (!isEmpty(local)) {
        container = parser.createElement('div');
        container.setAttribute('id', idContainerSkippers);
        local.getFirstElementChild().insertBefore(container);
      }
    }
    list = void 0;
    if (!isEmpty(container)) {
      list = parser.find(container).findChildren('ul').firstResult();
      if (isEmpty(list)) {
        list = parser.createElement('ul');
        container.appendElement(list);
      }
    }
    return list;
  };

  /**
  	 * Generate the list of heading links of page.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} idContainerHeading The id of list element that contains the
  	 * links for the headings.
  	 * @param {String} idTextHeading The id of text of description of container of
  	 * heading links.
  	 * @param {String} textHeading The text of description of container of heading
  	 * links.
  	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
  	 * callback This class.
  	 * @return {hatemile.util.HTMLDOMElement} The list of heading links of page.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  generateListHeading = function(parser, idContainerHeading, idTextHeading, textHeading, callback) {
    var container, list, local, textContainer;
    container = parser.find("#" + idContainerHeading).firstResult();
    if (isEmpty(container)) {
      local = parser.find('body').firstResult();
      if (!isEmpty(local)) {
        container = parser.createElement('div');
        container.setAttribute('id', idContainerHeading);
        textContainer = parser.createElement('span');
        textContainer.setAttribute('id', idTextHeading);
        textContainer.appendText(textHeading);
        container.appendElement(textContainer);
        local.appendElement(container);
        executeFixSkipper(container, callback);
        executeFixSkipper(textContainer, callback);
      }
    }
    list = void 0;
    if (!isEmpty(container)) {
      list = parser.find(container).findChildren('ol').firstResult();
      if (isEmpty(list)) {
        list = parser.createElement('ol');
        container.appendElement(list);
      }
      executeFixSkipper(list, callback);
    }
    return list;
  };

  /**
  	 * Returns the level of heading.
  	 * @param {hatemile.util.HTMLDOMElement} element The heading.
  	 * @return {Number} The level of heading.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  getHeadingLevel = function(element) {
    var tag;
    tag = element.getTagName();
    if (tag === 'H1') {
      return 1;
    } else if (tag === 'H2') {
      return 2;
    } else if (tag === 'H3') {
      return 3;
    } else if (tag === 'H4') {
      return 4;
    } else if (tag === 'H5') {
      return 5;
    } else if (tag === 'H6') {
      return 6;
    } else {
      return -1;
    }
  };

  /**
  	 * Inform if the headings of page are sintatic correct.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @return {Boolean} True if the headings of page are sintatic correct or
  	 * false if not.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  isValidHeading = function(parser) {
    var countMainHeading, element, elements, lastLevel, level, _i, _len;
    elements = parser.find('h1,h2,h3,h4,h5,h6').listResults();
    lastLevel = 0;
    countMainHeading = 0;
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      level = getHeadingLevel(element);
      if (level === 1) {
        if (countMainHeading === 1) {
          return false;
        } else {
          countMainHeading = 1;
        }
      }
      if (level - lastLevel > 1) {
        return false;
      }
      lastLevel = level;
    }
    return true;
  };

  /**
  	 * Generate an anchor for the element.
  	 * @param {hatemile.util.HTMLDOMElement} element The element.
  	 * @param {String} dataAttribute The name of attribute that links the element
  	 * with the anchor.
  	 * @param {String} anchorClass The HTML class of anchor.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} prefixId The prefix of generated ids.
  	 * @return {hatemile.util.HTMLDOMElement} The anchor.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  generateAnchorFor = function(element, dataAttribute, anchorClass, parser, prefixId) {
    var anchor;
    exports.hatemile.util.CommonFunctions.generateId(element, prefixId);
    anchor = void 0;
    if (isEmpty(parser.find("[" + dataAttribute + "=\"" + (element.getAttribute('id')) + "\"]").firstResult())) {
      if (element.getTagName() === 'A') {
        anchor = element;
      } else {
        anchor = parser.createElement('a');
        exports.hatemile.util.CommonFunctions.generateId(anchor, prefixId);
        anchor.setAttribute('class', anchorClass);
        element.insertBefore(anchor);
      }
      if (!anchor.hasAttribute('name')) {
        anchor.setAttribute('name', anchor.getAttribute('id'));
      }
      anchor.setAttribute(dataAttribute, element.getAttribute('id'));
    }
    return anchor;
  };

  /**
  	 * Replace the shortcut of elements, that has the shortcut passed.
  	 * @param {hatemile.util.HTMLDOMElement} shortcut The shortcut.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  freeShortcut = function(shortcut, parser) {
    var alphaNumbers, element, elementWithShortcuts, elements, found, key, shortcuts, _i, _j, _k, _len, _len1, _len2;
    alphaNumbers = '1234567890abcdefghijklmnopqrstuvwxyz';
    elements = parser.find('[accesskey]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      shortcuts = element.getAttribute('accesskey').toLowerCase();
      if (exports.hatemile.util.CommonFunctions.inList(shortcuts, shortcut)) {
        for (_j = 0, _len1 = alphaNumbers.length; _j < _len1; _j++) {
          key = alphaNumbers[_j];
          found = true;
          for (_k = 0, _len2 = elements.length; _k < _len2; _k++) {
            elementWithShortcuts = elements[_k];
            shortcuts = elementWithShortcuts.getAttribute('accesskey').toLowerCase();
            if (exports.hatemile.util.CommonFunctions.inList(shortcuts, key)) {
              found = false;
              break;
            }
          }
          if (found) {
            element.setAttribute('accesskey', key);
            break;
          }
        }
        if (found) {
          break;
        }
      }
    }
  };

  /**
  	 * Call fixSkipper method for element, if the page has the container of
  	 * skippers.
  	 * @param {hatemile.util.HTMLDOMElement} element The element.
  	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
  	 * callback This class.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  executeFixSkipper = function(element, callback) {
    var skipper, _i, _len, _ref;
    if (!isEmpty(callback.listSkippers)) {
      _ref = callback.skippers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        skipper = _ref[_i];
        if (callback.parser.find(skipper.getSelector()).listResults().indexOf(element) > -1) {
          callback.fixSkipper(element, skipper);
        }
      }
    }
  };

  /**
  	 * Call fixShortcut method for element, if the page has the container of
  	 * shortcuts.
  	 * @param {hatemile.util.HTMLDOMElement} element The element.
  	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
  	 * callback This class.
  	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
  */


  executeFixShortcut = function(element, callback) {
    if (!isEmpty(callback.listShortcuts)) {
      callback.fixShortcut(element);
    }
  };

  AccessibleNavigationImplementation.prototype.fixShortcut = function(element) {
    var description, item, key, keys, _i, _len;
    if (element.hasAttribute('accesskey')) {
      description = getDescription(element, this.parser);
      if (!element.hasAttribute('title')) {
        element.setAttribute('title', description);
      }
      if (!this.listShortcutsAdded) {
        this.listShortcuts = generateListShortcuts(this.parser, this.idContainerShortcuts, this.idTextShortcuts, this.textShortcuts, this);
        this.listShortcutsAdded = true;
      }
      if (!isEmpty(this.listShortcuts)) {
        keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'));
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          key = key.toUpperCase();
          if (isEmpty(this.parser.find(this.listShortcuts).findChildren("[" + this.dataAccessKey + "=\"" + key + "\"]").firstResult())) {
            item = this.parser.createElement('li');
            item.setAttribute(this.dataAccessKey, key);
            item.appendText("" + this.prefix + " + " + key + ": " + description);
            this.listShortcuts.appendElement(item);
          }
        }
      }
    }
  };

  AccessibleNavigationImplementation.prototype.fixShortcuts = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[accesskey]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixShortcut(element);
      }
    }
  };

  AccessibleNavigationImplementation.prototype.fixSkipper = function(element, skipper) {
    var anchor, itemLink, link, shortcut, shortcuts;
    if (!this.listSkippersAdded) {
      this.listSkippers = generateListSkippers(this.parser, this.idContainerSkippers);
      this.listSkippersAdded = true;
    }
    if (!isEmpty(this.listSkippers)) {
      anchor = generateAnchorFor(element, this.dataAnchorFor, this.classSkipperAnchor, this.parser, this.prefixId);
      if (!isEmpty(anchor)) {
        itemLink = this.parser.createElement('li');
        link = this.parser.createElement('a');
        link.setAttribute('href', "#" + (anchor.getAttribute('name')));
        link.appendText(skipper.getDefaultText());
        shortcuts = skipper.getShortcuts();
        if (!isEmpty(shortcuts)) {
          shortcut = shortcuts[0];
          if (!isEmpty(shortcut)) {
            freeShortcut(shortcut, this.parser);
            link.setAttribute('accesskey', shortcut);
          }
        }
        exports.hatemile.util.CommonFunctions.generateId(link, this.prefixId);
        itemLink.appendElement(link);
        this.listSkippers.appendElement(itemLink);
        executeFixShortcut(link, this);
      }
    }
  };

  AccessibleNavigationImplementation.prototype.fixSkippers = function() {
    var count, defaultText, element, elements, index, shortcuts, skipper, _i, _j, _len, _len1, _ref;
    _ref = this.skippers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      skipper = _ref[_i];
      elements = this.parser.find(skipper.getSelector()).listResults();
      count = elements.length > 1;
      if (count) {
        index = 1;
      }
      shortcuts = skipper.getShortcuts();
      for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
        element = elements[_j];
        if (!element.hasAttribute(this.dataIgnore)) {
          if (count) {
            defaultText = "" + (skipper.getDefaultText()) + " " + (index++);
          } else {
            defaultText = skipper.getDefaultText();
          }
          this.fixSkipper(element, new exports.hatemile.util.Skipper(skipper.getSelector(), defaultText, shortcuts.pop()));
        }
      }
    }
  };

  AccessibleNavigationImplementation.prototype.fixHeading = function(element) {
    var anchor, item, level, link, list, superItem;
    if (!this.validateHeading) {
      this.validHeading = isValidHeading(this.parser);
      this.validateHeading = true;
    }
    if (this.validHeading) {
      anchor = generateAnchorFor(element, this.dataHeadingAnchorFor, this.classHeadingAnchor, this.parser, this.prefixId);
      if (!isEmpty(anchor)) {
        level = getHeadingLevel(element);
        if (level === 1) {
          list = generateListHeading(this.parser, this.idContainerHeading, this.idTextHeading, this.textHeading, this);
        } else {
          superItem = this.parser.find("#" + this.idContainerHeading).findDescendants("[" + this.dataHeadingLevel + "=\"" + ((level - 1).toString()) + "\"]").lastResult();
          if (!isEmpty(superItem)) {
            list = this.parser.find(superItem).findChildren('ol').firstResult();
            if (isEmpty(list)) {
              list = this.parser.createElement('ol');
              superItem.appendElement(list);
            }
          }
        }
        if (!isEmpty(list)) {
          item = this.parser.createElement('li');
          item.setAttribute(this.dataHeadingLevel, level.toString());
          link = this.parser.createElement('a');
          link.setAttribute('href', "#" + (anchor.getAttribute('name')));
          link.appendText(element.getTextContent());
          item.appendElement(link);
          list.appendElement(item);
        }
      }
    }
  };

  AccessibleNavigationImplementation.prototype.fixHeadings = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('h1,h2,h3,h4,h5,h6').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixHeading(element);
      }
    }
  };

  return AccessibleNavigationImplementation;

})();
