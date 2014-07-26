/**
 * test.js
 */

var ROOT = 'test/';

console = console || {
	info: function () {},
	log: function () {},
	error: function () {},
	warn: function () {}
};

(function () {
	load([ROOT + 'lib/Assert.js',
		ROOT + 'lib/TestResult.js',
		ROOT + 'lib/TestCase.js',
		ROOT + 'lib/TestSuiteResult.js',
		ROOT + 'lib/TestSuite.js',
		ROOT + 'lib/ResultRenderer.js'],
		function () {
			var testClasses = ['GridTest'];

			include(testClasses, function (testClasses) {
				var runner = new TestSuite();

				for (var i = 0; i < testClasses.length; i++) {
					var instance = new window[testClasses[i]]();
					runner.register(instance);
				}

				var result = runner.run();

				var renderer = new ResultRenderer(result, document);
				var fragment = renderer.render();

				document.getElementById('results').appendChild(fragment);
			});
		}
	);
})();
