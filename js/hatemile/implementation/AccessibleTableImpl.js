/*
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
*/

var exports, _base;

exports = this;

/**
 * @namespace hatemile
*/


exports.hatemile || (exports.hatemile = {});

/**
 * @namespace implementation
 * @memberof hatemile
*/


(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleTableImpl = (function() {
  /**
  	 * Initializes a new object that manipulate the accessibility of the tables of
  	 * parser.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @class AccessibleTableImpl
  	 * @classdesc The AccessibleTableImpl class is official implementation of
  	 * AccessibleTable interface.
  	 * @extends hatemile.AccessibleTable
  	 * @version 2014-07-23
  	 * @memberof hatemile.implementation
  */

  var fixBodyOrFooter, fixHeader, generateColspan, generatePart, generateRowspan, returnListIdsColumns, validateHeader;

  function AccessibleTableImpl(parser, configure) {
    this.parser = parser;
    this.prefixId = configure.getParameter('prefix-generated-ids');
    this.dataIgnore = "data-" + (configure.getParameter('data-ignore'));
  }

  /**
  	 * Returns a list that represents the table.
  	 * @param {hatemile.util.HTMLDOMElement} part The table header, table footer
  	 * or table body.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @return {Array.<hatemile.util.HTMLDOMElement[]>} The list that represents
  	 * the table.
  	 * @memberof hatemile.implementation.AccessibleTableImpl
  */


  generatePart = function(part, parser) {
    var row, rows, table, _i, _len;
    table = [];
    rows = parser.find(part).findChildren('tr').listResults();
    for (_i = 0, _len = rows.length; _i < _len; _i++) {
      row = rows[_i];
      table.push(generateColspan(parser.find(row).findChildren('th,td').listResults()));
    }
    return generateRowspan(table);
  };

  /**
  	 * Returns a list that represents the table with the rowspans.
  	 * @param {Array.<hatemile.util.HTMLDOMElement[]>} rows The list that
  	 * represents the table without the rowspans.
  	 * @return {Array.<hatemile.util.HTMLDOMElement[]>} The list that represents
  	 * the table with the rowspans.
  	 * @memberof hatemile.implementation.AccessibleTableImpl
  */


  generateRowspan = function(rows) {
    var cell, cells, columnIndex, copy, i, j, l, lengthCells, lengthRows, m, n, row, rowspan, table, _i, _j, _k, _ref, _ref1, _ref2;
    copy = [];
    table = [];
    copy = copy.concat(rows);
    if (!isEmpty(copy)) {
      lengthRows = copy.length;
      for (i = _i = 0, _ref = lengthRows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        cells = copy[i];
        columnIndex = 0;
        lengthCells = cells.length;
        if (isEmpty(table[i])) {
          table[i] = [];
        }
        for (j = _j = 0, _ref1 = lengthCells - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
          cell = cells[j];
          m = j + columnIndex;
          row = table[i];
          while (!isEmpty(row[m])) {
            columnIndex = columnIndex + 1;
            m = j + columnIndex;
          }
          row[m] = cell;
          if (cell.hasAttribute('rowspan')) {
            rowspan = parseInt(cell.getAttribute('rowspan'));
            if (rowspan > 1) {
              for (l = _k = 1, _ref2 = rowspan - 1; 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; l = 1 <= _ref2 ? ++_k : --_k) {
                n = i + l;
                if (isEmpty(table[n])) {
                  table[n] = [];
                }
                table[n][m] = cell;
              }
            }
          }
        }
      }
    }
    return table;
  };

  /**
  	 * Returns a list that represents the line of table with the colspans.
  	 * @param {hatemile.util.HTMLDOMElement[]} cells The list that represents the
  	 * line of table without the colspans.
  	 * @return {hatemile.util.HTMLDOMElement[]} The list that represents the line
  	 * of table with the colspans.
  	 * @memberof hatemile.implementation.AccessibleTableImpl
  */


  generateColspan = function(cells) {
    var colspan, copy, i, j, length, _i, _j, _ref, _ref1;
    copy = [];
    copy = copy.concat(cells);
    length = cells.length;
    for (i = _i = 0, _ref = length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (cells[i].hasAttribute('colspan')) {
        colspan = parseInt(cells[i].getAttribute('colspan'));
        if (colspan > 1) {
          for (j = _j = 1, _ref1 = colspan - 1; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
            copy.splice(i + j, 0, cells[i]);
          }
        }
      }
    }
    return copy;
  };

  /**
  	 * Validate the list that represents the table header.
  	 * @param {Array.<hatemile.util.HTMLDOMElement[]>} header The list that
  	 * represents the table header.
  	 * @return {Boolean} True if the table header is valid or false if the table
  	 * header is not valid.
  	 * @memberof hatemile.implementation.AccessibleTableImpl
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
  	 * @param {Array.<hatemile.util.HTMLDOMElement[]>} header The list that
  	 * represents the table header.
  	 * @param {Number} index The index of columns.
  	 * @return {hatemile.util.HTMLDOMElement[]} The list with ids of rows of same
  	 * column.
  	 * @memberof hatemile.implementation.AccessibleTableImpl
  */


  returnListIdsColumns = function(header, index) {
    var ids, row, _i, _len;
    ids = [];
    for (_i = 0, _len = header.length; _i < _len; _i++) {
      row = header[_i];
      if (row[index].getTagName() === 'TH') {
        ids.push(row[index].getAttribute('id'));
      }
    }
    return ids;
  };

  /**
  	 * Fix the table body or table footer.
  	 * @param {hatemile.util.HTMLDOMElement} element The table body or table
  	 * footer.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} prefixId The prefix of generated id.
  	 * @memberof hatemile.implementation.AccessibleTableImpl
  */


  fixBodyOrFooter = function(element, parser, prefixId) {
    var cell, cells, headerId, headers, headersIds, table, _i, _j, _k, _l, _len, _len1, _len2, _len3;
    table = generatePart(element, parser);
    for (_i = 0, _len = table.length; _i < _len; _i++) {
      cells = table[_i];
      headersIds = [];
      for (_j = 0, _len1 = cells.length; _j < _len1; _j++) {
        cell = cells[_j];
        if (cell.getTagName() === 'TH') {
          exports.hatemile.util.CommonFunctions.generateId(cell, prefixId);
          headersIds.push(cell.getAttribute('id'));
          cell.setAttribute('scope', 'row');
        }
      }
      if (!isEmpty(headersIds)) {
        for (_k = 0, _len2 = cells.length; _k < _len2; _k++) {
          cell = cells[_k];
          if (cell.getTagName() === 'TD') {
            headers = cell.getAttribute('headers');
            for (_l = 0, _len3 = headersIds.length; _l < _len3; _l++) {
              headerId = headersIds[_l];
              headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headerId);
            }
            cell.setAttribute('headers', headers);
          }
        }
      }
    }
  };

  /**
  	 * Fix the table header.
  	 * @param {hatemile.util.HTMLDOMElement} tableHeader The table header.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {String} prefixId The prefix of generated id.
  */


  fixHeader = function(tableHeader, parser, prefixId) {
    var cell, cells, _i, _len;
    cells = parser.find(tableHeader).findChildren('tr').findChildren('th').listResults();
    for (_i = 0, _len = cells.length; _i < _len; _i++) {
      cell = cells[_i];
      exports.hatemile.util.CommonFunctions.generateId(cell, prefixId);
      cell.setAttribute('scope', 'col');
    }
  };

  AccessibleTableImpl.prototype.fixTable = function(table) {
    var body, cell, cells, fakeTable, footer, header, headerCells, headers, headersId, headersIds, i, lengthHeader, _i, _j, _k, _len, _len1, _len2;
    header = this.parser.find(table).findChildren('thead').firstResult();
    body = this.parser.find(table).findChildren('tbody').firstResult();
    footer = this.parser.find(table).findChildren('tfoot').firstResult();
    if (!isEmpty(header)) {
      fixHeader(header, this.parser, this.prefixId);
      headerCells = generatePart(header, this.parser);
      if (!isEmpty(body) && validateHeader(headerCells)) {
        lengthHeader = headerCells[0].length;
        fakeTable = generatePart(body, this.parser);
        if (!isEmpty(footer)) {
          fakeTable = fakeTable.concat(generatePart(footer, this.parser));
        }
        for (_i = 0, _len = fakeTable.length; _i < _len; _i++) {
          cells = fakeTable[_i];
          if (cells.length === lengthHeader) {
            i = 0;
            for (_j = 0, _len1 = cells.length; _j < _len1; _j++) {
              cell = cells[_j];
              headersIds = returnListIdsColumns(headerCells, i);
              headers = cell.getAttribute('headers');
              for (_k = 0, _len2 = headersIds.length; _k < _len2; _k++) {
                headersId = headersIds[_k];
                headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headersId);
              }
              cell.setAttribute('headers', headers);
              i++;
            }
          }
        }
      }
    }
    if (!isEmpty(body)) {
      fixBodyOrFooter(body, this.parser, this.prefixId);
    }
    if (!isEmpty(footer)) {
      fixBodyOrFooter(footer, this.parser, this.prefixId);
    }
  };

  AccessibleTableImpl.prototype.fixTables = function() {
    var table, tables, _i, _len;
    tables = this.parser.find('table').listResults();
    for (_i = 0, _len = tables.length; _i < _len; _i++) {
      table = tables[_i];
      if (!table.hasAttribute(this.dataIgnore)) {
        this.fixTable(table);
      }
    }
  };

  return AccessibleTableImpl;

})();
