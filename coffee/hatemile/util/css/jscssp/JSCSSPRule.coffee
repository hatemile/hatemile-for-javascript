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
self = this

###*
 * @namespace hatemile
###
@hatemile or= {}

###*
 * @namespace hatemile.util
###
@hatemile.util or= {}

###*
 * @namespace hatemile.util.css
###
@hatemile.util.css or= {}

###*
 * @namespace hatemile.util.css.jscssp
###
@hatemile.util.css.jscssp or= {}

class @hatemile.util.css.jscssp.JSCSSPRule
	
	###*
	 * Initializes a new object that encapsulate the CSS rule.
	 * @param {jscsspStyleRule} rule The JSCSSP rule.
	 * @class The JSCSSPRule class is official implementation of StyleSheetRule
	 * interface for JSCSSP.
	 * @implements {hatemile.util.css.StyleSheetRule}
	 * @constructs hatemile.util.css.jscssp.JSCSSPRule
	###
	constructor: (@rule) ->
	
	hasProperty: (propertyName) ->
		for nativeDeclaration in @rule.declarations
			declaration = new self.hatemile.util.css.jscssp.JSCSSPDeclaration(nativeDeclaration)
			if propertyName is declaration.getProperty()
				return true
		return false
	
	hasDeclarations: () ->
		return @rule.declarations.length > 0
	
	getDeclarations: (propertyName) ->
		declarations = []
		for nativeDeclaration in @rule.declarations
			declaration = new self.hatemile.util.css.jscssp.JSCSSPDeclaration(nativeDeclaration)
			if propertyName is declaration.getProperty()
				declarations.push(declaration)
		return declarations
	
	getSelector: () ->
		return @rule.mSelectorText
