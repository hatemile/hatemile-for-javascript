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

class exports.hatemile.implementation.AccessibleDisplayScreenReaderImplementation
	
	_idContainerShortcuts = 'container-shortcuts'
	_idTextShortcuts = 'text-shortcuts'
	_dataIgnore = 'data-ignoreaccessibilityfix'
	_classForceReadBegin = 'force-read-begin'
	_classForceReadEnd = 'force-read-end'
	_dataAttributeRequiredBeginFor = 'data-attributerequiredbeginfor'
	_dataAttributeRequiredEndFor = 'data-attributerequiredendfor'
	_dataAttributeRangeMinBeginFor = 'data-attributevalueminbeginfor'
	_dataAttributeRangeMinEndFor = 'data-attributevalueminendfor'
	_dataAttributeRangeMaxBeginFor = 'data-attributevaluemaxbeginfor'
	_dataAttributeRangeMaxEndFor = 'data-attributevaluemaxendfor'
	_dataAttributeAutoCompleteBeginFor = 'data-attributeautocompletebeginfor'
	_dataAttributeAutoCompleteEndFor = 'data-attributeautocompleteendfor'
	_dataAttributeTitleBeginFor = 'data-attributetitlebeginfor'
	_dataAttributeTitleEndFor = 'data-attributetitleendfor'
	_dataAttributeHrefBeginFor = 'data-attributehrefbeginfor'
	_dataAttributeHrefEndFor = 'data-attributehrefendfor'
	_dataAttributeAccesskeyBeginFor = 'data-attributeaccesskeybeginfor'
	_dataAttributeAccesskeyEndFor = 'data-attributeaccesskeyendfor'
	_dataAttributeTargetBeginFor = 'data-attributetargetbeginfor'
	_dataAttributeTargetEndFor = 'data-attributetargetendfor'
	_dataAttributeDownloadBeginFor = 'data-attributedownloadbeginfor'
	_dataAttributeDownloadEndFor = 'data-attributedownloadendfor'
	_dataAttributeDraggableBeginFor = 'data-attributedraggablebeginfor'
	_dataAttributeDraggableEndFor = 'data-attributedraggableendfor'
	_dataAttributeDropzoneBeginFor = 'data-attributedropzonebeginfor'
	_dataAttributeDropzoneEndFor = 'data-attributedropzoneendfor'
	_dataAttributeLanguageBeginFor = 'data-languagebeginfor'
	_dataAttributeLanguageEndFor = 'data-languageendfor'
	_dataAttributeHeadersBeginFor = 'data-headersbeginfor'
	_dataAttributeHeadersEndFor = 'data-headersendfor'
	_dataAriaBusyBeginFor = 'data-ariabusybeginfor'
	_dataAriaBusyEndFor = 'data-ariabusyendfor'
	_dataAriaCheckedBeginFor = 'data-ariacheckedbeginfor'
	_dataAriaCheckedEndFor = 'data-ariacheckedendfor'
	_dataAriaDropeffectBeginFor = 'data-ariadropeffectbeginfor'
	_dataAriaDropeffectEndFor = 'data-ariadropeffectendfor'
	_dataAriaExpandedBeginFor = 'data-ariaexpandedbeginfor'
	_dataAriaExpandedEndFor = 'data-ariaexpandedendfor'
	_dataAriaGrabbedBeginFor = 'data-ariagrabbedbeginfor'
	_dataAriaGrabbedEndFor = 'data-ariagrabbedendfor'
	_dataAriaHaspopupBeginFor = 'data-ariahaspopupbeginfor'
	_dataAriaHaspopupEndFor = 'data-ariahaspopupendfor'
	_dataAriaLevelBeginFor = 'data-arialevelbeginfor'
	_dataAriaLevelEndFor = 'data-arialevelendfor'
	_dataAriaOrientationBeginFor = 'data-ariaorientationbeginfor'
	_dataAriaOrientationEndFor = 'data-ariaorientationendfor'
	_dataAriaPressedBeginFor = 'data-ariapressedbeginfor'
	_dataAriaPressedEndFor = 'data-ariapressedendfor'
	_dataAriaSelectedBeginFor = 'data-ariaselectedbeginfor'
	_dataAriaSelectedEndFor = 'data-ariaselectedendfor'
	_dataAriaSortBeginFor = 'data-ariasortbeginfor'
	_dataAriaSortEndFor = 'data-ariasortendfor'
	_dataRoleBeginFor = 'data-rolebeginfor'
	_dataRoleEndFor = 'data-roleendfor'
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
	
	constructor: (@parser, configure, @shortcutPrefix) ->
		if isEmpty(@shortcutPrefix)
			@shortcutPrefix = ''
		
		@listShortcutsAdded = false
		@listShortcuts = undefined
		
		@prefixId = configure.getParameter('prefix-generated-ids')
		
		@attributeTitlePrefixBegin = configure.getParameter('attribute-title-prefix-begin')
		@attributeTitleSuffixBegin = configure.getParameter('attribute-title-suffix-begin')
		@attributeTitlePrefixEnd = configure.getParameter('attribute-title-prefix-end')
		@attributeTitleSuffixEnd = configure.getParameter('attribute-title-suffix-end')
		@attributeHrefPrefixBegin = configure.getParameter('attribute-href-prefix-begin')
		@attributeHrefSuffixBegin = configure.getParameter('attribute-href-suffix-begin')
		@attributeHrefPrefixEnd = configure.getParameter('attribute-href-prefix-end')
		@attributeHrefSuffixEnd = configure.getParameter('attribute-href-suffix-end')
		@attributeAccesskeyPrefixBegin = configure.getParameter('attribute-accesskey-prefix-begin')
		@attributeAccesskeySuffixBegin = configure.getParameter('attribute-accesskey-suffix-begin')
		@attributeAccesskeyPrefixEnd = configure.getParameter('attribute-accesskey-prefix-end')
		@attributeAccesskeySuffixEnd = configure.getParameter('attribute-accesskey-suffix-end')
		@attributeTargetBlankBegin = configure.getParameter('attribute-target-blank-begin')
		@attributeTargetBlankEnd = configure.getParameter('attribute-target-blank-end')
		@attributeDownloadBegin = configure.getParameter('attribute-download-begin')
		@attributeDownloadEnd = configure.getParameter('attribute-download-end')
		@attributeDraggableBegin = configure.getParameter('attribute-draggable-begin')
		@attributeDraggableEnd = configure.getParameter('attribute-draggable-end')
		@attributeDropzoneCopyBegin = configure.getParameter('attribute-dropzone-copy-begin')
		@attributeDropzoneCopyEnd = configure.getParameter('attribute-dropzone-copy-end')
		@attributeDropzoneMoveBegin = configure.getParameter('attribute-dropzone-move-begin')
		@attributeDropzoneMoveEnd = configure.getParameter('attribute-dropzone-move-end')
		@attributeDropzoneLinkBegin = configure.getParameter('attribute-dropzone-link-begin')
		@attributeDropzoneLinkEnd = configure.getParameter('attribute-dropzone-link-end')
		@attributeHeadersPrefixBegin = configure.getParameter('attribute-headers-prefix-begin')
		@attributeHeadersSuffixBegin = configure.getParameter('attribute-headers-suffix-begin')
		@attributeHeadersPrefixEnd = configure.getParameter('attribute-headers-prefix-end')
		@attributeHeadersSuffixEnd = configure.getParameter('attribute-headers-suffix-end')
		@attributeLanguagePrefixBegin = configure.getParameter('attribute-language-prefix-begin')
		@attributeLanguageSuffixBegin = configure.getParameter('attribute-language-suffix-begin')
		@attributeLanguagePrefixEnd = configure.getParameter('attribute-language-prefix-end')
		@attributeLanguageSuffixEnd = configure.getParameter('attribute-language-suffix-end')
		@attributeRolePrefixBegin = configure.getParameter('attribute-role-prefix-begin')
		@attributeRoleSuffixBegin = configure.getParameter('attribute-role-suffix-begin')
		@attributeRolePrefixEnd = configure.getParameter('attribute-role-prefix-end')
		@attributeRoleSuffixEnd = configure.getParameter('attribute-role-suffix-end')
		
		@ariaAutoCompleteBothBegin = configure.getParameter('aria-autocomplete-both-begin')
		@ariaAutoCompleteBothEnd = configure.getParameter('aria-autocomplete-both-end')
		@ariaAutoCompleteInlineBegin = configure.getParameter('aria-autocomplete-inline-begin')
		@ariaAutoCompleteInlineEnd = configure.getParameter('aria-autocomplete-inline-end')
		@ariaAutoCompleteListBegin = configure.getParameter('aria-autocomplete-list-begin')
		@ariaAutoCompleteListEnd = configure.getParameter('aria-autocomplete-list-end')
		@ariaBusyTrueBegin = configure.getParameter('aria-busy-true-begin')
		@ariaBusyTrueEnd = configure.getParameter('aria-busy-true-end')
		@ariaCheckedFalseBegin = configure.getParameter('aria-checked-false-begin')
		@ariaCheckedFalseEnd = configure.getParameter('aria-checked-false-end')
		@ariaCheckedMixedBegin = configure.getParameter('aria-checked-mixed-begin')
		@ariaCheckedMixedEnd = configure.getParameter('aria-checked-mixed-end')
		@ariaCheckedTrueBegin = configure.getParameter('aria-checked-true-begin')
		@ariaCheckedTrueEnd = configure.getParameter('aria-checked-true-end')
		@ariaDropeffectCopyBegin = configure.getParameter('aria-dropeffect-copy-begin')
		@ariaDropeffectCopyEnd = configure.getParameter('aria-dropeffect-copy-end')
		@ariaDropeffectExecuteBegin = configure.getParameter('aria-dropeffect-execute-begin')
		@ariaDropeffectExecuteEnd = configure.getParameter('aria-dropeffect-execute-end')
		@ariaDropeffectLinkBegin = configure.getParameter('aria-dropeffect-link-begin')
		@ariaDropeffectLinkEnd = configure.getParameter('aria-dropeffect-link-end')
		@ariaDropeffectMoveBegin = configure.getParameter('aria-dropeffect-move-begin')
		@ariaDropeffectMoveEnd = configure.getParameter('aria-dropeffect-move-end')
		@ariaDropeffectPopupBegin = configure.getParameter('aria-dropeffect-popup-begin')
		@ariaDropeffectPopupEnd = configure.getParameter('aria-dropeffect-popup-end')
		@ariaExpandedFalseBegin = configure.getParameter('aria-expanded-false-begin')
		@ariaExpandedFalseEnd = configure.getParameter('aria-expanded-false-end')
		@ariaExpandedTrueBegin = configure.getParameter('aria-expanded-true-begin')
		@ariaExpandedTrueEnd = configure.getParameter('aria-expanded-true-end')
		@ariaGrabbedFalseBegin = configure.getParameter('aria-grabbed-false-begin')
		@ariaGrabbedFalseEnd = configure.getParameter('aria-grabbed-false-end')
		@ariaGrabbedTrueBegin = configure.getParameter('aria-grabbed-true-begin')
		@ariaGrabbedTrueEnd = configure.getParameter('aria-grabbed-true-end')
		@ariaHaspopupTrueBegin = configure.getParameter('aria-haspopup-true-begin')
		@ariaHaspopupTrueEnd = configure.getParameter('aria-haspopup-true-end')
		@ariaLevelPrefixBegin = configure.getParameter('aria-level-prefix-begin')
		@ariaLevelSuffixBegin = configure.getParameter('aria-level-suffix-begin')
		@ariaLevelPrefixEnd = configure.getParameter('aria-level-prefix-end')
		@ariaLevelSuffixEnd = configure.getParameter('aria-level-suffix-end')
		@ariaValueMaximumPrefixBegin = configure.getParameter('aria-value-maximum-prefix-begin')
		@ariaValueMaximumSuffixBegin = configure.getParameter('aria-value-maximum-suffix-begin')
		@ariaValueMaximumPrefixEnd = configure.getParameter('aria-value-maximum-prefix-end')
		@ariaValueMaximumSuffixEnd = configure.getParameter('aria-value-maximum-suffix-end')
		@ariaValueMinimumPrefixBegin = configure.getParameter('aria-value-minimum-prefix-begin')
		@ariaValueMinimumSuffixBegin = configure.getParameter('aria-value-minimum-suffix-begin')
		@ariaValueMinimumPrefixEnd = configure.getParameter('aria-value-minimum-prefix-end')
		@ariaValueMinimumSuffixEnd = configure.getParameter('aria-value-minimum-suffix-end')
		@ariaOrientationHorizontalBegin = configure.getParameter('aria-orientation-horizontal-begin')
		@ariaOrientationHorizontalEnd = configure.getParameter('aria-orientation-horizontal-end')
		@ariaOrientationVerticalBegin = configure.getParameter('aria-orientation-vertical-begin')
		@ariaOrientationVerticalEnd = configure.getParameter('aria-orientation-vertical-end')
		@ariaPressedFalseBegin = configure.getParameter('aria-pressed-false-begin')
		@ariaPressedFalseEnd = configure.getParameter('aria-pressed-false-end')
		@ariaPressedMixedBegin = configure.getParameter('aria-pressed-mixed-begin')
		@ariaPressedMixedEnd = configure.getParameter('aria-pressed-mixed-end')
		@ariaPressedTrueBegin = configure.getParameter('aria-pressed-true-begin')
		@ariaPressedTrueEnd = configure.getParameter('aria-pressed-true-end')
		@ariaRequiredTrueBegin = configure.getParameter('aria-required-true-begin')
		@ariaRequiredTrueEnd = configure.getParameter('aria-required-true-end')
		@ariaSelectedFalseBegin = configure.getParameter('aria-selected-false-begin')
		@ariaSelectedFalseEnd = configure.getParameter('aria-selected-false-end')
		@ariaSelectedTrueBegin = configure.getParameter('aria-selected-true-begin')
		@ariaSelectedTrueEnd = configure.getParameter('aria-selected-true-end')
		@ariaSortAscendingBegin = configure.getParameter('aria-sort-ascending-begin')
		@ariaSortAscendingEnd = configure.getParameter('aria-sort-ascending-end')
		@ariaSortDescendingBegin = configure.getParameter('aria-sort-descending-begin')
		@ariaSortDescendingEnd = configure.getParameter('aria-sort-descending-end')
		@ariaSortOtherBegin = configure.getParameter('aria-sort-other-begin')
		@ariaSortOtherEnd = configure.getParameter('aria-sort-other-end')
		
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
	
	###*
	 * Returns the description of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with description.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {String} The description of element.
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
	 * @param {String} textShortcuts The text of description of container of
	 * shortcuts descriptions.
	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
	 * callback This class.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of shortcuts of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListShortcuts = (parser, textShortcuts, callback) ->
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
	
	forceReadSimple = (element, parser, prefixId, textBegin, textEnd, dataBeginFor, dataEndFor) ->
		exports.hatemile.util.CommonFunctions.generateId(element, prefixId)
		identifier = element.getAttribute('id')
		
		if not isEmpty(textBegin)
			referenceBegin = parser.find(".#{_classForceReadBegin}[#{dataBeginFor}=\"#{identifier}\"]").firstResult()
			
			if not isEmpty(referenceBegin)
				referenceBegin.removeElement()
				referenceBegin = undefined
			
			span = parser.createElement('span')
			span.setAttribute('class', _classForceReadBegin)
			span.setAttribute(dataBeginFor, identifier)
			span.appendText(textBegin)
			insertBefore(element, span, parser)
		if not isEmpty(textEnd)
			referenceEnd = parser.find(".#{_classForceReadEnd}[#{dataEndFor}=\"#{identifier}\"]").firstResult()
			
			if not isEmpty(referenceEnd)
				referenceEnd.removeElement()
				referenceEnd = undefined
			
			span = parser.createElement('span')
			span.setAttribute('class', _classForceReadEnd)
			span.setAttribute(dataEndFor, identifier)
			span.appendText(textEnd)
			insertAfter(element, span, parser)
		return
	
	forceRead = (element, value, parser, prefixId, textPrefixBegin, textSuffixBegin, textPrefixEnd, textSuffixEnd, dataBeginFor, dataEndFor) ->
		if (not isEmpty(textPrefixBegin)) or (not isEmpty(textSuffixBegin))
			textBegin = "#{textPrefixBegin}#{value}#{textSuffixBegin}"
		else
			textBegin = ''
		if (not isEmpty(textPrefixEnd)) or (not isEmpty(textSuffixEnd))
			textEnd = "#{textPrefixEnd}#{value}#{textSuffixEnd}"
		else
			textEnd = ''
		forceReadSimple(element, parser, prefixId, textBegin, textEnd, dataBeginFor, dataEndFor)
		return
	
	displayShortcut: (element) ->
		if element.hasAttribute('accesskey')
			description = getDescription(element, @parser)
			if not element.hasAttribute('title')
				element.setAttribute('title', description)
			
			if not @listShortcutsAdded
				@listShortcuts = generateListShortcuts(@parser, "#{@attributeAccesskeyPrefixBegin}#{@attributeAccesskeySuffixBegin}", "#{@attributeAccesskeyPrefixEnd}#{@attributeAccesskeySuffixEnd}", this)
				@listShortcutsAdded = true
			
			if not isEmpty(@listShortcuts)
				keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
				for key in keys
					key = key.toUpperCase()
					if isEmpty(@parser.find(@listShortcuts).findChildren("[#{_dataAttributeAccesskeyBeginFor}=\"#{key}\"]").firstResult())
						item = @parser.createElement('li')
						item.setAttribute(_dataAttributeAccesskeyBeginFor, key)
						item.setAttribute(_dataAttributeAccesskeyEndFor, key)
						item.appendText("#{@shortcutPrefix} + #{key}: #{description}")
						@listShortcuts.appendElement(item)
		return
	
	displayAllShortcuts: () ->
		elements = @parser.find('[accesskey]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@displayShortcut(element)
		return
	
	displayRole: (element) ->
		if element.hasAttribute('role')
			role = element.getAttribute('role')
			roleDescription = @roles[role]
			if not isEmpty(roleDescription)
				forceRead(element, roleDescription, @parser, @prefixId, @attributeRolePrefixBegin, @attributeRoleSuffixBegin, @attributeRolePrefixEnd, @attributeRoleSuffixEnd, _dataRoleBeginFor, _dataRoleEndFor)
		return
	
	displayAllRoles: () ->
		elements = @parser.find('[role]').listResults()
		for element in elements
			if (not element.hasAttribute(_dataIgnore))
				@displayRole(element)
		return
	
	displayCellHeader: (tableCell) ->
		if tableCell.hasAttribute('headers')
			textHeader = ''
			idsHeaders = tableCell.getAttribute('headers').split(new RegExp('[ \n\t\r]+'))
			for idHeader in idsHeaders
				header = @parser.find("##{idHeader}").firstResult()
				if not isEmpty(header)
					textHeader = "#{textHeader} #{header.getTextContent()}"
			if not isEmpty(textHeader)
				forceRead(tableCell, textHeader, @parser, @prefixId, @attributeHeadersPrefixBegin, @attributeHeadersSuffixBegin, @attributeHeadersPrefixEnd, @attributeHeadersSuffixEnd, _dataAttributeHeadersBeginFor, _dataAttributeHeadersEndFor)
		return
	
	displayAllCellHeaders: () ->
		elements = @parser.find('td[headers],th[headers]').listResults()
		for element in elements
			if (not element.hasAttribute(_dataIgnore))
				@displayCellHeader(element)
		return
	
	displayWAIARIAStates: (element) ->
		if (element.hasAttribute('aria-busy')) and (element.getAttribute('aria-busy') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaBusyTrueBegin, @ariaBusyTrueEnd, _dataAriaBusyBeginFor, _dataAriaBusyEndFor)
		if element.hasAttribute('aria-checked')
			attributeValue = element.getAttribute('aria-checked')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaCheckedTrueBegin, @ariaCheckedTrueEnd, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaCheckedFalseBegin, @ariaCheckedFalseEnd, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor)
			else if attributeValue is 'mixed'
				forceReadSimple(element, @parser, @prefixId, @ariaCheckedMixedBegin, @ariaCheckedMixedEnd, _dataAriaCheckedBeginFor, _dataAriaCheckedEndFor)
		if element.hasAttribute('aria-dropeffect')
			attributeValue = element.getAttribute('aria-dropeffect')
			if attributeValue is 'copy'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectCopyBegin, @ariaDropeffectCopyEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'move'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectMoveBegin, @ariaDropeffectMoveEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'link'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectLinkBegin, @ariaDropeffectLinkEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'execute'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectExecuteBegin, @ariaDropeffectExecuteEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'popup'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectPopupBegin, @ariaDropeffectPopupEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
		if element.hasAttribute('aria-expanded')
			attributeValue = element.getAttribute('aria-expanded')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaExpandedTrueBegin, @ariaExpandedTrueEnd, _dataAriaExpandedBeginFor, _dataAriaExpandedEndFor)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaExpandedFalseBegin, @ariaExpandedFalseEnd, _dataAriaExpandedBeginFor, _dataAriaExpandedEndFor)
		if element.hasAttribute('aria-grabbed')
			attributeValue = element.getAttribute('aria-grabbed')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedTrueBegin, @ariaGrabbedTrueEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedFalseBegin, @ariaGrabbedFalseEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor)
		if (element.hasAttribute('aria-haspopup')) and (element.getAttribute('aria-haspopup') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaHaspopupTrueBegin, @ariaHaspopupTrueEnd, _dataAriaHaspopupBeginFor, _dataAriaHaspopupEndFor)
		if element.hasAttribute('aria-level')
			forceRead(element, element.getAttribute('aria-level'), @parser, @prefixId, @ariaLevelPrefixBegin, @ariaLevelSuffixBegin, @ariaLevelPrefixEnd, @ariaLevelSuffixEnd, _dataAriaLevelBeginFor, _dataAriaLevelEndFor)
		if element.hasAttribute('aria-orientation')
			attributeValue = element.getAttribute('aria-orientation')
			if attributeValue is 'vertical'
				forceReadSimple(element, @parser, @prefixId, @ariaOrientationVerticalBegin, @ariaOrientationVerticalEnd, _dataAriaOrientationBeginFor, _dataAriaOrientationEndFor)
			else if attributeValue is 'horizontal'
				forceReadSimple(element, @parser, @prefixId, @ariaOrientationHorizontalBegin, @ariaOrientationHorizontalEnd, _dataAriaOrientationBeginFor, _dataAriaOrientationEndFor)
		if element.hasAttribute('aria-pressed')
			attributeValue = element.getAttribute('aria-pressed')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaPressedTrueBegin, @ariaPressedTrueEnd, _dataAriaPressedBeginFor, _dataAriaPressedEndFor)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaPressedFalseBegin, @ariaPressedFalseEnd, _dataAriaPressedBeginFor, _dataAriaPressedEndFor)
			else if attributeValue is 'mixed'
				forceReadSimple(element, @parser, @prefixId, @ariaPressedMixedBegin, @ariaPressedMixedEnd, _dataAriaPressedBeginFor, _dataAriaPressedEndFor)
		if element.hasAttribute('aria-selected')
			attributeValue = element.getAttribute('aria-selected')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaSelectedTrueBegin, @ariaSelectedTrueEnd, _dataAriaSelectedBeginFor, _dataAriaSelectedEndFor)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaSelectedFalseBegin, @ariaSelectedFalseEnd, _dataAriaSelectedBeginFor, _dataAriaSelectedEndFor)
		if element.hasAttribute('aria-sort')
			attributeValue = element.getAttribute('aria-sort')
			if attributeValue is 'ascending'
				forceReadSimple(element, @parser, @prefixId, @ariaSortAscendingBegin, @ariaSortAscendingEnd, _dataAriaSortBeginFor, _dataAriaSortEndFor)
			else if attributeValue is 'descending'
				forceReadSimple(element, @parser, @prefixId, @ariaSortDescendingBegin, @ariaSortDescendingEnd, _dataAriaSortBeginFor, _dataAriaSortEndFor)
			else if attributeValue is 'other'
				forceReadSimple(element, @parser, @prefixId, @ariaSortOtherBegin, @ariaSortOtherEnd, _dataAriaSortBeginFor, _dataAriaSortEndFor)
		if (element.hasAttribute('aria-required')) and (element.getAttribute('aria-required') is 'true')
			forceReadSimple(element, @parser, @prefixId, @ariaRequiredTrueBegin, @ariaRequiredTrueEnd, _dataAttributeRequiredBeginFor, _dataAttributeRequiredEndFor)
		if element.hasAttribute('aria-valuemin')
			forceRead(element, element.getAttribute('aria-valuemin'), @parser, @prefixId, @ariaValueMinimumPrefixBegin, @ariaValueMinimumSuffixBegin, @ariaValueMinimumPrefixEnd, @ariaValueMinimumSuffixEnd, _dataAttributeRangeMinBeginFor, _dataAttributeRangeMinEndFor)
		if element.hasAttribute('aria-valuemax')
			forceRead(element, element.getAttribute('aria-valuemax'), @parser, @prefixId, @ariaValueMaximumPrefixBegin, @ariaValueMaximumSuffixBegin, @ariaValueMaximumPrefixEnd, @ariaValueMaximumSuffixEnd, _dataAttributeRangeMaxBeginFor, _dataAttributeRangeMaxEndFor)
		if element.hasAttribute('aria-autocomplete')
			attributeValue = element.getAttribute('aria-autocomplete')
			if attributeValue is 'both'
				forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteBothBegin, @ariaAutoCompleteBothEnd, _dataAttributeAutoCompleteEndFor)
			else if attributeValue is 'inline'
				forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteListBegin, @ariaAutoCompleteListEnd, _dataAttributeAutoCompleteEndFor)
			else if attributeValue is 'list'
				forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteInlineBegin, @ariaAutoCompleteInlineEnd, _dataAttributeAutoCompleteEndFor)
		return
	
	displayAllWAIARIAStates: () ->
		elements = @parser.find('[aria-busy="true"],[aria-checked],[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],[aria-level],[aria-orientation],[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@displayWAIARIAStates(element)
		return
	
	displayLinkAttributes: (link) ->
		if link.hasAttribute('download')
			forceReadSimple(link, @parser, @prefixId, @attributeDownloadBegin, @attributeDownloadEnd, _dataAttributeDownloadBeginFor, _dataAttributeDownloadEndFor)
		if (link.hasAttribute('target')) and (link.getAttribute('target') is '_blank')
			forceReadSimple(link, @parser, @prefixId, @attributeTargetBlankBegin, @attributeTargetBlankEnd, _dataAttributeTargetBeginFor, _dataAttributeTargetEndFor)
		if link.hasAttribute('href')
			forceRead(link, link.getAttribute('href'), @parser, @prefixId, @attributeHrefPrefixBegin, @attributeHrefSuffixBegin, @attributeHrefPrefixEnd, @attributeHrefSuffixEnd, _dataAttributeHrefBeginFor, _dataAttributeHrefEndFor)
		return
	
	displayAllLinksAttributes: () ->
		elements = @parser.find('[download],[target="_blank"],[href]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@displayLinkAttributes(element)
		return
	
	displayTitle: (element) ->
		if (element.hasAttribute('title')) and (not isEmpty(element.getAttribute('title')))
			forceRead(element, element.getAttribute('title'), @parser, @prefixId, @attributeTitlePrefixBegin, @attributeTitleSuffixBegin, @attributeTitlePrefixEnd, @attributeTitleSuffixEnd, _dataAttributeTitleBeginFor, _dataAttributeTitleEndFor)
		return
	
	displayAllTitles: () ->
		elements = @parser.find('[title]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@displayTitle(element)
		return
	
	displayDragAndDrop: (element) ->
		if element.hasAttribute('draggable')
			forceReadSimple(element, @parser, @prefixId, @attributeDraggableBegin, @attributeDraggableEnd, _dataAttributeDraggableBeginFor, _dataAttributeDraggableEndFor)
		if element.hasAttribute('dropzone')
			attributeValue = element.getAttribute('dropzone')
			if attributeValue is 'copy'
				forceReadSimple(element, @parser, @prefixId, @attributeDropzoneCopyBegin, @attributeDropzoneCopyEnd, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor)
			else if attributeValue is 'move'
				forceReadSimple(element, @parser, @prefixId, @attributeDropzoneMoveBegin, @attributeDropzoneMoveEnd, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor)
			else if attributeValue is 'link'
				forceReadSimple(element, @parser, @prefixId, @attributeDropzoneLinkBegin, @attributeDropzoneLinkEnd, _dataAttributeDropzoneBeginFor, _dataAttributeDropzoneEndFor)
		if element.hasAttribute('aria-dropeffect')
			attributeValue = element.getAttribute('aria-dropeffect')
			if attributeValue is 'copy'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectCopyBegin, @ariaDropeffectCopyEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'move'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectMoveBegin, @ariaDropeffectMoveEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'link'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectLinkBegin, @ariaDropeffectLinkEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'execute'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectExecuteBegin, @ariaDropeffectExecuteEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
			else if attributeValue is 'popup'
				forceReadSimple(element, @parser, @prefixId, @ariaDropeffectPopupBegin, @ariaDropeffectPopupEnd, _dataAriaDropeffectBeginFor, _dataAriaDropeffectEndFor)
		if element.hasAttribute('aria-grabbed')
			attributeValue = element.getAttribute('aria-grabbed')
			if attributeValue is 'true'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedTrueBegin, @ariaGrabbedTrueEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor)
			else if attributeValue is 'false'
				forceReadSimple(element, @parser, @prefixId, @ariaGrabbedFalseBegin, @ariaGrabbedFalseEnd, _dataAriaGrabbedBeginFor, _dataAriaGrabbedEndFor)
		return
	
	displayAllDragsAndDrops: () ->
		elements = @parser.find('[draggable],[dropzone],[aria-dropeffect],[aria-grabbed]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@displayDragAndDrop(element)
		return
	
	displayLanguage: (element) ->
		if element.hasAttribute('lang')
			languageCode = element.getAttribute('lang')
			language = @languages[languageCode]
			if not isEmpty(language)
				forceRead(element, language, @parser, @prefixId, @attributeLanguagePrefixBegin, @attributeLanguageSuffixBegin, @attributeLanguagePrefixEnd, @attributeLanguageSuffixEnd, _dataAttributeLanguageBeginFor, _dataAttributeLanguageEndFor)
		else if element.hasAttribute('hreflang')
			languageCode = element.getAttribute('hreflang')
			language = @languages[languageCode]
			if not isEmpty(language)
				forceRead(element, language, @parser, @prefixId, @attributeLanguagePrefixBegin, @attributeLanguageSuffixBegin, @attributeLanguagePrefixEnd, @attributeLanguageSuffixEnd, _dataAttributeLanguageBeginFor, _dataAttributeLanguageEndFor)
		return
	
	displayAllLanguages: () ->
		elements = @parser.find('[lang],[hreflang]').listResults()
		for element in elements
			if not element.hasAttribute(_dataIgnore)
				@displayLanguage(element)
		return