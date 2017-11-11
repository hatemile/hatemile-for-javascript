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
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleAssociationImplementation = (function () {
        var DATA_IGNORE;

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        AccessibleAssociationImplementation.prototype.getModelTable = function (part, parser) {
            var j, len, row, rows, table;
            table = [];
            rows = parser.find(part).findChildren('tr').listResults();
            for (j = 0, len = rows.length; j < len; j++) {
                row = rows[j];
                table.push(this.getModelRow(parser.find(row).findChildren('th,td').listResults()));
            }
            return this.getValidModelTable(table);
        };

        AccessibleAssociationImplementation.prototype.getValidModelTable = function (originalTable) {
            var cell, cellIndex, cellsAdded, j, k, lengthRow, lengthTable, newCellIndex, newRow, newRowIndex, newTable, originalRow, ref, ref1, rowIndex, rowspan;
            newTable = [];
            if (!self.isEmpty(originalTable)) {
                lengthTable = originalTable.length;
                for (rowIndex = j = 0, ref = lengthTable - 1; 0 <= ref ? j <= ref : j >= ref; rowIndex = 0 <= ref ? ++j : --j) {
                    originalRow = originalTable[rowIndex];
                    if (self.isEmpty(newTable[rowIndex])) {
                        newTable[rowIndex] = [];
                    }
                    if (!self.isEmpty(originalRow)) {
                        cellsAdded = 0;
                        lengthRow = originalRow.length;
                        for (cellIndex = k = 0, ref1 = lengthRow - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; cellIndex = 0 <= ref1 ? ++k : --k) {
                            cell = originalRow[cellIndex];
                            newCellIndex = cellIndex + cellsAdded;
                            newRow = newTable[rowIndex];
                            while (!self.isEmpty(newRow[newCellIndex])) {
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
                                    if (self.isEmpty(newTable[newRowIndex])) {
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

        AccessibleAssociationImplementation.prototype.getModelRow = function (originalRow) {
            var cellsAdded, colspan, i, j, length, newRow, ref;
            newRow = [];
            if (!self.isEmpty(originalRow)) {
                newRow = newRow.concat(originalRow);
                length = originalRow.length;
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

        AccessibleAssociationImplementation.prototype.validateHeader = function (header) {
            var j, len, length, row;
            if (self.isEmpty(header)) {
                return false;
            }
            length = -1;
            for (j = 0, len = header.length; j < len; j++) {
                row = header[j];
                if (self.isEmpty(row)) {
                    return false;
                } else if (length === -1) {
                    length = row.length;
                } else if (row.length !== length) {
                    return false;
                }
            }
            return true;
        };

        AccessibleAssociationImplementation.prototype.getCellsHeadersIds = function (header, index) {
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

        AccessibleAssociationImplementation.prototype.associateDataCellsWithHeaderCellsOfRow = function (element, parser, prefixId) {
            var cell, headerId, headers, headersIds, j, k, l, len, len1, len2, len3, m, row, table;
            table = this.getModelTable(element, parser);
            for (j = 0, len = table.length; j < len; j++) {
                row = table[j];
                headersIds = [];
                for (k = 0, len1 = row.length; k < len1; k++) {
                    cell = row[k];
                    if (cell.getTagName() === 'TH') {
                        self.hatemile.util.CommonFunctions.generateId(cell, prefixId);
                        headersIds.push(cell.getAttribute('id'));
                        cell.setAttribute('scope', 'row');
                    }
                }
                if (!self.isEmpty(headersIds)) {
                    for (l = 0, len2 = row.length; l < len2; l++) {
                        cell = row[l];
                        if (cell.getTagName() === 'TD') {
                            headers = cell.getAttribute('headers');
                            for (m = 0, len3 = headersIds.length; m < len3; m++) {
                                headerId = headersIds[m];
                                headers = self.hatemile.util.CommonFunctions.increaseInList(headers, headerId);
                            }
                            cell.setAttribute('headers', headers);
                        }
                    }
                }
            }
        };

        AccessibleAssociationImplementation.prototype.prepareHeaderCells = function (tableHeader, parser, prefixId) {
            var cell, cells, j, len;
            cells = parser.find(tableHeader).findChildren('tr').findChildren('th').listResults();
            for (j = 0, len = cells.length; j < len; j++) {
                cell = cells[j];
                self.hatemile.util.CommonFunctions.generateId(cell, prefixId);
                if (!cell.hasAttribute('scope')) {
                    cell.setAttribute('scope', 'col');
                }
            }
        };

        function AccessibleAssociationImplementation(parser1, configure) {
            this.parser = parser1;
            this.prefixId = configure.getParameter('prefix-generated-ids');
        }

        AccessibleAssociationImplementation.prototype.associateDataCellsWithHeaderCells = function (table) {
            var body, cell, fakeTable, footer, header, headerRows, headers, headersId, headersIds, i, j, k, l, len, len1, len2, lengthHeader, row;
            header = this.parser.find(table).findChildren('thead').firstResult();
            body = this.parser.find(table).findChildren('tbody').firstResult();
            footer = this.parser.find(table).findChildren('tfoot').firstResult();
            if (!self.isEmpty(header)) {
                this.prepareHeaderCells(header, this.parser, this.prefixId);
                headerRows = this.getModelTable(header, this.parser);
                if ((!self.isEmpty(body)) && (this.validateHeader(headerRows))) {
                    lengthHeader = headerRows[0].length;
                    fakeTable = this.getModelTable(body, this.parser);
                    if (!self.isEmpty(footer)) {
                        fakeTable = fakeTable.concat(this.getModelTable(footer, this.parser));
                    }
                    for (j = 0, len = fakeTable.length; j < len; j++) {
                        row = fakeTable[j];
                        if (row.length === lengthHeader) {
                            i = 0;
                            for (k = 0, len1 = row.length; k < len1; k++) {
                                cell = row[k];
                                headersIds = this.getCellsHeadersIds(headerRows, i);
                                headers = cell.getAttribute('headers');
                                for (l = 0, len2 = headersIds.length; l < len2; l++) {
                                    headersId = headersIds[l];
                                    headers = self.hatemile.util.CommonFunctions.increaseInList(headers, headersId);
                                }
                                cell.setAttribute('headers', headers);
                                i = i + 1;
                            }
                        }
                    }
                }
            }
            if (!self.isEmpty(body)) {
                this.associateDataCellsWithHeaderCellsOfRow(body, this.parser, this.prefixId);
            }
            if (!self.isEmpty(footer)) {
                this.associateDataCellsWithHeaderCellsOfRow(footer, this.parser, this.prefixId);
            }
        };

        AccessibleAssociationImplementation.prototype.associateAllDataCellsWithHeaderCells = function () {
            var j, len, table, tables;
            tables = this.parser.find('table').listResults();
            for (j = 0, len = tables.length; j < len; j++) {
                table = tables[j];
                if (self.hatemile.util.CommonFunctions.isValidElement(table)) {
                    if (self.isEmpty(this.parser.find(table).findDescendants(("thead[" + DATA_IGNORE + "],tbody[" + DATA_IGNORE + "],") + ("tfoot[" + DATA_IGNORE + "],tr[" + DATA_IGNORE + "],th[" + DATA_IGNORE + "],") + ("td[" + DATA_IGNORE + "]")).firstResult())) {
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
                    if (!self.isEmpty(field)) {
                        self.hatemile.util.CommonFunctions.generateId(field, this.prefixId);
                        label.setAttribute('for', field.getAttribute('id'));
                    }
                }
                if ((!self.isEmpty(field)) && (!field.hasAttribute(DATA_IGNORE))) {
                    if (!field.hasAttribute('aria-label')) {
                        field.setAttribute('aria-label', label.getTextContent().replace(new RegExp('[ \n\t\r]+', 'g'), ' '));
                    }
                    self.hatemile.util.CommonFunctions.generateId(label, this.prefixId);
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
