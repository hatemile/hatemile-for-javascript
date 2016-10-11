var isEmpty;

isEmpty = function(value) {
	if ((value === void 0) || (value === false) || (value === null)) {
		return true;
	} else if ((typeof value === typeof '') || (typeof value === typeof [])) {
		if (value.length === 0) {
			return true;
		}
	}
	return false;
};
