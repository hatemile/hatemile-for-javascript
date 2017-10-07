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


/**
 * @namespace hatemile
 */

(function () {
    this.hatemile || (this.hatemile = {});


    /**
     * The AccessibleNavigation interface improve the accessibility of navigation.
     * @interface hatemile.AccessibleNavigation
     */

    this.hatemile.AccessibleNavigation = (function () {
        function AccessibleNavigation() {}


        /**
         * Provide a content skipper for element.
         * @param {hatemile.util.html.HTMLDOMElement} element The element.
         * @public
         * @function hatemile.AccessibleNavigation#provideNavigationBySkipper
         */

        AccessibleNavigation.prototype.provideNavigationBySkipper = function (element) {};


        /**
         * Provide navigation by content skippers.
         * @public
         * @function hatemile.AccessibleNavigation#provideNavigationByAllSkippers
         */

        AccessibleNavigation.prototype.provideNavigationByAllSkippers = function () {};


        /**
         * Provide navigation by heading.
         * @param {hatemile.util.html.HTMLDOMElement} heading The heading element.
         * @public
         * @function hatemile.AccessibleNavigation#provideNavigationByHeading
         */

        AccessibleNavigation.prototype.provideNavigationByHeading = function (heading) {};


        /**
         * Provide navigation by headings of page.
         * @public
         * @function hatemile.AccessibleNavigation#provideNavigationByAllHeadings
         */

        AccessibleNavigation.prototype.provideNavigationByAllHeadings = function () {};


        /**
         * Provide an alternative way to access the long description of element.
         * @param {hatemile.util.html.HTMLDOMElement} image The image with long
         * description.
         * @public
         * @function hatemile.AccessibleNavigation#provideNavigationToLongDescription
         */

        AccessibleNavigation.prototype.provideNavigationToLongDescription = function (image) {};


        /**
         * Provide an alternative way to access the longs descriptions of all elements
         * of page.
         * @public
         * @function hatemile.AccessibleNavigation#provideNavigationToAllLongDescriptions
         */

        AccessibleNavigation.prototype.provideNavigationToAllLongDescriptions = function () {};

        return AccessibleNavigation;

    })();

}).call(this);
