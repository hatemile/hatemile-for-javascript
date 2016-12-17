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
 * @class AccessibleCSSImplementation
 * @classdesc The AccessibleCSSImplementation class is official implementation
 * of AccessibleCSS interface.
 * @extends hatemile.AccessibleCSS
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleCSSImplementation
	
	DATA_IGNORE = 'data-ignoreaccessibilityfix'
	_dataIsolatorElement = 'data-auxiliarspan'
	_dataSpeak = 'data-cssspeak'
	_dataSpeakAs = 'data-cssspeakas'
	_validInheritTags = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME'
			, 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY'
			, 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE'
			, 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', 'DD', 'FIELDSET'
			, 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3'
			, 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'HGROUP'
			, 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD'
			, 'TFOOT']
	_validTags = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR'
			, 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS'
			, 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'LI'
			, 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY'
			, 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER'
			, 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', 'SUMMARY', 'DETAILS', 'TD', 'TH']
	
	constructor: (@htmlParser, @cssParser, @symbols) ->
	
	getFormatedSymbol = (symbol) ->
		return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+')
				.replace('*', '\\*').replace('?', '\\?').replace('^', '\\^').replace('$', '\\$')
				.replace('[', '\\[').replace(']', '\\[').replace('{', '\\{').replace('}', '\\}')
				.replace('(', '\\(').replace(')', '\\)').replace('|', '\\|').replace('/', '\\/')
				.replace(',', '\\,').replace('!', '\\!').replace('=', '\\=').replace(':', '\\:')
				.replace('-', '\\-')
	
	getDescriptionOfSymbol = (symbols, symbol) ->
		for _symbol in symbols
			if _symbol.symbol is symbol
				return _symbol.description
		return null
	
	getRegularExpressionOfSymbols = (symbols) ->
		regularExpression = undefined
		for symbol in symbols
			formatedSymbol = getFormatedSymbol(symbol.symbol)
			if isEmpty(regularExpression)
				regularExpression = "(#{formatedSymbol})"
			else
				regularExpression = "#{regularExpression}|(#{formatedSymbol})"
		return regularExpression
	
	isValidInheritElement = (element) ->
		return (_validInheritTags.indexOf(element.getTagName()) isnt -1) and (not element.hasAttribute(DATA_IGNORE))
	
	isValidElement = (element) ->
		return _validTags.indexOf(element.getTagName()) isnt -1
	
	isolateTextNode = (element, htmlParser) ->
		if (element.hasChildrenElements()) and (isValidElement(element))
			if isValidElement(element)
				children = element.getChildren()
				for child in children
					if child instanceof exports.hatemile.util.html.vanilla.VanillaHTMLDOMTextNode
						span = htmlParser.createElement('span')
						span.setAttribute(_dataIsolatorElement, 'true')
						span.appendText(child.getTextContent())
						
						child.replaceNode(span)
			children = element.getChildrenElements()
			for elementChild in children
				isolateTextNode(elementChild, htmlParser)
		return
	
	replaceElementByOwnContent = (element) ->
		if element.hasChildrenElements()
			children = element.getChildrenElements()
			for child in children
				element.insertBefore(child)
			element.removeNode()
		else if element.hasChildren()
			element.replaceNode(element.getFirstNodeChild())
		return
	
	visit = (element, dataPropertyValue, htmlParser, symbols, operation) ->
		if isValidInheritElement(element)
			if element.hasChildrenElements()
				children = element.getChildrenElements()
				for child in children
					visit(child, dataPropertyValue, htmlParser, symbols, operation)
			else if isValidElement(element)
				operation(element, dataPropertyValue, htmlParser, symbols)
		return
	
	createContentElement = (content, dataPropertyValue, htmlParser) ->
		contentElement = htmlParser.createElement('span')
		contentElement.setAttribute(_dataIsolatorElement, 'true')
		contentElement.setAttribute(_dataSpeakAs, dataPropertyValue)
		contentElement.appendText(content)
		return contentElement
	
	createAuralContentElement = (content, dataPropertyValue, htmlParser) ->
		contentElement = createContentElement(content, dataPropertyValue, htmlParser)
		contentElement.setAttribute('unselectable', 'on')
		contentElement.setAttribute('class', 'screen-reader-only')
		return contentElement
	
	createVisualContentElement = (content, dataPropertyValue, htmlParser) ->
		contentElement = createContentElement(content, dataPropertyValue, htmlParser)
		contentElement.setAttribute('aria-hidden', 'true')
		contentElement.setAttribute('role', 'presentation')
		return contentElement
	
	speakNormal = (element) ->
		if element.hasAttribute(_dataSpeak)
			if (element.getAttribute(_dataSpeak) is 'none') and (not element.hasAttribute(_dataIsolatorElement))
				element.removeAttribute('role')
				element.removeAttribute('aria-hidden')
				element.removeAttribute(_dataSpeak)
			else
				replaceElementByOwnContent(element)
		return
	
	speakNormalInherit = (element, htmlParser) ->
		visit(element, null, htmlParser, null, speakNormal)
		
		element.normalize()
		return
	
	speakNone = (element) ->
		element.setAttribute('role', 'presentation')
		element.setAttribute('aria-hidden', 'true')
		element.setAttribute(_dataSpeak, 'none')
		return
	
	speakNoneInherit = (element, htmlParser) ->
		isolateTextNode(element, htmlParser)
		
		visit(element, null, htmlParser, null, speakNone)
		return
	
	speakAs = (element, regularExpression, dataPropertyValue, htmlParser, operation) ->
		children = []
		index = -1
		content = element.getTextContent()
		while (content.length > 0)
			index = content.search(new RegExp(regularExpression))
			if index != -1
				operation(content, index, children)

				index = index + 1
				content = content.substr(index)
			else
				break
		
		if children.length > 0
			if content.length > 0
				children.push(createContentElement(content, dataPropertyValue, htmlParser))
			
			while (element.hasChildren())
				element.getFirstNodeChild().removeNode()
			
			for child in children
				element.appendElement(child)
		return
	
	reverseSpeakAs = (element, dataPropertyValue, htmlParser) ->
		auxiliarElements = htmlParser.find(element).findDescendants("[#{_dataSpeakAs}=\"#{dataPropertyValue}\"][unselectable=\"on\"]").listResults()
		for auxiliarElement in auxiliarElements
			auxiliarElement.removeNode()
		
		contentElements = htmlParser.find(element).findDescendants("[#{_dataSpeakAs}=\"#{dataPropertyValue}\"][#{_dataIsolatorElement}=\"true\"]").listResults()
		for contentElement in contentElements
			replaceElementByOwnContent(contentElement)
		
		element.normalize()
		return
	
	speakAsNormal = (element, htmlParser) ->
		reverseSpeakAs(element, 'spell-out', htmlParser)
		reverseSpeakAs(element, 'literal-punctuation', htmlParser)
		reverseSpeakAs(element, 'no-punctuation', htmlParser)
		reverseSpeakAs(element, 'digits', htmlParser)
		return
	
	speakAsSpellOut = (element, dataPropertyValue, htmlParser) ->
		speakAs(element, '[a-zA-Z]', dataPropertyValue, htmlParser, (content, index, children) ->
			children.push(createContentElement(content.substr(0, index + 1), dataPropertyValue, htmlParser))
			
			children.push(createAuralContentElement(' ', dataPropertyValue, htmlParser))
		)
		return
	
	speakAsSpellOutInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'spell-out', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, 'spell-out', htmlParser, null, speakAsSpellOut)
		return
	
	speakAsLiteralPunctuation = (element, dataPropertyValue, htmlParser, symbols) ->
		speakAs(element, getRegularExpressionOfSymbols(symbols), dataPropertyValue, htmlParser, (content, index, children) ->
			if index != 0
				children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser))
			
			children.push(createAuralContentElement(" #{getDescriptionOfSymbol(symbols, content.charAt(index))} ", dataPropertyValue, htmlParser))
			
			children.push(createVisualContentElement(content.charAt(index), dataPropertyValue, htmlParser))
		)
		return
	
	speakAsLiteralPunctuationInherit = (element, htmlParser, symbols) ->
		reverseSpeakAs(element, 'literal-punctuation', htmlParser)
		reverseSpeakAs(element, 'no-punctuation', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, 'literal-punctuation', htmlParser, symbols, speakAsLiteralPunctuation)
		return
	
	speakAsNoPunctuation = (element, dataPropertyValue, htmlParser) ->
		speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', dataPropertyValue, htmlParser, (content, index, children) ->
			if index != 0
				children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser))
			
			children.push(createVisualContentElement(content.charAt(index), dataPropertyValue, htmlParser))
		)
		return
	
	speakAsNoPunctuationInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'literal-punctuation', htmlParser)
		reverseSpeakAs(element, 'no-punctuation', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, 'no-punctuation', htmlParser, null, speakAsNoPunctuation)
		return
	
	speakAsDigits = (element, dataPropertyValue, htmlParser) ->
		speakAs(element, '[0-9]', dataPropertyValue, htmlParser, (content, index, children) ->
			if index != 0
				children.push(createContentElement(content.substr(0, index), dataPropertyValue, htmlParser))
			
			children.push(createAuralContentElement(' ', dataPropertyValue, htmlParser))
			
			children.push(createContentElement(content.charAt(index), dataPropertyValue, htmlParser))
		)
		return
	
	speakAsDigitsInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'digits', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, 'digits', htmlParser, null, speakAsDigits)
		return
	
	speakAsContinuousInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'digits', htmlParser)
		return
	
	speakHeaderAlways = (element, htmlParser) ->
		idsHeaders = element.getAttribute('headers').split(new RegExp('[ \n\t\r]+'))
		textHeader = ''
		for idHeader in idsHeaders
			header = htmlParser.find("##{idHeader}").firstResult()
			if not isEmpty(header)
				textHeader = "#{textHeader}#{header.getTextContent()} "
		if not isEmpty(textHeader)
			element.prependElement(createAuralContentElement(textHeader, 'always', htmlParser))
		return
	
	speakHeaderAlwaysInherit = (element, htmlParser) ->
		speakHeaderOnceInherit(element, htmlParser)
		
		cellElements = htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults()
		for cellElement in cellElements
			speakHeaderAlways(cellElement, htmlParser)
		return
	
	speakHeaderOnceInherit = (element, htmlParser) ->
		headerElements = htmlParser.find(element).findDescendants("span[#{_dataSpeakAs}=\"always\"]").listResults()
		for headerElement in headerElements
			headerElement.removeNode()
		return
	
	fixSpeak: (element) ->
		rules = @cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as'])
		for rule in rules
			speakElements = @htmlParser.find(rule.getSelector()).listResults()
			for speakElement in speakElements
				if speakElement.equals(element)
					if rule.hasProperty('speak')
						declarations = rule.getDeclarations('speak')
						for declaration in declarations
							propertyValue = declaration.getValue()
							if propertyValue is 'none'
								speakNoneInherit(element, @htmlParser)
							else if propertyValue is 'normal'
								speakNormalInherit(element, @htmlParser)
							else if propertyValue is 'spell-out'
								speakAsSpellOutInherit(element, @htmlParser)
					if rule.hasProperty('speak-as')
						declarations = rule.getDeclarations('speak-as')
						for declaration in declarations
							propertyValue = declaration.getValue()
							pattern = new RegExp('^((normal)|(inherit)|(initial)|(digits)|(literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)|((digits) ((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)))|(((literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)) (digits))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|((digits) ((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out))|((digits) (spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)))|(((literal\\-punctuation)|(no\\-punctuation)) (digits) (spell\\-out))|(((literal\\-punctuation)|(no\\-punctuation)) (spell\\-out) (digits))|((spell\\-out) (digits) ((literal\\-punctuation)|(no\\-punctuation)))|((spell\\-out) ((literal\\-punctuation)|(no\\-punctuation)) (digits)))$', 'g')
							if pattern.test(propertyValue)
								propertyValues = declaration.getValues()
								speakAsNormal(element, @htmlParser)
								for propertyValue in propertyValues
									if propertyValue is 'spell-out'
										speakAsSpellOutInherit(element, @htmlParser)
									else if propertyValue is 'literal-punctuation'
										speakAsLiteralPunctuationInherit(element, @htmlParser, @symbols)
									else if propertyValue is 'no-punctuation'
										speakAsNoPunctuationInherit(element, @htmlParser)
									else if propertyValue is 'digits'
										speakAsDigitsInherit(element, @htmlParser)
					if rule.hasProperty('speak-punctuation')
						declarations = rule.getDeclarations('speak-punctuation')
						for declaration in declarations
							propertyValue = declaration.getValue()
							if propertyValue is 'code'
								speakAsLiteralPunctuationInherit(element, @htmlParser, @symbols)
							else if propertyValue is 'none'
								speakAsNoPunctuationInherit(element, @htmlParser)
					if rule.hasProperty('speak-numeral')
						declarations = rule.getDeclarations('speak-numeral')
						for declaration in declarations
							propertyValue = declaration.getValue()
							if propertyValue is 'digits'
								speakAsDigitsInherit(element, @htmlParser)
							else if propertyValue is 'continuous'
								speakAsContinuousInherit(element, @htmlParser)
					if rule.hasProperty('speak-header')
						declarations = rule.getDeclarations('speak-header')
						for declaration in declarations
							propertyValue = declaration.getValue()
							if propertyValue is 'always'
								speakHeaderAlwaysInherit(element, @htmlParser)
							else if propertyValue is 'once'
								speakHeaderOnceInherit(element, @htmlParser)
		return
	
	fixAllSpeaks: () ->
		selector = undefined
		rules = @cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as'])
		for rule in rules
			if selector is undefined
				selector = rule.getSelector()
			else
				selector = "#{selector},#{rule.getSelector()}"
		if selector isnt undefined
			elements = @htmlParser.find(selector).listResults()
			for element in elements
				if exports.hatemile.util.CommonFunctions.isValidElement(element)
					@provideSpeakProperties(element)
		return