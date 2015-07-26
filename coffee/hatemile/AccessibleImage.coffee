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
 * @class AccessibleImage
 * @classdesc The AccessibleImage interface fixes accessibility problems
 * associated with images.
 * @memberof hatemile
###
class exports.hatemile.AccessibleImage
	
	###*
	 * Provide an alternative way to access the long description of element.
	 * @param {hatemile.util.HTMLDOMElement} element The element with long
	 * description.
	 * @memberof hatemile.AccessibleImage
	###
	fixLongDescription: (element) ->
	
	###*
	 * Provide an alternative way to access the longs descriptions of elements.
	 * @memberof hatemile.AccessibleImage
	###
	fixLongDescriptions: () ->