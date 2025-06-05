window.Grid = class Grid {
    constructor(game, containerId) {
        this.game = game;
        this.container = document.getElementById(containerId);
        this.cells = [];
        this.init();
    }

    init() {
        this.container.style.gridTemplateColumns = `repeat(${this.game.cols}, 20px)`;
        this.createCells();
    }

    createCells() {
        this.container.innerHTML = '';
        this.cells = [];

        for (let row = 0; row < this.game.rows; row++) {
            for (let col = 0; col < this.game.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener('click', () => {
                    if (!this.game.isRunning) {
                        this.game.toggleCell(row, col);
                        this.update();
                    }
                });
                cell.addEventListener('mouseover', () => {
                    cell.classList.add('cell-hover');
                });
                cell.addEventListener('mouseout', () => {
                    cell.classList.remove('cell-hover');
                });

                this.container.appendChild(cell);
                this.cells.push(cell);
            }
        }
    }

    update() {
        this.cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.classList.toggle('alive', this.game.grid[row][col]);
        });
        // Only update the generation counter if it increased
        const genElem = document.getElementById('generation');
        if (genElem) {
            if (!this.lastGen || this.game.generation > this.lastGen) {
                genElem.textContent = this.game.generation;
                this.lastGen = this.game.generation;
            }
        }
    }
}; 