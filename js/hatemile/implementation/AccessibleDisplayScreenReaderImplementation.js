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

exports.hatemile.implementation.AccessibleDisplayScreenReaderImplementation = (function() {
	var forceRead, forceReadSimple, generateListShortcuts, getDescription, insertAfter, insertBefore, _classForceReadBegin, _classForceReadEnd, _dataAriaBusyBeginFor, _dataAriaBusyEndFor, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor, _dataAriaExpandedBeginFor, _dataAriaExpandedEndFor, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor, _dataAriaHaspopupBeginFor, _dataAriaHaspopupEndFor, _dataAriaLevelBeginFor, _dataAriaLevelEndFor, _dataAriaOrientationBeginFor, _dataAriaOrientationEndFor, _dataAriaPressedBeginFor, _dataAriaPressedEndFor, _dataAriaSelectedBeginFor, _dataAriaSelectedEndFor, _dataAriaSortBeginFor, _dataAriaSortEndFor, _dataAttributeAccesskeyBeginFor, _dataAttributeAccesskeyEndFor, _dataAttributeAutoCompleteBeginFor, _dataAttributeAutoCompleteEndFor, _dataAttributeDownloadBeginFor, _dataAttributeDownloadEndFor, _dataAttributeDraggableBeginFor, _dataAttributeDraggableEndFor, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor, _dataAttributeHeadersBeginFor, _dataAttributeHeadersEndFor, _dataAttributeHrefBeginFor, _dataAttributeHrefEndFor, _dataAttributeLanguageBeginFor, _dataAttributeLanguageEndFor, _dataAttributeRangeMaxBeginFor, _dataAttributeRangeMaxEndFor, _dataAttributeRangeMinBeginFor, _dataAttributeRangeMinEndFor, _dataAttributeRequiredBeginFor, _dataAttributeRequiredEndFor, _dataAttributeTargetBeginFor, _dataAttributeTargetEndFor, _dataAttributeTitleBeginFor, _dataAttributeTitleEndFor, _dataInvalidDate, _dataInvalidDateTime, _dataInvalidEmail, _dataInvalidLength, _dataInvalidMonth, _dataInvalidPattern, _dataInvalidRange, _dataInvalidRequired, _dataInvalidTime, _dataInvalidURL, _dataInvalidWeek, _dataRoleBeginFor, _dataRoleEndFor, _idContainerShortcuts, _idTextShortcuts;

	_idContainerShortcuts = 'container-shortcuts';

	_idTextShortcuts = 'text-shortcuts';

	_classForceReadBegin = 'force-read-begin';

	_classForceReadEnd = 'force-read-end';

	_dataAttributeRequiredBeginFor = 'data-attributerequiredbeginfor';

	_dataAttributeRequiredEndFor = 'data-attributerequiredendfor';

	_dataAttributeRangeMinBeginFor = 'data-attributevalueminbeginfor';

	_dataAttributeRangeMinEndFor = 'data-attributevalueminendfor';

	_dataAttributeRangeMaxBeginFor = 'data-attributevaluemaxbeginfor';

	_dataAttributeRangeMaxEndFor = 'data-attributevaluemaxendfor';

	_dataAttributeAutoCompleteBeginFor = 'data-attributeautocompletebeginfor';

	_dataAttributeAutoCompleteEndFor = 'data-attributeautocompleteendfor';

	_dataAttributeTitleBeginFor = 'data-attributetitlebeginfor';

	_dataAttributeTitleEndFor = 'data-attributetitleendfor';

	_dataAttributeHrefBeginFor = 'data-attributehrefbeginfor';

	_dataAttributeHrefEndFor = 'data-attributehrefendfor';

	_dataAttributeAccesskeyBeginFor = 'data-attributeaccesskeybeginfor';

	_dataAttributeAccesskeyEndFor = 'data-attributeaccesskeyendfor';

	_dataAttributeTargetBeginFor = 'data-attributetargetbeginfor';

	_dataAttributeTargetEndFor = 'data-attributetargetendfor';

	_dataAttributeDownloadBeginFor = 'data-attributedownloadbeginfor';

	_dataAttributeDownloadEndFor = 'data-attributedownloadendfor';

	_dataAttributeDraggableBeginFor = 'data-attributedraggablebeginfor';

	_dataAttributeDraggableEndFor = 'data-attributedraggableendfor';

	_dataAttributeDropzoneBeginFor = 'data-attributedropzonebeginfor';

	_dataAttributeDropzoneEndFor = 'data-attributedropzoneendfor';

	_dataAttributeLanguageBeginFor = 'data-languagebeginfor';

	_dataAttributeLanguageEndFor = 'data-languageendfor';

	_dataAttributeHeadersBeginFor = 'data-headersbeginfor';

	_dataAttributeHeadersEndFor = 'data-headersendfor';

	_dataAriaBusyBeginFor = 'data-ariabusybeginfor';

	_dataAriaBusyEndFor = 'data-ariabusyendfor';

	_dataAriaCheckedBeginFor = 'data-ariacheckedbeginfor';

	_dataAriaCheckedEndFor = 'data-ariacheckedendfor';

	_dataAriaDropeffectBeginFor = 'data-ariadropeffectbeginfor';

	_dataAriaDropeffectEndFor = 'data-ariadropeffectendfor';

	_dataAriaExpandedBeginFor = 'data-ariaexpandedbeginfor';

	_dataAriaExpandedEndFor = 'data-ariaexpandedendfor';

	_dataAriaGrabbedBeginFor = 'data-ariagrabbedbeginfor';

	_dataAriaGrabbedEndFor = 'data-ariagrabbedendfor';

	_dataAriaHaspopupBeginFor = 'data-ariahaspopupbeginfor';

	_dataAriaHaspopupEndFor = 'data-ariahaspopupendfor';

	_dataAriaLevelBeginFor = 'data-arialevelbeginfor';

	_dataAriaLevelEndFor = 'data-arialevelendfor';

	_dataAriaOrientationBeginFor = 'data-ariaorientationbeginfor';

	_dataAriaOrientationEndFor = 'data-ariaorientationendfor';

	_dataAriaPressedBeginFor = 'data-ariapressedbeginfor';

	_dataAriaPressedEndFor = 'data-ariapressedendfor';

	_dataAriaSelectedBeginFor = 'data-ariaselectedbeginfor';

	_dataAriaSelectedEndFor = 'data-ariaselectedendfor';

	_dataAriaSortBeginFor = 'data-ariasortbeginfor';

	_dataAriaSortEndFor = 'data-ariasortendfor';

	_dataRoleBeginFor = 'data-rolebeginfor';

	_dataRoleEndFor = 'data-roleendfor';

	_dataInvalidURL = 'data-invalidurl';

	_dataInvalidEmail = 'data-invalidemail';

	_dataInvalidRange = 'data-invalidrange';

	_dataInvalidLength = 'data-invalidlength';

	_dataInvalidPattern = 'data-invalidpattern';

	_dataInvalidRequired = 'data-invalidrequired';

	_dataInvalidDate = 'data-invaliddate';

	_dataInvalidTime = 'data-invalidtime';

	_dataInvalidDateTime = 'data-invaliddatetime';

	_dataInvalidMonth = 'data-invalidmonth';

	_dataInvalidWeek = 'data-invalidweek';

	function AccessibleDisplayScreenReaderImplementation(parser, configure, shortcutPrefix) {
		this.parser = parser;
		this.shortcutPrefix = shortcutPrefix;
		if (isEmpty(this.shortcutPrefix)) {
			this.shortcutPrefix = '';
		}
		this.listShortcutsAdded = false;
		this.listShortcuts = void 0;
		this.prefixId = configure.getParameter('prefix-generated-ids');
		this.attributeTitlePrefixBegin = configure.getParameter('attribute-title-prefix-begin');
		this.attributeTitleSuffixBegin = configure.getParameter('attribute-title-suffix-begin');
		this.attributeTitlePrefixEnd = configure.getParameter('attribute-title-prefix-end');
		this.attributeTitleSuffixEnd = configure.getParameter('attribute-title-suffix-end');
		this.attributeHrefPrefixBegin = configure.getParameter('attribute-href-prefix-begin');
		this.attributeHrefSuffixBegin = configure.getParameter('attribute-href-suffix-begin');
		this.attributeHrefPrefixEnd = configure.getParameter('attribute-href-prefix-end');
		this.attributeHrefSuffixEnd = configure.getParameter('attribute-href-suffix-end');
		this.attributeAccesskeyPrefixBegin = configure.getParameter('attribute-accesskey-prefix-begin');
		this.attributeAccesskeySuffixBegin = configure.getParameter('attribute-accesskey-suffix-begin');
		this.attributeAccesskeyPrefixEnd = configure.getParameter('attribute-accesskey-prefix-end');
		this.attributeAccesskeySuffixEnd = configure.getParameter('attribute-accesskey-suffix-end');
		this.attributeTargetBlankBegin = configure.getParameter('attribute-target-blank-begin');
		this.attributeTargetBlankEnd = configure.getParameter('attribute-target-blank-end');
		this.attributeDownloadBegin = configure.getParameter('attribute-download-begin');
		this.attributeDownloadEnd = configure.getParameter('attribute-download-end');
		this.attributeDraggableBegin = configure.getParameter('attribute-draggable-begin');
		this.attributeDraggableEnd = configure.getParameter('attribute-draggable-end');
		this.attributeDropzoneCopyBegin = configure.getParameter('attribute-dropzone-copy-begin');
		this.attributeDropzoneCopyEnd = configure.getParameter('attribute-dropzone-copy-end');
		this.attributeDropzoneMoveBegin = configure.getParameter('attribute-dropzone-move-begin');
		this.attributeDropzoneMoveEnd = configure.getParameter('attribute-dropzone-move-end');
		this.attributeDropzoneLinkBegin = configure.getParameter('attribute-dropzone-link-begin');
		this.attributeDropzoneLinkEnd = configure.getParameter('attribute-dropzone-link-end');
		this.attributeHeadersPrefixBegin = configure.getParameter('attribute-headers-prefix-begin');
		this.attributeHeadersSuffixBegin = configure.getParameter('attribute-headers-suffix-begin');
		this.attributeHeadersPrefixEnd = configure.getParameter('attribute-headers-prefix-end');
		this.attributeHeadersSuffixEnd = configure.getParameter('attribute-headers-suffix-end');
		this.attributeLanguagePrefixBegin = configure.getParameter('attribute-language-prefix-begin');
		this.attributeLanguageSuffixBegin = configure.getParameter('attribute-language-suffix-begin');
		this.attributeLanguagePrefixEnd = configure.getParameter('attribute-language-prefix-end');
		this.attributeLanguageSuffixEnd = configure.getParameter('attribute-language-suffix-end');
		this.attributeRolePrefixBegin = configure.getParameter('attribute-role-prefix-begin');
		this.attributeRoleSuffixBegin = configure.getParameter('attribute-role-suffix-begin');
		this.attributeRolePrefixEnd = configure.getParameter('attribute-role-prefix-end');
		this.attributeRoleSuffixEnd = configure.getParameter('attribute-role-suffix-end');
		this.ariaAutoCompleteBothBegin = configure.getParameter('aria-autocomplete-both-begin');
		this.ariaAutoCompleteBothEnd = configure.getParameter('aria-autocomplete-both-end');
		this.ariaAutoCompleteInlineBegin = configure.getParameter('aria-autocomplete-inline-begin');
		this.ariaAutoCompleteInlineEnd = configure.getParameter('aria-autocomplete-inline-end');
		this.ariaAutoCompleteListBegin = configure.getParameter('aria-autocomplete-list-begin');
		this.ariaAutoCompleteListEnd = configure.getParameter('aria-autocomplete-list-end');
		this.ariaBusyTrueBegin = configure.getParameter('aria-busy-true-begin');
		this.ariaBusyTrueEnd = configure.getParameter('aria-busy-true-end');
		this.ariaCheckedFalseBegin = configure.getParameter('aria-checked-false-begin');
		this.ariaCheckedFalseEnd = configure.getParameter('aria-checked-false-end');
		this.ariaCheckedMixedBegin = configure.getParameter('aria-checked-mixed-begin');
		this.ariaCheckedMixedEnd = configure.getParameter('aria-checked-mixed-end');
		this.ariaCheckedTrueBegin = configure.getParameter('aria-checked-true-begin');
		this.ariaCheckedTrueEnd = configure.getParameter('aria-checked-true-end');
		this.ariaDropeffectCopyBegin = configure.getParameter('aria-dropeffect-copy-begin');
		this.ariaDropeffectCopyEnd = configure.getParameter('aria-dropeffect-copy-end');
		this.ariaDropeffectExecuteBegin = configure.getParameter('aria-dropeffect-execute-begin');
		this.ariaDropeffectExecuteEnd = configure.getParameter('aria-dropeffect-execute-end');
		this.ariaDropeffectLinkBegin = configure.getParameter('aria-dropeffect-link-begin');
		this.ariaDropeffectLinkEnd = configure.getParameter('aria-dropeffect-link-end');
		this.ariaDropeffectMoveBegin = configure.getParameter('aria-dropeffect-move-begin');
		this.ariaDropeffectMoveEnd = configure.getParameter('aria-dropeffect-move-end');
		this.ariaDropeffectPopupBegin = configure.getParameter('aria-dropeffect-popup-begin');
		this.ariaDropeffectPopupEnd = configure.getParameter('aria-dropeffect-popup-end');
		this.ariaExpandedFalseBegin = configure.getParameter('aria-expanded-false-begin');
		this.ariaExpandedFalseEnd = configure.getParameter('aria-expanded-false-end');
		this.ariaExpandedTrueBegin = configure.getParameter('aria-expanded-true-begin');
		this.ariaExpandedTrueEnd = configure.getParameter('aria-expanded-true-end');
		this.ariaGrabbedFalseBegin = configure.getParameter('aria-grabbed-false-begin');
		this.ariaGrabbedFalseEnd = configure.getParameter('aria-grabbed-false-end');
		this.ariaGrabbedTrueBegin = configure.getParameter('aria-grabbed-true-begin');
		this.ariaGrabbedTrueEnd = configure.getParameter('aria-grabbed-true-end');
		this.ariaHaspopupTrueBegin = configure.getParameter('aria-haspopup-true-begin');
		this.ariaHaspopupTrueEnd = configure.getParameter('aria-haspopup-true-end');
		this.ariaLevelPrefixBegin = configure.getParameter('aria-level-prefix-begin');
		this.ariaLevelSuffixBegin = configure.getParameter('aria-level-suffix-begin');
		this.ariaLevelPrefixEnd = configure.getParameter('aria-level-prefix-end');
		this.ariaLevelSuffixEnd = configure.getParameter('aria-level-suffix-end');
		this.ariaValueMaximumPrefixBegin = configure.getParameter('aria-value-maximum-prefix-begin');
		this.ariaValueMaximumSuffixBegin = configure.getParameter('aria-value-maximum-suffix-begin');
		this.ariaValueMaximumPrefixEnd = configure.getParameter('aria-value-maximum-prefix-end');
		this.ariaValueMaximumSuffixEnd = configure.getParameter('aria-value-maximum-suffix-end');
		this.ariaValueMinimumPrefixBegin = configure.getParameter('aria-value-minimum-prefix-begin');
		this.ariaValueMinimumSuffixBegin = configure.getParameter('aria-value-minimum-suffix-begin');
		this.ariaValueMinimumPrefixEnd = configure.getParameter('aria-value-minimum-prefix-end');
		this.ariaValueMinimumSuffixEnd = configure.getParameter('aria-value-minimum-suffix-end');
		this.ariaOrientationHorizontalBegin = configure.getParameter('aria-orientation-horizontal-begin');
		this.ariaOrientationHorizontalEnd = configure.getParameter('aria-orientation-horizontal-end');
		this.ariaOrientationVerticalBegin = configure.getParameter('aria-orientation-vertical-begin');
		this.ariaOrientationVerticalEnd = configure.getParameter('aria-orientation-vertical-end');
		this.ariaPressedFalseBegin = configure.getParameter('aria-pressed-false-begin');
		this.ariaPressedFalseEnd = configure.getParameter('aria-pressed-false-end');
		this.ariaPressedMixedBegin = configure.getParameter('aria-pressed-mixed-begin');
		this.ariaPressedMixedEnd = configure.getParameter('aria-pressed-mixed-end');
		this.ariaPressedTrueBegin = configure.getParameter('aria-pressed-true-begin');
		this.ariaPressedTrueEnd = configure.getParameter('aria-pressed-true-end');
		this.ariaRequiredTrueBegin = configure.getParameter('aria-required-true-begin');
		this.ariaRequiredTrueEnd = configure.getParameter('aria-required-true-end');
		this.ariaSelectedFalseBegin = configure.getParameter('aria-selected-false-begin');
		this.ariaSelectedFalseEnd = configure.getParameter('aria-selected-false-end');
		this.ariaSelectedTrueBegin = configure.getParameter('aria-selected-true-begin');
		this.ariaSelectedTrueEnd = configure.getParameter('aria-selected-true-end');
		this.ariaSortAscendingBegin = configure.getParameter('aria-sort-ascending-begin');
		this.ariaSortAscendingEnd = configure.getParameter('aria-sort-ascending-end');
		this.ariaSortDescendingBegin = configure.getParameter('aria-sort-descending-begin');
		this.ariaSortDescendingEnd = configure.getParameter('aria-sort-descending-end');
		this.ariaSortOtherBegin = configure.getParameter('aria-sort-other-begin');
		this.ariaSortOtherEnd = configure.getParameter('aria-sort-other-end');
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
	}

	/**
	 * Returns the description of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with description.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
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
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {String} textShortcuts The text of description of container of
	 * shortcuts descriptions.
	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
	 * callback This class.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of shortcuts of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	 */


	generateListShortcuts = function(parser, textShortcuts, callback) {
		var container, list, local, textContainer;
		container = parser.find("#" + _idContainerShortcuts).firstResult();
		if (isEmpty(container)) {
			local = parser.find('body').firstResult();
			if (!isEmpty(local)) {
				container = parser.createElement('div');
				container.setAttribute('id', _idContainerShortcuts);
				textContainer = parser.createElement('span');
				textContainer.setAttribute('id', _idTextShortcuts);
				textContainer.appendText(textShortcuts);
				container.appendElement(textContainer);
				local.appendElement(container);
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

	insertBefore = function(element, insertedElement, parser) {
		var body, controls, label, labels, tagName, tags, _i, _len;
		tagName = element.getTagName();
		tags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH'];
		controls = ['INPUT', 'SELECT', 'TEXTAREA'];
		if (tagName === 'HTML') {
			body = parser.find('body').firstResult();
			if (!isEmpty(body)) {
				insertBefore(body, insertedElement, parser);
			}
		} else if (tags.indexOf(tagName) > -1) {
			element.prependElement(insertedElement);
		} else if (controls.indexOf(tagName) > -1) {
			if (element.hasAttribute('id')) {
				labels = parser.find("label[for=\"" + (element.getAttribute('id')) + "\"]").listResults();
			}
			if (isEmpty(labels)) {
				labels = parser.find(element).findAncestors('label').listResults();
			}
			for (_i = 0, _len = labels.length; _i < _len; _i++) {
				label = labels[_i];
				insertBefore(label, insertedElement, parser);
			}
		} else {
			element.insertBefore(insertedElement);
		}
	};

	insertAfter = function(element, insertedElement, parser) {
		var appendTags, body, controls, label, labels, tagName, _i, _len;
		tagName = element.getTagName();
		appendTags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH'];
		controls = ['INPUT', 'SELECT', 'TEXTAREA'];
		if (tagName === 'HTML') {
			body = parser.find('body').firstResult();
			if (!isEmpty(body)) {
				insertAfter(body, insertedElement, parser);
			}
		} else if (appendTags.indexOf(tagName) > -1) {
			element.appendElement(insertedElement);
		} else if (controls.indexOf(tagName) > -1) {
			if (element.hasAttribute('id')) {
				labels = parser.find("label[for=\"" + (element.getAttribute('id')) + "\"]").listResults();
			}
			if (isEmpty(labels)) {
				labels = parser.find(element).findAncestors('label').listResults();
			}
			for (_i = 0, _len = labels.length; _i < _len; _i++) {
				label = labels[_i];
				insertAfter(label, insertedElement, parser);
			}
		} else {
			element.insertAfter(insertedElement);
		}
	};

	forceReadSimple = function(element, parser, prefixId, textBegin, textEnd, dataBeginFor, dataEndFor) {
		var identifier, referenceBegin, referenceEnd, span;
		exports.hatemile.util.CommonFunctions.generateId(element, prefixId);
		identifier = element.getAttribute('id');
		if (!isEmpty(textBegin)) {
			referenceBegin = parser.find("." + _classForceReadBegin + "[" + dataBeginFor + "=\"" + identifier + "\"]").firstResult();
			if (!isEmpty(referenceBegin)) {
				referenceBegin.removeElement();
				referenceBegin = void 0;
			}
			span = parser.createElement('span');
			span.setAttribute('class', _classForceReadBegin);
			span.setAttribute(dataBeginFor, identifier);
			span.appendText(textBegin);
			insertBefore(element, span, parser);
		}
		if (!isEmpty(textEnd)) {
			referenceEnd = parser.find("." + _classForceReadEnd + "[" + dataEndFor + "=\"" + identifier + "\"]").firstResult();
			if (!isEmpty(referenceEnd)) {
				referenceEnd.removeElement();
				referenceEnd = void 0;
			}
			span = parser.createElement('span');
			span.setAttribute('class', _classForceReadEnd);
			span.setAttribute(dataEndFor, identifier);
			span.appendText(textEnd);
			insertAfter(element, span, parser);
		}
	};

	forceRead = function(element, value, parser, prefixId, textPrefixBegin, textSuffixBegin, textPrefixEnd, textSuffixEnd, dataBeginFor, dataEndFor) {
		var textBegin, textEnd;
		if ((!isEmpty(textPrefixBegin)) || (!isEmpty(textSuffixBegin))) {
			textBegin = "" + textPrefixBegin + value + textSuffixBegin;
		} else {
			textBegin = '';
		}
		if ((!isEmpty(textPrefixEnd)) || (!isEmpty(textSuffixEnd))) {
			textEnd = "" + textPrefixEnd + value + textSuffixEnd;
		} else {
			textEnd = '';
		}
		forceReadSimple(element, parser, prefixId, textBegin, textEnd, dataBeginFor, dataEndFor);
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayShortcut = function(element) {
		var description, item, key, keys, _i, _len;
		if (element.hasAttribute('accesskey')) {
			description = getDescription(element, this.parser);
			if (!element.hasAttribute('title')) {
				element.setAttribute('title', description);
			}
			if (!this.listShortcutsAdded) {
				this.listShortcuts = generateListShortcuts(this.parser, "" + this.attributeAccesskeyPrefixBegin + this.attributeAccesskeySuffixBegin, "" + this.attributeAccesskeyPrefixEnd + this.attributeAccesskeySuffixEnd, this);
				this.listShortcutsAdded = true;
			}
			if (!isEmpty(this.listShortcuts)) {
				keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'));
				for (_i = 0, _len = keys.length; _i < _len; _i++) {
					key = keys[_i];
					key = key.toUpperCase();
					if (isEmpty(this.parser.find(this.listShortcuts).findChildren("[" + _dataAttributeAccesskeyBeginFor + "=\"" + key + "\"]").firstResult())) {
						item = this.parser.createElement('li');
						item.setAttribute(_dataAttributeAccesskeyBeginFor, key);
						item.setAttribute(_dataAttributeAccesskeyEndFor, key);
						item.appendText("" + this.shortcutPrefix + " + " + key + ": " + description);
						this.listShortcuts.appendElement(item);
					}
				}
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllShortcuts = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[accesskey]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayShortcut(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayRole = function(element) {
		var role, roleDescription;
		if (element.hasAttribute('role')) {
			role = element.getAttribute('role');
			roleDescription = this.roles[role];
			if (!isEmpty(roleDescription)) {
				forceRead(element, roleDescription, this.parser, this.prefixId, this.attributeRolePrefixBegin, this.attributeRoleSuffixBegin, this.attributeRolePrefixEnd, this.attributeRoleSuffixEnd, _dataRoleBeginFor, _dataRoleEndFor);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllRoles = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[role]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayRole(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayCellHeader = function(tableCell) {
		var header, idHeader, idsHeaders, textHeader, _i, _len;
		if (tableCell.hasAttribute('headers')) {
			textHeader = '';
			idsHeaders = tableCell.getAttribute('headers').split(new RegExp('[ \n\t\r]+'));
			for (_i = 0, _len = idsHeaders.length; _i < _len; _i++) {
				idHeader = idsHeaders[_i];
				header = this.parser.find("#" + idHeader).firstResult();
				if (!isEmpty(header)) {
					textHeader = "" + textHeader + " " + (header.getTextContent());
				}
			}
			if (!isEmpty(textHeader)) {
				forceRead(tableCell, textHeader, this.parser, this.prefixId, this.attributeHeadersPrefixBegin, this.attributeHeadersSuffixBegin, this.attributeHeadersPrefixEnd, this.attributeHeadersSuffixEnd, _dataAttributeHeadersBeginFor, _dataAttributeHeadersEndFor);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllCellHeaders = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('td[headers],th[headers]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayCellHeader(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayWAIARIAStates = function(element) {
		var attributeValue;
		if ((element.hasAttribute('aria-busy')) && (element.getAttribute('aria-busy') === 'true')) {
			forceReadSimple(element, this.parser, this.prefixId, this.ariaBusyTrueBegin, this.ariaBusyTrueEnd, _dataAriaBusyBeginFor, _dataAriaBusyEndFor);
		}
		if (element.hasAttribute('aria-checked')) {
			attributeValue = element.getAttribute('aria-checked');
			if (attributeValue === 'true') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaCheckedTrueBegin, this.ariaCheckedTrueEnd, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor);
			} else if (attributeValue === 'false') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaCheckedFalseBegin, this.ariaCheckedFalseEnd, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor);
			} else if (attributeValue === 'mixed') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaCheckedMixedBegin, this.ariaCheckedMixedEnd, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor);
			}
		}
		if (element.hasAttribute('aria-dropeffect')) {
			attributeValue = element.getAttribute('aria-dropeffect');
			if (attributeValue === 'copy') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectCopyBegin, this.ariaDropeffectCopyEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'move') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectMoveBegin, this.ariaDropeffectMoveEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'link') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectLinkBegin, this.ariaDropeffectLinkEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'execute') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectExecuteBegin, this.ariaDropeffectExecuteEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'popup') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectPopupBegin, this.ariaDropeffectPopupEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			}
		}
		if (element.hasAttribute('aria-expanded')) {
			attributeValue = element.getAttribute('aria-expanded');
			if (attributeValue === 'true') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaExpandedTrueBegin, this.ariaExpandedTrueEnd, _dataAriaExpandedBeginFor, _dataAriaExpandedEndFor);
			} else if (attributeValue === 'false') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaExpandedFalseBegin, this.ariaExpandedFalseEnd, _dataAriaExpandedBeginFor, _dataAriaExpandedEndFor);
			}
		}
		if (element.hasAttribute('aria-grabbed')) {
			attributeValue = element.getAttribute('aria-grabbed');
			if (attributeValue === 'true') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedTrueBegin, this.ariaGrabbedTrueEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor);
			} else if (attributeValue === 'false') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedFalseBegin, this.ariaGrabbedFalseEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor);
			}
		}
		if ((element.hasAttribute('aria-haspopup')) && (element.getAttribute('aria-haspopup') === 'true')) {
			forceReadSimple(element, this.parser, this.prefixId, this.ariaHaspopupTrueBegin, this.ariaHaspopupTrueEnd, _dataAriaHaspopupBeginFor, _dataAriaHaspopupEndFor);
		}
		if (element.hasAttribute('aria-level')) {
			forceRead(element, element.getAttribute('aria-level'), this.parser, this.prefixId, this.ariaLevelPrefixBegin, this.ariaLevelSuffixBegin, this.ariaLevelPrefixEnd, this.ariaLevelSuffixEnd, _dataAriaLevelBeginFor, _dataAriaLevelEndFor);
		}
		if (element.hasAttribute('aria-orientation')) {
			attributeValue = element.getAttribute('aria-orientation');
			if (attributeValue === 'vertical') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaOrientationVerticalBegin, this.ariaOrientationVerticalEnd, _dataAriaOrientationBeginFor, _dataAriaOrientationEndFor);
			} else if (attributeValue === 'horizontal') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaOrientationHorizontalBegin, this.ariaOrientationHorizontalEnd, _dataAriaOrientationBeginFor, _dataAriaOrientationEndFor);
			}
		}
		if (element.hasAttribute('aria-pressed')) {
			attributeValue = element.getAttribute('aria-pressed');
			if (attributeValue === 'true') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaPressedTrueBegin, this.ariaPressedTrueEnd, _dataAriaPressedBeginFor, _dataAriaPressedEndFor);
			} else if (attributeValue === 'false') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaPressedFalseBegin, this.ariaPressedFalseEnd, _dataAriaPressedBeginFor, _dataAriaPressedEndFor);
			} else if (attributeValue === 'mixed') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaPressedMixedBegin, this.ariaPressedMixedEnd, _dataAriaPressedBeginFor, _dataAriaPressedEndFor);
			}
		}
		if (element.hasAttribute('aria-selected')) {
			attributeValue = element.getAttribute('aria-selected');
			if (attributeValue === 'true') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaSelectedTrueBegin, this.ariaSelectedTrueEnd, _dataAriaSelectedBeginFor, _dataAriaSelectedEndFor);
			} else if (attributeValue === 'false') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaSelectedFalseBegin, this.ariaSelectedFalseEnd, _dataAriaSelectedBeginFor, _dataAriaSelectedEndFor);
			}
		}
		if (element.hasAttribute('aria-sort')) {
			attributeValue = element.getAttribute('aria-sort');
			if (attributeValue === 'ascending') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaSortAscendingBegin, this.ariaSortAscendingEnd, _dataAriaSortBeginFor, _dataAriaSortEndFor);
			} else if (attributeValue === 'descending') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaSortDescendingBegin, this.ariaSortDescendingEnd, _dataAriaSortBeginFor, _dataAriaSortEndFor);
			} else if (attributeValue === 'other') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaSortOtherBegin, this.ariaSortOtherEnd, _dataAriaSortBeginFor, _dataAriaSortEndFor);
			}
		}
		if ((element.hasAttribute('aria-required')) && (element.getAttribute('aria-required') === 'true')) {
			forceReadSimple(element, this.parser, this.prefixId, this.ariaRequiredTrueBegin, this.ariaRequiredTrueEnd, _dataAttributeRequiredBeginFor, _dataAttributeRequiredEndFor);
		}
		if (element.hasAttribute('aria-valuemin')) {
			forceRead(element, element.getAttribute('aria-valuemin'), this.parser, this.prefixId, this.ariaValueMinimumPrefixBegin, this.ariaValueMinimumSuffixBegin, this.ariaValueMinimumPrefixEnd, this.ariaValueMinimumSuffixEnd, _dataAttributeRangeMinBeginFor, _dataAttributeRangeMinEndFor);
		}
		if (element.hasAttribute('aria-valuemax')) {
			forceRead(element, element.getAttribute('aria-valuemax'), this.parser, this.prefixId, this.ariaValueMaximumPrefixBegin, this.ariaValueMaximumSuffixBegin, this.ariaValueMaximumPrefixEnd, this.ariaValueMaximumSuffixEnd, _dataAttributeRangeMaxBeginFor, _dataAttributeRangeMaxEndFor);
		}
		if (element.hasAttribute('aria-autocomplete')) {
			attributeValue = element.getAttribute('aria-autocomplete');
			if (attributeValue === 'both') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaAutoCompleteBothBegin, this.ariaAutoCompleteBothEnd, _dataAttributeAutoCompleteEndFor);
			} else if (attributeValue === 'inline') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaAutoCompleteListBegin, this.ariaAutoCompleteListEnd, _dataAttributeAutoCompleteEndFor);
			} else if (attributeValue === 'list') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaAutoCompleteInlineBegin, this.ariaAutoCompleteInlineEnd, _dataAttributeAutoCompleteEndFor);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllWAIARIAStates = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[aria-busy="true"],[aria-checked],[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],[aria-level],[aria-orientation],[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayWAIARIAStates(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayLinkAttributes = function(link) {
		if (link.hasAttribute('download')) {
			forceReadSimple(link, this.parser, this.prefixId, this.attributeDownloadBegin, this.attributeDownloadEnd, _dataAttributeDownloadBeginFor, _dataAttributeDownloadEndFor);
		}
		if ((link.hasAttribute('target')) && (link.getAttribute('target') === '_blank')) {
			forceReadSimple(link, this.parser, this.prefixId, this.attributeTargetBlankBegin, this.attributeTargetBlankEnd, _dataAttributeTargetBeginFor, _dataAttributeTargetEndFor);
		}
		if (link.hasAttribute('href')) {
			forceRead(link, link.getAttribute('href'), this.parser, this.prefixId, this.attributeHrefPrefixBegin, this.attributeHrefSuffixBegin, this.attributeHrefPrefixEnd, this.attributeHrefSuffixEnd, _dataAttributeHrefBeginFor, _dataAttributeHrefEndFor);
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllLinksAttributes = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[download],[target="_blank"],[href]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayLinkAttributes(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayTitle = function(element) {
		if ((element.hasAttribute('title')) && (!isEmpty(element.getAttribute('title')))) {
			forceRead(element, element.getAttribute('title'), this.parser, this.prefixId, this.attributeTitlePrefixBegin, this.attributeTitleSuffixBegin, this.attributeTitlePrefixEnd, this.attributeTitleSuffixEnd, _dataAttributeTitleBeginFor, _dataAttributeTitleEndFor);
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllTitles = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[title]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayTitle(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayDragAndDrop = function(element) {
		var attributeValue;
		if (element.hasAttribute('draggable')) {
			forceReadSimple(element, this.parser, this.prefixId, this.attributeDraggableBegin, this.attributeDraggableEnd, _dataAttributeDraggableBeginFor, _dataAttributeDraggableEndFor);
		}
		if (element.hasAttribute('dropzone')) {
			attributeValue = element.getAttribute('dropzone');
			if (attributeValue === 'copy') {
				forceReadSimple(element, this.parser, this.prefixId, this.attributeDropzoneCopyBegin, this.attributeDropzoneCopyEnd, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor);
			} else if (attributeValue === 'move') {
				forceReadSimple(element, this.parser, this.prefixId, this.attributeDropzoneMoveBegin, this.attributeDropzoneMoveEnd, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor);
			} else if (attributeValue === 'link') {
				forceReadSimple(element, this.parser, this.prefixId, this.attributeDropzoneLinkBegin, this.attributeDropzoneLinkEnd, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor);
			}
		}
		if (element.hasAttribute('aria-dropeffect')) {
			attributeValue = element.getAttribute('aria-dropeffect');
			if (attributeValue === 'copy') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectCopyBegin, this.ariaDropeffectCopyEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'move') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectMoveBegin, this.ariaDropeffectMoveEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'link') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectLinkBegin, this.ariaDropeffectLinkEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'execute') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectExecuteBegin, this.ariaDropeffectExecuteEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			} else if (attributeValue === 'popup') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaDropeffectPopupBegin, this.ariaDropeffectPopupEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor);
			}
		}
		if (element.hasAttribute('aria-grabbed')) {
			attributeValue = element.getAttribute('aria-grabbed');
			if (attributeValue === 'true') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedTrueBegin, this.ariaGrabbedTrueEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor);
			} else if (attributeValue === 'false') {
				forceReadSimple(element, this.parser, this.prefixId, this.ariaGrabbedFalseBegin, this.ariaGrabbedFalseEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllDragsAndDrops = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[draggable],[dropzone],[aria-dropeffect],[aria-grabbed]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayDragAndDrop(element);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayLanguage = function(element) {
		var language, languageCode;
		if (element.hasAttribute('lang')) {
			languageCode = element.getAttribute('lang');
			language = this.languages[languageCode];
			if (!isEmpty(language)) {
				forceRead(element, language, this.parser, this.prefixId, this.attributeLanguagePrefixBegin, this.attributeLanguageSuffixBegin, this.attributeLanguagePrefixEnd, this.attributeLanguageSuffixEnd, _dataAttributeLanguageBeginFor, _dataAttributeLanguageEndFor);
			}
		} else if (element.hasAttribute('hreflang')) {
			languageCode = element.getAttribute('hreflang');
			language = this.languages[languageCode];
			if (!isEmpty(language)) {
				forceRead(element, language, this.parser, this.prefixId, this.attributeLanguagePrefixBegin, this.attributeLanguageSuffixBegin, this.attributeLanguagePrefixEnd, this.attributeLanguageSuffixEnd, _dataAttributeLanguageBeginFor, _dataAttributeLanguageEndFor);
			}
		}
	};

	AccessibleDisplayScreenReaderImplementation.prototype.displayAllLanguages = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[lang],[hreflang]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (exports.hatemile.util.CommonFunctions.isValidElement(element)) {
				this.displayLanguage(element);
			}
		}
	};

	return AccessibleDisplayScreenReaderImplementation;

})();
