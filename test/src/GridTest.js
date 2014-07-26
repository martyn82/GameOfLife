/**
 * GridTest.js
 */

/**
 * @constructor
 */
function GridTest() {};

GridTest.prototype = new TestCase(GridTest);

/**
 * @test
 */
GridTest.prototype.testDefaultGrid = function () {
	var grid = new Grid(4, 8);

	var expected = [
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false]
	];

	var actual = grid.toArray();
	Assert.assertEquals(expected, actual);
};

/**
 * @test
 */
GridTest.prototype.testGetCellState = function () {
	var grid = new Grid(4, 8);
	var actual = grid.getCellState({x: 0, y: 0});

	Assert.assertFalse(actual);
};

/**
 * @test
 */
GridTest.prototype.testSetCellState = function () {
	var grid = new Grid(4, 8);
	var cell = {x: 0, y: 0};
	grid.setCellState(cell, true);

	var actual = grid.getCellState(cell);
	Assert.assertTrue(actual);
};

/**
 * @test
 */
GridTest.prototype.testSetCellStateOutOfBoundsIsIdempotent = function () {
	var grid = new Grid(4, 8);
	var cell = {x: -1, y: -1};

	grid.setCellState(cell, true);
	Assert.assertFalse(grid.getCellState(cell));

	cell = {x: 4, y: 8};
	grid.setCellState(cell, true);
	Assert.assertFalse(grid.getCellState(cell));
};

/**
 * @test
 */
GridTest.prototype.testSeedGrid = function () {
	var grid = new Grid(4, 8);
	var seed = [
		{x: 1, y: 4},
		{x: 2, y: 3},
		{x: 2, y: 4}
	];

	grid.setSeed(seed);

	/*
		. . . . . . . .
		. . . . x . . .
		. . . x x . . .
		. . . . . . . .
	 */
	var expected = [
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, true, false, false, false],
		[false, false, false, true, true, false, false, false],
		[false, false, false, false, false, false, false, false]
	];

	var actual = grid.toArray();
	Assert.assertEquals(expected, actual);
};

/**
 * @test
 */
GridTest.prototype.testGetAliveNeighboursForCellReturnsEmptyListIfNone = function () {
	var grid = new Grid(4, 8);
	Assert.assertEmpty(grid.getAliveNeighbours({x: 0, y: 0}));
};

/**
 * @test
 */
GridTest.prototype.testGetAliveNeighboursForCellShouldReturnEmptyList = function () {
	var grid = new Grid(4, 8);
	grid.setCellState({x: 1, y: 4}, true);
	Assert.assertEmpty(grid.getAliveNeighbours({x: 1, y: 4}));
};

/**
 * @test
 */
GridTest.prototype.testGetAliveNeighboursForCellShouldReturnTwoCells = function () {
	var grid = new Grid(4, 8);
	grid.setCellState({x: 1, y: 4}, true);
	grid.setCellState({x: 2, y: 3}, true);
	grid.setCellState({x: 2, y: 4}, true);

	var actual = grid.getAliveNeighbours({x: 2, y: 4});
	var expected = [
		{x: 1, y: 4},
		{x: 2, y: 3}
	];

	Assert.assertEquals(expected, actual);
};

/**
 * @test
 */
GridTest.prototype.testLiveCellWithLessThanTwoNeighboursDies = function () {
	var grid = new Grid(4, 8);
	grid.setCellState({x: 0, y: 0}, true);
	Assert.assertFalse(grid.cellCanLive({x: 0, y: 0}));

	grid.setCellState({x: 0, y: 1}, true);
	Assert.assertFalse(grid.cellCanLive({x: 0, y: 0}));
};

/**
 * @test
 */
GridTest.prototype.testLiveCellWithMoreThanThreeNeighboursDies = function () {
	var grid = new Grid(4, 8);

	grid.setCellState({x: 1, y: 1}, true);

	grid.setCellState({x: 0, y: 0}, true);
	grid.setCellState({x: 0, y: 1}, true);
	grid.setCellState({x: 1, y: 0}, true);
	grid.setCellState({x: 2, y: 0}, true);
	grid.setCellState({x: 2, y: 1}, true);
	grid.setCellState({x: 2, y: 2}, true);
	grid.setCellState({x: 0, y: 2}, true);
	grid.setCellState({x: 1, y: 2}, true);

	var neighbours = grid.getAliveNeighbours({x: 1, y: 1});
	Assert.assertEquals(8, neighbours.length);

	while (neighbours.length > 3) {
		Assert.assertFalse(grid.cellCanLive({x: 1, y: 1}));
		grid.setCellState(neighbours[0], false);
		neighbours = grid.getAliveNeighbours({x: 1, y: 1});
	}
};

/**
 * @test
 */
GridTest.prototype.testLiveCellWithExactlyTwoNeighboursLives = function () {
	var grid = new Grid(4, 8);

	grid.setCellState({x: 1, y: 1}, true);

	grid.setCellState({x: 0, y: 0}, true);
	grid.setCellState({x: 0, y: 1}, true);

	Assert.assertTrue(grid.cellCanLive({x: 1, y: 1}));
};

/**
 * @test
 */
GridTest.prototype.testLiveCellWithExactlyThreeNeighboursLives = function () {
	var grid = new Grid(4, 8);

	grid.setCellState({x: 1, y: 1}, true);

	grid.setCellState({x: 0, y: 0}, true);
	grid.setCellState({x: 0, y: 1}, true);
	grid.setCellState({x: 1, y: 0}, true);

	Assert.assertTrue(grid.cellCanLive({x: 1, y: 1}));
};

/**
 * @test
 */
GridTest.prototype.testDeadCellWithExactlyThreeNeighboursLives = function () {
	var grid = new Grid(4, 8);

	grid.setCellState({x: 1, y: 1}, false);

	grid.setCellState({x: 0, y: 0}, true);
	grid.setCellState({x: 0, y: 1}, true);
	grid.setCellState({x: 1, y: 0}, true);

	Assert.assertTrue(grid.cellCanLive({x: 1, y: 1}));
};

/**
 * @test
 */
GridTest.prototype.testDeadCellWithNotThreeNeighboursDies = function () {
	var grid = new Grid(4, 8);

	grid.setCellState({x: 1, y: 1}, false);

	grid.setCellState({x: 0, y: 1}, true);
	grid.setCellState({x: 1, y: 0}, true);

	Assert.assertFalse(grid.cellCanLive({x: 1, y: 1}));
};

/**
 * @test
 */
GridTest.prototype.testUpdateWillChangeGridToNextGeneration = function () {
	var grid = new Grid(4, 8);

	/*
		. . . . . . . .
		. . . . x . . .
		. . . x x . . .
		. . . . . . . .
	*/
	var seed = [
		{x: 1, y: 4},
		{x: 2, y: 3},
		{x: 2, y: 4}
	];

	grid.setSeed(seed);
	grid.update();

	/*
		. . . . . . . .
		. . . x x . . .
		. . . x x . . .
		. . . . . . . .
	*/
	var expected = [
		[false, false, false, false, false, false, false, false],
		[false, false, false, true, true, false, false, false],
		[false, false, false, true, true, false, false, false],
		[false, false, false, false, false, false, false, false]
	];

	var actual = grid.toArray();

	Assert.assertEquals(expected, actual);
};
