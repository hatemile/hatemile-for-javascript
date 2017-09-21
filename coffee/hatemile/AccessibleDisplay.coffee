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
__exports = this

###*
 * @namespace hatemile
###
__exports.hatemile or= {}

###*
 * The AccessibleDisplay interface improve accessibility, showing informations.
 * @interface hatemile.AccessibleDisplay
###
class __exports.hatemile.AccessibleDisplay

	###*
	 * Display the shortcut of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayShortcut
	###
	displayShortcut: (element) ->
	
	###*
	 * Display all shortcuts of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllShortcuts
	###
	displayAllShortcuts: () ->
	
	###*
	 * Display the WAI-ARIA role of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayRole
	###
	displayRole: (element) ->
	
	###*
	 * Display the WAI-ARIA roles of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllRoles
	###
	displayAllRoles: () ->
	
	###*
	 * Display the headers of each data cell of table.
	 * @param {hatemile.util.html.HTMLDOMElement} tableCell The table cell.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayCellHeader
	###
	displayCellHeader: (tableCell) ->
	
	###*
	 * Display the headers of each data cell of all tables of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllCellHeaders
	###
	displayAllCellHeaders: () ->
	
	###*
	 * Display the WAI-ARIA attributes of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with
	 * WAI-ARIA attributes.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayWAIARIAStates
	###
	displayWAIARIAStates: (element) ->
	
	###*
	 * Display the WAI-ARIA attributes of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllWAIARIAStates
	###
	displayAllWAIARIAStates: () ->
	
	###*
	 * Display the attributes of link.
	 * @param {hatemile.util.html.HTMLDOMElement} link The link element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayLinkAttributes
	###
	displayLinkAttributes: (link) ->
	
	###*
	 * Display the attributes of all links of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllLinksAttributes
	###
	displayAllLinksAttributes: () ->
	
	###*
	 * Display the title of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with title.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayTitle
	###
	displayTitle: (element) ->
	
	###*
	 * Display the titles of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllTitles
	###
	displayAllTitles: () ->
	
	###*
	 * Display that the element has drag-and-drop event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drag
	 * or drop events.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayDragAndDrop
	###
	displayDragAndDrop: (element) ->
	
	###*
	 * Display that an elements of page have drag-and-drop events.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllDragsAndDrops
	###
	displayAllDragsAndDrops: () ->
	
	###*
	 * Display the language of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayLanguage
	###
	displayLanguage: (element) ->
	
	###*
	 * Display the language of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllLanguages
	###
	displayAllLanguages: () ->
	
	###*
	 * Display the alternative text of image.
	 * @param {hatemile.util.html.HTMLDOMElement} image The image.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAlternativeTextImage
	###
	displayAlternativeTextImage: (image) ->
	
	###*
	 * Display the alternative text of all images of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllAlternativeTextImages
	###
	displayAllAlternativeTextImages: () ->