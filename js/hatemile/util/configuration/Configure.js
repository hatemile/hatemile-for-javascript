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

/**
 * @class Configure
 * @classdesc The Configure class contains the configuration of HaTeMiLe.
 * @memberof hatemile.util.configuration
 */
exports.hatemile.util.configuration.Configure = (function() {
	/**
	 * Initializes a new object that contains the configuration of HaTeMiLe.
	 * @param {Object} config The JSON configuration.
	 * @memberof hatemile.util.configuration.Configure
	 */
	function Configure(config) {
		var change, changes, link, links, _i, _j, _len, _len1;
		this.parameters = config['parameters'];
		this.selectorChanges = [];
		this.skippers = [];
		changes = config['selector-changes'];
		links = config['skippers'];
		for (_i = 0, _len = changes.length; _i < _len; _i++) {
			change = changes[_i];
			this.selectorChanges.push(new exports.hatemile.util.configuration.SelectorChange(change['selector'], change['attribute'], change['value-attribute']));
		}
		for (_j = 0, _len1 = links.length; _j < _len1; _j++) {
			link = links[_j];
			this.skippers.push(new exports.hatemile.util.configuration.Skipper(link['selector'], link['default-text'], link['shortcut']));
		}
	}

	/**
	 * Returns the parameters of configuration.
	 * @return {Object} The parameters of configuration.
	 * @memberof hatemile.util.configuration.Configure
	 */
	Configure.prototype.getParameters = function() {
		var clonedParameters, key, value, _ref;
		clonedParameters = {};
		_ref = this.parameters;
		for (key in _ref) {
			value = _ref[key];
			clonedParameters[key] = value;
		}
		return clonedParameters;
	};

	/**
	 * Returns the value of a parameter of configuration.
	 * @param {String} parameter The parameter.
	 * @return {String} The value of the parameter.
	 * @memberof hatemile.util.configuration.Configure
	 */
	Configure.prototype.getParameter = function(name) {
		return this.parameters[name];
	};

	/**
	 * Returns the changes that will be done in selectors.
	 * @return {hatemile.util.configuration.SelectorChange[]} The changes that will be done in
	 * selectors.
	 * @memberof hatemile.util.configuration.Configure
	 */
	Configure.prototype.getSelectorChanges = function() {
		var clonedSelectorChanges;
		clonedSelectorChanges = [];
		return clonedSelectorChanges.concat(this.selectorChanges);
	};

	/**
	 * Returns the skippers.
	 * @return {hatemile.util.configuration.Skipper} The skippers.
	 * @memberof hatemile.util.configuration.Configure
	 */
	Configure.prototype.getSkippers = function() {
		var clonedSkippers;
		clonedSkippers = [];
		return clonedSkippers.concat(this.skippers);
	};

	return Configure;

})();
