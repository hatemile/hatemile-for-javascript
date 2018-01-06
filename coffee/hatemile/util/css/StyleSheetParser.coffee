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

# The StyleSheetParser interface contains the methods for access the CSS parser.
#
# @abstract
#
class @hatemile.util.css.StyleSheetParser
  
  # Returns the rules of parser by properties.
  #
  # @param [Array<string>] properties The properties.
  #
  # @return [Array<hatemile.util.css.StyleSheetRule>] The rules.
  #
  getRules: (properties) ->
