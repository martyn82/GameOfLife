/**
 * Assert.js
 */

/**
 * Assert static class
 */
Assert = {
	/**
	 * @param {String} message
	 */
	onAssertionFailed: function (message) {},

	/**
	 * @param {String} name
	 */
	onAssertion: function (name) {},

	assertFalse: function (value) {
		Assert.onAssertion('assertFalse');

		if (false != value) {
			Assert.onAssertionFailed('Failed to assert that "' + value + '" is false.');
		}
	},

	assertTrue: function (value) {
		Assert.onAssertion('assertTrue');

		if (true != value) {
			Assert.onAssertionFailed('Failed to assert that "' + value + '" is true.');
		}
	},

	assertEmpty: function (value) {
		Assert.onAssertion('assertEmpty');

		if (value.length != 0) {
			Assert.onAssertionFailed('Failed to assert that "' + value + '" is empty.');
		}
	},

	assertEquals: function (x, y) {
		Assert.onAssertion('assertEquals');
		var errorMessage = 'Failed to assert that "' + y + '" is equal to "' + x + '".';

		if (!Assert.anyEquals(x, y)) {
			Assert.onAssertionFailed(errorMessage);
			return;
		}
	},

	anyEquals: function (a, b) {
		if (typeof a != typeof b) {
			return false;
		}

		if (typeof a == 'object') {
			if (a.constructor.name == 'Array') {
				return Assert.arrayEquals(a, b);
			}

			return Assert.objectEquals(a, b);
		}

		return a === b;
	},

	objectEquals: function (a, b) {
		for (var px in a) {
			if (!b[px] || !Assert.anyEquals(a[px], b[px])) {
				return false;
			}
		}

		for (var py in b) {
			if (!a[py] || !Assert.anyEquals(a[py], b[py])) {
				return false;
			}
		}

		return true;
	},

	arrayEquals: function (a, b) {
		if (a.length != b.length) {
			return false;
		}

		for (var i = 0; i < a.length; i++) {
			if (!Assert.anyEquals(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}
};
