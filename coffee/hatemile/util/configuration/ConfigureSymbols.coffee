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

class exports.hatemile.util.configuration.ConfigureSymbols
	
	constructor: (@symbols) ->
	
	formatSymbol = (symbol) ->
		return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+')
				.replace('*', '\\*').replace('?', '\\?').replace('^', '\\^').replace('$', '\\$')
				.replace('[', '\\[').replace(']', '\\[').replace('{', '\\{').replace('}', '\\}')
				.replace('(', '\\(').replace(')', '\\)').replace('|', '\\|').replace('/', '\\/')
				.replace(',', '\\,').replace('!', '\\!').replace('=', '\\=').replace(':', '\\:')
				.replace('-', '\\-')
	
	getDescriptionOf: (symbol) ->
		for _symbol in @symbols
			if _symbol.symbol == symbol
				return _symbol.description
		return null
	
	getSymbols: () ->
		symbols = []
		return symbols.concat(@symbols)
	
	getRegularExpression: () ->
		regularExpression = undefined
		for symbol in @symbols
			formatedSymbol = formatSymbol(symbol.symbol)
			if isEmpty(regularExpression)
				regularExpression = "(#{formatedSymbol})"
			else
				regularExpression = "#{regularExpression}|(#{formatedSymbol})"
		return regularExpression