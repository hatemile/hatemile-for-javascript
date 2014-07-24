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

class exports.hatemile.util.Configure
	
	###*
	 * Initializes a new object that contains the configuration of HaTeMiLe.
	 * @param {Object} config The JSON configuration.
	 * @class Configure
	 * @classdesc The Configure class contains the configuration of HaTeMiLe.
	 * @version 2014-07-23
	 * @memberof hatemile.util
	###
	constructor: (config) ->
		@parameters = config['parameters']
		@selectorChanges = []
		changes = config['selector-changes']
		for change in changes
			@selectorChanges.push(new exports.hatemile.util.SelectorChange(change['selector'], change['attribute'], change['value-attribute']))
	
	###*
	 * Returns the parameters of configuration.
	 * @return {Object} The parameters of configuration.
	###
	getParameters: () ->
		clonedParameters = {}
		for key, value of @parameters
			clonedParameters[key] = value
		return clonedParameters
	
	###*
	 * Returns the value of a parameter of configuration.
	 * @param {String} parameter The parameter.
	 * @return {String} The value of the parameter.
	 * @memberof hatemile.util.Configure
	###
	getParameter: (name) ->
		return @parameters[name]
	
	###*
	 * Returns the changes that will be done in selectors.
	 * @return {hatemile.util.SelectorChange[]} The changes that will be done in
	 * selectors.
	 * @memberof hatemile.util.Configure
	###
	getSelectorChanges: () ->
		clonedSelectorChanges = []
		return clonedSelectorChanges.concat(@selectorChanges)