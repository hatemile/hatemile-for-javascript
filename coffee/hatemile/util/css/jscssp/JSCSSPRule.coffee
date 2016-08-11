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

exports.hatemile.util.css.jsccssp or= {}

class exports.hatemile.util.css.jsccssp.JSCSSPRule
	
	constructor: (@rule) ->
	
	hasProperty: (propertyName) ->
		for nativeDeclaration in @rule.declarations
			declaration = new hatemile.util.css.jsccssp.JSCSSPDeclaration(nativeDeclaration)
			if propertyName is declaration.getProperty()
				return true
		return false
	
	hasDeclarations: () ->
		return @rule.declarations.length > 0
	
	getDeclarations: (propertyName) ->
		declarations = []
		for nativeDeclaration in @rule.declarations
			declaration = new hatemile.util.css.jsccssp.JSCSSPDeclaration(nativeDeclaration)
			if propertyName is declaration.getProperty()
				declarations.push(declaration)
		return declarations
	
	getSelector: () ->
		return @rule.mSelectorText