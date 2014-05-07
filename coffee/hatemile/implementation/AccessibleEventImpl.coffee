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
class exports.hatemile.implementation.AccessibleEventsImp
	constructor: (@parser, configuration) ->
		@dataFocused = configuration.getParameter('data-focused')
		@dataPressed = configuration.getParameter('data-pressed')
		@dataIgnore = configuration.getParameter('data-ignore')

	fixOnHover: (element) ->
		tag = element.getTagName()
		if not ((tag is 'INPUT') or (tag is 'BUTTON') or (tag is 'A') or (tag is 'SELECT') or (tag is 'TEXTAREA') or (element.hasAttribute('tabindex')))
			element.setAttribute('tabindex', '0')
		_dataFocused = @dataFocused
		if isEmpty(element.getData().onfocus)
			element.getData().onfocus = () ->
				element.setAttribute(_dataFocused, 'true')
				if not isEmpty(element.getData().onmouseover)
					element.getData().onmouseover()
		if isEmpty(element.getData().onblur)
			element.getData().onblur = () ->
				if element.hasAttribute(_dataFocused)
					if (element.getAttribute(_dataFocused).toLowerCase() is 'true') and (not isEmpty(element.getData().onmouseout))
						element.getData().onmouseout()
					element.setAttribute(_dataFocused, 'false')
		return

	fixOnHovers: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			if (not element.hasAttribute(@dataIgnore)) and ((not isEmpty(element.getData().onmouseover)) or (not isEmpty(element.getData().onmouseout)))
				@fixOnHover(element)
		return

	fixOnClick: (element) ->
		tag = element.getTagName()
		if not ((tag is 'INPUT') or (tag is 'BUTTON') or (tag is 'A'))
			if not ((element.hasAttribute('tabindex')) or (tag is 'SELECT') or (tag is 'TEXTAREA'))
				element.setAttribute('tabindex', '0')
			if (isEmpty(element.getData().onkeypress)) and (isEmpty(element.getData().onkeyup)) and (isEmpty(element.getData().onkeydown))
				_dataPressed = @dataPressed
				element.getData().onkeypress = (event) ->
					element.setAttribute(_dataPressed, event.keyCode)
				element.getData().onkeyup = (event) ->
					key = event.keyCode
					enter1 = "\n".charCodeAt(0)
					enter2 = "\r".charCodeAt(0)
					if (key is enter1) or (key is enter2)
						if element.hasAttribute(_dataPressed)
							if key is parseInt(element.getAttribute(_dataPressed))
								if not isEmpty(element.getData().onclick)
									element.getData().click()
								element.removeAttribute(_dataPressed)
		return

	fixOnClicks: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			if (not element.hasAttribute(@dataIgnore)) and (not isEmpty(element.getData().onclick))
				@fixOnClick(element)
		return