###
Copyright 2014 Carlson Santana Cruz

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

class exports.hatemile.util.SelectorChange
	
	###*
	 * Inicializes a new object with the values pre-defineds.
	 * @param {String} selector The selector.
	 * @param {String} attribute The attribute.
	 * @param {String} valueForAttribute The value of the attribute.
	 * @class SelectorChange
	 * @classdesc The SelectorChange class store the selector that be attribute
	 * change.
	 * @version 2014-07-23
	 * @memberof hatemile.util
	###
	constructor: (@selector, @attribute, @valueForAttribute) ->
	
	###*
	 * Returns the selector.
	 * @return {String} The selector.
	 * @memberof hatemile.util.SelectorChange
	###
	getSelector: () ->
		return @selector
	
	###*
	 * Returns the attribute.
	 * @return {String} The attribute.
	 * @memberof hatemile.util.SelectorChange
	###
	getAttribute: () ->
		return @attribute
	
	###*
	 * Returns the value of the attribute.
	 * @return {String} The value of the attribute.
	 * @memberof hatemile.util.SelectorChange
	###
	getValueForAttribute: () ->
		return @valueForAttribute