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

# The JSCSSPRule class is official implementation of
# {hatemile.util.css.StyleSheetRule} interface for JSCSSP.
#
# @extend hatemile.util.css.StyleSheetRule
#
class @hatemile.util.css.jscssp.JSCSSPRule
  
  # Initializes a new object that encapsulate the CSS rule.
  #
  # @param [jscsspStyleRule] rule The JSCSSP rule.
  #
  constructor: (@rule) ->
  
  # Returns that the rule has a declaration with the property.
  #
  # @param [string] propertyName The name of property.
  #
  # @return [boolean] True if the rule has a declaration with the property or false if the rule not has a declaration with the property.
  #
  # @see hatemile.util.css.StyleSheetRule#hasProperty
  #
  hasProperty: (propertyName) ->
    for nativeDeclaration in @rule.declarations
      declaration = new self.hatemile.util.css.jscssp
          .JSCSSPDeclaration(nativeDeclaration)
      if propertyName is declaration.getProperty()
        return true
    return false
  
  # Returns that the rule has declarations.
  #
  # @return [boolean] True if the rule has the property or false if the rule not has declarations.
  #
  # @see hatemile.util.css.StyleSheetRule#hasDeclarations
  #
  hasDeclarations: () ->
    return @rule.declarations.length > 0
  
  # Returns the declarations with the property.
  #
  # @param [string] propertyName The property.
  #
  # @return [Array<hatemile.util.css.jscssp.JSCSSPDeclaration>] The declarations with the property.
  #
  # @see hatemile.util.css.StyleSheetRule#getDeclarations
  #
  getDeclarations: (propertyName) ->
    declarations = []
    for nativeDeclaration in @rule.declarations
      declaration = new self.hatemile.util.css.jscssp
          .JSCSSPDeclaration(nativeDeclaration)
      if propertyName is declaration.getProperty()
        declarations.push(declaration)
    return declarations
  
  # Returns the selector of rule.
  #
  # @return [string] The selector of rule.
  #
  # @see hatemile.util.css.StyleSheetRule#getSelector
  #
  getSelector: () ->
    return @rule.mSelectorText
