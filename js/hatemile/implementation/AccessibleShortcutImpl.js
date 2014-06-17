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

exports.hatemile.implementation.AccessibleShortcutImpl = (function() {
  /**
  	 * Initializes a new object that manipulate the accessibility of the
  	 * shortcuts of parser.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @param {String} userAgent The user agent of the user.
  	 * @class AccessibleShortcutImpl
  	 * @classdesc The AccessibleShortcutImpl class is official implementation of
  	 * AccessibleShortcut interface.
  	 * @extends hatemile.AccessibleShortcut
  	 * @version 1.0
  	 * @memberof hatemile.implementation
  */

  var generateList, getDescription, getShortcuts;

  function AccessibleShortcutImpl(parser, configure, userAgent) {
    var konqueror, mac, safari, spoofer, windows;
    this.parser = parser;
    this.idContainerShortcuts = configure.getParameter('id-container-shortcuts');
    this.idSkipLinkContainerShortcuts = configure.getParameter('id-skip-link-container-shortcuts');
    this.idSkipContainerShortcuts = configure.getParameter('id-skip-container-shortcuts');
    this.idTextShortcuts = configure.getParameter("id-text-shortcuts");
    this.dataAccessKey = configure.getParameter('data-accesskey');
    this.textSkipLinkContainerShortcuts = configure.getParameter('text-skip-container-shortcuts');
    this.textWithoutShortcut = configure.getParameter('text-no-shortcuts-alert');
    this.textShortcuts = configure.getParameter('text-shortcuts');
    this.standartPrefix = configure.getParameter("text-standart-shortcut");
    this.dataIgnore = configure.getParameter('data-ignore');
    if (!isEmpty(userAgent)) {
      userAgent = userAgent.toLowerCase();
      mac = userAgent.indexOf('mac') > -1;
      konqueror = userAgent.indexOf('konqueror') > -1;
      spoofer = userAgent.indexOf('spoofer') > -1;
      safari = userAgent.indexOf('applewebkit') > -1;
      windows = userAgent.indexOf('windows') > -1;
      if (userAgent.indexOf('opera') > -1) {
        this.prefix = 'SHIFT + ESC';
      } else if ((userAgent.indexOf('chome') > -1) && (!spoofer) && mac) {
        this.prefix = 'CTRL + OPTION';
      } else if (safari && (!windows) && (!spoofer)) {
        this.prefix = 'CTRL + ALT';
      } else if ((!windows) && (safari || mac || konqueror)) {
        this.prefix = 'CTRL';
      } else if (/firefox\/[2-9]|minefield\/3/.test(userAgent)) {
        this.prefix = 'ALT + SHIFT';
      } else {
        this.prefix = 'ALT';
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
  	 * @memberof hatemile.implementation.AccessibleShortcutImpl
  */


  getDescription = function(element, parser) {
    var description, descriptionId, descriptionIds, label, type, _i, _len;
    description = '';
    if (element.hasAttribute('title')) {
      description = element.getAttribute('title');
    } else if (element.hasAttribute('aria-labelledby') || element.hasAttribute('aria-describedby')) {
      if (element.hasAttribute('aria-labelledby')) {
        descriptionIds = element.getAttribute('aria-labelledby').split(new RegExp('[ \n\t\r]+'));
      } else {
        descriptionIds = element.getAttribute('aria-describedby').split(new RegExp('[ \n\t\r]+'));
      }
      for (_i = 0, _len = descriptionIds.length; _i < _len; _i++) {
        descriptionId = descriptionIds[_i];
        label = parser.find("#" + descriptionId).firstResult();
        if (!isEmpty(label)) {
          description = label.getTextContent();
          break;
        }
      }
    } else if (element.hasAttribute('aria-label')) {
      description = element.getAttribute('aria-label');
    } else if (element.hasAttribute('alt')) {
      description = element.getAttribute('alt');
    } else if (element.getTagName() === 'INPUT') {
      type = element.getAttribute('type').toLowerCase();
      if (((type === 'button') || (type === 'submit') || (type === 'reset')) && (element.hasAttribute('value'))) {
        description = element.getAttribute('value');
      }
    } else {
      description = element.getTextContent();
    }
    description = description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ');
    return description;
  };

  /**
  	 * Generate the list of shortcuts of page.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} idContainerShortcuts The id of list element that contains
  	 * the description of shortcuts.
  	 * @param {String} idSkipLinkContainerShortcuts The id of link element that
  	 * skip the list of shortcuts.
  	 * @param {String} idSkipContainerShortcuts The id of anchor element after
  	 * the list of shortcuts.
  	 * @param {String} textSkipLinkContainerShortcuts The text of link element
  	 * that skip the list of shortcuts.
  	 * @param {String} idTextShortcuts The id of text that precede the
  	 * shortcuts descriptions.
  	 * @param {String} textShortcuts The text that precede the shortcuts
  	 * descriptions.
  	 * @return {hatemile.util.HTMLDOMElement} The list of shortcuts of page.
  	 * @memberof hatemile.implementation.AccessibleShortcutImpl
  */


  generateList = function(parser, idContainerShortcuts, idSkipLinkContainerShortcuts, idSkipContainerShortcuts, textSkipLinkContainerShortcuts, idTextShortcuts, textShortcuts) {
    var anchor, anchorJump, container, firstChild, list, textContainer;
    container = parser.find("#" + idContainerShortcuts).firstResult();
    if (isEmpty(container)) {
      container = parser.createElement('div');
      container.setAttribute('id', idContainerShortcuts);
      firstChild = parser.find('body').firstResult().getFirstElementChild();
      firstChild.insertBefore(container);
      anchorJump = parser.createElement('a');
      anchorJump.setAttribute('id', idSkipLinkContainerShortcuts);
      anchorJump.setAttribute('href', "#" + idSkipContainerShortcuts);
      anchorJump.appendText(textSkipLinkContainerShortcuts);
      container.insertBefore(anchorJump);
      anchor = parser.createElement('a');
      anchor.setAttribute('name', idSkipContainerShortcuts);
      anchor.setAttribute('id', idSkipContainerShortcuts);
      firstChild.insertBefore(anchor);
      textContainer = parser.createElement('span');
      textContainer.setAttribute('id', idTextShortcuts);
      textContainer.appendText(textShortcuts);
      container.appendElement(textContainer);
    }
    list = parser.find(container).findChildren('ul').firstResult();
    if (isEmpty(list)) {
      list = parser.createElement('ul');
      container.appendElement(list);
    }
    return list;
  };

  /**
  	 * Get a list of elements that contains
  	 * the descriptions of shortcuts.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} idContainerShortcuts The id of list element that contains
  	 * the description of shortcuts.
  	 * @return {hatemile.util.HTMLDOMElement[]} The list of elements with descriptions of shortcuts.
  	 * @memberof hatemile.implementation.AccessibleShortcutImpl
  */


  getShortcuts = function(parser, idContainerShortcuts) {
    var container, items, list;
    container = parser.find("#" + idContainerShortcuts).firstResult();
    if (isEmpty(container)) {
      return [];
    } else {
      list = parser.find(container).findChildren('ul').firstResult();
      if (isEmpty(list)) {
        return [];
      } else {
        items = parser.find(list).findChildren('li').listResults();
        if (isEmpty(items)) {
          return [];
        } else {
          return items;
        }
      }
    }
  };

  AccessibleShortcutImpl.prototype.showShortcuts = function() {
    var item, items, text, _i, _len;
    items = getShortcuts(this.parser, this.idContainerShortcuts);
    if (isEmpty(items)) {
      alert(this.textWithoutShortcut);
      return;
    }
    text = this.textShortcut;
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      text += "\n*" + (item.getTextContent());
    }
    alert(text);
  };

  AccessibleShortcutImpl.prototype.getPrefix = function() {
    return this.prefix;
  };

  AccessibleShortcutImpl.prototype.fixShortcut = function(element) {
    var description, item, key, keys, _i, _len;
    if (element.hasAttribute('accesskey')) {
      description = getDescription(element, this.parser);
      if (!element.hasAttribute('title')) {
        element.setAttribute('title', description);
      }
      keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'));
      if (isEmpty(this.list)) {
        this.list = generateList(this.parser, this.idContainerShortcuts, this.idSkipLinkContainerShortcuts, this.idSkipContainerShortcuts, this.textSkipLinkContainerShortcuts, this.idTextShortcuts, this.textShortcuts);
      }
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        key = key.toUpperCase();
        if (isEmpty(this.parser.find(this.list).findChildren("[" + this.dataAccessKey + "=" + key + "]").firstResult())) {
          item = this.parser.createElement('li');
          item.setAttribute(this.dataAccessKey, key);
          item.appendText("" + this.prefix + " + " + key + ": " + description);
          this.list.appendElement(item);
        }
      }
    }
  };

  AccessibleShortcutImpl.prototype.fixShortcuts = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[accesskey]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixShortcut(element);
      }
    }
  };

  return AccessibleShortcutImpl;

})();
