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
 * @namespace hatemile.util
###
exports.hatemile.util or= {}

###*
 * @namespace hatemile.util.css
###
exports.hatemile.util.css or= {}

###*
 * The StyleSheetRule interface contains the methods for access the CSS rule.
 * @interface hatemile.util.css.StyleSheetRule
###
class exports.hatemile.util.css.StyleSheetRule
	
	###*
	 * Returns that the rule has a declaration with the property.
	 * @param {string} propertyName The name of property.
	 * @returns {boolean} True if the rule has a declaration with the property or
	 * false if the rule not has a declaration with the property.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#hasProperty
	###
	hasProperty: (propertyName) ->
	
	###*
	 * Returns that the rule has declarations.
	 * @returns {boolean} True if the rule has the property or false if the rule
	 * not has declarations.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#hasDeclarations
	###
	hasDeclarations: () ->
	
	###*
	 * Returns the declarations with the property.
	 * @param {string} propertyName The property.
	 * @returns {hatemile.util.css.StyleSheetDeclaration[]} The declarations with
	 * the property.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#getDeclarations
	###
	getDeclarations: (propertyName) ->
	
	###*
	 * Returns the selector of rule.
	 * @returns {string} The selector of rule.
	 * @public
	 * @function hatemile.util.css.StyleSheetRule#getSelector
	###
	getSelector: () ->