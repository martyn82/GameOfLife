/**
 * ResultRenderer.js
 */

/**
 * @constructor
 * @param TestSuiteResult result
 * @param Document document
 */
function ResultRenderer(result, document) {
	this.result = result;
	this.doc = document;
};

/**
 * Renders the TestSuiteResult.
 *
 * @returns HTMLElement
 */
ResultRenderer.prototype.render = function () {
	var container = this.doc.createElement('div');
	container.setAttribute('class', 'testsuite');

	for (var i = 0; i < this.result.results.length; i++) {
		var testResult = this.renderTestCase(this.result.results[i]);
		container.appendChild(testResult);
	}

	return container;
};

/**
 * @param TestResult testCaseResult
 * @returns HTMLElement
 */
ResultRenderer.prototype.renderTestCase = function (testCaseResult) {
	var container = this.doc.createElement('div');
	container.setAttribute('class', 'testcase');

	var nameElement = this.doc.createElement('span');
	nameElement.setAttribute('class', 'testcasename');
	nameElement.appendChild(this.doc.createTextNode(testCaseResult.testCase));
	container.appendChild(nameElement);

	for (var i = 0; i < testCaseResult.tests.length; i++) {
		var test = this.renderTestResult(testCaseResult.tests[i]);
		container.appendChild(test);
	}

	return container;
};

/**
 * @param TestResult.Test testResult
 * @returns HTMLElement
 */
ResultRenderer.prototype.renderTestResult = function (testResult) {
	var container = this.doc.createElement('div');

	var nameElement = this.doc.createElement('span');
	nameElement.setAttribute('class', 'testname');
	nameElement.appendChild(this.doc.createTextNode(testResult.getName()));
	container.appendChild(nameElement);

	var stateName = '';
	switch (testResult.getState()) {
		case TestResult.Test.STATE_FAILED:
			stateName ='state-failure';
			break;

		case TestResult.Test.STATE_SUCCESS:
			stateName = 'state-success';
			break;

		case TestResult.Test.STATE_NOT_RUN:
			stateName = 'state-notrun';
			break;

		case TestResult.Test.STATE_SKIPPED:
			stateName = 'state-skip';
			break;

		case TestResult.Test.STATE_INCOMPLETE:
			stateName = 'state-incomplete';
			break;

		default:
			stateName = 'state-unknown';
			break;
	}

	container.setAttribute('class', 'testresult ' + stateName);

	var messages = testResult.getMessages();

	if (messages.length > 0) {
		var list = this.doc.createElement('dl');

		for (var i = 0; i < messages.length; i++) {
			var message = messages[i];

			var itemType = this.doc.createElement('dt');
			itemType.appendChild(this.doc.createTextNode(message.getAssertion()));

			var itemDesc = this.doc.createElement('dd');
			itemDesc.appendChild(this.doc.createTextNode(message.getMessage()));

			list.appendChild(itemType);
			list.appendChild(itemDesc);
		}

		container.appendChild(list);
	}

	var stats = this.doc.createElement('div');
	stats.setAttribute('class', 'teststats');
	stats.appendChild(this.doc.createTextNode(testResult.getAssertionCount() + ' assertion(s), ' + messages.length + ' failure(s)'));
	container.appendChild(stats);

	return container;
};