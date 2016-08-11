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
 * @class AccessibleTable
 * @classdesc The AccessibleTable interface fixes accessibility problems
 * associated with tables.
 * @memberof hatemile
###
class exports.hatemile.AccessibleTable
	
	###*
	 * Associate data cells with header cells of table.
	 * @param {hatemile.util.html.HTMLDOMElement} table The table.
	 * @memberof hatemile.AccessibleTable
	###
	fixAssociationCellsTable: (table) ->
	
	###*
	 * Associate data cells with header cells of tables.
	 * @memberof hatemile.AccessibleTable
	###
	fixAssociationCellsTables: () ->