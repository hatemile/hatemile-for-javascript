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
exports.hatemile or= {}
exports.hatemile.implementation or= {}
class exports.hatemile.implementation.AccessibleImageImp
	constructor: (@parser, configuration) ->
		@prefixId = configuration.getParameter('prefix-generated-ids')
		@classListImageAreas = configuration.getParameter('class-list-image-areas')
		@classLongDescriptionLink = configuration.getParameter('class-longdescription-link')
		@sufixLongDescriptionLink = configuration.getParameter('sufix-longdescription-link')
		@dataListForImage = configuration.getParameter('data-list-for-image')
		@dataLongDescriptionForImage = configuration.getParameter('data-longdescription-for-image')
		@dataIgnore = configuration.getParameter('data-ignore')

	fixMap: (element) ->
		if element.getTagName() is 'MAP'
			if element.hasAttribute('name')
				name = element.getAttribute('name')
			else if element.hasAttribute('id')
				name = element.getAttribute('id')
			if not isEmpty(name)
				list = @parser.createElement('ul')
				list.setAttribute('class', @classListImageAreas)
				areas = @parser.find(element).findChildren('area, a').listResults()
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
						if isEmpty(@parser.find("[#{@dataListForImage}=#{image.getAttribute('id')}]").firstResult())
							newList = list.cloneElement()
							newList.setAttribute(@dataListForImage, image.getAttribute('id'))
							image.insertAfter(newList)
		return

	fixMaps: () ->
		elements = @parser.find('map').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				@fixMap(element)
		return
		
	fixLongDescription: (element) ->
		if element.hasAttribute('longdesc')
			exports.hatemile.util.CommonFunctions.generateId(element, @prefixId)
			if isEmpty(@parser.find("[#{@dataLongDescriptionForImage}=#{element.getAttribute('id')}]").firstResult())
				if element.hasAttribute('alt')
					text = "#{element.getAttribute('alt')} #{@sufixLongDescriptionLink}"
				else
					text = @sufixLongDescriptionLink
				longDescription = element.getAttribute('longdesc')
				anchor = @parser.createElement('a')
				anchor.setAttribute('href', longDescription)
				anchor.setAttribute('target', '_blank')
				anchor.setAttribute(@dataLongDescriptionForImage, element.getAttribute('id'))
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
