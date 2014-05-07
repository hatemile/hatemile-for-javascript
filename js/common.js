function isEmpty(value) {
	if ((value === undefined) ||
			(value === false) ||
			(value === null)) {
		return true;
	} else if ((typeof value === typeof "") ||
			(typeof value === typeof [])) {
		if (value.length === 0) {
			return true;
		}
	}
	return false;
}