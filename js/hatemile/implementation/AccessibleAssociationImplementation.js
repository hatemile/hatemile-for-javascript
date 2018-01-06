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

(function () {
    'use strict';
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleAssociationImplementation = (function () {
        var DATA_IGNORE;

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        AccessibleAssociationImplementation.prototype._getModelTable = function (part) {
            var j, len, row, rows, table;
            table = [];
            rows = this.parser.find(part).findChildren('tr').listResults();
            for (j = 0, len = rows.length; j < len; j++) {
                row = rows[j];
                table.push(this._getModelRow(this.parser.find(row).findChildren('th,td').listResults()));
            }
            return this._getValidModelTable(table);
        };

        AccessibleAssociationImplementation.prototype._getValidModelTable = function (originalTable) {
            var cell, cellIndex, cellsAdded, j, k, lengthRow, lengthTable, newCellIndex, newRow, newRowIndex, newTable, originalRow, ref, ref1, rowIndex, rowspan;
            newTable = [];
            lengthTable = originalTable.length;
            if (lengthTable > 0) {
                for (rowIndex = j = 0, ref = lengthTable - 1; 0 <= ref ? j <= ref : j >= ref; rowIndex = 0 <= ref ? ++j : --j) {
                    originalRow = originalTable[rowIndex];
                    if (newTable[rowIndex] === void 0) {
                        newTable[rowIndex] = [];
                    }
                    lengthRow = originalRow.length;
                    if (lengthRow > 0) {
                        cellsAdded = 0;
                        for (cellIndex = k = 0, ref1 = lengthRow - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; cellIndex = 0 <= ref1 ? ++k : --k) {
                            cell = originalRow[cellIndex];
                            newCellIndex = cellIndex + cellsAdded;
                            newRow = newTable[rowIndex];
                            while (newRow[newCellIndex] !== void 0) {
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
                                    if (newTable[newRowIndex] === void 0) {
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

        AccessibleAssociationImplementation.prototype._getModelRow = function (originalRow) {
            var cellsAdded, colspan, i, j, length, newRow, ref;
            newRow = [];
            length = originalRow.length;
            if (length > 0) {
                newRow = newRow.concat(originalRow);
                cellsAdded = 0;
                for (i = j = 0, ref = length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
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

        AccessibleAssociationImplementation.prototype._validateHeader = function (header) {
            var j, len, length, row;
            if (header.length === 0) {
                return false;
            }
            length = -1;
            for (j = 0, len = header.length; j < len; j++) {
                row = header[j];
                if (row.length === 0) {
                    return false;
                } else if (length === -1) {
                    length = row.length;
                } else if (row.length !== length) {
                    return false;
                }
            }
            return true;
        };

        AccessibleAssociationImplementation.prototype._getCellsHeadersIds = function (header, index) {
            var cell, ids, j, len, row;
            ids = [];
            for (j = 0, len = header.length; j < len; j++) {
                row = header[j];
                cell = row[index];
                if ((cell.getTagName() === 'TH') && (cell.getAttribute('scope') === 'col')) {
                    ids.push(cell.getAttribute('id'));
                }
            }
            return ids;
        };

        AccessibleAssociationImplementation.prototype._associateDataCellsWithHeaderCellsOfRow = function (element) {
            var cell, headerId, headers, headersIds, j, k, l, len, len1, len2, len3, m, row, table;
            table = this._getModelTable(element);
            for (j = 0, len = table.length; j < len; j++) {
                row = table[j];
                headersIds = [];
                for (k = 0, len1 = row.length; k < len1; k++) {
                    cell = row[k];
                    if (cell.getTagName() === 'TH') {
                        this.idGenerator.generateId(cell);
                        headersIds.push(cell.getAttribute('id'));
                        cell.setAttribute('scope', 'row');
                    }
                }
                if (headersIds.length > 0) {
                    for (l = 0, len2 = row.length; l < len2; l++) {
                        cell = row[l];
                        if (cell.getTagName() === 'TD') {
                            headers = cell.getAttribute('headers');
                            for (m = 0, len3 = headersIds.length; m < len3; m++) {
                                headerId = headersIds[m];
                                headers = self.hatemile.util.CommonFunctions.increaseInList(headers, headerId);
                            }
                            if (headers !== null) {
                                cell.setAttribute('headers', headers);
                            }
                        }
                    }
                }
            }
        };

        AccessibleAssociationImplementation.prototype._prepareHeaderCells = function (tableHeader) {
            var cell, cells, j, len;
            cells = this.parser.find(tableHeader).findChildren('tr').findChildren('th').listResults();
            for (j = 0, len = cells.length; j < len; j++) {
                cell = cells[j];
                this.idGenerator.generateId(cell);
                if (!cell.hasAttribute('scope')) {
                    cell.setAttribute('scope', 'col');
                }
            }
        };

        function AccessibleAssociationImplementation(parser, configure) {
            this.parser = parser;
            this.idGenerator = new hatemile.util.IDGenerator('association');
        }

        AccessibleAssociationImplementation.prototype.associateDataCellsWithHeaderCells = function (table) {
            var body, cell, fakeTable, footer, header, headerRows, headers, headersId, headersIds, i, j, k, l, len, len1, len2, lengthHeader, row;
            header = this.parser.find(table).findChildren('thead').firstResult();
            body = this.parser.find(table).findChildren('tbody').firstResult();
            footer = this.parser.find(table).findChildren('tfoot').firstResult();
            if (header !== null) {
                this._prepareHeaderCells(header);
                headerRows = this._getModelTable(header);
                if ((body !== null) && (this._validateHeader(headerRows))) {
                    lengthHeader = headerRows[0].length;
                    fakeTable = this._getModelTable(body);
                    if (footer !== null) {
                        fakeTable = fakeTable.concat(this._getModelTable(footer));
                    }
                    for (j = 0, len = fakeTable.length; j < len; j++) {
                        row = fakeTable[j];
                        if (row.length === lengthHeader) {
                            i = 0;
                            for (k = 0, len1 = row.length; k < len1; k++) {
                                cell = row[k];
                                headersIds = this._getCellsHeadersIds(headerRows, i);
                                headers = cell.getAttribute('headers');
                                for (l = 0, len2 = headersIds.length; l < len2; l++) {
                                    headersId = headersIds[l];
                                    headers = self.hatemile.util.CommonFunctions.increaseInList(headers, headersId);
                                }
                                if (headers !== null) {
                                    cell.setAttribute('headers', headers);
                                }
                                i = i + 1;
                            }
                        }
                    }
                }
            }
            if (body !== null) {
                this._associateDataCellsWithHeaderCellsOfRow(body);
            }
            if (footer !== null) {
                this._associateDataCellsWithHeaderCellsOfRow(footer);
            }
        };

        AccessibleAssociationImplementation.prototype.associateAllDataCellsWithHeaderCells = function () {
            var j, len, table, tables;
            tables = this.parser.find('table').listResults();
            for (j = 0, len = tables.length; j < len; j++) {
                table = tables[j];
                if (self.hatemile.util.CommonFunctions.isValidElement(table)) {
                    if (this.parser.find(table).findDescendants(("thead[" + DATA_IGNORE + "],") + ("tbody[" + DATA_IGNORE + "],tfoot[" + DATA_IGNORE + "],tr[" + DATA_IGNORE + "],") + ("th[" + DATA_IGNORE + "],td[" + DATA_IGNORE + "]")).firstResult() === null) {
                        this.associateDataCellsWithHeaderCells(table);
                    }
                }
            }
        };

        AccessibleAssociationImplementation.prototype.associateLabelWithField = function (label) {
            var field;
            if (label.getTagName() === 'LABEL') {
                if (label.hasAttribute('for')) {
                    field = this.parser.find("#" + (label.getAttribute('for'))).firstResult();
                } else {
                    field = this.parser.find(label).findDescendants('input,select,textarea').firstResult();
                    if (field !== null) {
                        this.idGenerator.generateId(field);
                        label.setAttribute('for', field.getAttribute('id'));
                    }
                }
                if ((field !== null) && (!field.hasAttribute(DATA_IGNORE))) {
                    if (!field.hasAttribute('aria-label')) {
                        field.setAttribute('aria-label', label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' '));
                    }
                    this.idGenerator.generateId(label);
                    field.setAttribute('aria-labelledby', self.hatemile.util.CommonFunctions.increaseInList(field.getAttribute('aria-labelledby'), label.getAttribute('id')));
                }
            }
        };

        AccessibleAssociationImplementation.prototype.associateAllLabelsWithFields = function () {
            var j, label, labels, len;
            labels = this.parser.find('label').listResults();
            for (j = 0, len = labels.length; j < len; j++) {
                label = labels[j];
                if (self.hatemile.util.CommonFunctions.isValidElement(label)) {
                    this.associateLabelWithField(label);
                }
            }
        };

        return AccessibleAssociationImplementation;

    })();

}).call(this);
