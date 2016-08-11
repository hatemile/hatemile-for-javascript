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
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

###*
 * @class AccessibleSelectorImplementation
 * @classdesc The AccessibleSelectorImplementation class is official
 * implementation of AccessibleSelector interface.
 * @extends hatemile.AccessibleSelector
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleSelectorImplementation
	
	_dataIgnore = 'data-ignoreaccessibilityfix'
	
	###*
	 * Initializes a new object that manipulate the accessibility through of the
	 * selectors of the configuration file.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleSelectorImplementation
	###
	constructor: (@parser, configure) ->
		@changes = configure.getSelectorChanges()

	fixSelectors: () ->
		for change in @changes
			elements = @parser.find(change.getSelector()).listResults()
			for element in elements
				if not element.hasAttribute(_dataIgnore)
					element.setAttribute(change.getAttribute(), change.getValueForAttribute())
		return