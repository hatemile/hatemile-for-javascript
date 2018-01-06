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

# The AccessibleNavigationImplementation class is official implementation of
# {hatemile.AccessibleNavigation}.
#
# @extend hatemile.AccessibleNavigation
#
class @hatemile.implementation.AccessibleNavigationImplementation
  
  ID_CONTAINER_SKIPPERS = 'container-skippers'
  ID_CONTAINER_HEADING = 'container-heading'
  ID_TEXT_HEADING = 'text-heading'
  CLASS_SKIPPER_ANCHOR = 'skipper-anchor'
  CLASS_HEADING_ANCHOR = 'heading-anchor'
  CLASS_FORCE_LINK_BEFORE = 'force-link-before'
  CLASS_FORCE_LINK_AFTER = 'force-link-after'
  DATA_ANCHOR_FOR = 'data-anchorfor'
  DATA_HEADING_ANCHOR_FOR = 'data-headinganchorfor'
  DATA_HEADING_LEVEL = 'data-headinglevel'
  DATA_ATTRIBUTE_LONG_DESCRIPTION_BEFORE_OF = \
      'data-attributelongdescriptionbeforeof'
  DATA_ATTRIBUTE_LONG_DESCRIPTION_AFTER_OF = \
      'data-attributelongdescriptionafterof'
  
  # Generate the list of skippers of page.
  #
  # @private
  #
  # @return [hatemile.util.html.HTMLDOMElement] The list of skippers of page.
  #
  _generateListSkippers: () ->
    container = @parser.find("##{ID_CONTAINER_SKIPPERS}").firstResult()
    if container is null
      local = @parser.find('body').firstResult()
      if local isnt null
        container = @parser.createElement('div')
        container.setAttribute('id', ID_CONTAINER_SKIPPERS)
        local.prependElement(container)
    list = null
    if container isnt null
      list = @parser.find(container).findChildren('ul').firstResult()
      if list is null
        list = @parser.createElement('ul')
        container.appendElement(list)
    
    @listSkippersAdded = true
    
    return list
  
  # Generate the list of heading links of page.
  #
  # @private
  #
  # @return [hatemile.util.html.HTMLDOMElement] The list of heading links of page.
  #
  _generateListHeading: () ->
    container = @parser.find("##{ID_CONTAINER_HEADING}").firstResult()
    if container is null
      local = @parser.find('body').firstResult()
      if local isnt null
        container = @parser.createElement('div')
        container.setAttribute('id', ID_CONTAINER_HEADING)
        
        textContainer = @parser.createElement('span')
        textContainer.setAttribute('id', ID_TEXT_HEADING)
        
        container.appendElement(textContainer)
        
        if @elementsHeadingBefore.length > 0
          textContainer.appendText(@elementsHeadingBefore)
          local.prependElement(container)
        if @elementsHeadingAfter.length > 0
          textContainer.appendText(@elementsHeadingAfter)
          local.appendElement(container)
    list = null
    if container isnt null
      list = @parser.find(container).findChildren('ol').firstResult()
      if list is null
        list = @parser.createElement('ol')
        container.appendElement(list)
    return list
  
  # Returns the level of heading.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The heading.
  #
  # @return [number] The level of heading.
  #
  _getHeadingLevel: (element) ->
    tag = element.getTagName()
    if tag is 'H1'
      return 1
    else if tag is 'H2'
      return 2
    else if tag is 'H3'
      return 3
    else if tag is 'H4'
      return 4
    else if tag is 'H5'
      return 5
    else if tag is 'H6'
      return 6
    else
      return -1
  
  # Check that the headings of page are sintatic correct.
  #
  # @private
  #
  # @return [boolean] True if the headings of page are sintatic correct or false if not.
  #
  _isValidHeading: () ->
    @validateHeading = true
    elements = @parser.find('h1,h2,h3,h4,h5,h6').listResults()
    lastLevel = 0
    countMainHeading = 0
    for element in elements
      level = @_getHeadingLevel(element)
      if level is 1
        if countMainHeading is 1
          return false
        else
          countMainHeading = 1
      if level - lastLevel > 1
        return false
      lastLevel = level
    return true
  
  # Generate an anchor for the element.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [string] dataAttribute The custom attribute that links the element with the anchor.
  # @param [string] anchorClass The HTML class of anchor.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The anchor.
  #
  _generateAnchorFor: (element, dataAttribute, anchorClass) ->
    @idGenerator.generateId(element)
    anchor = null
    if @parser.find("[#{dataAttribute}=\"#{element.getAttribute('id')}\"]")
        .firstResult() is null
      if element.getTagName() is 'A'
        anchor = element
      else
        anchor = @parser.createElement('a')
        @idGenerator.generateId(anchor)
        anchor.setAttribute('class', anchorClass)
        element.insertBefore(anchor)
      if not anchor.hasAttribute('name')
        anchor.setAttribute('name', anchor.getAttribute('id'))
      anchor.setAttribute(dataAttribute, element.getAttribute('id'))
    return anchor
  
  # Replace the shortcut of elements, that has the shortcut passed.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] shortcut The shortcut.
  #
  _freeShortcut: (shortcut) ->
    alphaNumbers = '1234567890abcdefghijklmnopqrstuvwxyz'
    elements = @parser.find('[accesskey]').listResults()
    for element in elements
      shortcuts = element.getAttribute('accesskey').toLowerCase()
      if self.hatemile.util.CommonFunctions.inList(shortcuts, shortcut)
        for key in alphaNumbers
          found = true
          for elementWithShortcuts in elements
            shortcuts = elementWithShortcuts.getAttribute('accesskey')
                .toLowerCase()
            if self.hatemile.util.CommonFunctions.inList(shortcuts, key)
              found = false
              break
          if found
            element.setAttribute('accesskey', key)
            break
        if found
          break
    return
  
  # Initializes a new object that manipulate the accessibility of the navigation
  # of parser.
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  # @param [Array<Object>] skippers The skippers.
  # @option Array<skippers> [string] selector The skipper selector.
  # @option Array<skippers> [string] description The description of skipper.
  # @option Array<skippers> [string] shortcut The skipper shortcut.
  #
  constructor: (@parser, @configure, @skippers) ->
    @idGenerator = new hatemile.util.IDGenerator('navigation')
    @attributeLongDescriptionPrefixBefore = @configure
        .getParameter('attribute-longdescription-prefix-before')
    @attributeLongDescriptionSuffixBefore = @configure
        .getParameter('attribute-longdescription-suffix-before')
    @attributeLongDescriptionPrefixAfter = @configure
        .getParameter('attribute-longdescription-prefix-after')
    @attributeLongDescriptionSuffixAfter = @configure
        .getParameter('attribute-longdescription-suffix-after')
    @elementsHeadingBefore = @configure.getParameter('elements-heading-before')
    @elementsHeadingAfter = @configure.getParameter('elements-heading-after')
    @listSkippersAdded = false
    @validateHeading = false
    @validHeading = false
    @listSkippers = null
  
  # Provide a content skipper for element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @see hatemile.AccessibleNavigation#provideNavigationBySkipper
  #
  provideNavigationBySkipper: (element) ->
    skipper = null
    for auxiliarSkipper in @skippers
      auxiliarElements = @parser.find(auxiliarSkipper['selector']).listResults()
      for auxiliarElement in auxiliarElements
        if auxiliarElement.equals(element)
          skipper = auxiliarSkipper
          break
      if skipper isnt null
        break
    if skipper isnt null
      if not @listSkippersAdded
        @listSkippers = @_generateListSkippers()
      if @listSkippers isnt null
        anchor = @_generateAnchorFor(element, DATA_ANCHOR_FOR, \
            CLASS_SKIPPER_ANCHOR)
        if anchor isnt null
          itemLink = @parser.createElement('li')
          link = @parser.createElement('a')
          link.setAttribute('href', "##{anchor.getAttribute('name')}")
          link.appendText(@configure.getParameter(skipper['description']))

          shortcuts = skipper['shortcut']
          if (shortcuts isnt undefined) and (shortcuts.length > 0)
            shortcut = shortcuts[0]
            @_freeShortcut(shortcut)
            link.setAttribute('accesskey', shortcut)
          @idGenerator.generateId(link)

          itemLink.appendElement(link)
          @listSkippers.appendElement(itemLink)
    return
  
  # Provide navigation by content skippers.
  #
  # @see hatemile.AccessibleNavigation#provideNavigationByAllSkippers
  #
  provideNavigationByAllSkippers: () ->
    for skipper in @skippers
      elements = @parser.find(skipper['selector']).listResults()
      for element in elements
        if self.hatemile.util.CommonFunctions.isValidElement(element)
          @provideNavigationBySkipper(element)
    return
  
  # Provide navigation by heading.
  #
  # @param [hatemile.util.html.HTMLDOMElement] heading The heading element.
  #
  # @see hatemile.AccessibleNavigation#provideNavigationByHeading
  #
  provideNavigationByHeading: (heading) ->
    if not @validateHeading
      @validHeading = @_isValidHeading()
    if @validHeading
      anchor = @_generateAnchorFor(heading, DATA_HEADING_ANCHOR_FOR, \
          CLASS_HEADING_ANCHOR)
      if anchor isnt null
        level = @_getHeadingLevel(heading)
        if level is 1
          list = @_generateListHeading()
        else
          superItem = @parser.find("##{ID_CONTAINER_HEADING}")
              .findDescendants("[#{DATA_HEADING_LEVEL}=\"" \
              + "#{(level - 1).toString()}\"]").lastResult()
          if superItem isnt null
            list = @parser.find(superItem).findChildren('ol').firstResult()
            if list is null
              list = @parser.createElement('ol')
              superItem.appendElement(list)
        if list isnt null
          item = @parser.createElement('li')
          item.setAttribute(DATA_HEADING_LEVEL, level.toString())
          
          link = @parser.createElement('a')
          link.setAttribute('href', "##{anchor.getAttribute('name')}")
          link.appendText(heading.getTextContent())
          
          item.appendElement(link)
          list.appendElement(item)
    return
  
  # Provide navigation by headings of page.
  #
  # @see hatemile.AccessibleNavigation#provideNavigationByAllHeadings
  #
  provideNavigationByAllHeadings: () ->
    elements = @parser.find('h1,h2,h3,h4,h5,h6').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @provideNavigationByHeading(element)
    return
  
  # Provide an alternative way to access the long description of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] image The image with long description.
  #
  # @see hatemile.AccessibleNavigation#provideNavigationToLongDescription
  #
  provideNavigationToLongDescription: (image) ->
    if image.hasAttribute('longdesc')
      @idGenerator.generateId(image)
      id = image.getAttribute('id')
      if image.hasAttribute('alt')
        if @parser
            .find("[#{DATA_ATTRIBUTE_LONG_DESCRIPTION_BEFORE_OF}=\"#{id}\"]")
            .firstResult() is null
          if (@attributeLongDescriptionPrefixBefore.length > 0) or \
              (@attributeLongDescriptionSuffixBefore.length > 0)
            beforeText = "#{@attributeLongDescriptionPrefixBefore}" \
                + "#{image.getAttribute('alt')}" \
                + "#{@attributeLongDescriptionSuffixBefore}"
            anchor = @parser.createElement('a')
            anchor.setAttribute('href', image.getAttribute('longdesc'))
            anchor.setAttribute('target', '_blank')
            anchor.setAttribute(DATA_ATTRIBUTE_LONG_DESCRIPTION_BEFORE_OF, id)
            anchor.setAttribute('class', CLASS_FORCE_LINK_BEFORE)
            anchor.appendText(beforeText)
            image.insertBefore(anchor)
        if @parser
            .find("[#{DATA_ATTRIBUTE_LONG_DESCRIPTION_AFTER_OF}=\"#{id}\"]")
            .firstResult() is null
          if (@attributeLongDescriptionPrefixAfter.length > 0) or \
              (@attributeLongDescriptionSuffixAfter.length > 0)
            text = "#{@attributeLongDescriptionPrefixAfter}" \
                + "#{image.getAttribute('alt')}" \
                + "#{@attributeLongDescriptionSuffixAfter}"
            anchor = @parser.createElement('a')
            anchor.setAttribute('href', image.getAttribute('longdesc'))
            anchor.setAttribute('target', '_blank')
            anchor.setAttribute(DATA_ATTRIBUTE_LONG_DESCRIPTION_AFTER_OF, id)
            anchor.setAttribute('class', CLASS_FORCE_LINK_AFTER)
            anchor.appendText(text)
            image.insertAfter(anchor)
    return
  
  # Provide an alternative way to access the longs descriptions of all elements
  # of page.
  #
  # @see hatemile.AccessibleNavigation#provideNavigationToAllLongDescriptions
  #
  provideNavigationToAllLongDescriptions: () ->
    elements = @parser.find('[longdesc]').listResults()
    for element in elements
      if self.hatemile.util.CommonFunctions.isValidElement(element)
        @provideNavigationToLongDescription(element)
    return
