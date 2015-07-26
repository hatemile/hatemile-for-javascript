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
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

###*
 * @class AccessibleImageImplementation
 * @classdesc The AccessibleImageImplementation class is official implementation
 * of AccessibleImage interface.
 * @extends hatemile.AccessibleImage
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleImageImplementation
	
	###*
	 * Initializes a new object that manipulate the accessibility of the images of
	 * parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleImageImplementation
	###
	constructor: (@parser, configure) ->
		@prefixId = configure.getParameter('prefix-generated-ids')
		@classLongDescriptionLink = 'longdescription-link'
		@prefixLongDescriptionLink = configure.getParameter('prefix-longdescription')
		@suffixLongDescriptionLink = configure.getParameter('suffix-longdescription')
		@dataLongDescriptionForImage = 'data-longdescriptionfor'
		@dataIgnore = 'data-ignoreaccessibilityfix'
	
	fixLongDescription: (element) ->
		if element.hasAttribute('longdesc')
			exports.hatemile.util.CommonFunctions.generateId(element, @prefixId)
			id = element.getAttribute('id')
			if isEmpty(@parser.find("[#{@dataLongDescriptionForImage}=\"#{id}\"]").firstResult())
				if element.hasAttribute('alt')
					text = "#{@prefixLongDescriptionLink} #{element.getAttribute('alt')} #{@suffixLongDescriptionLink}"
				else
					text = "#{@prefixLongDescriptionLink} #{@suffixLongDescriptionLink}"
				anchor = @parser.createElement('a')
				anchor.setAttribute('href', element.getAttribute('longdesc'))
				anchor.setAttribute('target', '_blank')
				anchor.setAttribute(@dataLongDescriptionForImage, id)
				anchor.setAttribute('class', @classLongDescriptionLink)
				anchor.appendText(text)
				element.insertAfter(anchor)
		return
	
	fixLongDescriptions: () ->
		elements = @parser.find('[longdesc]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixLongDescription(element)
		return