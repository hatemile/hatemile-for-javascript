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
exports = this

###*
 * @namespace hatemile
###
exports.hatemile or= {}

###*
 * @namespace implementation
 * @memberof hatemile
###
exports.hatemile.implementation or= {}

###*
 * @class AccessibleEventImplementation
 * @classdesc The AccessibleEventImplementation class is official implementation
 * of AccessibleEvent interface.
 * @extends hatemile.AccessibleEvent
 * @memberof hatemile.implementation
###
class exports.hatemile.implementation.AccessibleEventImplementation
	
	DATA_IGNORE = 'data-ignoreaccessibilityfix'
	_dataKeyPressed = 'data-keypressed'
	_dataKeyDownAdded = 'data-keydownadded'
	_dataKeyPressAdded = 'data-keypressadded'
	_dataKeyUpAdded = 'data-keyupadded'
	_dataFocusAdded = 'data-focusadded'
	_dataBlurAdded = 'data-bluradded'
	_active = 'active'
	_hover = 'hover'
	_drag = 'drag'
	_drop = 'drop'
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * Javascript events of elements of parser.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	constructor: (@parser) ->
		@cancelDragAdded = false
	
	###*
	 * Returns if the key pressed is enter.
	 * @param {number} keyCode The code of key pressed.
	 * @return {boolean} True if the key pressed is enter or false if the key
	 * pressed isn't enter.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	isEnter = (keyCode) ->
		enter1 = '\n'.charCodeAt(0)
		enter2 = '\r'.charCodeAt(0)
		return (keyCode is enter1) or (keyCode is enter2)
	
	###*
	 * Provide keyboard access for element, if it not has.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
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
	 * @param {string} typeEvent The name of type of event fixed.
	 * @param {string} typeDataEvent The name of attribute that store the type of
	 * event fixed.
	 * @param {string} typeFix The id of fix method.
	 * @param {function} functionForEventHandler The function.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
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
				found = exports.hatemile.util.CommonFunctions.inList(attribute, typeFix)
			if not found
				nativeElement["liston#{typeEvent}"].push(functionForEventHandler)
				attribute = exports.hatemile.util.CommonFunctions.increaseInList(attribute, typeFix)
				element.setAttribute(typeDataEvent, attribute)
		return
	
	###*
	 * Returns if the element has the event added by developer or fixed by
	 * HaTeMiLe.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {string} typeEvent The event.
	 * @param {string} typeDataEvent The data type of event.
	 * @param {string} typeFix The id of fix method.
	 * @return {boolean} True if the element has the event added by developer or
	 * fixed by HaTeMiLe or false if the element not has the event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	hasEvent = (element, typeEvent, typeDataEvent, typeFix) ->
		nativeElement = element.getData()
		if isEmpty(typeDataEvent) or isEmpty(typeFix)
			return (not isEmpty(nativeElement["on#{typeEvent}"])) or ((not isEmpty(nativeElement.eventListenerList)) and (not isEmpty(nativeElement.eventListenerList[typeEvent])))
		else
			attribute = element.getAttribute(typeDataEvent)
			return (hasEvent(element, typeEvent) and (not element.hasAttribute(typeDataEvent))) or exports.hatemile.util.CommonFunctions.inList(attribute, typeFix)
	
	###*
	 * Remove the information on attributes of drop effect.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	clearDropEffect = (parser) ->
		droppedElements = parser.find('[aria-dropeffect]').listResults()
		for droppedElement in droppedElements
			dragEvents = (not hasEvent(droppedElement, 'keydown', _dataKeyDownAdded, _drag)) and (not hasEvent(droppedElement, 'keyup', _dataKeyUpAdded, _drag))
			activeEvents = (not droppedElement.hasAttribute(_dataKeyPressAdded)) and (not hasEvent(droppedElement, 'keydown', _dataKeyDownAdded, _active)) and (not hasEvent(droppedElement, 'keyup', _dataKeyUpAdded, _active))
			hoverEvents = (not hasEvent(droppedElement, 'focus', _dataFocusAdded, _hover)) and (not hasEvent(droppedElement, 'blur', _dataBlurAdded, _hover))
			
			droppedElement.setAttribute('aria-dropeffect', 'none')
			if droppedElement.hasAttribute('tabindex') and dragEvents and activeEvents and hoverEvents
				droppedElement.removeAttribute('tabindex')
		return
	
	###*
	 * Put in all droppable elements the information of the type of drop.
	 * @param {hatemile.util.html.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	generateDropEffect = (parser) ->
		dropEffect = exports.__dragEventDataTransfer__.dropEffect
		effectAllowed = exports.__dragEventDataTransfer__.effectAllowed
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
	 * Execute the event as mouse event.
	 * @param {string} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	executeMouseEvent = (type, element, event) ->
		executeEvent(element, createMouseEvent(type, element, event))
		return
	
	###*
	 * Execute the event as drag event.
	 * @param {string} type The type of event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	executeDragEvent = (type, element, event) ->
		if isEmpty(exports.__dragEventDataTransfer__)
			exports.__dragEventDataTransfer__ = {
				'files': null,
				'types': null,
				'effectAllowed': 'uninitialized',
				'dropEffect': 'none'
			}
			exports.__dragEventDataTransfer__.setDragImage = () ->
				return
			exports.__dragEventDataTransfer__.addElement = () ->
				return
			exports.__dragEventDataTransfer__._data = {}
			exports.__dragEventDataTransfer__.setData = (format, data) ->
				exports.__dragEventDataTransfer__._data[format] = data
				return
			exports.__dragEventDataTransfer__.getData = (format) ->
				return exports.__dragEventDataTransfer__._data[format]
			exports.__dragEventDataTransfer__.clearData = (format) ->
				if isEmpty(format)
					exports.__dragEventDataTransfer__._data = {}
				else
					exports.__dragEventDataTransfer__._data[format] = undefined
				return
			
		executeEvent(element, createDragEvent(type, element, event))
		return
	
	###*
	 * Execute the event.
	 * @param {hatemile.util.html.HTMLDOMElement} element The element.
	 * @param {function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
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
	 * @return {object} The proxy of original event, simulating the mouse event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
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
	 * @return {object} The proxy of original event, simulating the drag event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	createDragEvent = (type, element, event) ->
		dragEvent = createMouseEvent(type, element, event)
		
		dragEvent.dataTransfer = exports.__dragEventDataTransfer__
		return dragEvent
	
	visit = (element, condition, operation) ->
		if not element.hasAttribute(DATA_IGNORE)
			if condition(element)
				operation(element)
			
			children = element.getChildrenElements()
			for child in children
				visit(child, condition, operation)
		return
	
	fixDrop: (element) ->
		element.setAttribute('aria-dropeffect', 'none')
		parser = @parser
		
		addEventHandler(element, 'focus', _dataFocusAdded, _drop, (event) ->
			if not isEmpty(parser.find('[aria-grabbed="true"]').firstResult())
				executeDragEvent('dragenter', element, event)
				executeDragEvent('dragover', element, event)
				
				generateDropEffect(parser)
			return
		)
		addEventHandler(element, 'blur', _dataBlurAdded, _drop, (event) ->
			if not isEmpty(parser.find('[aria-grabbed="true"]').firstResult())
				executeDragEvent('dragleave', element, event)
				
				generateDropEffect(parser)
			return
		)
		if (not hasEvent(element, 'keydown', _dataKeyDownAdded, _drop)) and (not hasEvent(element, 'keyup', _dataKeyUpAdded, _drop))
			addEventHandler(element, 'keydown', _dataKeyDownAdded, _drop, (event) ->
				if (isEnter(event.keyCode)) and (not element.hasAttribute(_dataKeyPressed)) and (not isEmpty(parser.find('[aria-grabbed=true]').firstResult()))
					element.setAttribute(_dataKeyPressed, 'true')
					
					if hasEvent(element, 'drop')
						grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
						for grabbedElement in grabbedElements
							grabbedElement.setAttribute('aria-grabbed', 'false')
							
							executeDragEvent('dragend', grabbedElement, event)
						
						clearDropEffect(parser)
					executeDragEvent('drop', element, event)
				return
			)
			addEventHandler(element, 'keyup', _dataKeyUpAdded, _drop, (event) ->
				element.removeAttribute(_dataKeyPressed)
				return
			)
		return
	
	fixDrag: (element) ->
		keyboardAccess(element)
		
		element.setAttribute('aria-grabbed', 'false')
		parser = @parser
		if (not hasEvent(element, 'keydown', _dataKeyDownAdded, _drag)) and (not hasEvent(element, 'keyup', _dataKeyUpAdded, _drag))
			addEventHandler(element, 'keydown', _dataKeyDownAdded, _drag, (event) ->
				if (event.keyCode is ' '.charCodeAt(0)) and (not element.hasAttribute(_dataKeyPressed))
					grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
					for grabbedElement in grabbedElements
						grabbedElement.setAttribute('aria-grabbed', 'false')
						
						executeDragEvent('dragend', grabbedElement, event)
					
					element.setAttribute('aria-grabbed', 'true')
					element.setAttribute(_dataKeyPressed, 'true')
					
					executeDragEvent('dragstart', element, event)
					executeDragEvent('drag', element, event)
					
					generateDropEffect(parser)
				return
			)
			addEventHandler(element, 'keyup', _dataKeyUpAdded, _drag, (event) ->
				element.removeAttribute(_dataKeyPressed)
				return
			)
		if not @cancelDragAdded
			root = @parser.find('html').firstResult()
			addEventHandler(root, 'keypress', _dataKeyPressAdded, _active, (event) ->
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
	
	fixAllDragsandDrops: () ->
		body = @parser.find('body').firstResult()
		visit(body, (element) ->
			return (hasEvent(element, 'drag') or hasEvent(element, 'dragstart') or hasEvent(element, 'dragend'))
		, @fixDrag)
		visit(body, (element) -> 
			return (hasEvent(element, 'drop') or hasEvent(element, 'dragenter') or hasEvent(element, 'dragleave') or hasEvent(element, 'dragover'))
		, @fixDrop)
		return
	
	fixHover: (element) ->
		keyboardAccess(element)
		
		addEventHandler(element, 'focus', _dataFocusAdded, _hover, (event) ->
			executeMouseEvent('mouseover', element, event)
			return
		)
		addEventHandler(element, 'blur', _dataBlurAdded, _hover, (event) ->
			executeMouseEvent('mouseout', element, event)
			return
		)
		return
	
	fixAllHovers: () ->
		visit(@parser.find('body').firstResult(), (element) ->
			return (hasEvent(element, 'mouseover') or hasEvent(element, 'mouseout'))
		, @fixHover)
		return
	
	fixActive: (element) ->
		keyboardAccess(element)
		
		tag = element.getTagName()
		typeButtons = ['submit', 'button', 'reset']
		if ((tag isnt 'INPUT') or (not element.hasAttribute('type')) or (typeButtons.indexOf(element.getAttribute('type').toLowerCase()) is -1)) and (tag isnt 'BUTTON') and (tag isnt 'A')
			addEventHandler(element, 'keypress', _dataKeyPressAdded, _active, (event) ->
				if isEnter(event.keyCode)
					if hasEvent(element, 'click')
						executeMouseEvent('click', element, event)
					else if hasEvent(element, 'dblclick')
						executeMouseEvent('dblclick', element, event)
				return
			)
		addEventHandler(element, 'keyup', _dataKeyUpAdded, _active, (event) ->
			if isEnter(event.keyCode)
				executeMouseEvent('mouseup', element, event)
			return
		)
		addEventHandler(element, 'keydown', _dataKeyDownAdded, _active, (event) ->
			if isEnter(event.keyCode)
				executeMouseEvent('mousedown', element, event)
			return
		)
		return
	
	fixAllActives: () ->
		visit(@parser.find('body').firstResult(), (element) ->
			return (hasEvent(element, 'click') or hasEvent(element, 'mousedown') or hasEvent(element, 'mouseup') or hasEvent(element, 'dblclick'))
		, @fixActive)
		return