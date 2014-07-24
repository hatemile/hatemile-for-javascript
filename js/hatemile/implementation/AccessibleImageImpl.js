/*
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
*/

var exports, _base;

exports = this;

/**
 * @namespace hatemile
*/


exports.hatemile || (exports.hatemile = {});

/**
 * @namespace implementation
 * @memberof hatemile
*/


(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleImageImpl = (function() {
  /**
  	 * Initializes a new object that manipulate the accessibility of the images of
  	 * parser.
  	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
  	 * @param {hatemile.util.Configure} configure The configuration of HaTeMiLe.
  	 * @class AccessibleImageImpl
  	 * @classdesc The AccessibleImageImpl class is official implementation of
  	 * AccessibleImage interface.
  	 * @extends hatemile.AccessibleImage
  	 * @version 2014-07-23
  	 * @memberof hatemile.implementation
  */

  function AccessibleImageImpl(parser, configure) {
    this.parser = parser;
    this.prefixId = configure.getParameter('prefix-generated-ids');
    this.classListImageAreas = configure.getParameter('class-list-image-areas');
    this.classLongDescriptionLink = configure.getParameter('class-longdescription-link');
    this.prefixLongDescriptionLink = configure.getParameter('prefix-longdescription-link');
    this.suffixLongDescriptionLink = configure.getParameter('suffix-longdescription-link');
    this.dataListForImage = "data-" + (configure.getParameter('data-list-for-image'));
    this.dataLongDescriptionForImage = "data-" + (configure.getParameter('data-longdescription-for-image'));
    this.dataIgnore = "data-" + (configure.getParameter('data-ignore'));
  }

  AccessibleImageImpl.prototype.fixMap = function(map) {
    var anchor, area, areas, id, image, images, item, list, name, newList, _i, _j, _len, _len1;
    if (map.getTagName() === 'MAP') {
      if (map.hasAttribute('name')) {
        name = map.getAttribute('name');
      } else if (map.hasAttribute('id')) {
        name = map.getAttribute('id');
      }
      if (!isEmpty(name)) {
        list = this.parser.createElement('ul');
        areas = this.parser.find(map).findChildren('area[alt]').listResults();
        for (_i = 0, _len = areas.length; _i < _len; _i++) {
          area = areas[_i];
          item = this.parser.createElement('li');
          anchor = this.parser.createElement('a');
          anchor.appendText(area.getAttribute('alt'));
          exports.hatemile.util.CommonFunctions.setListAttributes(area, anchor, ['href', 'tabindex', 'target', 'download', 'hreflang', 'media', 'nohref', 'ping', 'rel', 'type', 'title', 'accesskey', 'name', 'onblur', 'onfocus', 'onmouseout', 'onmouseover', 'onkeydown', 'onkeypress', 'onkeyup', 'onmousedown', 'onclick', 'ondblclick', 'onmouseup']);
          item.appendElement(anchor);
          list.appendElement(item);
        }
        if (list.hasChildren()) {
          list.setAttribute('class', this.classListImageAreas);
          images = this.parser.find("[usemap=#" + name + "]").listResults();
          for (_j = 0, _len1 = images.length; _j < _len1; _j++) {
            image = images[_j];
            exports.hatemile.util.CommonFunctions.generateId(image, this.prefixId);
            id = image.getAttribute('id');
            if (isEmpty(this.parser.find("[" + this.dataListForImage + "=" + id + "]").firstResult())) {
              newList = list.cloneElement();
              newList.setAttribute(this.dataListForImage, id);
              image.insertAfter(newList);
            }
          }
        }
      }
    }
  };

  AccessibleImageImpl.prototype.fixMaps = function() {
    var map, maps, _i, _len;
    maps = this.parser.find('map').listResults();
    for (_i = 0, _len = maps.length; _i < _len; _i++) {
      map = maps[_i];
      if (!map.hasAttribute(this.dataIgnore)) {
        this.fixMap(map);
      }
    }
  };

  AccessibleImageImpl.prototype.fixLongDescription = function(element) {
    var anchor, id, text;
    if (element.hasAttribute('longdesc')) {
      exports.hatemile.util.CommonFunctions.generateId(element, this.prefixId);
      id = element.getAttribute('id');
      if (isEmpty(this.parser.find("[" + this.dataLongDescriptionForImage + "=" + id + "]").firstResult())) {
        if (element.hasAttribute('alt')) {
          text = "" + this.prefixLongDescriptionLink + " " + (element.getAttribute('alt')) + " " + this.suffixLongDescriptionLink;
        } else {
          text = "" + this.prefixLongDescriptionLink + " " + this.suffixLongDescriptionLink;
        }
        anchor = this.parser.createElement('a');
        anchor.setAttribute('href', element.getAttribute('longdesc'));
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute(this.dataLongDescriptionForImage, id);
        anchor.setAttribute('class', this.classLongDescriptionLink);
        anchor.appendText(text);
        element.insertAfter(anchor);
      }
    }
  };

  AccessibleImageImpl.prototype.fixLongDescriptions = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[longdesc]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixLongDescription(element);
      }
    }
  };

  return AccessibleImageImpl;

})();
