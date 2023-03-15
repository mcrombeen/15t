document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const tiles = [];

    function createTiles() {
        for (let i = 1; i <= 15; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = i;
            tile.addEventListener('click', moveTile);
            tiles.push(tile);
            gameBoard.appendChild(tile);
        }
        gameBoard.appendChild(document.createElement('div'));
    }

    function moveTile() {
        const emptyIndex = tiles.findIndex(tile => !tile.parentNode);
        const tileIndex = tiles.indexOf(this);

        if (Math.abs(emptyIndex - tileIndex) === 1 || Math.abs(emptyIndex - tileIndex) === 4) {
            gameBoard.insertBefore(this, gameBoard.children[emptyIndex]);
        }
    }

    createTiles();
});

