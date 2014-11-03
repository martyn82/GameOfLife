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
	function random (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	var gridSize = {width: 50, height: 50};
	var grid = new Grid(gridSize.height, gridSize.width);

	for (var i = 0; i < gridSize.width; i++) {
		for (var j = 0; j < gridSize.height; j++) {
			if (random(0, 1) == 1) {
				grid.setCellState({x: i, y:j}, true);
			}
		}
	}

	var renderer = new Renderer(document.getElementById('canvas'), gridSize);
	var game = new Game(grid, renderer, window.requestAnimationFrame);
	game.loop();
});