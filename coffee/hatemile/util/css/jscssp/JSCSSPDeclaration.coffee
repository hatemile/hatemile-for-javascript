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

class @hatemile.util.css.jscssp.JSCSSPDeclaration
	
	###*
	 * Initializes a new object that encapsulate the CSS declaration.
	 * @param {jscsspDeclaration} declaration The declaration CSS of rule.
	 * @class The JSCSSPDeclaration class is official implementation of
	 * StyleSheetDeclaration interface for JSCSSP.
	 * @implements {hatemile.util.css.StyleSheetDeclaration}
	 * @constructs hatemile.util.css.jscssp.JSCSSPDeclaration
	###
	constructor: (@declaration) ->
	
	getValue: () ->
		return @declaration.valueText.trim()
	
	getValues: () ->
		values = []
		for propertyValue in @declaration.values
			values.push(propertyValue.value)
		return values
	
	getProperty: () ->
		return @declaration.property
