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
 * @namespace util
 * @memberof hatemile
###
exports.hatemile.util or= {}

###*
 * @namespace css
 * @memberof hatemile.util
###
exports.hatemile.util.css or= {}

exports.hatemile.util.css.jscssp or= {}

class exports.hatemile.util.css.jscssp.JSCSSPParser
	
	constructor: (@parser, @currentURL) ->
		if not (@parser instanceof jscsspStylesheet)
			parser = new CSSParser()
			if (@parser instanceof exports.HTMLDocument)
				@parser = getCSSContent(@parser, @currentURL)
			if (typeof @parser is typeof '')
				@parser = parser.parse("body{}#{@parser}", false, false)
	
	###
	 * Returns the absolute path of a URL.
	 * @param {string} currentURL The current URL of document.
	 * @param {string} otherURL The other URL.
	 * @returns {string} The absolute path of other URL.
	 * @private
	 * @function hatemile.util.css.jscssp.JSCSSPParser.getAbsolutePath
	###
	getAbsolutePath = (currentURL, otherURL) ->
		if otherURL.indexOf('//') is 0
			if currentURL.indexOf('https://') is 0
				return "https:#{otherURL}"
			else
				return "http:#{otherURL}"
		else if otherURL.indexOf('data:') is 0
			return null
		else
			urlRegularExpression = new RegExp('([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/\\/)?(?:(?:(?:[a-zA-Z0-9_\\.\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\\-\\.]|%[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\\]))(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!:\\.\\?\\+=&@!$\'~*,;\\/\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?')
			if urlRegularExpression.test(otherURL)
				return otherURL
			else
				if currentURL.indexOf('/') is -1
					currentURL += '/'
				stackURL = currentURL.split('/')
				stackURL.pop()
				relativeParts = otherURL.split('/')
				for relativePart in relativeParts
					if relativePart is '..'
						stackURL.pop()
					else if relativePart isnt '.'
						stackURL.push(relativePart)
				return stackURL.join('/')
	
	getCSSContent = (doc, currentURL) ->
		content = ''
		head = doc.getElementsByTagName('head')[0]
		for child in head.children
			tagName = child.tagName.toUpperCase()
			if (tagName is 'LINK') and (child.hasAttribute('rel')) and (child.getAttribute('rel') is 'stylesheet')
				content += getContentFromURL(getAbsolutePath(currentURL, child.getAttribute('href')))
			else if tagName is 'STYLE'
				content += getContentFromElement(child)
		styles = doc.getElementsByTagName('style')
		for style in styles
			if style.parentNode isnt head
				content += getContentFromElement(style)
		return content

	getContentFromURL = (url) ->
		content = ''
		if not isEmpty(url)
			httpRequest = false
			if window.XMLHttpRequest
				httpRequest = new XMLHttpRequest()
			else if window.ActiveXObject
				try
					httpRequest = new ActiveXObject('Msxml2.XMLHTTP')
				catch e
					try
						httpRequest = new ActiveXObject('Microsoft.XMLHTTP')
					catch e
			if httpRequest
				httpRequest.onreadystatechange = () ->
					if (this.readyState is 4) and (this.status is 200)
						content = httpRequest.responseText
				httpRequest.open('GET', url, false);
				httpRequest.send()
		return content

	getContentFromElement = (element) ->
		if not isEmpty(element.textContent)
			return element.textContent
		if not isEmpty(element.innerText)
			return element.innerText
		text = ''
		childs = element.childNodes
		for child in childs
			if (child.nodeType is element.ownerDocument.TEXT_NODE)
				text += child.nodeValue
			else if (child.nodeType is element.ownerDocument.ELEMENT_NODE)
				text += getContentFromElement(elementChild)
		return text
	
	getRules: (properties) ->
		rules = []
		if isEmpty(properties)
			for nativeRule in @parser.cssRules
				if nativeRule.type is 1
					rules.push(new exports.hatemile.util.css.jscssp.JSCSSPRule(nativeRule))
		else
			for nativeRule in @parser.cssRules
				if nativeRule.type is 1
					rule = new exports.hatemile.util.css.jscssp.JSCSSPRule(nativeRule)
					for property in properties
						if rule.hasProperty(property)
							rules.push(rule)
							break
		return rules