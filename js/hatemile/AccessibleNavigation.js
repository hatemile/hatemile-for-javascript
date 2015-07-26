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
 * @class AccessibleNavigation
 * @classdesc The AccessibleNavigation interface fixes accessibility problems
 * associated with navigation.
 * @memberof hatemile
*/


exports.hatemile.AccessibleNavigation = (function() {
  function AccessibleNavigation() {}

  /**
  	 * Display the shortcuts of element.
  	 * @param {hatemile.util.HTMLDOMElement} element The element with shortcuts.
  	 * @memberof hatemile.AccessibleNavigation
  */


  AccessibleNavigation.prototype.fixShortcut = function(element) {};

  /**
  	 * Display the shortcuts of elements.
  	 * @memberof hatemile.AccessibleNavigation
  */


  AccessibleNavigation.prototype.fixShortcuts = function() {};

  /**
  	 * Provide content skipper for element.
  	 * @param {hatemile.util.HTMLDOMElement} element The element.
  	 * @param {hatemile.util.Skipper} skipper The skipper.
  	 * @memberof hatemile.AccessibleNavigation
  */


  AccessibleNavigation.prototype.fixSkipper = function(element, skipper) {};

  /**
  	 * Provide content skippers.
  	 * @memberof hatemile.AccessibleNavigation
  */


  AccessibleNavigation.prototype.fixSkippers = function() {};

  /**
  	 * Provide a navigation by heading.
  	 * @param {hatemile.util.HTMLDOMElement} element The heading element.
  	 * @memberof hatemile.AccessibleNavigation
  */


  AccessibleNavigation.prototype.fixHeading = function(element) {};

  /**
  	 * Provide a navigation by headings.
  	 * @memberof hatemile.AccessibleNavigation
  */


  AccessibleNavigation.prototype.fixHeadings = function() {};

  return AccessibleNavigation;

})();
