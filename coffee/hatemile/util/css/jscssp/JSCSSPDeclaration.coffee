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

# The JSCSSPDeclaration class is official implementation of
# {hatemile.util.css.StyleSheetDeclaration} interface for JSCSSP.
#
# @extend hatemile.util.css.StyleSheetDeclaration
#
class @hatemile.util.css.jscssp.JSCSSPDeclaration
  
  # Initializes a new object that encapsulate the CSS declaration.
  #
  # @param [jscsspDeclaration] declaration The declaration CSS of rule.
  #
  constructor: (@declaration) ->
  
  # Returns the value of declaration.
  #
  # @return [string] The value of declaration.
  #
  # @see hatemile.util.css.StyleSheetDeclaration#getValue
  #
  getValue: () ->
    return @declaration.valueText.trim()
  
  # Returns a array with the values of declaration.
  #
  # @return [Array<string>] The array with the values of declaration.
  #
  # @see hatemile.util.css.StyleSheetDeclaration#getValues
  #
  getValues: () ->
    values = []
    for propertyValue in @declaration.values
      values.push(propertyValue.value)
    return values
  
  # Returns the property of declaration.
  #
  # @return [string] The property of declaration.
  #
  # @see hatemile.util.css.StyleSheetDeclaration#getProperty
  #
  getProperty: () ->
    return @declaration.property
