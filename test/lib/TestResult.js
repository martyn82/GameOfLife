/**
 * TestResult.js
 */

/*! TestResult class */

/**
 * @constructor
 * @param TestCase testCase
 * @param TestResult.Test[] tests
 */
function TestResult(testCase, tests) {
	this.testCase = testCase;
	this.tests = tests;
};

/**
 * @returns TestCase
 */
TestResult.prototype.getTestCase = function () {
	return this.testCase;
};

/**
 * @returns TestResult.Test[]
 */
TestResult.prototype.getTests = function () {
	return this.tests;
};

/*! TestResult.Test class */

/**
 * @constructor
 * @param {String} name
 * @param {Number} assertionCount
 * @param {Number} state
 * @param TestResult.Message[] messages
 */
TestResult.Test = function Test(name, assertionCount, state, messages) {
	this.name = name || '';
	this.assertionCount = assertionCount || 0;
	this.state = state || TestResult.Test.STATE_NOT_RUN;
	this.messages = messages || [];
};

TestResult.Test.STATE_NOT_RUN = 0;
TestResult.Test.STATE_SUCCESS = 1;
TestResult.Test.STATE_FAILED = 2;
TestResult.Test.STATE_SKIPPED = 3;
TestResult.Test.STATE_INCOMPLETE = 4;

/**
 * @returns {String}
 */
TestResult.Test.prototype.getName = function () {
	return this.name;
};

/**
 * @returns {Number}
 */
TestResult.Test.prototype.getState = function () {
	return this.state;
};

/**
 * @returns TestResult.Message[]
 */
TestResult.Test.prototype.getMessages = function () {
	return this.messages;
};

/**
 * @returns {Number}
 */
TestResult.Test.prototype.getAssertionCount = function () {
	return this.assertionCount;
};

/*! TestResult.Message class */

/**
 * @constructor
 * @param {String} assertion
 * @param {String} message
 */
TestResult.Message = function Message(assertion, message) {
	this.assertion = assertion;
	this.message = message;
};

/**
 * @returns {String}
 */
TestResult.Message.prototype.getAssertion = function () {
	return this.assertion;
};

/**
 * @returns {String}
 */
TestResult.Message.prototype.getMessage = function () {
	return this.message;
};
