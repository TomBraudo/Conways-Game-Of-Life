/**
 * Class representing Conway's Game of Life logic and state.
 * @class
 */
window.GameOfLife = class GameOfLife {
    /**
     * Create a new Game of Life instance.
     * @param {number} [rows=40] - Number of rows in the grid.
     * @param {number} [cols=40] - Number of columns in the grid.
     */
    constructor(rows = 40, cols = 40) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createEmptyGrid();
        this.generation = 0;
        this.isRunning = false;
    }

    /**
     * Create an empty grid.
     * @returns {boolean[][]} 2D array representing the grid.
     */
    createEmptyGrid() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    }

    /**
     * Randomize the grid with alive and dead cells.
     */
    randomize() {
        this.grid = this.grid.map(row => 
            row.map(() => Math.random() > 0.7)
        );
        this.generation = 0;
    }

    /**
     * Clear the grid (all cells dead).
     */
    clear() {
        this.grid = this.createEmptyGrid();
        this.generation = 0;
    }

    /**
     * Get the state of a cell.
     * @param {number} row - Row index.
     * @param {number} col - Column index.
     * @returns {boolean} True if cell is alive, false otherwise.
     */
    getCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return false;
        }
        return this.grid[row][col];
    }

    /**
     * Count the number of alive neighbors for a cell.
     * @param {number} row - Row index.
     * @param {number} col - Column index.
     * @returns {number} Number of alive neighbors.
     */
    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                if (this.getCell(row + i, col + j)) {
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * Advance the game by one generation.
     */
    nextGeneration() {
        const newGrid = this.createEmptyGrid();
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col);
                const isAlive = this.grid[row][col];

                if (isAlive && (neighbors === 2 || neighbors === 3)) {
                    newGrid[row][col] = true;
                } else if (!isAlive && neighbors === 3) {
                    newGrid[row][col] = true;
                }
            }
        }

        this.grid = newGrid;
        this.generation++;
    }

    /**
     * Toggle the state of a cell (alive/dead).
     * @param {number} row - Row index.
     * @param {number} col - Column index.
     */
    toggleCell(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.grid[row][col] = !this.grid[row][col];
        }
    }

    /**
     * Place a pattern on the grid at a given offset.
     * @param {Array<Array<number>>} pattern - Array of [row, col] pairs.
     * @param {number} [offsetRow=0] - Row offset.
     * @param {number} [offsetCol=0] - Column offset.
     */
    placePattern(pattern, offsetRow = 0, offsetCol = 0) {
        for (const [r, c] of pattern) {
            const row = offsetRow + r;
            const col = offsetCol + c;
            if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
                this.grid[row][col] = true;
            }
        }
    }
};

/**
 * Predefined patterns for the Game of Life.
 * @type {Object.<string, Array<Array<number>>>}
 */
window.PATTERNS = {
    'Glider': [
        [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
    ],
    'Block': [
        [0, 0], [0, 1], [1, 0], [1, 1]
    ],
    'Bee-hive': [
        [0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2]
    ],
    'Loaf': [
        [0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 3], [3, 2]
    ],
    'Boat': [
        [0, 0], [0, 1], [1, 0], [1, 2], [2, 1]
    ],
    'Tub': [
        [0, 1], [1, 0], [1, 2], [2, 1]
    ],
    'Blinker': [
        [0, 1], [1, 1], [2, 1]
    ],
    'Toad': [
        [1, 0], [1, 1], [1, 2], [0, 1], [0, 2], [0, 3]
    ],
    'Beacon': [
        [0, 0], [0, 1], [1, 0], [2, 3], [3, 2], [3, 3]
    ],
    'Pulsar': [
        [2, 4],[2, 5],[2, 6],[2, 10],[2, 11],[2, 12],
        [4, 2],[4, 7],[4, 9],[4, 14],
        [5, 2],[5, 7],[5, 9],[5, 14],
        [6, 2],[6, 7],[6, 9],[6, 14],
        [7, 4],[7, 5],[7, 6],[7, 10],[7, 11],[7, 12],
        [9, 4],[9, 5],[9, 6],[9, 10],[9, 11],[9, 12],
        [10, 2],[10, 7],[10, 9],[10, 14],
        [11, 2],[11, 7],[11, 9],[11, 14],
        [12, 2],[12, 7],[12, 9],[12, 14],
        [14, 4],[14, 5],[14, 6],[14, 10],[14, 11],[14, 12]
    ],
    'Pentadecathlon': [
        [2, 3],[2, 4],[2, 5],[2, 6],[2, 7],[2, 8],[2, 9],[2, 10],
        [1, 4],[1, 9],[3, 4],[3, 9]
    ],
    'LWSS': [
        [0, 1],[0, 4],[1, 0],[2, 0],[3, 0],[3, 4],[4, 0],[4, 1],[4, 2],[4, 3]
    ],
    'MWSS': [
        [0, 1],[0, 2],[0, 3],[0, 4],[1, 0],[2, 0],[3, 0],[3, 4],[4, 0],[4, 3]
    ],
    'HWSS': [
        [0, 1],[0, 2],[0, 3],[0, 4],[0, 5],[1, 0],[2, 0],[3, 0],[3, 5],[4, 0],[4, 4]
    ]
}; 