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
self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.implementation
#
@hatemile.implementation or= {}

# The AccessibleDisplayScreenReaderImplementation class is official
# implementation of AccessibleDisplay interface for screen readers.
#
# @extend hatemile.AccessibleDisplay
#
class @hatemile.implementation.AccessibleDisplayScreenReaderImplementation
  
  ID_CONTAINER_SHORTCUTS = 'container-shortcuts'
  ID_TEXT_SHORTCUTS = 'text-shortcuts'
  CLASS_FORCE_READ_BEFORE = 'force-read-before'
  CLASS_FORCE_READ_AFTER = 'force-read-after'
  DATA_ATTRIBUTE_REQUIRED_BEFORE_OF = 'data-attributerequiredbeforeof'
  DATA_ATTRIBUTE_REQUIRED_AFTER_OF = 'data-attributerequiredafterof'
  DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF = 'data-attributevalueminbeforeof'
  DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF = 'data-attributevalueminafterof'
  DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF = 'data-attributevaluemaxbeforeof'
  DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF = 'data-attributevaluemaxafterof'
  DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF = 'data-attributeautocompletebeforeof'
  DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF = 'data-attributeautocompleteafterof'
  DATA_ATTRIBUTE_TITLE_BEFORE_OF = 'data-attributetitlebeforeof'
  DATA_ATTRIBUTE_TITLE_AFTER_OF = 'data-attributetitleafterof'
  DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF = 'data-attributeaccesskeybeforeof'
  DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF = 'data-attributeaccesskeyafterof'
  DATA_ATTRIBUTE_TARGET_BEFORE_OF = 'data-attributetargetbeforeof'
  DATA_ATTRIBUTE_TARGET_AFTER_OF = 'data-attributetargetafterof'
  DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF = 'data-attributedownloadbeforeof'
  DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF = 'data-attributedownloadafterof'
  DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF = 'data-attributedraggablebeforeof'
  DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF = 'data-attributedraggableafterof'
  DATA_ATTRIBUTE_DROPZONE_BEFORE_OF = 'data-attributedropzonebeforeof'
  DATA_ATTRIBUTE_DROPZONE_AFTER_OF = 'data-attributedropzoneafterof'
  DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF = 'data-languagebeforeof'
  DATA_ATTRIBUTE_LANGUAGE_AFTER_OF = 'data-languageafterof'
  DATA_ATTRIBUTE_HEADERS_BEFORE_OF = 'data-headersbeforeof'
  DATA_ATTRIBUTE_HEADERS_AFTER_OF = 'data-headersafterof'
  DATA_ARIA_BUSY_BEFORE_OF = 'data-ariabusybeforeof'
  DATA_ARIA_BUSY_AFTER_OF = 'data-ariabusyafterof'
  DATA_ARIA_CHECKED_BEFORE_OF = 'data-ariacheckedbeforeof'
  DATA_ARIA_CHECKED_AFTER_OF = 'data-ariacheckedafterof'
  DATA_ARIA_DROPEFFECT_BEFORE_OF = 'data-ariadropeffectbeforeof'
  DATA_ARIA_DROPEFFECT_AFTER_OF = 'data-ariadropeffectafterof'
  DATA_ARIA_EXPANDED_BEFORE_OF = 'data-ariaexpandedbeforeof'
  DATA_ARIA_EXPANDED_AFTER_OF = 'data-ariaexpandedafterof'
  DATA_ARIA_GRABBED_BEFORE_OF = 'data-ariagrabbedbeforeof'
  DATA_ARIA_GRABBED_AFTER_OF = 'data-ariagrabbedafterof'
  DATA_ARIA_HASPOPUP_BEFORE_OF = 'data-ariahaspopupbeforeof'
  DATA_ARIA_HASPOPUP_AFTER_OF = 'data-ariahaspopupafterof'
  DATA_ARIA_INVALID_BEFORE_OF = 'data-ariainvalidbeforeof'
  DATA_ARIA_INVALID_AFTER_OF = 'data-ariainvalidafterof'
  DATA_ARIA_LEVEL_BEFORE_OF = 'data-arialevelbeforeof'
  DATA_ARIA_LEVEL_AFTER_OF = 'data-arialevelafterof'
  DATA_ARIA_ORIENTATION_BEFORE_OF = 'data-ariaorientationbeforeof'
  DATA_ARIA_ORIENTATION_AFTER_OF = 'data-ariaorientationafterof'
  DATA_ARIA_PRESSED_BEFORE_OF = 'data-ariapressedbeforeof'
  DATA_ARIA_PRESSED_AFTER_OF = 'data-ariapressedafterof'
  DATA_ARIA_SELECTED_BEFORE_OF = 'data-ariaselectedbeforeof'
  DATA_ARIA_SELECTED_AFTER_OF = 'data-ariaselectedafterof'
  DATA_ARIA_SORT_BEFORE_OF = 'data-ariasortbeforeof'
  DATA_ARIA_SORT_AFTER_OF = 'data-ariasortafterof'
  DATA_ROLE_BEFORE_OF = 'data-rolebeforeof'
  DATA_ROLE_AFTER_OF = 'data-roleafterof'
  DATA_INVALID_URL_BEFORE_OF = 'data-invalidurlbeforeof'
  DATA_INVALID_URL_AFTER_OF = 'data-invalidurlafterof'
  DATA_INVALID_EMAIL_BEFORE_OF = 'data-invalidemailbeforeof'
  DATA_INVALID_EMAIL_AFTER_OF = 'data-invalidemailafterof'
  DATA_INVALID_RANGE_BEFORE_OF = 'data-invalidrangebeforeof'
  DATA_INVALID_RANGE_AFTER_OF = 'data-invalidrangeafterof'
  DATA_INVALID_LENGTH_BEFORE_OF = 'data-invalidlengthbeforeof'
  DATA_INVALID_LENGTH_AFTER_OF = 'data-invalidlengthafterof'
  DATA_INVALID_PATTERN_BEFORE_OF = 'data-invalidpatternbeforeof'
  DATA_INVALID_PATTERN_AFTER_OF = 'data-invalidpatternafterof'
  DATA_INVALID_REQUIRED_BEFORE_OF = 'data-invalidrequiredbeforeof'
  DATA_INVALID_REQUIRED_AFTER_OF = 'data-invalidrequiredafterof'
  DATA_INVALID_DATE_BEFORE_OF = 'data-invaliddatebeforeof'
  DATA_INVALID_DATE_AFTER_OF = 'data-invaliddateafterof'
  DATA_INVALID_TIME_BEFORE_OF = 'data-invalidtimebeforeof'
  DATA_INVALID_TIME_AFTER_OF = 'data-invalidtimeafterof'
  DATA_INVALID_DATETIME_BEFORE_OF = 'data-invaliddatetimebeforeof'
  DATA_INVALID_DATETIME_AFTER_OF = 'data-invaliddatetimeafterof'
  DATA_INVALID_MONTH_BEFORE_OF = 'data-invalidmonthbeforeof'
  DATA_INVALID_MONTH_AFTER_OF = 'data-invalidmonthafterof'
  DATA_INVALID_WEEK_BEFORE_OF = 'data-invalidweekbeforeof'
  DATA_INVALID_WEEK_AFTER_OF = 'data-invalidweekafterof'
  DATA_INVALID_URL = 'data-invalidurl'
  DATA_INVALID_EMAIL = 'data-invalidemail'
  DATA_INVALID_RANGE = 'data-invalidrange'
  DATA_INVALID_LENGTH = 'data-invalidlength'
  DATA_INVALID_PATTERN = 'data-invalidpattern'
  DATA_INVALID_REQUIRED = 'data-invalidrequired'
  DATA_INVALID_DATE = 'data-invaliddate'
  DATA_INVALID_TIME = 'data-invalidtime'
  DATA_INVALID_DATETIME = 'data-invaliddatetime'
  DATA_INVALID_MONTH = 'data-invalidmonth'
  DATA_INVALID_WEEK = 'data-invalidweek'
  
  # Returns the shortcut prefix of browser.
  #
  # @param [string] userAgent The user agent of browser.
  # @param [string] defaultPrefix The default prefix.
  #
  # @return [string] The shortcut prefix of browser.
  #
  getShortcutPrefix = (userAgent, defaultPrefix) ->
    if not self.isEmpty(userAgent)
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
      return defaultPrefix
  
  # Returns the description of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #
  # @return [string] The description of element.
  #
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
        if not self.isEmpty(elementDescription)
          description = elementDescription.getTextContent()
          break
    else if (element.getTagName() is 'INPUT') and (element.hasAttribute('type'))
      type = element.getAttribute('type').toLowerCase()
      if ((type is 'button') or (type is 'submit') or (type is 'reset')) and (element.hasAttribute('value'))
        description = element.getAttribute('value')
    if self.isEmpty(description)
      description = element.getTextContent()
    return description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ')
  
  # Generate the list of shortcuts of page.
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [string] textShortcuts The description of container of shortcuts.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The list of shortcuts of
  # page.
  #
  generateListShortcuts = (parser, textShortcuts) ->
    container = parser.find("##{ID_CONTAINER_SHORTCUTS}").firstResult()
    if self.isEmpty(container)
      local = parser.find('body').firstResult()
      if not self.isEmpty(local)
        container = parser.createElement('div')
        container.setAttribute('id', ID_CONTAINER_SHORTCUTS)
        
        textContainer = parser.createElement('span')
        textContainer.setAttribute('id', ID_TEXT_SHORTCUTS)
        textContainer.appendText(textShortcuts)
        
        container.appendElement(textContainer)
        local.appendElement(container)
    list = undefined
    if not self.isEmpty(container)
      list = parser.find(container).findChildren('ul').firstResult()
      if self.isEmpty(list)
        list = parser.createElement('ul')
        container.appendElement(list)
    return list
  
  # Insert a element before other element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The reference element.
  # @param [hatemile.util.html.HTMLDOMElement] insertedElement The element
  # that be inserted.
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #
  insertBefore = (element, insertedElement, parser) ->
    tagName = element.getTagName()
    tags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH']
    controls = ['INPUT', 'SELECT', 'TEXTAREA']
    if tagName is 'HTML'
      body = parser.find('body').firstResult()
      if not self.isEmpty(body)
        insertBefore(body, insertedElement, parser)
    else if (tags.indexOf(tagName) > -1)
      element.prependElement(insertedElement)
    else if (controls.indexOf(tagName) > -1)
      if element.hasAttribute('id')
        labels = parser.find("label[for=\"#{element.getAttribute('id')}\"]").listResults()
      if self.isEmpty(labels)
        labels = parser.find(element).findAncestors('label').listResults()
      for label in labels
        insertBefore(label, insertedElement, parser)
    else
      element.insertBefore(insertedElement)
    return
  
  # Insert a element after other element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The reference element.
  # @param [hatemile.util.html.HTMLDOMElement] insertedElement The element
  # that be inserted.
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #
  insertAfter = (element, insertedElement, parser) ->
    tagName = element.getTagName()
    appendTags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', 'OPTION', 'TD', 'TH']
    controls = ['INPUT', 'SELECT', 'TEXTAREA']
    if tagName is 'HTML'
      body = parser.find('body').firstResult()
      if not self.isEmpty(body)
        insertAfter(body, insertedElement, parser)
    else if appendTags.indexOf(tagName) > -1
      element.appendElement(insertedElement)
    else if (controls.indexOf(tagName) > -1)
      if element.hasAttribute('id')
        labels = parser.find("label[for=\"#{element.getAttribute('id')}\"]").listResults()
      if self.isEmpty(labels)
        labels = parser.find(element).findAncestors('label').listResults()
      for label in labels
        insertAfter(label, insertedElement, parser)
    else
      element.insertAfter(insertedElement)
    return
  
  # Force the screen reader display an information of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The reference element.
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [string] prefixId The prefix of generated ids.
  # @param [string] textBefore The text content to show before the element.
  # @param [string] textAfter The text content to show after the element.
  # @param [string] dataBeforeOf The name of attribute that links the before
  # content with element.
  # @param [string] dataAfterOf The name of attribute that links the after
  # content with element.
  #
  forceReadSimple = (element, parser, prefixId, textBefore, textAfter, dataBeforeOf, dataAfterOf) ->
    self.hatemile.util.CommonFunctions.generateId(element, prefixId)
    identifier = element.getAttribute('id')
    
    if not self.isEmpty(textBefore)
      referenceBefore = parser.find(".#{CLASS_FORCE_READ_BEFORE}[#{dataBeforeOf}=\"#{identifier}\"]").firstResult()
      
      if not self.isEmpty(referenceBefore)
        referenceBefore.removeNode()
        referenceBefore = undefined
      
      span = parser.createElement('span')
      span.setAttribute('class', CLASS_FORCE_READ_BEFORE)
      span.setAttribute(dataBeforeOf, identifier)
      span.appendText(textBefore)
      insertBefore(element, span, parser)
    if not self.isEmpty(textAfter)
      referenceAfter = parser.find(".#{CLASS_FORCE_READ_AFTER}[#{dataAfterOf}=\"#{identifier}\"]").firstResult()
      
      if not self.isEmpty(referenceAfter)
        referenceAfter.removeNode()
        referenceAfter = undefined
      
      span = parser.createElement('span')
      span.setAttribute('class', CLASS_FORCE_READ_AFTER)
      span.setAttribute(dataAfterOf, identifier)
      span.appendText(textAfter)
      insertAfter(element, span, parser)
    return
  
  # Force the screen reader display an information of element with prefixes or
  # suffixes.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The reference element.
  # @param [string] value The value to be show.
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [string] prefixId The prefix of generated ids.
  # @param [string] textPrefixBefore The prefix of value to show before the
  # element.
  # @param [string] textSuffixBefore The suffix of value to show before the
  # element.
  # @param [string] textPrefixAfter The prefix of value to show after the
  # element.
  # @param [string] textSuffixAfter The suffix of value to show after the
  # element.
  # @param [string] dataBeforeOf The name of attribute that links the before
  # content with element.
  # @param [string] dataAfterOf The name of attribute that links the after
  # content with element.
  #
  forceRead = (element, value, parser, prefixId, textPrefixBefore, textSuffixBefore, textPrefixAfter, textSuffixAfter, dataBeforeOf, dataAfterOf) ->
    if (not self.isEmpty(textPrefixBefore)) or (not self.isEmpty(textSuffixBefore))
      textBefore = "#{textPrefixBefore}#{value}#{textSuffixBefore}"
    else
      textBefore = ''
    if (not self.isEmpty(textPrefixAfter)) or (not self.isEmpty(textSuffixAfter))
      textAfter = "#{textPrefixAfter}#{value}#{textSuffixAfter}"
    else
      textAfter = ''
    forceReadSimple(element, parser, prefixId, textBefore, textAfter, dataBeforeOf, dataAfterOf)
    return
  
  # Initializes a new object that manipulate the display for screen readers of
  # parser.
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  # @param [string] userAgent The user agent of browser.
  #
  constructor: (@parser, configure, userAgent) ->
    @listShortcutsAdded = false
    @listShortcuts = undefined
    
    @prefixId = configure.getParameter('prefix-generated-ids')
    
    @attributeTitlePrefixBefore = configure.getParameter('attribute-title-prefix-before')
    @attributeTitleSuffixBefore = configure.getParameter('attribute-title-suffix-before')
    @attributeTitlePrefixAfter = configure.getParameter('attribute-title-prefix-after')
    @attributeTitleSuffixAfter = configure.getParameter('attribute-title-suffix-after')
    @attributeAccesskeyDefault = configure.getParameter('attribute-accesskey-default')
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
    
    @dataInvalidUrlBefore = configure.getParameter('attribute-data-invalid-url-before')
    @dataInvalidUrlAfter = configure.getParameter('attribute-data-invalid-url-after')
    @dataInvalidEmailBefore = configure.getParameter('attribute-data-invalid-email-before')
    @dataInvalidEmailAfter = configure.getParameter('attribute-data-invalid-email-after')
    @dataInvalidRangeBefore = configure.getParameter('attribute-data-invalid-range-before')
    @dataInvalidRangeAfter = configure.getParameter('attribute-data-invalid-range-after')
    @dataInvalidLengthBefore = configure.getParameter('attribute-data-invalid-length-before')
    @dataInvalidLengthAfter = configure.getParameter('attribute-data-invalid-length-after')
    @dataInvalidPatternBefore = configure.getParameter('attribute-data-invalid-pattern-before')
    @dataInvalidPatternAfter = configure.getParameter('attribute-data-invalid-pattern-after')
    @dataInvalidRequiredBefore = configure.getParameter('attribute-data-invalid-required-before')
    @dataInvalidRequiredAfter = configure.getParameter('attribute-data-invalid-required-after')
    @dataInvalidDateBefore = configure.getParameter('attribute-data-invalid-date-before')
    @dataInvalidDateAfter = configure.getParameter('attribute-data-invalid-date-after')
    @dataInvalidTimeBefore = configure.getParameter('attribute-data-invalid-time-before')
    @dataInvalidTimeAfter = configure.getParameter('attribute-data-invalid-time-after')
    @dataInvalidDateTimeBefore = configure.getParameter('attribute-data-invalid-datetime-before')
    @dataInvalidDateTimeAfter = configure.getParameter('attribute-data-invalid-datetime-after')
    @dataInvalidMonthBefore = configure.getParameter('attribute-data-invalid-month-before')
    @dataInvalidMonthAfter = configure.getParameter('attribute-data-invalid-month-after')
    @dataInvalidWeekBefore = configure.getParameter('attribute-data-invalid-week-before')
    @dataInvalidWeekAfter = configure.getParameter('attribute-data-invalid-week-after')
    
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
    
    @shortcutPrefix = getShortcutPrefix(userAgent, @attributeAccesskeyDefault)
  
  # Display the shortcut of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @see hatemile.AccessibleDisplay#displayShortcut
  #
  displayShortcut: (element) ->
    if element.hasAttribute('accesskey')
      description = getDescription(element, @parser)
      if not element.hasAttribute('title')
        element.setAttribute('title', description)
      
      if not @listShortcutsAdded
        @listShortcuts = generateListShortcuts(@parser, "#{@attributeAccesskeyPrefixBefore}#{@attributeAccesskeySuffixBefore}")
        @listShortcutsAdded = true
      
      if not self.isEmpty(@listShortcuts)
        keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
        for key in keys
          key = key.toUpperCase()
          if self.isEmpty(@parser.find(@listShortcuts).findChildren("[#{DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF}=\"#{key}\"]").firstResult())
            item = @parser.createElement('li')
            item.setAttribute(DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF, key)
            item.setAttribute(DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF, key)
            item.appendText("#{@shortcutPrefix} + #{key}: #{description}")
            @listShortcuts.appendElement(item)
    return
  
  # Display all shortcuts of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllShortcuts
  #
  displayAllShortcuts: () ->
    elements = @parser.find('[accesskey]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayShortcut(element)
    return
  
  # Display the WAI-ARIA role of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @see hatemile.AccessibleDisplay#displayRole
  #
  displayRole: (element) ->
    if element.hasAttribute('role')
      role = element.getAttribute('role')
      roleDescription = @roles[role]
      if not self.isEmpty(roleDescription)
        forceRead(element, roleDescription, @parser, @prefixId, @attributeRolePrefixBefore, @attributeRoleSuffixBefore, @attributeRolePrefixAfter, @attributeRoleSuffixAfter, DATA_ROLE_BEFORE_OF, DATA_ROLE_AFTER_OF)
    return
  
  # Display the WAI-ARIA roles of all elements of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllRoles
  #
  displayAllRoles: () ->
    elements = @parser.find('[role]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayRole(element)
    return
  
  # Display the headers of each data cell of table.
  #
  # @param [hatemile.util.html.HTMLDOMElement] tableCell The table cell.
  #
  # @see hatemile.AccessibleDisplay#displayCellHeader
  #
  displayCellHeader: (tableCell) ->
    if tableCell.hasAttribute('headers')
      textHeader = undefined
      idsHeaders = tableCell.getAttribute('headers').split(new RegExp('[ \n\t\r]+'))
      for idHeader in idsHeaders
        header = @parser.find("##{idHeader}").firstResult()
        if not self.isEmpty(header)
          if textHeader is undefined
            textHeader = header.getTextContent()
          else
            textHeader = "#{textHeader} #{header.getTextContent()}"
      if not self.isEmpty(textHeader)
        forceRead(tableCell, textHeader, @parser, @prefixId, @attributeHeadersPrefixBefore, @attributeHeadersSuffixBefore, @attributeHeadersPrefixAfter, @attributeHeadersSuffixAfter, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, DATA_ATTRIBUTE_HEADERS_AFTER_OF)
    return
  
  # Display the headers of each data cell of all tables of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllCellHeaders
  #
  displayAllCellHeaders: () ->
    elements = @parser.find('td[headers],th[headers]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayCellHeader(element)
    return
  
  # Display the WAI-ARIA attributes of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with
  # WAI-ARIA attributes.
  #
  # @see hatemile.AccessibleDisplay#displayWAIARIAStates
  #
  displayWAIARIAStates: (element) ->
    if (element.hasAttribute('aria-busy')) and (element.getAttribute('aria-busy') is 'true')
      forceReadSimple(element, @parser, @prefixId, @ariaBusyTrueBefore, @ariaBusyTrueAfter, DATA_ARIA_BUSY_BEFORE_OF, DATA_ARIA_BUSY_AFTER_OF)
    if element.hasAttribute('aria-checked')
      attributeValue = element.getAttribute('aria-checked')
      if attributeValue is 'true'
        forceReadSimple(element, @parser, @prefixId, @ariaCheckedTrueBefore, @ariaCheckedTrueAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF)
      else if attributeValue is 'false'
        forceReadSimple(element, @parser, @prefixId, @ariaCheckedFalseBefore, @ariaCheckedFalseAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF)
      else if attributeValue is 'mixed'
        forceReadSimple(element, @parser, @prefixId, @ariaCheckedMixedBefore, @ariaCheckedMixedAfter, DATA_ARIA_CHECKED_BEFORE_OF, DATA_ARIA_CHECKED_AFTER_OF)
    if element.hasAttribute('aria-dropeffect')
      attributeValue = element.getAttribute('aria-dropeffect')
      if attributeValue is 'copy'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectCopyBefore, @ariaDropeffectCopyAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'move'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectMoveBefore, @ariaDropeffectMoveAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'link'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectLinkBefore, @ariaDropeffectLinkAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'execute'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectExecuteBefore, @ariaDropeffectExecuteAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'popup'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectPopupBefore, @ariaDropeffectPopupAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
    if element.hasAttribute('aria-expanded')
      attributeValue = element.getAttribute('aria-expanded')
      if attributeValue is 'true'
        forceReadSimple(element, @parser, @prefixId, @ariaExpandedTrueBefore, @ariaExpandedTrueAfter, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF)
      else if attributeValue is 'false'
        forceReadSimple(element, @parser, @prefixId, @ariaExpandedFalseBefore, @ariaExpandedFalseAfter, DATA_ARIA_EXPANDED_BEFORE_OF, DATA_ARIA_EXPANDED_AFTER_OF)
    if element.hasAttribute('aria-grabbed')
      attributeValue = element.getAttribute('aria-grabbed')
      if attributeValue is 'true'
        forceReadSimple(element, @parser, @prefixId, @ariaGrabbedTrueBefore, @ariaGrabbedTrueAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF)
      else if attributeValue is 'false'
        forceReadSimple(element, @parser, @prefixId, @ariaGrabbedFalseBefore, @ariaGrabbedFalseAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF)
    if (element.hasAttribute('aria-haspopup')) and (element.getAttribute('aria-haspopup') is 'true')
      forceReadSimple(element, @parser, @prefixId, @ariaHaspopupTrueBefore, @ariaHaspopupTrueAfter, DATA_ARIA_HASPOPUP_BEFORE_OF, DATA_ARIA_HASPOPUP_AFTER_OF)
    if (element.hasAttribute('aria-invalid')) and (element.getAttribute('aria-invalid') is 'true')
      forceReadSimple(element, @parser, @prefixId, @ariaInvalidTrueBefore, @ariaInvalidTrueAfter, DATA_ARIA_INVALID_BEFORE_OF, DATA_ARIA_INVALID_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_LENGTH)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidLengthBefore, @dataInvalidLengthAfter, DATA_INVALID_LENGTH_BEFORE_OF, DATA_INVALID_LENGTH_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_PATTERN)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidPatternBefore, @dataInvalidPatternAfter, DATA_INVALID_PATTERN_BEFORE_OF, DATA_INVALID_PATTERN_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_REQUIRED)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidRequiredBefore, @dataInvalidRequiredAfter, DATA_INVALID_REQUIRED_BEFORE_OF, DATA_INVALID_REQUIRED_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_URL)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidUrlBefore, @dataInvalidUrlAfter, DATA_INVALID_URL_BEFORE_OF, DATA_INVALID_URL_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_EMAIL)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidEmailBefore, @dataInvalidEmailAfter, DATA_INVALID_EMAIL_BEFORE_OF, DATA_INVALID_EMAIL_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_RANGE)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidRangeBefore, @dataInvalidRangeAfter, DATA_INVALID_RANGE_BEFORE_OF, DATA_INVALID_RANGE_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_DATE)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidDateBefore, @dataInvalidDateAfter, DATA_INVALID_DATE_BEFORE_OF, DATA_INVALID_DATE_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_TIME)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidTimeBefore, @dataInvalidTimeAfter, DATA_INVALID_TIME_BEFORE_OF, DATA_INVALID_TIME_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_DATETIME)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidDateTimeBefore, @dataInvalidDateTimeAfter, DATA_INVALID_DATETIME_BEFORE_OF, DATA_INVALID_DATETIME_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_MONTH)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidMonthBefore, @dataInvalidMonthAfter, DATA_INVALID_MONTH_BEFORE_OF, DATA_INVALID_MONTH_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_WEEK)
        forceReadSimple(element, @parser, @prefixId, @dataInvalidWeekBefore, @dataInvalidWeekAfter, DATA_INVALID_WEEK_BEFORE_OF, DATA_INVALID_WEEK_AFTER_OF)
    if element.hasAttribute('aria-level')
      forceRead(element, element.getAttribute('aria-level'), @parser, @prefixId, @ariaLevelPrefixBefore, @ariaLevelSuffixBefore, @ariaLevelPrefixAfter, @ariaLevelSuffixAfter, DATA_ARIA_LEVEL_BEFORE_OF, DATA_ARIA_LEVEL_AFTER_OF)
    if element.hasAttribute('aria-orientation')
      attributeValue = element.getAttribute('aria-orientation')
      if attributeValue is 'vertical'
        forceReadSimple(element, @parser, @prefixId, @ariaOrientationVerticalBefore, @ariaOrientationVerticalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF)
      else if attributeValue is 'horizontal'
        forceReadSimple(element, @parser, @prefixId, @ariaOrientationHorizontalBefore, @ariaOrientationHorizontalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, DATA_ARIA_ORIENTATION_AFTER_OF)
    if element.hasAttribute('aria-pressed')
      attributeValue = element.getAttribute('aria-pressed')
      if attributeValue is 'true'
        forceReadSimple(element, @parser, @prefixId, @ariaPressedTrueBefore, @ariaPressedTrueAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF)
      else if attributeValue is 'false'
        forceReadSimple(element, @parser, @prefixId, @ariaPressedFalseBefore, @ariaPressedFalseAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF)
      else if attributeValue is 'mixed'
        forceReadSimple(element, @parser, @prefixId, @ariaPressedMixedBefore, @ariaPressedMixedAfter, DATA_ARIA_PRESSED_BEFORE_OF, DATA_ARIA_PRESSED_AFTER_OF)
    if element.hasAttribute('aria-selected')
      attributeValue = element.getAttribute('aria-selected')
      if attributeValue is 'true'
        forceReadSimple(element, @parser, @prefixId, @ariaSelectedTrueBefore, @ariaSelectedTrueAfter, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF)
      else if attributeValue is 'false'
        forceReadSimple(element, @parser, @prefixId, @ariaSelectedFalseBefore, @ariaSelectedFalseAfter, DATA_ARIA_SELECTED_BEFORE_OF, DATA_ARIA_SELECTED_AFTER_OF)
    if element.hasAttribute('aria-sort')
      attributeValue = element.getAttribute('aria-sort')
      if attributeValue is 'ascending'
        forceReadSimple(element, @parser, @prefixId, @ariaSortAscendingBefore, @ariaSortAscendingAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF)
      else if attributeValue is 'descending'
        forceReadSimple(element, @parser, @prefixId, @ariaSortDescendingBefore, @ariaSortDescendingAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF)
      else if attributeValue is 'other'
        forceReadSimple(element, @parser, @prefixId, @ariaSortOtherBefore, @ariaSortOtherAfter, DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF)
    if (element.hasAttribute('aria-required')) and (element.getAttribute('aria-required') is 'true')
      forceReadSimple(element, @parser, @prefixId, @ariaRequiredTrueBefore, @ariaRequiredTrueAfter, DATA_ATTRIBUTE_REQUIRED_BEFORE_OF, DATA_ATTRIBUTE_REQUIRED_AFTER_OF)
    if element.hasAttribute('aria-valuemin')
      forceRead(element, element.getAttribute('aria-valuemin'), @parser, @prefixId, @ariaValueMinimumPrefixBefore, @ariaValueMinimumSuffixBefore, @ariaValueMinimumPrefixAfter, @ariaValueMinimumSuffixAfter, DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF)
    if element.hasAttribute('aria-valuemax')
      forceRead(element, element.getAttribute('aria-valuemax'), @parser, @prefixId, @ariaValueMaximumPrefixBefore, @ariaValueMaximumSuffixBefore, @ariaValueMaximumPrefixAfter, @ariaValueMaximumSuffixAfter, DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF)
    if element.hasAttribute('aria-autocomplete')
      attributeValue = element.getAttribute('aria-autocomplete')
      if attributeValue is 'both'
        forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteBothBefore, @ariaAutoCompleteBothAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF)
      else if attributeValue is 'inline'
        forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteListBefore, @ariaAutoCompleteListAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF)
      else if attributeValue is 'list'
        forceReadSimple(element, @parser, @prefixId, @ariaAutoCompleteInlineBefore, @ariaAutoCompleteInlineAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF)
    return
  
  # Display the WAI-ARIA attributes of all elements of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllWAIARIAStates
  #
  displayAllWAIARIAStates: () ->
    elements = @parser.find('[aria-busy="true"],[aria-checked],[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],[aria-invalid=true],[aria-level],[aria-orientation],[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayWAIARIAStates(element)
    return
  
  # Display the attributes of link.
  #
  # @param [hatemile.util.html.HTMLDOMElement] link The link element.
  #
  # @see hatemile.AccessibleDisplay#displayLinkAttributes
  #
  displayLinkAttributes: (link) ->
    if link.hasAttribute('download')
      forceReadSimple(link, @parser, @prefixId, @attributeDownloadBefore, @attributeDownloadAfter, DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF, DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF)
    if (link.hasAttribute('target')) and (link.getAttribute('target') is '_blank')
      forceReadSimple(link, @parser, @prefixId, @attributeTargetBlankBefore, @attributeTargetBlankAfter, DATA_ATTRIBUTE_TARGET_BEFORE_OF, DATA_ATTRIBUTE_TARGET_AFTER_OF)
    return
  
  # Display the attributes of all links of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllLinksAttributes
  #
  displayAllLinksAttributes: () ->
    elements = @parser.find('a[download],a[target="_blank"]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayLinkAttributes(element)
    return
  
  # Display the title of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with title.
  #
  # @see hatemile.AccessibleDisplay#displayTitle
  #
  displayTitle: (element) ->
    if (element.hasAttribute('title')) and (not self.isEmpty(element.getAttribute('title')))
      forceRead(element, element.getAttribute('title'), @parser, @prefixId, @attributeTitlePrefixBefore, @attributeTitleSuffixBefore, @attributeTitlePrefixAfter, @attributeTitleSuffixAfter, DATA_ATTRIBUTE_TITLE_BEFORE_OF, DATA_ATTRIBUTE_TITLE_AFTER_OF)
    return
  
  # Display the titles of all elements of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllTitles
  #
  displayAllTitles: () ->
    elements = @parser.find('body [title]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayTitle(element)
    return
  
  # Display that the element has drag-and-drop event.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with drag
  # or drop events.
  #
  # @see hatemile.AccessibleDisplay#displayDragAndDrop
  #
  displayDragAndDrop: (element) ->
    if element.hasAttribute('draggable')
      forceReadSimple(element, @parser, @prefixId, @attributeDraggableBefore, @attributeDraggableAfter, DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF, DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF)
    if element.hasAttribute('dropzone')
      attributeValue = element.getAttribute('dropzone')
      if attributeValue is 'copy'
        forceReadSimple(element, @parser, @prefixId, @attributeDropzoneCopyBefore, @attributeDropzoneCopyAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF)
      else if attributeValue is 'move'
        forceReadSimple(element, @parser, @prefixId, @attributeDropzoneMoveBefore, @attributeDropzoneMoveAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF)
      else if attributeValue is 'link'
        forceReadSimple(element, @parser, @prefixId, @attributeDropzoneLinkBefore, @attributeDropzoneLinkAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, DATA_ATTRIBUTE_DROPZONE_AFTER_OF)
    if element.hasAttribute('aria-dropeffect')
      attributeValue = element.getAttribute('aria-dropeffect')
      if attributeValue is 'copy'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectCopyBefore, @ariaDropeffectCopyAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'move'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectMoveBefore, @ariaDropeffectMoveAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'link'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectLinkBefore, @ariaDropeffectLinkAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'execute'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectExecuteBefore, @ariaDropeffectExecuteAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'popup'
        forceReadSimple(element, @parser, @prefixId, @ariaDropeffectPopupBefore, @ariaDropeffectPopupAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, DATA_ARIA_DROPEFFECT_AFTER_OF)
    if element.hasAttribute('aria-grabbed')
      attributeValue = element.getAttribute('aria-grabbed')
      if attributeValue is 'true'
        forceReadSimple(element, @parser, @prefixId, @ariaGrabbedTrueBefore, @ariaGrabbedTrueAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF)
      else if attributeValue is 'false'
        forceReadSimple(element, @parser, @prefixId, @ariaGrabbedFalseBefore, @ariaGrabbedFalseAfter, DATA_ARIA_GRABBED_BEFORE_OF, DATA_ARIA_GRABBED_AFTER_OF)
    return
  
  # Display that an elements of page have drag-and-drop events.
  #
  # @see hatemile.AccessibleDisplay#displayAllDragsAndDrops
  #
  displayAllDragsAndDrops: () ->
    elements = @parser.find('[draggable],[dropzone],[aria-dropeffect],[aria-grabbed]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayDragAndDrop(element)
    return
  
  # Display the language of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @see hatemile.AccessibleDisplay#displayLanguage
  #
  displayLanguage: (element) ->
    if element.hasAttribute('lang')
      languageCode = element.getAttribute('lang')
      language = @languages[languageCode]
      if not self.isEmpty(language)
        forceRead(element, language, @parser, @prefixId, @attributeLanguagePrefixBefore, @attributeLanguageSuffixBefore, @attributeLanguagePrefixAfter, @attributeLanguageSuffixAfter, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF)
    else if element.hasAttribute('hreflang')
      languageCode = element.getAttribute('hreflang')
      language = @languages[languageCode]
      if not self.isEmpty(language)
        forceRead(element, language, @parser, @prefixId, @attributeLanguagePrefixBefore, @attributeLanguageSuffixBefore, @attributeLanguagePrefixAfter, @attributeLanguageSuffixAfter, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, DATA_ATTRIBUTE_LANGUAGE_AFTER_OF)
    return
  
  # Display the language of all elements of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllLanguages
  #
  displayAllLanguages: () ->
    elements = @parser.find('html[lang],body[lang],body [lang],body [hreflang]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @displayLanguage(element)
    return
  
  # Display the alternative text of image.
  #
  # @param [hatemile.util.html.HTMLDOMElement] image The image.
  #
  # @see hatemile.AccessibleDisplay#displayAlternativeTextImage
  #
  displayAlternativeTextImage: (image) ->
    if (image.hasAttribute('alt')) or (image.hasAttribute('title'))
      if (image.hasAttribute('alt')) and (not image.hasAttribute('title'))
        image.setAttribute('title', image.getAttribute('alt'))
      else if (image.hasAttribute('title')) and (not image.hasAttribute('alt'))
        image.setAttribute('alt', image.getAttribute('title'))
      self.hatemile.util.CommonFunctions.generateId(image, @prefixId)
      image.setAttribute(DATA_ATTRIBUTE_TITLE_BEFORE_OF, image.getAttribute('id'))
      image.setAttribute(DATA_ATTRIBUTE_TITLE_AFTER_OF, image.getAttribute('id'))
    else
      image.setAttribute('alt', '')
      image.setAttribute('role', 'presentation')
      image.setAttribute('aria-hidden', 'true')
    return
  
  # Display the alternative text of all images of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllAlternativeTextImages
  #
  displayAllAlternativeTextImages: () ->
    images = @parser.find('img').listResults();
    for image in images
      if self.hatemile.util.CommonFunctions.isValidElement(image)
        @displayAlternativeTextImage(image)
    return
