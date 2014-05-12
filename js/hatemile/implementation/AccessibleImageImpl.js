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

exports.hatemile || (exports.hatemile = {});

(_base = exports.hatemile).implementation || (_base.implementation = {});

exports.hatemile.implementation.AccessibleImageImp = (function() {
  function AccessibleImageImp(parser, configuration) {
    this.parser = parser;
    this.prefixId = configuration.getParameter('prefix-generated-ids');
    this.classListImageAreas = configuration.getParameter('class-list-image-areas');
    this.classLongDescriptionLink = configuration.getParameter('class-longdescription-link');
    this.sufixLongDescriptionLink = configuration.getParameter('sufix-longdescription-link');
    this.dataListForImage = configuration.getParameter('data-list-for-image');
    this.dataLongDescriptionForImage = configuration.getParameter('data-longdescription-for-image');
    this.dataIgnore = configuration.getParameter('data-ignore');
  }

  AccessibleImageImp.prototype.fixMap = function(element) {
    var anchor, area, areas, image, images, item, list, name, newList, _i, _j, _len, _len1;
    if (element.getTagName() === 'MAP') {
      if (element.hasAttribute('name')) {
        name = element.getAttribute('name');
      } else if (element.hasAttribute('id')) {
        name = element.getAttribute('id');
      }
      if (!isEmpty(name)) {
        list = this.parser.createElement('ul');
        list.setAttribute('class', this.classListImageAreas);
        areas = this.parser.find(element).findChildren('area, a').listResults();
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
            if (isEmpty(this.parser.find("[" + this.dataListForImage + "=" + (image.getAttribute('id')) + "]").firstResult())) {
              newList = list.cloneElement();
              newList.setAttribute(this.dataListForImage, image.getAttribute('id'));
              image.insertAfter(newList);
            }
          }
        }
      }
    }
  };

  AccessibleImageImp.prototype.fixMaps = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('map').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixMap(element);
      }
    }
  };

  AccessibleImageImp.prototype.fixLongDescription = function(element) {
    var anchor, longDescription, text;
    if (element.hasAttribute('longdesc')) {
      exports.hatemile.util.CommonFunctions.generateId(element, this.prefixId);
      if (isEmpty(this.parser.find("[" + this.dataLongDescriptionForImage + "=" + (element.getAttribute('id')) + "]").firstResult())) {
        if (element.hasAttribute('alt')) {
          text = "" + (element.getAttribute('alt')) + " " + this.sufixLongDescriptionLink;
        } else {
          text = this.sufixLongDescriptionLink;
        }
        longDescription = element.getAttribute('longdesc');
        anchor = this.parser.createElement('a');
        anchor.setAttribute('href', longDescription);
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute(this.dataLongDescriptionForImage, element.getAttribute('id'));
        anchor.setAttribute('class', this.classLongDescriptionLink);
        anchor.appendText(text);
        element.insertAfter(anchor);
      }
    }
  };

  AccessibleImageImp.prototype.fixLongDescriptions = function() {
    var element, elements, _i, _len;
    elements = this.parser.find('[longdesc]').listResults();
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      if (!element.hasAttribute(this.dataIgnore)) {
        this.fixLongDescription(element);
      }
    }
  };

  return AccessibleImageImp;

})();
