###
Copyright 2014 Carlson Santana Cruz

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
 * @classdesc The AccessibleImage interface fix the problems of accessibility
 * associated with the images.
 * @version 1.0
 * @memberof hatemile
###
class exports.hatemile.AccessibleImage
	
	###*
	 * Fix the map of images.
	 * @param {hatemile.util.HTMLDOMElement} map The map of images.
	 * @see {@link http://www.w3.org/TR/WAI-WEBCONTENT-TECHS/#tech-redundant-client-links|WCAG 1.0 Checkpoint 1.5}
	 * @memberof hatemile.AccessibleImage
	###
	fixMap: (map) ->
	
	###*
	 * Fix the maps of images.
	 * @see {@link http://www.w3.org/TR/WAI-WEBCONTENT-TECHS/#tech-redundant-client-links|WCAG 1.0 Checkpoint 1.5}
	 * @memberof hatemile.AccessibleImage
	###
	fixMaps: () ->
	
	###*
	 * Fix the long description of the image.
	 * @param {hatemile.util.HTMLDOMElement} image The image with long description.
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/G73.html|G73: Providing a long description in another location with a link to it that is immediately adjacent to the non-text content}
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/G74.html|G74: Providing a long description in text near the non-text content, with a reference to the location of the long description in the short description}
	 * @memberof hatemile.AccessibleImage
	###
	fixLongDescription: (image) ->
	
	###*
	 * Fix the longs descriptions of the images.
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/G73.html|G73: Providing a long description in another location with a link to it that is immediately adjacent to the non-text content}
	 * @see {@link http://www.w3.org/TR/WCAG20-TECHS/G74.html|G74: Providing a long description in text near the non-text content, with a reference to the location of the long description in the short description}
	 * @memberof hatemile.AccessibleImage
	###
	fixLongDescriptions: () ->