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


class exports.hatemile.implementation.AccessibleCSSSpeechPolyfillImplementation
	
	_dataIsolatorElement = 'data-auxiliarspan'
	_dataSpeak = 'data-cssspeak'
	_dataSpeakAs = 'data-cssspeakas'
	_dataSpeakHeader = 'data-cssspeakheader'
	_validInheritTags = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME'
			, 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY'
			, 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE'
			, 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', 'DD', 'FIELDSET'
			, 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3'
			, 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'HGROUP'
			, 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD'
			, 'TFOOT']
	_invalidTags = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', 'VAR'
			, 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', 'RUBY', 'INS'
			, 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', 'PRE', 'DIV', 'LI'
			, 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY'
			, 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER'
			, 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', 'SUMMARY', 'DETAILS', 'TD', 'TH']
	
	constructor: (@cssParser, @htmlParser, @symbols) ->
	
	isValidInheritElement = (element) ->
		return _validInheritTags.indexOf(element.getTagName()) isnt -1
	
	isValidElement = (element) ->
		return _invalidTags.indexOf(element.getTagName()) is -1
	
	normalize = (element) ->
		if (element.getData().normalize)
			element.getData().normalize()
		return
	
	isolateTextNode = (element, htmlParser) ->
		if (element.hasChildren()) and (isValidElement(element))
			if isValidElement(element)
				nativeElement = element.getData()
				nativeChildren = nativeElement.childNodes
				for child in nativeChildren
					if child.nodeType is nativeElement.ownerDocument.TEXT_NODE
						span = htmlParser.createElement('span')
						span.setAttribute(_dataIsolatorElement, 'true')
						span.appendText(child.nodeValue)
						
						nativeElement.replaceChild(span.getData(), child)
			children = element.getChildren()
			for elementChild in children
				isolateTextNode(elementChild, htmlParser)
		return
	
	replaceElementByOwnContent = (element) ->
		if element.hasChildren()
			children = element.getChildren()
			for child in children
				element.insertBefore(child)
			element.removeElement()
		else
			textNode = element.getData().ownerDocument.createTextNode(element.getTextContent())
			element.getParentElement().getData().replaceChild(textNode, element.getData())
		return
	
	visit = (element, dataProperty, dataPropertyValue, htmlParser, symbols, operation) ->
		if isValidElement(element)
			if element.hasChildren()
				children = element.getChildren()
				for child in children
					visit(child, dataProperty, dataPropertyValue, htmlParser, symbols, operation)
			else
				operation(element, dataProperty, dataPropertyValue, htmlParser, symbols)
		return
	
	createContentElement = (content, dataProperty, dataPropertyValue, htmlParser) ->
		contentElement = htmlParser.createElement('span')
		contentElement.setAttribute(_dataIsolatorElement, 'true')
		contentElement.setAttribute(dataProperty, dataPropertyValue)
		contentElement.appendText(content)
		return contentElement
	
	createAuralContentElement = (content, dataProperty, dataPropertyValue, htmlParser) ->
		contentElement = createContentElement(content, dataProperty, dataPropertyValue, htmlParser)
		contentElement.setAttribute('unselectable', 'on')
		contentElement.setAttribute('class', 'screen-reader-only')
		return contentElement
	
	createVisualContentElement = (content, dataProperty, dataPropertyValue, htmlParser) ->
		contentElement = createContentElement(content, dataProperty, dataPropertyValue, htmlParser)
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
		visit(element, null, null, htmlParser, null, speakNormal)
		
		normalize(element)
		return
	
	speakNone = (element) ->
		element.setAttribute('role', 'presentation')
		element.setAttribute('aria-hidden', 'true')
		element.setAttribute(_dataSpeak, 'none')
		return
	
	speakNoneInherit = (element, htmlParser) ->
		isolateTextNode(element, htmlParser)
		
		visit(element, null, null, htmlParser, null, speakNone)
		return
	
	speakAs = (element, regex, dataValue, htmlParser, callback) ->
		newChildren = []
		index = -1
		content = element.getTextContent()
		while (content.length > 0)
			index = content.search(new RegExp(regex))
			if index != -1
				callback(content, index, newChildren)

				index = index + 1
				content = content.substr(index)
			else
				break
		
		if newChildren.length > 0
			if content.length > 0
				newChildren.push(createContentElement(content, _dataSpeakAs, dataValue, htmlParser))
			
			nativeElement = element.getData()
			while (nativeElement.childNodes.length > 0)
				nativeElement.removeChild(nativeElement.childNodes[0])
			
			for child in newChildren
				element.appendElement(child)
		return
	
	reverseSpeakAs = (element, dataValue, htmlParser) ->
		auxiliarElements = htmlParser.find(element).findDescendants("[#{_dataSpeakAs}=\"#{dataValue}\"][unselectable=\"on\"]").listResults()
		for auxiliarElement in auxiliarElements
			auxiliarElement.removeElement()
		
		contentElements = htmlParser.find(element).findDescendants("[#{_dataSpeakAs}=\"#{dataValue}\"][#{_dataIsolatorElement}=\"true\"]").listResults()
		for contentElement in contentElements
			replaceElementByOwnContent(contentElement)
		
		if (element.getData().normalize)
			element.getData().normalize()
		return
	
	speakAsNormal = (element, htmlParser) ->
		reverseSpeakAs(element, 'spell-out', htmlParser)
		reverseSpeakAs(element, 'literal-punctuation', htmlParser)
		reverseSpeakAs(element, 'no-punctuation', htmlParser)
		reverseSpeakAs(element, 'digits', htmlParser)
		return
	
	speakAsSpellOut = (element, dataProperty, dataPropertyValue, htmlParser) ->
		speakAs(element, '[a-zA-Z]', dataPropertyValue, htmlParser, (content, index, newChildren) ->
			newChildren.push(createContentElement(content.substr(0, index + 1), dataProperty, dataPropertyValue, htmlParser))
			
			newChildren.push(createAuralContentElement(' ', dataProperty, dataPropertyValue, htmlParser))
		)
		return
	
	speakAsSpellOutInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'spell-out', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, _dataSpeakAs, 'spell-out', htmlParser, null, speakAsSpellOut)
		return
	
	speakAsLiteralPunctuation = (element, dataProperty, dataPropertyValue, htmlParser, symbols) ->
		speakAs(element, symbols.getRegularExpression(), dataPropertyValue, htmlParser, (content, index, newChildren) ->
			if index != 0
				newChildren.push(createContentElement(content.substr(0, index), dataProperty, dataPropertyValue, htmlParser))
			
			newChildren.push(createAuralContentElement(" #{symbols.getDescriptionOf(content.charAt(index))} ", dataProperty, dataPropertyValue, htmlParser))
			
			newChildren.push(createVisualContentElement(content.charAt(index), dataProperty, dataPropertyValue, htmlParser))
		)
		return
	
	speakAsLiteralPunctuationInherit = (element, htmlParser, symbols) ->
		reverseSpeakAs(element, 'literal-punctuation', htmlParser)
		reverseSpeakAs(element, 'no-punctuation', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, _dataSpeakAs, 'literal-punctuation', htmlParser, symbols, speakAsLiteralPunctuation)
		return
	
	speakAsNoPunctuation = (element, dataProperty, dataPropertyValue, htmlParser) ->
		speakAs(element, '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', dataPropertyValue, htmlParser, (content, index, newChildren) ->
			if index != 0
				newChildren.push(createContentElement(content.substr(0, index), dataProperty, dataPropertyValue, htmlParser))
			
			newChildren.push(createVisualContentElement(content.charAt(index), dataProperty, dataPropertyValue, htmlParser))
		)
		return
	
	speakAsNoPunctuationInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'literal-punctuation', htmlParser)
		reverseSpeakAs(element, 'no-punctuation', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, _dataSpeakAs, 'no-punctuation', htmlParser, null, speakAsNoPunctuation)
		return
	
	speakAsDigits = (element, dataProperty, dataPropertyValue, htmlParser) ->
		speakAs(element, '[0-9]', dataPropertyValue, htmlParser, (content, index, newChildren) ->
			if index != 0
				newChildren.push(createContentElement(content.substr(0, index), dataProperty, dataPropertyValue, htmlParser))
			
			newChildren.push(createAuralContentElement(' ', dataProperty, dataPropertyValue, htmlParser))
			
			newChildren.push(createContentElement(content.charAt(index), dataProperty, dataPropertyValue, htmlParser))
		)
		return
	
	speakAsDigitsInherit = (element, htmlParser) ->
		reverseSpeakAs(element, 'digits', htmlParser)
		
		isolateTextNode(element, htmlParser)
		
		visit(element, _dataSpeakAs, 'digits', htmlParser, null, speakAsDigits)
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
			element.prependElement(createAuralContentElement(textHeader, _dataSpeakHeader, 'always', htmlParser))
		return
	
	speakHeaderAlwaysInherit = (element, htmlParser) ->
		speakHeaderOnceInherit(element, htmlParser)
		
		cellElements = htmlParser.find(element).findDescendants('td[headers],th[headers]').listResults()
		for cellElement in cellElements
			speakHeaderAlways(cellElement, htmlParser)
		return
	
	speakHeaderOnceInherit = (element, htmlParser) ->
		headerElements = htmlParser.find(element).findDescendants("span[#{_dataSpeakHeader}=\"always\"]").listResults()
		for headerElement in headerElements
			headerElement.removeElement()
		return
	
	fixSpeak: (element, rule) ->
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
						else if propertyValue is 'normal'
							speakAsNormal(element, @htmlParser)
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
	
	fixSpeaks: () ->
		rules = @cssParser.getRules(['speak', 'speak-punctuation', 'speak-numeral', 'speak-header', 'speak-as'])
		for rule in rules
			if (rule.hasProperty('speak')) or (rule.hasProperty('speak-punctuation')) or (rule.hasProperty('speak-numeral')) or (rule.hasProperty('speak-header')) or (rule.hasProperty('speak-as'))
				elements = @htmlParser.find(rule.getSelector()).listResults()
				for element in elements
					@fixSpeak(element, rule)
		return