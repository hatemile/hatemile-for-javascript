###
Copyright 2014 Carlson Santana Cruz

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

class exports.hatemile.implementation.AccessibleShortcutImpl
	
	###*
	 * Initializes a new object that manipulate the accessibility of the shortcuts
	 * of parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @param {String} userAgent The user agent of the user.
	 * @class AccessibleShortcutImpl
	 * @classdesc The AccessibleShortcutImpl class is official implementation of
	 * AccessibleShortcut interface.
	 * @extends hatemile.ClientSideAccessibleShortcut
	 * @version 2014-07-23
	 * @memberof hatemile.implementation
	###
	constructor: (@parser, configure, userAgent) ->
		@idContainerShortcuts = configure.getParameter('id-container-shortcuts')
		@idSkipLinkContainerShortcuts = configure.getParameter('id-skip-link-container-shortcuts')
		@idSkipContainerShortcuts = configure.getParameter('id-skip-container-shortcuts')
		@idTextShortcuts = configure.getParameter('id-text-shortcuts')
		@textSkipLinkContainerShortcuts = configure.getParameter('text-skip-container-shortcuts')
		@textWithoutShortcut = configure.getParameter('text-no-shortcuts-alert')
		@textShortcuts = configure.getParameter('text-shortcuts')
		@standartPrefix = configure.getParameter('text-standart-shortcut-prefix')
		@dataAccessKey = "data-#{configure.getParameter('data-accesskey')}"
		@dataIgnore = "data-#{configure.getParameter('data-ignore')}"
		@listAdded = false
		
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
	 * @memberof hatemile.implementation.AccessibleShortcutImpl
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
		else if element.getTagName() is 'INPUT'
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
	 * @param {String} idSkipLinkContainerShortcuts The id of link element that
	 * skip the list of shortcuts.
	 * @param {String} idSkipContainerShortcuts The id of anchor element after the
	 * list of shortcuts.
	 * @param {String} textSkipLinkContainerShortcuts The text of link element
	 * that skip the list of shortcuts.
	 * @param {String} idTextShortcuts The id of text that precede the shortcuts
	 * descriptions.
	 * @param {String} textShortcuts The text that precede the shortcuts
	 * descriptions.
	 * @return {hatemile.util.HTMLDOMElement} The list of shortcuts of page.
	 * @memberof hatemile.implementation.AccessibleShortcutImpl
	###
	generateList = (parser, idContainerShortcuts, idSkipLinkContainerShortcuts, idSkipContainerShortcuts, textSkipLinkContainerShortcuts, idTextShortcuts, textShortcuts) ->
		local = parser.find('body').firstResult()
		list = undefined
		if not isEmpty(local)
			container = parser.find("##{idContainerShortcuts}").firstResult()
			if isEmpty(container)
				container = parser.createElement('div')
				container.setAttribute('id', idContainerShortcuts)
				firstChild = local.getFirstElementChild()
				firstChild.insertBefore(container)
				
				anchorJump = parser.createElement('a')
				anchorJump.setAttribute('id', idSkipLinkContainerShortcuts)
				anchorJump.setAttribute('href', "##{idSkipContainerShortcuts}")
				anchorJump.appendText(textSkipLinkContainerShortcuts)
				container.insertBefore(anchorJump)
				
				anchor = parser.createElement('a')
				anchor.setAttribute('name', idSkipContainerShortcuts)
				anchor.setAttribute('id', idSkipContainerShortcuts)
				firstChild.insertBefore(anchor)
				
				textContainer = parser.createElement('span')
				textContainer.setAttribute('id', idTextShortcuts)
				textContainer.appendText(textShortcuts)
				container.appendElement(textContainer)
			list = parser.find(container).findChildren('ul').firstResult()
			if isEmpty(list)
				list = parser.createElement('ul')
				container.appendElement(list)
		@listAdded = true
		return list
	
	###*
	 * Get a list of elements that contains the descriptions of shortcuts.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {String} idContainerShortcuts The id of list element that contains
	 * the description of shortcuts.
	 * @return {hatemile.util.HTMLDOMElement[]} The list of elements with
	 * descriptions of shortcuts.
	 * @memberof hatemile.implementation.AccessibleShortcutImpl
	###
	getShortcuts = (parser, idContainerShortcuts) ->
		container = parser.find("##{idContainerShortcuts}").firstResult()
		if isEmpty(container)
			return []
		else
			list = parser.find(container).findChildren('ul').firstResult()
			if isEmpty(list)
				return []
			else
				items = parser.find(list).findChildren('li').listResults()
				if isEmpty(items)
					return []
				else
					return items
	
	showShortcuts: () ->
		items = getShortcuts(@parser, @idContainerShortcuts)
		if isEmpty(items)
			alert(@textWithoutShortcut)
			return
		text = @textShortcut
		for item in items
			text += "\n*#{item.getTextContent()}"
		alert(text)
		return
	
	getPrefix: () ->
		return @prefix
	
	fixShortcut: (element) ->
		if element.hasAttribute('accesskey')
			description = getDescription(element, @parser)
			if not element.hasAttribute('title')
				element.setAttribute('title', description)
			
			if not @listAdded
				@list = generateList(@parser, @idContainerShortcuts, @idSkipLinkContainerShortcuts, @idSkipContainerShortcuts, @textSkipLinkContainerShortcuts, @idTextShortcuts, @textShortcuts)
			
			if not isEmpty(@list)
				keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
				for key in keys
					key = key.toUpperCase()
					if isEmpty(@parser.find(@list).findChildren("[#{@dataAccessKey}=#{key}]").firstResult())
						item = @parser.createElement('li')
						item.setAttribute(@dataAccessKey, key)
						item.appendText("#{@prefix} + #{key}: #{description}")
						@list.appendElement(item)
		return
	
	fixShortcuts: () ->
		elements = @parser.find('[accesskey]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixShortcut(element)
		return