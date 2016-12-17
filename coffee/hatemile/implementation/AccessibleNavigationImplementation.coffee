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
 * @class AccessibleNavigationImplementation
 * @classdesc The AccessibleNavigationImplementation class is official
 * implementation of AccessibleNavigation interface.
 * @extends hatemile.AccessibleNavigation
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleNavigationImplementation
	
	ID_CONTAINER_SKIPPERS = 'container-skippers'
	ID_CONTAINER_HEADING = 'container-heading'
	ID_TEXT_HEADING = 'text-heading'
	CLASS_SKIPPER_ANCHOR = 'skipper-anchor'
	CLASS_HEADING_ANCHOR = 'heading-anchor'
	DATA_ANCHOR_FOR = 'data-anchorfor'
	DATA_HEADING_ANCHOR_FOR = 'data-headinganchorfor'
	DATA_HEADING_LEVEL = 'data-headinglevel'
	CLASS_LONG_DESCRIPTION_LINK = 'longdescription-link'
	DATA_LONG_DESCRIPTION_FOR_IMAGE = 'data-longdescriptionfor'
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * navigation of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @param {string} userAgent The user agent of the user.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	constructor: (@parser, configure, @skippers) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
		@attributeLongDescriptionPrefixBefore = configure.getParameter('attribute-longdescription-prefix-before')
		@attributeLongDescriptionSuffixBefore = configure.getParameter('attribute-longdescription-suffix-before')
		@attributeLongDescriptionPrefixAfter = configure.getParameter('attribute-longdescription-prefix-after')
		@attributeLongDescriptionSuffixAfter = configure.getParameter('attribute-longdescription-suffix-after')
		@elementsHeadingBefore = configure.getParameter('elements-heading-before')
		@elementsHeadingAfter = configure.getParameter('elements-heading-after')
		@listSkippersAdded = false
		@validateHeading = false
		@validHeading = false
		@listSkippers = undefined
	
	###*
	 * Generate the list of skippers of page.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of skippers of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListSkippers = (parser) ->
		container = parser.find("##{ID_CONTAINER_SKIPPERS}").firstResult()
		if isEmpty(container)
			local = parser.find('body').firstResult()
			if not isEmpty(local)
				container = parser.createElement('div')
				container.setAttribute('id', ID_CONTAINER_SKIPPERS)
				local.getFirstElementChild().insertBefore(container)
		list = undefined
		if not isEmpty(container)
			list = parser.find(container).findChildren('ul').firstResult()
			if isEmpty(list)
				list = parser.createElement('ul')
				container.appendElement(list)
		return list
	
	###*
	 * Generate the list of heading links of page.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} textHeading The text of description of container of heading
	 * links.
	 * @return {hatemile.util.html.HTMLDOMElement} The list of heading links of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListHeading = (parser, textHeading) ->
		container = parser.find("##{ID_CONTAINER_HEADING}").firstResult()
		if isEmpty(container)
			local = parser.find('body').firstResult()
			if not isEmpty(local)
				container = parser.createElement('div')
				container.setAttribute('id', ID_CONTAINER_HEADING)
				
				textContainer = parser.createElement('span')
				textContainer.setAttribute('id', ID_TEXT_HEADING)
				textContainer.appendText(textHeading)
				
				container.appendElement(textContainer)
				local.appendElement(container)
		list = undefined
		if not isEmpty(container)
			list = parser.find(container).findChildren('ol').firstResult()
			if isEmpty(list)
				list = parser.createElement('ol')
				container.appendElement(list)
		return list
	
	###*
	 * Returns the level of heading.
	 * @param {hatemile.util.html.HTMLDOMElement} element The heading.
	 * @return {number} The level of heading.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	getHeadingLevel = (element) ->
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
	
	###*
	 * Inform if the headings of page are sintatic correct.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {boolean} True if the headings of page are sintatic correct or
	 * false if not.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	isValidHeading = (parser) ->
		elements = parser.find('h1,h2,h3,h4,h5,h6').listResults()
		lastLevel = 0
		countMainHeading = 0
		for element in elements
			level = getHeadingLevel(element)
			if level is 1
				if countMainHeading is 1
					return false
				else
					countMainHeading = 1
			if level - lastLevel > 1
				return false
			lastLevel = level
		return true
	
	###*
	 * Generate an anchor for the element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} dataAttribute The name of attribute that links the element
	 * with the anchor.
	 * @param {string} anchorClass The HTML class of anchor.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} prefixId The prefix of generated ids.
	 * @return {hatemile.util.html.HTMLDOMElement} The anchor.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateAnchorFor = (element, dataAttribute, anchorClass, parser, prefixId) ->
		exports.hatemile.util.CommonFunctions.generateId(element, prefixId)
		anchor = undefined
		if isEmpty(parser.find("[#{dataAttribute}=\"#{element.getAttribute('id')}\"]").firstResult())
			if element.getTagName() is 'A'
				anchor = element
			else
				anchor = parser.createElement('a')
				exports.hatemile.util.CommonFunctions.generateId(anchor, prefixId)
				anchor.setAttribute('class', anchorClass)
				element.insertBefore(anchor)
			if not anchor.hasAttribute('name')
				anchor.setAttribute('name', anchor.getAttribute('id'))
			anchor.setAttribute(dataAttribute, element.getAttribute('id'))
		return anchor
	
	###*
	 * Replace the shortcut of elements, that has the shortcut passed.
	 * @param {hatemile.util.html.HTMLDOMElement} shortcut The shortcut.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	freeShortcut = (shortcut, parser) ->
		alphaNumbers = '1234567890abcdefghijklmnopqrstuvwxyz'
		elements = parser.find('[accesskey]').listResults()
		for element in elements
			shortcuts = element.getAttribute('accesskey').toLowerCase()
			if exports.hatemile.util.CommonFunctions.inList(shortcuts, shortcut)
				for key in alphaNumbers
					found = true
					for elementWithShortcuts in elements
						shortcuts = elementWithShortcuts.getAttribute('accesskey').toLowerCase()
						if exports.hatemile.util.CommonFunctions.inList(shortcuts, key)
							found = false
							break
					if found
						element.setAttribute('accesskey', key)
						break
				if found
					break
		return
	
	fixSkipper: (element) ->
		skipper = undefined
		for auxiliarSkipper in @skippers
			auxiliarElements = @parser.find(auxiliarSkipper['selector']).listResults()
			for auxiliarElement in auxiliarElements
				if auxiliarElement.getData() is element.getData()
					skipper = auxiliarSkipper
					break
			if skipper isnt undefined
				break
		if skipper isnt undefined
			if not @listSkippersAdded
				@listSkippers = generateListSkippers(@parser)
				@listSkippersAdded = true
			if not isEmpty(@listSkippers)
				anchor = generateAnchorFor(element, DATA_ANCHOR_FOR, CLASS_SKIPPER_ANCHOR, @parser, @prefixId)
				if not isEmpty(anchor)
					itemLink = @parser.createElement('li')
					link = @parser.createElement('a')
					link.setAttribute('href', "##{anchor.getAttribute('name')}")
					link.appendText(skipper['default-text'])

					shortcuts = skipper['shortcut']
					if not isEmpty(shortcuts)
						shortcut = shortcuts[0]
						if not isEmpty(shortcut)
							freeShortcut(shortcut, @parser)
							link.setAttribute('accesskey', shortcut)
					exports.hatemile.util.CommonFunctions.generateId(link, @prefixId)

					itemLink.appendElement(link)
					@listSkippers.appendElement(itemLink)
		return
	
	fixAllSkippers: () ->
		for skipper in @skippers
			elements = @parser.find(skipper['selector']).listResults()
			for element in elements
				if exports.hatemile.util.CommonFunctions.isValidElement(element)
					@fixSkipper(element)
		return
	
	fixHeading: (heading) ->
		if not @validateHeading
			@validHeading = isValidHeading(@parser)
			@validateHeading = true
		if @validHeading
			anchor = generateAnchorFor(heading, DATA_HEADING_ANCHOR_FOR, CLASS_HEADING_ANCHOR, @parser, @prefixId)
			if not isEmpty(anchor)
				level = getHeadingLevel(heading)
				if level is 1
					list = generateListHeading(@parser, "#{@elementsHeadingBefore}#{@elementsHeadingAfter}")
				else
					superItem = @parser.find("##{ID_CONTAINER_HEADING}").findDescendants("[#{DATA_HEADING_LEVEL}=\"#{(level - 1).toString()}\"]").lastResult()
					if not isEmpty(superItem)
						list = @parser.find(superItem).findChildren('ol').firstResult()
						if isEmpty(list)
							list = @parser.createElement('ol')
							superItem.appendElement(list)
				if not isEmpty(list)
					item = @parser.createElement('li')
					item.setAttribute(DATA_HEADING_LEVEL, level.toString())
					
					link = @parser.createElement('a')
					link.setAttribute('href', "##{anchor.getAttribute('name')}")
					link.appendText(heading.getTextContent())
					
					item.appendElement(link)
					list.appendElement(item)
		return
	
	fixAllHeadings: () ->
		elements = @parser.find('h1,h2,h3,h4,h5,h6').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@fixHeading(element)
		return
	
	fixLongDescription: (image) ->
		if image.hasAttribute('longdesc')
			exports.hatemile.util.CommonFunctions.generateId(image, @prefixId)
			id = image.getAttribute('id')
			if isEmpty(@parser.find("[#{DATA_LONG_DESCRIPTION_FOR_IMAGE}=\"#{id}\"]").firstResult())
				if image.hasAttribute('alt')
					if not (isEmpty(@attributeLongDescriptionPrefixBefore) and isEmpty(@attributeLongDescriptionSuffixBefore))
						text = "#{@attributeLongDescriptionPrefixBefore} #{image.getAttribute('alt')} #{@attributeLongDescriptionSuffixBefore}"
						anchor = @parser.createElement('a')
						anchor.setAttribute('href', image.getAttribute('longdesc'))
						anchor.setAttribute('target', '_blank')
						anchor.setAttribute(DATA_LONG_DESCRIPTION_FOR_IMAGE, id)
						anchor.setAttribute('class', CLASS_LONG_DESCRIPTION_LINK)
						anchor.appendText(text)
						image.insertBefore(anchor)
					if not (isEmpty(@attributeLongDescriptionPrefixAfter) and isEmpty(@attributeLongDescriptionSuffixAfter))
						text = "#{@attributeLongDescriptionPrefixAfter} #{image.getAttribute('alt')} #{@attributeLongDescriptionSuffixAfter}"
						anchor = @parser.createElement('a')
						anchor.setAttribute('href', image.getAttribute('longdesc'))
						anchor.setAttribute('target', '_blank')
						anchor.setAttribute(DATA_LONG_DESCRIPTION_FOR_IMAGE, id)
						anchor.setAttribute('class', CLASS_LONG_DESCRIPTION_LINK)
						anchor.appendText(text)
						image.insertAfter(anchor)
		return
	
	fixAllLongDescriptions: () ->
		elements = @parser.find('[longdesc]').listResults()
		for element in elements
			if exports.hatemile.util.CommonFunctions.isValidElement(element)
				@fixLongDescription(element)
		return