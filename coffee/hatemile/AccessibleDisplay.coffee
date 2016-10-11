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
 * @class AccessibleDisplay
 * @classdesc The AccessibleDisplay interface show more informations of page.
 * @memberof hatemile
###
class exports.hatemile.AccessibleDisplay

	###*
	 * Display the shortcut of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayShortcut: (element) ->
	
	###*
	 * Display the shortcuts of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllShortcuts: () ->
	
	###*
	 * Display the WAI-ARIA role of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayRole: (element) ->
	
	###*
	 * Display the WAI-ARIA roles of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllRoles: () ->
	
	###*
	 * Display the headers in each data cell of table.
	 * @param {hatemile.util.html.HTMLDOMElement} tableCell The table cell.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayCellHeader: (tableCell) ->
	
	###*
	 * Display the headers in each data cell of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllCellHeaders: () ->
	
	###*
	 * Display the WAI-ARIA attributes of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with
	 * WAI-ARIA attributes.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayWAIARIAStates: (element) ->
	
	###*
	 * Display the WAI-ARIA attributes of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllWAIARIAStates: () ->
	
	###*
	 * Display the attributes of link.
	 * @param {hatemile.util.html.HTMLDOMElement} link The link element.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayLinkAttributes: (link) ->
	
	###*
	 * Display the attributes of links of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllLinksAttributes: () ->
	
	###*
	 * Display the title of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with title.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayTitle: (element) ->
	
	###*
	 * Display the titles of elements of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllTitles: () ->
	
	###*
	 * Display if the element has drag-and-drop event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drag
	 * or drop events.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayDragAndDrop: (element) ->
	
	###*
	 * Display if the elements have drag-and-drop events.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllDragsAndDrops: () ->
	
	###*
	 * Display the language of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayLanguage: (element) ->
	
	###*
	 * Display the language of elements of page.
	 * @memberof hatemile.AccessibleDisplay
	###
	displayAllLanguages: () ->