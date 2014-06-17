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
  */

  function AccessibleImageImpl(parser, configuration) {
    this.parser = parser;
    this.prefixId = configuration.getParameter('prefix-generated-ids');
    this.classListImageAreas = configuration.getParameter('class-list-image-areas');
    this.classLongDescriptionLink = configuration.getParameter('class-longdescription-link');
    this.prefixLongDescriptionLink = configure.getParameter('prefix-longdescription-link');
    this.suffixLongDescriptionLink = configuration.getParameter('suffix-longdescription-link');
    this.dataListForImage = configuration.getParameter('data-list-for-image');
    this.dataLongDescriptionForImage = configuration.getParameter('data-longdescription-for-image');
    this.dataIgnore = configuration.getParameter('data-ignore');
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
        list.setAttribute('class', this.classListImageAreas);
        areas = this.parser.find(map).findChildren('area,a').listResults();
        for (_i = 0, _len = areas.length; _i < _len; _i++) {
          area = areas[_i];
          if (area.hasAttribute('alt')) {
            item = this.parser.createElement('li');
            anchor = this.parser.createElement('a');
            anchor.appendText(area.getAttribute('alt'));
            exports.hatemile.util.CommonFunctions.setListAttributes(area, anchor, ['href', 'target', 'download', 'hreflang', 'media', 'rel', 'type', 'title']);
            item.appendElement(anchor);
            list.appendElement(item);
          }
        }
        if (list.hasChildren()) {
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
    var element, elements, _i, _len;
    elements = this.parser.find('map').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixMap(element);
      }
    }
  };

  AccessibleImageImpl.prototype.fixLongDescription = function(image) {
    var anchor, id, longDescription, text;
    if (image.hasAttribute('longdesc')) {
      exports.hatemile.util.CommonFunctions.generateId(image, this.prefixId);
      id = image.getAttribute('id');
      if (isEmpty(this.parser.find("[" + this.dataLongDescriptionForImage + "=" + id + "]").firstResult())) {
        if (image.hasAttribute('alt')) {
          text = "" + this.prefixLongDescriptionLink + " " + (image.getAttribute('alt')) + " " + this.suffixLongDescriptionLink;
        } else {
          text = "" + this.prefixLongDescriptionLink + " " + this.suffixLongDescriptionLink;
        }
        longDescription = image.getAttribute('longdesc');
        anchor = this.parser.createElement('a');
        anchor.setAttribute('href', longDescription);
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute(this.dataLongDescriptionForImage, id);
        anchor.setAttribute('class', this.classLongDescriptionLink);
        anchor.appendText(text);
        image.insertAfter(anchor);
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
