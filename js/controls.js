window.Controls = class Controls {
    constructor(game, grid, speed = 200) {
        this.game = game;
        this.grid = grid;
        this.intervalId = null;
        this.speed = speed;
        this.init();
    }

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

    start() {
        if (!this.game.isRunning) {
            this.game.isRunning = true;
            this.runInterval();
            this.updateButtonStates();
        }
    }

    runInterval() {
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.game.nextGeneration();
            this.grid.update();
        }, this.speed);
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
        if (this.game.isRunning) {
            this.runInterval();
        }
    }

    stop() {
        if (this.game.isRunning) {
            this.game.isRunning = false;
            clearInterval(this.intervalId);
            this.updateButtonStates();
        }
    }

    stopAndReset() {
        this.stop();
        this.game.generation = 0;
        this.grid.lastGen = 0;
        document.getElementById('generation').textContent = 0;
    }

    clear() {
        this.stopAndReset();
        this.game.clear();
        this.grid.update();
    }

    randomize() {
        this.stopAndReset();
        this.game.randomize();
        this.grid.update();
    }

    updateButtonStates() {
        this.startBtn.disabled = this.game.isRunning;
        this.stopBtn.disabled = !this.game.isRunning;
        this.clearBtn.disabled = this.game.isRunning;
        this.randomBtn.disabled = this.game.isRunning;
    }

    saveState() {
        const state = {
            grid: this.game.grid,
            generation: this.game.generation,
            rows: this.game.rows,
            cols: this.game.cols
        };
        localStorage.setItem('gameOfLifeState', JSON.stringify(state));
    }

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

    wireSaveRestoreButtons() {
        const saveBtn = document.getElementById('saveBtn');
        const restoreBtn = document.getElementById('restoreBtn');
        if (saveBtn) saveBtn.onclick = () => this.saveState();
        if (restoreBtn) restoreBtn.onclick = () => this.restoreState();
    }
} 