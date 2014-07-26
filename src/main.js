/**
 * main.js
 */

var ROOT = '';

/**
 * @param {Array} fileNames
 * @param {Function} callback
 */
function load(fileNames, callback) {
	if (typeof fileNames == 'string') {
		fileNames = [fileNames];
	}

	callback = callback || function () {};
	var loaded = [];

	for (var i = 0; i < fileNames.length; i++) {
		var fileName = fileNames[i];
		var dependency = document.createElement('script');

		dependency.onload = function () {
			loaded.push(fileName);

			if (loaded.length == fileNames.length) {
				callback.call(this, fileNames);
			}
		};

		dependency.setAttribute('type', 'text/javascript');
		dependency.setAttribute('src', fileName);

		document.body.appendChild(dependency);
	}
}

/**
 * @param {Array} classNames
 * @param {Function} callback
 */
function include(classNames, callback) {
	callback = callback || function() {};

	if (typeof classNames == 'string') {
		classNames = [classNames];
	}

	var loaded = [];

	for (var i = 0; i < classNames.length; i++) {
		var className = classNames[i];
		var fileName = ROOT + 'src/' + classNames[i] + '.js';

		load(fileName, function () {
			loaded.push(className);

			if (loaded.length == classNames.length) {
				callback.call(this, classNames);
			}
		});
	}
}

include(['Grid', 'Renderer', 'Game'], function () {
	var seed = [
		{x: 1, y: 3},
		{x: 2, y: 3},
		{x: 3, y: 3},
		{x: 3, y: 2},
		{x: 2, y: 1},

		{x: 1, y: 13},
		{x: 2, y: 13},
		{x: 3, y: 13},
		{x: 3, y: 12},
		{x: 2, y: 11},

		{x: 1, y: 23},
		{x: 2, y: 23},
		{x: 3, y: 23},
		{x: 3, y: 22},
		{x: 2, y: 21}
	];

	var gridSize = {width: 100, height: 100};
	var grid = new Grid(gridSize.height, gridSize.width);
	grid.setSeed(seed);

	var renderer = new Renderer(document.getElementById('canvas'), gridSize);
	var game = new Game(grid, renderer, window.requestAnimationFrame);
	game.loop();
});