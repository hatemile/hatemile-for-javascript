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
'use strict'

self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.implementation
#
@hatemile.implementation or= {}

# The AccessibleDisplayScreenReaderImplementation class is official
# implementation of {hatemile.AccessibleDisplay} for screen readers.
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
  # @private
  #
  # @param [string] userAgent The user agent of browser.
  # @param [string] defaultPrefix The default prefix.
  #
  # @return [string] The shortcut prefix of browser.
  #
  _getShortcutPrefix: (userAgent, defaultPrefix) ->
    if (userAgent isnt undefined)
      userAgent = userAgent.toLowerCase()
      opera = userAgent.indexOf('opera') > -1
      mac = userAgent.indexOf('mac') > -1
      konqueror = userAgent.indexOf('konqueror') > -1
      spoofer = userAgent.indexOf('spoofer') > -1
      safari = userAgent.indexOf('applewebkit') > -1
      windows = userAgent.indexOf('windows') > -1
      chrome = userAgent.indexOf('chrome') > -1
      firefox = /firefox\/[2-9]|minefield\/3/.test(userAgent)
      ie = (userAgent.indexOf('msie') > -1) or \
          (userAgent.indexOf('trident') > -1)
      
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
  
  # Returns the description of role.
  #
  # @private
  #
  # @param [string] role The role.
  #
  # @return [string] The description of role.
  #
  _getRoleDescription: (role) ->
    parameter = "role-#{role.toLowerCase()}"
    if @configure.hasParameter(parameter)
      return @configure.getParameter(parameter)
    else
      return null
  
  # Returns the description of language.
  #
  # @private
  #
  # @param [string] languageCode The BCP 47 code language.
  #
  # @return [string] The description of language.
  #
  _getLanguageDescription: (languageCode) ->
    language = languageCode.toLowerCase()
    parameter = "language-#{language}"
    if @configure.hasParameter(parameter)
      return @configure.getParameter(parameter)
    else if language.indexOf('-') > -1
      parameter = 'language-' + language.split('-')[0]
      if @configure.hasParameter(parameter)
        return @configure.getParameter(parameter)
    return null
  
  # Returns the description of element.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @return [string] The description of element.
  #
  _getDescription: (element) ->
    description = null
    if element.hasAttribute('title')
      description = element.getAttribute('title')
    else if element.hasAttribute('aria-label')
      description = element.getAttribute('aria-label')
    else if element.hasAttribute('alt')
      description = element.getAttribute('alt')
    else if element.hasAttribute('label')
      description = element.getAttribute('label')
    else if element.hasAttribute('aria-labelledby') or element
        .hasAttribute('aria-describedby')
      if element.hasAttribute('aria-labelledby')
        descriptionIds = element.getAttribute('aria-labelledby')
            .split(new RegExp('[ \n\t\r]+'))
      else
        descriptionIds = element.getAttribute('aria-describedby')
            .split(new RegExp('[ \n\t\r]+'))
      for descriptionId in descriptionIds
        elementDescription = @parser.find("##{descriptionId}").firstResult()
        if elementDescription isnt null
          description = elementDescription.getTextContent()
          break
    else if (element.getTagName() is 'INPUT') and (element.hasAttribute('type'))
      type = element.getAttribute('type').toLowerCase()
      if ((type is 'button') or (type is 'submit') or (type is 'reset')) and \
          (element.hasAttribute('value'))
        description = element.getAttribute('value')
    if description is null
      description = element.getTextContent()
    return description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ')
  
  # Generate the list of shortcuts of page.
  #
  # @private
  #
  # @return [hatemile.util.html.HTMLDOMElement] The list of shortcuts of page.
  #
  _generateListShortcuts: () ->
    container = @parser.find("##{ID_CONTAINER_SHORTCUTS}").firstResult()
    if container is null
      local = @parser.find('body').firstResult()
      if local isnt null
        container = @parser.createElement('div')
        container.setAttribute('id', ID_CONTAINER_SHORTCUTS)
        
        textContainer = @parser.createElement('span')
        textContainer.setAttribute('id', ID_TEXT_SHORTCUTS)
        
        container.appendElement(textContainer)
        
        if @attributeAccesskeyBefore.length > 0
          textContainer.appendText(@attributeAccesskeyBefore)
          local.prependElement(container)
        if @attributeAccesskeyAfter.length > 0
          textContainer.appendText(@attributeAccesskeyAfter)
          local.appendElement(container)
    list = null
    if container isnt null
      list = @parser.find(container).findChildren('ul').firstResult()
      if list is null
        list = @parser.createElement('ul')
        container.appendElement(list)
    
    @listShortcutsAdded = true
    
    return list
  
  # Insert a element before or after other element.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The reference element.
  # @param [hatemile.util.html.HTMLDOMElement] insertedElement The element that be inserted.
  # @param [boolean] before To insert the element before the other element.
  #
  _insert: (element, insertedElement, before) ->
    tagName = element.getTagName()
    appendTags = ['BODY', 'A', 'FIGCAPTION', 'LI', 'DT', 'DD', 'LABEL', \
        'OPTION', 'TD', 'TH']
    controls = ['INPUT', 'SELECT', 'TEXTAREA']
    if tagName is 'HTML'
      body = @parser.find('body').firstResult()
      if body isnt null
        @_insert(body, insertedElement, before)
    else if appendTags.indexOf(tagName) > -1
      if before
        element.prependElement(insertedElement)
      else
        element.appendElement(insertedElement)
    else if (controls.indexOf(tagName) > -1)
      if element.hasAttribute('id')
        labels = @parser.find("label[for=\"#{element.getAttribute('id')}\"]")
            .listResults()
      if labels.length is 0
        labels = @parser.find(element).findAncestors('label').listResults()
      for label in labels
        @_insert(label, insertedElement, before)
    else if before
      element.insertBefore(insertedElement)
    else
      element.insertAfter(insertedElement)
    return
  
  # Force the screen reader display an information of element.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The reference element.
  # @param [string] textBefore The text content to show before the element.
  # @param [string] textAfter The text content to show after the element.
  # @param [string] db The name of attribute that links the before content with element.
  # @param [string] da The name of attribute that links the after content with element.
  #
  _forceReadSimple: (element, textBefore, textAfter, db, da) ->
    @idGenerator.generateId(element)
    identifier = element.getAttribute('id')
    
    if textBefore.length > 0
      referenceBefore = @parser.find("[#{db}=\"#{identifier}\"]").firstResult()
      
      if (not element.equals(referenceBefore))
        if referenceBefore isnt null
          referenceBefore.removeNode()
        
        span = @parser.createElement('span')
        span.setAttribute('class', CLASS_FORCE_READ_BEFORE)
        span.setAttribute(db, identifier)
        span.appendText(textBefore)
        @_insert(element, span, true)
    
    if textAfter.length > 0
      referenceAfter = @parser.find("[#{da}=\"#{identifier}\"]").firstResult()
      
      if (not element.equals(referenceAfter))
        if referenceAfter isnt null
          referenceAfter.removeNode()
        
        span = @parser.createElement('span')
        span.setAttribute('class', CLASS_FORCE_READ_AFTER)
        span.setAttribute(da, identifier)
        span.appendText(textAfter)
        @_insert(element, span, false)
    return
  
  # Force the screen reader display an information of element with prefixes or
  # suffixes.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] e The reference element.
  # @param [string] v The value to be show.
  # @param [string] tpb The prefix of value to show before the element.
  # @param [string] tsb The suffix of value to show before the element.
  # @param [string] tpa The prefix of value to show after the element.
  # @param [string] tsa The suffix of value to show after the element.
  # @param [string] db The name of attribute that links the before content with element.
  # @param [string] da The name of attribute that links the after content with element.
  #
  _forceRead: (e, v, tpb, tsb, tpa, tsa, db, da) ->
    if (tpb.length > 0) or (tsb.length > 0)
      textBefore = "#{tpb}#{v}#{tsb}"
    else
      textBefore = ''
    if (tpa.length > 0) or (tsa.length > 0)
      textAfter = "#{tpa}#{v}#{tsa}"
    else
      textAfter = ''
    @_forceReadSimple(e, textBefore, textAfter, db, da)
    return
  
  # Display that the element has WAI-ARIA drag-and-drop state.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with WAI-ARIA drag-and-drop state.
  #
  _displayWAIARIADragandDrop: (element) ->
    if element.hasAttribute('aria-dropeffect')
      attributeValue = element.getAttribute('aria-dropeffect')
      if attributeValue is 'copy'
        @_forceReadSimple(element, @ariaDropeffectCopyBefore, \
            @ariaDropeffectCopyAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, \
            DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'move'
        @_forceReadSimple(element, @ariaDropeffectMoveBefore, \
            @ariaDropeffectMoveAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, \
            DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'link'
        @_forceReadSimple(element, @ariaDropeffectLinkBefore, \
            @ariaDropeffectLinkAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, \
            DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'execute'
        @_forceReadSimple(element, @ariaDropeffectExecuteBefore, \
            @ariaDropeffectExecuteAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, \
            DATA_ARIA_DROPEFFECT_AFTER_OF)
      else if attributeValue is 'popup'
        @_forceReadSimple(element, @ariaDropeffectPopupBefore, \
            @ariaDropeffectPopupAfter, DATA_ARIA_DROPEFFECT_BEFORE_OF, \
            DATA_ARIA_DROPEFFECT_AFTER_OF)
    if element.hasAttribute('aria-grabbed')
      attributeValue = element.getAttribute('aria-grabbed')
      if attributeValue is 'true'
        @_forceReadSimple(element, @ariaGrabbedTrueBefore, \
            @ariaGrabbedTrueAfter, DATA_ARIA_GRABBED_BEFORE_OF, \
            DATA_ARIA_GRABBED_AFTER_OF)
      else if attributeValue is 'false'
        @_forceReadSimple(element, @ariaGrabbedFalseBefore, \
            @ariaGrabbedFalseAfter, DATA_ARIA_GRABBED_BEFORE_OF, \
            DATA_ARIA_GRABBED_AFTER_OF)
    return
  
  # Initializes a new object that manipulate the display for screen readers of
  # parser.
  #
  # @overload constructor(parser, configure)
  #   Use default shortcut prefix of configuration for display shortcuts of
  #   page.
  #   @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #   @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  #
  # @overload constructor(parser, configure, userAgent)
  #   Use browser shortcut prefix for display shortcuts of page.
  #   @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #   @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  #   @param [string] userAgent The user agent of browser.
  #
  constructor: (@parser, @configure, userAgent) ->
    @listShortcutsAdded = false
    @listShortcuts = null
    
    @idGenerator = new hatemile.util.IDGenerator('display')
    
    @attributeTitlePrefixBefore = @configure
        .getParameter('attribute-title-prefix-before')
    @attributeTitleSuffixBefore = @configure
        .getParameter('attribute-title-suffix-before')
    @attributeTitlePrefixAfter = @configure
        .getParameter('attribute-title-prefix-after')
    @attributeTitleSuffixAfter = @configure
        .getParameter('attribute-title-suffix-after')
    @attributeAccesskeyDefault = @configure
        .getParameter('attribute-accesskey-default')
    @attributeAccesskeyBefore = @configure
        .getParameter('attribute-accesskey-before')
    @attributeAccesskeyAfter = @configure
        .getParameter('attribute-accesskey-after')
    @attributeAccesskeyPrefixBefore = @configure
        .getParameter('attribute-accesskey-prefix-before')
    @attributeAccesskeySuffixBefore = @configure
        .getParameter('attribute-accesskey-suffix-before')
    @attributeAccesskeyPrefixAfter = @configure
        .getParameter('attribute-accesskey-prefix-after')
    @attributeAccesskeySuffixAfter = @configure
        .getParameter('attribute-accesskey-suffix-after')
    @attributeTargetBlankBefore = @configure
        .getParameter('attribute-target-blank-before')
    @attributeTargetBlankAfter = @configure
        .getParameter('attribute-target-blank-after')
    @attributeDownloadBefore = @configure
        .getParameter('attribute-download-before')
    @attributeDownloadAfter = @configure
        .getParameter('attribute-download-after')
    @attributeDraggableBefore = @configure
        .getParameter('attribute-draggable-before')
    @attributeDraggableAfter = @configure
        .getParameter('attribute-draggable-after')
    @attributeDropzoneCopyBefore = @configure
        .getParameter('attribute-dropzone-copy-before')
    @attributeDropzoneCopyAfter = @configure
        .getParameter('attribute-dropzone-copy-after')
    @attributeDropzoneMoveBefore = @configure
        .getParameter('attribute-dropzone-move-before')
    @attributeDropzoneMoveAfter = @configure
        .getParameter('attribute-dropzone-move-after')
    @attributeDropzoneLinkBefore = @configure
        .getParameter('attribute-dropzone-link-before')
    @attributeDropzoneLinkAfter = @configure
        .getParameter('attribute-dropzone-link-after')
    @attributeHeadersPrefixBefore = @configure
        .getParameter('attribute-headers-prefix-before')
    @attributeHeadersSuffixBefore = @configure
        .getParameter('attribute-headers-suffix-before')
    @attributeHeadersPrefixAfter = @configure
        .getParameter('attribute-headers-prefix-after')
    @attributeHeadersSuffixAfter = @configure
        .getParameter('attribute-headers-suffix-after')
    @attributeLanguagePrefixBefore = @configure
        .getParameter('attribute-language-prefix-before')
    @attributeLanguageSuffixBefore = @configure
        .getParameter('attribute-language-suffix-before')
    @attributeLanguagePrefixAfter = @configure
        .getParameter('attribute-language-prefix-after')
    @attributeLanguageSuffixAfter = @configure
        .getParameter('attribute-language-suffix-after')
    @attributeRolePrefixBefore = @configure
        .getParameter('attribute-role-prefix-before')
    @attributeRoleSuffixBefore = @configure
        .getParameter('attribute-role-suffix-before')
    @attributeRolePrefixAfter = @configure
        .getParameter('attribute-role-prefix-after')
    @attributeRoleSuffixAfter = @configure
        .getParameter('attribute-role-suffix-after')
    
    @ariaAutoCompleteBothBefore = @configure
        .getParameter('aria-autocomplete-both-before')
    @ariaAutoCompleteBothAfter = @configure
        .getParameter('aria-autocomplete-both-after')
    @ariaAutoCompleteInlineBefore = @configure
        .getParameter('aria-autocomplete-inline-before')
    @ariaAutoCompleteInlineAfter = @configure
        .getParameter('aria-autocomplete-inline-after')
    @ariaAutoCompleteListBefore = @configure
        .getParameter('aria-autocomplete-list-before')
    @ariaAutoCompleteListAfter = @configure
        .getParameter('aria-autocomplete-list-after')
    @ariaBusyTrueBefore = @configure
        .getParameter('aria-busy-true-before')
    @ariaBusyTrueAfter = @configure
        .getParameter('aria-busy-true-after')
    @ariaCheckedFalseBefore = @configure
        .getParameter('aria-checked-false-before')
    @ariaCheckedFalseAfter = @configure
        .getParameter('aria-checked-false-after')
    @ariaCheckedMixedBefore = @configure
        .getParameter('aria-checked-mixed-before')
    @ariaCheckedMixedAfter = @configure
        .getParameter('aria-checked-mixed-after')
    @ariaCheckedTrueBefore = @configure
        .getParameter('aria-checked-true-before')
    @ariaCheckedTrueAfter = @configure
        .getParameter('aria-checked-true-after')
    @ariaDropeffectCopyBefore = @configure
        .getParameter('aria-dropeffect-copy-before')
    @ariaDropeffectCopyAfter = @configure
        .getParameter('aria-dropeffect-copy-after')
    @ariaDropeffectExecuteBefore = @configure
        .getParameter('aria-dropeffect-execute-before')
    @ariaDropeffectExecuteAfter = @configure
        .getParameter('aria-dropeffect-execute-after')
    @ariaDropeffectLinkBefore = @configure
        .getParameter('aria-dropeffect-link-before')
    @ariaDropeffectLinkAfter = @configure
        .getParameter('aria-dropeffect-link-after')
    @ariaDropeffectMoveBefore = @configure
        .getParameter('aria-dropeffect-move-before')
    @ariaDropeffectMoveAfter = @configure
        .getParameter('aria-dropeffect-move-after')
    @ariaDropeffectPopupBefore = @configure
        .getParameter('aria-dropeffect-popup-before')
    @ariaDropeffectPopupAfter = @configure
        .getParameter('aria-dropeffect-popup-after')
    @ariaExpandedFalseBefore = @configure
        .getParameter('aria-expanded-false-before')
    @ariaExpandedFalseAfter = @configure
        .getParameter('aria-expanded-false-after')
    @ariaExpandedTrueBefore = @configure
        .getParameter('aria-expanded-true-before')
    @ariaExpandedTrueAfter = @configure.getParameter('aria-expanded-true-after')
    @ariaGrabbedFalseBefore = @configure
        .getParameter('aria-grabbed-false-before')
    @ariaGrabbedFalseAfter = @configure.getParameter('aria-grabbed-false-after')
    @ariaGrabbedTrueBefore = @configure.getParameter('aria-grabbed-true-before')
    @ariaGrabbedTrueAfter = @configure.getParameter('aria-grabbed-true-after')
    @ariaHaspopupTrueBefore = @configure
        .getParameter('aria-haspopup-true-before')
    @ariaHaspopupTrueAfter = @configure.getParameter('aria-haspopup-true-after')
    @ariaInvalidTrueBefore = @configure.getParameter('aria-invalid-true-before')
    @ariaInvalidTrueAfter = @configure.getParameter('aria-invalid-true-after')
    @ariaLevelPrefixBefore = @configure.getParameter('aria-level-prefix-before')
    @ariaLevelSuffixBefore = @configure.getParameter('aria-level-suffix-before')
    @ariaLevelPrefixAfter = @configure.getParameter('aria-level-prefix-after')
    @ariaLevelSuffixAfter = @configure.getParameter('aria-level-suffix-after')
    @ariaValueMaximumPrefixBefore = @configure
        .getParameter('aria-value-maximum-prefix-before')
    @ariaValueMaximumSuffixBefore = @configure
        .getParameter('aria-value-maximum-suffix-before')
    @ariaValueMaximumPrefixAfter = @configure
        .getParameter('aria-value-maximum-prefix-after')
    @ariaValueMaximumSuffixAfter = @configure
        .getParameter('aria-value-maximum-suffix-after')
    @ariaValueMinimumPrefixBefore = @configure
        .getParameter('aria-value-minimum-prefix-before')
    @ariaValueMinimumSuffixBefore = @configure
        .getParameter('aria-value-minimum-suffix-before')
    @ariaValueMinimumPrefixAfter = @configure
        .getParameter('aria-value-minimum-prefix-after')
    @ariaValueMinimumSuffixAfter = @configure
        .getParameter('aria-value-minimum-suffix-after')
    @ariaOrientationHorizontalBefore = @configure
        .getParameter('aria-orientation-horizontal-before')
    @ariaOrientationHorizontalAfter = @configure
        .getParameter('aria-orientation-horizontal-after')
    @ariaOrientationVerticalBefore = @configure
        .getParameter('aria-orientation-vertical-before')
    @ariaOrientationVerticalAfter = @configure
        .getParameter('aria-orientation-vertical-after')
    @ariaPressedFalseBefore = @configure
        .getParameter('aria-pressed-false-before')
    @ariaPressedFalseAfter = @configure.getParameter('aria-pressed-false-after')
    @ariaPressedMixedBefore = @configure
        .getParameter('aria-pressed-mixed-before')
    @ariaPressedMixedAfter = @configure.getParameter('aria-pressed-mixed-after')
    @ariaPressedTrueBefore = @configure.getParameter('aria-pressed-true-before')
    @ariaPressedTrueAfter = @configure.getParameter('aria-pressed-true-after')
    @ariaRequiredTrueBefore = @configure
        .getParameter('aria-required-true-before')
    @ariaRequiredTrueAfter = @configure.getParameter('aria-required-true-after')
    @ariaSelectedFalseBefore = @configure
        .getParameter('aria-selected-false-before')
    @ariaSelectedFalseAfter = @configure
        .getParameter('aria-selected-false-after')
    @ariaSelectedTrueBefore = @configure
        .getParameter('aria-selected-true-before')
    @ariaSelectedTrueAfter = @configure.getParameter('aria-selected-true-after')
    @ariaSortAscendingBefore = @configure
        .getParameter('aria-sort-ascending-before')
    @ariaSortAscendingAfter = @configure
        .getParameter('aria-sort-ascending-after')
    @ariaSortDescendingBefore = @configure
        .getParameter('aria-sort-descending-before')
    @ariaSortDescendingAfter = @configure
        .getParameter('aria-sort-descending-after')
    @ariaSortOtherBefore = @configure.getParameter('aria-sort-other-before')
    @ariaSortOtherAfter = @configure.getParameter('aria-sort-other-after')
    
    @dataInvalidUrlBefore = @configure
        .getParameter('attribute-data-invalid-url-before')
    @dataInvalidUrlAfter = @configure
        .getParameter('attribute-data-invalid-url-after')
    @dataInvalidEmailBefore = @configure
        .getParameter('attribute-data-invalid-email-before')
    @dataInvalidEmailAfter = @configure
        .getParameter('attribute-data-invalid-email-after')
    @dataInvalidRangeBefore = @configure
        .getParameter('attribute-data-invalid-range-before')
    @dataInvalidRangeAfter = @configure
        .getParameter('attribute-data-invalid-range-after')
    @dataInvalidLengthBefore = @configure
        .getParameter('attribute-data-invalid-length-before')
    @dataInvalidLengthAfter = @configure
        .getParameter('attribute-data-invalid-length-after')
    @dataInvalidPatternBefore = @configure
        .getParameter('attribute-data-invalid-pattern-before')
    @dataInvalidPatternAfter = @configure
        .getParameter('attribute-data-invalid-pattern-after')
    @dataInvalidRequiredBefore = @configure
        .getParameter('attribute-data-invalid-required-before')
    @dataInvalidRequiredAfter = @configure
        .getParameter('attribute-data-invalid-required-after')
    @dataInvalidDateBefore = @configure
        .getParameter('attribute-data-invalid-date-before')
    @dataInvalidDateAfter = @configure
        .getParameter('attribute-data-invalid-date-after')
    @dataInvalidTimeBefore = @configure
        .getParameter('attribute-data-invalid-time-before')
    @dataInvalidTimeAfter = @configure
        .getParameter('attribute-data-invalid-time-after')
    @dataInvalidDateTimeBefore = @configure
        .getParameter('attribute-data-invalid-datetime-before')
    @dataInvalidDateTimeAfter = @configure
        .getParameter('attribute-data-invalid-datetime-after')
    @dataInvalidMonthBefore = @configure
        .getParameter('attribute-data-invalid-month-before')
    @dataInvalidMonthAfter = @configure
        .getParameter('attribute-data-invalid-month-after')
    @dataInvalidWeekBefore = @configure
        .getParameter('attribute-data-invalid-week-before')
    @dataInvalidWeekAfter = @configure
        .getParameter('attribute-data-invalid-week-after')
    
    @shortcutPrefix = @_getShortcutPrefix(userAgent, @attributeAccesskeyDefault)
  
  # Display the shortcut of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @see hatemile.AccessibleDisplay#displayShortcut
  #
  displayShortcut: (element) ->
    if element.hasAttribute('accesskey')
      description = @_getDescription(element)
      if not element.hasAttribute('title')
        @idGenerator.generateId(element)
        element.setAttribute(DATA_ATTRIBUTE_TITLE_BEFORE_OF, \
            element.getAttribute('id'))
        element.setAttribute(DATA_ATTRIBUTE_TITLE_AFTER_OF, \
            element.getAttribute('id'))
        element.setAttribute('title', description)
      
      if not @listShortcutsAdded
        @listShortcuts = @_generateListShortcuts()
      
      keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
      for key in keys
        key = key.toUpperCase()
        if @parser.find(@listShortcuts)
            .findChildren("[#{DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF}=\"#{key}\"]" \
            + ",[#{DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF}=\"#{key}\"]")
            .firstResult() is null
          shortcut = "#{@shortcutPrefix} + #{key}"
          @_forceRead(element, shortcut, @attributeAccesskeyPrefixBefore, \
              @attributeAccesskeySuffixBefore, @attributeAccesskeyPrefixAfter, \
              @attributeAccesskeySuffixAfter, \
              DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF, \
              DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF)
          
          if @listShortcuts isnt null
            item = @parser.createElement('li')
            item.setAttribute(DATA_ATTRIBUTE_ACCESSKEY_BEFORE_OF, key)
            item.setAttribute(DATA_ATTRIBUTE_ACCESSKEY_AFTER_OF, key)
            item.appendText("#{shortcut}: #{description}")
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
      roleDescription = @_getRoleDescription(role)
      if roleDescription isnt null
        @_forceRead(element, roleDescription, @attributeRolePrefixBefore, \
            @attributeRoleSuffixBefore, @attributeRolePrefixAfter, \
            @attributeRoleSuffixAfter, DATA_ROLE_BEFORE_OF, DATA_ROLE_AFTER_OF)
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
      textHeader = null
      idsHeaders = tableCell.getAttribute('headers')
          .split(new RegExp('[ \n\t\r]+'))
      for idHeader in idsHeaders
        header = @parser.find("##{idHeader}").firstResult()
        if header isnt null
          if textHeader is null
            textHeader = header.getTextContent()
          else
            textHeader = "#{textHeader} #{header.getTextContent()}"
      if (textHeader isnt null) and (textHeader.length > 0)
        @_forceRead(tableCell, textHeader, @attributeHeadersPrefixBefore, \
            @attributeHeadersSuffixBefore, @attributeHeadersPrefixAfter, \
            @attributeHeadersSuffixAfter, DATA_ATTRIBUTE_HEADERS_BEFORE_OF, \
            DATA_ATTRIBUTE_HEADERS_AFTER_OF)
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
  # @param [hatemile.util.html.HTMLDOMElement] element The element with WAI-ARIA attributes.
  #
  # @see hatemile.AccessibleDisplay#displayWAIARIAStates
  #
  displayWAIARIAStates: (element) ->
    if (element.hasAttribute('aria-busy')) and \
        (element.getAttribute('aria-busy') is 'true')
      @_forceReadSimple(element, @ariaBusyTrueBefore, @ariaBusyTrueAfter, \
          DATA_ARIA_BUSY_BEFORE_OF, DATA_ARIA_BUSY_AFTER_OF)
    if element.hasAttribute('aria-checked')
      attributeValue = element.getAttribute('aria-checked')
      if attributeValue is 'true'
        @_forceReadSimple(element, @ariaCheckedTrueBefore, \
            @ariaCheckedTrueAfter, DATA_ARIA_CHECKED_BEFORE_OF, \
            DATA_ARIA_CHECKED_AFTER_OF)
      else if attributeValue is 'false'
        @_forceReadSimple(element, @ariaCheckedFalseBefore, \
            @ariaCheckedFalseAfter, DATA_ARIA_CHECKED_BEFORE_OF, \
            DATA_ARIA_CHECKED_AFTER_OF)
      else if attributeValue is 'mixed'
        @_forceReadSimple(element, @ariaCheckedMixedBefore, \
            @ariaCheckedMixedAfter, DATA_ARIA_CHECKED_BEFORE_OF, \
            DATA_ARIA_CHECKED_AFTER_OF)
    if element.hasAttribute('aria-expanded')
      attributeValue = element.getAttribute('aria-expanded')
      if attributeValue is 'true'
        @_forceReadSimple(element, @ariaExpandedTrueBefore, \
            @ariaExpandedTrueAfter, DATA_ARIA_EXPANDED_BEFORE_OF, \
            DATA_ARIA_EXPANDED_AFTER_OF)
      else if attributeValue is 'false'
        @_forceReadSimple(element, @ariaExpandedFalseBefore, \
            @ariaExpandedFalseAfter, DATA_ARIA_EXPANDED_BEFORE_OF, \
            DATA_ARIA_EXPANDED_AFTER_OF)
    if (element.hasAttribute('aria-haspopup')) and \
        (element.getAttribute('aria-haspopup') is 'true')
      @_forceReadSimple(element, @ariaHaspopupTrueBefore, \
          @ariaHaspopupTrueAfter, DATA_ARIA_HASPOPUP_BEFORE_OF, \
          DATA_ARIA_HASPOPUP_AFTER_OF)
    if (element.hasAttribute('aria-invalid')) and \
        (element.getAttribute('aria-invalid') is 'true')
      @_forceReadSimple(element, @ariaInvalidTrueBefore, \
          @ariaInvalidTrueAfter, DATA_ARIA_INVALID_BEFORE_OF, \
          DATA_ARIA_INVALID_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_LENGTH)
        @_forceReadSimple(element, @dataInvalidLengthBefore, \
            @dataInvalidLengthAfter, DATA_INVALID_LENGTH_BEFORE_OF, \
            DATA_INVALID_LENGTH_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_PATTERN)
        @_forceReadSimple(element, @dataInvalidPatternBefore, \
            @dataInvalidPatternAfter, DATA_INVALID_PATTERN_BEFORE_OF, \
            DATA_INVALID_PATTERN_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_REQUIRED)
        @_forceReadSimple(element, @dataInvalidRequiredBefore, \
            @dataInvalidRequiredAfter, DATA_INVALID_REQUIRED_BEFORE_OF, \
            DATA_INVALID_REQUIRED_AFTER_OF)
      if element.hasAttribute(DATA_INVALID_URL)
        @_forceReadSimple(element, @dataInvalidUrlBefore, \
            @dataInvalidUrlAfter, DATA_INVALID_URL_BEFORE_OF, \
            DATA_INVALID_URL_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_EMAIL)
        @_forceReadSimple(element, @dataInvalidEmailBefore, \
            @dataInvalidEmailAfter, DATA_INVALID_EMAIL_BEFORE_OF, \
            DATA_INVALID_EMAIL_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_RANGE)
        @_forceReadSimple(element, @dataInvalidRangeBefore, \
            @dataInvalidRangeAfter, DATA_INVALID_RANGE_BEFORE_OF, \
            DATA_INVALID_RANGE_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_DATE)
        @_forceReadSimple(element, @dataInvalidDateBefore, \
            @dataInvalidDateAfter, DATA_INVALID_DATE_BEFORE_OF, \
            DATA_INVALID_DATE_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_TIME)
        @_forceReadSimple(element, @dataInvalidTimeBefore, \
            @dataInvalidTimeAfter, DATA_INVALID_TIME_BEFORE_OF, \
            DATA_INVALID_TIME_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_DATETIME)
        @_forceReadSimple(element, @dataInvalidDateTimeBefore, \
            @dataInvalidDateTimeAfter, DATA_INVALID_DATETIME_BEFORE_OF, \
            DATA_INVALID_DATETIME_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_MONTH)
        @_forceReadSimple(element, @dataInvalidMonthBefore, \
            @dataInvalidMonthAfter, DATA_INVALID_MONTH_BEFORE_OF, \
            DATA_INVALID_MONTH_AFTER_OF)
      else if element.hasAttribute(DATA_INVALID_WEEK)
        @_forceReadSimple(element, @dataInvalidWeekBefore, \
            @dataInvalidWeekAfter, DATA_INVALID_WEEK_BEFORE_OF, \
            DATA_INVALID_WEEK_AFTER_OF)
    if element.hasAttribute('aria-level')
      @_forceRead(element, element.getAttribute('aria-level'), \
          @ariaLevelPrefixBefore, @ariaLevelSuffixBefore, \
          @ariaLevelPrefixAfter, @ariaLevelSuffixAfter, \
          DATA_ARIA_LEVEL_BEFORE_OF, DATA_ARIA_LEVEL_AFTER_OF)
    if element.hasAttribute('aria-orientation')
      attributeValue = element.getAttribute('aria-orientation')
      if attributeValue is 'vertical'
        @_forceReadSimple(element, @ariaOrientationVerticalBefore, \
            @ariaOrientationVerticalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, \
            DATA_ARIA_ORIENTATION_AFTER_OF)
      else if attributeValue is 'horizontal'
        @_forceReadSimple(element, @ariaOrientationHorizontalBefore, \
            @ariaOrientationHorizontalAfter, DATA_ARIA_ORIENTATION_BEFORE_OF, \
            DATA_ARIA_ORIENTATION_AFTER_OF)
    if element.hasAttribute('aria-pressed')
      attributeValue = element.getAttribute('aria-pressed')
      if attributeValue is 'true'
        @_forceReadSimple(element, @ariaPressedTrueBefore, \
            @ariaPressedTrueAfter, DATA_ARIA_PRESSED_BEFORE_OF, \
            DATA_ARIA_PRESSED_AFTER_OF)
      else if attributeValue is 'false'
        @_forceReadSimple(element, @ariaPressedFalseBefore, \
            @ariaPressedFalseAfter, DATA_ARIA_PRESSED_BEFORE_OF, \
            DATA_ARIA_PRESSED_AFTER_OF)
      else if attributeValue is 'mixed'
        @_forceReadSimple(element, @ariaPressedMixedBefore, \
            @ariaPressedMixedAfter, DATA_ARIA_PRESSED_BEFORE_OF, \
            DATA_ARIA_PRESSED_AFTER_OF)
    if element.hasAttribute('aria-selected')
      attributeValue = element.getAttribute('aria-selected')
      if attributeValue is 'true'
        @_forceReadSimple(element, @ariaSelectedTrueBefore, \
            @ariaSelectedTrueAfter, DATA_ARIA_SELECTED_BEFORE_OF, \
            DATA_ARIA_SELECTED_AFTER_OF)
      else if attributeValue is 'false'
        @_forceReadSimple(element, @ariaSelectedFalseBefore, \
            @ariaSelectedFalseAfter, DATA_ARIA_SELECTED_BEFORE_OF, \
            DATA_ARIA_SELECTED_AFTER_OF)
    if element.hasAttribute('aria-sort')
      attributeValue = element.getAttribute('aria-sort')
      if attributeValue is 'ascending'
        @_forceReadSimple(element, @ariaSortAscendingBefore, \
            @ariaSortAscendingAfter, DATA_ARIA_SORT_BEFORE_OF, \
            DATA_ARIA_SORT_AFTER_OF)
      else if attributeValue is 'descending'
        @_forceReadSimple(element, @ariaSortDescendingBefore, \
            @ariaSortDescendingAfter, DATA_ARIA_SORT_BEFORE_OF, \
            DATA_ARIA_SORT_AFTER_OF)
      else if attributeValue is 'other'
        @_forceReadSimple(element, @ariaSortOtherBefore, @ariaSortOtherAfter, \
            DATA_ARIA_SORT_BEFORE_OF, DATA_ARIA_SORT_AFTER_OF)
    if (element.hasAttribute('aria-required')) and \
        (element.getAttribute('aria-required') is 'true')
      @_forceReadSimple(element, @ariaRequiredTrueBefore, \
          @ariaRequiredTrueAfter, DATA_ATTRIBUTE_REQUIRED_BEFORE_OF, \
          DATA_ATTRIBUTE_REQUIRED_AFTER_OF)
    if element.hasAttribute('aria-valuemin')
      @_forceRead(element, element.getAttribute('aria-valuemin'), \
          @ariaValueMinimumPrefixBefore, @ariaValueMinimumSuffixBefore, \
          @ariaValueMinimumPrefixAfter, @ariaValueMinimumSuffixAfter, \
          DATA_ATTRIBUTE_RANGE_MIN_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MIN_AFTER_OF)
    if element.hasAttribute('aria-valuemax')
      @_forceRead(element, element.getAttribute('aria-valuemax'), \
          @ariaValueMaximumPrefixBefore, @ariaValueMaximumSuffixBefore, \
          @ariaValueMaximumPrefixAfter, @ariaValueMaximumSuffixAfter, \
          DATA_ATTRIBUTE_RANGE_MAX_BEFORE_OF, DATA_ATTRIBUTE_RANGE_MAX_AFTER_OF)
    if element.hasAttribute('aria-autocomplete')
      attributeValue = element.getAttribute('aria-autocomplete')
      if attributeValue is 'both'
        @_forceReadSimple(element, @ariaAutoCompleteBothBefore, \
            @ariaAutoCompleteBothAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, \
            DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF)
      else if attributeValue is 'inline'
        @_forceReadSimple(element, @ariaAutoCompleteListBefore, \
            @ariaAutoCompleteListAfter, DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, \
            DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF)
      else if attributeValue is 'list'
        @_forceReadSimple(element, @ariaAutoCompleteInlineBefore, \
            @ariaAutoCompleteInlineAfter, \
            DATA_ATTRIBUTE_AUTOCOMPLETE_BEFORE_OF, \
            DATA_ATTRIBUTE_AUTOCOMPLETE_AFTER_OF)
    @_displayWAIARIADragandDrop(element)
    return
  
  # Display the WAI-ARIA attributes of all elements of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllWAIARIAStates
  #
  displayAllWAIARIAStates: () ->
    elements = @parser.find('[aria-busy="true"],[aria-checked],' \
        + '[aria-dropeffect],[aria-expanded],[aria-grabbed],[aria-haspopup],' \
        + '[aria-invalid=true],[aria-level],[aria-orientation],' \
        + '[aria-pressed],[aria-selected],[aria-sort],[aria-required="true"],' \
        + '[aria-valuemin],[aria-valuemax],[aria-autocomplete]').listResults()
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
      @_forceReadSimple(link, @attributeDownloadBefore, \
          @attributeDownloadAfter, DATA_ATTRIBUTE_DOWNLOAD_BEFORE_OF, \
          DATA_ATTRIBUTE_DOWNLOAD_AFTER_OF)
    if (link.hasAttribute('target')) and \
        (link.getAttribute('target') is '_blank')
      @_forceReadSimple(link, @attributeTargetBlankBefore, \
          @attributeTargetBlankAfter, DATA_ATTRIBUTE_TARGET_BEFORE_OF, \
          DATA_ATTRIBUTE_TARGET_AFTER_OF)
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
    if (element.hasAttribute('title')) and \
        (element.getAttribute('title').length > 0)
      if element.getTagName() is 'IMG'
        @displayAlternativeTextImage(element)
      else
        @_forceRead(element, element.getAttribute('title'), \
            @attributeTitlePrefixBefore, @attributeTitleSuffixBefore, \
            @attributeTitlePrefixAfter, @attributeTitleSuffixAfter, \
            DATA_ATTRIBUTE_TITLE_BEFORE_OF, DATA_ATTRIBUTE_TITLE_AFTER_OF)
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
  # @param [hatemile.util.html.HTMLDOMElement] element The element with drag or drop events.
  #
  # @see hatemile.AccessibleDisplay#displayDragAndDrop
  #
  displayDragAndDrop: (element) ->
    if element.hasAttribute('draggable')
      @_forceReadSimple(element, @attributeDraggableBefore, \
          @attributeDraggableAfter, DATA_ATTRIBUTE_DRAGGABLE_BEFORE_OF, \
          DATA_ATTRIBUTE_DRAGGABLE_AFTER_OF)
    if element.hasAttribute('dropzone')
      attributeValue = element.getAttribute('dropzone')
      if attributeValue is 'copy'
        @_forceReadSimple(element, @attributeDropzoneCopyBefore, \
            @attributeDropzoneCopyAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, \
            DATA_ATTRIBUTE_DROPZONE_AFTER_OF)
      else if attributeValue is 'move'
        @_forceReadSimple(element, @attributeDropzoneMoveBefore, \
            @attributeDropzoneMoveAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, \
            DATA_ATTRIBUTE_DROPZONE_AFTER_OF)
      else if attributeValue is 'link'
        @_forceReadSimple(element, @attributeDropzoneLinkBefore, \
            @attributeDropzoneLinkAfter, DATA_ATTRIBUTE_DROPZONE_BEFORE_OF, \
            DATA_ATTRIBUTE_DROPZONE_AFTER_OF)
    @_displayWAIARIADragandDrop(element)
    return
  
  # Display that an elements of page have drag-and-drop events.
  #
  # @see hatemile.AccessibleDisplay#displayAllDragsAndDrops
  #
  displayAllDragsAndDrops: () ->
    elements = @parser.find('[draggable],[dropzone],[aria-dropeffect],' \
        + '[aria-grabbed]').listResults()
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
    languageCode = null
    if element.hasAttribute('lang')
      languageCode = element.getAttribute('lang')
    else if element.hasAttribute('hreflang')
      languageCode = element.getAttribute('hreflang')
    if languageCode isnt null
      language = @_getLanguageDescription(languageCode)
      if language isnt null
        @_forceRead(element, language, @attributeLanguagePrefixBefore, \
            @attributeLanguageSuffixBefore, @attributeLanguagePrefixAfter, \
            @attributeLanguageSuffixAfter, DATA_ATTRIBUTE_LANGUAGE_BEFORE_OF, \
            DATA_ATTRIBUTE_LANGUAGE_AFTER_OF)
    return
  
  # Display the language of all elements of page.
  #
  # @see hatemile.AccessibleDisplay#displayAllLanguages
  #
  displayAllLanguages: () ->
    elements = @parser.find('html[lang],body[lang],body [lang],body [hreflang]')
        .listResults()
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
      @idGenerator.generateId(image)
      image.setAttribute(DATA_ATTRIBUTE_TITLE_BEFORE_OF, \
          image.getAttribute('id'))
      image.setAttribute(DATA_ATTRIBUTE_TITLE_AFTER_OF, \
          image.getAttribute('id'))
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
    images = @parser.find('img').listResults()
    for image in images
      if self.hatemile.util.CommonFunctions.isValidElement(image)
        @displayAlternativeTextImage(image)
    return
