document.addEventListener('DOMContentLoaded', () => {
    let game, grid, controls;
    let currentSpeed = 200;

    // Populate pattern dropdown
    const patternSelect = document.getElementById('patternSelect');
    for (const name in window.PATTERNS) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        patternSelect.appendChild(option);
    }
    patternSelect.value = 'Glider';

    /**
     * Center a pattern within the grid.
     * @param {Array<Array<number>>} pattern - The pattern to center.
     * @param {number} rows - Number of grid rows.
     * @param {number} cols - Number of grid columns.
     * @returns {Array<number>} Offset [row, col] to center the pattern.
     */
    function centerPattern(pattern, rows, cols) {
        // Find pattern bounds
        let maxRow = 0, maxCol = 0;
        for (const [r, c] of pattern) {
            if (r > maxRow) maxRow = r;
            if (c > maxCol) maxCol = c;
        }
        const offsetRow = Math.floor((rows - maxRow - 1) / 2);
        const offsetCol = Math.floor((cols - maxCol - 1) / 2);
        return [offsetRow, offsetCol];
    }

    /**
     * Initialize the game, grid, and controls with the given size and pattern.
     * @param {number} rows - Number of grid rows.
     * @param {number} cols - Number of grid columns.
     * @param {string} patternName - Name of the pattern to initialize.
     */
    function initializeGame(rows, cols, patternName) {
        game = new window.GameOfLife(rows, cols);
        grid = new window.Grid(game, 'grid');
        controls = new window.Controls(game, grid, currentSpeed);
        // Place pattern in center
        if (patternName && window.PATTERNS[patternName]) {
            const [offsetRow, offsetCol] = centerPattern(window.PATTERNS[patternName], rows, cols);
            game.placePattern(window.PATTERNS[patternName], offsetRow, offsetCol);
        }
        grid.update();
    }

    // Grid size selection
    const gridSizeSelect = document.getElementById('gridSize');
    gridSizeSelect.addEventListener('change', () => {
        const size = parseInt(gridSizeSelect.value);
        if (controls) controls.stopAndReset();
        patternSelect.value = 'Glider';
        initializeGame(size, size, 'Glider');
    });

    // Pattern selection
    patternSelect.addEventListener('change', () => {
        const size = parseInt(gridSizeSelect.value);
        if (controls) controls.stopAndReset();
        initializeGame(size, size, patternSelect.value);
    });

    // Speed control
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');
    // Reverse the speed logic: higher value = faster
    const minSpeed = parseInt(speedRange.min); // 50
    const maxSpeed = parseInt(speedRange.max); // 500
    function getIntervalFromSlider(val) {
        // Map slider value (min-max) to interval (max-min)
        return maxSpeed + minSpeed - val;
    }
    speedRange.addEventListener('input', () => {
        currentSpeed = getIntervalFromSlider(parseInt(speedRange.value));
        const gensPerSecond = Math.round(1000 / currentSpeed);
        speedValue.textContent = `${gensPerSecond} gen/s`;
        if (controls) controls.setSpeed(currentSpeed);
    });
    // Set initial speed display
    currentSpeed = getIntervalFromSlider(parseInt(speedRange.value));
    speedValue.textContent = `${Math.round(1000 / currentSpeed)} gen/s`;

    // Initial game setup
    initializeGame(40, 40, 'Glider');
}); 