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

var __exports, _base;

__exports = this;

/**
 * @namespace hatemile
 */
__exports.hatemile || (__exports.hatemile = {});

/**
 * @namespace hatemile.util
 */
(_base = __exports.hatemile).util || (_base.util = {});

__exports.hatemile.util.Configure = (function() {
	/**
	 * Initializes a new object that contains the configuration of HaTeMiLe.
	 * @param {object.<string, string>} parameters The JSON configuration.
	 * @class The Configure class contains the configuration of HaTeMiLe.
	 * @constructs hatemile.util.Configure
	 */
	function Configure(parameters) {
		this.parameters = parameters;
	}

	/**
	 * Returns the parameters of configuration.
	 * @returns {object.<string, string>} The parameters of configuration.
	 * @public
	 * @function hatemile.util.Configure#getParameters
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
	 * @param {string} name The parameter.
	 * @returns {string} The value of the parameter.
	 * @public
	 * @function hatemile.util.Configure#getParameter
	 */
	Configure.prototype.getParameter = function(name) {
		return this.parameters[name];
	};

	return Configure;

})();