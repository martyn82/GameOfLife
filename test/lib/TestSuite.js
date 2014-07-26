/**
 * TestSuite.js
 */

/**
 * @constructor
 */
function TestSuite() {
	this.testCases = [];
};

/**
 * Registers a test case for running.
 *
 * @param TestCase testCase
 */
TestSuite.prototype.register = function (testCase) {
	this.testCases.push(testCase);
};

/**
 * Runs all registered tests.
 *
 * @returns TestSuiteResult
 */
TestSuite.prototype.run = function () {
	var results = [];

	for (var i = 0; i < this.testCases.length; i++) {
		results.push(this.testCases[i].run());
	}

	return new TestSuiteResult(results);
};