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
 * @class AccessibleDisplay
 * @classdesc The AccessibleDisplay interface show more informations of page.
 * @memberof hatemile
 */
exports.hatemile.AccessibleDisplay = (function() {
	function AccessibleDisplay() {
	}

	/**
	 * Display the shortcut of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayShortcut = function(element) {
	};

	/**
	 * Display the shortcuts of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllShortcuts = function() {
	};

	/**
	 * Display the WAI-ARIA role of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayRole = function(element) {
	};

	/**
	 * Display the WAI-ARIA roles of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllRoles = function() {
	};

	/**
	 * Display the headers in each data cell of table.
	 * @param {hatemile.util.html.HTMLDOMElement} tableCell The table cell.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayCellHeader = function(tableCell) {
	};

	/**
	 * Display the headers in each data cell of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllCellHeaders = function() {
	};

	/**
	 * Display the WAI-ARIA attributes of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with
	 * WAI-ARIA attributes.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayWAIARIAStates = function(element) {
	};

	/**
	 * Display the WAI-ARIA attributes of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllWAIARIAStates = function() {
	};

	/**
	 * Display the attributes of link.
	 * @param {hatemile.util.html.HTMLDOMElement} link The link element.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayLinkAttributes = function(link) {
	};

	/**
	 * Display the attributes of links of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllLinksAttributes = function() {
	};

	/**
	 * Display the title of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with title.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayTitle = function(element) {
	};

	/**
	 * Display the titles of elements of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllTitles = function() {
	};

	/**
	 * Display if the element has drag-and-drop event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drag
	 * or drop events.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayDragAndDrop = function(element) {
	};

	/**
	 * Display if the elements have drag-and-drop events.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllDragsAndDrops = function() {
	};

	/**
	 * Display the language of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayLanguage = function(element) {
	};

	/**
	 * Display the language of elements of page.
	 * @memberof hatemile.AccessibleDisplay
	 */
	AccessibleDisplay.prototype.displayAllLanguages = function() {
	};

	return AccessibleDisplay;

})();
