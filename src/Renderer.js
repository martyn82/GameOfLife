/**
 * Renderer.js
 */

/**
 * @constructor
 * @param Canvas canvas
 * @param {Object} size
 */
function Renderer(canvas, size) {
	this.canvas = canvas;
	this.cellSize = 15;
	this.canvas.height = size.height * this.cellSize;
	this.canvas.width = size.width * this.cellSize;
	this.context = this.canvas.getContext('2d');
};

/**
 * Renders the grid.
 * @param Grid grid
 */
Renderer.prototype.render = function (grid) {
	for (var i = 0; i < grid.rows; i++) {
		for (var j = 0; j < grid.cols; j++) {
			this.renderCell(grid, {x: i, y: j});
		}
	}
};

/**
 * Renders the grid only.
 * @param Grid grid
 * @param {Object} cell
 */
Renderer.prototype.renderCell = function (grid, cell) {
	this.context.strokeStyle = '#ccc';
	this.context.lineWidth = 1;

	var cellX = (cell.x * this.cellSize);
	var cellY = (cell.y * this.cellSize);

	this.context.strokeRect(cellX, cellY, this.cellSize, this.cellSize);

	if (!grid.getCellState(cell)) {
		return;
	}

	this.context.fillStyle = '#000';
	this.context.fillRect(cellX, cellY, this.cellSize, this.cellSize);
};

/**
 * Clears the canvas.
 */
Renderer.prototype.clear = function () {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
