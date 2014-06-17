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
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

class exports.hatemile.implementation.AccessibleImageImpl
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * images of parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
	 * @class AccessibleImageImpl
	 * @classdesc The AccessibleImageImpl class is official implementation of
	 * AccessibleImage interface.
	 * @extends hatemile.AccessibleImage
	 * @version 1.0
	 * @memberof hatemile.implementation
	###
	constructor: (@parser, configuration) ->
		@prefixId = configuration.getParameter('prefix-generated-ids')
		@classListImageAreas = configuration.getParameter('class-list-image-areas')
		@classLongDescriptionLink = configuration.getParameter('class-longdescription-link')
		@prefixLongDescriptionLink = configure.getParameter('prefix-longdescription-link')
		@suffixLongDescriptionLink = configuration.getParameter('suffix-longdescription-link')
		@dataListForImage = configuration.getParameter('data-list-for-image')
		@dataLongDescriptionForImage = configuration.getParameter('data-longdescription-for-image')
		@dataIgnore = configuration.getParameter('data-ignore')

	fixMap: (map) ->
		if map.getTagName() is 'MAP'
			if map.hasAttribute('name')
				name = map.getAttribute('name')
			else if map.hasAttribute('id')
				name = map.getAttribute('id')
			if not isEmpty(name)
				list = @parser.createElement('ul')
				list.setAttribute('class', @classListImageAreas)
				areas = @parser.find(map).findChildren('area,a').listResults()
				for area in areas
					if area.hasAttribute('alt')
						item = @parser.createElement('li')
						anchor = @parser.createElement('a')
						anchor.appendText(area.getAttribute('alt'))
						exports.hatemile.util.CommonFunctions.setListAttributes(area, anchor, ['href',
								'target', 'download', 'hreflang', 'media',
								'rel', 'type', 'title'])
						item.appendElement(anchor)
						list.appendElement(item)
				if list.hasChildren()
					images = @parser.find("[usemap=##{name}]").listResults()
					for image in images
						exports.hatemile.util.CommonFunctions.generateId(image, @prefixId)
						id = image.getAttribute('id')
						if isEmpty(@parser.find("[#{@dataListForImage}=#{id}]").firstResult())
							newList = list.cloneElement()
							newList.setAttribute(@dataListForImage, id)
							image.insertAfter(newList)
		return

	fixMaps: () ->
		elements = @parser.find('map').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixMap(element)
		return
		
	fixLongDescription: (image) ->
		if image.hasAttribute('longdesc')
			exports.hatemile.util.CommonFunctions.generateId(image, @prefixId)
			id = image.getAttribute('id')
			if isEmpty(@parser.find("[#{@dataLongDescriptionForImage}=#{id}]").firstResult())
				if image.hasAttribute('alt')
					text = "#{@prefixLongDescriptionLink} #{image.getAttribute('alt')} #{@suffixLongDescriptionLink}"
				else
					text = "#{@prefixLongDescriptionLink} #{@suffixLongDescriptionLink}"
				longDescription = image.getAttribute('longdesc')
				anchor = @parser.createElement('a')
				anchor.setAttribute('href', longDescription)
				anchor.setAttribute('target', '_blank')
				anchor.setAttribute(@dataLongDescriptionForImage, id)
				anchor.setAttribute('class', @classLongDescriptionLink)
				anchor.appendText(text)
				image.insertAfter(anchor)
		return

	fixLongDescriptions: () ->
		elements = @parser.find('[longdesc]').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixLongDescription(element)
		return
