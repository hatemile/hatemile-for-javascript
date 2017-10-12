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
    var base, self;

    self = this;

    this.hatemile || (this.hatemile = {});

    (base = this.hatemile).implementation || (base.implementation = {});

    this.hatemile.implementation.AccessibleEventImplementation = (function () {
        var CLICK_EVENT, DATA_BLUR_ADDED, DATA_FOCUS_ADDED, DATA_IGNORE, DATA_KEY_DOWN_ADDED, DATA_KEY_PRESSED, DATA_KEY_PRESS_ADDED, DATA_KEY_UP_ADDED, DRAG_EVENT, DROP_EVENT, HOVER_EVENT, addEventHandler, clearDropEffect, createDragEvent, createMouseEvent, executeDragEvent, executeEvent, executeMouseEvent, generateDropEffect, hasEvent, isEnter, keyboardAccess, visit;

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

        isEnter = function (keyCode) {
            var enter1, enter2;
            enter1 = '\n'.charCodeAt(0);
            enter2 = '\r'.charCodeAt(0);
            return (keyCode === enter1) || (keyCode === enter2);
        };

        keyboardAccess = function (element) {
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

        addEventHandler = function (element, typeEvent, typeDataEvent, typeFix, functionForEventHandler) {
            var attribute, found, nativeElement;
            if (!hasEvent(element, typeEvent, typeDataEvent, typeFix)) {
                found = false;
                attribute = element.getAttribute(typeDataEvent);
                nativeElement = element.getData();
                if (!hasEvent(element, typeEvent)) {
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
                    nativeElement["liston" + typeEvent].push(functionForEventHandler);
                    attribute = self.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix);
                    element.setAttribute(typeDataEvent, attribute);
                }
            }
        };

        hasEvent = function (element, typeEvent, typeDataEvent, typeFix) {
            var attribute, nativeElement;
            nativeElement = element.getData();
            if (self.isEmpty(typeDataEvent) || self.isEmpty(typeFix)) {
                return (!self.isEmpty(nativeElement["on" + typeEvent])) || ((!self.isEmpty(nativeElement.eventListenerList)) && (!self.isEmpty(nativeElement.eventListenerList[typeEvent])));
            } else {
                attribute = element.getAttribute(typeDataEvent);
                return (hasEvent(element, typeEvent) && (!element.hasAttribute(typeDataEvent))) || self.hatemile.util.CommonFunctions.inList(attribute, typeFix);
            }
        };

        clearDropEffect = function (parser) {
            var activeEvents, dragEvents, droppedElement, droppedElements, hoverEvents, i, len;
            droppedElements = parser.find('[aria-dropeffect]').listResults();
            for (i = 0, len = droppedElements.length; i < len; i++) {
                droppedElement = droppedElements[i];
                dragEvents = (!hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) && (!hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT));
                activeEvents = (!droppedElement.hasAttribute(DATA_KEY_PRESS_ADDED)) && (!hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT)) && (!hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT));
                hoverEvents = (!hasEvent(droppedElement, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT)) && (!hasEvent(droppedElement, 'blur', DATA_BLUR_ADDED, HOVER_EVENT));
                droppedElement.setAttribute('aria-dropeffect', 'none');
                if (droppedElement.hasAttribute('tabindex') && dragEvents && activeEvents && hoverEvents) {
                    droppedElement.removeAttribute('tabindex');
                }
            }
        };

        generateDropEffect = function (parser) {
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
                if (hasEvent(droppedElement, 'drop')) {
                    droppedElement.setAttribute('aria-dropeffect', ariaDropEffect);
                }
                keyboardAccess(droppedElement);
            }
        };

        executeMouseEvent = function (type, element, event) {
            executeEvent(element, createMouseEvent(type, element, event));
        };

        executeDragEvent = function (type, element, event) {
            if (self.isEmpty(self.__dragEventDataTransfer__)) {
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
                    if (self.isEmpty(format)) {
                        self.__dragEventDataTransfer__._data = {};
                    } else {
                        self.__dragEventDataTransfer__._data[format] = void 0;
                    }
                };
            }
            executeEvent(element, createDragEvent(type, element, event));
        };

        executeEvent = function (element, event) {
            var error, error1, error2, handlerEvent, i, len, listenerEvent, nativeElement, ref;
            nativeElement = element.getData();
            if (hasEvent(element, event.type)) {
                handlerEvent = nativeElement["on" + event.type];
                if (!self.isEmpty(handlerEvent)) {
                    try {
                        handlerEvent.call(nativeElement, event);
                    } catch (error1) {
                        error = error1;
                    }
                }
                if ((!self.isEmpty(nativeElement.eventListenerList)) && (!self.isEmpty(nativeElement.eventListenerList[event.type]))) {
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

        createMouseEvent = function (type, element, event) {
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

        createDragEvent = function (type, element, event) {
            var dragEvent;
            dragEvent = createMouseEvent(type, element, event);
            dragEvent.dataTransfer = self.__dragEventDataTransfer__;
            return dragEvent;
        };

        visit = function (element, condition, obj, operation) {
            var child, children, i, len;
            if (!element.hasAttribute(DATA_IGNORE)) {
                if (condition(element)) {
                    operation.call(obj, element);
                }
                children = element.getChildrenElements();
                for (i = 0, len = children.length; i < len; i++) {
                    child = children[i];
                    visit(child, condition, obj, operation);
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
            addEventHandler(element, 'focus', DATA_FOCUS_ADDED, DROP_EVENT, function (event) {
                if (!self.isEmpty(parser.find('[aria-grabbed="true"]').firstResult())) {
                    executeDragEvent('dragenter', element, event);
                    executeDragEvent('dragover', element, event);
                    generateDropEffect(parser);
                }
            });
            addEventHandler(element, 'blur', DATA_BLUR_ADDED, DROP_EVENT, function (event) {
                if (!self.isEmpty(parser.find('[aria-grabbed="true"]').firstResult())) {
                    executeDragEvent('dragleave', element, event);
                    generateDropEffect(parser);
                }
            });
            if ((!hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT)) && (!hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT))) {
                addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT, function (event) {
                    var grabbedElement, grabbedElements, i, len;
                    if ((isEnter(event.keyCode)) && (!element.hasAttribute(DATA_KEY_PRESSED)) && (!self.isEmpty(parser.find('[aria-grabbed=true]').firstResult()))) {
                        element.setAttribute(DATA_KEY_PRESSED, 'true');
                        if (hasEvent(element, 'drop')) {
                            grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
                            for (i = 0, len = grabbedElements.length; i < len; i++) {
                                grabbedElement = grabbedElements[i];
                                grabbedElement.setAttribute('aria-grabbed', 'false');
                                executeDragEvent('dragend', grabbedElement, event);
                            }
                            clearDropEffect(parser);
                        }
                        executeDragEvent('drop', element, event);
                    }
                });
                addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT, function (event) {
                    element.removeAttribute(DATA_KEY_PRESSED);
                });
            }
        };

        AccessibleEventImplementation.prototype.makeAccessibleDragEvents = function (element) {
            var parser, root;
            keyboardAccess(element);
            element.setAttribute('aria-grabbed', 'false');
            parser = this.parser;
            if ((!hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) && (!hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))) {
                addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT, function (event) {
                    var grabbedElement, grabbedElements, i, len;
                    if ((event.keyCode === ' '.charCodeAt(0)) && (!element.hasAttribute(DATA_KEY_PRESSED))) {
                        grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
                        for (i = 0, len = grabbedElements.length; i < len; i++) {
                            grabbedElement = grabbedElements[i];
                            grabbedElement.setAttribute('aria-grabbed', 'false');
                            executeDragEvent('dragend', grabbedElement, event);
                        }
                        element.setAttribute('aria-grabbed', 'true');
                        element.setAttribute(DATA_KEY_PRESSED, 'true');
                        executeDragEvent('dragstart', element, event);
                        executeDragEvent('drag', element, event);
                        generateDropEffect(parser);
                    }
                });
                addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT, function (event) {
                    element.removeAttribute(DATA_KEY_PRESSED);
                });
            }
            if (!this.cancelDragAdded) {
                root = this.parser.find('html').firstResult();
                addEventHandler(root, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, function (event) {
                    var grabbedElement, grabbedElements, i, len;
                    if (event.keyCode === 27) {
                        grabbedElements = parser.find('[aria-grabbed="true"]').listResults();
                        for (i = 0, len = grabbedElements.length; i < len; i++) {
                            grabbedElement = grabbedElements[i];
                            grabbedElement.setAttribute('aria-grabbed', 'false');
                            executeDragEvent('dragend', grabbedElement, event);
                        }
                        clearDropEffect(parser);
                    }
                });
                this.cancelDragAdded = true;
            }
        };

        AccessibleEventImplementation.prototype.makeAccessibleAllDragandDropEvents = function () {
            var body;
            body = this.parser.find('body').firstResult();
            visit(body, function (element) {
                return hasEvent(element, 'drag') || hasEvent(element, 'dragstart') || hasEvent(element, 'dragend');
            }, this, this.makeAccessibleDragEvents);
            visit(body, function (element) {
                return hasEvent(element, 'drop') || hasEvent(element, 'dragenter') || hasEvent(element, 'dragleave') || hasEvent(element, 'dragover');
            }, this, this.makeAccessibleDropEvents);
        };

        AccessibleEventImplementation.prototype.makeAccessibleHoverEvents = function (element) {
            keyboardAccess(element);
            addEventHandler(element, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT, function (event) {
                executeMouseEvent('mouseover', element, event);
            });
            addEventHandler(element, 'blur', DATA_BLUR_ADDED, HOVER_EVENT, function (event) {
                executeMouseEvent('mouseout', element, event);
            });
        };

        AccessibleEventImplementation.prototype.makeAccessibleAllHoverEvents = function () {
            visit(this.parser.find('body').firstResult(), function (element) {
                return hasEvent(element, 'mouseover') || hasEvent(element, 'mouseout');
            }, this, this.makeAccessibleHoverEvents);
        };

        AccessibleEventImplementation.prototype.makeAccessibleClickEvents = function (element) {
            var tag, typeButtons;
            keyboardAccess(element);
            tag = element.getTagName();
            typeButtons = ['submit', 'button', 'reset'];
            if (((tag !== 'INPUT') || (!element.hasAttribute('type')) || (typeButtons.indexOf(element.getAttribute('type').toLowerCase()) === -1)) && (tag !== 'BUTTON') && (tag !== 'A')) {
                addEventHandler(element, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, function (event) {
                    if (isEnter(event.keyCode)) {
                        if (hasEvent(element, 'click')) {
                            executeMouseEvent('click', element, event);
                        } else if (hasEvent(element, 'dblclick')) {
                            executeMouseEvent('dblclick', element, event);
                        }
                    }
                });
            }
            addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT, function (event) {
                if (isEnter(event.keyCode)) {
                    executeMouseEvent('mouseup', element, event);
                }
            });
            addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT, function (event) {
                if (isEnter(event.keyCode)) {
                    executeMouseEvent('mousedown', element, event);
                }
            });
        };

        AccessibleEventImplementation.prototype.makeAccessibleAllClickEvents = function () {
            visit(this.parser.find('body').firstResult(), function (element) {
                return hasEvent(element, 'click') || hasEvent(element, 'mousedown') || hasEvent(element, 'mouseup') || hasEvent(element, 'dblclick');
            }, this, this.makeAccessibleClickEvents);
        };

        return AccessibleEventImplementation;

    })();

}).call(this);
