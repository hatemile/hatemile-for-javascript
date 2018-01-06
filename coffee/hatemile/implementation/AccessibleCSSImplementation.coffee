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

# The AccessibleCSSImplementation class is official implementation of
# {hatemile.AccessibleCSS}.
#
# @extend hatemile.AccessibleCSS
#
class @hatemile.implementation.AccessibleCSSImplementation
  
  DATA_ATTRIBUTE_HEADERS_BEFORE_OF = 'data-headersbeforeof'
  DATA_ATTRIBUTE_HEADERS_AFTER_OF = 'data-headersafterof'
  DATA_IGNORE = 'data-ignoreaccessibilityfix'
  DATA_ISOLATOR_ELEMENT = 'data-auxiliarspan'
  DATA_SPEAK = 'data-cssspeak'
  DATA_SPEAK_AS = 'data-cssspeakas'
  VALID_INHERIT_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', \
      'TIME', 'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', \
      'MARK', 'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', \
      'FIGURE', 'PRE', 'DIV', 'OL', 'UL', 'LI', 'BLOCKQUOTE', 'DL', 'DT', \
      'DD', 'FIELDSET', 'LEGEND', 'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', \
      'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SECTION', 'HEADER', 'NAV', \
      'ARTICLE', 'FOOTER', 'HGROUP', 'CAPTION', 'SUMMARY', 'DETAILS', 'TABLE', \
      'TR', 'TD', 'TH', 'TBODY', 'THEAD', 'TFOOT']
  VALID_TAGS = ['SPAN', 'A', 'RT', 'DFN', 'ABBR', 'Q', 'CITE', 'EM', 'TIME', \
      'VAR', 'SAMP', 'I', 'B', 'SUB', 'SUP', 'SMALL', 'STRONG', 'MARK', \
      'RUBY', 'INS', 'DEL', 'KBD', 'BDO', 'CODE', 'P', 'FIGCAPTION', 'FIGURE', \
      'PRE', 'DIV', 'LI', 'BLOCKQUOTE', 'DT', 'DD', 'FIELDSET', 'LEGEND', \
      'LABEL', 'FORM', 'BODY', 'ASIDE', 'ADDRESS', 'H1', 'H2', 'H3', 'H4', \
      'H5', 'H6', 'SECTION', 'HEADER', 'NAV', 'ARTICLE', 'FOOTER', 'CAPTION', \
      'SUMMARY', 'DETAILS', 'TD', 'TH']
  
  # Returns the symbol formated to be searched by regular expression.
  #
  # @private
  #
  # @param [string] symbol The symbol.
  #
  # @return [string] The symbol formated.
  #
  _getFormatedSymbol: (symbol) ->
    return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+')
        .replace('*', '\\*').replace('?', '\\?').replace('^', '\\^')
        .replace('$', '\\$').replace('[', '\\[').replace(']', '\\[')
        .replace('{', '\\{').replace('}', '\\}').replace('(', '\\(')
        .replace(')', '\\)').replace('|', '\\|').replace('/', '\\/')
        .replace(',', '\\,').replace('!', '\\!').replace('=', '\\=')
        .replace(':', '\\:').replace('-', '\\-')
  
  # Returns the description of symbol.
  #
  # @private
  #
  # @param [string] symbol The symbol.
  #
  # @return [string] The description of symbol.
  #
  _getDescriptionOfSymbol: (symbol) ->
    for _symbol in @symbols
      if _symbol.symbol is symbol
        return @configure.getParameter(_symbol.description)
    return null
  
  # Returns the regular expression to search all symbols.
  #
  # @private
  #
  # @return [string] The regular expression to search all symbols.
  #
  _getRegularExpressionOfSymbols: () ->
    regularExpression = null
    for symbol in @symbols
      formatedSymbol = @_getFormatedSymbol(symbol.symbol)
      if regularExpression is null
        regularExpression = "(#{formatedSymbol})"
      else
        regularExpression = "#{regularExpression}|(#{formatedSymbol})"
    return regularExpression
  
  # Check that the children of element can be manipulated to apply the CSS
  # properties.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @return [boolean] True if the children of element can be manipulated to apply the CSS properties or false if the children of element cannot be manipulated to apply the CSS properties.
  #
  _isValidInheritElement: (element) ->
    return (VALID_INHERIT_TAGS.indexOf(element.getTagName()) isnt -1) \
        and (not element.hasAttribute(DATA_IGNORE))
  
  # Check that the element can be manipulated to apply the CSS properties.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @return [boolean] True if the element can be manipulated to apply the CSS properties or false if the element cannot be manipulated to apply the CSS properties.
  #
  _isValidElement: (element) ->
    return VALID_TAGS.indexOf(element.getTagName()) isnt -1
  
  # Isolate text nodes of element nodes.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _isolateTextNode: (element) ->
    if (element.hasChildrenElements()) and (@_isValidElement(element))
      if @_isValidElement(element)
        children = element.getChildren()
        for child in children
          if child instanceof self.hatemile.util.html.vanilla
              .VanillaHTMLDOMTextNode
            span = @htmlParser.createElement('span')
            span.setAttribute(DATA_ISOLATOR_ELEMENT, 'true')
            span.appendText(child.getTextContent())
            
            child.replaceNode(span)
      children = element.getChildrenElements()
      for elementChild in children
        @_isolateTextNode(elementChild)
    return
  
  # Replace the element by own text content.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _replaceElementByOwnContent: (element) ->
    if element.hasChildrenElements()
      children = element.getChildrenElements()
      for child in children
        element.insertBefore(child)
      element.removeNode()
    else if element.hasChildren()
      element.replaceNode(element.getFirstNodeChild())
    return
  
  # Visit and execute a operation in element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] operation The operation to be executed.
  #
  _visit: (element, operation) ->
    if @_isValidInheritElement(element)
      if element.hasChildrenElements()
        children = element.getChildrenElements()
        for child in children
          @_visit(child, operation)
      else if @_isValidElement(element)
        operation.call(this, element)
    return
  
  # Create a element to show the content.
  #
  # @private
  #
  # @param [string] content The text content of element.
  # @param [string] dataPropertyValue The value of custom attribute used to identify the fix.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The element to show the content.
  #
  _createContentElement: (content, dataPropertyValue) ->
    contentElement = @htmlParser.createElement('span')
    contentElement.setAttribute(DATA_ISOLATOR_ELEMENT, 'true')
    contentElement.setAttribute(DATA_SPEAK_AS, dataPropertyValue)
    contentElement.appendText(content)
    return contentElement
  
  # Create a element to show the content, only to aural displays.
  #
  # @private
  #
  # @param [string] content The text content of element.
  # @param [string] dataPropertyValue The value of custom attribute used to identify the fix.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The element to show the content.
  #
  _createAuralContentElement: (content, dataPropertyValue) ->
    contentElement = @_createContentElement(content, dataPropertyValue)
    contentElement.setAttribute('unselectable', 'on')
    contentElement.setAttribute('class', 'screen-reader-only')
    return contentElement
  
  # Create a element to show the content, only to visual displays.
  #
  # @private
  #
  # @param [string] content The text content of element.
  # @param [string] dataPropertyValue The value of custom attribute used to identify the fix.
  #
  # @return [hatemile.util.html.HTMLDOMElement] The element to show the content.
  #
  _createVisualContentElement: (content, dataPropertyValue) ->
    contentElement = @_createContentElement(content, dataPropertyValue)
    contentElement.setAttribute('aria-hidden', 'true')
    contentElement.setAttribute('role', 'presentation')
    return contentElement
  
  # Speak the content of element only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakNormal: (element) ->
    if element.hasAttribute(DATA_SPEAK)
      if (element.getAttribute(DATA_SPEAK) is 'none') \
          and (not element.hasAttribute(DATA_ISOLATOR_ELEMENT))
        element.removeAttribute('role')
        element.removeAttribute('aria-hidden')
        element.removeAttribute(DATA_SPEAK)
      else
        @_replaceElementByOwnContent(element)
    return
  
  # Speak the content of element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakNormalInherit: (element) ->
    @_visit(element, @_speakNormal)
    
    element.normalize()
    return
  
  # No speak any content of element only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakNone: (element) ->
    element.setAttribute('role', 'presentation')
    element.setAttribute('aria-hidden', 'true')
    element.setAttribute(DATA_SPEAK, 'none')
    return
  
  # No speak any content of element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakNoneInherit: (element) ->
    @_isolateTextNode(element)
    
    @_visit(element, @_speakNone)
    return
  
  # Execute a operation by regular expression for element only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [string] regularExpression The regular expression.
  # @param [string] dataPropertyValue The value of custom attribute used to identify the fix.
  # @param [Function] operation The operation to be executed.
  #
  _speakAs: (element, regularExpression, dataPropertyValue, operation) ->
    children = []
    index = -1
    content = element.getTextContent()
    while (content.length > 0)
      index = content.search(new RegExp(regularExpression))
      if index isnt -1
        operation.call(this, content, index, children)

        index = index + 1
        content = content.substr(index)
      else
        break
    
    if children.length > 0
      if content.length > 0
        children.push(@_createContentElement(content, dataPropertyValue))
      
      while (element.hasChildren())
        element.getFirstNodeChild().removeNode()
      
      for child in children
        element.appendElement(child)
    return
  
  # Revert changes of a speakAs method for element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [string] dataPropertyValue The value of custom attribute used to identify the fix.
  #
  _reverseSpeakAs: (element, dataPropertyValue) ->
    dataProperty = "[#{DATA_SPEAK_AS}=\"#{dataPropertyValue}\"]"
    auxiliarElements = @htmlParser.find(element)
        .findDescendants("#{dataProperty}[unselectable=\"on\"]").listResults()
    for auxiliarElement in auxiliarElements
      auxiliarElement.removeNode()
    
    contentElements = @htmlParser.find(element)
        .findDescendants("#{dataProperty}[#{DATA_ISOLATOR_ELEMENT}=\"true\"]")
        .listResults()
    for contentElement in contentElements
      @_replaceElementByOwnContent(contentElement)
    
    element.normalize()
    return
  
  # Use the default speak configuration of user agent for element and
  # descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsNormal: (element) ->
    @_reverseSpeakAs(element, 'spell-out')
    @_reverseSpeakAs(element, 'literal-punctuation')
    @_reverseSpeakAs(element, 'no-punctuation')
    @_reverseSpeakAs(element, 'digits')
    return
  
  # Speak one letter at a time for each word for element only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsSpellOut: (element) ->
    dataPropertyValue = 'spell-out'
    @_speakAs(element, '[a-zA-Z]', dataPropertyValue, (content, index, \
        children) ->
      children.push(@_createContentElement(content.substr(0, index + 1), \
          dataPropertyValue))
      
      children
          .push(@_createAuralContentElement(' ', dataPropertyValue))
    )
    return
  
  # Speak one letter at a time for each word for elements and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsSpellOutInherit: (element) ->
    @_reverseSpeakAs(element, 'spell-out')
    
    @_isolateTextNode(element)
    
    @_visit(element, @_speakAsSpellOut)
    return
  
  # Speak the punctuation for elements only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsLiteralPunctuation: (element) ->
    dataPropertyValue = 'literal-punctuation'
    @_speakAs(element, @_getRegularExpressionOfSymbols(), dataPropertyValue, \
        (content, index, children) ->
      if index isnt 0
        children.push(@_createContentElement(content.substr(0, \
            index), dataPropertyValue))
      
      children.push(@_createAuralContentElement( \
          " #{@_getDescriptionOfSymbol(content.charAt(index))} ", \
          dataPropertyValue))
      
      children.push(@_createVisualContentElement(content
          .charAt(index), dataPropertyValue))
    )
    return
  
  # Speak the punctuation for elements and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsLiteralPunctuationInherit: (element) ->
    @_reverseSpeakAs(element, 'literal-punctuation')
    @_reverseSpeakAs(element, 'no-punctuation')
    
    @_isolateTextNode(element)
    
    @_visit(element, @_speakAsLiteralPunctuation)
    return
  
  # No speak the punctuation for element only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsNoPunctuation: (element) ->
    dataPropertyValue = 'no-punctuation'
    @_speakAs(element, \
        '[!"#$%&\'\\(\\)\\*\\+,-\\./:;<=>?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]', \
        dataPropertyValue, (content, index, children) ->
      if index isnt 0
        children.push(@_createContentElement(content
            .substr(0, index), dataPropertyValue))
      
      children.push(@_createVisualContentElement(content
          .charAt(index), dataPropertyValue))
    )
    return
  
  # No speak the punctuation for element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsNoPunctuationInherit: (element) ->
    @_reverseSpeakAs(element, 'literal-punctuation')
    @_reverseSpeakAs(element, 'no-punctuation')
    
    @_isolateTextNode(element)
    
    @_visit(element, @_speakAsNoPunctuation)
    return
  
  # Speak the digit at a time for each number for element only.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsDigits: (element) ->
    dataPropertyValue = 'digits'
    @_speakAs(element, '[0-9]', dataPropertyValue, (content, index, children) ->
      if index isnt 0
        children.push(@_createContentElement(content
            .substr(0, index), dataPropertyValue))
      
      children.push(@_createAuralContentElement(' ', dataPropertyValue))
      
      children.push(@_createContentElement(content
          .charAt(index), dataPropertyValue))
    )
    return
  
  # Speak the digit at a time for each number for element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsDigitsInherit: (element) ->
    @_reverseSpeakAs(element, 'digits')
    
    @_isolateTextNode(element)
    
    @_visit(element, @_speakAsDigits)
    return
  
  # Speaks the numbers for element and descendants as a word number.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakAsContinuousInherit: (element) ->
    @_reverseSpeakAs(element, 'digits')
    return
  
  # The cells headers will be spoken for every data cell for element and
  # descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakHeaderAlwaysInherit: (element) ->
    @_speakHeaderOnceInherit(element)
    
    elements = @htmlParser.find(element)
        .findDescendants('td[headers],th[headers]').listResults()
    accessibleDisplay = new self.hatemile.implementation
        .AccessibleDisplayScreenReaderImplementation(@htmlParser, @configure)
    for element in elements
      accessibleDisplay.displayCellHeader(element)
    return
  
  # The cells headers will be spoken one time for element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _speakHeaderOnceInherit: (element) ->
    elements = @htmlParser.find(element)
        .findDescendants("[#{DATA_ATTRIBUTE_HEADERS_BEFORE_OF}]," \
          + "[#{DATA_ATTRIBUTE_HEADERS_AFTER_OF}]").listResults()
    for element in elements
      element.removeNode()
    return
  
  # Initializes a new object that manipulate the accessibility of the CSS of
  # parser.
  #
  # @param [hatemile.util.html.HTMLDOMParser] htmlParser The HTML parser.
  # @param [hatemile.util.css.StyleSheetParser] cssParser The CSS parser.
  # @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  # @param [Array<Object>] symbols The symbols with descriptions.
  # @option Array<symbols> [string] symbol The symbol.
  # @option Array<symbols> [string] description The description of symbol.
  #
  constructor: (@htmlParser, @cssParser, @configure, @symbols) ->
  
  # Provide the CSS features of speaking and speech properties in element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  # @see hatemile.AccessibleCSS#provideSpeakProperties
  #
  provideSpeakProperties: (element) ->
    rules = @cssParser.getRules(['speak', 'speak-punctuation', \
        'speak-numeral', 'speak-header', 'speak-as'])
    for rule in rules
      speakElements = @htmlParser.find(rule.getSelector()).listResults()
      for speakElement in speakElements
        if speakElement.equals(element)
          if rule.hasProperty('speak')
            declarations = rule.getDeclarations('speak')
            for declaration in declarations
              propertyValue = declaration.getValue()
              if propertyValue is 'none'
                @_speakNoneInherit(element)
              else if propertyValue is 'normal'
                @_speakNormalInherit(element)
              else if propertyValue is 'spell-out'
                @_speakAsSpellOutInherit(element)
          if rule.hasProperty('speak-as')
            declarations = rule.getDeclarations('speak-as')
            for declaration in declarations
              propertyValue = declaration.getValue()
              pattern = new RegExp('^((normal)|(inherit)|(initial)|(digits)|' \
                  + '(literal\\-punctuation)|(no\\-punctuation)|(spell\\-out)' \
                  + '|((digits) ((literal\\-punctuation)|(no\\-punctuation)|' \
                  + '(spell\\-out)))|(((literal\\-punctuation)|' \
                  + '(no\\-punctuation)|(spell\\-out)) (digits))|' \
                  + '(((literal\\-punctuation)|(no\\-punctuation)) ' \
                  + '(spell\\-out))|((spell\\-out) ((literal\\-punctuation)|' \
                  + '(no\\-punctuation)))|((digits) ((literal\\-punctuation)|' \
                  + '(no\\-punctuation)) (spell\\-out))|((digits) ' \
                  + '(spell\\-out) ((literal\\-punctuation)|' \
                  + '(no\\-punctuation)))|(((literal\\-punctuation)|' \
                  + '(no\\-punctuation)) (digits) (spell\\-out))|' \
                  + '(((literal\\-punctuation)|(no\\-punctuation)) ' \
                  + '(spell\\-out) (digits))|((spell\\-out) (digits) ' \
                  + '((literal\\-punctuation)|(no\\-punctuation)))|' \
                  + '((spell\\-out) ((literal\\-punctuation)|' \
                  + '(no\\-punctuation)) (digits)))$', 'g')
              if pattern.test(propertyValue)
                propertyValues = declaration.getValues()
                @_speakAsNormal(element)
                for propertyValue in propertyValues
                  if propertyValue is 'spell-out'
                    @_speakAsSpellOutInherit(element)
                  else if propertyValue is 'literal-punctuation'
                    @_speakAsLiteralPunctuationInherit(element)
                  else if propertyValue is 'no-punctuation'
                    @_speakAsNoPunctuationInherit(element)
                  else if propertyValue is 'digits'
                    @_speakAsDigitsInherit(element)
          if rule.hasProperty('speak-punctuation')
            declarations = rule.getDeclarations('speak-punctuation')
            for declaration in declarations
              propertyValue = declaration.getValue()
              if propertyValue is 'code'
                @_speakAsLiteralPunctuationInherit(element)
              else if propertyValue is 'none'
                @_speakAsNoPunctuationInherit(element)
          if rule.hasProperty('speak-numeral')
            declarations = rule.getDeclarations('speak-numeral')
            for declaration in declarations
              propertyValue = declaration.getValue()
              if propertyValue is 'digits'
                @_speakAsDigitsInherit(element)
              else if propertyValue is 'continuous'
                @_speakAsContinuousInherit(element)
          if rule.hasProperty('speak-header')
            declarations = rule.getDeclarations('speak-header')
            for declaration in declarations
              propertyValue = declaration.getValue()
              if propertyValue is 'always'
                @_speakHeaderAlwaysInherit(element)
              else if propertyValue is 'once'
                @_speakHeaderOnceInherit(element)
    return
  
  # Provide the CSS features of speaking and speech properties in all elements
  # of page.
  #
  # @see hatemile.AccessibleCSS#provideAllSpeakProperties
  #
  provideAllSpeakProperties: () ->
    selector = null
    rules = @cssParser.getRules(['speak', 'speak-punctuation', \
        'speak-numeral', 'speak-header', 'speak-as'])
    for rule in rules
      if selector is null
        selector = rule.getSelector()
      else
        selector = "#{selector},#{rule.getSelector()}"
    if selector isnt null
      elements = @htmlParser.find(selector).listResults()
      for element in elements
        if self.hatemile.util.CommonFunctions.isValidElement(element)
          @provideSpeakProperties(element)
    return
