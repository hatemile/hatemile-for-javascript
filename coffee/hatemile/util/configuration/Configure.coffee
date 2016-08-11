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
 * @namespace configuration
 * @memberof hatemile.util
###
exports.hatemile.util.configuration or= {}

###*
 * @class Configure
 * @classdesc The Configure class contains the configuration of HaTeMiLe.
 * @memberof hatemile.util.configuration
###
class exports.hatemile.util.configuration.Configure
	
	###*
	 * Initializes a new object that contains the configuration of HaTeMiLe.
	 * @param {Object} config The JSON configuration.
	 * @memberof hatemile.util.configuration.Configure
	###
	constructor: (config) ->
		@parameters = config['parameters']
		@selectorChanges = []
		@skippers = []
		changes = config['selector-changes']
		links = config['skippers']
		for change in changes
			@selectorChanges.push(new exports.hatemile.util.configuration.SelectorChange(change['selector'], change['attribute'], change['value-attribute']))
		for link in links
			@skippers.push(new exports.hatemile.util.configuration.Skipper(link['selector'], link['default-text'], link['shortcut']))
	
	###*
	 * Returns the parameters of configuration.
	 * @return {Object} The parameters of configuration.
	 * @memberof hatemile.util.configuration.Configure
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
	 * @memberof hatemile.util.configuration.Configure
	###
	getParameter: (name) ->
		return @parameters[name]
	
	###*
	 * Returns the changes that will be done in selectors.
	 * @return {hatemile.util.configuration.SelectorChange[]} The changes that will be done in
	 * selectors.
	 * @memberof hatemile.util.configuration.Configure
	###
	getSelectorChanges: () ->
		clonedSelectorChanges = []
		return clonedSelectorChanges.concat(@selectorChanges)
	
	###*
	 * Returns the skippers.
	 * @return {hatemile.util.configuration.Skipper} The skippers.
	 * @memberof hatemile.util.configuration.Configure
	###
	getSkippers: () ->
		clonedSkippers = []
		return clonedSkippers.concat(@skippers)