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
 * @class Skipper
 * @classdesc The Skipper class store the selector that will be add a skipper.
 * @memberof hatemile.util
###
class exports.hatemile.util.Skipper
	
	###*
	 * Inicializes a new object with the values pre-defineds.
	 * @param {String} selector The selector.
	 * @param {String} defaultText The default text of skipper.
	 * @param {String} shortcuts The shortcuts of skipper.
	 * @memberof hatemile.util.Skipper
	###
	constructor: (@selector, @defaultText, shortcuts) ->
		if not isEmpty(shortcuts)
			@shortcuts = shortcuts.split(new RegExp('[ \n\t\r]+'))
		else
			@shortcuts = []
	
	###*
	 * Returns the selector.
	 * @return {String} The selector.
	 * @memberof hatemile.util.Skipper
	###
	getSelector: () ->
		return @selector
	
	###*
	 * Returns the default text of skipper.
	 * @return {String} The default text of skipper.
	 * @memberof hatemile.util.Skipper
	###
	getDefaultText: () ->
		return @defaultText
	
	###*
	 * Returns the shortcuts of skipper.
	 * @return {String[]} The shortcuts of skipper.
	 * @memberof hatemile.util.Skipper
	###
	getShortcuts: () ->
		clonedShortcuts = []
		return clonedShortcuts.concat(@shortcuts)