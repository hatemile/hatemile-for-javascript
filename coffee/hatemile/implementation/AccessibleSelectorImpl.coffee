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
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

class exports.hatemile.implementation.AccessibleSelectorImpl
	
	###*
	 * Initializes a new object that manipulate the accessibility through of the
	 * selectors of the configuration file.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class AccessibleSelectorImpl
	 * @classdesc The AccessibleSelectorImpl class is official implementation of
	 * AccessibleSelector interface.
	 * @extends hatemile.AccessibleSelector
	 * @version 1.0
	 * @memberof hatemile.implementation
	###
	constructor: (@parser, configuration) ->
		@changes = configuration.getSelectorChanges()
		@dataIgnore = configuration.getParameter('data-ignore')

	fixSelectors: () ->
		for change in @changes
			elements = @parser.find(change.getSelector()).listResults()
			for element in elements
				if not element.hasAttribute(@dataIgnore)
					element.setAttribute(change.getAttribute(), change.getValueForAttribute())
		return