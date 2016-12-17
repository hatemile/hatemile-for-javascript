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

var exports;

exports = this;

/**
 * @namespace hatemile
 */
exports.hatemile || (exports.hatemile = {});

/**
 * The AccessibleDisplay interface improve accessibility, showing informations.
 * @interface hatemile.AccessibleDisplay
 */
exports.hatemile.AccessibleDisplay = (function() {
	function AccessibleDisplay() {
	}

	/**
	 * Display the shortcut of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayShortcut
	 */
	AccessibleDisplay.prototype.displayShortcut = function(element) {
	};

	/**
	 * Display all shortcuts of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllShortcuts
	 */
	AccessibleDisplay.prototype.displayAllShortcuts = function() {
	};

	/**
	 * Display the WAI-ARIA role of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayRole
	 */
	AccessibleDisplay.prototype.displayRole = function(element) {
	};

	/**
	 * Display the WAI-ARIA roles of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllRoles
	 */
	AccessibleDisplay.prototype.displayAllRoles = function() {
	};

	/**
	 * Display the headers of each data cell of table.
	 * @param {hatemile.util.html.HTMLDOMElement} tableCell The table cell.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayCellHeader
	 */
	AccessibleDisplay.prototype.displayCellHeader = function(tableCell) {
	};

	/**
	 * Display the headers of each data cell of all tables of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllCellHeaders
	 */
	AccessibleDisplay.prototype.displayAllCellHeaders = function() {
	};

	/**
	 * Display the WAI-ARIA attributes of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with
	 * WAI-ARIA attributes.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayWAIARIAStates
	 */
	AccessibleDisplay.prototype.displayWAIARIAStates = function(element) {
	};

	/**
	 * Display the WAI-ARIA attributes of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllWAIARIAStates
	 */
	AccessibleDisplay.prototype.displayAllWAIARIAStates = function() {
	};

	/**
	 * Display the attributes of link.
	 * @param {hatemile.util.html.HTMLDOMElement} link The link element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayLinkAttributes
	 */
	AccessibleDisplay.prototype.displayLinkAttributes = function(link) {
	};

	/**
	 * Display the attributes of all links of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllLinksAttributes
	 */
	AccessibleDisplay.prototype.displayAllLinksAttributes = function() {
	};

	/**
	 * Display the title of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with title.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayTitle
	 */
	AccessibleDisplay.prototype.displayTitle = function(element) {
	};

	/**
	 * Display the titles of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllTitles
	 */
	AccessibleDisplay.prototype.displayAllTitles = function() {
	};

	/**
	 * Display that the element has drag-and-drop event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drag
	 * or drop events.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayDragAndDrop
	 */
	AccessibleDisplay.prototype.displayDragAndDrop = function(element) {
	};

	/**
	 * Display that an elements of page have drag-and-drop events.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllDragsAndDrops
	 */
	AccessibleDisplay.prototype.displayAllDragsAndDrops = function() {
	};

	/**
	 * Display the language of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayLanguage
	 */
	AccessibleDisplay.prototype.displayLanguage = function(element) {
	};

	/**
	 * Display the language of all elements of page.
	 * @public
	 * @function hatemile.AccessibleDisplay#displayAllLanguages
	 */
	AccessibleDisplay.prototype.displayAllLanguages = function() {
	};

	return AccessibleDisplay;

})();