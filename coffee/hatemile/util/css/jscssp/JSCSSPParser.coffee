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

# @namespace hatemile.util
#
@hatemile.util or= {}

# @namespace hatemile.util.css
#
@hatemile.util.css or= {}

# @namespace hatemile.util.css.jscssp
#
@hatemile.util.css.jscssp or= {}

# The JSCSSPParser class is official implementation of
# {hatemile.util.css.StyleSheetParser} interface for JSCSSP.
#
# @extend hatemile.util.css.StyleSheetParser
#
class @hatemile.util.css.jscssp.JSCSSPParser
  
  # Returns the absolute path of a URL.
  #
  # @private
  #
  # @param [string] currentURL The current URL of document.
  # @param [string] otherURL The other URL.
  #
  # @return [string] The absolute path of other URL.
  #
  _getAbsolutePath = (currentURL, otherURL) ->
    if otherURL.indexOf('//') is 0
      if currentURL.indexOf('https://') is 0
        return "https:#{otherURL}"
      else
        return "http:#{otherURL}"
    else if otherURL.indexOf('data:') is 0
      return null
    else
      urlRegularExpression = new RegExp('([a-zA-Z][a-zA-Z0-9\\+\\.\\-]*):(\\/' \
          + '\\/)?(?:(?:(?:[a-zA-Z0-9_\\.\\-\\+!$&\'\\(\\)*\\+,;=]|%[0-9a-f]' \
          + '{2})+:)*(?:[a-zA-Z0-9_\\.\\-\\+%!$&\'\\(\\)*\\+,;=]|%[0-9a-f]{2}' \
          + ')+@)?(?:(?:[a-z0-9\\-\\.]|%[0-9a-f]{2})+|(?:\\[(?:[0-9a-f]{0,4}:' \
          + ')*(?:[0-9a-f]{0,4})\\]))(?::[0-9]+)?(?:[\\/|\\?](?:[a-zA-Z0-9_#!' \
          + ':\\.\\?\\+=&@!$\'~*,;\\/\\(\\)\\[\\]\\-]|%[0-9a-f]{2})*)?')
      if urlRegularExpression.test(otherURL)
        return otherURL
      else
        stackURL = currentURL.split('/')
        stackURL.pop()
        if otherURL.indexOf('/') is 0
          return "#{stackURL[0]}//#{stackURL[2]}#{otherURL}"
        else
          relativeParts = otherURL.split('/')
          for relativePart in relativeParts
            if relativePart is '..'
              stackURL.pop()
            else if relativePart isnt '.'
              stackURL.push(relativePart)
          return stackURL.join('/')
  
  # Returns the text content of document.
  #
  # @private
  #
  # @param [HTMLDOMParser] htmlParser The HTML parser.
  #
  # @return [string] The text content of document.
  #
  _getCSSContent = (htmlParser, currentURL) ->
    content = ''
    elements = htmlParser.find('style,link[rel=stylesheet]').listResults()
    for element in elements
      if element.getTagName() is 'STYLE'
        content += element.getTextContent()
      if (element.hasAttribute('rel')) and \
          (element.getAttribute('rel') is 'stylesheet')
        content += _getContentFromURL(_getAbsolutePath(currentURL, \
            element.getAttribute('href')))
    return content
  
  # Returns the text content of URL.
  #
  # @private
  #
  # @param [string] url The URL.
  #
  # @return [string] The text content of URL.
  #
  _getContentFromURL = (url) ->
    content = ''
    if url.length > 0
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
          if (@readyState is 4) and (@status is 200)
            content = httpRequest.responseText
        httpRequest.open('GET', url, false)
        httpRequest.send()
    return content
  
  # Initializes a new object that encapsulate the CSS parser.
  #
  # @overload constructor(jscsspParser)
  #   Initializes a new object that encapsulate the use JSCSSP parser.
  #   @param [jscsspStylesheet] jscsspParser The JSCSSP parser.
  #
  # @overload constructor(htmlParser, currentURL)
  #   Initializes a new object that load and read all stylesheet of page.
  #   @param [hatemile.util.html.HTMLDOMParser] htmlParser The HTML parser.
  #   @param [string] currentURL The current URL of page.
  #
  # @overload constructor(cssCode)
  #   Initializes a new object that read the stylesheet of code.
  #   @param [string] cssCode The CSS code.
  #
  constructor: (@parser, @currentURL) ->
    if not (@parser instanceof jscsspStylesheet)
      parser = new CSSParser()
      if (@parser.find instanceof Function) and \
          (@parser.listResults instanceof Function) and \
          (@parser.getParser instanceof Function)
        @parser = _getCSSContent(@parser, @currentURL)
      if (typeof @parser is typeof '')
        @parser = parser.parse("body{}#{@parser}", false, false)
  
  # Returns the rules of parser by properties.
  #
  # @param [Array<string>] properties The properties.
  #
  # @return [Array<hatemile.util.css.jscssp.JSCSSPRule>] The rules.
  #
  # @see hatemile.util.css.StyleSheetParser#getRules
  #
  getRules: (properties) ->
    rules = []
    if (properties is undefined) or (properties.length is 0)
      for nativeRule in @parser.cssRules
        if nativeRule.type is 1
          rules.push(new self.hatemile.util.css.jscssp.JSCSSPRule(nativeRule))
    else
      for nativeRule in @parser.cssRules
        if nativeRule.type is 1
          rule = new self.hatemile.util.css.jscssp.JSCSSPRule(nativeRule)
          for property in properties
            if rule.hasProperty(property)
              rules.push(rule)
              break
    return rules
