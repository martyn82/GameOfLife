/**
 * Grid.js
 */

/**
 * @constructor
 */
function Grid(rows, columns) {
	this.grid = [];

	/**
	 * @returns {Array}
	 */
	this.createGrid = function () {
		var grid = [];

		for (var i = 0; i < this.rows; i++) {
			grid.push([]);

			for(var j = 0; j < this.cols; j++) {
				grid[i].push(false);
			}
		}

		return grid;
	};

	this.rows = rows;
	this.cols = columns;
	this.grid = this.createGrid();

	/**
	 * @param {Object} cell
	 * @returns {Boolean}
	 */
	this.isWithinBounds = function (cell) {
		if (
			cell.x < 0
			|| cell.y < 0
			|| cell.x >= this.rows
			|| cell.y >= this.cols
		) {
			return false;
		}

		return true;
	};
};

/**
 * @returns {Array}
 */
Grid.prototype.toArray = function () {
	return this.grid;
};

/**
 * @param {Object} cell
 * @returns {Boolean}
 */
Grid.prototype.getCellState = function (cell) {
	if (!this.isWithinBounds(cell)) {
		return false;
	}

	return this.grid[cell.x][cell.y];
};

/**
 * @param {Object} cell
 * @param {Boolean} state
 */
Grid.prototype.setCellState = function (cell, state) {
	if (!this.isWithinBounds(cell)) {
		return;
	}

	this.grid[cell.x][cell.y] = state;
};

/**
 * @param {Array} seed
 */
Grid.prototype.setSeed = function (seed) {
	for (var i = 0; i < seed.length; i++) {
		this.setCellState(seed[i], true);
	}
};

/**
 * @param {Object} cell
 * @returns {Array}
 */
Grid.prototype.getAliveNeighbours = function (cell) {
	var x = cell.x;
	var y = cell.y;

	var neighbours = [];

	for (var i = x - 1; i < x + 2; i++) {
		for (var j = y - 1; j < y + 2; j++) {
			if (i == x && j == y) {
				continue;
			}

			var neighbour = {x: i, y: j};

			if (this.getCellState(neighbour)) {
				neighbours.push(neighbour);
			}
		}
	}

	return neighbours;
};

/**
 * @param {Object} cell
 * @returns {Boolean}
 */
Grid.prototype.cellCanLive = function (cell) {
	var neighbours = this.getAliveNeighbours(cell);
	var isAlive = this.getCellState(cell);

	if (isAlive && neighbours.length < 2) {
		return false;
	}

	if (isAlive && (neighbours.length == 2 || neighbours.length == 3)) {
		return true;
	}

	if (isAlive && neighbours.length > 3) {
		return false;
	}

	if (!isAlive && neighbours.length == 3) {
		return true;
	}

	return false;
};

/**
 */
Grid.prototype.update = function () {
	var newGrid = this.createGrid();

	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			newGrid[i][j] = this.cellCanLive({x: i, y: j});
		}
	}

	this.grid = newGrid;
};
