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

var exports, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

exports = this;

/**
 * @namespace hatemile
*/


exports.hatemile || (exports.hatemile = {});

/**
 * @class ClientSideAccessibleShortcut
 * @classdesc The ClientSideAccessibleShortcut interface fix the problems of
 * accessibility associated with the shortcuts, with more options in by the
 * client-side.
 * @extends hatemile.AccessibleShortcut
 * @version 2014-07-23
 * @memberof hatemile
*/


exports.hatemile.ClientSideAccessibleShortcut = (function(_super) {
  __extends(ClientSideAccessibleShortcut, _super);

  function ClientSideAccessibleShortcut() {
    _ref = ClientSideAccessibleShortcut.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /**
  	 * Show the shortcuts for the user.
  	 * @memberof hatemile.ClientSideAccessibleShortcut
  */


  ClientSideAccessibleShortcut.prototype.showShortcuts = function() {};

  return ClientSideAccessibleShortcut;

})(exports.hatemile.AccessibleShortcut);
