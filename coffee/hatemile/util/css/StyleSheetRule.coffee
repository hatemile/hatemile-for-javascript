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

# The StyleSheetRule interface contains the methods for access the CSS rule.
#
# @abstract
#
class @hatemile.util.css.StyleSheetRule
  
  # Returns that the rule has a declaration with the property.
  #
  # @param [string] propertyName The name of property.
  #
  # @return [boolean] True if the rule has a declaration with the property or false if the rule not has a declaration with the property.
  #
  hasProperty: (propertyName) ->
  
  # Returns that the rule has declarations.
  #
  # @return [boolean] True if the rule has the property or false if the rule not has declarations.
  #
  hasDeclarations: () ->
  
  # Returns the declarations with the property.
  #
  # @param [string] propertyName The property.
  #
  # @return [Array<hatemile.util.css.StyleSheetDeclaration>] The declarations with the property.
  #
  getDeclarations: (propertyName) ->
  
  # Returns the selector of rule.
  #
  # @return [string] The selector of rule.
  #
  getSelector: () ->
