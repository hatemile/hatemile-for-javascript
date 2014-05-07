###
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
###
exports = this
exports.hatemile or= {}
exports.hatemile.implementation or= {}
class exports.hatemile.implementation.AccessibleTableImp
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
		@dataIgnore = configure.getParameter('data-ignore')

	generatePart = (element, parser) ->
		table = []
		rows = parser.find(element).findChildren('tr').listResults()
		for row in rows
			table.push(generateColspan(parser.find(row).findChildren('th,td').listResults()))
		return generateRowspan(table)
		
	generateRowspan = (rows) ->
		copy = []
		table = []
		copy = copy.concat(rows)
		if not isEmpty(copy)
			lengthRows = copy.length
			for i in [0..lengthRows - 1]
				cells = copy[i]
				columnIndex = 0
				lengthCells = cells.length
				if isEmpty(table[i])
					table[i] = []
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

	generateColspan = (cells) ->
		copy = []
		copy = copy.concat(cells)
		length = cells.length
		for i in [0..length - 1]
			if cells[i].hasAttribute('colspan')
				colspan = parseInt(cells[i].getAttribute('colspan'))
				if colspan > 1
					for j in [1..colspan - 1]
						copy.splice(i + j, 0, cells[i])
		return copy

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

	returnListIdsColumns = (header, index) ->
		ids = []
		for cells in header
			if cells[index].getTagName() is 'TH'
				ids.push(cells[index].getAttribute('id'))
		return ids
	
	fixBodyOrFooter = (element, parser, prefixId) ->
		table = generatePart(element, parser)
		for cells in table
			headersIds = []
			for cell in cells
				if cell.getTagName() is 'TH'
					exports.hatemile.util.CommonFunctions.generateId(cell, prefixId)
					cell.setAttribute("scope", "row")
					headersIds.push(cell.getAttribute("id"))
			if not isEmpty(headersIds)
				for cell in cells
					if cell.getTagName() is 'TD'
						headers = ''
						if cell.hasAttribute('headers')
							headers = cell.getAttribute('headers')
						for headerId in headersIds
							headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, headerId)
						cell.setAttribute("headers", headers)
		return

	fixHeader: (element) ->
		if element.getTagName() is 'THEAD'
			cells = @parser.find(element).findChildren('tr').findChildren('th').listResults()
			for cell in cells
				exports.hatemile.util.CommonFunctions.generateId(cell, @prefixId)
				cell.setAttribute('scope', 'col')
		return

	fixFooter: (element) ->
		if element.getTagName() is 'TFOOT'
			fixBodyOrFooter(element, @parser, @prefixId)
		return

	fixBody: (element) ->
		if element.getTagName() is 'TBODY'
			fixBodyOrFooter(element, @parser, @prefixId)
		return

	fixTable: (element) ->
		header = @parser.find(element).findChildren('thead').firstResult()
		body = @parser.find(element).findChildren('tbody').firstResult()
		footer = @parser.find(element).findChildren('tfoot').firstResult()
		if not isEmpty(header)
			@fixHeader(header)
			headerCells = generatePart(header, @parser)
			if validateHeader(headerCells) and not isEmpty(body)
				lengthHeader = headerCells[0].length
				table = generatePart(body, @parser)
				if not isEmpty(footer)
					table = table.concat(generatePart(footer, @parser))
				for cells in table
					i = 0
					if cells.length is lengthHeader
						for cell in cells
							ids = returnListIdsColumns(headerCells, i)
							headers = ''
							if cell.hasAttribute('headers')
								headers = cell.getAttribute('headers')
							for id in ids
								headers = exports.hatemile.util.CommonFunctions.increaseInList(headers, id)
							cell.setAttribute('headers', headers)
							i++
		if not isEmpty(body)
			@fixBody(body)
		if not isEmpty(footer)
			@fixFooter(footer)
		return

	fixTables: () ->
		elements = @parser.find('table').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixTable(element)
		return