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

self = this

# @namespace hatemile
#
@hatemile or= {}

# @namespace hatemile.implementation
#
@hatemile.implementation or= {}

# The AccessibleEventImplementation class is official implementation of
# {hatemile.AccessibleEvent}.
#
# @extend hatemile.AccessibleEvent
#
class @hatemile.implementation.AccessibleEventImplementation
  
  DATA_IGNORE = 'data-ignoreaccessibilityfix'
  DATA_KEY_PRESSED = 'data-keypressed'
  DATA_KEY_DOWN_ADDED = 'data-keydownadded'
  DATA_KEY_PRESS_ADDED = 'data-keypressadded'
  DATA_KEY_UP_ADDED = 'data-keyupadded'
  DATA_FOCUS_ADDED = 'data-focusadded'
  DATA_BLUR_ADDED = 'data-bluradded'
  CLICK_EVENT = 'click'
  HOVER_EVENT = 'hover'
  DRAG_EVENT = 'drag'
  DROP_EVENT = 'drop'
  
  # Check that the key pressed is enter.
  #
  # @private
  #
  # @param [number] keyCode The code of key pressed.
  #
  # @return [boolean] True if the key pressed is enter or false if the key pressed isn't enter.
  #
  _isEnter = (keyCode) ->
    enter1 = '\n'.charCodeAt(0)
    enter2 = '\r'.charCodeAt(0)
    return (keyCode is enter1) or (keyCode is enter2)
  
  # Provide keyboard access for element, if it not has.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  #
  _keyboardAccess = (element) ->
    if not element.hasAttribute('tabindex')
      tag = element.getTagName()
      if (tag is 'A') and (not element.hasAttribute('href'))
        element.setAttribute('tabindex', '0')
      else if (tag isnt 'A') and (tag isnt 'INPUT') and \
          (tag isnt 'BUTTON') and (tag isnt 'SELECT') and (tag isnt 'TEXTAREA')
        element.setAttribute('tabindex', '0')
    return
  
  # Check that the element has the event added by developer or fixed by
  # HaTeMiLe.
  #
  # @private
  #
  # @overload _hasEvent(element, typeEvent)
  #   Check that the element has a event of type.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @param [string] typeEvent The type of event.
  #   @return [boolean] True if the element has a event of type or false if it
  #   not has.
  #
  # @overload _hasEvent(element, typeEvent, typeDataEvent, typeFix)
  #   Check that the element has a event to solve the same problem.
  #   @param [hatemile.util.html.HTMLDOMElement] element The element.
  #   @param [string] typeEvent The type of event.
  #   @param [string] typeDataEvent The custom attribute of type of event.
  #   @param [string] typeFix The id of fix method.
  #   @return [boolean] True if the element has a event to solve the same
  #   problem or false if it not has.
  #
  _hasEvent = (element, typeEvent, typeDataEvent, typeFix) ->
    nativeElement = element.getData()
    if (typeDataEvent is undefined) or (typeFix is undefined)
      return (nativeElement["on#{typeEvent}"] instanceof Function) or \
          ((nativeElement.eventListenerList isnt undefined) and \
          (nativeElement.eventListenerList[typeEvent] instanceof Function))
    else
      attribute = element.getAttribute(typeDataEvent)
      return (_hasEvent(element, typeEvent) and \
          (not element.hasAttribute(typeDataEvent))) or \
          self.hatemile.util.CommonFunctions.inList(attribute, typeFix)
  
  # Remove the information on attributes of drop effect of all elements.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #
  _clearDropEffect = (parser) ->
    droppedElements = parser.find('[aria-dropeffect]').listResults()
    for droppedElement in droppedElements
      dragEvents = (not _hasEvent(droppedElement, 'keydown', \
          DATA_KEY_DOWN_ADDED, DRAG_EVENT)) and (not _hasEvent(droppedElement, \
          'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))
      activeEvents = (not droppedElement.hasAttribute(DATA_KEY_PRESS_ADDED)) \
          and (not _hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, \
          CLICK_EVENT)) and (not _hasEvent(droppedElement, 'keyup', \
          DATA_KEY_UP_ADDED, CLICK_EVENT))
      hoverEvents = (not _hasEvent(droppedElement, 'focus', DATA_FOCUS_ADDED, \
          HOVER_EVENT)) and (not _hasEvent(droppedElement, 'blur', \
          DATA_BLUR_ADDED, HOVER_EVENT))
      
      droppedElement.setAttribute('aria-dropeffect', 'none')
      if droppedElement.hasAttribute('tabindex') and dragEvents and \
          activeEvents and hoverEvents
        droppedElement.removeAttribute('tabindex')
    return
  
  # Set in all droppable elements the information of the type of drop.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #
  _generateDropEffect = (parser) ->
    dropEffect = self.__dragEventDataTransfer__.dropEffect
    effectAllowed = self.__dragEventDataTransfer__.effectAllowed
    if (dropEffect is 'none') or ((dropEffect isnt 'copy') and \
        (dropEffect isnt 'link') and (dropEffect isnt 'move'))
      if (effectAllowed is 'copyLink') or (effectAllowed is 'copyMove') or \
          (effectAllowed is 'linkMove') or (effectAllowed is 'all')
        ariaDropEffect = 'popup'
      else if (effectAllowed is 'copy') or (effectAllowed is 'move') or \
          (effectAllowed is 'link')
        ariaDropEffect = effectAllowed
      else
        ariaDropEffect = 'move'
    else
      ariaDropEffect = dropEffect
    droppedElements = parser.find('[aria-dropeffect]').listResults()
    for droppedElement in droppedElements
      if _hasEvent(droppedElement, 'drop')
        droppedElement.setAttribute('aria-dropeffect', ariaDropEffect)
      
      _keyboardAccess(droppedElement)
    return
  
  # Execute the event as mouse event in element.
  #
  # @private
  #
  # @param [string] type The type of event.
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] event The original event.
  #
  _executeMouseEvent = (type, element, event) ->
    _executeEvent(element, _createMouseEvent(type, element, event))
    return
  
  # Execute the event as drag event in element.
  #
  # @private
  #
  # @param [string] type The type of event.
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] event The original event.
  #
  _executeDragEvent = (type, element, event) ->
    if self.__dragEventDataTransfer__ is undefined
      self.__dragEventDataTransfer__ = {
        'files': null,
        'types': null,
        'effectAllowed': 'uninitialized',
        'dropEffect': 'none'
      }
      self.__dragEventDataTransfer__.setDragImage = () ->
        return
      self.__dragEventDataTransfer__.addElement = () ->
        return
      self.__dragEventDataTransfer__._data = {}
      self.__dragEventDataTransfer__.setData = (format, data) ->
        self.__dragEventDataTransfer__._data[format] = data
        return
      self.__dragEventDataTransfer__.getData = (format) ->
        return self.__dragEventDataTransfer__._data[format]
      self.__dragEventDataTransfer__.clearData = (format) ->
        if format is undefined
          self.__dragEventDataTransfer__._data = {}
        else
          self.__dragEventDataTransfer__._data[format] = undefined
        return
      
    _executeEvent(element, _createDragEvent(type, element, event))
    return
  
  # Execute the event in element.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] event The original event.
  #
  _executeEvent = (element, event) ->
    nativeElement = element.getData()
    if _hasEvent(element, event.type)
      handlerEvent = nativeElement["on#{event.type}"]
      if handlerEvent instanceof Function
        try
          handlerEvent.call(nativeElement, event)
        catch error
      if (nativeElement.eventListenerList isnt undefined) and \
          (nativeElement.eventListenerList[event.type] instanceof Function)
        for listenerEvent in nativeElement.eventListenerList[event.type]
          try
            listenerEvent.call(nativeElement, event)
          catch error
    return
  
  # Create a proxy for original event, simulating the mouse event.
  #
  # @private
  #
  # @param [string] type The type of event.
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] event The original event.
  #
  # @return [Object] The proxy of original event, simulating the mouse event.
  #
  _createMouseEvent = (type, element, event) ->
    data = {
      'type': type
      , 'view': event.view
      , 'ctrlKey': event.ctrlKey
      , 'shiftKey': event.shiftKey
      , 'altKey': event.altKey
      , 'metaKey': event.metaKey
      , 'button': 0
      , 'buttons': 1
      , 'bubbles': true
      , 'cancelable': true
      , 'target': element.getData()
      , 'originalTarget': element.getData()
      , 'cancelBubble': false
      , 'isTrusted': true
      , 'detail': 0
      , 'clientX': 0
      , 'clientY': 0
      , 'pageX': 0
      , 'pageY': 0
      , 'screenX': 0
      , 'screenY': 0
      , 'layerX': 0
      , 'layerY': 0
      , 'offsetX': 0
      , 'offsetY': 0
    }
    
    data.preventDefault = () ->
      event.preventDefault()
    
    data.stopImmediatePropagation = () ->
      event.stopImmediatePropagation()
    
    data.stopPropagation = () ->
      event.stopPropagation()
    
    return data
  
  # Create a proxy for original event, simulating the drag event.
  #
  # @private
  #
  # @param [string] type The type of event.
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] event The original event.
  #
  # @return [Object] The proxy of original event, simulating the drag event.
  #
  _createDragEvent = (type, element, event) ->
    dragEvent = _createMouseEvent(type, element, event)
    
    dragEvent.dataTransfer = self.__dragEventDataTransfer__
    return dragEvent
  
  # Increase a function on event.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [string] typeEvent The type of event.
  # @param [string] typeDataEvent The name of attribute that store the type of event fixed.
  # @param [string] typeFix The id of fix method.
  # @param [Function] operation The function.
  #
  _addEventHandler: (element, typeEvent, typeDataEvent, typeFix, operation) ->
    if not _hasEvent(element, typeEvent, typeDataEvent, typeFix)
      found = false
      attribute = element.getAttribute(typeDataEvent)
      nativeElement = element.getData()
      if not _hasEvent(element, typeEvent)
        nativeElement["liston#{typeEvent}"] = []
        nativeElement["on#{typeEvent}"] = (event) ->
          for addedEvent in nativeElement["liston#{typeEvent}"]
            addedEvent(event)
          return
      else
        found = self.hatemile.util.CommonFunctions.inList(attribute, typeFix)
      if not found
        nativeElement["liston#{typeEvent}"].push(operation)
        attribute = self.hatemile.util.CommonFunctions
            .increaseInList(attribute, typeFix)
        element.setAttribute(typeDataEvent, attribute)
    return
  
  # Visit and execute a operation in element and descendants.
  #
  # @private
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element.
  # @param [Function] condition The condition to execute operation in element and descendants.
  # @param [hatemile.implementation.AccessibleEventImplementation] obj The object that be execute the operation.
  # @param [Function] operation The operation.
  #
  _visit: (element, condition, obj, operation) ->
    if not element.hasAttribute(DATA_IGNORE)
      if condition(element)
        operation.call(obj, element)
      
      children = element.getChildrenElements()
      for child in children
        @_visit(child, condition, obj, operation)
    return
  
  # Initializes a new object that manipulate the accessibility of the Javascript
  # events of elements of parser.
  #
  # @param [hatemile.util.html.HTMLDOMParser] parser The HTML parser.
  #
  constructor: (@parser) ->
    @cancelDragAdded = false
  
  # Make the drop events of element available from a keyboard.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with drop events.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleDropEvents
  #
  makeAccessibleDropEvents: (element) ->
    element.setAttribute('aria-dropeffect', 'none')
    parser = @parser
    
    @_addEventHandler(element, 'focus', DATA_FOCUS_ADDED, DROP_EVENT, (event) ->
      if parser.find('[aria-grabbed="true"]').firstResult() isnt null
        _executeDragEvent('dragenter', element, event)
        _executeDragEvent('dragover', element, event)
        
        _generateDropEffect(parser)
      return
    )
    @_addEventHandler(element, 'blur', DATA_BLUR_ADDED, DROP_EVENT, (event) ->
      if parser.find('[aria-grabbed="true"]').firstResult() isnt null
        _executeDragEvent('dragleave', element, event)
        
        _generateDropEffect(parser)
      return
    )
    if (not _hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT)) \
        and (not _hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT))
      @_addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT, \
          (event) ->
        if (_isEnter(event.keyCode)) and \
            (not element.hasAttribute(DATA_KEY_PRESSED)) and \
            (parser.find('[aria-grabbed=true]').firstResult() isnt null)
          element.setAttribute(DATA_KEY_PRESSED, 'true')
          
          if _hasEvent(element, 'drop')
            grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
            for grabbedElement in grabbedElements
              grabbedElement.setAttribute('aria-grabbed', 'false')
              
              _executeDragEvent('dragend', grabbedElement, event)
            
            _clearDropEffect(parser)
          _executeDragEvent('drop', element, event)
        return
      )
      @_addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT, \
          (event) ->
        element.removeAttribute(DATA_KEY_PRESSED)
        return
      )
    return
  
  # Make the drag events of element available from a keyboard.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with drag events.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleDragEvents
  #
  makeAccessibleDragEvents: (element) ->
    _keyboardAccess(element)
    
    element.setAttribute('aria-grabbed', 'false')
    parser = @parser
    if (not _hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) \
        and (not _hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))
      @_addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT, \
          (event) ->
        if (event.keyCode is ' '.charCodeAt(0)) and \
            (not element.hasAttribute(DATA_KEY_PRESSED))
          grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
          for grabbedElement in grabbedElements
            grabbedElement.setAttribute('aria-grabbed', 'false')
            
            _executeDragEvent('dragend', grabbedElement, event)
          
          element.setAttribute('aria-grabbed', 'true')
          element.setAttribute(DATA_KEY_PRESSED, 'true')
          
          _executeDragEvent('dragstart', element, event)
          _executeDragEvent('drag', element, event)
          
          _generateDropEffect(parser)
        return
      )
      @_addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT, \
          (event) ->
        element.removeAttribute(DATA_KEY_PRESSED)
        return
      )
    if not @cancelDragAdded
      root = @parser.find('html').firstResult()
      @_addEventHandler(root, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, \
          (event) ->
        if event.keyCode is 27
          grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
          for grabbedElement in grabbedElements
            grabbedElement.setAttribute('aria-grabbed', 'false')
            
            _executeDragEvent('dragend', grabbedElement, event)
          
          _clearDropEffect(parser)
        return
      )
      @cancelDragAdded = true
    return
  
  # Make all Drag-and-Drop events of page available from a keyboard.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleAllDragandDropEvents
  #
  makeAccessibleAllDragandDropEvents: () ->
    body = @parser.find('body').firstResult()
    @_visit(body, (element) ->
      return (_hasEvent(element, 'drag') or _hasEvent(element, 'dragstart') or \
          _hasEvent(element, 'dragend'))
    , this, @makeAccessibleDragEvents)
    @_visit(body, (element) ->
      return (_hasEvent(element, 'drop') or _hasEvent(element, 'dragenter') or \
          _hasEvent(element, 'dragleave') or _hasEvent(element, 'dragover'))
    , this, @makeAccessibleDropEvents)
    return
  
  # Make the hover events of element available from a keyboard.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with hover events.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleHoverEvents
  #
  makeAccessibleHoverEvents: (element) ->
    _keyboardAccess(element)
    
    @_addEventHandler(element, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT, \
        (event) ->
      _executeMouseEvent('mouseover', element, event)
      return
    )
    @_addEventHandler(element, 'blur', DATA_BLUR_ADDED, HOVER_EVENT, (event) ->
      _executeMouseEvent('mouseout', element, event)
      return
    )
    return
  
  # Make all hover events of page available from a keyboard.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleAllHoverEvents
  #
  makeAccessibleAllHoverEvents: () ->
    @_visit(@parser.find('body').firstResult(), (element) ->
      return (_hasEvent(element, 'mouseover') or _hasEvent(element, 'mouseout'))
    , this, @makeAccessibleHoverEvents)
    return
  
  # Make the click events of element available from a keyboard.
  #
  # @param [hatemile.util.html.HTMLDOMElement] element The element with click events.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleClickEvents
  #
  makeAccessibleClickEvents: (element) ->
    _keyboardAccess(element)
    
    tag = element.getTagName()
    typeButtons = ['submit', 'button', 'reset']
    if ((tag isnt 'INPUT') or (not element.hasAttribute('type')) or \
        (typeButtons.indexOf(element.getAttribute('type')
        .toLowerCase()) is -1)) and (tag isnt 'BUTTON') and (tag isnt 'A')
      @_addEventHandler(element, 'keypress', DATA_KEY_PRESS_ADDED, \
          CLICK_EVENT, (event) ->
        if _isEnter(event.keyCode)
          if _hasEvent(element, 'click')
            _executeMouseEvent('click', element, event)
          else if _hasEvent(element, 'dblclick')
            _executeMouseEvent('dblclick', element, event)
        return
      )
    @_addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT, \
        (event) ->
      if _isEnter(event.keyCode)
        _executeMouseEvent('mouseup', element, event)
      return
    )
    @_addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT, \
        (event) ->
      if _isEnter(event.keyCode)
        _executeMouseEvent('mousedown', element, event)
      return
    )
    return
  
  # Make all click events of page available from a keyboard.
  #
  # @see hatemile.AccessibleEvent#makeAccessibleAllClickEvents
  #
  makeAccessibleAllClickEvents: () ->
    @_visit(@parser.find('body').firstResult(), (element) ->
      return (_hasEvent(element, 'click') or \
          _hasEvent(element, 'mousedown') or _hasEvent(element, 'mouseup') or \
          _hasEvent(element, 'dblclick'))
    , this, @makeAccessibleClickEvents)
    return
