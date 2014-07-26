/**
 * TestCase.js
 */

/**
 * @constructor
 * @param Function testCase
 */
function TestCase(testCase) {
	this.testName = testCase.name;
	this.testPrefix = 'test';

	/**
	 * @param {String} name
	 * @returns TestResult.Test
	 */
	this.runTest = function (name) {
		var currentAssertionName = '';
		var assertionCount = 0;
		var messages = [];

		Assert.onAssertion = function (name) {
			currentAssertionName = name;
			assertionCount++;
		};
		Assert.onAssertionFailed = function (message) {
			messages.push(new TestResult.Message(currentAssertionName, message));
		};

		this[name].call(this);

		var testState = TestResult.Test.STATE_SUCCESS;

		if (assertionCount == 0) {
			testState = TestResult.Test.STATE_INCOMPLETE;
			messages.push(new TestResult.Message(currentAssertionName, 'The test did not perform any assertions.'));
		}
		else if (messages.length > 0) {
			testState = TestResult.Test.STATE_FAILED;
		}

		return new TestResult.Test(name, assertionCount, testState, messages);
	};
};

/**
 * Runs the test.
 */
TestCase.prototype.run = function() {
	var results = [];

	for(var p in this) {
		if (
			typeof this[p] != 'function'
			|| p.substring(0, this.testPrefix.length) != this.testPrefix
		) {
			continue;
		}

		var result = this.runTest(p);
		results.push(result);
	}

	return new TestResult(this.testName, results);
};
