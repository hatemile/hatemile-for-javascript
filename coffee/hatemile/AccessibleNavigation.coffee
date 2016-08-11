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
 * @class AccessibleNavigation
 * @classdesc The AccessibleNavigation interface fixes accessibility problems
 * associated with navigation.
 * @memberof hatemile
###
class exports.hatemile.AccessibleNavigation
	
	###*
	 * Display the shortcuts of element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element with shortcuts.
	 * @memberof hatemile.AccessibleNavigation
	###
	fixShortcut: (element) ->
	
	###*
	 * Display the shortcuts of elements.
	 * @memberof hatemile.AccessibleNavigation
	###
	fixShortcuts: () ->
	
	###*
	 * Provide content skipper for element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {hatemile.util.configuration.Skipper} skipper The skipper.
	 * @memberof hatemile.AccessibleNavigation
	###
	fixSkipper: (element, skipper) ->
	
	###*
	 * Provide content skippers.
	 * @memberof hatemile.AccessibleNavigation
	###
	fixSkippers: () ->
	
	###*
	 * Provide a navigation by heading.
	 * @param {hatemile.util.html.HTMLDOMElement} element The heading element.
	 * @memberof hatemile.AccessibleNavigation
	###
	fixHeading: (element) ->
	
	###*
	 * Provide a navigation by headings.
	 * @memberof hatemile.AccessibleNavigation
	###
	fixHeadings: () ->