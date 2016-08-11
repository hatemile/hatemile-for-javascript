/*
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

/**
 * @class AccessibleImageImplementation
 * @classdesc The AccessibleImageImplementation class is official implementation
 * of AccessibleImage interface.
 * @extends hatemile.AccessibleImage
 * @memberof hatemile.implementation
 */
exports.hatemile.implementation.AccessibleImageImplementation = (function() {
	var _classLongDescriptionLink, _dataIgnore, _dataLongDescriptionForImage;

	_classLongDescriptionLink = 'longdescription-link';

	_dataLongDescriptionForImage = 'data-longdescriptionfor';

	_dataIgnore = 'data-ignoreaccessibilityfix';

	/**
	 * Initializes a new object that manipulate the accessibility of the images of
	 * parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @param {hatemile.util.configuration.Configure} configure The configuration of HaTeMiLe.
	 * @memberof hatemile.implementation.AccessibleImageImplementation
	 */
	function AccessibleImageImplementation(parser, configure) {
		this.parser = parser;
		this.prefixId = configure.getParameter('prefix-generated-ids');
		this.prefixLongDescriptionLink = configure.getParameter('prefix-longdescription');
		this.suffixLongDescriptionLink = configure.getParameter('suffix-longdescription');
	}

	AccessibleImageImplementation.prototype.fixLongDescription = function(element) {
		var anchor, id, text;
		if (element.hasAttribute('longdesc')) {
			exports.hatemile.util.CommonFunctions.generateId(element, this.prefixId);
			id = element.getAttribute('id');
			if (isEmpty(this.parser.find("[" + _dataLongDescriptionForImage + "=\"" + id + "\"]").firstResult())) {
				if (element.hasAttribute('alt')) {
					text = "" + this.prefixLongDescriptionLink + " " + (element.getAttribute('alt')) + " " + this.suffixLongDescriptionLink;
				} else {
					text = "" + this.prefixLongDescriptionLink + " " + this.suffixLongDescriptionLink;
				}
				anchor = this.parser.createElement('a');
				anchor.setAttribute('href', element.getAttribute('longdesc'));
				anchor.setAttribute('target', '_blank');
				anchor.setAttribute(_dataLongDescriptionForImage, id);
				anchor.setAttribute('class', _classLongDescriptionLink);
				anchor.appendText(text);
				element.insertAfter(anchor);
			}
		}
	};

	AccessibleImageImplementation.prototype.fixLongDescriptions = function() {
		var element, elements, _i, _len;
		elements = this.parser.find('[longdesc]').listResults();
		for (_i = 0, _len = elements.length; _i < _len; _i++) {
			element = elements[_i];
			if (!element.hasAttribute(_dataIgnore)) {
				this.fixLongDescription(element);
			}
		}
	};

	return AccessibleImageImplementation;

})();
