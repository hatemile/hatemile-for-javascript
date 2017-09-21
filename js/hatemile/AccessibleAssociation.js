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

var __exports;

__exports = this;

/**
 * @namespace hatemile
 */
__exports.hatemile || (__exports.hatemile = {});

/**
 * The AccessibleAssociation interface improve accessibility, associating
 * elements.
 * @interface hatemile.AccessibleAssociation
 */
__exports.hatemile.AccessibleAssociation = (function() {
	function AccessibleAssociation() {
	}

	/**
	 * Associate all data cells with header cells of table.
	 * @param {hatemile.util.html.HTMLDOMElement} table The table.
	 * @public
	 * @function hatemile.AccessibleAssociation#associateDataCellsWithHeaderCells
	 */
	AccessibleAssociation.prototype.associateDataCellsWithHeaderCells = function(table) {
	};

	/**
	 * Associate all data cells with header cells of all tables of page.
	 * @public
	 * @function hatemile.AccessibleAssociation#associateAllDataCellsWithHeaderCells
	 */
	AccessibleAssociation.prototype.associateAllDataCellsWithHeaderCells = function() {
	};

	/**
	 * Associate label with field.
	 * @param {hatemile.util.html.HTMLDOMElement} label The label.
	 * @public
	 * @function hatemile.AccessibleAssociation#associateLabelWithField
	 */
	AccessibleAssociation.prototype.associateLabelWithField = function(label) {
	};

	/**
	 * Associate all labels of page with fields.
	 * @public
	 * @function hatemile.AccessibleAssociation#associateAllLabelsWithFields
	 */
	AccessibleAssociation.prototype.associateAllLabelsWithFields = function() {
	};

	return AccessibleAssociation;

})();