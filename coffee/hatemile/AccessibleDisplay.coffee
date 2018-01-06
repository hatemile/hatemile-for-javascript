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
'use strict'

# @namespace hatemile
#
@hatemile or= {}

# The AccessibleDisplay interface improve accessibility, showing informations.
#
# @abstract
#
class @hatemile.AccessibleDisplay

  # Display the shortcut of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  displayShortcut: (element) ->
  
  # Display all shortcuts of page.
  #
  displayAllShortcuts: () ->
  
  # Display the WAI-ARIA role of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  displayRole: (element) ->
  
  # Display the WAI-ARIA roles of all elements of page.
  #
  displayAllRoles: () ->
  
  # Display the headers of each data cell of table.
  #
  # @param [hatemile.util.html.HTMLDOMElement] tableCell The table cell.
  #
  displayCellHeader: (tableCell) ->
  
  # Display the headers of each data cell of all tables of page.
  #
  displayAllCellHeaders: () ->
  
  # Display the WAI-ARIA attributes of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with WAI-ARIA attributes.
  #
  displayWAIARIAStates: (element) ->
  
  # Display the WAI-ARIA attributes of all elements of page.
  #
  displayAllWAIARIAStates: () ->
  
  # Display the attributes of link.
  #
  # @param [hatemile.util.html.HTMLDOMElement] link The link element.
  #
  displayLinkAttributes: (link) ->
  
  # Display the attributes of all links of page.
  #
  displayAllLinksAttributes: () ->
  
  # Display the title of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with title.
  #
  displayTitle: (element) ->
  
  # Display the titles of all elements of page.
  #
  displayAllTitles: () ->
  
  # Display that the element has drag-and-drop event.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with drag or drop events.
  #
  displayDragAndDrop: (element) ->
  
  # Display that an elements of page have drag-and-drop events.
  #
  displayAllDragsAndDrops: () ->
  
  # Display the language of element.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  displayLanguage: (element) ->
  
  # Display the language of all elements of page.
  #
  displayAllLanguages: () ->
  
  # Display the alternative text of image.
  #
  # @param [hatemile.util.html.HTMLDOMElement] image The image.
  #
  displayAlternativeTextImage: (image) ->
  
  # Display the alternative text of all images of page.
  #
  displayAllAlternativeTextImages: () ->
