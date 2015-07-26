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
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * navigation of parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @param {String} userAgent The user agent of the user.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	constructor: (@parser, configure, userAgent) ->
		@idContainerShortcuts = 'container-shortcuts'
		@idContainerSkippers = 'container-skippers'
		@idContainerHeading = 'container-heading'
		@idTextShortcuts = 'text-shortcuts'
		@idTextHeading = 'text-heading'
		@classSkipperAnchor = 'skipper-anchor'
		@classHeadingAnchor = 'heading-anchor'
		@dataAccessKey = 'data-shortcutdescriptionfor'
		@dataIgnore = 'data-ignoreaccessibilityfix'
		@dataAnchorFor = 'data-anchorfor'
		@dataHeadingAnchorFor = 'data-headinganchorfor'
		@dataHeadingLevel = 'data-headinglevel'
		@prefixId = configure.getParameter('prefix-generated-ids')
		@textShortcuts = configure.getParameter('text-shortcuts')
		@textHeading = configure.getParameter('text-heading')
		@standartPrefix = configure.getParameter('text-standart-shortcut-prefix')
		@skippers = configure.getSkippers()
		@listShortcutsAdded = false
		@listSkippersAdded = false
		@validateHeading = false
		@validHeading = false
		@listShortcuts = undefined
		@listSkippers = undefined
		
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
				@prefix = 'SHIFT + ESC'
			else if chrome and mac and (not spoofer)
				@prefix = 'CTRL + OPTION'
			else if safari and (not windows) and (not spoofer)
				@prefix = 'CTRL + ALT'
			else if (not windows) and (safari or mac or konqueror)
				@prefix = 'CTRL'
			else if firefox
				@prefix = 'ALT + SHIFT'
			else if chrome or ie
				@prefix = 'ALT'
			else
				@prefix = @standartPrefix
		else
			@prefix = @standartPrefix
	
	###*
	 * Returns the description of element.
	 * @param {hatemile.util.HTMLDOMElement} element The element with description.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
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
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {String} idContainerShortcuts The id of list element that contains
	 * the description of shortcuts.
	 * @param {String} idTextShortcuts The id of text of description of container
	 * of shortcuts descriptions.
	 * @param {String} textShortcuts The text of description of container of
	 * shortcuts descriptions.
	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
	 * callback This class.
	 * @return {hatemile.util.HTMLDOMElement} The list of shortcuts of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListShortcuts = (parser, idContainerShortcuts, idTextShortcuts, textShortcuts, callback) ->
		container = parser.find("##{idContainerShortcuts}").firstResult()
		if isEmpty(container)
			local = parser.find('body').firstResult()
			if not isEmpty(local)
				container = parser.createElement('div')
				container.setAttribute('id', idContainerShortcuts)
				
				textContainer = parser.createElement('span')
				textContainer.setAttribute('id', idTextShortcuts)
				textContainer.appendText(textShortcuts)
				
				container.appendElement(textContainer)
				local.appendElement(container)
				
				executeFixSkipper(container, callback)
				executeFixSkipper(textContainer, callback)
		list = undefined
		if not isEmpty(container)
			list = parser.find(container).findChildren('ul').firstResult()
			if isEmpty(list)
				list = parser.createElement('ul')
				container.appendElement(list)
			executeFixSkipper(list, callback)
		return list
	
	###*
	 * Generate the list of skippers of page.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {String} idContainerSkippers The id of list element that contains
	 * the skippers.
	 * @return {hatemile.util.HTMLDOMElement} The list of skippers of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListSkippers = (parser, idContainerSkippers) ->
		container = parser.find("##{idContainerSkippers}").firstResult()
		if isEmpty(container)
			local = parser.find('body').firstResult()
			if not isEmpty(local)
				container = parser.createElement('div')
				container.setAttribute('id', idContainerSkippers)
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
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {String} idContainerHeading The id of list element that contains the
	 * links for the headings.
	 * @param {String} idTextHeading The id of text of description of container of
	 * heading links.
	 * @param {String} textHeading The text of description of container of heading
	 * links.
	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
	 * callback This class.
	 * @return {hatemile.util.HTMLDOMElement} The list of heading links of page.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	generateListHeading = (parser, idContainerHeading, idTextHeading, textHeading, callback) ->
		container = parser.find("##{idContainerHeading}").firstResult()
		if isEmpty(container)
			local = parser.find('body').firstResult()
			if not isEmpty(local)
				container = parser.createElement('div')
				container.setAttribute('id', idContainerHeading)
				
				textContainer = parser.createElement('span')
				textContainer.setAttribute('id', idTextHeading)
				textContainer.appendText(textHeading)
				
				container.appendElement(textContainer)
				local.appendElement(container)
				
				executeFixSkipper(container, callback)
				executeFixSkipper(textContainer, callback)
		list = undefined
		if not isEmpty(container)
			list = parser.find(container).findChildren('ol').firstResult()
			if isEmpty(list)
				list = parser.createElement('ol')
				container.appendElement(list)
			executeFixSkipper(list, callback)
		return list
	
	###*
	 * Returns the level of heading.
	 * @param {hatemile.util.HTMLDOMElement} element The heading.
	 * @return {Number} The level of heading.
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
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @return {Boolean} True if the headings of page are sintatic correct or
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
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {String} dataAttribute The name of attribute that links the element
	 * with the anchor.
	 * @param {String} anchorClass The HTML class of anchor.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {String} prefixId The prefix of generated ids.
	 * @return {hatemile.util.HTMLDOMElement} The anchor.
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
	 * @param {hatemile.util.HTMLDOMElement} shortcut The shortcut.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
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
	
	###*
	 * Call fixSkipper method for element, if the page has the container of
	 * skippers.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
	 * callback This class.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	executeFixSkipper = (element, callback) ->
		if not isEmpty(callback.listSkippers)
			for skipper in callback.skippers
				if (callback.parser.find(skipper.getSelector()).listResults().indexOf(element) > -1)
					callback.fixSkipper(element, skipper)
		return
	
	###*
	 * Call fixShortcut method for element, if the page has the container of
	 * shortcuts.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {hatemile.implementation.AccessibleNavigationImplementation}
	 * callback This class.
	 * @memberof hatemile.implementation.AccessibleNavigationImplementation
	###
	executeFixShortcut = (element, callback) ->
		if not isEmpty(callback.listShortcuts)
			callback.fixShortcut(element)
		return
	
	fixShortcut: (element) ->
		if element.hasAttribute('accesskey')
			description = getDescription(element, @parser)
			if not element.hasAttribute('title')
				element.setAttribute('title', description)
			
			if not @listShortcutsAdded
				@listShortcuts = generateListShortcuts(@parser, @idContainerShortcuts, @idTextShortcuts, @textShortcuts, this)
				@listShortcutsAdded = true
			
			if not isEmpty(@listShortcuts)
				keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
				for key in keys
					key = key.toUpperCase()
					if isEmpty(@parser.find(@listShortcuts).findChildren("[#{@dataAccessKey}=\"#{key}\"]").firstResult())
						item = @parser.createElement('li')
						item.setAttribute(@dataAccessKey, key)
						item.appendText("#{@prefix} + #{key}: #{description}")
						@listShortcuts.appendElement(item)
		return
	
	fixShortcuts: () ->
		elements = @parser.find('[accesskey]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixShortcut(element)
		return
	
	fixSkipper: (element, skipper) ->
		if not @listSkippersAdded
			@listSkippers = generateListSkippers(@parser, @idContainerSkippers)
			@listSkippersAdded = true
		if not isEmpty(@listSkippers)
			anchor = generateAnchorFor(element, @dataAnchorFor, @classSkipperAnchor, @parser, @prefixId)
			if not isEmpty(anchor)
				itemLink = @parser.createElement('li')
				link = @parser.createElement('a')
				link.setAttribute('href', "##{anchor.getAttribute('name')}")
				link.appendText(skipper.getDefaultText())
				
				shortcuts = skipper.getShortcuts()
				if not isEmpty(shortcuts)
					shortcut = shortcuts[0]
					if not isEmpty(shortcut)
						freeShortcut(shortcut, @parser)
						link.setAttribute('accesskey', shortcut)
				exports.hatemile.util.CommonFunctions.generateId(link, @prefixId)
				
				itemLink.appendElement(link)
				@listSkippers.appendElement(itemLink)
				
				executeFixShortcut(link, this);
		return
	
	fixSkippers: () ->
		for skipper in @skippers
			elements = @parser.find(skipper.getSelector()).listResults()
			count = elements.length > 1
			if count
				index = 1
			shortcuts = skipper.getShortcuts()
			for element in elements
				if not element.hasAttribute(@dataIgnore)
					if count
						defaultText = "#{skipper.getDefaultText()} #{index++}"
					else
						defaultText = skipper.getDefaultText()
					@fixSkipper(element, new exports.hatemile.util.Skipper(skipper.getSelector(), defaultText, shortcuts.pop()))
		return
	
	fixHeading: (element) ->
		if not @validateHeading
			@validHeading = isValidHeading(@parser)
			@validateHeading = true
		if @validHeading
			anchor = generateAnchorFor(element, @dataHeadingAnchorFor, @classHeadingAnchor, @parser, @prefixId)
			if not isEmpty(anchor)
				level = getHeadingLevel(element)
				if level is 1
					list = generateListHeading(@parser, @idContainerHeading, @idTextHeading, @textHeading, this)
				else
					superItem = @parser.find("##{@idContainerHeading}").findDescendants("[#{@dataHeadingLevel}=\"#{(level - 1).toString()}\"]").lastResult()
					if not isEmpty(superItem)
						list = @parser.find(superItem).findChildren('ol').firstResult()
						if isEmpty(list)
							list = @parser.createElement('ol')
							superItem.appendElement(list)
				if not isEmpty(list)
					item = @parser.createElement('li')
					item.setAttribute(@dataHeadingLevel, level.toString())
					
					link = @parser.createElement('a')
					link.setAttribute('href', "##{anchor.getAttribute('name')}")
					link.appendText(element.getTextContent())
					
					item.appendElement(link)
					list.appendElement(item)
		return
	
	fixHeadings: () ->
		elements = @parser.find('h1,h2,h3,h4,h5,h6').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixHeading(element)
		return