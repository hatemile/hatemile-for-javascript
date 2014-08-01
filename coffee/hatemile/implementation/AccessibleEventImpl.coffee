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

class exports.hatemile.implementation.AccessibleEventImpl
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * Javascript events of elements of parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class AccessibleEventImpl
	 * @classdesc The AccessibleEventImpl class is official implementation of
	 * AccessibleEvent interface.
	 * @extends hatemile.AccessibleEvent
	 * @version 2014-07-23
	 * @memberof hatemile.implementation
	###
	constructor: (@parser, configure) ->
		@dataIgnore = "data-#{configure.getParameter('data-ignore')}"
	
	fixOnHover: (element) ->
		tag = element.getTagName()
		if not ((tag is 'INPUT') or (tag is 'BUTTON') or (tag is 'A') or (tag is 'SELECT') or (tag is 'TEXTAREA') or (element.hasAttribute('tabindex')))
			element.setAttribute('tabindex', '0')
		
		nativeElement = element.getData()
		if isEmpty(nativeElement.onfocus)
			nativeElement.onfocus = () ->
				if not isEmpty(nativeElement.onmouseover)
					try
						nativeElement.onmouseover()
					catch error
		if isEmpty(nativeElement.onblur)
			nativeElement.onblur = () ->
				if not isEmpty(nativeElement.onmouseout)
					try
						nativeElement.onmouseout()
					catch error
		return
	
	fixOnHovers: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			nativeElement = element.getData()
			if (not element.hasAttribute(@dataIgnore)) and ((not isEmpty(nativeElement.onmouseover)) or (not isEmpty(nativeElement.onmouseout)))
				@fixOnHover(element)
		return
	
	fixOnActive: (element) ->
		tag = element.getTagName()
		if not ((tag is 'INPUT') or (tag is 'BUTTON') or (tag is 'A'))
			if not ((element.hasAttribute('tabindex')) or (tag is 'SELECT') or (tag is 'TEXTAREA'))
				element.setAttribute('tabindex', '0')
			
			nativeElement = element.getData()
			if isEmpty(nativeElement.onkeypress)
				nativeElement.onkeypress = (event) ->
					enter1 = '\n'.charCodeAt(0)
					enter2 = '\r'.charCodeAt(0)
					keyCode = event.keyCode
					if (keyCode is enter1) or (keyCode is enter2)
						if not isEmpty(nativeElement.onclick)
							try
								nativeElement.click()
							catch error
						else if not isEmpty(nativeElement.ondblclick)
							try
								nativeElement.ondblclick()
							catch error
			if isEmpty(nativeElement.onkeyup)
				nativeElement.onkeyup = (event) ->
					enter1 = '\n'.charCodeAt(0)
					enter2 = '\r'.charCodeAt(0)
					keyCode = event.keyCode
					if ((keyCode is enter1) or (keyCode is enter2)) and (not isEmpty(nativeElement.onmouseup))
						try
							nativeElement.onmouseup()
						catch error
			if isEmpty(nativeElement.onkeydown)
				nativeElement.onkeydown = (event) ->
					enter1 = '\n'.charCodeAt(0)
					enter2 = '\r'.charCodeAt(0)
					keyCode = event.keyCode
					if ((keyCode is enter1) or (keyCode is enter2)) and (not isEmpty(nativeElement.onmousedown))
						try
							nativeElement.onmousedown()
						catch error
		return
	
	fixOnActives: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			nativeElement = element.getData()
			if (not element.hasAttribute(@dataIgnore)) and ((not isEmpty(nativeElement.onclick)) or (not isEmpty(nativeElement.onmousedown)) or (not isEmpty(nativeElement.onmouseup)) or (not isEmpty(nativeElement.ondblclick)))
				@fixOnActive(element)
		return