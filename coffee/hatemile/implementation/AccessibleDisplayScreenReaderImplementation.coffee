###
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

###*
 * @class AccessibleDisplayScreenReaderImplementation
 * @classdesc The AccessibleDisplayScreenReaderImplementation class is official
 * implementation of AccessibleDisplay interface for screen readers.
 * @extends hatemile.AccessibleDisplay
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleDisplayScreenReaderImplementation
	
	_idContainerShortcuts = 'container-shortcuts'
	_idTextShortcuts = 'text-shortcuts'
	_classForceReadBefore = 'force-read-before'
	_classForceReadAfter = 'force-read-after'
	_dataAttributeRequiredBeforeOf = 'data-attributerequiredbeforeof'
	_dataAttributeRequiredAfterOf = 'data-attributerequiredafterof'
	_dataAttributeRangeMinBeforeOf = 'data-attributevalueminbeforeof'
	_dataAttributeRangeMinAfterOf = 'data-attributevalueminafterof'
	_dataAttributeRangeMaxBeforeOf = 'data-attributevaluemaxbeforeof'
	_dataAttributeRangeMaxAfterOf = 'data-attributevaluemaxafterof'
	_dataAttributeAutoCompleteBeforeOf = 'data-attributeautocompletebeforeof'
	_dataAttributeAutoCompleteAfterOf = 'data-attributeautocompleteafterof'
	_dataAttributeTitleBeforeOf = 'data-attributetitlebeforeof'
	_dataAttributeTitleAfterOf = 'data-attributetitleafterof'
	_dataAttributeHrefBeforeOf = 'data-attributehrefbeforeof'
	_dataAttributeHrefAfterOf = 'data-attributehrefafterof'
	_dataAttributeAccesskeyBeforeOf = 'data-attributeaccesskeybeforeof'
	_dataAttributeAccesskeyAfterOf = 'data-attributeaccesskeyafterof'
	_dataAttributeTargetBeforeOf = 'data-attributetargetbeforeof'
	_dataAttributeTargetAfterOf = 'data-attributetargetafterof'
	_dataAttributeDownloadBeforeOf = 'data-attributedownloadbeforeof'
	_dataAttributeDownloadAfterOf = 'data-attributedownloadafterof'
	_dataAttributeDraggableBeforeOf = 'data-attributedraggablebeforeof'
	_dataAttributeDraggableAfterOf = 'data-attributedraggableafterof'
	_dataAttributeDropzoneBeforeOf = 'data-attributedropzonebeforeof'
	_dataAttributeDropzoneAfterOf = 'data-attributedropzoneafterof'
	_dataAttributeLanguageBeforeOf = 'data-languagebeforeof'
	_dataAttributeLanguageAfterOf = 'data-languageafterof'
	_dataAttributeHeadersBeforeOf = 'data-headersbeforeof'
	_dataAttributeHeadersAfterOf = 'data-headersafterof'
	_dataAriaBusyBeforeOf = 'data-ariabusybeforeof'
	_dataAriaBusyAfterOf = 'data-ariabusyafterof'
	_dataAriaCheckedBeforeOf = 'data-ariacheckedbeforeof'
	_dataAriaCheckedAfterOf = 'data-ariacheckedafterof'
	_dataAriaDropeffectBeforeOf = 'data-ariadropeffectbeforeof'
	_dataAriaDropeffectAfterOf = 'data-ariadropeffectafterof'
	_dataAriaExpandedBeforeOf = 'data-ariaexpandedbeforeof'
	_dataAriaExpandedAfterOf = 'data-ariaexpandedafterof'
	_dataAriaGrabbedBeforeOf = 'data-ariagrabbedbeforeof'
	_dataAriaGrabbedAfterOf = 'data-ariagrabbedafterof'
	_dataAriaHaspopupBeforeOf = 'data-ariahaspopupbeforeof'
	_dataAriaHaspopupAfterOf = 'data-ariahaspopupafterof'
	_dataAriaInvalidBeforeOf = 'data-ariainvalidbeforeof'
	_dataAriaInvalidAfterOf = 'data-ariainvalidafterof'
	_dataAriaLevelBeforeOf = 'data-arialevelbeforeof'
	_dataAriaLevelAfterOf = 'data-arialevelafterof'
	_dataAriaOrientationBeforeOf = 'data-ariaorientationbeforeof'
	_dataAriaOrientationAfterOf = 'data-ariaorientationafterof'
	_dataAriaPressedBeforeOf = 'data-ariapressedbeforeof'
	_dataAriaPressedAfterOf = 'data-ariapressedafterof'
	_dataAriaSelectedBeforeOf = 'data-ariaselectedbeforeof'
	_dataAriaSelectedAfterOf = 'data-ariaselectedafterof'
	_dataAriaSortBeforeOf = 'data-ariasortbeforeof'
	_dataAriaSortAfterOf = 'data-ariasortafterof'
	_dataRoleBeforeOf = 'data-rolebeforeof'
	_dataRoleAfterOf = 'data-roleafterof'
	_dataInvalidURLBeforeOf = 'data-invalidurlbeforeof'
	_dataInvalidURLAfterOf = 'data-invalidurlafterof'
	_dataInvalidEmailBeforeOf = 'data-invalidemailbeforeof'
	_dataInvalidEmailAfterOf = 'data-invalidemailafterof'
	_dataInvalidRangeBeforeOf = 'data-invalidrangebeforeof'
	_dataInvalidRangeAfterOf = 'data-invalidrangeafterof'
	_dataInvalidLengthBeforeOf = 'data-invalidlengthbeforeof'
	_dataInvalidLengthAfterOf = 'data-invalidlengthafterof'
	_dataInvalidPatternBeforeOf = 'data-invalidpatternbeforeof'
	_dataInvalidPatternAfterOf = 'data-invalidpatternafterof'
	_dataInvalidRequiredBeforeOf = 'data-invalidrequiredbeforeof'
	_dataInvalidRequiredAfterOf = 'data-invalidrequiredafterof'
	_dataInvalidDateBeforeOf = 'data-invaliddatebeforeof'
	_dataInvalidDateAfterOf = 'data-invaliddateafterof'
	_dataInvalidTimeBeforeOf = 'data-invalidtimebeforeof'
	_dataInvalidTimeAfterOf = 'data-invalidtimeafterof'
	_dataInvalidDateTimeBeforeOf = 'data-invaliddatetimebeforeof'
	_dataInvalidDateTimeAfterOf = 'data-invaliddatetimeafterof'
	_dataInvalidMonthBeforeOf = 'data-invalidmonthbeforeof'
	_dataInvalidMonthAfterOf = 'data-invalidmonthafterof'
	_dataInvalidWeekBeforeOf = 'data-invalidweekbeforeof'
	_dataInvalidWeekAfterOf = 'data-invalidweekafterof'
	_dataInvalidURL = 'data-invalidurl'
	_dataInvalidEmail = 'data-invalidemail'
	_dataInvalidRange = 'data-invalidrange'
	_dataInvalidLength = 'data-invalidlength'
	_dataInvalidPattern = 'data-invalidpattern'
	_dataInvalidRequired = 'data-invalidrequired'
	_dataInvalidDate = 'data-invaliddate'
	_dataInvalidTime = 'data-invalidtime'
	_dataInvalidDateTime = 'data-invaliddatetime'
	_dataInvalidMonth = 'data-invalidmonth'
	_dataInvalidWeek = 'data-invalidweek'
	
	constructor: (@parser, configure, userAgent) ->
		@shortcutPrefix = getShortcutPrefix(userAgent)
		
		@listShortcutsAdded = false
		@listShortcuts = undefined
		
		@prefixId = configure.getParameter('prefix-generated-ids')
		
		@attributeTitlePrefixBefore = configure.getParameter('attribute-title-prefix-before')
		@attributeTitleSuffixBefore = configure.getParameter('attribute-title-suffix-before')
		@attributeTitlePrefixAfter = configure.getParameter('attribute-title-prefix-after')
		@attributeTitleSuffixAfter = configure.getParameter('attribute-title-suffix-after')
		@attributeHrefPrefixBefore = configure.getParameter('attribute-href-prefix-before')
		@attributeHrefSuffixBefore = configure.getParameter('attribute-href-suffix-before')
		@attributeHrefPrefixAfter = configure.getParameter('attribute-href-prefix-after')
		@attributeHrefSuffixAfter = configure.getParameter('attribute-href-suffix-after')
		@attributeAccesskeyPrefixBefore = configure.getParameter('attribute-accesskey-prefix-before')
		@attributeAccesskeySuffixBefore = configure.getParameter('attribute-accesskey-suffix-before')
		@attributeAccesskeyPrefixAfter = configure.getParameter('attribute-accesskey-prefix-after')
		@attributeAccesskeySuffixAfter = configure.getParameter('attribute-accesskey-suffix-after')
		@attributeTargetBlankBefore = configure.getParameter('attribute-target-blank-before')
		@attributeTargetBlankAfter = configure.getParameter('attribute-target-blank-after')
		@attributeDownloadBefore = configure.getParameter('attribute-download-before')
		@attributeDownloadAfter = configure.getParameter('attribute-download-after')
		@attributeDraggableBefore = configure.getParameter('attribute-draggable-before')
		@attributeDraggableAfter = configure.getParameter('attribute-draggable-after')
		@attributeDropzoneCopyBefore = configure.getParameter('attribute-dropzone-copy-before')
		@attributeDropzoneCopyAfter = configure.getParameter('attribute-dropzone-copy-after')
		@attributeDropzoneMoveBefore = configure.getParameter('attribute-dropzone-move-before')
		@attributeDropzoneMoveAfter = configure.getParameter('attribute-dropzone-move-after')
		@attributeDropzoneLinkBefore = configure.getParameter('attribute-dropzone-link-before')
		@attributeDropzoneLinkAfter = configure.getParameter('attribute-dropzone-link-after')
		@attributeHeadersPrefixBefore = configure.getParameter('attribute-headers-prefix-before')
		@attributeHeadersSuffixBefore = configure.getParameter('attribute-headers-suffix-before')
		@attributeHeadersPrefixAfter = configure.getParameter('attribute-headers-prefix-after')
		@attributeHeadersSuffixAfter = configure.getParameter('attribute-headers-suffix-after')
		@attributeLanguagePrefixBefore = configure.getParameter('attribute-language-prefix-before')
		@attributeLanguageSuffixBefore = configure.getParameter('attribute-language-suffix-before')
		@attributeLanguagePrefixAfter = configure.getParameter('attribute-language-prefix-after')
		@attributeLanguageSuffixAfter = configure.getParameter('attribute-language-suffix-after')
		@attributeRolePrefixBefore = configure.getParameter('attribute-role-prefix-before')
		@attributeRoleSuffixBefore = configure.getParameter('attribute-role-suffix-before')
		@attributeRolePrefixAfter = configure.getParameter('attribute-role-prefix-after')
		@attributeRoleSuffixAfter = configure.getParameter('attribute-role-suffix-after')
		
		@ariaAutoCompleteBothBefore = configure.getParameter('aria-autocomplete-both-before')
		@ariaAutoCompleteBothAfter = configure.getParameter('aria-autocomplete-both-after')
		@ariaAutoCompleteInlineBefore = configure.getParameter('aria-autocomplete-inline-before')
		@ariaAutoCompleteInlineAfter = configure.getParameter('aria-autocomplete-inline-after')
		@ariaAutoCompleteListBefore = configure.getParameter('aria-autocomplete-list-before')
		@ariaAutoCompleteListAfter = configure.getParameter('aria-autocomplete-list-after')
		@ariaBusyTrueBefore = configure.getParameter('aria-busy-true-before')
		@ariaBusyTrueAfter = configure.getParameter('aria-busy-true-after')
		@ariaCheckedFalseBefore = configure.getParameter('aria-checked-false-before')
		@ariaCheckedFalseAfter = configure.getParameter('aria-checked-false-after')
		@ariaCheckedMixedBefore = configure.getParameter('aria-checked-mixed-before')
		@ariaCheckedMixedAfter = configure.getParameter('aria-checked-mixed-after')
		@ariaCheckedTrueBefore = configure.getParameter('aria-checked-true-before')
		@ariaCheckedTrueAfter = configure.getParameter('aria-checked-true-after')
		@ariaDropeffectCopyBefore = configure.getParameter('aria-dropeffect-copy-before')
		@ariaDropeffectCopyAfter = configure.getParameter('aria-dropeffect-copy-after')
		@ariaDropeffectExecuteBefore = configure.getParameter('aria-dropeffect-execute-before')
		@ariaDropeffectExecuteAfter = configure.getParameter('aria-dropeffect-execute-after')
		@ariaDropeffectLinkBefore = configure.getParameter('aria-dropeffect-link-before')
		@ariaDropeffectLinkAfter = configure.getParameter('aria-dropeffect-link-after')
		@ariaDropeffectMoveBefore = configure.getParameter('aria-dropeffect-move-before')
		@ariaDropeffectMoveAfter = configure.getParameter('aria-dropeffect-move-after')
		@ariaDropeffectPopupBefore = configure.getParameter('aria-dropeffect-popup-before')
		@ariaDropeffectPopupAfter = configure.getParameter('aria-dropeffect-popup-after')
		@ariaExpandedFalseBefore = configure.getParameter('aria-expanded-false-before')
		@ariaExpandedFalseAfter = configure.getParameter('aria-expanded-false-after')
		@ariaExpandedTrueBefore = configure.getParameter('aria-expanded-true-before')
		@ariaExpandedTrueAfter = configure.getParameter('aria-expanded-true-after')
		@ariaGrabbedFalseBefore = configure.getParameter('aria-grabbed-false-before')
		@ariaGrabbedFalseAfter = configure.getParameter('aria-grabbed-false-after')
		@ariaGrabbedTrueBefore = configure.getParameter('aria-grabbed-true-before')
		@ariaGrabbedTrueAfter = configure.getParameter('aria-grabbed-true-after')
		@ariaHaspopupTrueBefore = configure.getParameter('aria-haspopup-true-before')
		@ariaHaspopupTrueAfter = configure.getParameter('aria-haspopup-true-after')
		@ariaInvalidTrueBefore = configure.getParameter('aria-invalid-true-before')
		@ariaInvalidTrueAfter = configure.getParameter('aria-invalid-true-after')
		@ariaLevelPrefixBefore = configure.getParameter('aria-level-prefix-before')
		@ariaLevelSuffixBefore = configure.getParameter('aria-level-suffix-before')
		@ariaLevelPrefixAfter = configure.getParameter('aria-level-prefix-after')
		@ariaLevelSuffixAfter = configure.getParameter('aria-level-suffix-after')
		@ariaValueMaximumPrefixBefore = configure.getParameter('aria-value-maximum-prefix-before')
		@ariaValueMaximumSuffixBefore = configure.getParameter('aria-value-maximum-suffix-before')
		@ariaValueMaximumPrefixAfter = configure.getParameter('aria-value-maximum-prefix-after')
		@ariaValueMaximumSuffixAfter = configure.getParameter('aria-value-maximum-suffix-after')
		@ariaValueMinimumPrefixBefore = configure.getParameter('aria-value-minimum-prefix-before')
		@ariaValueMinimumSuffixBefore = configure.getParameter('aria-value-minimum-suffix-before')
		@ariaValueMinimumPrefixAfter = configure.getParameter('aria-value-minimum-prefix-after')
		@ariaValueMinimumSuffixAfter = configure.getParameter('aria-value-minimum-suffix-after')
		@ariaOrientationHorizontalBefore = configure.getParameter('aria-orientation-horizontal-before')
		@ariaOrientationHorizontalAfter = configure.getParameter('aria-orientation-horizontal-after')
		@ariaOrientationVerticalBefore = configure.getParameter('aria-orientation-vertical-before')
		@ariaOrientationVerticalAfter = configure.getParameter('aria-orientation-vertical-after')
		@ariaPressedFalseBefore = configure.getParameter('aria-pressed-false-before')
		@ariaPressedFalseAfter = configure.getParameter('aria-pressed-false-after')
		@ariaPressedMixedBefore = configure.getParameter('aria-pressed-mixed-before')
		@ariaPressedMixedAfter = configure.getParameter('aria-pressed-mixed-after')
		@ariaPressedTrueBefore = configure.getParameter('aria-pressed-true-before')
		@ariaPressedTrueAfter = configure.getParameter('aria-pressed-true-after')
		@ariaRequiredTrueBefore = configure.getParameter('aria-required-true-before')
		@ariaRequiredTrueAfter = configure.getParameter('aria-required-true-after')
		@ariaSelectedFalseBefore = configure.getParameter('aria-selected-false-before')
		@ariaSelectedFalseAfter = configure.getParameter('aria-selected-false-after')
		@ariaSelectedTrueBefore = configure.getParameter('aria-selected-true-before')
		@ariaSelectedTrueAfter = configure.getParameter('aria-selected-true-after')
		@ariaSortAscendingBefore = configure.getParameter('aria-sort-ascending-before')
		@ariaSortAscendingAfter = configure.getParameter('aria-sort-ascending-after')
		@ariaSortDescendingBefore = configure.getParameter('aria-sort-descending-before')
		@ariaSortDescendingAfter = configure.getParameter('aria-sort-descending-after')
		@ariaSortOtherBefore = configure.getParameter('aria-sort-other-before')
		@ariaSortOtherAfter = configure.getParameter('aria-sort-other-after')
		
		@dataInvalidUrlBefore = configure.getParameter('data-invalid-url-before')
		@dataInvalidUrlAfter = configure.getParameter('data-invalid-url-after')
		@dataInvalidEmailBefore = configure.getParameter('data-invalid-email-before')
		@dataInvalidEmailAfter = configure.getParameter('data-invalid-email-after')
		@dataInvalidRangeBefore = configure.getParameter('data-invalid-range-before')
		@dataInvalidRangeAfter = configure.getParameter('data-invalid-range-after')
		@dataInvalidLengthBefore = configure.getParameter('data-invalid-length-before')
		@dataInvalidLengthAfter = configure.getParameter('data-invalid-length-after')
		@dataInvalidPatternBefore = configure.getParameter('data-invalid-pattern-before')
		@dataInvalidPatternAfter = configure.getParameter('data-invalid-pattern-after')
		@dataInvalidRequiredBefore = configure.getParameter('data-invalid-required-before')
		@dataInvalidRequiredAfter = configure.getParameter('data-invalid-required-after')
		@dataInvalidDateBefore = configure.getParameter('data-invalid-date-before')
		@dataInvalidDateAfter = configure.getParameter('data-invalid-date-after')
		@dataInvalidTimeBefore = configure.getParameter('data-invalid-time-before')
		@dataInvalidTimeAfter = configure.getParameter('data-invalid-time-after')
		@dataInvalidDateTimeBefore = configure.getParameter('data-invalid-datetime-before')
		@dataInvalidDateTimeAfter = configure.getParameter('data-invalid-datetime-after')
		@dataInvalidMonthBefore = configure.getParameter('data-invalid-month-before')
		@dataInvalidMonthAfter = configure.getParameter('data-invalid-month-after')
		@dataInvalidWeekBefore = configure.getParameter('data-invalid-week-before')
		@dataInvalidWeekAfter = configure.getParameter('data-invalid-week-after')
		
		@roles = {
			'alert': configure.getParameter('role-alert')
			'alertdialog': configure.getParameter('role-alertdialog')
			'application': configure.getParameter('role-application')
			'article': configure.getParameter('role-article')
			'banner': configure.getParameter('role-banner')
			'button': configure.getParameter('role-button')
			'checkbox': configure.getParameter('role-checkbox')
			'columnheader': configure.getParameter('role-columnheader')
			'combobox': configure.getParameter('role-combobox')
			'complementary': configure.getParameter('role-complementary')
			'contentinfo': configure.getParameter('role-contentinfo')
			'definition': configure.getParameter('role-definition')
			'dialog': configure.getParameter('role-dialog')
			'directory': configure.getParameter('role-directory')
			'document': configure.getParameter('role-document')
			'form': configure.getParameter('role-form')
			'grid': configure.getParameter('role-grid')
			'gridcell': configure.getParameter('role-gridcell')
			'group': configure.getParameter('role-group')
			'heading': configure.getParameter('role-heading')
			'img': configure.getParameter('role-img')
			'link': configure.getParameter('role-link')
			'list': configure.getParameter('role-list')
			'listbox': configure.getParameter('role-listbox')
			'listitem': configure.getParameter('role-listitem')
			'log': configure.getParameter('role-log')
			'main': configure.getParameter('role-main')
			'marquee': configure.getParameter('role-marquee')
			'math': configure.getParameter('role-math')
			'menu': configure.getParameter('role-menu')
			'menubar': configure.getParameter('role-menubar')
			'menuitem': configure.getParameter('role-menuitem')
			'menuitemcheckbox': configure.getParameter('role-menuitemcheckbox')
			'menuitemradio': configure.getParameter('role-menuitemradio')
			'navigation': configure.getParameter('role-navigation')
			'note': configure.getParameter('role-note')
			'option': configure.getParameter('role-option')
			'presentation': configure.getParameter('role-presentation')
			'progressbar': configure.getParameter('role-progressbar')
			'radio': configure.getParameter('role-radio')
			'radiogroup': configure.getParameter('role-radiogroup')
			'region': configure.getParameter('role-region')
			'row': configure.getParameter('role-row')
			'rowgroup': configure.getParameter('role-rowgroup')
			'rowheader': configure.getParameter('role-rowheader')
			'scrollbar': configure.getParameter('role-scrollbar')
			'search': configure.getParameter('role-search')
			'separator': configure.getParameter('role-separator')
			'slider': configure.getParameter('role-slider')
			'spinbutton': configure.getParameter('role-spinbutton')
			'status': configure.getParameter('role-status')
			'tab': configure.getParameter('role-tab')
			'tablist': configure.getParameter('role-tablist')
			'tabpanel': configure.getParameter('role-tabpanel')
			'textbox': configure.getParameter('role-textbox')
			'timer': configure.getParameter('role-timer')
			'toolbar': configure.getParameter('role-toolbar')
			'tooltip': configure.getParameter('role-tooltip')
			'tree': configure.getParameter('role-tree')
			'treegrid': configure.getParameter('role-treegrid')
			'treeitem': configure.getParameter('role-treeitem')
		}
		
		@languages = {
			'aa': configure.getParameter('language-aa')
			'ab': configure.getParameter('language-ab')
			'ae': configure.getParameter('language-ae')
			'af': configure.getParameter('language-af')
			'ak': configure.getParameter('language-ak')
			'am': configure.getParameter('language-am')
			'an': configure.getParameter('language-an')
			'ar': configure.getParameter('language-ar')
			'as': configure.getParameter('language-as')
			'av': configure.getParameter('language-av')
			'ay': configure.getParameter('language-ay')
			'az': configure.getParameter('language-az')
			'ba': configure.getParameter('language-ba')
			'be': configure.getParameter('language-be')
			'bg': configure.getParameter('language-bg')
			'bh': configure.getParameter('language-bh')
			'bi': configure.getParameter('language-bi')
			'bm': configure.getParameter('language-bm')
			'bn': configure.getParameter('language-bn')
			'bo': configure.getParameter('language-bo')
			'br': configure.getParameter('language-br')
			'bs': configure.getParameter('language-bs')
			'ca': configure.getParameter('language-ca')
			'ce': configure.getParameter('language-ce')
			'ch': configure.getParameter('language-ch')
			'co': configure.getParameter('language-co')
			'cr': configure.getParameter('language-cr')
			'cs': configure.getParameter('language-cs')
			'cu': configure.getParameter('language-cu')
			'cv': configure.getParameter('language-cv')
			'cy': configure.getParameter('language-cy')
			'da': configure.getParameter('language-da')
			'de': configure.getParameter('language-de')
			'dv': configure.getParameter('language-dv')
			'dz': configure.getParameter('language-dz')
			'ee': configure.getParameter('language-ee')
			'el': configure.getParameter('language-el')
			'en': configure.getParameter('language-en')
			'eo': configure.getParameter('language-eo')
			'es': configure.getParameter('language-es')
			'et': configure.getParameter('language-et')
			'eu': configure.getParameter('language-eu')
			'fa': configure.getParameter('language-fa')
			'ff': configure.getParameter('language-ff')
			'fi': configure.getParameter('language-fi')
			'fj': configure.getParameter('language-fj')
			'fo': configure.getParameter('language-fo')
			'fr': configure.getParameter('language-fr')
			'fy': configure.getParameter('language-fy')
			'ga': configure.getParameter('language-ga')
			'gd': configure.getParameter('language-gd')
			'gl': configure.getParameter('language-gl')
			'gn': configure.getParameter('language-gn')
			'gu': configure.getParameter('language-gu')
			'gv': configure.getParameter('language-gv')
			'ha': configure.getParameter('language-ha')
			'he': configure.getParameter('language-he')
			'hi': configure.getParameter('language-hi')
			'ho': configure.getParameter('language-ho')
			'hr': configure.getParameter('language-hr')
			'ht': configure.getParameter('language-ht')
			'hu': configure.getParameter('language-hu')
			'hy': configure.getParameter('language-hy')
			'hz': configure.getParameter('language-hz')
			'ia': configure.getParameter('language-ia')
			'id': configure.getParameter('language-id')
			'ie': configure.getParameter('language-ie')
			'ig': configure.getParameter('language-ig')
			'ii': configure.getParameter('language-ii')
			'ik': configure.getParameter('language-ik')
			'io': configure.getParameter('language-io')
			'is': configure.getParameter('language-is')
			'it': configure.getParameter('language-it')
			'iu': configure.getParameter('language-iu')
			'ja': configure.getParameter('language-ja')
			'jv': configure.getParameter('language-jv')
			'ka': configure.getParameter('language-ka')
			'kg': configure.getParameter('language-kg')
			'ki': configure.getParameter('language-ki')
			'kj': configure.getParameter('language-kj')
			'kk': configure.getParameter('language-kk')
			'kl': configure.getParameter('language-kl')
			'km': configure.getParameter('language-km')
			'kn': configure.getParameter('language-kn')
			'ko': configure.getParameter('language-ko')
			'kr': configure.getParameter('language-kr')
			'ks': configure.getParameter('language-ks')
			'ku': configure.getParameter('language-ku')
			'kv': configure.getParameter('language-kv')
			'kw': configure.getParameter('language-kw')
			'ky': configure.getParameter('language-ky')
			'la': configure.getParameter('language-la')
			'lb': configure.getParameter('language-lb')
			'lg': configure.getParameter('language-lg')
			'li': configure.getParameter('language-li')
			'ln': configure.getParameter('language-ln')
			'lo': configure.getParameter('language-lo')
			'lt': configure.getParameter('language-lt')
			'lu': configure.getParameter('language-lu')
			'lv': configure.getParameter('language-lv')
			'mg': configure.getParameter('language-mg')
			'mh': configure.getParameter('language-mh')
			'mi': configure.getParameter('language-mi')
			'mk': configure.getParameter('language-mk')
			'ml': configure.getParameter('language-ml')
			'mn': configure.getParameter('language-mn')
			'mr': configure.getParameter('language-mr')
			'ms': configure.getParameter('language-ms')
			'mt': configure.getParameter('language-mt')
			'my': configure.getParameter('language-my')
			'na': configure.getParameter('language-na')
			'nb': configure.getParameter('language-nb')
			'nd': configure.getParameter('language-nd')
			'ne': configure.getParameter('language-ne')
			'ng': configure.getParameter('language-ng')
			'nl': configure.getParameter('language-nl')
			'nn': configure.getParameter('language-nn')
			'no': configure.getParameter('language-no')
			'nr': configure.getParameter('language-nr')
			'nv': configure.getParameter('language-nv')
			'ny': configure.getParameter('language-ny')
			'oc': configure.getParameter('language-oc')
			'oj': configure.getParameter('language-oj')
			'om': configure.getParameter('language-om')
			'or': configure.getParameter('language-or')
			'os': configure.getParameter('language-os')
			'pa': configure.getParameter('language-pa')
			'pi': configure.getParameter('language-pi')
			'pl': configure.getParameter('language-pl')
			'ps': configure.getParameter('language-ps')
			'pt': configure.getParameter('language-pt')
			'qu': configure.getParameter('language-qu')
			'rm': configure.getParameter('language-rm')
			'rn': configure.getParameter('language-rn')
			'ro': configure.getParameter('language-ro')
			'ru': configure.getParameter('language-ru')
			'rw': configure.getParameter('language-rw')
			'sa': configure.getParameter('language-sa')
			'sc': configure.getParameter('language-sc')
			'sd': configure.getParameter('language-sd')
			'se': configure.getParameter('language-se')
			'sg': configure.getParameter('language-sg')
			'si': configure.getParameter('language-si')
			'sk': configure.getParameter('language-sk')
			'sl': configure.getParameter('language-sl')
			'sm': configure.getParameter('language-sm')
			'sn': configure.getParameter('language-sn')
			'so': configure.getParameter('language-so')
			'sq': configure.getParameter('language-sq')
			'sr': configure.getParameter('language-sr')
			'ss': configure.getParameter('language-ss')
			'st': configure.getParameter('language-st')
			'su': configure.getParameter('language-su')
			'sv': configure.getParameter('language-sv')
			'sw': configure.getParameter('language-sw')
			'ta': configure.getParameter('language-ta')
			'te': configure.getParameter('language-te')
			'tg': configure.getParameter('language-tg')
			'th': configure.getParameter('language-th')
			'ti': configure.getParameter('language-ti')
			'tk': configure.getParameter('language-tk')
			'tl': configure.getParameter('language-tl')
			'tn': configure.getParameter('language-tn')
			'to': configure.getParameter('language-to')
			'tr': configure.getParameter('language-tr')
			'ts': configure.getParameter('language-ts')
			'tt': configure.getParameter('language-tt')
			'tw': configure.getParameter('language-tw')
			'ty': configure.getParameter('language-ty')
			'ug': configure.getParameter('language-ug')
			'uk': configure.getParameter('language-uk')
			'ur': configure.getParameter('language-ur')
			'uz': configure.getParameter('language-uz')
			've': configure.getParameter('language-ve')
			'vi': configure.getParameter('language-vi')
			'vo': configure.getParameter('language-vo')
			'wa': configure.getParameter('language-wa')
			'wo': configure.getParameter('language-wo')
			'xh': configure.getParameter('language-xh')
			'yi': configure.getParameter('language-yi')
			'yo': configure.getParameter('language-yo')
			'za': configure.getParameter('language-za')
			'zh': configure.getParameter('language-zh')
			'zu': configure.getParameter('language-zu')
		}
	
	getShortcutPrefix = (userAgent) ->
		if not isEmpty(userAgent)
			userAgent = userAgent.toLowerCase()
			opera = userAgent.indexOf('opera') > -1
			mac = userAgent.indexOf('mac') > -1
			konqueror = userAgent.indexOf('konqueror') > -1
			spoofer = userAgent.indexOf('spoofer') > -1
			safari = userAgent.indexOf('applewebkit') > -1
			windows = userAgent.indexOf('windows') > -1
			chrome = userAgent.indexOf('chrome') > -1
			firefox = /firefox\/[2-9]|minefield\/3/.test(userAgent)
			ie = (userAgent.indexOf('msie') > -1) or (userAgent.indexOf('trident') > -1)
			
			if opera
				return 'SHIFT + ESC'
			else if chrome and mac and (not spoofer)
				return 'CTRL + OPTION'
			else if chrome or ie
				return 'ALT'
			else if safari and (not windows) and (not spoofer)
				return 'CTRL + ALT'
			else if (not windows) and (safari or mac or konqueror)
				return 'CTRL'
			else if firefox
				return 'ALT + SHIFT'
		else
			return 'ALT'
	
	###*
	 * Returns the description of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with description.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {string} The description of element.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	getDescription = (element, parser) ->
		description = undefined
		if element.hasAttribute('title')
			description = element.getAttribute('title')
		else if element.hasAttribute('aria-label')
			description = element.getAttribute('aria-label')
		else if element.hasAttribute('alt')
			description = element.getAttribute('alt')
		else if element.hasAttribute('label')
			description = element.getAttribute('label')
		else if element.hasAttribute('aria-labelledby') or element.hasAttribute('aria-describedby')
			if element.hasAttribute('aria-labelledby')
				descriptionIds = element.getAttribute('aria-labelledby').split(new RegExp('[ \n\t\r]+'))
			else
				descriptionIds = element.getAttribute('aria-describedby').split(new RegExp('[ \n\t\r]+'))
			for descriptionId in descriptionIds
				elementDescription = parser.find("##{descriptionId}").firstResult()
				if not isEmpty(elementDescription)
					description = elementDescription.getTextContent()
					break
		else if (element.getTagName() is 'INPUT') and (element.hasAttribute('type'))
			type = element.getAttribute('type').toLowerCase()
			if ((type is 'button') or (type is 'submit') or (type is 'reset')) and (element.hasAttribute('value'))
				description = element.getAttribute('value')
		if isEmpty(description)
			description = element.getTextContent()
		return description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ')
	
	###*
	 * Generate the list of shortcuts of page.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} textShortcuts The text of description of container of
	 * shortcuts descriptions.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of shortcuts of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListShortcuts = (parser, textShortcuts) ->
		container = parser.find("##{_idContainerShortcuts}").firstResult()
		if isEmpty(container)
			local = parser.find('body').firstResult()
			if not isEmpty(local)
				container = parser.createElement('div')
				container.setAttribute('id', _idContainerShortcuts)
				
				textContainer = parser.createElement('span')
				textContainer.setAttribute('id', _idTextShortcuts)
				textContainer.appendText(textShortcuts)
				
				container.appendElement(textContainer)
				local.appendElement(container)
		list = undefined
		if not isEmpty(container)
			list = parser.find(container).findChildren('ul').firstResult()
			if isEmpty(list)
				list = parser.createElement('ul')
				container.appendElement(list)
		return list
	
	insertBefore = (element, insertedElement, parser) ->
		tagName = element.getTagName()
		tags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH']
		controls = ['INPUT', 'SELECT', 'TEXTAREA']
		if tagName is 'HTML'
			body = parser.find('body').firstResult()
			if not isEmpty(body)
				insertBefore(body, insertedElement, parser)
		else if (tags.indexOf(tagName) > -1)
			element.prependElement(insertedElement)
		else if (controls.indexOf(tagName) > -1)
			if element.hasAttribute('id')
				labels = parser.find("label[for=\"#{element.getAttribute('id')}\"]").listResults()
			if isEmpty(labels)
				labels = parser.find(element).findAncestors('label').listResults()
			for label in labels
				insertBefore(label, insertedElement, parser)
		else
			element.insertBefore(insertedElement)
		return
	
	insertAfter = (element, insertedElement, parser) ->
		tagName = element.getTagName()
		appendTags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH']
		controls = ['INPUT', 'SELECT', 'TEXTAREA']
		if tagName is 'HTML'
			body = parser.find('body').firstResult()
			if not isEmpty(body)
				insertAfter(body, insertedElement, parser)
		else if appendTags.indexOf(tagName) > -1
			element.appendElement(insertedElement)
		else if (controls.indexOf(tagName) > -1)
			if element.hasAttribute('id')
				labels = parser.find("label[for=\"#{element.getAttribute('id')}\"]").listResults()
			if isEmpty(labels)
				labels = parser.find(element).findAncestors('label').listResults()
			for label in labels
				insertAfter(label, insertedElement, parser)
		else
			element.insertAfter(insertedElement)
		return
	
	forceReadSimple = (element, parser, prefixId, textBefore, textAfter, dataBeforeOf, dataAfterOf) ->
		exports.hatemile.util.CommonFunctions.generateId(element, prefixId)
		identifier = element.getAttribute('id')
		
		if not isEmpty(textBefore)
			referenceBefore = parser.find(".#{_classForceReadBefore}[#{dataBeforeOf}=\"#{identifier}\"]").firstResult()
			
			if not isEmpty(referenceBefore)
				referenceBefore.removeNode()
				referenceBefore = undefined
			
			span = parser.createElement('span')
			span.setAttribute('class', _classForceReadBefore)
			span.setAttribute(dataBeforeOf, identifier)
			span.appendText(textBefore)
			insertBefore(element, span, parser)
		if not isEmpty(textAfter)
			referenceAfter = parser.find(".#{_classForceReadAfter}[#{dataAfterOf}=\"#{identifier}\"]").firstResult()
			
			if not isEmpty(referenceAfter)
				referenceAfter.removeNode()
				referenceAfter = undefined
			
			span = parser.createElement('span')
			span.setAttribute('class', _classForceReadAfter)
			span.setAttribute(dataAfterOf, identifier)
			span.appendText(textAfter)
			insertAfter(element, span, parser)
		return
	
	forceRead = (element, value, parser, prefixId, textPrefixBefore, textSuffixBefore, textPrefixAfter, textSuffixAfter, dataBeforeOf, dataAfterOf) ->
		if (not isEmpty(textPrefixBefore)) or (not isEmpty(textSuffixBefore))
			textBefore = "#{textPrefixBefore}#{value}#{textSuffixBefore}"
		else
			textBefore = ''
		if (not isEmpty(textPrefixAfter)) or (not isEmpty(textSuffixAfter))
			textAfter = "#{textPrefixAfter}#{value}#{textSuffixAfter}"
		else
			textAfter = ''
		forceReadSimple(element, parser, prefixId, textBefore, textAfter, dataBeforeOf, dataAfterOf)
		return
	
	displayShortcut: (element) ->
		if element.hasAttribute('accesskey')
			description = getDescription(element, @parser)
			if not element.hasAttribute('title')
				element.setAttribute('title', description)
			
			if not @listShortcutsAdded
				@listShortcuts = generateListShortcuts(@parser, "#{@attributeAccesskeyPrefixBefore}#{@attributeAccesskeySuffixBefore}")
				@listShortcutsAdded = true
			
			if not isEmpty(@listShortcuts)
				keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
				for key in keys
					key = key.toUpperCase()
					if isEmpty(@parser.find(@listShortcuts).findChildren("[#{_dataAttributeAccesskeyBeforeOf}=\"#{key}\"]").firstResult())
						item = @parser.createElement('li')
						item.setAttribute(_dataAttributeAccesskeyBeforeOf, key)
						item.setAttribute(_dataAttributeAccesskeyAfterOf, key)
						item.appendText("#{@shortcutPrefix} + #{key}: #{description}")
						@listShortcuts.appendElement(item)
		return
	
	displayAllShortcuts: () ->
		elements = @parser.find('[accesskey]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayShortcut(element)
		return
	
	displayRole: (element) ->
		if element.hasAttribute('role')
			role = element.getAttribute('role')
			roleDescription = @roles[role]
			if not isEmpty(roleDescription)
				forceRead(element, roleDescription, @parser, @prefixId, @attributeRolePrefixBefore, @attributeRoleSuffixBefore, @attributeRolePrefixAfter, @attributeRoleSuffixAfter, _dataRoleBeforeOf, _dataRoleAfterOf)
		return
	
	displayAllRoles: () ->
		elements = @parser.find('[role]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayRole(element)
		return
	
	displayCellHeader: (tableCell) ->
		if tableCell.hasAttribute('headers')
			textHeader = undefined
			idsHeaders = tableCell.getAttribute('headers').split(new RegExp('[ \n\t\r]+'))
			for idHeader in idsHeaders
				header = @parser.find("##{idHeader}").firstResult()
				if not isEmpty(header)
					if textHeader is undefined
						textHeader = header.getTextContent()
					else
						textHeader = "#{textHeader} #{header.getTextContent()}"
			if not isEmpty(textHeader)
				forceRead(tableCell, textHeader, @parser, @prefixId, @attributeHeadersPrefixBefore, @attributeHeadersSuffixBefore, @attributeHeadersPrefixAfter, @attributeHeadersSuffixAfter, _dataAttributeHeadersBeforeOf, _dataAttributeHeadersAfterOf)
		return
	
	displayAllCellHeaders: () ->
		elements = @parser.find('td[headers],th[headers]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayCellHeader(element)
		return
	
	displayWAIARIAStates: (element) ->
		if (element.hasAttribute('aria-busy')) and (element.getAttribute('aria-busy') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaBusyTrueBefore, @ariaBusyTrueAfter, _dataAriaBusyBeforeOf, _dataAriaBusyAfterOf)
		if element.hasAttribute('aria-checked')
			attributeValue = element.getAttribute('aria-checked')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaCheckedTrueBefore, @ariaCheckedTrueAfter, _dataAriaCheckedBeforeOf, _dataAriaCheckedAfterOf)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaCheckedFalseBefore, @ariaCheckedFalseAfter, _dataAriaCheckedBeforeOf, _dataAriaCheckedAfterOf)
			else if attributeValue is 'mixed'
				forceReadSimple(element, @parser, @prefixId, @ariaCheckedMixedBefore, @ariaCheckedMixedAfter, _dataAriaCheckedBeforeOf, _dataAriaCheckedAfterOf)
		if element.hasAttribute('aria-dropeffect')
			attributeValue = element.getAttribute('aria-dropeffect')
			if attributeValue is 'copy'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectCopyBefore, @ariaDropeffectCopyAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'move'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectMoveBefore, @ariaDropeffectMoveAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'link'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectLinkBefore, @ariaDropeffectLinkAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'execute'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectExecuteBefore, @ariaDropeffectExecuteAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'popup'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectPopupBefore, @ariaDropeffectPopupAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
		if element.hasAttribute('aria-expanded')
			attributeValue = element.getAttribute('aria-expanded')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaExpandedTrueBefore, @ariaExpandedTrueAfter, _dataAriaExpandedBeforeOf, _dataAriaExpandedAfterOf)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaExpandedFalseBefore, @ariaExpandedFalseAfter, _dataAriaExpandedBeforeOf, _dataAriaExpandedAfterOf)
		if element.hasAttribute('aria-grabbed')
			attributeValue = element.getAttribute('aria-grabbed')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedTrueBefore, @ariaGrabbedTrueAfter, _dataAriaGrabbedBeforeOf, _dataAriaGrabbedAfterOf)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedFalseBefore, @ariaGrabbedFalseAfter, _dataAriaGrabbedBeforeOf, _dataAriaGrabbedAfterOf)
		if (element.hasAttribute('aria-haspopup')) and (element.getAttribute('aria-haspopup') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaHaspopupTrueBefore, @ariaHaspopupTrueAfter, _dataAriaHaspopupBeforeOf, _dataAriaHaspopupAfterOf)
		if (element.hasAttribute('aria-invalid')) and (element.getAttribute('aria-invalid') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaInvalidTrueBefore, @ariaInvalidTrueAfter, _dataAriaInvalidBeforeOf, _dataAriaInvalidAfterOf)
			if element.hasAttribute(_dataInvalidLength)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidLengthBefore, @dataInvalidLengthAfter, _dataInvalidLengthBeforeOf, _dataInvalidLengthAfterOf)
			if element.hasAttribute(_dataInvalidPattern)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidPatternBefore, @dataInvalidPatternAfter, _dataInvalidPatternBeforeOf, _dataInvalidPatternAfterOf)
			if element.hasAttribute(_dataInvalidRequired)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidRequiredBefore, @dataInvalidRequiredAfter, _dataInvalidRequiredBeforeOf, _dataInvalidRequiredAfterOf)
			if element.hasAttribute(_dataInvalidURL)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidUrlBefore, @dataInvalidUrlAfter, _dataInvalidURLBeforeOf, _dataInvalidURLAfterOf)
			else if element.hasAttribute(_dataInvalidEmail)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidEmailBefore, @dataInvalidEmailAfter, _dataInvalidEmailBeforeOf, _dataInvalidEmailAfterOf)
			else if element.hasAttribute(_dataInvalidRange)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidRangeBefore, @dataInvalidRangeAfter, _dataInvalidRangeBeforeOf, _dataInvalidRangeAfterOf)
			else if element.hasAttribute(_dataInvalidDate)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidDateBefore, @dataInvalidDateAfter, _dataInvalidDateBeforeOf, _dataInvalidDateAfterOf)
			else if element.hasAttribute(_dataInvalidTime)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidTimeBefore, @dataInvalidTimeAfter, _dataInvalidTimeBeforeOf, _dataInvalidTimeAfterOf)
			else if element.hasAttribute(_dataInvalidDateTime)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidDateTimeBefore, @dataInvalidDateTimeAfter, _dataInvalidDateTimeBeforeOf, _dataInvalidDateTimeAfterOf)
			else if element.hasAttribute(_dataInvalidMonth)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidMonthBefore, @dataInvalidMonthAfter, _dataInvalidMonthBeforeOf, _dataInvalidMonthAfterOf)
			else if element.hasAttribute(_dataInvalidWeek)
				forceReadSimple(element, @parser, @prefixId, @dataInvalidWeekBefore, @dataInvalidWeekAfter, _dataInvalidWeekBeforeOf, _dataInvalidWeekAfterOf)
		if element.hasAttribute('aria-level')
			forceRead(element, element.getAttribute('aria-level'), @parser, @prefixId, @ariaLevelPrefixBefore, @ariaLevelSuffixBefore, @ariaLevelPrefixAfter, @ariaLevelSuffixAfter, _dataAriaLevelBeforeOf, _dataAriaLevelAfterOf)
		if element.hasAttribute('aria-orientation')
			attributeValue = element.getAttribute('aria-orientation')
			if attributeValue is 'vertical'
				forceReadSimple(element, @parser, @prefixId, @ariaOrientationVerticalBefore, @ariaOrientationVerticalAfter, _dataAriaOrientationBeforeOf, _dataAriaOrientationAfterOf)
			else if attributeValue is 'horizontal'
				forceReadSimple(element, @parser, @prefixId, @ariaOrientationHorizontalBefore, @ariaOrientationHorizontalAfter, _dataAriaOrientationBeforeOf, _dataAriaOrientationAfterOf)
		if element.hasAttribute('aria-pressed')
			attributeValue = element.getAttribute('aria-pressed')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaPressedTrueBefore, @ariaPressedTrueAfter, _dataAriaPressedBeforeOf, _dataAriaPressedAfterOf)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaPressedFalseBefore, @ariaPressedFalseAfter, _dataAriaPressedBeforeOf, _dataAriaPressedAfterOf)
			else if attributeValue is 'mixed'
				forceReadSimple(element, @parser, @prefixId, @ariaPressedMixedBefore, @ariaPressedMixedAfter, _dataAriaPressedBeforeOf, _dataAriaPressedAfterOf)
		if element.hasAttribute('aria-selected')
			attributeValue = element.getAttribute('aria-selected')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaSelectedTrueBefore, @ariaSelectedTrueAfter, _dataAriaSelectedBeforeOf, _dataAriaSelectedAfterOf)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaSelectedFalseBefore, @ariaSelectedFalseAfter, _dataAriaSelectedBeforeOf, _dataAriaSelectedAfterOf)
		if element.hasAttribute('aria-sort')
			attributeValue = element.getAttribute('aria-sort')
			if attributeValue is 'ascending'
				forceReadSimple(element, @parser, @prefixId, @ariaSortAscendingBefore, @ariaSortAscendingAfter, _dataAriaSortBeforeOf, _dataAriaSortAfterOf)
			else if attributeValue is 'descending'
				forceReadSimple(element, @parser, @prefixId, @ariaSortDescendingBefore, @ariaSortDescendingAfter, _dataAriaSortBeforeOf, _dataAriaSortAfterOf)
			else if attributeValue is 'other'
				forceReadSimple(element, @parser, @prefixId, @ariaSortOtherBefore, @ariaSortOtherAfter, _dataAriaSortBeforeOf, _dataAriaSortAfterOf)
		if (element.hasAttribute('aria-required')) and (element.getAttribute('aria-required') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaRequiredTrueBefore, @ariaRequiredTrueAfter, _dataAttributeRequiredBeforeOf, _dataAttributeRequiredAfterOf)
		if element.hasAttribute('aria-valuemin')
			forceRead(element, element.getAttribute('aria-valuemin'), @parser, @prefixId, @ariaValueMinimumPrefixBefore, @ariaValueMinimumSuffixBefore, @ariaValueMinimumPrefixAfter, @ariaValueMinimumSuffixAfter, _dataAttributeRangeMinBeforeOf, _dataAttributeRangeMinAfterOf)
		if element.hasAttribute('aria-valuemax')
			forceRead(element, element.getAttribute('aria-valuemax'), @parser, @prefixId, @ariaValueMaximumPrefixBefore, @ariaValueMaximumSuffixBefore, @ariaValueMaximumPrefixAfter, @ariaValueMaximumSuffixAfter, _dataAttributeRangeMaxBeforeOf, _dataAttributeRangeMaxAfterOf)
		if element.hasAttribute('aria-autocomplete')
			attributeValue = element.getAttribute('aria-autocomplete')
			if attributeValue is 'both'
				forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteBothBefore, @ariaAutoCompleteBothAfter, _dataAttributeAutoCompleteBeforeOf, _dataAttributeAutoCompleteAfterOf)
			else if attributeValue is 'inline'
				forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteListBefore, @ariaAutoCompleteListAfter, _dataAttributeAutoCompleteBeforeOf, _dataAttributeAutoCompleteAfterOf)
			else if attributeValue is 'list'
				forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteInlineBefore, @ariaAutoCompleteInlineAfter, _dataAttributeAutoCompleteBeforeOf, _dataAttributeAutoCompleteAfterOf)
		return
	
	displayAllWAIARIAStates: () ->
		elements = @parser.find('[aria-busy="true"],[aria-checked],[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],[aria-level],[aria-orientation],[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayWAIARIAStates(element)
		return
	
	displayLinkAttributes: (link) ->
		if link.hasAttribute('download')
			forceReadSimple(link, @parser, @prefixId, @attributeDownloadBefore, @attributeDownloadAfter, _dataAttributeDownloadBeforeOf, _dataAttributeDownloadAfterOf)
		if (link.hasAttribute('target')) and (link.getAttribute('target') is '_blank')
			forceReadSimple(link, @parser, @prefixId, @attributeTargetBlankBefore, @attributeTargetBlankAfter, _dataAttributeTargetBeforeOf, _dataAttributeTargetAfterOf)
		if (link.hasAttribute('href')) and (not isEmpty(link.getAttribute('title')))
			forceRead(link, link.getAttribute('href'), @parser, @prefixId, @attributeHrefPrefixBefore, @attributeHrefSuffixBefore, @attributeHrefPrefixAfter, @attributeHrefSuffixAfter, _dataAttributeHrefBeforeOf, _dataAttributeHrefAfterOf)
		return
	
	displayAllLinksAttributes: () ->
		elements = @parser.find('a[download],a[target="_blank"],a[href]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayLinkAttributes(element)
		return
	
	displayTitle: (element) ->
		if (element.hasAttribute('title')) and (not isEmpty(element.getAttribute('title')))
			forceRead(element, element.getAttribute('title'), @parser, @prefixId, @attributeTitlePrefixBefore, @attributeTitleSuffixBefore, @attributeTitlePrefixAfter, @attributeTitleSuffixAfter, _dataAttributeTitleBeforeOf, _dataAttributeTitleAfterOf)
		return
	
	displayAllTitles: () ->
		elements = @parser.find('[title]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayTitle(element)
		return
	
	displayDragAndDrop: (element) ->
		if element.hasAttribute('draggable')
			forceReadSimple(element, @parser, @prefixId, @attributeDraggableBefore, @attributeDraggableAfter, _dataAttributeDraggableBeforeOf, _dataAttributeDraggableAfterOf)
		if element.hasAttribute('dropzone')
			attributeValue = element.getAttribute('dropzone')
			if attributeValue is 'copy'
				forceReadSimple(element, @parser, @prefixId, @attributeDropzoneCopyBefore, @attributeDropzoneCopyAfter, _dataAttributeDropzoneBeforeOf, _dataAttributeDropzoneAfterOf)
			else if attributeValue is 'move'
				forceReadSimple(element, @parser, @prefixId, @attributeDropzoneMoveBefore, @attributeDropzoneMoveAfter, _dataAttributeDropzoneBeforeOf, _dataAttributeDropzoneAfterOf)
			else if attributeValue is 'link'
				forceReadSimple(element, @parser, @prefixId, @attributeDropzoneLinkBefore, @attributeDropzoneLinkAfter, _dataAttributeDropzoneBeforeOf, _dataAttributeDropzoneAfterOf)
		if element.hasAttribute('aria-dropeffect')
			attributeValue = element.getAttribute('aria-dropeffect')
			if attributeValue is 'copy'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectCopyBefore, @ariaDropeffectCopyAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'move'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectMoveBefore, @ariaDropeffectMoveAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'link'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectLinkBefore, @ariaDropeffectLinkAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'execute'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectExecuteBefore, @ariaDropeffectExecuteAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
			else if attributeValue is 'popup'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectPopupBefore, @ariaDropeffectPopupAfter, _dataAriaDropeffectBeforeOf, _dataAriaDropeffectAfterOf)
		if element.hasAttribute('aria-grabbed')
			attributeValue = element.getAttribute('aria-grabbed')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedTrueBefore, @ariaGrabbedTrueAfter, _dataAriaGrabbedBeforeOf, _dataAriaGrabbedAfterOf)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedFalseBefore, @ariaGrabbedFalseAfter, _dataAriaGrabbedBeforeOf, _dataAriaGrabbedAfterOf)
		return
	
	displayAllDragsAndDrops: () ->
		elements = @parser.find('[draggable],[dropzone],[aria-dropeffect],[aria-grabbed]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayDragAndDrop(element)
		return
	
	displayLanguage: (element) ->
		if element.hasAttribute('lang')
			languageCode = element.getAttribute('lang')
			language = @languages[languageCode]
			if not isEmpty(language)
				forceRead(element, language, @parser, @prefixId, @attributeLanguagePrefixBefore, @attributeLanguageSuffixBefore, @attributeLanguagePrefixAfter, @attributeLanguageSuffixAfter, _dataAttributeLanguageBeforeOf, _dataAttributeLanguageAfterOf)
		else if element.hasAttribute('hreflang')
			languageCode = element.getAttribute('hreflang')
			language = @languages[languageCode]
			if not isEmpty(language)
				forceRead(element, language, @parser, @prefixId, @attributeLanguagePrefixBefore, @attributeLanguageSuffixBefore, @attributeLanguagePrefixAfter, @attributeLanguageSuffixAfter, _dataAttributeLanguageBeforeOf, _dataAttributeLanguageAfterOf)
		return
	
	displayAllLanguages: () ->
		elements = @parser.find('[lang],[hreflang]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@displayLanguage(element)
		return