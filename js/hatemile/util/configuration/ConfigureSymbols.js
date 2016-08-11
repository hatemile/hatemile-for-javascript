/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var exports, _base, _base1;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * @namespace util
 * @memberof hatemile
 */
(_base = exports.hatemile).util || (_base.util = {});

/**
 * @namespace configuration
 * @memberof hatemile.util
 */
(_base1 = exports.hatemile.util).configuration || (_base1.configuration = {});

exports.hatemile.util.configuration.ConfigureSymbols = (function() {
	var formatSymbol;

	function ConfigureSymbols(symbols) {
		this.symbols = symbols;
	}

	formatSymbol = function(symbol) {
		return symbol.replace('\\', '\\\\').replace('.', '\\.').replace('+', '\\+').replace('*', '\\*').replace('?', '\\?').replace('^', '\\^').replace('$', '\\$').replace('[', '\\[').replace(']', '\\[').replace('{', '\\{').replace('}', '\\}').replace('(', '\\(').replace(')', '\\)').replace('|', '\\|').replace('/', '\\/').replace(',', '\\,').replace('!', '\\!').replace('=', '\\=').replace(':', '\\:').replace('-', '\\-');
	};

	ConfigureSymbols.prototype.getDescriptionOf = function(symbol) {
		var _i, _len, _ref, _symbol;
		_ref = this.symbols;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			_symbol = _ref[_i];
			if (_symbol.symbol === symbol) {
				return _symbol.description;
			}
		}
		return null;
	};

	ConfigureSymbols.prototype.getSymbols = function() {
		var symbols;
		symbols = [];
		return symbols.concat(this.symbols);
	};

	ConfigureSymbols.prototype.getRegularExpression = function() {
		var formatedSymbol, regularExpression, symbol, _i, _len, _ref;
		regularExpression = void 0;
		_ref = this.symbols;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			symbol = _ref[_i];
			formatedSymbol = formatSymbol(symbol.symbol);
			if (isEmpty(regularExpression)) {
				regularExpression = "(" + formatedSymbol + ")";
			} else {
				regularExpression = "" + regularExpression + "|(" + formatedSymbol + ")";
			}
		}
		return regularExpression;
	};

	return ConfigureSymbols;

})();
