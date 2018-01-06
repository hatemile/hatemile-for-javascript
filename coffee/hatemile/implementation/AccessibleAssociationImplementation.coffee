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
'use strict'

self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.implementation
#
@hatemile.implementation or= {}

# The AccessibleAssociationImplementation class is official implementation of
# {hatemile.AccessibleAssociation}.
#
# @extend hatemile.AccessibleAssociation
#
class @hatemile.implementation.AccessibleAssociationImplementation
  
  DATA_IGNORE = 'data-ignoreaccessibilityfix'
  
  # Returns a list that represents the table.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] part The table header, table footer or table body.
  #
  # @return [Array<Array<hatemile.util.html.HTMLDOMElement>>] The list that represents the table.
  #
  _getModelTable: (part) ->
    table = []
    rows = @parser.find(part).findChildren('tr').listResults()
    for row in rows
      table.push(@_getModelRow(@parser.find(row).findChildren('th,td')
          .listResults()))
    return @_getValidModelTable(table)
  
  # Returns a list that represents the table with the rowspans.
  #
  # @private
  #
  # @param [Array<Array<hatemile.util.html.HTMLDOMElement>>] originalTable The list that represents the table without the rowspans.
  #
  # @return [Array<Array<hatemile.util.html.HTMLDOMElement>>] The list that represents the table with the rowspans.
  #
  _getValidModelTable: (originalTable) ->
    newTable = []
    lengthTable = originalTable.length
    if lengthTable > 0
      for rowIndex in [0..lengthTable - 1]
        originalRow = originalTable[rowIndex]
        if newTable[rowIndex] is undefined
          newTable[rowIndex] = []
        lengthRow = originalRow.length
        if lengthRow > 0
          cellsAdded = 0
          for cellIndex in [0..lengthRow - 1]
            cell = originalRow[cellIndex]
            newCellIndex = cellIndex + cellsAdded
            newRow = newTable[rowIndex]
            while newRow[newCellIndex] isnt undefined
              cellsAdded = cellsAdded + 1
              newCellIndex = cellIndex + cellsAdded
            newRow[newCellIndex] = cell
            if cell.hasAttribute('rowspan')
              rowspan = parseInt(cell.getAttribute('rowspan'))
              newRowIndex = rowIndex
              while (rowspan > 1)
                rowspan = rowspan - 1
                newRowIndex = newRowIndex + 1
                if newTable[newRowIndex] is undefined
                  newTable[newRowIndex] = []
                newTable[newRowIndex][newCellIndex] = cell
    return newTable
  
  # Returns a list that represents the line of table with the colspans.
  #
  # @private
  #
  # @param [Array<hatemile.util.html.HTMLDOMElement>] originalRow The list that represents the line of table without the colspans.
  #
  # @return [Array<hatemile.util.html.HTMLDOMElement>] The list that represents the line of table with the colspans.
  #
  _getModelRow: (originalRow) ->
    newRow = []
    length = originalRow.length
    if length > 0
      newRow = newRow.concat(originalRow)
      cellsAdded = 0
      for i in [0..length - 1]
        if originalRow[i].hasAttribute('colspan')
          colspan = parseInt(originalRow[i].getAttribute('colspan'))
          while (colspan > 1)
            colspan = colspan - 1
            cellsAdded = cellsAdded + 1
            newRow.splice(i + cellsAdded, 0, originalRow[i])
    return newRow
  
  # Validate the model that represents the table header.
  #
  # @private
  #
  # @param [Array<Array<hatemile.util.html.HTMLDOMElement>>] header The list that represents the table header.
  #
  # @return [boolean] True if the table header is valid or false if the table header is not valid.
  #
  _validateHeader: (header) ->
    if header.length is 0
      return false
    length = -1
    for row in header
      if row.length is 0
        return false
      else if length is -1
        length = row.length
      else if row.length isnt length
        return false
    return true
  
  # Returns a list with ids of rows of same column.
  #
  # @private
  #
  # @param [Array<Array<hatemile.util.html.HTMLDOMElement>>] header The list that represents the table header.
  # @param [number] index The index of columns.
  #
  # @return [Array<string>] The list with ids of rows of same column.
  #
  _getCellsHeadersIds: (header, index) ->
    ids = []
    for row in header
      cell = row[index]
      if (cell.getTagName() is 'TH') and (cell.getAttribute('scope') is 'col')
        ids.push(cell.getAttribute('id'))
    return ids
  
  # Associate the data cell with header cell of row.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The table body or footer.
  #
  _associateDataCellsWithHeaderCellsOfRow: (element) ->
    table = @_getModelTable(element)
    for row in table
      headersIds = []
      for cell in row
        if cell.getTagName() is 'TH'
          @idGenerator.generateId(cell)
          headersIds.push(cell.getAttribute('id'))
          
          cell.setAttribute('scope', 'row')
      if headersIds.length > 0
        for cell in row
          if cell.getTagName() is 'TD'
            headers = cell.getAttribute('headers')
            for headerId in headersIds
              headers = self.hatemile.util.CommonFunctions
                  .increaseInList(headers, headerId)
            if headers isnt null
              cell.setAttribute('headers', headers)
    return
  
  # Set the scope of header cells of table header.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] tableHeader The table header.
  #
  _prepareHeaderCells: (tableHeader) ->
    cells = @parser.find(tableHeader).findChildren('tr').findChildren('th')
        .listResults()
    for cell in cells
      @idGenerator.generateId(cell)
      if not cell.hasAttribute('scope')
        cell.setAttribute('scope', 'col')
    return
  
  # Initializes a new object that improve the accessibility of associations of
  # parser.
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  # @param [hatemile.util.Configure] configure The configuration of HaTeMiLe.
  #
  constructor: (@parser, configure) ->
    @idGenerator = new hatemile.util.IDGenerator('association')
  
  # Associate all data cells with header cells of table.
  #
  # @param [hatemile.util.html.HTMLDOMElement] table The table.
  #
  # @see hatemile.AccessibleAssociation#associateDataCellsWithHeaderCells
  #
  associateDataCellsWithHeaderCells: (table) ->
    header = @parser.find(table).findChildren('thead').firstResult()
    body = @parser.find(table).findChildren('tbody').firstResult()
    footer = @parser.find(table).findChildren('tfoot').firstResult()
    if header isnt null
      @_prepareHeaderCells(header)
      
      headerRows = @_getModelTable(header)
      if (body isnt null) and (@_validateHeader(headerRows))
        lengthHeader = headerRows[0].length
        fakeTable = @_getModelTable(body)
        if footer isnt null
          fakeTable = fakeTable.concat(@_getModelTable(footer))
        for row in fakeTable
          if row.length is lengthHeader
            i = 0
            for cell in row
              headersIds = @_getCellsHeadersIds(headerRows, i)
              headers = cell.getAttribute('headers')
              for headersId in headersIds
                headers = self.hatemile.util.CommonFunctions
                    .increaseInList(headers, headersId)
              if headers isnt null
                cell.setAttribute('headers', headers)
              i = i + 1
    if body isnt null
      @_associateDataCellsWithHeaderCellsOfRow(body)
    if footer isnt null
      @_associateDataCellsWithHeaderCellsOfRow(footer)
    return
  
  # Associate all data cells with header cells of all tables of page.
  #
  # @see hatemile.AccessibleAssociation#associateAllDataCellsWithHeaderCells
  #
  associateAllDataCellsWithHeaderCells: () ->
    tables = @parser.find('table').listResults()
    for table in tables
      if self.hatemile.util.CommonFunctions.isValidElement(table)
        if @parser.find(table).findDescendants("thead[#{DATA_IGNORE}]," \
          + "tbody[#{DATA_IGNORE}],tfoot[#{DATA_IGNORE}],tr[#{DATA_IGNORE}]," \
          + "th[#{DATA_IGNORE}],td[#{DATA_IGNORE}]").firstResult() is null
            @associateDataCellsWithHeaderCells(table)
    return
  
  # Associate label with field.
  #
  # @param [hatemile.util.html.HTMLDOMElement] label The label.
  #
  # @see hatemile.AccessibleAssociation#associateLabelWithField
  #
  associateLabelWithField: (label) ->
    if label.getTagName() is 'LABEL'
      if label.hasAttribute('for')
        field = @parser.find("##{label.getAttribute('for')}").firstResult()
      else
        field = @parser.find(label).findDescendants('input,select,textarea')
            .firstResult()
        
        if field isnt null
          @idGenerator.generateId(field)
          label.setAttribute('for', field.getAttribute('id'))
      if (field isnt null) and (not field.hasAttribute(DATA_IGNORE))
        if not field.hasAttribute('aria-label')
          field.setAttribute('aria-label', label.getTextContent()
              .replace(new RegExp('[ \n\t\r]+', 'g'), ' '))
        @idGenerator.generateId(label)
        field.setAttribute('aria-labelledby', self.hatemile.util.CommonFunctions
            .increaseInList(field.getAttribute('aria-labelledby'), \
            label.getAttribute('id')))
    return
  
  # Associate all labels of page with fields.
  #
  # @see hatemile.AccessibleAssociation#associateAllLabelsWithFields
  #
  associateAllLabelsWithFields: () ->
    labels = @parser.find('label').listResults()
    for label in labels
      if self.hatemile.util.CommonFunctions.isValidElement(label)
        @associateLabelWithField(label)
    return
