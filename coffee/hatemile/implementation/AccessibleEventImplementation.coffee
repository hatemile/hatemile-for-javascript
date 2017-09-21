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
__exports = this

###*
 * @namespace hatemile
###
__exports.hatemile or= {}

###*
 * @namespace hatemile.implementation
###
__exports.hatemile.implementation or= {}

class __exports.hatemile.implementation.AccessibleEventImplementation
	
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
	
	###*
	 * Check that the key pressed is enter.
	 * @param {number} keyCode The code of key pressed.
	 * @returns {boolean} True if the key pressed is enter or false if the key
	 * pressed isn't enter.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.isEnter
	###
	isEnter = (keyCode) ->
		enter1 = '\n'.charCodeAt(0)
		enter2 = '\r'.charCodeAt(0)
		return (keyCode is enter1) or (keyCode is enter2)
	
	###*
	 * Provide keyboard access for element, if it not has.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.keyboardAccess
	###
	keyboardAccess = (element) ->
		if not element.hasAttribute('tabindex')
			tag = element.getTagName()
			if (tag is 'A') and (not element.hasAttribute('href'))
				element.setAttribute('tabindex', '0')
			else if (tag isnt 'A') and (tag isnt 'INPUT') and (tag isnt 'BUTTON') and (tag isnt 'SELECT') and (tag isnt 'TEXTAREA')
				element.setAttribute('tabindex', '0')
		return
	
	###*
	 * Increase a function on event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} typeEvent The type of event.
	 * @param {string} typeDataEvent The name of attribute that store the type of
	 * event fixed.
	 * @param {string} typeFix The id of fix method.
	 * @param {function} functionForEventHandler The function.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.addEventHandler
	###
	addEventHandler = (element, typeEvent, typeDataEvent, typeFix, functionForEventHandler) ->
		if not hasEvent(element, typeEvent, typeDataEvent, typeFix)
			found = false
			attribute = element.getAttribute(typeDataEvent)
			nativeElement = element.getData()
			if not hasEvent(element, typeEvent)
				nativeElement["liston#{typeEvent}"] = []
				nativeElement["on#{typeEvent}"] = (event) ->
					for addedEvent in nativeElement["liston#{typeEvent}"]
						addedEvent(event)
					return
			else
				found = __exports.hatemile.util.CommonFunctions.inList(attribute, typeFix)
			if not found
				nativeElement["liston#{typeEvent}"].push(functionForEventHandler)
				attribute = __exports.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix)
				element.setAttribute(typeDataEvent, attribute)
		return
	
	###*
	 * Check that the element has the event added by developer or fixed by
	 * HaTeMiLe.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} typeEvent The type of event.
	 * @param {string} typeDataEvent The custom attribute of type of event.
	 * @param {string} typeFix The id of fix method.
	 * @returns {boolean} True if the element has the event added by developer or
	 * fixed by HaTeMiLe or false if the element not has the event.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.hasEvent
	###
	hasEvent = (element, typeEvent, typeDataEvent, typeFix) ->
		nativeElement = element.getData()
		if isEmpty(typeDataEvent) or isEmpty(typeFix)
			return (not isEmpty(nativeElement["on#{typeEvent}"])) or ((not isEmpty(nativeElement.eventListenerList)) and (not isEmpty(nativeElement.eventListenerList[typeEvent])))
		else
			attribute = element.getAttribute(typeDataEvent)
			return (hasEvent(element, typeEvent) and (not element.hasAttribute(typeDataEvent))) or __exports.hatemile.util.CommonFunctions.inList(attribute, typeFix)
	
	###*
	 * Remove the information on attributes of drop effect of all elements.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.clearDropEffect
	###
	clearDropEffect = (parser) ->
		droppedElements = parser.find('[aria-dropeffect]').listResults()
		for droppedElement in droppedElements
			dragEvents = (not hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) and (not hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))
			activeEvents = (not droppedElement.hasAttribute(DATA_KEY_PRESS_ADDED)) and (not hasEvent(droppedElement, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT)) and (not hasEvent(droppedElement, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT))
			hoverEvents = (not hasEvent(droppedElement, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT)) and (not hasEvent(droppedElement, 'blur', DATA_BLUR_ADDED, HOVER_EVENT))
			
			droppedElement.setAttribute('aria-dropeffect', 'none')
			if droppedElement.hasAttribute('tabindex') and dragEvents and activeEvents and hoverEvents
				droppedElement.removeAttribute('tabindex')
		return
	
	###*
	 * Set in all droppable elements the information of the type of drop.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.generateDropEffect
	###
	generateDropEffect = (parser) ->
		dropEffect = __exports.__dragEventDataTransfer__.dropEffect
		effectAllowed = __exports.__dragEventDataTransfer__.effectAllowed
		if (dropEffect is 'none') or ((dropEffect isnt 'copy') and (dropEffect isnt 'link') and (dropEffect isnt 'move'))
			if (effectAllowed is 'copyLink') or (effectAllowed is 'copyMove') or (effectAllowed is 'linkMove') or (effectAllowed is 'all')
				ariaDropEffect = 'popup'
			else if (effectAllowed is 'copy') or (effectAllowed is 'move') or (effectAllowed is 'link')
				ariaDropEffect = effectAllowed
			else
				ariaDropEffect = 'move'
		else
			ariaDropEffect = dropEffect
		droppedElements = parser.find('[aria-dropeffect]').listResults()
		for droppedElement in droppedElements
			if hasEvent(droppedElement, 'drop')
				droppedElement.setAttribute('aria-dropeffect', ariaDropEffect)
			
			keyboardAccess(droppedElement)
		return
	
	###*
	 * Execute the event as mouse event in element.
	 * @param {string} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.executeMouseEvent
	###
	executeMouseEvent = (type, element, event) ->
		executeEvent(element, createMouseEvent(type, element, event))
		return
	
	###*
	 * Execute the event as drag event in element.
	 * @param {string} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.executeDragEvent
	###
	executeDragEvent = (type, element, event) ->
		if isEmpty(__exports.__dragEventDataTransfer__)
			__exports.__dragEventDataTransfer__ = {
				'files': null,
				'types': null,
				'effectAllowed': 'uninitialized',
				'dropEffect': 'none'
			}
			__exports.__dragEventDataTransfer__.setDragImage = () ->
				return
			__exports.__dragEventDataTransfer__.addElement = () ->
				return
			__exports.__dragEventDataTransfer__._data = {}
			__exports.__dragEventDataTransfer__.setData = (format, data) ->
				__exports.__dragEventDataTransfer__._data[format] = data
				return
			__exports.__dragEventDataTransfer__.getData = (format) ->
				return __exports.__dragEventDataTransfer__._data[format]
			__exports.__dragEventDataTransfer__.clearData = (format) ->
				if isEmpty(format)
					__exports.__dragEventDataTransfer__._data = {}
				else
					__exports.__dragEventDataTransfer__._data[format] = undefined
				return
			
		executeEvent(element, createDragEvent(type, element, event))
		return
	
	###*
	 * Execute the event in element.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.executeEvent
	###
	executeEvent = (element, event) ->
		nativeElement = element.getData()
		if hasEvent(element, event.type)
			handlerEvent = nativeElement["on#{event.type}"]
			if not isEmpty(handlerEvent)
				try
					handlerEvent.call(nativeElement, event)
				catch error
			if (not isEmpty(nativeElement.eventListenerList)) and (not isEmpty(nativeElement.eventListenerList[event.type]))
				for listenerEvent in nativeElement.eventListenerList[event.type]
					try
						listenerEvent.call(nativeElement, event)
					catch error
		return
	
	###*
	 * Create a proxy for original event, simulating the mouse event.
	 * @param {string} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @returns {object} The proxy of original event, simulating the mouse event.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.createMouseEvent
	###
	createMouseEvent = (type, element, event) ->
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
	
	###*
	 * Create a proxy for original event, simulating the drag event.
	 * @param {string} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @returns {object} The proxy of original event, simulating the drag event.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.createDragEvent
	###
	createDragEvent = (type, element, event) ->
		dragEvent = createMouseEvent(type, element, event)
		
		dragEvent.dataTransfer = __exports.__dragEventDataTransfer__
		return dragEvent
	
	###*
	 * Visit and execute a operation in element and descendants.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} condition The condition to execute operation in element
	 * and descendants.
	 * @param {hatemile.implementation.AccessibleEventImplementation} obj The
	 * object that be execute the operation.
	 * @param {function} operation The operation.
	 * @private
	 * @function hatemile.implementation.AccessibleEventImplementation.visit
	###
	visit = (element, condition, obj, operation) ->
		if not element.hasAttribute(DATA_IGNORE)
			if condition(element)
				operation.call(obj, element)
			
			children = element.getChildrenElements()
			for child in children
				visit(child, condition, obj, operation)
		return
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * Javascript events of elements of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @class The AccessibleEventImplementation class is official implementation
	 * of AccessibleEvent interface.
	 * @implements {hatemile.AccessibleEvent}
	 * @constructs hatemile.implementation.AccessibleEventImplementation
	###
	constructor: (@parser) ->
		@cancelDragAdded = false
	
	makeAccessibleDropEvents: (element) ->
		element.setAttribute('aria-dropeffect', 'none')
		parser = @parser
		
		addEventHandler(element, 'focus', DATA_FOCUS_ADDED, DROP_EVENT, (event) ->
			if not isEmpty(parser.find('[aria-grabbed="true"]').firstResult())
				executeDragEvent('dragenter', element, event)
				executeDragEvent('dragover', element, event)
				
				generateDropEffect(parser)
			return
		)
		addEventHandler(element, 'blur', DATA_BLUR_ADDED, DROP_EVENT, (event) ->
			if not isEmpty(parser.find('[aria-grabbed="true"]').firstResult())
				executeDragEvent('dragleave', element, event)
				
				generateDropEffect(parser)
			return
		)
		if (not hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT)) and (not hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT))
			addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DROP_EVENT, (event) ->
				if (isEnter(event.keyCode)) and (not element.hasAttribute(DATA_KEY_PRESSED)) and (not isEmpty(parser.find('[aria-grabbed=true]').firstResult()))
					element.setAttribute(DATA_KEY_PRESSED, 'true')
					
					if hasEvent(element, 'drop')
						grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
						for grabbedElement in grabbedElements
							grabbedElement.setAttribute('aria-grabbed', 'false')
							
							executeDragEvent('dragend', grabbedElement, event)
						
						clearDropEffect(parser)
					executeDragEvent('drop', element, event)
				return
			)
			addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DROP_EVENT, (event) ->
				element.removeAttribute(DATA_KEY_PRESSED)
				return
			)
		return
	
	makeAccessibleDragEvents: (element) ->
		keyboardAccess(element)
		
		element.setAttribute('aria-grabbed', 'false')
		parser = @parser
		if (not hasEvent(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT)) and (not hasEvent(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT))
			addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, DRAG_EVENT, (event) ->
				if (event.keyCode is ' '.charCodeAt(0)) and (not element.hasAttribute(DATA_KEY_PRESSED))
					grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
					for grabbedElement in grabbedElements
						grabbedElement.setAttribute('aria-grabbed', 'false')
						
						executeDragEvent('dragend', grabbedElement, event)
					
					element.setAttribute('aria-grabbed', 'true')
					element.setAttribute(DATA_KEY_PRESSED, 'true')
					
					executeDragEvent('dragstart', element, event)
					executeDragEvent('drag', element, event)
					
					generateDropEffect(parser)
				return
			)
			addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, DRAG_EVENT, (event) ->
				element.removeAttribute(DATA_KEY_PRESSED)
				return
			)
		if not @cancelDragAdded
			root = @parser.find('html').firstResult()
			addEventHandler(root, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, (event) ->
				if event.keyCode is 27
					grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
					for grabbedElement in grabbedElements
						grabbedElement.setAttribute('aria-grabbed', 'false')
						
						executeDragEvent('dragend', grabbedElement, event)
					
					clearDropEffect(parser)
				return
			)
			@cancelDragAdded = true
		return
	
	makeAccessibleAllDragandDropEvents: () ->
		body = @parser.find('body').firstResult()
		visit(body, (element) ->
			return (hasEvent(element, 'drag') or hasEvent(element, 'dragstart') or hasEvent(element, 'dragend'))
		, this, @makeAccessibleDragEvents)
		visit(body, (element) -> 
			return (hasEvent(element, 'drop') or hasEvent(element, 'dragenter') or hasEvent(element, 'dragleave') or hasEvent(element, 'dragover'))
		, this, @makeAccessibleDropEvents)
		return
	
	makeAccessibleHoverEvents: (element) ->
		keyboardAccess(element)
		
		addEventHandler(element, 'focus', DATA_FOCUS_ADDED, HOVER_EVENT, (event) ->
			executeMouseEvent('mouseover', element, event)
			return
		)
		addEventHandler(element, 'blur', DATA_BLUR_ADDED, HOVER_EVENT, (event) ->
			executeMouseEvent('mouseout', element, event)
			return
		)
		return
	
	makeAccessibleAllHoverEvents: () ->
		visit(@parser.find('body').firstResult(), (element) ->
			return (hasEvent(element, 'mouseover') or hasEvent(element, 'mouseout'))
		, this, @makeAccessibleHoverEvents)
		return
	
	makeAccessibleClickEvents: (element) ->
		keyboardAccess(element)
		
		tag = element.getTagName()
		typeButtons = ['submit', 'button', 'reset']
		if ((tag isnt 'INPUT') or (not element.hasAttribute('type')) or (typeButtons.indexOf(element.getAttribute('type').toLowerCase()) is -1)) and (tag isnt 'BUTTON') and (tag isnt 'A')
			addEventHandler(element, 'keypress', DATA_KEY_PRESS_ADDED, CLICK_EVENT, (event) ->
				if isEnter(event.keyCode)
					if hasEvent(element, 'click')
						executeMouseEvent('click', element, event)
					else if hasEvent(element, 'dblclick')
						executeMouseEvent('dblclick', element, event)
				return
			)
		addEventHandler(element, 'keyup', DATA_KEY_UP_ADDED, CLICK_EVENT, (event) ->
			if isEnter(event.keyCode)
				executeMouseEvent('mouseup', element, event)
			return
		)
		addEventHandler(element, 'keydown', DATA_KEY_DOWN_ADDED, CLICK_EVENT, (event) ->
			if isEnter(event.keyCode)
				executeMouseEvent('mousedown', element, event)
			return
		)
		return
	
	makeAccessibleAllClickEvents: () ->
		visit(@parser.find('body').firstResult(), (element) ->
			return (hasEvent(element, 'click') or hasEvent(element, 'mousedown') or hasEvent(element, 'mouseup') or hasEvent(element, 'dblclick'))
		, this, @makeAccessibleClickEvents)
		return