if isEmpty(Element.prototype.eventListenerList)
	Element.prototype.eventListenerList = {}
	Element.prototype.__eventListenerListAdded = false
	
	Element.prototype.__addEventListener = Element.prototype.addEventListener
	Element.prototype.addEventListener = () ->
		if not @__eventListenerListAdded
			@eventListenerList = {}
			@__eventListenerListAdded = true
		if isEmpty(@eventListenerList[arguments[0]])
			@eventListenerList[arguments[0]] = []
		@eventListenerList[arguments[0]].push(arguments[1])
		return (@__addEventListener.apply(this, arguments))
	
	Element.prototype.__removeEventListener = Element.prototype.removeEventListener
	Element.prototype.removeEventListener = () ->
		found = false
		if isEmpty(@eventListenerList[arguments[0]])
			@eventListenerList[arguments[0]] = []
		for key in @eventListenerList[arguments[0]]
			found = @eventListenerList[arguments[0]][key] is arguments[1]
			if found
				break
		if found
			@eventListenerList[arguments[0]].splice(key, 1)
		return (@__removeEventListener.apply(this, arguments))