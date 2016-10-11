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
	var freeShortcut, generateAnchorFor, generateListHeading, generateListSkippers, getHeadingLevel, isValidHeading, _classHeadingAnchor, _classLongDescriptionLink, _classSkipperAnchor, _dataAnchorFor, _dataHeadingAnchorFor, _dataHeadingLevel, _dataIgnore, _dataLongDescriptionForImage, _idContainerHeading, _idContainerSkippers, _idTextHeading;

	_idContainerSkippers = 'container-skippers';

	_idContainerHeading = 'container-heading';

	_idTextHeading = 'text-heading';

	_classSkipperAnchor = 'skipper-anchor';

	_classHeadingAnchor = 'heading-anchor';

	_dataIgnore = 'data-ignoreaccessibilityfix';

	_dataAnchorFor = 'data-anchorfor';

	_dataHeadingAnchorFor = 'data-headinganchorfor';

	_dataHeadingLevel = 'data-headinglevel';

	_classLongDescriptionLink = 'longdescription-link';

	_dataLongDescriptionForImage = 'data-longdescriptionfor';

	/**
	 * Initializes a new object that manipulate the accessibility of the
	 * navigation of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @param {String} userAgent The user agent of the user.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	 */
	function AccessibleNavigationImplementation(parser, configure, skippers) {
		this.parser = parser;
		this.skippers = skippers;
		this.prefixId = configure.getParameter('prefix-generated-ids');
		this.attributeLongDescriptionPrefixBegin = configure.getParameter('attribute-longdescription-prefix-begin');
		this.attributeLongDescriptionSuffixBegin = configure.getParameter('attribute-longdescription-suffix-begin');
		this.attributeLongDescriptionPrefixEnd = configure.getParameter('attribute-longdescription-prefix-end');
		this.attributeLongDescriptionSuffixEnd = configure.getParameter('attribute-longdescription-suffix-end');
		this.elementsHeadingBegin = configure.getParameter('elements-heading-begin');
		this.elementsHeadingEnd = configure.getParameter('elements-heading-end');
		this.listSkippersAdded = false;
		this.validateHeading = false;
		this.validHeading = false;
		this.listSkippers = void 0;
	}

	/**
	 * Generate the list of skippers of page.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of skippers of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	 */
	generateListSkippers = function(parser) {
		var container, list, local;
		container = parser.find("#" + _idContainerSkippers).firstResult();
		if (isEmpty(container)) {
			local = parser.find('body').firstResult();
			if (!isEmpty(local)) {
				container = parser.createElement('div');
				container.setAttribute('id', _idContainerSkippers);
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
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {String} textHeading The text of description of container of heading
	 * links.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of heading links of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	 */
	generateListHeading = function(parser, textHeading) {
		var container, list, local, textContainer;
		container = parser.find("#" + _idContainerHeading).firstResult();
		if (isEmpty(container)) {
			local = parser.find('body').firstResult();
			if (!isEmpty(local)) {
				container = parser.createElement('div');
				container.setAttribute('id', _idContainerHeading);
				textContainer = parser.createElement('span');
				textContainer.setAttribute('id', _idTextHeading);
				textContainer.appendText(textHeading);
				container.appendElement(textContainer);
				local.appendElement(container);
			}
		}
		list = void 0;
		if (!isEmpty(container)) {
			list = parser.find(container).findChildren('ol').firstResult();
			if (isEmpty(list)) {
				list = parser.createElement('ol');
				container.appendElement(list);
			}
		}
		return list;
	};

	/**
	 * Returns the level of heading.
	 * @param {hatemile.util.html.HTMLDOMElement} element The heading.
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
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
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
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {String} dataAttribute The name of attribute that links the element
	 * with the anchor.
	 * @param {String} anchorClass The HTML class of anchor.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {String} prefixId The prefix of generated ids.
	 * @return {hatemile.util.html.HTMLDOMElement} The anchor.
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
	 * @param {hatemile.util.html.HTMLDOMElement} shortcut The shortcut.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
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

	AccessibleNavigationImplementation.prototype.fixSkipper = function(element) {
		var anchor, auxiliarElement, auxiliarElements, auxiliarSkipper, itemLink, link, shortcut, shortcuts, skipper, _i, _j, _len, _len1, _ref;
		skipper = void 0;
		_ref = this.skippers;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			auxiliarSkipper = _ref[_i];
			auxiliarElements = this.parser.find(auxiliarSkipper['selector']).listResults();
			for (_j = 0, _len1 = auxiliarElements.length; _j < _len1; _j++) {
				auxiliarElement = auxiliarElements[_j];
				if (auxiliarElement.getData() === element.getData()) {
					skipper = auxiliarSkipper;
					break;
				}
			}
			if (skipper !== void 0) {
				break;
			}
		}
		if (skipper !== void 0) {
			if (!this.listSkippersAdded) {
				this.listSkippers = generateListSkippers(this.parser);
				this.listSkippersAdded = true;
			}
			if (!isEmpty(this.listSkippers)) {
				anchor = generateAnchorFor(element, _dataAnchorFor, _classSkipperAnchor, this.parser, this.prefixId);
				if (!isEmpty(anchor)) {
					itemLink = this.parser.createElement('li');
					link = this.parser.createElement('a');
					link.setAttribute('href', "#" + (anchor.getAttribute('name')));
					link.appendText(skipper['default-text']);
					shortcuts = skipper['shortcut'];
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
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.fixAllSkippers = function() {
		var element, elements, skipper, _i, _j, _len, _len1, _ref;
		_ref = this.skippers;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			skipper = _ref[_i];
			elements = this.parser.find(skipper['selector']).listResults();
			for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
				element = elements[_j];
				if (!element.hasAttribute(_dataIgnore)) {
					this.fixSkipper(element);
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.fixHeading = function(heading) {
		var anchor, item, level, link, list, superItem;
		if (!this.validateHeading) {
			this.validHeading = isValidHeading(this.parser);
			this.validateHeading = true;
		}
		if (this.validHeading) {
			anchor = generateAnchorFor(heading, _dataHeadingAnchorFor, _classHeadingAnchor, this.parser, this.prefixId);
			if (!isEmpty(anchor)) {
				level = getHeadingLevel(heading);
				if (level === 1) {
					list = generateListHeading(this.parser, this.textHeading);
				} else {
					superItem = this.parser.find("#" + _idContainerHeading).findDescendants("[" + _dataHeadingLevel + "=\"" + ((level - 1).toString()) + "\"]").lastResult();
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
					item.setAttribute(_dataHeadingLevel, level.toString());
					link = this.parser.createElement('a');
					link.setAttribute('href', "#" + (anchor.getAttribute('name')));
					link.appendText(heading.getTextContent());
					item.appendElement(link);
					list.appendElement(item);
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.fixAllHeadings = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('h1,h2,h3,h4,h5,h6').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (!element.hasAttribute(_dataIgnore)) {
				this.fixHeading(element);
			}
		}
	};

	AccessibleNavigationImplementation.prototype.fixLongDescription = function(image) {
		var anchor, id, text;
		if (image.hasAttribute('longdesc')) {
			exports.hatemile.util.CommonFunctions.generateId(image, this.prefixId);
			id = image.getAttribute('id');
			if (isEmpty(this.parser.find("[" + _dataLongDescriptionForImage + "=\"" + id + "\"]").firstResult())) {
				if (image.hasAttribute('alt')) {
					if (!(isEmpty(this.attributeLongDescriptionPrefixBegin) && isEmpty(this.attributeLongDescriptionSuffixBegin))) {
						text = "" + this.attributeLongDescriptionPrefixBegin + " " + (image.getAttribute('alt')) + " " + this.attributeLongDescriptionSuffixBegin;
						anchor = this.parser.createElement('a');
						anchor.setAttribute('href', image.getAttribute('longdesc'));
						anchor.setAttribute('target', '_blank');
						anchor.setAttribute(_dataLongDescriptionForImage, id);
						anchor.setAttribute('class', _classLongDescriptionLink);
						anchor.appendText(text);
						image.insertBefore(anchor);
					}
					if (!(isEmpty(this.attributeLongDescriptionPrefixEnd) && isEmpty(this.attributeLongDescriptionSuffixEnd))) {
						text = "" + this.attributeLongDescriptionPrefixEnd + " " + (image.getAttribute('alt')) + " " + this.attributeLongDescriptionSuffixEnd;
						anchor = this.parser.createElement('a');
						anchor.setAttribute('href', image.getAttribute('longdesc'));
						anchor.setAttribute('target', '_blank');
						anchor.setAttribute(_dataLongDescriptionForImage, id);
						anchor.setAttribute('class', _classLongDescriptionLink);
						anchor.appendText(text);
						image.insertAfter(anchor);
					}
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.fixAllLongDescriptions = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[longdesc]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (!element.hasAttribute(_dataIgnore)) {
				this.fixLongDescription(element);
			}
		}
	};

	return AccessibleNavigationImplementation;

})();
