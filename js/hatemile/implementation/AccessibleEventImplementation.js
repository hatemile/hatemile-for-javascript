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

(function () {
    'use strict';
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleEventImplementation = (function () {
        var CLICK_EVENT, DATA_BLUR_ADDED, DATA_FOCUS_ADDED, DATA_IGNORE, DATA_KEY_DOWN_ADDED, DATA_KEY_PRESSED, DATA_KEY_PRESS_ADDED, DATA_KEY_UP_ADDED, DRAG_EVENT, DROP_EVENT, HOVER_EVENT, _clearDropEffect, _createDragEvent, _createMouseEvent, _executeDragEvent, _executeEvent, _executeMouseEvent, _generateDropEffect, _hasEvent, _isEnter, _keyboardAccess;

        DATA_IGNORE = 'data-ignoreaccessibilityfix';

        DATA_KEY_PRESSED = 'data-keypressed';

        DATA_KEY_DOWN_ADDED = 'data-keydownadded';

        DATA_KEY_PRESS_ADDED = 'data-keypressadded';

        DATA_KEY_UP_ADDED = 'data-keyupadded';

        DATA_FOCUS_ADDED = 'data-focusadded';

        DATA_BLUR_ADDED = 'data-bluradded';

        CLICK_EVENT = 'click';

        HOVER_EVENT = 'hover';

        DRAG_EVENT = 'drag';

        DROP_EVENT = 'drop';

        _isEnter = function (keyCode) {
            var enter1, enter2;
            enter1 = '\n'.charCodeAt(0);
            enter2 = '\r'.charCodeAt(0);
            return (keyCode === enter1) || (keyCode === enter2);
        };

        _keyboardAccess = function (element) {
            var tag;
            if (!element.hasAttribute('tabindex')) {
                tag = element.getTagName();
                if ((tag === 'A') && (!element.hasAttribute('href'))) {
                    element.setAttribute('tabindex', '0');
                } else if ((tag !== 'A') && (tag !== 'INPUT') && (tag !== 'BUTTON') && (tag !== 'SELECT') && (tag !== 'TEXTAREA')) {
                    element.setAttribute('tabindex', '0');
                }
            }
        };

        _hasEvent = function (element, typeEvent, typeDataEvent, typeFix) {
            var attribute, nativeElement;
            nativeElement = element.getData();
            if ((typeDataEvent === void 0) || (typeFix === void 0)) {
                return (nativeElement["on" + typeEvent] instanceof Function) || ((nativeElement.eventListenerList !== void 0) && (nativeElement.eventListenerList[typeEvent] instanceof Function));
            } else {
                attribute = element.getAttribute(typeDataEvent);
                return (_hasEvent(element, typeEvent) && (!element.hasAttribute(typeDataEvent))) || self.hatemile.util.CommonFunctions.inList(attribute, typeFix);
            }
        };

        _clearDropEffect = function (parser) {
            var activeEvents, dragEvents, droppedElement, droppedElements, hoverEvents, i, len;
            droppedElements = parser.find('[aria-dropeffect]').listResults();
            for (i = 0, len = droppedElements.length; i < len; i++) {
                droppedElement = droppedElements[i];
                dragEvents = (!_hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) && (!_hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT));
                activeEvents = (!droppedElement.hasAttribute(DATA_KEY_PRESS_ADDED)) && (!_hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT)) && (!_hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT));
                hoverEvents = (!_hasEvent(droppedElement, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT)) && (!_hasEvent(droppedElement, 'blur', DATA_BLUR_ADDED, HOVER_EVENT));
                droppedElement.setAttribute('aria-dropeffect', 'none');
                if (droppedElement.hasAttribute('tabindex') && dragEvents && activeEvents && hoverEvents) {
                    droppedElement.removeAttribute('tabindex');
                }
            }
        };

        _generateDropEffect = function (parser) {
            var ariaDropEffect, dropEffect, droppedElement, droppedElements, effectAllowed, i, len;
            dropEffect = self.__dragEventDataTransfer__.dropEffect;
            effectAllowed = self.__dragEventDataTransfer__.effectAllowed;
            if ((dropEffect === 'none') || ((dropEffect !== 'copy') && (dropEffect !== 'link') && (dropEffect !== 'move'))) {
                if ((effectAllowed === 'copyLink') || (effectAllowed === 'copyMove') || (effectAllowed === 'linkMove') || (effectAllowed === 'all')) {
                    ariaDropEffect = 'popup';
                } else if ((effectAllowed === 'copy') || (effectAllowed === 'move') || (effectAllowed === 'link')) {
                    ariaDropEffect = effectAllowed;
                } else {
                    ariaDropEffect = 'move';
                }
            } else {
                ariaDropEffect = dropEffect;
            }
            droppedElements = parser.find('[aria-dropeffect]').listResults();
            for (i = 0, len = droppedElements.length; i < len; i++) {
                droppedElement = droppedElements[i];
                if (_hasEvent(droppedElement, 'drop')) {
                    droppedElement.setAttribute('aria-dropeffect', ariaDropEffect);
                }
                _keyboardAccess(droppedElement);
            }
        };

        _executeMouseEvent = function (type, element, event) {
            _executeEvent(element, _createMouseEvent(type, element, event));
        };

        _executeDragEvent = function (type, element, event) {
            if (self.__dragEventDataTransfer__ === void 0) {
                self.__dragEventDataTransfer__ = {
                    'files': null,
                    'types': null,
                    'effectAllowed': 'uninitialized',
                    'dropEffect': 'none'
                };
                self.__dragEventDataTransfer__.setDragImage = function () {};
                self.__dragEventDataTransfer__.addElement = function () {};
                self.__dragEventDataTransfer__._data = {};
                self.__dragEventDataTransfer__.setData = function (format, data) {
                    self.__dragEventDataTransfer__._data[format] = data;
                };
                self.__dragEventDataTransfer__.getData = function (format) {
                    return self.__dragEventDataTransfer__._data[format];
                };
                self.__dragEventDataTransfer__.clearData = function (format) {
                    if (format === void 0) {
                        self.__dragEventDataTransfer__._data = {};
                    } else {
                        self.__dragEventDataTransfer__._data[format] = void 0;
                    }
                };
            }
            _executeEvent(element, _createDragEvent(type, element, event));
        };

        _executeEvent = function (element, event) {
            var error, error1, error2, handlerEvent, i, len, listenerEvent, nativeElement, ref;
            nativeElement = element.getData();
            if (_hasEvent(element, event.type)) {
                handlerEvent = nativeElement["on" + event.type];
                if (handlerEvent instanceof Function) {
                    try {
                        handlerEvent.call(nativeElement, event);
                    } catch (error1) {
                        error = error1;
                    }
                }
                if ((nativeElement.eventListenerList !== void 0) && (nativeElement.eventListenerList[event.type] instanceof Function)) {
                    ref = nativeElement.eventListenerList[event.type];
                    for (i = 0, len = ref.length; i < len; i++) {
                        listenerEvent = ref[i];
                        try {
                            listenerEvent.call(nativeElement, event);
                        } catch (error2) {
                            error = error2;
                        }
                    }
                }
            }
        };

        _createMouseEvent = function (type, element, event) {
            var data;
            data = {
                'type': type,
                'view': event.view,
                'ctrlKey': event.ctrlKey,
                'shiftKey': event.shiftKey,
                'altKey': event.altKey,
                'metaKey': event.metaKey,
                'button': 0,
                'buttons': 1,
                'bubbles': true,
                'cancelable': true,
                'target': element.getData(),
                'originalTarget': element.getData(),
                'cancelBubble': false,
                'isTrusted': true,
                'detail': 0,
                'clientX': 0,
                'clientY': 0,
                'pageX': 0,
                'pageY': 0,
                'screenX': 0,
                'screenY': 0,
                'layerX': 0,
                'layerY': 0,
                'offsetX': 0,
                'offsetY': 0
            };
            data.preventDefault = function () {
                return event.preventDefault();
            };
            data.stopImmediatePropagation = function () {
                return event.stopImmediatePropagation();
            };
            data.stopPropagation = function () {
                return event.stopPropagation();
            };
            return data;
        };

        _createDragEvent = function (type, element, event) {
            var dragEvent;
            dragEvent = _createMouseEvent(type, element, event);
            dragEvent.dataTransfer = self.__dragEventDataTransfer__;
            return dragEvent;
        };

        AccessibleEventImplementation.prototype._addEventHandler = function (element, typeEvent, typeDataEvent, typeFix, operation) {
            var attribute, found, nativeElement;
            if (!_hasEvent(element, typeEvent, typeDataEvent, typeFix)) {
                found = false;
                attribute = element.getAttribute(typeDataEvent);
                nativeElement = element.getData();
                if (!_hasEvent(element, typeEvent)) {
                    nativeElement["liston" + typeEvent] = [];
                    nativeElement["on" + typeEvent] = function (event) {
                        var addedEvent, i, len, ref;
                        ref = nativeElement["liston" + typeEvent];
                        for (i = 0, len = ref.length; i < len; i++) {
                            addedEvent = ref[i];
                            addedEvent(event);
                        }
                    };
                } else {
                    found = self.hatemile.util.CommonFunctions.inList(attribute, typeFix);
                }
                if (!found) {
                    nativeElement["liston" + typeEvent].push(operation);
                    attribute = self.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix);
                    element.setAttribute(typeDataEvent, attribute);
                }
            }
        };

        AccessibleEventImplementation.prototype._visit = function (element, condition, obj, operation) {
            var child, children, i, len;
            if (!element.hasAttribute(DATA_IGNORE)) {
                if (condition(element)) {
                    operation.call(obj, element);
                }
                children = element.getChildrenElements();
                for (i = 0, len = children.length; i < len; i++) {
                    child = children[i];
                    this._visit(child, condition, obj, operation);
                }
            }
        };

        function AccessibleEventImplementation(parser1) {
            this.parser = parser1;
            this.cancelDragAdded = false;
        }

        AccessibleEventImplementation.prototype.makeAccessibleDropEvents = function (element) {
            var parser;
            element.setAttribute('aria-dropeffect', 'none');
            parser = this.parser;
            this._addEventHandler(element, 'focus', DATA_FOCUS_ADDED, DROP_EVENT, function (event) {
                if (parser.find('[aria-grabbed="true"]').firstResult() !== null) {
                    _executeDragEvent('dragenter', element, event);
                    _executeDragEvent('dragover', element, event);
                    _generateDropEffect(parser);
                }
            });
            this._addEventHandler(element, 'blur', DATA_BLUR_ADDED, DROP_EVENT, function (event) {
                if (parser.find('[aria-grabbed="true"]').firstResult() !== null) {
                    _executeDragEvent('dragleave', element, event);
                    _generateDropEffect(parser);
                }
            });
            if ((!_hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT)) && (!_hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT))) {
                this._addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT, function (event) {
                    var grabbedElement, grabbedElements, i, len;
                    if ((_isEnter(event.keyCode)) && (!element.hasAttribute(DATA_KEY_PRESSED)) && (parser.find('[aria-grabbed=true]').firstResult() !== null)) {
                        element.setAttribute(DATA_KEY_PRESSED, 'true');
                        if (_hasEvent(element, 'drop')) {
                            grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
                            for (i = 0, len = grabbedElements.length; i < len; i++) {
                                grabbedElement = grabbedElements[i];
                                grabbedElement.setAttribute('aria-grabbed', 'false');
                                _executeDragEvent('dragend', grabbedElement, event);
                            }
                            _clearDropEffect(parser);
                        }
                        _executeDragEvent('drop', element, event);
                    }
                });
                this._addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT, function (event) {
                    element.removeAttribute(DATA_KEY_PRESSED);
                });
            }
        };

        AccessibleEventImplementation.prototype.makeAccessibleDragEvents = function (element) {
            var parser, root;
            _keyboardAccess(element);
            element.setAttribute('aria-grabbed', 'false');
            parser = this.parser;
            if ((!_hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) && (!_hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))) {
                this._addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT, function (event) {
                    var grabbedElement, grabbedElements, i, len;
                    if ((event.keyCode === ' '.charCodeAt(0)) && (!element.hasAttribute(DATA_KEY_PRESSED))) {
                        grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
                        for (i = 0, len = grabbedElements.length; i < len; i++) {
                            grabbedElement = grabbedElements[i];
                            grabbedElement.setAttribute('aria-grabbed', 'false');
                            _executeDragEvent('dragend', grabbedElement, event);
                        }
                        element.setAttribute('aria-grabbed', 'true');
                        element.setAttribute(DATA_KEY_PRESSED, 'true');
                        _executeDragEvent('dragstart', element, event);
                        _executeDragEvent('drag', element, event);
                        _generateDropEffect(parser);
                    }
                });
                this._addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT, function (event) {
                    element.removeAttribute(DATA_KEY_PRESSED);
                });
            }
            if (!this.cancelDragAdded) {
                root = this.parser.find('html').firstResult();
                this._addEventHandler(root, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, function (event) {
                    var grabbedElement, grabbedElements, i, len;
                    if (event.keyCode === 27) {
                        grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
                        for (i = 0, len = grabbedElements.length; i < len; i++) {
                            grabbedElement = grabbedElements[i];
                            grabbedElement.setAttribute('aria-grabbed', 'false');
                            _executeDragEvent('dragend', grabbedElement, event);
                        }
                        _clearDropEffect(parser);
                    }
                });
                this.cancelDragAdded = true;
            }
        };

        AccessibleEventImplementation.prototype.makeAccessibleAllDragandDropEvents = function () {
            var body;
            body = this.parser.find('body').firstResult();
            this._visit(body, function (element) {
                return _hasEvent(element, 'drag') || _hasEvent(element, 'dragstart') || _hasEvent(element, 'dragend');
            }, this, this.makeAccessibleDragEvents);
            this._visit(body, function (element) {
                return _hasEvent(element, 'drop') || _hasEvent(element, 'dragenter') || _hasEvent(element, 'dragleave') || _hasEvent(element, 'dragover');
            }, this, this.makeAccessibleDropEvents);
        };

        AccessibleEventImplementation.prototype.makeAccessibleHoverEvents = function (element) {
            _keyboardAccess(element);
            this._addEventHandler(element, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT, function (event) {
                _executeMouseEvent('mouseover', element, event);
            });
            this._addEventHandler(element, 'blur', DATA_BLUR_ADDED, HOVER_EVENT, function (event) {
                _executeMouseEvent('mouseout', element, event);
            });
        };

        AccessibleEventImplementation.prototype.makeAccessibleAllHoverEvents = function () {
            this._visit(this.parser.find('body').firstResult(), function (element) {
                return _hasEvent(element, 'mouseover') || _hasEvent(element, 'mouseout');
            }, this, this.makeAccessibleHoverEvents);
        };

        AccessibleEventImplementation.prototype.makeAccessibleClickEvents = function (element) {
            var tag, typeButtons;
            _keyboardAccess(element);
            tag = element.getTagName();
            typeButtons = ['submit', 'button', 'reset'];
            if (((tag !== 'INPUT') || (!element.hasAttribute('type')) || (typeButtons.indexOf(element.getAttribute('type').toLowerCase()) === -1)) && (tag !== 'BUTTON') && (tag !== 'A')) {
                this._addEventHandler(element, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, function (event) {
                    if (_isEnter(event.keyCode)) {
                        if (_hasEvent(element, 'click')) {
                            _executeMouseEvent('click', element, event);
                        } else if (_hasEvent(element, 'dblclick')) {
                            _executeMouseEvent('dblclick', element, event);
                        }
                    }
                });
            }
            this._addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT, function (event) {
                if (_isEnter(event.keyCode)) {
                    _executeMouseEvent('mouseup', element, event);
                }
            });
            this._addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT, function (event) {
                if (_isEnter(event.keyCode)) {
                    _executeMouseEvent('mousedown', element, event);
                }
            });
        };

        AccessibleEventImplementation.prototype.makeAccessibleAllClickEvents = function () {
            this._visit(this.parser.find('body').firstResult(), function (element) {
                return _hasEvent(element, 'click') || _hasEvent(element, 'mousedown') || _hasEvent(element, 'mouseup') || _hasEvent(element, 'dblclick');
            }, this, this.makeAccessibleClickEvents);
        };

        return AccessibleEventImplementation;

    })();

}).call(this);
