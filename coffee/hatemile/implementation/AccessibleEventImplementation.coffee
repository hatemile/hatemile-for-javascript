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
	
	###*
	 * Initializes a new object that manipulate the accessibility of the
	 * Javascript events of elements of parser.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	constructor: (@parser) ->
		@cancelDragAdded = false
		@dataIgnore = 'data-ignoreaccessibilityfix'
		@dataKeyPressed = 'data-keypressed'
		@dataKeyDownAdded = 'data-keydownadded'
		@dataKeyPressAdded = 'data-keypressadded'
		@dataKeyUpAdded = 'data-keyupadded'
		@dataFocusAdded = 'data-focusadded'
		@dataBlurAdded = 'data-bluradded'
		@active = 'active'
		@hover = 'hover'
		@drag = 'drag'
		@drop = 'drop'
	
	###*
	 * Returns if the key pressed is enter.
	 * @param {Number} keyCode The code of key pressed.
	 * @return {Boolean} True if the key pressed is enter or false if the key
	 * pressed isn't enter.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	enterPressed = (keyCode) ->
		enter1 = '\n'.charCodeAt(0)
		enter2 = '\r'.charCodeAt(0)
		return (keyCode is enter1) or (keyCode is enter2)
	
	###*
	 * Provide keyboard access for element, if it not has.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
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
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {String} typeEvent The name of type of event fixed.
	 * @param {String} typeDataEvent The name of attribute that store the type of
	 * event fixed.
	 * @param {String} typeFix The id of fix method.
	 * @param {Function} functionForEventHandler The function.
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
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {String} typeEvent The event.
	 * @param {String} typeDataEvent The data type of event.
	 * @param {String} typeFix The id of fix method.
	 * @return {Boolean} True if the element has the event added by developer or
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
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	clearDropEffect = (parser) ->
		droppedElements = parser.find('[aria-dropeffect]').listResults()
		for droppedElement in droppedElements
			dragEvents = (not hasEvent(droppedElement, 'keydown', @dataKeyDownAdded, @drag)) and (not hasEvent(droppedElement, 'keyup', @dataKeyUpAdded, @drag))
			activeEvents = (not droppedElement.hasAttribute(@dataKeyPressAdded)) and (not hasEvent(droppedElement, 'keydown', @dataKeyDownAdded, @active)) and (not hasEvent(droppedElement, 'keyup', @dataKeyUpAdded, @active))
			hoverEvents = (not hasEvent(droppedElement, 'focus', @dataFocusAdded, @hover)) and (not hasEvent(droppedElement, 'blur', @dataBlurAdded, @hover))
			
			droppedElement.setAttribute('aria-dropeffect', 'none')
			if droppedElement.hasAttribute('tabindex') and dragEvents and activeEvents and hoverEvents
				droppedElement.removeAttribute('tabindex')
		return
	
	###*
	 * Put in all droppable elements the information of the type of drop.
	 * @param {hatemile.util.HTMLDOMParser} parser The HTML parser.
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
	 * @param {String} type The type of event.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	executeMouseEvent = (type, element, event) ->
		executeEvent(element, createMouseEvent(type, element, event))
		return
	
	###*
	 * Execute the event as drag event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
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
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	executeEvent = (element, event) ->
		nativeElement = element.getData()
		if hasEvent(element, event.type)
			try
				if not isEmpty(nativeElement.dispatchEvent)
					nativeElement.dispatchEvent(event)
				else
					handlerEvent = nativeElement["on#{event.type}"]
					if not isEmpty(handlerEvent)
						handlerEvent(event)
					if (not isEmpty(nativeElement.eventListenerList)) and (not isEmpty(nativeElement.eventListenerList[event.type]))
						for listenerEvent in nativeElement.eventListenerList[event.type]
							listenerEvent(event)
			catch error
		return
	
	###*
	 * Create a proxy for original event, simulating the mouse event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @return {Object} The proxy of original event, simulating the mouse event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	createMouseEvent = (type, element, event) ->
		data = {
			'view': event.view,
			'bubbles': true,
			'cancelable': true,
			'target': element.getData(),
			'altKey': event.altKey,
			'ctrlKey': event.ctrlKey,
			'cancelBubble': false,
			'isTrusted': true,
			'metaKey': false,
			'shiftKey': event.shiftKey,
			'clientX': 0,
			'clientY': 0,
			'pageX': 0,
			'pageY': 0,
			'screenX': 0,
			'screenY': 0
		}
		if isEmpty(Event)
			mouseEvent = data
			mouseEvent.type = type
		else
			mouseEvent = new Event(type, data)
		
		mouseEvent.preventDefault = () ->
			event.preventDefault()
		
		mouseEvent.stopImmediatePropagation = () ->
			event.stopImmediatePropagation()
		
		mouseEvent.stopPropagation = () ->
			event.stopPropagation()
		
		return mouseEvent
	
	###*
	 * Create a proxy for original event, simulating the drag event.
	 * @param {String} type The type of event.
	 * @param {hatemile.util.HTMLDOMElement} element The element.
	 * @param {Function} event The original event.
	 * @return {Object} The proxy of original event, simulating the drag event.
	 * @memberof hatemile.implementation.AccessibleEventImplementation
	###
	createDragEvent = (type, element, event) ->
		dragEvent = createMouseEvent(type, element, event)
		
		dragEvent.dataTransfer = exports.__dragEventDataTransfer__
		return dragEvent
	
	fixDrop: (element) ->
		element.setAttribute('aria-dropeffect', 'none')
		parser = @parser
		
		addEventHandler(element, 'focus', @dataFocusAdded, @drop, (event) ->
			if not isEmpty(parser.find('[aria-grabbed="true"]').firstResult())
				executeDragEvent('dragenter', element, event)
				executeDragEvent('dragover', element, event)
				
				generateDropEffect(parser)
			return
		)
		addEventHandler(element, 'blur', @dataBlurAdded, @drop, (event) ->
			if not isEmpty(parser.find('[aria-grabbed="true"]').firstResult())
				executeDragEvent('dragleave', element, event)
				
				generateDropEffect(parser)
			return
		)
		if (not hasEvent(element, 'keydown', @dataKeyDownAdded, @drop)) and (not hasEvent(element, 'keyup', @dataKeyUpAdded, @drop))
			dataKeyPressed = @dataKeyPressed
			addEventHandler(element, 'keydown', @dataKeyDownAdded, @drop, (event) ->
				if (enterPressed(event.keyCode)) and (not element.hasAttribute(dataKeyPressed)) and (not isEmpty(parser.find('[aria-grabbed=true]').firstResult()))
					element.setAttribute(dataKeyPressed, 'true')
					
					if hasEvent(element, 'drop')
						grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
						for grabbedElement in grabbedElements
							grabbedElement.setAttribute('aria-grabbed', 'false')
							
							executeDragEvent('dragend', grabbedElement, event)
						
						clearDropEffect(parser)
					executeDragEvent('drop', element, event)
				return
			)
			addEventHandler(element, 'keyup', @dataKeyUpAdded, @drop, (event) ->
				element.removeAttribute(dataKeyPressed)
				return
			)
		return
	
	fixDrag: (element) ->
		keyboardAccess(element)
		
		element.setAttribute('aria-grabbed', 'false')
		parser = @parser
		if (not hasEvent(element, 'keydown', @dataKeyDownAdded, @drag)) and (not hasEvent(element, 'keyup', @dataKeyUpAdded, @drag))
			dataKeyPressed = @dataKeyPressed
			addEventHandler(element, 'keydown', @dataKeyDownAdded, @drag, (event) ->
				if (event.keyCode is ' '.charCodeAt(0)) and (not element.hasAttribute(dataKeyPressed))
					grabbedElements = parser.find('[aria-grabbed="true"]').listResults()
					for grabbedElement in grabbedElements
						grabbedElement.setAttribute('aria-grabbed', 'false')
						
						executeDragEvent('dragend', grabbedElement, event)
					
					element.setAttribute('aria-grabbed', 'true')
					element.setAttribute(dataKeyPressed, 'true')
					
					executeDragEvent('dragstart', element, event)
					executeDragEvent('drag', element, event)
					
					generateDropEffect(parser)
				return
			)
			addEventHandler(element, 'keyup', @dataKeyUpAdded, @drag, (event) ->
				element.removeAttribute(dataKeyPressed)
				return
			)
		if not @cancelDragAdded
			root = @parser.find('html').firstResult()
			addEventHandler(root, 'keypress', @dataKeyPressAdded, @active, (event) ->
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
	
	fixDragsandDrops: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			if not element.hasAttribute(@dataIgnore)
				if hasEvent(element, 'drag') or hasEvent(element, 'dragstart') or hasEvent(element, 'dragend')
					@fixDrag(element)
				if hasEvent(element, 'drop') or hasEvent(element, 'dragenter') or hasEvent(element, 'dragleave') or hasEvent(element, 'dragover')
					@fixDrop(element)
		return
	
	fixHover: (element) ->
		keyboardAccess(element)
		
		addEventHandler(element, 'focus', @dataFocusAdded, @hover, (event) ->
			executeMouseEvent('mouseover', element, event)
			return
		)
		addEventHandler(element, 'blur', @dataBlurAdded, @hover, (event) ->
			executeMouseEvent('mouseout', element, event)
			return
		)
		return
	
	fixHovers: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			if (not element.hasAttribute(@dataIgnore)) and (hasEvent(element, 'mouseover') or hasEvent(element, 'mouseout'))
				@fixHover(element)
		return
	
	fixActive: (element) ->
		keyboardAccess(element)
		
		tag = element.getTagName()
		typeButtons = ['submit', 'button', 'reset']
		if ((tag isnt 'INPUT') or (not element.hasAttribute('type')) or (typeButtons.indexOf(element.getAttribute('type').toLowerCase()) is -1)) and (tag isnt 'BUTTON') and (tag isnt 'A')
			addEventHandler(element, 'keypress', @dataKeyPressAdded, @active, (event) ->
				if enterPressed(event.keyCode)
					if hasEvent(element, 'click')
						executeMouseEvent('click', element, event)
					else if hasEvent(element, 'dblclick')
						executeMouseEvent('dblclick', element, event)
				return
			)
		addEventHandler(element, 'keyup', @dataKeyUpAdded, @active, (event) ->
			if enterPressed(event.keyCode)
				executeMouseEvent('mouseup', element, event)
			return
		)
		addEventHandler(element, 'keydown', @dataKeyDownAdded, @active, (event) ->
			if enterPressed(event.keyCode)
				executeMouseEvent('mousedown', element, event)
			return
		)
		return
	
	fixActives: () ->
		elements = @parser.find('body *').listResults()
		for element in elements
			if (not element.hasAttribute(@dataIgnore)) and (hasEvent(element, 'click') or hasEvent(element, 'mousedown') or hasEvent(element, 'mouseup') or hasEvent(element, 'dblclick'))
				@fixActive(element)
		return