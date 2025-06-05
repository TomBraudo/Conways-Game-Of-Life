/**
 * Class responsible for handling user controls and simulation state.
 * @class
 */
window.Controls = class Controls {
    /**
     * Create a new Controls instance.
     * @param {GameOfLife} game - The GameOfLife instance.
     * @param {Grid} grid - The Grid instance.
     * @param {number} [speed=200] - Simulation speed in ms.
     */
    constructor(game, grid, speed = 200) {
        this.game = game;
        this.grid = grid;
        this.intervalId = null;
        this.speed = speed;
        this.init();
    }

    /**
     * Initialize control buttons and event listeners.
     */
    init() {
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.randomBtn = document.getElementById('randomBtn');
        this.wireSaveRestoreButtons();

        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.clearBtn.addEventListener('click', () => this.clear());
        this.randomBtn.addEventListener('click', () => this.randomize());

        this.updateButtonStates();
    }

    /**
     * Start the simulation.
     */
    start() {
        if (!this.game.isRunning) {
            this.game.isRunning = true;
            this.runInterval();
            this.updateButtonStates();
        }
    }

    /**
     * Start the simulation interval.
     */
    runInterval() {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.game.nextGeneration();
            this.grid.update();
        }, this.speed);
    }

    /**
     * Set the simulation speed.
     * @param {number} newSpeed - New interval in ms.
     */
    setSpeed(newSpeed) {
        this.speed = newSpeed;
        if (this.game.isRunning) {
            this.runInterval();
        }
    }

    /**
     * Stop the simulation.
     */
    stop() {
        if (this.game.isRunning) {
            this.game.isRunning = false;
            clearInterval(this.intervalId);
            this.updateButtonStates();
        }
    }

    /**
     * Stop the simulation and reset generation count.
     */
    stopAndReset() {
        this.stop();
        this.game.generation = 0;
        this.grid.lastGen = 0;
        document.getElementById('generation').textContent = 0;
    }

    /**
     * Clear the grid and reset the simulation.
     */
    clear() {
        this.stopAndReset();
        this.game.clear();
        this.grid.update();
    }

    /**
     * Randomize the grid and reset the simulation.
     */
    randomize() {
        this.stopAndReset();
        this.game.randomize();
        this.grid.update();
    }

    /**
     * Update the enabled/disabled state of control buttons.
     */
    updateButtonStates() {
        this.startBtn.disabled = this.game.isRunning;
        this.stopBtn.disabled = !this.game.isRunning;
        this.clearBtn.disabled = this.game.isRunning;
        this.randomBtn.disabled = this.game.isRunning;
    }

    /**
     * Show a temporary status message by changing the save button appearance.
     * @param {string} message - The message to display on the button.
     */
    showStatusMessage(message) {
        const saveBtn = document.getElementById('saveBtn');
        if (!saveBtn) return;
        const originalText = saveBtn.textContent;
        saveBtn.textContent = message;
        saveBtn.classList.add('save-success');
        saveBtn.disabled = true;
        setTimeout(() => {
            saveBtn.classList.remove('save-success');
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }, 1200);
    }

    /**
     * Save the current game state to localStorage.
     */
    saveState() {
        const state = {
            grid: this.game.grid,
            generation: this.game.generation,
            rows: this.game.rows,
            cols: this.game.cols
        };
        localStorage.setItem('gameOfLifeState', JSON.stringify(state));
        this.showStatusMessage('State saved!');
    }

    /**
     * Restore the game state from localStorage.
     */
    restoreState() {
        const stateStr = localStorage.getItem('gameOfLifeState');
        if (!stateStr) return;
        try {
            const state = JSON.parse(stateStr);
            if (state.grid && state.rows && state.cols) {
                this.game.rows = state.rows;
                this.game.cols = state.cols;
                this.game.grid = state.grid;
                this.game.generation = state.generation || 0;
                this.grid.lastGen = this.game.generation;
                this.grid.init();
                this.grid.update();
                document.getElementById('generation').textContent = this.game.generation;
            }
        } catch (e) {
            // ignore
        }
    }

    /**
     * Wire up the save and restore buttons.
     */
    wireSaveRestoreButtons() {
        const saveBtn = document.getElementById('saveBtn');
        const restoreBtn = document.getElementById('restoreBtn');
        if (saveBtn) saveBtn.onclick = () => this.saveState();
        if (restoreBtn) restoreBtn.onclick = () => this.restoreState();
    }
} 