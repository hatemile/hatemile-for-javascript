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

var __exports, _base;

__exports = this;

/**
 * @namespace hatemile
 */
__exports.hatemile || (__exports.hatemile = {});

/**
 * @namespace hatemile.implementation
 */
(_base = __exports.hatemile).implementation || (_base.implementation = {});

__exports.hatemile.implementation.AccessibleNavigationImplementation = (function() {
	var CLASS_HEADING_ANCHOR, CLASS_LONG_DESCRIPTION_LINK, CLASS_SKIPPER_ANCHOR, DATA_ANCHOR_FOR, DATA_HEADING_ANCHOR_FOR, DATA_HEADING_LEVEL, DATA_LONG_DESCRIPTION_FOR_IMAGE, ID_CONTAINER_HEADING, ID_CONTAINER_SKIPPERS, ID_TEXT_HEADING, freeShortcut, generateAnchorFor, generateListHeading, generateListSkippers, getHeadingLevel, isValidHeading;

	ID_CONTAINER_SKIPPERS = 'container-skippers';
	ID_CONTAINER_HEADING = 'container-heading';
	ID_TEXT_HEADING = 'text-heading';
	CLASS_SKIPPER_ANCHOR = 'skipper-anchor';
	CLASS_HEADING_ANCHOR = 'heading-anchor';
	DATA_ANCHOR_FOR = 'data-anchorfor';
	DATA_HEADING_ANCHOR_FOR = 'data-headinganchorfor';
	DATA_HEADING_LEVEL = 'data-headinglevel';
	CLASS_LONG_DESCRIPTION_LINK = 'longdescription-link';
	DATA_LONG_DESCRIPTION_FOR_IMAGE = 'data-longdescriptionfor';

	/**
	 * Generate the list of skippers of page.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @returns {hatemile.util.html.HTMLDOMElement} The list of skippers of page.
	 * @private
	 * @function hatemile.implementation.AccessibleNavigationImplementation.generateListSkippers
	 */
	generateListSkippers = function(parser) {
		var container, list, local;
		container = parser.find("#" + ID_CONTAINER_SKIPPERS).firstResult();
		if (isEmpty(container)) {
			local = parser.find('body').firstResult();
			if (!isEmpty(local)) {
				container = parser.createElement('div');
				container.setAttribute('id', ID_CONTAINER_SKIPPERS);
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
	 * @param {string} textHeading The description of container of heading links.
	 * @returns {hatemile.util.html.HTMLDOMElement} The list of heading links of
	 * page.
	 * @private
	 * @function hatemile.implementation.AccessibleNavigationImplementation.generateListHeading
	 */
	generateListHeading = function(parser, textHeading) {
		var container, list, local, textContainer;
		container = parser.find("#" + ID_CONTAINER_HEADING).firstResult();
		if (isEmpty(container)) {
			local = parser.find('body').firstResult();
			if (!isEmpty(local)) {
				container = parser.createElement('div');
				container.setAttribute('id', ID_CONTAINER_HEADING);
				textContainer = parser.createElement('span');
				textContainer.setAttribute('id', ID_TEXT_HEADING);
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
	 * @returns {number} The level of heading.
	 * @private
	 * @function hatemile.implementation.AccessibleNavigationImplementation.getHeadingLevel
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
	 * Check that the headings of page are sintatic correct.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @returns {boolean} True if the headings of page are sintatic correct or
	 * false if not.
	 * @private
	 * @function hatemile.implementation.AccessibleNavigationImplementation.isValidHeading
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
	 * @param {string} dataAttribute The custom attribute that links the element
	 * with the anchor.
	 * @param {string} anchorClass The HTML class of anchor.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} prefixId The prefix of generated ids.
	 * @returns {hatemile.util.html.HTMLDOMElement} The anchor.
	 * @private
	 * @function hatemile.implementation.AccessibleNavigationImplementation.generateAnchorFor
	 */
	generateAnchorFor = function(element, dataAttribute, anchorClass, parser, prefixId) {
		var anchor;
		__exports.hatemile.util.CommonFunctions.generateId(element, prefixId);
		anchor = void 0;
		if (isEmpty(parser.find("[" + dataAttribute + "=\"" + (element.getAttribute('id')) + "\"]").firstResult())) {
			if (element.getTagName() === 'A') {
				anchor = element;
			} else {
				anchor = parser.createElement('a');
				__exports.hatemile.util.CommonFunctions.generateId(anchor, prefixId);
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
	 * @private
	 * @function hatemile.implementation.AccessibleNavigationImplementation.freeShortcut
	 */
	freeShortcut = function(shortcut, parser) {
		var alphaNumbers, element, elementWithShortcuts, elements, found, key, shortcuts, _i, _j, _k, _len, _len1, _len2;
		alphaNumbers = '1234567890abcdefghijklmnopqrstuvwxyz';
		elements = parser.find('[accesskey]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			shortcuts = element.getAttribute('accesskey').toLowerCase();
			if (__exports.hatemile.util.CommonFunctions.inList(shortcuts, shortcut)) {
				for (_j = 0, _len1 = alphaNumbers.length; _j < _len1; _j++) {
					key = alphaNumbers[_j];
					found = true;
					for (_k = 0, _len2 = elements.length; _k < _len2; _k++) {
						elementWithShortcuts = elements[_k];
						shortcuts = elementWithShortcuts.getAttribute('accesskey').toLowerCase();
						if (__exports.hatemile.util.CommonFunctions.inList(shortcuts, key)) {
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
	 * Initializes a new object that manipulate the accessibility of the
	 * navigation of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @param {object[]} skippers The skippers.
	 * @param {string} skippers[].selector The skipper selector.
	 * @param {string} skippers[].description The description of skipper.
	 * @param {string} skippers[].shortcut The skipper shortcut.
	 * @class The AccessibleNavigationImplementation class is official
	 * implementation of AccessibleNavigation interface.
	 * @implements {hatemile.AccessibleNavigation}
	 * @constructs hatemile.implementation.AccessibleNavigationImplementation
	 */
	function AccessibleNavigationImplementation(parser, configure, skippers) {
		this.parser = parser;
		this.skippers = skippers;
		this.prefixId = configure.getParameter('prefix-generated-ids');
		this.attributeLongDescriptionPrefixBefore = configure.getParameter('attribute-longdescription-prefix-before');
		this.attributeLongDescriptionSuffixBefore = configure.getParameter('attribute-longdescription-suffix-before');
		this.attributeLongDescriptionPrefixAfter = configure.getParameter('attribute-longdescription-prefix-after');
		this.attributeLongDescriptionSuffixAfter = configure.getParameter('attribute-longdescription-suffix-after');
		this.elementsHeadingBefore = configure.getParameter('elements-heading-before');
		this.elementsHeadingAfter = configure.getParameter('elements-heading-after');
		this.listSkippersAdded = false;
		this.validateHeading = false;
		this.validHeading = false;
		this.listSkippers = void 0;
	}

	AccessibleNavigationImplementation.prototype.provideNavigationBySkipper = function(element) {
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
				anchor = generateAnchorFor(element, DATA_ANCHOR_FOR, CLASS_SKIPPER_ANCHOR, this.parser, this.prefixId);
				if (!isEmpty(anchor)) {
					itemLink = this.parser.createElement('li');
					link = this.parser.createElement('a');
					link.setAttribute('href', "#" + (anchor.getAttribute('name')));
					link.appendText(skipper['description']);
					shortcuts = skipper['shortcut'];
					if (!isEmpty(shortcuts)) {
						shortcut = shortcuts[0];
						if (!isEmpty(shortcut)) {
							freeShortcut(shortcut, this.parser);
							link.setAttribute('accesskey', shortcut);
						}
					}
					__exports.hatemile.util.CommonFunctions.generateId(link, this.prefixId);
					itemLink.appendElement(link);
					this.listSkippers.appendElement(itemLink);
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.provideNavigationByAllSkippers = function() {
		var element, elements, skipper, _i, _j, _len, _len1, _ref;
		_ref = this.skippers;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			skipper = _ref[_i];
			elements = this.parser.find(skipper['selector']).listResults();
			for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
				element = elements[_j];
				if (__exports.hatemile.util.CommonFunctions.isValidElement(element)) {
					this.provideNavigationBySkipper(element);
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.provideNavigationByHeading = function(heading) {
		var anchor, item, level, link, list, superItem;
		if (!this.validateHeading) {
			this.validHeading = isValidHeading(this.parser);
			this.validateHeading = true;
		}
		if (this.validHeading) {
			anchor = generateAnchorFor(heading, DATA_HEADING_ANCHOR_FOR, CLASS_HEADING_ANCHOR, this.parser, this.prefixId);
			if (!isEmpty(anchor)) {
				level = getHeadingLevel(heading);
				if (level === 1) {
					list = generateListHeading(this.parser, "" + this.elementsHeadingBefore + this.elementsHeadingAfter);
				} else {
					superItem = this.parser.find("#" + ID_CONTAINER_HEADING).findDescendants("[" + DATA_HEADING_LEVEL + "=\"" + ((level - 1).toString()) + "\"]").lastResult();
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
					item.setAttribute(DATA_HEADING_LEVEL, level.toString());
					link = this.parser.createElement('a');
					link.setAttribute('href', "#" + (anchor.getAttribute('name')));
					link.appendText(heading.getTextContent());
					item.appendElement(link);
					list.appendElement(item);
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.provideNavigationByAllHeadings = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('h1,h2,h3,h4,h5,h6').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (__exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.provideNavigationByHeading(element);
			}
		}
	};

	AccessibleNavigationImplementation.prototype.provideNavigationToLongDescription = function(image) {
		var anchor, id, text;
		if (image.hasAttribute('longdesc')) {
			__exports.hatemile.util.CommonFunctions.generateId(image, this.prefixId);
			id = image.getAttribute('id');
			if (isEmpty(this.parser.find("[" + DATA_LONG_DESCRIPTION_FOR_IMAGE + "=\"" + id + "\"]").firstResult())) {
				if (image.hasAttribute('alt')) {
					if (!(isEmpty(this.attributeLongDescriptionPrefixBefore) && isEmpty(this.attributeLongDescriptionSuffixBefore))) {
						text = "" + this.attributeLongDescriptionPrefixBefore + " " + (image.getAttribute('alt')) + " " + this.attributeLongDescriptionSuffixBefore;
						anchor = this.parser.createElement('a');
						anchor.setAttribute('href', image.getAttribute('longdesc'));
						anchor.setAttribute('target', '_blank');
						anchor.setAttribute(DATA_LONG_DESCRIPTION_FOR_IMAGE, id);
						anchor.setAttribute('class', CLASS_LONG_DESCRIPTION_LINK);
						anchor.appendText(text);
						image.insertBefore(anchor);
					}
					if (!(isEmpty(this.attributeLongDescriptionPrefixAfter) && isEmpty(this.attributeLongDescriptionSuffixAfter))) {
						text = "" + this.attributeLongDescriptionPrefixAfter + " " + (image.getAttribute('alt')) + " " + this.attributeLongDescriptionSuffixAfter;
						anchor = this.parser.createElement('a');
						anchor.setAttribute('href', image.getAttribute('longdesc'));
						anchor.setAttribute('target', '_blank');
						anchor.setAttribute(DATA_LONG_DESCRIPTION_FOR_IMAGE, id);
						anchor.setAttribute('class', CLASS_LONG_DESCRIPTION_LINK);
						anchor.appendText(text);
						image.insertAfter(anchor);
					}
				}
			}
		}
	};

	AccessibleNavigationImplementation.prototype.provideNavigationToAllLongDescriptions = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[longdesc]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (__exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.provideNavigationToLongDescription(element);
			}
		}
	};

	return AccessibleNavigationImplementation;

})();