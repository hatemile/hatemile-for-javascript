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
 * @class AccessibleEvent
 * @classdesc The AccessibleEvent interface fixes accessibility problems
 * associated with JavaScript events in elements.
 * @memberof hatemile
 */
exports.hatemile.AccessibleEvent = (function() {
	function AccessibleEvent() {
	}

	/**
	 * Provide a solution for the element that has drop events.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drop event.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixDrop = function(element) {
	};

	/**
	 * Provide a solution for the element that has drag events.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drag event.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixDrag = function(element) {
	};

	/**
	 * Provide a solution for elements that has Drag-and-Drop events.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixAllDragsandDrops = function() {
	};

	/**
	 * Provide a solution for the element that has inaccessible hover events.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with hover event.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixHover = function(element) {
	};

	/**
	 * Provide a solution for elements that have inaccessible hover events.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixAllHovers = function() {
	};

	/**
	 * Provide a solution for the element that has inaccessible active events.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with active
	 * event.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixActive = function(element) {
	};

	/**
	 * Provide a solution for elements that have inaccessible active events.
	 * @memberof hatemile.AccessibleEvent
	 */
	AccessibleEvent.prototype.fixAllActives = function() {
	};

	return AccessibleEvent;

})();
