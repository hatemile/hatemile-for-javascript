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
 * The AccessibleEvent interface improve the accessibility, making elements
 * events available from a keyboard.
 * @interface hatemile.AccessibleEvent
 */
exports.hatemile.AccessibleEvent = (function() {
	function AccessibleEvent() {
	}

	/**
	 * Make the drop events of element available from a keyboard.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drop
	 * events.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleDropEvents
	 */
	AccessibleEvent.prototype.makeAccessibleDropEvents = function(element) {
	};

	/**
	 * Make the drag events of element available from a keyboard.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with drag
	 * events.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleDragEvents
	 */
	AccessibleEvent.prototype.makeAccessibleDragEvents = function(element) {
	};

	/**
	 * Make all Drag-and-Drop events of page available from a keyboard.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleAllDragandDropEvents
	 */
	AccessibleEvent.prototype.makeAccessibleAllDragandDropEvents = function() {
	};

	/**
	 * Make the hover events of element available from a keyboard.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with hover
	 * events.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleHoverEvents
	 */
	AccessibleEvent.prototype.makeAccessibleHoverEvents = function(element) {
	};

	/**
	 * Make all hover events of page available from a keyboard.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleAllHoverEvents
	 */
	AccessibleEvent.prototype.makeAccessibleAllHoverEvents = function() {
	};

	/**
	 * Make the click events of element available from a keyboard.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with click
	 * events.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleClickEvent
	 */
	AccessibleEvent.prototype.makeAccessibleClickEvents = function(element) {
	};

	/**
	 * Make all click events of page available from a keyboard.
	 * @public
	 * @function hatemile.AccessibleEvent#makeAccessibleAllClickEvents
	 */
	AccessibleEvent.prototype.makeAccessibleAllClickEvents = function() {
	};

	return AccessibleEvent;

})();