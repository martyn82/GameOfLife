/**
 * Game.js
 */

/**
 * @param Grid grid
 * @param Renderer renderer
 * @param {Function} queueFunction
 */
function Game(grid, renderer, queueFunction) {
	this.grid = grid;
	this.renderer = renderer;
	this.queueFunction = queueFunction || function () {/* noop */};
};

/**
 * Runs the game loop.
 */
Game.prototype.loop = function () {
	this.clear();
	this.draw();
	this.update();
	this.queue();
};

/**
 */
Game.prototype.queue = function () {
	var self = this;
	this.queueFunction.call(window, function () { self.loop(); });
};

/**
 */
Game.prototype.update = function () {
	this.grid.update();
};

/**
 */
Game.prototype.draw = function () {
	this.renderer.render(this.grid);
};

/**
 */
Game.prototype.clear = function () {
	this.renderer.clear();
};