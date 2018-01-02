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

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleDisplayScreenReaderImplementation = (function () {
        var CLASS_FORCE_READ_AFTER, CLASS_FORCE_READ_BEFORE, DATA_ARIA_BUSY_AFTER_OF, DATA_ARIA_BUSY_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_HASPOPUP_AFTER_OF, DATA_ARIA_HASPOPUP_BEFORE_OF, DATA_ARIA_INVALID_AFTER_OF, DATA_ARIA_INVALID_BEFORE_OF, DATA_ARIA_LEVEL_AFTER_OF, DATA_ARIA_LEVEL_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF, DATA_ARIA_SORT_BEFORE_OF, DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF, DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF, DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF, DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF, DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_HEADERS_AFTER_OF, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF, DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF, DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF, DATA_ATTRIBUTE_REQUIRED_AFTER_OF, DATA_ATTRIBUTE_REQUIRED_BEFORE_OF, DATA_ATTRIBUTE_TARGET_AFTER_OF, DATA_ATTRIBUTE_TARGET_BEFORE_OF, DATA_ATTRIBUTE_TITLE_AFTER_OF, DATA_ATTRIBUTE_TITLE_BEFORE_OF, DATA_INVALID_DATE, DATA_INVALID_DATETIME, DATA_INVALID_DATETIME_AFTER_OF, DATA_INVALID_DATETIME_BEFORE_OF, DATA_INVALID_DATE_AFTER_OF, DATA_INVALID_DATE_BEFORE_OF, DATA_INVALID_EMAIL, DATA_INVALID_EMAIL_AFTER_OF, DATA_INVALID_EMAIL_BEFORE_OF, DATA_INVALID_LENGTH, DATA_INVALID_LENGTH_AFTER_OF, DATA_INVALID_LENGTH_BEFORE_OF, DATA_INVALID_MONTH, DATA_INVALID_MONTH_AFTER_OF, DATA_INVALID_MONTH_BEFORE_OF, DATA_INVALID_PATTERN, DATA_INVALID_PATTERN_AFTER_OF, DATA_INVALID_PATTERN_BEFORE_OF, DATA_INVALID_RANGE, DATA_INVALID_RANGE_AFTER_OF, DATA_INVALID_RANGE_BEFORE_OF, DATA_INVALID_REQUIRED, DATA_INVALID_REQUIRED_AFTER_OF, DATA_INVALID_REQUIRED_BEFORE_OF, DATA_INVALID_TIME, DATA_INVALID_TIME_AFTER_OF, DATA_INVALID_TIME_BEFORE_OF, DATA_INVALID_URL, DATA_INVALID_URL_AFTER_OF, DATA_INVALID_URL_BEFORE_OF, DATA_INVALID_WEEK, DATA_INVALID_WEEK_AFTER_OF, DATA_INVALID_WEEK_BEFORE_OF, DATA_ROLE_AFTER_OF, DATA_ROLE_BEFORE_OF, ID_CONTAINER_SHORTCUTS, ID_TEXT_SHORTCUTS;

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

        AccessibleDisplayScreenReaderImplementation.prototype._getShortcutPrefix = function (userAgent, defaultPrefix) {
            var chrome, firefox, ie, konqueror, mac, opera, safari, spoofer, windows;
            if (userAgent !== void 0) {
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

        AccessibleDisplayScreenReaderImplementation.prototype._getRoleDescription = function (role) {
            var parameter;
            parameter = "role-" + (role.toLowerCase());
            if (this.configure.hasParameter(parameter)) {
                return this.configure.getParameter(parameter);
            } else {
                return null;
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype._getLanguageDescription = function (languageCode) {
            var language, parameter;
            language = languageCode.toLowerCase();
            parameter = "language-" + language;
            if (this.configure.hasParameter(parameter)) {
                return this.configure.getParameter(parameter);
            } else if (language.indexOf('-') > -1) {
                parameter = 'language-' + language.split('-')[0];
                if (this.configure.hasParameter(parameter)) {
                    return this.configure.getParameter(parameter);
                }
            }
            return null;
        };

        AccessibleDisplayScreenReaderImplementation.prototype._getDescription = function (element) {
            var description, descriptionId, descriptionIds, elementDescription, i, len, type;
            description = null;
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
                    elementDescription = this.parser.find("#" + descriptionId).firstResult();
                    if (elementDescription !== null) {
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
            if (description === null) {
                description = element.getTextContent();
            }
            return description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ');
        };

        AccessibleDisplayScreenReaderImplementation.prototype._generateListShortcuts = function () {
            var container, list, local, textContainer;
            container = this.parser.find("#" + ID_CONTAINER_SHORTCUTS).firstResult();
            if (container === null) {
                local = this.parser.find('body').firstResult();
                if (local !== null) {
                    container = this.parser.createElement('div');
                    container.setAttribute('id', ID_CONTAINER_SHORTCUTS);
                    textContainer = this.parser.createElement('span');
                    textContainer.setAttribute('id', ID_TEXT_SHORTCUTS);
                    textContainer.appendText(("" + this.attributeAccesskeyPrefixBefore) + ("" + this.attributeAccesskeySuffixBefore));
                    container.appendElement(textContainer);
                    local.appendElement(container);
                }
            }
            list = null;
            if (container !== null) {
                list = this.parser.find(container).findChildren('ul').firstResult();
                if (list === null) {
                    list = this.parser.createElement('ul');
                    container.appendElement(list);
                }
            }
            return list;
        };

        AccessibleDisplayScreenReaderImplementation.prototype._insertBefore = function (element, insertedElement) {
            var body, controls, i, label, labels, len, tagName, tags;
            tagName = element.getTagName();
            tags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH'];
            controls = ['INPUT', 'SELECT', 'TEXTAREA'];
            if (tagName === 'HTML') {
                body = this.parser.find('body').firstResult();
                if (body !== null) {
                    this._insertBefore(body, insertedElement);
                }
            } else if (tags.indexOf(tagName) > -1) {
                element.prependElement(insertedElement);
            } else if (controls.indexOf(tagName) > -1) {
                if (element.hasAttribute('id')) {
                    labels = this.parser.find("label[for=\"" + (element.getAttribute('id')) + "\"]").listResults();
                }
                if (labels.length === 0) {
                    labels = this.parser.find(element).findAncestors('label').listResults();
                }
                for (i = 0, len = labels.length; i < len; i++) {
                    label = labels[i];
                    this._insertBefore(label, insertedElement);
                }
            } else {
                element.insertBefore(insertedElement);
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype._insertAfter = function (element, insertedElement) {
            var appendTags, body, controls, i, label, labels, len, tagName;
            tagName = element.getTagName();
            appendTags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH'];
            controls = ['INPUT', 'SELECT', 'TEXTAREA'];
            if (tagName === 'HTML') {
                body = this.parser.find('body').firstResult();
                if (body !== null) {
                    this._insertAfter(body, insertedElement);
                }
            } else if (appendTags.indexOf(tagName) > -1) {
                element.appendElement(insertedElement);
            } else if (controls.indexOf(tagName) > -1) {
                if (element.hasAttribute('id')) {
                    labels = this.parser.find("label[for=\"" + (element.getAttribute('id')) + "\"]").listResults();
                }
                if (labels.length === 0) {
                    labels = this.parser.find(element).findAncestors('label').listResults();
                }
                for (i = 0, len = labels.length; i < len; i++) {
                    label = labels[i];
                    this._insertAfter(label, insertedElement);
                }
            } else {
                element.insertAfter(insertedElement);
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype._forceReadSimple = function (element, textBefore, textAfter, db, da) {
            var identifier, referenceAfter, referenceBefore, span;
            this.idGenerator.generateId(element);
            identifier = element.getAttribute('id');
            if (textBefore.length > 0) {
                referenceBefore = this.parser.find("[" + db + "=\"" + identifier + "\"]").firstResult();
                if (!element.equals(referenceBefore)) {
                    if (referenceBefore !== null) {
                        referenceBefore.removeNode();
                    }
                    span = this.parser.createElement('span');
                    span.setAttribute('class', CLASS_FORCE_READ_BEFORE);
                    span.setAttribute(db, identifier);
                    span.appendText(textBefore);
                    this._insertBefore(element, span);
                }
            }
            if (textAfter.length > 0) {
                referenceAfter = this.parser.find("[" + da + "=\"" + identifier + "\"]").firstResult();
                if (!element.equals(referenceAfter)) {
                    if (referenceAfter !== null) {
                        referenceAfter.removeNode();
                    }
                    span = this.parser.createElement('span');
                    span.setAttribute('class', CLASS_FORCE_READ_AFTER);
                    span.setAttribute(da, identifier);
                    span.appendText(textAfter);
                    this._insertAfter(element, span);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype._forceRead = function (e, v, tpb, tsb, tpa, tsa, db, da) {
            var textAfter, textBefore;
            if ((tpb.length > 0) || (tsb.length > 0)) {
                textBefore = "" + tpb + v + tsb;
            } else {
                textBefore = '';
            }
            if ((tpa.length > 0) || (tsa.length > 0)) {
                textAfter = "" + tpa + v + tsa;
            } else {
                textAfter = '';
            }
            this._forceReadSimple(e, textBefore, textAfter, db, da);
        };

        AccessibleDisplayScreenReaderImplementation.prototype._displayWAIARIADragandDrop = function (element) {
            var attributeValue;
            if (element.hasAttribute('aria-dropeffect')) {
                attributeValue = element.getAttribute('aria-dropeffect');
                if (attributeValue === 'copy') {
                    this._forceReadSimple(element, this.ariaDropeffectCopyBefore, this.ariaDropeffectCopyAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'move') {
                    this._forceReadSimple(element, this.ariaDropeffectMoveBefore, this.ariaDropeffectMoveAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'link') {
                    this._forceReadSimple(element, this.ariaDropeffectLinkBefore, this.ariaDropeffectLinkAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'execute') {
                    this._forceReadSimple(element, this.ariaDropeffectExecuteBefore, this.ariaDropeffectExecuteAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                } else if (attributeValue === 'popup') {
                    this._forceReadSimple(element, this.ariaDropeffectPopupBefore, this.ariaDropeffectPopupAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-grabbed')) {
                attributeValue = element.getAttribute('aria-grabbed');
                if (attributeValue === 'true') {
                    this._forceReadSimple(element, this.ariaGrabbedTrueBefore, this.ariaGrabbedTrueAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    this._forceReadSimple(element, this.ariaGrabbedFalseBefore, this.ariaGrabbedFalseAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF);
                }
            }
        };

        function AccessibleDisplayScreenReaderImplementation(parser, configure1, userAgent) {
            this.parser = parser;
            this.configure = configure1;
            this.listShortcutsAdded = false;
            this.listShortcuts = null;
            this.idGenerator = new hatemile.util.IDGenerator('display');
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
            this.shortcutPrefix = this._getShortcutPrefix(userAgent, this.attributeAccesskeyDefault);
        }

        AccessibleDisplayScreenReaderImplementation.prototype.displayShortcut = function (element) {
            var description, i, item, key, keys, len;
            if (element.hasAttribute('accesskey')) {
                description = this._getDescription(element);
                if (!element.hasAttribute('title')) {
                    element.setAttribute('title', description);
                }
                if (!this.listShortcutsAdded) {
                    this.listShortcuts = this._generateListShortcuts();
                    this.listShortcutsAdded = true;
                }
                if (this.listShortcuts !== null) {
                    keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'));
                    for (i = 0, len = keys.length; i < len; i++) {
                        key = keys[i];
                        key = key.toUpperCase();
                        if (this.parser.find(this.listShortcuts).findChildren(("[" + DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF + "=\"" + key) + '"]').firstResult() === null) {
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
                roleDescription = this._getRoleDescription(role);
                if (roleDescription !== null) {
                    this._forceRead(element, roleDescription, this.attributeRolePrefixBefore, this.attributeRoleSuffixBefore, this.attributeRolePrefixAfter, this.attributeRoleSuffixAfter, DATA_ROLE_BEFORE_OF, DATA_ROLE_AFTER_OF);
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
                textHeader = null;
                idsHeaders = tableCell.getAttribute('headers').split(new RegExp('[ \n\t\r]+'));
                for (i = 0, len = idsHeaders.length; i < len; i++) {
                    idHeader = idsHeaders[i];
                    header = this.parser.find("#" + idHeader).firstResult();
                    if (header !== null) {
                        if (textHeader === null) {
                            textHeader = header.getTextContent();
                        } else {
                            textHeader = textHeader + " " + (header.getTextContent());
                        }
                    }
                }
                if ((textHeader !== null) && (textHeader.length > 0)) {
                    this._forceRead(tableCell, textHeader, this.attributeHeadersPrefixBefore, this.attributeHeadersSuffixBefore, this.attributeHeadersPrefixAfter, this.attributeHeadersSuffixAfter, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, DATA_ATTRIBUTE_HEADERS_AFTER_OF);
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
                this._forceReadSimple(element, this.ariaBusyTrueBefore, this.ariaBusyTrueAfter, DATA_ARIA_BUSY_BEFORE_OF, DATA_ARIA_BUSY_AFTER_OF);
            }
            if (element.hasAttribute('aria-checked')) {
                attributeValue = element.getAttribute('aria-checked');
                if (attributeValue === 'true') {
                    this._forceReadSimple(element, this.ariaCheckedTrueBefore, this.ariaCheckedTrueAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    this._forceReadSimple(element, this.ariaCheckedFalseBefore, this.ariaCheckedFalseAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF);
                } else if (attributeValue === 'mixed') {
                    this._forceReadSimple(element, this.ariaCheckedMixedBefore, this.ariaCheckedMixedAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-expanded')) {
                attributeValue = element.getAttribute('aria-expanded');
                if (attributeValue === 'true') {
                    this._forceReadSimple(element, this.ariaExpandedTrueBefore, this.ariaExpandedTrueAfter, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    this._forceReadSimple(element, this.ariaExpandedFalseBefore, this.ariaExpandedFalseAfter, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF);
                }
            }
            if ((element.hasAttribute('aria-haspopup')) && (element.getAttribute('aria-haspopup') === 'true')) {
                this._forceReadSimple(element, this.ariaHaspopupTrueBefore, this.ariaHaspopupTrueAfter, DATA_ARIA_HASPOPUP_BEFORE_OF, DATA_ARIA_HASPOPUP_AFTER_OF);
            }
            if ((element.hasAttribute('aria-invalid')) && (element.getAttribute('aria-invalid') === 'true')) {
                this._forceReadSimple(element, this.ariaInvalidTrueBefore, this.ariaInvalidTrueAfter, DATA_ARIA_INVALID_BEFORE_OF, DATA_ARIA_INVALID_AFTER_OF);
                if (element.hasAttribute(DATA_INVALID_LENGTH)) {
                    this._forceReadSimple(element, this.dataInvalidLengthBefore, this.dataInvalidLengthAfter, DATA_INVALID_LENGTH_BEFORE_OF, DATA_INVALID_LENGTH_AFTER_OF);
                }
                if (element.hasAttribute(DATA_INVALID_PATTERN)) {
                    this._forceReadSimple(element, this.dataInvalidPatternBefore, this.dataInvalidPatternAfter, DATA_INVALID_PATTERN_BEFORE_OF, DATA_INVALID_PATTERN_AFTER_OF);
                }
                if (element.hasAttribute(DATA_INVALID_REQUIRED)) {
                    this._forceReadSimple(element, this.dataInvalidRequiredBefore, this.dataInvalidRequiredAfter, DATA_INVALID_REQUIRED_BEFORE_OF, DATA_INVALID_REQUIRED_AFTER_OF);
                }
                if (element.hasAttribute(DATA_INVALID_URL)) {
                    this._forceReadSimple(element, this.dataInvalidUrlBefore, this.dataInvalidUrlAfter, DATA_INVALID_URL_BEFORE_OF, DATA_INVALID_URL_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_EMAIL)) {
                    this._forceReadSimple(element, this.dataInvalidEmailBefore, this.dataInvalidEmailAfter, DATA_INVALID_EMAIL_BEFORE_OF, DATA_INVALID_EMAIL_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_RANGE)) {
                    this._forceReadSimple(element, this.dataInvalidRangeBefore, this.dataInvalidRangeAfter, DATA_INVALID_RANGE_BEFORE_OF, DATA_INVALID_RANGE_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_DATE)) {
                    this._forceReadSimple(element, this.dataInvalidDateBefore, this.dataInvalidDateAfter, DATA_INVALID_DATE_BEFORE_OF, DATA_INVALID_DATE_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_TIME)) {
                    this._forceReadSimple(element, this.dataInvalidTimeBefore, this.dataInvalidTimeAfter, DATA_INVALID_TIME_BEFORE_OF, DATA_INVALID_TIME_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_DATETIME)) {
                    this._forceReadSimple(element, this.dataInvalidDateTimeBefore, this.dataInvalidDateTimeAfter, DATA_INVALID_DATETIME_BEFORE_OF, DATA_INVALID_DATETIME_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_MONTH)) {
                    this._forceReadSimple(element, this.dataInvalidMonthBefore, this.dataInvalidMonthAfter, DATA_INVALID_MONTH_BEFORE_OF, DATA_INVALID_MONTH_AFTER_OF);
                } else if (element.hasAttribute(DATA_INVALID_WEEK)) {
                    this._forceReadSimple(element, this.dataInvalidWeekBefore, this.dataInvalidWeekAfter, DATA_INVALID_WEEK_BEFORE_OF, DATA_INVALID_WEEK_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-level')) {
                this._forceRead(element, element.getAttribute('aria-level'), this.ariaLevelPrefixBefore, this.ariaLevelSuffixBefore, this.ariaLevelPrefixAfter, this.ariaLevelSuffixAfter, DATA_ARIA_LEVEL_BEFORE_OF, DATA_ARIA_LEVEL_AFTER_OF);
            }
            if (element.hasAttribute('aria-orientation')) {
                attributeValue = element.getAttribute('aria-orientation');
                if (attributeValue === 'vertical') {
                    this._forceReadSimple(element, this.ariaOrientationVerticalBefore, this.ariaOrientationVerticalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF);
                } else if (attributeValue === 'horizontal') {
                    this._forceReadSimple(element, this.ariaOrientationHorizontalBefore, this.ariaOrientationHorizontalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-pressed')) {
                attributeValue = element.getAttribute('aria-pressed');
                if (attributeValue === 'true') {
                    this._forceReadSimple(element, this.ariaPressedTrueBefore, this.ariaPressedTrueAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    this._forceReadSimple(element, this.ariaPressedFalseBefore, this.ariaPressedFalseAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF);
                } else if (attributeValue === 'mixed') {
                    this._forceReadSimple(element, this.ariaPressedMixedBefore, this.ariaPressedMixedAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-selected')) {
                attributeValue = element.getAttribute('aria-selected');
                if (attributeValue === 'true') {
                    this._forceReadSimple(element, this.ariaSelectedTrueBefore, this.ariaSelectedTrueAfter, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF);
                } else if (attributeValue === 'false') {
                    this._forceReadSimple(element, this.ariaSelectedFalseBefore, this.ariaSelectedFalseAfter, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF);
                }
            }
            if (element.hasAttribute('aria-sort')) {
                attributeValue = element.getAttribute('aria-sort');
                if (attributeValue === 'ascending') {
                    this._forceReadSimple(element, this.ariaSortAscendingBefore, this.ariaSortAscendingAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF);
                } else if (attributeValue === 'descending') {
                    this._forceReadSimple(element, this.ariaSortDescendingBefore, this.ariaSortDescendingAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF);
                } else if (attributeValue === 'other') {
                    this._forceReadSimple(element, this.ariaSortOtherBefore, this.ariaSortOtherAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF);
                }
            }
            if ((element.hasAttribute('aria-required')) && (element.getAttribute('aria-required') === 'true')) {
                this._forceReadSimple(element, this.ariaRequiredTrueBefore, this.ariaRequiredTrueAfter, DATA_ATTRIBUTE_REQUIRED_BEFORE_OF, DATA_ATTRIBUTE_REQUIRED_AFTER_OF);
            }
            if (element.hasAttribute('aria-valuemin')) {
                this._forceRead(element, element.getAttribute('aria-valuemin'), this.ariaValueMinimumPrefixBefore, this.ariaValueMinimumSuffixBefore, this.ariaValueMinimumPrefixAfter, this.ariaValueMinimumSuffixAfter, DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF);
            }
            if (element.hasAttribute('aria-valuemax')) {
                this._forceRead(element, element.getAttribute('aria-valuemax'), this.ariaValueMaximumPrefixBefore, this.ariaValueMaximumSuffixBefore, this.ariaValueMaximumPrefixAfter, this.ariaValueMaximumSuffixAfter, DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF);
            }
            if (element.hasAttribute('aria-autocomplete')) {
                attributeValue = element.getAttribute('aria-autocomplete');
                if (attributeValue === 'both') {
                    this._forceReadSimple(element, this.ariaAutoCompleteBothBefore, this.ariaAutoCompleteBothAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF);
                } else if (attributeValue === 'inline') {
                    this._forceReadSimple(element, this.ariaAutoCompleteListBefore, this.ariaAutoCompleteListAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF);
                } else if (attributeValue === 'list') {
                    this._forceReadSimple(element, this.ariaAutoCompleteInlineBefore, this.ariaAutoCompleteInlineAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF);
                }
            }
            this._displayWAIARIADragandDrop(element);
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllWAIARIAStates = function () {
            var element, elements, i, len;
            elements = this.parser.find('[aria-busy="true"],[aria-checked],' + '[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],' + '[aria-invalid=true],[aria-level],[aria-orientation],' + '[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],' + '[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayWAIARIAStates(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayLinkAttributes = function (link) {
            if (link.hasAttribute('download')) {
                this._forceReadSimple(link, this.attributeDownloadBefore, this.attributeDownloadAfter, DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF, DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF);
            }
            if ((link.hasAttribute('target')) && (link.getAttribute('target') === '_blank')) {
                this._forceReadSimple(link, this.attributeTargetBlankBefore, this.attributeTargetBlankAfter, DATA_ATTRIBUTE_TARGET_BEFORE_OF, DATA_ATTRIBUTE_TARGET_AFTER_OF);
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
            if ((element.hasAttribute('title')) && (element.getAttribute('title').length > 0)) {
                if (element.getTagName() === 'IMG') {
                    this.displayAlternativeTextImage(element);
                } else {
                    this._forceRead(element, element.getAttribute('title'), this.attributeTitlePrefixBefore, this.attributeTitleSuffixBefore, this.attributeTitlePrefixAfter, this.attributeTitleSuffixAfter, DATA_ATTRIBUTE_TITLE_BEFORE_OF, DATA_ATTRIBUTE_TITLE_AFTER_OF);
                }
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
                this._forceReadSimple(element, this.attributeDraggableBefore, this.attributeDraggableAfter, DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF, DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF);
            }
            if (element.hasAttribute('dropzone')) {
                attributeValue = element.getAttribute('dropzone');
                if (attributeValue === 'copy') {
                    this._forceReadSimple(element, this.attributeDropzoneCopyBefore, this.attributeDropzoneCopyAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF);
                } else if (attributeValue === 'move') {
                    this._forceReadSimple(element, this.attributeDropzoneMoveBefore, this.attributeDropzoneMoveAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF);
                } else if (attributeValue === 'link') {
                    this._forceReadSimple(element, this.attributeDropzoneLinkBefore, this.attributeDropzoneLinkAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF);
                }
            }
            this._displayWAIARIADragandDrop(element);
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayAllDragsAndDrops = function () {
            var element, elements, i, len;
            elements = this.parser.find('[draggable],[dropzone],[aria-dropeffect],' + '[aria-grabbed]').listResults();
            for (i = 0, len = elements.length; i < len; i++) {
                element = elements[i];
                if (self.hatemile.util.CommonFunctions.isValidElement(element)) {
                    this.displayDragAndDrop(element);
                }
            }
        };

        AccessibleDisplayScreenReaderImplementation.prototype.displayLanguage = function (element) {
            var language, languageCode;
            languageCode = null;
            if (element.hasAttribute('lang')) {
                languageCode = element.getAttribute('lang');
            } else if (element.hasAttribute('hreflang')) {
                languageCode = element.getAttribute('hreflang');
            }
            if (languageCode !== null) {
                language = this._getLanguageDescription(languageCode);
                if (language !== null) {
                    this._forceRead(element, language, this.attributeLanguagePrefixBefore, this.attributeLanguageSuffixBefore, this.attributeLanguagePrefixAfter, this.attributeLanguageSuffixAfter, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF);
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
                this.idGenerator.generateId(image);
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
