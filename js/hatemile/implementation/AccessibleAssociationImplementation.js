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
 * @namespace hatemile.implementation
 */
(_base = __exports.hatemile).implementation || (_base.implementation = {});

__exports.hatemile.implementation.AccessibleAssociationImplementation = (function() {
	var DATA_IGNORE, associateDataCellsWithHeaderCellsOfRow, getCellsHeadersIds, getModelRow, getModelTable, getValidModelTable, prepareHeaderCells, validateHeader;

	DATA_IGNORE = 'data-ignoreaccessibilityfix';

	/**
	 * Returns a list that represents the table.
	 * @param {hatemile.util.html.HTMLDOMElement} part The table header, table
	 * footer or table body.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @returns {hatemile.util.html.HTMLDOMElement[][]} The list that
	 * represents the table.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getModelTable
	 */
	getModelTable = function(part, parser) {
		var row, rows, table, _i, _len;
		table = [];
		rows = parser.find(part).findChildren('tr').listResults();
		for (_i = 0, _len = rows.length; _i < _len; _i++) {
			row = rows[_i];
			table.push(getModelRow(parser.find(row).findChildren('th,td').listResults()));
		}
		return getValidModelTable(table);
	};

	/**
	 * Returns a list that represents the table with the rowspans.
	 * @param {hatemile.util.html.HTMLDOMElement[][]} originalTable The list that
	 * represents the table without the rowspans.
	 * @returns {hatemile.util.html.HTMLDOMElement[][]} The list that represents
	 * the table with the rowspans.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getValidModelTable
	 */
	getValidModelTable = function(originalTable) {
		var cell, cellIndex, cellsAdded, lengthRow, lengthTable, newCellIndex, newRow, newRowIndex, newTable, originalRow, rowIndex, rowspan, _i, _j, _ref, _ref1;
		newTable = [];
		if (!isEmpty(originalTable)) {
			lengthTable = originalTable.length;
			for (rowIndex = _i = 0, _ref = lengthTable - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; rowIndex = 0 <= _ref ? ++_i : --_i) {
				originalRow = originalTable[rowIndex];
				if (isEmpty(newTable[rowIndex])) {
					newTable[rowIndex] = [];
				}
				if (!isEmpty(originalRow)) {
					cellsAdded = 0;
					lengthRow = originalRow.length;
					for (cellIndex = _j = 0, _ref1 = lengthRow - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; cellIndex = 0 <= _ref1 ? ++_j : --_j) {
						cell = originalRow[cellIndex];
						newCellIndex = cellIndex + cellsAdded;
						newRow = newTable[rowIndex];
						while (!isEmpty(newRow[newCellIndex])) {
							cellsAdded = cellsAdded + 1;
							newCellIndex = cellIndex + cellsAdded;
						}
						newRow[newCellIndex] = cell;
						if (cell.hasAttribute('rowspan')) {
							rowspan = parseInt(cell.getAttribute('rowspan'));
							newRowIndex = rowIndex;
							while (rowspan > 1) {
								rowspan = rowspan - 1;
								newRowIndex = newRowIndex + 1;
								if (isEmpty(newTable[newRowIndex])) {
									newTable[newRowIndex] = [];
								}
								newTable[newRowIndex][newCellIndex] = cell;
							}
						}
					}
				}
			}
		}
		return newTable;
	};

	/**
	 * Returns a list that represents the line of table with the colspans.
	 * @param {hatemile.util.html.HTMLDOMElement[]} originalRow The list that
	 * represents the line of table without the colspans.
	 * @returns {hatemile.util.html.HTMLDOMElement[]} The list that represents the
	 * line of table with the colspans.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getModelRow
	 */
	getModelRow = function(originalRow) {
		var cellsAdded, colspan, i, length, newRow, _i, _ref;
		newRow = [];
		if (!isEmpty(originalRow)) {
			newRow = newRow.concat(originalRow);
			length = originalRow.length;
			cellsAdded = 0;
			for (i = _i = 0, _ref = length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
				if (originalRow[i].hasAttribute('colspan')) {
					colspan = parseInt(originalRow[i].getAttribute('colspan'));
					while (colspan > 1) {
						colspan = colspan - 1;
						cellsAdded = cellsAdded + 1;
						newRow.splice(i + cellsAdded, 0, originalRow[i]);
					}
				}
			}
		}
		return newRow;
	};

	/**
	 * Validate the model that represents the table header.
	 * @param {hatemile.util.html.HTMLDOMElement[][]} header The list that
	 * represents the table header.
	 * @returns {boolean} True if the table header is valid or false if the table
	 * header is not valid.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.validateHeader
	 */
	validateHeader = function(header) {
		var length, row, _i, _len;
		if (isEmpty(header)) {
			return false;
		}
		length = -1;
		for (_i = 0, _len = header.length; _i < _len; _i++) {
			row = header[_i];
			if (isEmpty(row)) {
				return false;
			} else if (length === -1) {
				length = row.length;
			} else if (row.length !== length) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Returns a list with ids of rows of same column.
	 * @param {hatemile.util.html.HTMLDOMElement[][]} header The list that
	 * represents the table header.
	 * @param {number} index The index of columns.
	 * @returns {string[]} The list with ids of rows of same column.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.getCellsHeadersIds
	 */
	getCellsHeadersIds = function(header, index) {
		var cell, ids, row, _i, _len;
		ids = [];
		for (_i = 0, _len = header.length; _i < _len; _i++) {
			row = header[_i];
			cell = row[index];
			if ((cell.getTagName() === 'TH') && (cell.getAttribute('scope') === 'col')) {
				ids.push(cell.getAttribute('id'));
			}
		}
		return ids;
	};

	/**
	 * Associate the data cell with header cell of row.
	 * @param {hatemile.util.html.HTMLDOMElement} element The table body or footer.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} prefixId The prefix of generated id.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.associateDataCellsWithHeaderCellsOfRow
	 */
	associateDataCellsWithHeaderCellsOfRow = function(element, parser, prefixId) {
		var cell, headerId, headers, headersIds, row, table, _i, _j, _k, _l, _len, _len1, _len2, _len3;
		table = getModelTable(element, parser);
		for (_i = 0, _len = table.length; _i < _len; _i++) {
			row = table[_i];
			headersIds = [];
			for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
				cell = row[_j];
				if (cell.getTagName() === 'TH') {
					__exports.hatemile.util.CommonFunctions.generateId(cell, prefixId);
					headersIds.push(cell.getAttribute('id'));
					cell.setAttribute('scope', 'row');
				}
			}
			if (!isEmpty(headersIds)) {
				for (_k = 0, _len2 = row.length; _k < _len2; _k++) {
					cell = row[_k];
					if (cell.getTagName() === 'TD') {
						headers = cell.getAttribute('headers');
						for (_l = 0, _len3 = headersIds.length; _l < _len3; _l++) {
							headerId = headersIds[_l];
							headers = __exports.hatemile.util.CommonFunctions.increaseInList(headers, headerId);
						}
						cell.setAttribute('headers', headers);
					}
				}
			}
		}
	};

	/**
	 * Set the scope of header cells of table header.
	 * @param {hatemile.util.html.HTMLDOMElement} tableHeader The table header.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {string} prefixId The prefix of generated id.
	 * @private
	 * @function hatemile.implementation.AccessibleAssociationImplementation.prepareHeaderCells
	 */
	prepareHeaderCells = function(tableHeader, parser, prefixId) {
		var cell, cells, _i, _len;
		cells = parser.find(tableHeader).findChildren('tr').findChildren('th').listResults();
		for (_i = 0, _len = cells.length; _i < _len; _i++) {
			cell = cells[_i];
			__exports.hatemile.util.CommonFunctions.generateId(cell, prefixId);
			if (!cell.hasAttribute('scope')) {
				cell.setAttribute('scope', 'col');
			}
		}
	};

	/**
	 * Initializes a new object that improve the accessibility of associations of
	 * parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class The AccessibleAssociationImplementation class is official
	 * implementation of AccessibleAssociation.
	 * @implements {hatemile.AccessibleAssociation}
	 * @constructs hatemile.implementation.AccessibleAssociationImplementation
	 */
	function AccessibleAssociationImplementation(parser, configure) {
		this.parser = parser;
		this.prefixId = configure.getParameter('prefix-generated-ids');
	}

	AccessibleAssociationImplementation.prototype.associateDataCellsWithHeaderCells = function(table) {
		var body, cell, fakeTable, footer, header, headerRows, headers, headersId, headersIds, i, lengthHeader, row, _i, _j, _k, _len, _len1, _len2;
		header = this.parser.find(table).findChildren('thead').firstResult();
		body = this.parser.find(table).findChildren('tbody').firstResult();
		footer = this.parser.find(table).findChildren('tfoot').firstResult();
		if (!isEmpty(header)) {
			prepareHeaderCells(header, this.parser, this.prefixId);
			headerRows = getModelTable(header, this.parser);
			if ((!isEmpty(body)) && (validateHeader(headerRows))) {
				lengthHeader = headerRows[0].length;
				fakeTable = getModelTable(body, this.parser);
				if (!isEmpty(footer)) {
					fakeTable = fakeTable.concat(getModelTable(footer, this.parser));
				}
				for (_i = 0, _len = fakeTable.length; _i < _len; _i++) {
					row = fakeTable[_i];
					if (row.length === lengthHeader) {
						i = 0;
						for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
							cell = row[_j];
							headersIds = getCellsHeadersIds(headerRows, i++);
							headers = cell.getAttribute('headers');
							for (_k = 0, _len2 = headersIds.length; _k < _len2; _k++) {
								headersId = headersIds[_k];
								headers = __exports.hatemile.util.CommonFunctions.increaseInList(headers, headersId);
							}
							cell.setAttribute('headers', headers);
						}
					}
				}
			}
		}
		if (!isEmpty(body)) {
			associateDataCellsWithHeaderCellsOfRow(body, this.parser, this.prefixId);
		}
		if (!isEmpty(footer)) {
			associateDataCellsWithHeaderCellsOfRow(footer, this.parser, this.prefixId);
		}
	};

	AccessibleAssociationImplementation.prototype.associateAllDataCellsWithHeaderCells = function() {
		var table, tables, _i, _len;
		tables = this.parser.find('table').listResults();
		for (_i = 0, _len = tables.length; _i < _len; _i++) {
			table = tables[_i];
			if (__exports.hatemile.util.CommonFunctions.isValidElement(table)) {
				if (isEmpty(this.parser.find(table).findDescendants("thead[" + DATA_IGNORE + "],tbody[" + DATA_IGNORE + "],tfoot[" + DATA_IGNORE + "],tr[" + DATA_IGNORE + "],th[" + DATA_IGNORE + "],td[" + DATA_IGNORE + "]").firstResult())) {
					this.associateDataCellsWithHeaderCells(table);
				}
			}
		}
	};

	AccessibleAssociationImplementation.prototype.associateLabelWithField = function(label) {
		var field;
		if (label.getTagName() === 'LABEL') {
			if (label.hasAttribute('for')) {
				field = this.parser.find("#" + (label.getAttribute('for'))).firstResult();
			} else {
				field = this.parser.find(label).findDescendants('input,select,textarea').firstResult();
				if (!isEmpty(field)) {
					__exports.hatemile.util.CommonFunctions.generateId(field, this.prefixId);
					label.setAttribute('for', field.getAttribute('id'));
				}
			}
			if ((!isEmpty(field)) && (!field.hasAttribute(DATA_IGNORE))) {
				if (!field.hasAttribute('aria-label')) {
					field.setAttribute('aria-label', label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' '));
				}
				__exports.hatemile.util.CommonFunctions.generateId(label, this.prefixId);
				field.setAttribute('aria-labelledby', __exports.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')));
			}
		}
	};

	AccessibleAssociationImplementation.prototype.associateAllLabelsWithFields = function() {
		var label, labels, _i, _len;
		labels = this.parser.find('label').listResults();
		for (_i = 0, _len = labels.length; _i < _len; _i++) {
			label = labels[_i];
			if (__exports.hatemile.util.CommonFunctions.isValidElement(label)) {
				this.associateLabelWithField(label);
			}
		}
	};

	return AccessibleAssociationImplementation;

})();