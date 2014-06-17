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

var exports;

exports = this;

/**
 * @namespace hatemile
*/


exports.hatemile || (exports.hatemile = {});

/**
 * @class AccessibleTable
 * @classdesc The AccessibleTable interface fix the problems of accessibility
 * associated with the tables.
 * @version 1.0
 * @memberof hatemile
*/


exports.hatemile.AccessibleTable = (function() {
  function AccessibleTable() {}

  /**
  	 * Fix the table header.
  	 * @param {hatemile.util.HTMLDOMElement} tableHeader The table header.
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H43.html|H43: Using id and headers attributes to associate data cells with header cells in data tables}
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H63.html|H63: Using the scope attribute to associate header cells and data cells in data tables}
  	 * @memberof hatemile.AccessibleTable
  */


  AccessibleTable.prototype.fixHeader = function(tableHeader) {};

  /**
  	 * Fix the table footer.
  	 * @param {hatemile.util.HTMLDOMElement} tableFooter The table footer.
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H43.html|H43: Using id and headers attributes to associate data cells with header cells in data tables}
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H63.html|H63: Using the scope attribute to associate header cells and data cells in data tables}
  	 * @memberof hatemile.AccessibleTable
  */


  AccessibleTable.prototype.fixFooter = function(tableFooter) {};

  /**
  	 * Fix the table body.
  	 * @param {hatemile.util.HTMLDOMElement} tableBody The table body.
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H43.html|H43: Using id and headers attributes to associate data cells with header cells in data tables}
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H63.html|H63: Using the scope attribute to associate header cells and data cells in data tables}
  	 * @memberof hatemile.AccessibleTable
  */


  AccessibleTable.prototype.fixBody = function(tableBody) {};

  /**
  	 * Fix the table.
  	 * @param {hatemile.util.HTMLDOMElement} table The table.
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H43.html|H43: Using id and headers attributes to associate data cells with header cells in data tables}
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H63.html|H63: Using the scope attribute to associate header cells and data cells in data tables}
  	 * @memberof hatemile.AccessibleTable
  */


  AccessibleTable.prototype.fixTable = function(table) {};

  /**
  	 * Fix the tables.
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H43.html|H43: Using id and headers attributes to associate data cells with header cells in data tables}
  	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/H63.html|H63: Using the scope attribute to associate header cells and data cells in data tables}
  	 * @memberof hatemile.AccessibleTable
  */


  AccessibleTable.prototype.fixTables = function() {};

  return AccessibleTable;

})();
