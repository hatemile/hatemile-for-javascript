@isEmpty = (value) ->
	if (value is undefined) or (value is false) or (value is null)
		return true
	else if (typeof value is typeof '') or (typeof value is typeof [])
		if value.length is 0
			return true
	return false
