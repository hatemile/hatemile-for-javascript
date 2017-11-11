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
self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.implementation
#
@hatemile.implementation or= {}

# The AccessibleAssociationImplementation class is official implementation of
# AccessibleAssociation.
#
# @extend hatemile.AccessibleAssociation
#
class @hatemile.implementation.AccessibleAssociationImplementation
  
  DATA_IGNORE = 'data-ignoreaccessibilityfix'
  
  # Returns a list that represents the table.
  #
  # @param [hatemile.util.html.HTMLDOMElement] part The table header, table
  # footer or table body.
  #
  # @return [Array<Array<hatemile.util.html.HTMLDOMElement>>] The list that
  # represents the table.
  #
  getModelTable: (part) ->
    table = []
    rows = @parser.find(part).findChildren('tr').listResults()
    for row in rows
      table.push(@getModelRow(@parser.find(row).findChildren('th,td')
          .listResults()))
    return @getValidModelTable(table)
  
  # Returns a list that represents the table with the rowspans.
  #
  # @param [Array<Array<hatemile.util.html.HTMLDOMElement>>] originalTable The
  # list that represents the table without the rowspans.
  #
  # @return [Array<Array<hatemile.util.html.HTMLDOMElement>>] The list that
  # represents the table with the rowspans.
  #
  getValidModelTable: (originalTable) ->
    newTable = []
    if not self.isEmpty(originalTable)
      lengthTable = originalTable.length
      for rowIndex in [0..lengthTable - 1]
        originalRow = originalTable[rowIndex]
        if self.isEmpty(newTable[rowIndex])
          newTable[rowIndex] = []
        if not self.isEmpty(originalRow)
          cellsAdded = 0
          lengthRow = originalRow.length
          for cellIndex in [0..lengthRow - 1]
            cell = originalRow[cellIndex]
            newCellIndex = cellIndex + cellsAdded
            newRow = newTable[rowIndex]
            while not self.isEmpty(newRow[newCellIndex])
              cellsAdded = cellsAdded + 1
              newCellIndex = cellIndex + cellsAdded
            newRow[newCellIndex] = cell
            if cell.hasAttribute('rowspan')
              rowspan = parseInt(cell.getAttribute('rowspan'))
              newRowIndex = rowIndex
              while (rowspan > 1)
                rowspan = rowspan - 1
                newRowIndex = newRowIndex + 1
                if self.isEmpty(newTable[newRowIndex])
                  newTable[newRowIndex] = []
                newTable[newRowIndex][newCellIndex] = cell
    return newTable
  
  # Returns a list that represents the line of table with the colspans.
  #
  # @param [Array<hatemile.util.html.HTMLDOMElement>] originalRow The list that
  # represents the line of table without the colspans.
  #
  # @return [Array<hatemile.util.html.HTMLDOMElement>] The list that represents
  # the line of table with the colspans.
  #
  getModelRow: (originalRow) ->
    newRow = []
    if not self.isEmpty(originalRow)
      newRow = newRow.concat(originalRow)
      length = originalRow.length
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
  # @param [Array<Array<hatemile.util.html.HTMLDOMElement>>] header The list
  # that represents the table header.
  #
  # @return [boolean] True if the table header is valid or false if the table
  # header is not valid.
  #
  validateHeader: (header) ->
    if self.isEmpty(header)
      return false
    length = -1
    for row in header
      if self.isEmpty(row)
        return false
      else if length is -1
        length = row.length
      else if row.length isnt length
        return false
    return true
  
  # Returns a list with ids of rows of same column.
  #
  # @param [Array<Array<hatemile.util.html.HTMLDOMElement>>] header The list
  # that represents the table header.
  # @param [number] index The index of columns.
  #
  # @return [Array<string>] The list with ids of rows of same column.
  #
  getCellsHeadersIds: (header, index) ->
    ids = []
    for row in header
      cell = row[index]
      if (cell.getTagName() is 'TH') and (cell.getAttribute('scope') is 'col')
        ids.push(cell.getAttribute('id'))
    return ids
  
  # Associate the data cell with header cell of row.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The table body or footer.
  #
  associateDataCellsWithHeaderCellsOfRow: (element) ->
    table = @getModelTable(element)
    for row in table
      headersIds = []
      for cell in row
        if cell.getTagName() is 'TH'
          self.hatemile.util.CommonFunctions.generateId(cell, @prefixId)
          headersIds.push(cell.getAttribute('id'))
          
          cell.setAttribute('scope', 'row')
      if not self.isEmpty(headersIds)
        for cell in row
          if cell.getTagName() is 'TD'
            headers = cell.getAttribute('headers')
            for headerId in headersIds
              headers = self.hatemile.util.CommonFunctions
                  .increaseInList(headers, headerId)
            cell.setAttribute('headers', headers)
    return
  
  # Set the scope of header cells of table header.
  #
  # @param [hatemile.util.html.HTMLDOMElement] tableHeader The table header.
  #
  prepareHeaderCells: (tableHeader) ->
    cells = @parser.find(tableHeader).findChildren('tr').findChildren('th')
        .listResults()
    for cell in cells
      self.hatemile.util.CommonFunctions.generateId(cell, @prefixId)
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
    @prefixId = configure.getParameter('prefix-generated-ids')
  
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
    if not self.isEmpty(header)
      @prepareHeaderCells(header)
      
      headerRows = @getModelTable(header)
      if (not self.isEmpty(body)) and (@validateHeader(headerRows))
        lengthHeader = headerRows[0].length
        fakeTable = @getModelTable(body)
        if not self.isEmpty(footer)
          fakeTable = fakeTable.concat(@getModelTable(footer))
        for row in fakeTable
          if row.length is lengthHeader
            i = 0
            for cell in row
              headersIds = @getCellsHeadersIds(headerRows, i)
              headers = cell.getAttribute('headers')
              for headersId in headersIds
                headers = self.hatemile.util.CommonFunctions
                    .increaseInList(headers, headersId)
              cell.setAttribute('headers', headers)
              i = i + 1
    if not self.isEmpty(body)
      @associateDataCellsWithHeaderCellsOfRow(body)
    if not self.isEmpty(footer)
      @associateDataCellsWithHeaderCellsOfRow(footer)
    return
  
  # Associate all data cells with header cells of all tables of page.
  #
  # @see hatemile.AccessibleAssociation#associateAllDataCellsWithHeaderCells
  #
  associateAllDataCellsWithHeaderCells: () ->
    tables = @parser.find('table').listResults()
    for table in tables
      if self.hatemile.util.CommonFunctions.isValidElement(table)
        if self.isEmpty(@parser.find(table).findDescendants( \
          "thead[#{DATA_IGNORE}],tbody[#{DATA_IGNORE}]," \
          + "tfoot[#{DATA_IGNORE}],tr[#{DATA_IGNORE}],th[#{DATA_IGNORE}]," \
          + "td[#{DATA_IGNORE}]").firstResult())
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
        
        if not self.isEmpty(field)
          self.hatemile.util.CommonFunctions.generateId(field, @prefixId)
          label.setAttribute('for', field.getAttribute('id'))
      if (not self.isEmpty(field)) and (not field.hasAttribute(DATA_IGNORE))
        if not field.hasAttribute('aria-label')
          field.setAttribute('aria-label', label.getTextContent()
              .replace(new RegExp('[ \n\t\r]+', 'g'), ' '))
        self.hatemile.util.CommonFunctions.generateId(label, @prefixId)
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
