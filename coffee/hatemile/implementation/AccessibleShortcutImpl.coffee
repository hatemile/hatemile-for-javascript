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
exports.hatemile or= {}
exports.hatemile.implementation or= {}
class exports.hatemile.implementation.AccessibleShortcutImp
	constructor: (@parser, configure, userAgent) ->
		@idContainerShortcuts = configure.getParameter('id-container-shortcuts')
		@idSkipLinkContainerShortcuts = configure.getParameter('id-skip-link-container-shortcuts')
		@idSkipContainerShortcuts = configure.getParameter('id-skip-container-shortcuts')
		@dataAccessKey = configure.getParameter('data-accesskey')
		@textSkipLinkContainerShortcuts = configure.getParameter('text-skip-container-shortcuts')
		@textWithoutShortcut = configure.getParameter('text-no-shortcuts-alert')
		@textShortcutPrefix = configure.getParameter('text-shortcuts-prefix')
		@dataIgnore = configure.getParameter('data-ignore')
		if not isEmpty(userAgent)
			userAgent = userAgent.toLowerCase()
			mac = userAgent.indexOf('mac') > -1
			konqueror = userAgent.indexOf('konqueror') > -1
			spoofer = userAgent.indexOf('spoofer') > -1
			safari = userAgent.indexOf('applewebkit') > -1
			windows = userAgent.indexOf('windows') > -1
			if userAgent.indexOf('opera') > -1
				@prefix = 'SHIFT + ESC'
			else if (userAgent.indexOf('chome') > -1) and (not spoofer) and (mac)
				@prefix = 'CTRL + OPTION'
			else if (safari) and (not windows) and (not spoofer)
				@prefix = 'CTRL + ALT'
			else if (not windows) and ((safari) or (mac) or (konqueror))
				@prefix = 'CTRL'
			else if /firefox\/[2-9]|minefield\/3/.test(userAgent)
				@prefix = 'ALT + SHIFT'
			else
				@prefix = 'ALT'
		else
			@prefix = 'ALT'

	getDescription = (element, parser) ->
		description = ''
		if element.hasAttribute('title')
			description = element.getAttribute('title')
		else if element.hasAttribute('aria-labelledby')
			labelsIds = element.getAttribute('aria-labelledby').split(new RegExp('[ \n\t\r]+'))
			for labelId in labelsIds
				label = parser.find("##{labelId}").firstResult()
				if not isEmpty(label)
					description = label.getTextContent()
					break
		else if element.hasAttribute('aria-label')
			description = element.getAttribute('aria-label')
		else if element.hasAttribute('alt')
			description = element.getAttribute('alt')
		else if element.getTagName() is 'INPUT'
			type = element.getAttribute('type').toLowerCase()
			if ((type is 'button') or (type is 'submit') or (type is 'reset')) and (element.hasAttribute('value'))
				description = element.getAttribute('value')
		else
			description = element.getTextContent()
		description = description.replace(new RegExp('[ \n\t\r]+', 'g'), ' ')
		return description

	generateList = (parser, idContainerShortcuts, idSkipLinkContainerShortcuts, idSkipContainerShortcuts, textSkipLinkContainerShortcuts) ->
		container = parser.find("##{idContainerShortcuts}").firstResult()
		if isEmpty(container)
			container = parser.createElement('div')
			container.setAttribute('id', idContainerShortcuts)
			firstChild = parser.find('body').firstResult().getFirstElementChild()
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
		list = parser.find(container).findChildren('ul').firstResult()
		if isEmpty(list)
			list = parser.createElement('ul')
			container.appendElement(list)
		return list

	getShortcuts = (parser, idContainerShortcuts) ->
		container = parser.find("##{idContainerShortcuts}").firstResult()
		if isEmpty(container)
			return null
		else
			list = parser.find(container).findChildren('ul').firstResult()
			if isEmpty(list)
				return null
			else
				items = parser.find(list).findChildren('li').listResults()
				if isEmpty(items)
					return null
				else
					return items

	showShortcuts: () ->
		items = getShortcuts(@parser, @idContainerShortcuts)
		if isEmpty(items)
			alert(@textWithoutShortcut)
			return
		text = @textShortcutPrefix
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
			keys = element.getAttribute('accesskey').split(new RegExp('[ \n\t\r]+'))
			if isEmpty(@list)
				@list = generateList(@parser, @idContainerShortcuts, @idSkipLinkContainerShortcuts, @idSkipContainerShortcuts, @textSkipLinkContainerShortcuts)
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