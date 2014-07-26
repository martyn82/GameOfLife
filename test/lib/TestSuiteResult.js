/**
 * TestSuiteResult.js
 */

/**
 * @constructor
 * @param TestResult[] results
 */
function TestSuiteResult(results) {
	this.results = results;
};

/**
 * @returns TestResult[]
 */
TestSuiteResult.prototype.getResults = function () {
	return this.results;
};
