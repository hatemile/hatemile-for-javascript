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

(function () {
    var base, self;

    self = this;


    /**
     * @namespace hatemile
     */

    this.hatemile || (this.hatemile = {});


    /**
     * @namespace hatemile.implementation
     */

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleDisplayScreenReaderImplementation = (function () {
        var CLASS_FORCE_READ_AFTER, CLASS_FORCE_READ_BEFORE, DATA_ARIA_BUSY_AFTER_OF, DATA_ARIA_BUSY_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_HASPOPUP_AFTER_OF, DATA_ARIA_HASPOPUP_BEFORE_OF, DATA_ARIA_INVALID_AFTER_OF, DATA_ARIA_INVALID_BEFORE_OF, DATA_ARIA_LEVEL_AFTER_OF, DATA_ARIA_LEVEL_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF, DATA_ARIA_SORT_BEFORE_OF, DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF, DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF, DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF, DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF, DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_HEADERS_AFTER_OF, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF, DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF, DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF, DATA_ATTRIBUTE_REQUIRED_AFTER_OF, DATA_ATTRIBUTE_REQUIRED_BEFORE_OF, DATA_ATTRIBUTE_TARGET_AFTER_OF, DATA_ATTRIBUTE_TARGET_BEFORE_OF, DATA_ATTRIBUTE_TITLE_AFTER_OF, DATA_ATTRIBUTE_TITLE_BEFORE_OF, DATA_INVALID_DATE, DATA_INVALID_DATETIME, DATA_INVALID_DATETIME_AFTER_OF, DATA_INVALID_DATETIME_BEFORE_OF, DATA_INVALID_DATE_AFTER_OF, DATA_INVALID_DATE_BEFORE_OF, DATA_INVALID_EMAIL, DATA_INVALID_EMAIL_AFTER_OF, DATA_INVALID_EMAIL_BEFORE_OF, DATA_INVALID_LENGTH, DATA_INVALID_LENGTH_AFTER_OF, DATA_INVALID_LENGTH_BEFORE_OF, DATA_INVALID_MONTH, DATA_INVALID_MONTH_AFTER_OF, DATA_INVALID_MONTH_BEFORE_OF, DATA_INVALID_PATTERN, DATA_INVALID_PATTERN_AFTER_OF, DATA_INVALID_PATTERN_BEFORE_OF, DATA_INVALID_RANGE, DATA_INVALID_RANGE_AFTER_OF, DATA_INVALID_RANGE_BEFORE_OF, DATA_INVALID_REQUIRED, DATA_INVALID_REQUIRED_AFTER_OF, DATA_INVALID_REQUIRED_BEFORE_OF, DATA_INVALID_TIME, DATA_INVALID_TIME_AFTER_OF, DATA_INVALID_TIME_BEFORE_OF, DATA_INVALID_URL, DATA_INVALID_URL_AFTER_OF, DATA_INVALID_URL_BEFORE_OF, DATA_INVALID_WEEK, DATA_INVALID_WEEK_AFTER_OF, DATA_INVALID_WEEK_BEFORE_OF, DATA_ROLE_AFTER_OF, DATA_ROLE_BEFORE_OF, ID_CONTAINER_SHORTCUTS, ID_TEXT_SHORTCUTS, forceRead, forceReadSimple, generateListShortcuts, getDescription, getShortcutPrefix, insertAfter, insertBefore;

        ID_CONTAINER_SHORTCUTS = 'container-shortcuts';

        ID_TEXT_SHORTCUTS = 'text-shortcuts';

        CLASS_FORCE_READ_BEFORE = 'force-read-before';

        CLASS_FORCE_READ_AFTER = 'force-read-after';

        DATA_ATTRIBUTE_REQUIRED_BEFORE_OF = 'data-attributerequiredbeforeof';

        DATA_ATTRIBUTE_REQUIRED_AFTER_OF = 'data-attributerequiredafterof';

        DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF = 'data-attributevalueminbeforeof';

        DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF = 'data-attributevalueminafterof';

        DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF = 'data-attributevaluemaxbeforeof';

        DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF = 'data-attributevaluemaxafterof';

        DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF = 'data-attributeautocompletebeforeof';

        DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF = 'data-attributeautocompleteafterof';

        DATA_ATTRIBUTE_TITLE_BEFORE_OF = 'data-attributetitlebeforeof';

        DATA_ATTRIBUTE_TITLE_AFTER_OF = 'data-attributetitleafterof';

        DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF = 'data-attributeaccesskeybeforeof';

        DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF = 'data-attributeaccesskeyafterof';

        DATA_ATTRIBUTE_TARGET_BEFORE_OF = 'data-attributetargetbeforeof';

        DATA_ATTRIBUTE_TARGET_AFTER_OF = 'data-attributetargetafterof';

        DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF = 'data-attributedownloadbeforeof';

        DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF = 'data-attributedownloadafterof';

        DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF = 'data-attributedraggablebeforeof';

        DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF = 'data-attributedraggableafterof';

        DATA_ATTRIBUTE_DROPZONE_BEFORE_OF = 'data-attributedropzonebeforeof';

        DATA_ATTRIBUTE_DROPZONE_AFTER_OF = 'data-attributedropzoneafterof';

        DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF = 'data-languagebeforeof';

        DATA_ATTRIBUTE_LANGUAGE_AFTER_OF = 'data-languageafterof';

        DATA_ATTRIBUTE_HEADERS_BEFORE_OF = 'data-headersbeforeof';

        DATA_ATTRIBUTE_HEADERS_AFTER_OF = 'data-headersafterof';

        DATA_ARIA_BUSY_BEFORE_OF = 'data-ariabusybeforeof';

        DATA_ARIA_BUSY_AFTER_OF = 'data-ariabusyafterof';

        DATA_ARIA_CHECKED_BEFORE_OF = 'data-ariacheckedbeforeof';

        DATA_ARIA_CHECKED_AFTER_OF = 'data-ariacheckedafterof';

        DATA_ARIA_DROPEFFECT_BEFORE_OF = 'data-ariadropeffectbeforeof';

        DATA_ARIA_DROPEFFECT_AFTER_OF = 'data-ariadropeffectafterof';

        DATA_ARIA_EXPANDED_BEFORE_OF = 'data-ariaexpandedbeforeof';

        DATA_ARIA_EXPANDED_AFTER_OF = 'data-ariaexpandedafterof';

        DATA_ARIA_GRABBED_BEFORE_OF = 'data-ariagrabbedbeforeof';

        DATA_ARIA_GRABBED_AFTER_OF = 'data-ariagrabbedafterof';

        DATA_ARIA_HASPOPUP_BEFORE_OF = 'data-ariahaspopupbeforeof';

        DATA_ARIA_HASPOPUP_AFTER_OF = 'data-ariahaspopupafterof';

        DATA_ARIA_INVALID_BEFORE_OF = 'data-ariainvalidbeforeof';

        DATA_ARIA_INVALID_AFTER_OF = 'data-ariainvalidafterof';

        DATA_ARIA_LEVEL_BEFORE_OF = 'data-arialevelbeforeof';

        DATA_ARIA_LEVEL_AFTER_OF = 'data-arialevelafterof';

        DATA_ARIA_ORIENTATION_BEFORE_OF = 'data-ariaorientationbeforeof';

        DATA_ARIA_ORIENTATION_AFTER_OF = 'data-ariaorientationafterof';

        DATA_ARIA_PRESSED_BEFORE_OF = 'data-ariapressedbeforeof';

        DATA_ARIA_PRESSED_AFTER_OF = 'data-ariapressedafterof';

        DATA_ARIA_SELECTED_BEFORE_OF = 'data-ariaselectedbeforeof';

        DATA_ARIA_SELECTED_AFTER_OF = 'data-ariaselectedafterof';

        DATA_ARIA_SORT_BEFORE_OF = 'data-ariasortbeforeof';

        DATA_ARIA_SORT_AFTER_OF = 'data-ariasortafterof';

        DATA_ROLE_BEFORE_OF = 'data-rolebeforeof';

        DATA_ROLE_AFTER_OF = 'data-roleafterof';

        DATA_INVALID_URL_BEFORE_OF = 'data-invalidurlbeforeof';

        DATA_INVALID_URL_AFTER_OF = 'data-invalidurlafterof';

        DATA_INVALID_EMAIL_BEFORE_OF = 'data-invalidemailbeforeof';

        DATA_INVALID_EMAIL_AFTER_OF = 'data-invalidemailafterof';

        DATA_INVALID_RANGE_BEFORE_OF = 'data-invalidrangebeforeof';

        DATA_INVALID_RANGE_AFTER_OF = 'data-invalidrangeafterof';

        DATA_INVALID_LENGTH_BEFORE_OF = 'data-invalidlengthbeforeof';

        DATA_INVALID_LENGTH_AFTER_OF = 'data-invalidlengthafterof';

        DATA_INVALID_PATTERN_BEFORE_OF = 'data-invalidpatternbeforeof';

        DATA_INVALID_PATTERN_AFTER_OF = 'data-invalidpatternafterof';

        DATA_INVALID_REQUIRED_BEFORE_OF = 'data-invalidrequiredbeforeof';

        DATA_INVALID_REQUIRED_AFTER_OF = 'data-invalidrequiredafterof';

        DATA_INVALID_DATE_BEFORE_OF = 'data-invaliddatebeforeof';

        DATA_INVALID_DATE_AFTER_OF = 'data-invaliddateafterof';

        DATA_INVALID_TIME_BEFORE_OF = 'data-invalidtimebeforeof';

        DATA_INVALID_TIME_AFTER_OF = 'data-invalidtimeafterof';

        DATA_INVALID_DATETIME_BEFORE_OF = 'data-invaliddatetimebeforeof';

        DATA_INVALID_DATETIME_AFTER_OF = 'data-invaliddatetimeafterof';

        DATA_INVALID_MONTH_BEFORE_OF = 'data-invalidmonthbeforeof';

        DATA_INVALID_MONTH_AFTER_OF = 'data-invalidmonthafterof';

        DATA_INVALID_WEEK_BEFORE_OF = 'data-invalidweekbeforeof';

        DATA_INVALID_WEEK_AFTER_OF = 'data-invalidweekafterof';

        DATA_INVALID_URL = 'data-invalidurl';

        DATA_INVALID_EMAIL = 'data-invalidemail';

        DATA_INVALID_RANGE = 'data-invalidrange';

        DATA_INVALID_LENGTH = 'data-invalidlength';

        DATA_INVALID_PATTERN = 'data-invalidpattern';

        DATA_INVALID_REQUIRED = 'data-invalidrequired';

        DATA_INVALID_DATE = 'data-invaliddate';

        DATA_INVALID_TIME = 'data-invalidtime';

        DATA_INVALID_DATETIME = 'data-invaliddatetime';

        DATA_INVALID_MONTH = 'data-invalidmonth';

        DATA_INVALID_WEEK = 'data-invalidweek';


        /**
         * Returns the shortcut prefix of browser.
         * @param {string} userAgent The user agent of browser.
         * @param {string} defaultPrefix The default prefix.
         * @returns {string} The shortcut prefix of browser.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.getShortcutPrefix
         */

        getShortcutPrefix = function (userAgent, defaultPrefix) {
            var chrome, firefox, ie, konqueror, mac, opera, safari, spoofer, windows;
            if (!self.isEmpty(userAgent)) {
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
                    return 'SHIFT + ESC';
                } else if (chrome && mac && (!spoofer)) {
                    return 'CTRL + OPTION';
                } else if (chrome || ie) {
                    return 'ALT';
                } else if (safari && (!windows) && (!spoofer)) {
                    return 'CTRL + ALT';
                } else if ((!windows) && (safari || mac || konqueror)) {
                    return 'CTRL';
                } else if (firefox) {
                    return 'ALT + SHIFT';
                }
            } else {
                return defaultPrefix;
            }
        };


        /**
         * Returns the description of element.
         * @param {hatemile.util.html.HTMLDOMElement} element The element.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @returns {string} The description of element.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.getDescription
         */

        getDescription = function (element, parser) {
            var description, descriptionId, descriptionIds, elementDescription, i, len, type;
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
                for (i = 0, len = descriptionIds.length; i < len; i++) {
                    descriptionId = descriptionIds[i];
                    elementDescription = parser.find("#" + descriptionId).firstResult();
                    if (!self.isEmpty(elementDescription)) {
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
            if (self.isEmpty(description)) {
                description = element.getTextContent();
            }
            return description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ');
        };


        /**
         * Generate the list of shortcuts of page.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @param {string} textShortcuts The description of container of shortcuts.
         * @returns {hatemile.util.html.HTMLDOMElement} The list of shortcuts of page.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.generateListShortcuts
         */

        generateListShortcuts = function (parser, textShortcuts) {
            var container, list, local, textContainer;
            container = parser.find("#" + ID_CONTAINER_SHORTCUTS).firstResult();
            if (self.isEmpty(container)) {
                local = parser.find('body').firstResult();
                if (!self.isEmpty(local)) {
                    container = parser.createElement('div');
                    container.setAttribute('id', ID_CONTAINER_SHORTCUTS);
                    textContainer = parser.createElement('span');
                    textContainer.setAttribute('id', ID_TEXT_SHORTCUTS);
                    textContainer.appendText(textShortcuts);
                    container.appendElement(textContainer);
                    local.appendElement(container);
                }
            }
            list = void 0;
            if (!self.isEmpty(container)) {
                list = parser.find(container).findChildren('ul').firstResult();
                if (self.isEmpty(list)) {
                    list = parser.createElement('ul');
                    container.appendElement(list);
                }
            }
            return list;
        };


        /**
         * Insert a element before other element.
         * @param {hatemile.util.html.HTMLDOMElement} element The reference element.
         * @param {hatemile.util.html.HTMLDOMElement} insertedElement The element that
         * be inserted.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.insertBefore
         */

        insertBefore = function (element, insertedElement, parser) {
            var body, controls, i, label, labels, len, tagName, tags;
            tagName = element.getTagName();
            tags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH'];
            controls = ['INPUT', 'SELECT', 'TEXTAREA'];
            if (tagName === 'HTML') {
                body = parser.find('body').firstResult();
                if (!self.isEmpty(body)) {
                    insertBefore(body, insertedElement, parser);
                }
            } else if (tags.indexOf(tagName) > -1) {
                element.prependElement(insertedElement);
            } else if (controls.indexOf(tagName) > -1) {
                if (element.hasAttribute('id')) {
                    labels = parser.find("label[for=\"" + (element.getAttribute('id')) + "\"]").listResults();
                }
                if (self.isEmpty(labels)) {
                    labels = parser.find(element).findAncestors('label').listResults();
                }
                for (i = 0, len = labels.length; i < len; i++) {
                    label = labels[i];
                    insertBefore(label, insertedElement, parser);
                }
            } else {
                element.insertBefore(insertedElement);
            }
        };


        /**
         * Insert a element after other element.
         * @param {hatemile.util.html.HTMLDOMElement} element The reference element.
         * @param {hatemile.util.html.HTMLDOMElement} insertedElement The element that
         * be inserted.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.insertAfter
         */

        insertAfter = function (element, insertedElement, parser) {
            var appendTags, body, controls, i, label, labels, len, tagName;
            tagName = element.getTagName();
            appendTags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH'];
            controls = ['INPUT', 'SELECT', 'TEXTAREA'];
            if (tagName === 'HTML') {
                body = parser.find('body').firstResult();
                if (!self.isEmpty(body)) {
                    insertAfter(body, insertedElement, parser);
                }
            } else if (appendTags.indexOf(tagName) > -1) {
                element.appendElement(insertedElement);
            } else if (controls.indexOf(tagName) > -1) {
                if (element.hasAttribute('id')) {
                    labels = parser.find("label[for=\"" + (element.getAttribute('id')) + "\"]").listResults();
                }
                if (self.isEmpty(labels)) {
                    labels = parser.find(element).findAncestors('label').listResults();
                }
                for (i = 0, len = labels.length; i < len; i++) {
                    label = labels[i];
                    insertAfter(label, insertedElement, parser);
                }
            } else {
                element.insertAfter(insertedElement);
            }
        };


        /**
         * Force the screen reader display an information of element.
         * @param {hatemile.util.html.HTMLDOMElement} element The reference element.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @param {string} prefixId The prefix of generated ids.
         * @param {string} textBefore The text content to show before the element.
         * @param {string} textAfter The text content to show after the element.
         * @param {string} dataBeforeOf The name of attribute that links the before
         * content with element.
         * @param {string} dataAfterOf The name of attribute that links the after
         * content with element.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.forceReadSimple
         */

        forceReadSimple = function (element, parser, prefixId, textBefore, textAfter, dataBeforeOf, dataAfterOf) {
            var identifier, referenceAfter, referenceBefore, span;
            self.hatemile.util.CommonFunctions.generateId(element, prefixId);
            identifier = element.getAttribute('id');
            if (!self.isEmpty(textBefore)) {
                referenceBefore = parser.find("." + CLASS_FORCE_READ_BEFORE + "[" + dataBeforeOf + "=\"" + identifier + "\"]").firstResult();
                if (!self.isEmpty(referenceBefore)) {
                    referenceBefore.removeNode();
                    referenceBefore = void 0;
                }
                span = parser.createElement('span');
                span.setAttribute('class', CLASS_FORCE_READ_BEFORE);
                span.setAttribute(dataBeforeOf, identifier);
                span.appendText(textBefore);
                insertBefore(element, span, parser);
            }
            if (!self.isEmpty(textAfter)) {
                referenceAfter = parser.find("." + CLASS_FORCE_READ_AFTER + "[" + dataAfterOf + "=\"" + identifier + "\"]").firstResult();
                if (!self.isEmpty(referenceAfter)) {
                    referenceAfter.removeNode();
                    referenceAfter = void 0;
                }
                span = parser.createElement('span');
                span.setAttribute('class', CLASS_FORCE_READ_AFTER);
                span.setAttribute(dataAfterOf, identifier);
                span.appendText(textAfter);
                insertAfter(element, span, parser);
            }
        };


        /**
         * Force the screen reader display an information of element with prefixes or
         * suffixes.
         * @param {hatemile.util.html.HTMLDOMElement} element The reference element.
         * @param {string} value The value to be show.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @param {string} prefixId The prefix of generated ids.
         * @param {string} textPrefixBefore The prefix of value to show before the
         * element.
         * @param {string} textSuffixBefore The suffix of value to show before the
         * element.
         * @param {string} textPrefixAfter The prefix of value to show after the
         * element.
         * @param {string} textSuffixAfter The suffix of value to show after the
         * element.
         * @param {string} dataBeforeOf The name of attribute that links the before
         * content with element.
         * @param {string} dataAfterOf The name of attribute that links the after
         * content with element.
         * @private
         * @function hatemile.implementation.AccessibleDisplayScreenReaderImplementation.forceRead
         */

        forceRead = function (element, value, parser, prefixId, textPrefixBefore, textSuffixBefore, textPrefixAfter, textSuffixAfter, dataBeforeOf, dataAfterOf) {
            var textAfter, textBefore;
            if ((!self.isEmpty(textPrefixBefore)) || (!self.isEmpty(textSuffixBefore))) {
                textBefore = "" + textPrefixBefore + value + textSuffixBefore;
            } else {
                textBefore = '';
            }
            if ((!self.isEmpty(textPrefixAfter)) || (!self.isEmpty(textSuffixAfter))) {
                textAfter = "" + textPrefixAfter + value + textSuffixAfter;
            } else {
                textAfter = '';
            }
            forceReadSimple(element, parser, prefixId, textBefore, textAfter, dataBeforeOf, dataAfterOf);
        };


        /**
         * Initializes a new object that manipulate the display for screen readers of
         * parser.
         * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
         * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
         * @param {string} userAgent The user agent of browser.
         * @class The AccessibleDisplayScreenReaderImplementation class is official
         * implementation of AccessibleDisplay interface for screen readers.
         * @implements {hatemile.AccessibleDisplay}
         * @constructs hatemile.implementation.AccessibleDisplayScreenReaderImplementation
         */

        function AccessibleDisplayScreenReaderImplementation(parser1, configure, userAgent) {
            this.parser = parser1;
            this.listShortcutsAdded = false;
            this.listShortcuts = void 0;
            this.prefixId = configure.getParameter('prefix-generated-ids');
            this.attributeTitlePrefixBefore = configure.getParameter('attribute-title-prefix-before');
            this.attributeTitleSuffixBefore = configure.getParameter('attribute-title-suffix-before');
            this.attributeTitlePrefixAfter = configure.getParameter('attribute-title-prefix-after');
            this.attributeTitleSuffixAfter = configure.getParameter('attribute-title-suffix-after');
            this.attributeAccesskeyDefault = configure.getParameter('attribute-accesskey-default');
            this.attributeAccesskeyPrefixBefore = configure.getParameter('attribute-accesskey-prefix-before');
            this.attributeAccesskeySuffixBefore = configure.getParameter('attribute-accesskey-suffix-before');
            this.attributeAccesskeyPrefixAfter = configure.getParameter('attribute-accesskey-prefix-after');
            this.attributeAccesskeySuffixAfter = configure.getParameter('attribute-accesskey-suffix-after');
            this.attributeTargetBlankBefore = configure.getParameter('attribute-target-blank-before');
            this.attributeTargetBlankAfter = configure.getParameter('attribute-target-blank-after');
            this.attributeDownloadBefore = configure.getParameter('attribute-download-before');
            this.attributeDownloadAfter = configure.getParameter('attribute-download-after');
            this.attributeDraggableBefore = configure.getParameter('attribute-draggable-before');
            this.attributeDraggableAfter = configure.getParameter('attribute-draggable-after');
            this.attributeDropzoneCopyBefore = configure.getParameter('attribute-dropzone-copy-before');
            this.attributeDropzoneCopyAfter = configure.getParameter('attribute-dropzone-copy-after');
            this.attributeDropzoneMoveBefore = configure.getParameter('attribute-dropzone-move-before');
            this.attributeDropzoneMoveAfter = configure.getParameter('attribute-dropzone-move-after');
            this.attributeDropzoneLinkBefore = configure.getParameter('attribute-dropzone-link-before');
            this.attributeDropzoneLinkAfter = configure.getParameter('attribute-dropzone-link-after');
            this.attributeHeadersPrefixBefore = configure.getParameter('attribute-headers-prefix-before');
            this.attributeHeadersSuffixBefore = configure.getParameter('attribute-headers-suffix-before');
            this.attributeHeadersPrefixAfter = configure.getParameter('attribute-headers-prefix-after');
            this.attributeHeadersSuffixAfter = configure.getParameter('attribute-headers-suffix-after');
            this.attributeLanguagePrefixBefore = configure.getParameter('attribute-language-prefix-before');
            this.attributeLanguageSuffixBefore = configure.getParameter('attribute-language-suffix-before');
            this.attributeLanguagePrefixAfter = configure.getParameter('attribute-language-prefix-after');
            this.attributeLanguageSuffixAfter = configure.getParameter('attribute-language-suffix-after');
            this.attributeRolePrefixBefore = configure.getParameter('attribute-role-prefix-before');
            this.attributeRoleSuffixBefore = configure.getParameter('attribute-role-suffix-before');
            this.attributeRolePrefixAfter = configure.getParameter('attribute-role-prefix-after');
            this.attributeRoleSuffixAfter = configure.getParameter('attribute-role-suffix-after');
            this.ariaAutoCompleteBothBefore = configure.getParameter('aria-autocomplete-both-before');
            this.ariaAutoCompleteBothAfter = configure.getParameter('aria-autocomplete-both-after');
            this.ariaAutoCompleteInlineBefore = configure.getParameter('aria-autocomplete-inline-before');
            this.ariaAutoCompleteInlineAfter = configure.getParameter('aria-autocomplete-inline-after');
            this.ariaAutoCompleteListBefore = configure.getParameter('aria-autocomplete-list-before');
            this.ariaAutoCompleteListAfter = configure.getParameter('aria-autocomplete-list-after');
            this.ariaBusyTrueBefore = configure.getParameter('aria-busy-true-before');
            this.ariaBusyTrueAfter = configure.getParameter('aria-busy-true-after');
            this.ariaCheckedFalseBefore = configure.getParameter('aria-checked-false-before');
            this.ariaCheckedFalseAfter = configure.getParameter('aria-checked-false-after');
            this.ariaCheckedMixedBefore = configure.getParameter('aria-checked-mixed-before');
            this.ariaCheckedMixedAfter = configure.getParameter('aria-checked-mixed-after');
            this.ariaCheckedTrueBefore = configure.getParameter('aria-checked-true-before');
            this.ariaCheckedTrueAfter = configure.getParameter('aria-checked-true-after');
            this.ariaDropeffectCopyBefore = configure.getParameter('aria-dropeffect-copy-before');
            this.ariaDropeffectCopyAfter = configure.getParameter('aria-dropeffect-copy-after');
            this.ariaDropeffectExecuteBefore = configure.getParameter('aria-dropeffect-execute-before');
            this.ariaDropeffectExecuteAfter = configure.getParameter('aria-dropeffect-execute-after');
            this.ariaDropeffectLinkBefore = configure.getParameter('aria-dropeffect-link-before');
            this.ariaDropeffectLinkAfter = configure.getParameter('aria-dropeffect-link-after');
            this.ariaDropeffectMoveBefore = configure.getParameter('aria-dropeffect-move-before');
            this.ariaDropeffectMoveAfter = configure.getParameter('aria-dropeffect-move-after');
            this.ariaDropeffectPopupBefore = configure.getParameter('aria-dropeffect-popup-before');
            this.ariaDropeffectPopupAfter = configure.getParameter('aria-dropeffect-popup-after');
            this.ariaExpandedFalseBefore = configure.getParameter('aria-expanded-false-before');
            this.ariaExpandedFalseAfter = configure.getParameter('aria-expanded-false-after');
            this.ariaExpandedTrueBefore = configure.getParameter('aria-expanded-true-before');
            this.ariaExpandedTrueAfter = configure.getParameter('aria-expanded-true-after');
            this.ariaGrabbedFalseBefore = configure.getParameter('aria-grabbed-false-before');
            this.ariaGrabbedFalseAfter = configure.getParameter('aria-grabbed-false-after');
            this.ariaGrabbedTrueBefore = configure.getParameter('aria-grabbed-true-before');
            this.ariaGrabbedTrueAfter = configure.getParameter('aria-grabbed-true-after');
            this.ariaHaspopupTrueBefore = configure.getParameter('aria-haspopup-true-before');
            this.ariaHaspopupTrueAfter = configure.getParameter('aria-haspopup-true-after');
            this.ariaInvalidTrueBefore = configure.getParameter('aria-invalid-true-before');
            this.ariaInvalidTrueAfter = configure.getParameter('aria-invalid-true-after');
            this.ariaLevelPrefixBefore = configure.getParameter('aria-level-prefix-before');
            this.ariaLevelSuffixBefore = configure.getParameter('aria-level-suffix-before');
            this.ariaLevelPrefixAfter = configure.getParameter('aria-level-prefix-after');
            this.ariaLevelSuffixAfter = configure.getParameter('aria-level-suffix-after');
            this.ariaValueMaximumPrefixBefore = configure.getParameter('aria-value-maximum-prefix-before');
            this.ariaValueMaximumSuffixBefore = configure.getParameter('aria-value-maximum-suffix-before');
            this.ariaValueMaximumPrefixAfter = configure.getParameter('aria-value-maximum-prefix-after');
            this.ariaValueMaximumSuffixAfter = configure.getParameter('aria-value-maximum-suffix-after');
            this.ariaValueMinimumPrefixBefore = configure.getParameter('aria-value-minimum-prefix-before');
            this.ariaValueMinimumSuffixBefore = configure.getParameter('aria-value-minimum-suffix-before');
            this.ariaValueMinimumPrefixAfter = configure.getParameter('aria-value-minimum-prefix-after');
            this.ariaValueMinimumSuffixAfter = configure.getParameter('aria-value-minimum-suffix-after');
            this.ariaOrientationHorizontalBefore = configure.getParameter('aria-orientation-horizontal-before');
            this.ariaOrientationHorizontalAfter = configure.getParameter('aria-orientation-horizontal-after');
            this.ariaOrientationVerticalBefore = configure.getParameter('aria-orientation-vertical-before');
            this.ariaOrientationVerticalAfter = configure.getParameter('aria-orientation-vertical-after');
            this.ariaPressedFalseBefore = configure.getParameter('aria-pressed-false-before');
            this.ariaPressedFalseAfter = configure.getParameter('aria-pressed-false-after');
            this.ariaPressedMixedBefore = configure.getParameter('aria-pressed-mixed-before');
            this.ariaPressedMixedAfter = configure.getParameter('aria-pressed-mixed-after');
            this.ariaPressedTrueBefore = configure.getParameter('aria-pressed-true-before');
            this.ariaPressedTrueAfter = configure.getParameter('aria-pressed-true-after');
            this.ariaRequiredTrueBefore = configure.getParameter('aria-required-true-before');
            this.ariaRequiredTrueAfter = configure.getParameter('aria-required-true-after');
            this.ariaSelectedFalseBefore = configure.getParameter('aria-selected-false-before');
            this.ariaSelectedFalseAfter = configure.getParameter('aria-selected-false-after');
            this.ariaSelectedTrueBefore = configure.getParameter('aria-selected-true-before');
            this.ariaSelectedTrueAfter = configure.getParameter('aria-selected-true-after');
            this.ariaSortAscendingBefore = configure.getParameter('aria-sort-ascending-before');
            this.ariaSortAscendingAfter = configure.getParameter('aria-sort-ascending-after');
            this.ariaSortDescendingBefore = configure.getParameter('aria-sort-descending-before');
            this.ariaSortDescendingAfter = configure.getParameter('aria-sort-descending-after');
            this.ariaSortOtherBefore = configure.getParameter('aria-sort-other-before');
            this.ariaSortOtherAfter = configure.getParameter('aria-sort-other-after');
            this.dataInvalidUrlBefore = configure.getParameter('attribute-data-invalid-url-before');
            this.dataInvalidUrlAfter = configure.getParameter('attribute-data-invalid-url-after');
            this.dataInvalidEmailBefore = configure.getParameter('attribute-data-invalid-email-before');
            this.dataInvalidEmailAfter = configure.getParameter('attribute-data-invalid-email-after');
            this.dataInvalidRangeBefore = configure.getParameter('attribute-data-invalid-range-before');
            this.dataInvalidRangeAfter = configure.getParameter('attribute-data-invalid-range-after');
            this.dataInvalidLengthBefore = configure.getParameter('attribute-data-invalid-length-before');
            this.dataInvalidLengthAfter = configure.getParameter('attribute-data-invalid-length-after');
            this.dataInvalidPatternBefore = configure.getParameter('attribute-data-invalid-pattern-before');
            this.dataInvalidPatternAfter = configure.getParameter('attribute-data-invalid-pattern-after');
            this.dataInvalidRequiredBefore = configure.getParameter('attribute-data-invalid-required-before');
            this.dataInvalidRequiredAfter = configure.getParameter('attribute-data-invalid-required-after');
            this.dataInvalidDateBefore = configure.getParameter('attribute-data-invalid-date-before');
            this.dataInvalidDateAfter = configure.getParameter('attribute-data-invalid-date-after');
            this.dataInvalidTimeBefore = configure.getParameter('attribute-data-invalid-time-before');
            this.dataInvalidTimeAfter = configure.getParameter('attribute-data-invalid-time-after');
            this.dataInvalidDateTimeBefore = configure.getParameter('attribute-data-invalid-datetime-before');
            this.dataInvalidDateTimeAfter = configure.getParameter('attribute-data-invalid-datetime-after');
            this.dataInvalidMonthBefore = configure.getParameter('attribute-data-invalid-month-before');
            this.dataInvalidMonthAfter = configure.getParameter('attribute-data-invalid-month-after');
            this.dataInvalidWeekBefore = configure.getParameter('attribute-data-invalid-week-before');
            this.dataInvalidWeekAfter = configure.getParameter('attribute-data-invalid-week-after');
            this.roles = {
                'alert': configure.getParameter('role-alert'),
                'alertdialog': configure.getParameter('role-alertdialog'),
                'application': configure.getParameter('role-application'),
                'article': configure.getParameter('role-article'),
                'banner': configure.getParameter('role-banner'),
                'button': configure.getParameter('role-button'),
                'checkbox': configure.getParameter('role-checkbox'),
                'columnheader': configure.getParameter('role-columnheader'),
                'combobox': configure.getParameter('role-combobox'),
                'complementary': configure.getParameter('role-complementary'),
                'contentinfo': configure.getParameter('role-contentinfo'),
                'definition': configure.getParameter('role-definition'),
                'dialog': configure.getParameter('role-dialog'),
                'directory': configure.getParameter('role-directory'),
                'document': configure.getParameter('role-document'),
                'form': configure.getParameter('role-form'),
                'grid': configure.getParameter('role-grid'),
                'gridcell': configure.getParameter('role-gridcell'),
                'group': configure.getParameter('role-group'),
                'heading': configure.getParameter('role-heading'),
                'img': configure.getParameter('role-img'),
                'link': configure.getParameter('role-link'),
                'list': configure.getParameter('role-list'),
                'listbox': configure.getParameter('role-listbox'),
                'listitem': configure.getParameter('role-listitem'),
                'log': configure.getParameter('role-log'),
                'main': configure.getParameter('role-main'),
                'marquee': configure.getParameter('role-marquee'),
                'math': configure.getParameter('role-math'),
                'menu': configure.getParameter('role-menu'),
                'menubar': configure.getParameter('role-menubar'),
                'menuitem': configure.getParameter('role-menuitem'),
                'menuitemcheckbox': configure.getParameter('role-menuitemcheckbox'),
                'menuitemradio': configure.getParameter('role-menuitemradio'),
                'navigation': configure.getParameter('role-navigation'),
                'note': configure.getParameter('role-note'),
                'option': configure.getParameter('role-option'),
                'presentation': configure.getParameter('role-presentation'),
                'progressbar': configure.getParameter('role-progressbar'),
                'radio': configure.getParameter('role-radio'),
                'radiogroup': configure.getParameter('role-radiogroup'),
                'region': configure.getParameter('role-region'),
                'row': configure.getParameter('role-row'),
                'rowgroup': configure.getParameter('role-rowgroup'),
                'rowheader': configure.getParameter('role-rowheader'),
                'scrollbar': configure.getParameter('role-scrollbar'),
                'search': configure.getParameter('role-search'),
                'separator': configure.getParameter('role-separator'),
                'slider': configure.getParameter('role-slider'),
                'spinbutton': configure.getParameter('role-spinbutton'),
                'status': configure.getParameter('role-status'),
                'tab': configure.getParameter('role-tab'),
                'tablist': configure.getParameter('role-tablist'),
                'tabpanel': configure.getParameter('role-tabpanel'),
                'textbox': configure.getParameter('role-textbox'),
                'timer': configure.getParameter('role-timer'),
                'toolbar': configure.getParameter('role-toolbar'),
                'tooltip': configure.getParameter('role-tooltip'),
                'tree': configure.getParameter('role-tree'),
                'treegrid': configure.getParameter('role-treegrid'),
                'treeitem': configure.getParameter('role-treeitem')
            };
            this.languages = {
                'aa': configure.getParameter('language-aa'),
                'ab': configure.getParameter('language-ab'),
                'ae': configure.getParameter('language-ae'),
                'af': configure.getParameter('language-af'),
                'ak': configure.getParameter('language-ak'),
                'am': configure.getParameter('language-am'),
                'an': configure.getParameter('language-an'),
                'ar': configure.getParameter('language-ar'),
                'as': configure.getParameter('language-as'),
                'av': configure.getParameter('language-av'),
                'ay': configure.getParameter('language-ay'),
                'az': configure.getParameter('language-az'),
                'ba': configure.getParameter('language-ba'),
                'be': configure.getParameter('language-be'),
                'bg': configure.getParameter('language-bg'),
                'bh': configure.getParameter('language-bh'),
                'bi': configure.getParameter('language-bi'),
                'bm': configure.getParameter('language-bm'),
                'bn': configure.getParameter('language-bn'),
                'bo': configure.getParameter('language-bo'),
                'br': configure.getParameter('language-br'),
                'bs': configure.getParameter('language-bs'),
                'ca': configure.getParameter('language-ca'),
                'ce': configure.getParameter('language-ce'),
                'ch': configure.getParameter('language-ch'),
                'co': configure.getParameter('language-co'),
                'cr': configure.getParameter('language-cr'),
                'cs': configure.getParameter('language-cs'),
                'cu': configure.getParameter('language-cu'),
                'cv': configure.getParameter('language-cv'),
                'cy': configure.getParameter('language-cy'),
                'da': configure.getParameter('language-da'),
                'de': configure.getParameter('language-de'),
                'dv': configure.getParameter('language-dv'),
                'dz': configure.getParameter('language-dz'),
                'ee': configure.getParameter('language-ee'),
                'el': configure.getParameter('language-el'),
                'en': configure.getParameter('language-en'),
                'eo': configure.getParameter('language-eo'),
                'es': configure.getParameter('language-es'),
                'et': configure.getParameter('language-et'),
                'eu': configure.getParameter('language-eu'),
                'fa': configure.getParameter('language-fa'),
                'ff': configure.getParameter('language-ff'),
                'fi': configure.getParameter('language-fi'),
                'fj': configure.getParameter('language-fj'),
                'fo': configure.getParameter('language-fo'),
                'fr': configure.getParameter('language-fr'),
                'fy': configure.getParameter('language-fy'),
                'ga': configure.getParameter('language-ga'),
                'gd': configure.getParameter('language-gd'),
                'gl': configure.getParameter('language-gl'),
                'gn': configure.getParameter('language-gn'),
                'gu': configure.getParameter('language-gu'),
                'gv': configure.getParameter('language-gv'),
                'ha': configure.getParameter('language-ha'),
                'he': configure.getParameter('language-he'),
                'hi': configure.getParameter('language-hi'),
                'ho': configure.getParameter('language-ho'),
                'hr': configure.getParameter('language-hr'),
                'ht': configure.getParameter('language-ht'),
                'hu': configure.getParameter('language-hu'),
                'hy': configure.getParameter('language-hy'),
                'hz': configure.getParameter('language-hz'),
                'ia': configure.getParameter('language-ia'),
                'id': configure.getParameter('language-id'),
                'ie': configure.getParameter('language-ie'),
                'ig': configure.getParameter('language-ig'),
                'ii': configure.getParameter('language-ii'),
                'ik': configure.getParameter('language-ik'),
                'io': configure.getParameter('language-io'),
                'is': configure.getParameter('language-is'),
                'it': configure.getParameter('language-it'),
                'iu': configure.getParameter('language-iu'),
                'ja': configure.getParameter('language-ja'),
                'jv': configure.getParameter('language-jv'),
                'ka': configure.getParameter('language-ka'),
                'kg': configure.getParameter('language-kg'),
                'ki': configure.getParameter('language-ki'),
                'kj': configure.getParameter('language-kj'),
                'kk': configure.getParameter('language-kk'),
                'kl': configure.getParameter('language-kl'),
                'km': configure.getParameter('language-km'),
                'kn': configure.getParameter('language-kn'),
                'ko': configure.getParameter('language-ko'),
                'kr': configure.getParameter('language-kr'),
                'ks': configure.getParameter('language-ks'),
                'ku': configure.getParameter('language-ku'),
                'kv': configure.getParameter('language-kv'),
                'kw': configure.getParameter('language-kw'),
                'ky': configure.getParameter('language-ky'),
                'la': configure.getParameter('language-la'),
                'lb': configure.getParameter('language-lb'),
                'lg': configure.getParameter('language-lg'),
                'li': configure.getParameter('language-li'),
                'ln': configure.getParameter('language-ln'),
                'lo': configure.getParameter('language-lo'),
                'lt': configure.getParameter('language-lt'),
                'lu': configure.getParameter('language-lu'),
                'lv': configure.getParameter('language-lv'),
                'mg': configure.getParameter('language-mg'),
                'mh': configure.getParameter('language-mh'),
                'mi': configure.getParameter('language-mi'),
                'mk': configure.getParameter('language-mk'),
                'ml': configure.getParameter('language-ml'),
                'mn': configure.getParameter('language-mn'),
                'mr': configure.getParameter('language-mr'),
                'ms': configure.getParameter('language-ms'),
                'mt': configure.getParameter('language-mt'),
                'my': configure.getParameter('language-my'),
                'na': configure.getParameter('language-na'),
                'nb': configure.getParameter('language-nb'),
                'nd': configure.getParameter('language-nd'),
                'ne': configure.getParameter('language-ne'),
                'ng': configure.getParameter('language-ng'),
                'nl': configure.getParameter('language-nl'),
                'nn': configure.getParameter('language-nn'),
                'no': configure.getParameter('language-no'),
                'nr': configure.getParameter('language-nr'),
                'nv': configure.getParameter('language-nv'),
                'ny': configure.getParameter('language-ny'),
                'oc': configure.getParameter('language-oc'),
                'oj': configure.getParameter('language-oj'),
                'om': configure.getParameter('language-om'),
                'or': configure.getParameter('language-or'),
                'os': configure.getParameter('language-os'),
                'pa': configure.getParameter('language-pa'),
                'pi': configure.getParameter('language-pi'),
                'pl': configure.getParameter('language-pl'),
                'ps': configure.getParameter('language-ps'),
                'pt': configure.getParameter('language-pt'),
                'qu': configure.getParameter('language-qu'),
                'rm': configure.getParameter('language-rm'),
                'rn': configure.getParameter('language-rn'),
                'ro': configure.getParameter('language-ro'),
                'ru': configure.getParameter('language-ru'),
                'rw': configure.getParameter('language-rw'),
                'sa': configure.getParameter('language-sa'),
                'sc': configure.getParameter('language-sc'),
                'sd': configure.getParameter('language-sd'),
                'se': configure.getParameter('language-se'),
                'sg': configure.getParameter('language-sg'),
                'si': configure.getParameter('language-si'),
                'sk': configure.getParameter('language-sk'),
                'sl': configure.getParameter('language-sl'),
                'sm': configure.getParameter('language-sm'),
                'sn': configure.getParameter('language-sn'),
                'so': configure.getParameter('language-so'),
                'sq': configure.getParameter('language-sq'),
                'sr': configure.getParameter('language-sr'),
                'ss': configure.getParameter('language-ss'),
                'st': configure.getParameter('language-st'),
                'su': configure.getParameter('language-su'),
                'sv': configure.getParameter('language-sv'),
                'sw': configure.getParameter('language-sw'),
                'ta': configure.getParameter('language-ta'),
                'te': configure.getParameter('language-te'),
                'tg': configure.getParameter('language-tg'),
                'th': configure.getParameter('language-th'),
                'ti': configure.getParameter('language-ti'),
                'tk': configure.getParameter('language-tk'),
                'tl': configure.getParameter('language-tl'),
                'tn': configure.getParameter('language-tn'),
                'to': configure.getParameter('language-to'),
                'tr': configure.getParameter('language-tr'),
                'ts': configure.getParameter('language-ts'),
                'tt': configure.getParameter('language-tt'),
                'tw': configure.getParameter('language-tw'),
                'ty': configure.getParameter('language-ty'),
                'ug': configure.getParameter('language-ug'),
                'uk': configure.getParameter('language-uk'),
                'ur': configure.getParameter('language-ur'),
                'uz': configure.getParameter('language-uz'),
                've': configure.getParameter('language-ve'),
                'vi': configure.getParameter('language-vi'),
                'vo': configure.getParameter('language-vo'),
                'wa': configure.getParameter('language-wa'),
                'wo': configure.getParameter('language-wo'),
                'xh': configure.getParameter('language-xh'),
                'yi': configure.getParameter('language-yi'),
                'yo': configure.getParameter('language-yo'),
                'za': configure.getParameter('language-za'),
                'zh': configure.getParameter('language-zh'),
                'zu': configure.getParameter('language-zu')
            };
            this.shortcutPrefix = getShortcutPrefix(userAgent, this.attributeAccesskeyDefault);
        }

        AccessibleDisplayScreenReaderImplementation.prototype.displayShortcut = function (element) {
            var description, i, item, key, keys, len;
            if (element.hasAttribute('accesskey')) {
                description = getDescription(element, this.parser);
                if (!element.hasAttribute('title')) {
                    element.setAttribute('title', description);
                }
                if (!this.listShortcutsAdded) {
                    this.listShortcuts = generateListShortcuts(this.parser, "" + this.attributeAccesskeyPrefixBefore + this.attributeAccesskeySuffixBefore);
                    this.listShortcutsAdded = true;
                }
                if (!self.isEmpty(this.listShortcuts)) {
                    keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'));
                    for (i = 0, len = keys.length; i < len; i++) {
                        key = keys[i];
                        key = key.toUpperCase();
                        if (self.isEmpty(this.parser.find(this.listShortcuts).findChildren("[" + DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF + "=\"" + key + "\"]").firstResult())) {
                            item = this.parser.createElement('li');
                            item.setAttribute(DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF, key);
                            item.setAttribute(DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF, key);
                            item.appendText(this.shortcutPrefix + " + " + key + ": " + description);
                            this.listShortcuts.appendElement(item);
                        }
                    }
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllShortcuts = function () {
            var element, elements, i, len;
            elements = this.parser.find('[accesskey]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayShortcut(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayRole = function (element) {
            var role, roleDescription;
            if (element.hasAttribute('role')) {
                role = element.getAttribute('role');
                roleDescription = this.roles[role];
                if (!self.isEmpty(roleDescription)) {
                    forceRead(element, roleDescription, this.parser, this.prefixId, this.attributeRolePrefixBefore, this.attributeRoleSuffixBefore, this.attributeRolePrefixAfter, this.attributeRoleSuffixAfter, DATA_ROLE_BEFORE_OF, DATA_ROLE_AFTER_OF);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllRoles = function () {
            var element, elements, i, len;
            elements = this.parser.find('[role]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayRole(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayCellHeader = function (tableCell) {
            var header, i, idHeader, idsHeaders, len, textHeader;
            if (tableCell.hasAttribute('headers')) {
                textHeader = void 0;
                idsHeaders = tableCell.getAttribute('headers').split(new RegExp('[ \n\t\r]+'));
                for (i = 0, len = idsHeaders.length; i < len; i++) {
                    idHeader = idsHeaders[i];
                    header = this.parser.find("#" + idHeader).firstResult();
                    if (!self.isEmpty(header)) {
                        if (textHeader === void 0) {
                            textHeader = header.getTextContent();
                        } else {
                            textHeader = textHeader + " " + (header.getTextContent());
                        }
                    }
                }
                if (!self.isEmpty(textHeader)) {
                    forceRead(tableCell, textHeader, this.parser, this.prefixId, this.attributeHeadersPrefixBefore, this.attributeHeadersSuffixBefore, this.attributeHeadersPrefixAfter, this.attributeHeadersSuffixAfter, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, DATA_ATTRIBUTE_HEADERS_AFTER_OF);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllCellHeaders = function () {
            var element, elements, i, len;
            elements = this.parser.find('td[headers],th[headers]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayCellHeader(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayWAIARIAStates = function (element) {
            var attributeValue;
            if ((element.hasAttribute('aria-busy')) && (element.getAttribute('aria-busy') === 'true')) {
                forceReadSimple(element, this.parser, this.prefixId, this.ariaBusyTrueBefore, this.ariaBusyTrueAfter, DATA_ARIA_BUSY_BEFORE_OF, DATA_ARIA_BUSY_AFTER_OF);
            }
            if (element.hasAttribute('aria-checked')) {
                attributeValue = element.getAttribute('aria-checked');
                if (attributeValue === 'true') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaCheckedTrueBefore, this.ariaCheckedTrueAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaCheckedFalseBefore, this.ariaCheckedFalseAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF);
                } else if (attributeValue === 'mixed') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaCheckedMixedBefore, this.ariaCheckedMixedAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-dropeffect')) {
                attributeValue = element.getAttribute('aria-dropeffect');
                if (attributeValue === 'copy') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectCopyBefore, this.ariaDropeffectCopyAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'move') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectMoveBefore, this.ariaDropeffectMoveAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'link') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectLinkBefore, this.ariaDropeffectLinkAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'execute') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectExecuteBefore, this.ariaDropeffectExecuteAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'popup') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectPopupBefore, this.ariaDropeffectPopupAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-expanded')) {
                attributeValue = element.getAttribute('aria-expanded');
                if (attributeValue === 'true') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaExpandedTrueBefore, this.ariaExpandedTrueAfter, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaExpandedFalseBefore, this.ariaExpandedFalseAfter, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-grabbed')) {
                attributeValue = element.getAttribute('aria-grabbed');
                if (attributeValue === 'true') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedTrueBefore, this.ariaGrabbedTrueAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedFalseBefore, this.ariaGrabbedFalseAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF);
                }
            }
            if ((element.hasAttribute('aria-haspopup')) && (element.getAttribute('aria-haspopup') === 'true')) {
                forceReadSimple(element, this.parser, this.prefixId, this.ariaHaspopupTrueBefore, this.ariaHaspopupTrueAfter, DATA_ARIA_HASPOPUP_BEFORE_OF, DATA_ARIA_HASPOPUP_AFTER_OF);
            }
            if ((element.hasAttribute('aria-invalid')) && (element.getAttribute('aria-invalid') === 'true')) {
                forceReadSimple(element, this.parser, this.prefixId, this.ariaInvalidTrueBefore, this.ariaInvalidTrueAfter, DATA_ARIA_INVALID_BEFORE_OF, DATA_ARIA_INVALID_AFTER_OF);
                if (element.hasAttribute(DATA_INVALID_LENGTH)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidLengthBefore, this.dataInvalidLengthAfter, DATA_INVALID_LENGTH_BEFORE_OF, DATA_INVALID_LENGTH_AFTER_OF);
                }
                if (element.hasAttribute(DATA_INVALID_PATTERN)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidPatternBefore, this.dataInvalidPatternAfter, DATA_INVALID_PATTERN_BEFORE_OF, DATA_INVALID_PATTERN_AFTER_OF);
                }
                if (element.hasAttribute(DATA_INVALID_REQUIRED)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidRequiredBefore, this.dataInvalidRequiredAfter, DATA_INVALID_REQUIRED_BEFORE_OF, DATA_INVALID_REQUIRED_AFTER_OF);
                }
                if (element.hasAttribute(DATA_INVALID_URL)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidUrlBefore, this.dataInvalidUrlAfter, DATA_INVALID_URL_BEFORE_OF, DATA_INVALID_URL_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_EMAIL)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidEmailBefore, this.dataInvalidEmailAfter, DATA_INVALID_EMAIL_BEFORE_OF, DATA_INVALID_EMAIL_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_RANGE)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidRangeBefore, this.dataInvalidRangeAfter, DATA_INVALID_RANGE_BEFORE_OF, DATA_INVALID_RANGE_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_DATE)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidDateBefore, this.dataInvalidDateAfter, DATA_INVALID_DATE_BEFORE_OF, DATA_INVALID_DATE_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_TIME)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidTimeBefore, this.dataInvalidTimeAfter, DATA_INVALID_TIME_BEFORE_OF, DATA_INVALID_TIME_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_DATETIME)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidDateTimeBefore, this.dataInvalidDateTimeAfter, DATA_INVALID_DATETIME_BEFORE_OF, DATA_INVALID_DATETIME_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_MONTH)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidMonthBefore, this.dataInvalidMonthAfter, DATA_INVALID_MONTH_BEFORE_OF, DATA_INVALID_MONTH_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_WEEK)) {
                    forceReadSimple(element, this.parser, this.prefixId, this.dataInvalidWeekBefore, this.dataInvalidWeekAfter, DATA_INVALID_WEEK_BEFORE_OF, DATA_INVALID_WEEK_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-level')) {
                forceRead(element, element.getAttribute('aria-level'), this.parser, this.prefixId, this.ariaLevelPrefixBefore, this.ariaLevelSuffixBefore, this.ariaLevelPrefixAfter, this.ariaLevelSuffixAfter, DATA_ARIA_LEVEL_BEFORE_OF, DATA_ARIA_LEVEL_AFTER_OF);
            }
            if (element.hasAttribute('aria-orientation')) {
                attributeValue = element.getAttribute('aria-orientation');
                if (attributeValue === 'vertical') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaOrientationVerticalBefore, this.ariaOrientationVerticalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF);
                } else if (attributeValue === 'horizontal') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaOrientationHorizontalBefore, this.ariaOrientationHorizontalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-pressed')) {
                attributeValue = element.getAttribute('aria-pressed');
                if (attributeValue === 'true') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaPressedTrueBefore, this.ariaPressedTrueAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaPressedFalseBefore, this.ariaPressedFalseAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF);
                } else if (attributeValue === 'mixed') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaPressedMixedBefore, this.ariaPressedMixedAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-selected')) {
                attributeValue = element.getAttribute('aria-selected');
                if (attributeValue === 'true') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaSelectedTrueBefore, this.ariaSelectedTrueAfter, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaSelectedFalseBefore, this.ariaSelectedFalseAfter, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-sort')) {
                attributeValue = element.getAttribute('aria-sort');
                if (attributeValue === 'ascending') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaSortAscendingBefore, this.ariaSortAscendingAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF);
                } else if (attributeValue === 'descending') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaSortDescendingBefore, this.ariaSortDescendingAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF);
                } else if (attributeValue === 'other') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaSortOtherBefore, this.ariaSortOtherAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF);
                }
            }
            if ((element.hasAttribute('aria-required')) && (element.getAttribute('aria-required') === 'true')) {
                forceReadSimple(element, this.parser, this.prefixId, this.ariaRequiredTrueBefore, this.ariaRequiredTrueAfter, DATA_ATTRIBUTE_REQUIRED_BEFORE_OF, DATA_ATTRIBUTE_REQUIRED_AFTER_OF);
            }
            if (element.hasAttribute('aria-valuemin')) {
                forceRead(element, element.getAttribute('aria-valuemin'), this.parser, this.prefixId, this.ariaValueMinimumPrefixBefore, this.ariaValueMinimumSuffixBefore, this.ariaValueMinimumPrefixAfter, this.ariaValueMinimumSuffixAfter, DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF);
            }
            if (element.hasAttribute('aria-valuemax')) {
                forceRead(element, element.getAttribute('aria-valuemax'), this.parser, this.prefixId, this.ariaValueMaximumPrefixBefore, this.ariaValueMaximumSuffixBefore, this.ariaValueMaximumPrefixAfter, this.ariaValueMaximumSuffixAfter, DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF);
            }
            if (element.hasAttribute('aria-autocomplete')) {
                attributeValue = element.getAttribute('aria-autocomplete');
                if (attributeValue === 'both') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaAutoCompleteBothBefore, this.ariaAutoCompleteBothAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF);
                } else if (attributeValue === 'inline') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaAutoCompleteListBefore, this.ariaAutoCompleteListAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF);
                } else if (attributeValue === 'list') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaAutoCompleteInlineBefore, this.ariaAutoCompleteInlineAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllWAIARIAStates = function () {
            var element, elements, i, len;
            elements = this.parser.find('[aria-busy="true"],[aria-checked],[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],[aria-invalid=true],[aria-level],[aria-orientation],[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayWAIARIAStates(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayLinkAttributes = function (link) {
            if (link.hasAttribute('download')) {
                forceReadSimple(link, this.parser, this.prefixId, this.attributeDownloadBefore, this.attributeDownloadAfter, DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF, DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF);
            }
            if ((link.hasAttribute('target')) && (link.getAttribute('target') === '_blank')) {
                forceReadSimple(link, this.parser, this.prefixId, this.attributeTargetBlankBefore, this.attributeTargetBlankAfter, DATA_ATTRIBUTE_TARGET_BEFORE_OF, DATA_ATTRIBUTE_TARGET_AFTER_OF);
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllLinksAttributes = function () {
            var element, elements, i, len;
            elements = this.parser.find('a[download],a[target="_blank"]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayLinkAttributes(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayTitle = function (element) {
            if ((element.hasAttribute('title')) && (!self.isEmpty(element.getAttribute('title')))) {
                forceRead(element, element.getAttribute('title'), this.parser, this.prefixId, this.attributeTitlePrefixBefore, this.attributeTitleSuffixBefore, this.attributeTitlePrefixAfter, this.attributeTitleSuffixAfter, DATA_ATTRIBUTE_TITLE_BEFORE_OF, DATA_ATTRIBUTE_TITLE_AFTER_OF);
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllTitles = function () {
            var element, elements, i, len;
            elements = this.parser.find('body [title]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayTitle(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayDragAndDrop = function (element) {
            var attributeValue;
            if (element.hasAttribute('draggable')) {
                forceReadSimple(element, this.parser, this.prefixId, this.attributeDraggableBefore, this.attributeDraggableAfter, DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF, DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF);
            }
            if (element.hasAttribute('dropzone')) {
                attributeValue = element.getAttribute('dropzone');
                if (attributeValue === 'copy') {
                    forceReadSimple(element, this.parser, this.prefixId, this.attributeDropzoneCopyBefore, this.attributeDropzoneCopyAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF);
                } else if (attributeValue === 'move') {
                    forceReadSimple(element, this.parser, this.prefixId, this.attributeDropzoneMoveBefore, this.attributeDropzoneMoveAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF);
                } else if (attributeValue === 'link') {
                    forceReadSimple(element, this.parser, this.prefixId, this.attributeDropzoneLinkBefore, this.attributeDropzoneLinkAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-dropeffect')) {
                attributeValue = element.getAttribute('aria-dropeffect');
                if (attributeValue === 'copy') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectCopyBefore, this.ariaDropeffectCopyAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'move') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectMoveBefore, this.ariaDropeffectMoveAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'link') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectLinkBefore, this.ariaDropeffectLinkAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'execute') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectExecuteBefore, this.ariaDropeffectExecuteAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'popup') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectPopupBefore, this.ariaDropeffectPopupAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-grabbed')) {
                attributeValue = element.getAttribute('aria-grabbed');
                if (attributeValue === 'true') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedTrueBefore, this.ariaGrabbedTrueAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedFalseBefore, this.ariaGrabbedFalseAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllDragsAndDrops = function () {
            var element, elements, i, len;
            elements = this.parser.find('[draggable],[dropzone],[aria-dropeffect],[aria-grabbed]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayDragAndDrop(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayLanguage = function (element) {
            var language, languageCode;
            if (element.hasAttribute('lang')) {
                languageCode = element.getAttribute('lang');
                language = this.languages[languageCode];
                if (!self.isEmpty(language)) {
                    forceRead(element, language, this.parser, this.prefixId, this.attributeLanguagePrefixBefore, this.attributeLanguageSuffixBefore, this.attributeLanguagePrefixAfter, this.attributeLanguageSuffixAfter, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF);
                }
            } else if (element.hasAttribute('hreflang')) {
                languageCode = element.getAttribute('hreflang');
                language = this.languages[languageCode];
                if (!self.isEmpty(language)) {
                    forceRead(element, language, this.parser, this.prefixId, this.attributeLanguagePrefixBefore, this.attributeLanguageSuffixBefore, this.attributeLanguagePrefixAfter, this.attributeLanguageSuffixAfter, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllLanguages = function () {
            var element, elements, i, len;
            elements = this.parser.find('html[lang],body[lang],body [lang],body [hreflang]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayLanguage(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAlternativeTextImage = function (image) {
            if ((image.hasAttribute('alt')) || (image.hasAttribute('title'))) {
                if ((image.hasAttribute('alt')) && (!image.hasAttribute('title'))) {
                    image.setAttribute('title', image.getAttribute('alt'));
                } else if ((image.hasAttribute('title')) && (!image.hasAttribute('alt'))) {
                    image.setAttribute('alt', image.getAttribute('title'));
                }
                self.hatemile.util.CommonFunctions.generateId(image, this.prefixId);
                image.setAttribute(DATA_ATTRIBUTE_TITLE_BEFORE_OF, image.getAttribute('id'));
                image.setAttribute(DATA_ATTRIBUTE_TITLE_AFTER_OF, image.getAttribute('id'));
            } else {
                image.setAttribute('alt', '');
                image.setAttribute('role', 'presentation');
                image.setAttribute('aria-hidden', 'true');
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllAlternativeTextImages = function () {
            var i, image, images, len;
            images = this.parser.find('img').listResults();
            for (i = 0, len = images.length; i < len; i++) {
                image = images[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(image)) {
                    this.displayAlternativeTextImage(image);
                }
            }
        };

        return AccessibleDisplayScreenReaderImplementation;

    })();

}).call(this);
