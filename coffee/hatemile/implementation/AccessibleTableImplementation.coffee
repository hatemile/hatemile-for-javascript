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
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

###*
 * @class AccessibleTableImplementation
 * @classdesc The AccessibleTableImplementation class is official implementation
 * of AccessibleTable interface.
 * @extends hatemile.AccessibleTable
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleTableImplementation
	
	_dataIgnore = 'data-ignoreaccessibilityfix'
	
	###*
	 * Initializes a new object that manipulate the accessibility of the tables
	 * of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
	
	###*
	 * Returns a list that represents the table.
	 * @param {hatemile.util.html.HTMLDOMElement} part The table header, table footer
	 * or table body.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @return {Array.<hatemile.util.html.HTMLDOMElement[]>} The list that represents
	 * the table.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	generatePart = (part, parser) ->
		table = []
		rows = parser.find(part).findChildren('tr').listResults()
		for row in rows
			table.push(generateColspan(parser.find(row).findChildren('th,td').listResults()))
		return generateRowspan(table)
	
	###*
	 * Returns a list that represents the table with the rowspans.
	 * @param {Array.<hatemile.util.html.HTMLDOMElement[]>} rows The list that
	 * represents the table without the rowspans.
	 * @return {Array.<hatemile.util.html.HTMLDOMElement[]>} The list that represents
	 * the table with the rowspans.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	generateRowspan = (rows) ->
		copy = []
		table = []
		copy = copy.concat(rows)
		if not isEmpty(copy)
			lengthRows = copy.length
			for i in [0..lengthRows - 1]
				cells = copy[i]
				if isEmpty(table[i])
					table[i] = []
				if not isEmpty(cells)
					columnIndex = 0
					lengthCells = cells.length
					for j in [0..lengthCells - 1]
						cell = cells[j]
						m = j + columnIndex
						row = table[i]
						while not isEmpty(row[m])
							columnIndex = columnIndex + 1
							m = j + columnIndex
						row[m] = cell
						if cell.hasAttribute('rowspan')
							rowspan = parseInt(cell.getAttribute('rowspan'))
							if rowspan > 1
								for l in [1..rowspan-1]
									n = i + l
									if isEmpty(table[n])
										table[n] = []
									table[n][m] = cell
		return table
	
	###*
	 * Returns a list that represents the line of table with the colspans.
	 * @param {hatemile.util.html.HTMLDOMElement[]} cells The list that represents the
	 * line of table without the colspans.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The list that represents the line
	 * of table with the colspans.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	generateColspan = (cells) ->
		copy = []
		copy = copy.concat(cells)
		if not isEmpty(copy)
			length = cells.length
			for i in [0..length - 1]
				if cells[i].hasAttribute('colspan')
					colspan = parseInt(cells[i].getAttribute('colspan'))
					if colspan > 1
						for j in [1..colspan - 1]
							copy.splice(i + j, 0, cells[i])
		return copy
	
	###*
	 * Validate the list that represents the table header.
	 * @param {Array.<hatemile.util.html.HTMLDOMElement[]>} header The list that
	 * represents the table header.
	 * @return {Boolean} True if the table header is valid or false if the table
	 * header is not valid.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	validateHeader = (header) ->
		if isEmpty(header)
			return false
		length = -1
		for row in header
			if isEmpty(row)
				return false
			else if length is -1
				length = row.length
			else if row.length isnt length
				return false
		return true
	
	###*
	 * Returns a list with ids of rows of same column.
	 * @param {Array.<hatemile.util.html.HTMLDOMElement[]>} header The list that
	 * represents the table header.
	 * @param {Number} index The index of columns.
	 * @return {hatemile.util.html.HTMLDOMElement[]} The list with ids of rows of same
	 * column.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	returnListIdsColumns = (header, index) ->
		ids = []
		for row in header
			if row[index].getTagName() is 'TH'
				ids.push(row[index].getAttribute('id'))
		return ids
	
	###*
	 * Fix the table body or table footer.
	 * @param {hatemile.util.html.HTMLDOMElement} element The table body or table
	 * footer.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {String} prefixId The prefix of generated id.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	fixBodyOrFooter = (element, parser, prefixId) ->
		table = generatePart(element, parser)
		for cells in table
			headersIds = []
			for cell in cells
				if cell.getTagName() is 'TH'
					exports.hatemile.util.CommonFunctions.generateId(cell, prefixId)
					headersIds.push(cell.getAttribute('id'))
					
					cell.setAttribute('scope', 'row')
			if not isEmpty(headersIds)
				for cell in cells
					if cell.getTagName() is 'TD'
						headers = cell.getAttribute('headers')
						for headerId in headersIds
							headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headerId)
						cell.setAttribute('headers', headers)
		return
	
	###*
	 * Fix the table header.
	 * @param {hatemile.util.html.HTMLDOMElement} tableHeader The table header.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {String} prefixId The prefix of generated id.
	 * @memberof hatemile.implementation.AccessibleTableImplementation
	###
	fixHeader = (tableHeader, parser, prefixId) ->
		cells = parser.find(tableHeader).findChildren('tr').findChildren('th').listResults()
		for cell in cells
			exports.hatemile.util.CommonFunctions.generateId(cell, prefixId)
			
			cell.setAttribute('scope', 'col')
		return
	
	fixAssociationCellsTable: (table) ->
		header = @parser.find(table).findChildren('thead').firstResult()
		body = @parser.find(table).findChildren('tbody').firstResult()
		footer = @parser.find(table).findChildren('tfoot').firstResult()
		if not isEmpty(header)
			fixHeader(header, @parser, @prefixId)
			
			headerCells = generatePart(header, @parser)
			if not isEmpty(body) and validateHeader(headerCells)
				lengthHeader = headerCells[0].length
				fakeTable = generatePart(body, @parser)
				if not isEmpty(footer)
					fakeTable = fakeTable.concat(generatePart(footer, @parser))
				for cells in fakeTable
					if cells.length is lengthHeader
						i = 0
						for cell in cells
							headersIds = returnListIdsColumns(headerCells, i)
							headers = cell.getAttribute('headers')
							for headersId in headersIds
								headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headersId)
							cell.setAttribute('headers', headers)
							i++
		if not isEmpty(body)
			fixBodyOrFooter(body, @parser, @prefixId)
		if not isEmpty(footer)
			fixBodyOrFooter(footer, @parser, @prefixId)
		return
	
	fixAssociationCellsTables: () ->
		tables = @parser.find('table').listResults()
		for table in tables
			if not table.hasAttribute(_dataIgnore)
				@fixAssociationCellsTable(table)
		return