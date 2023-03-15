document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const imagePicker = document.getElementById('image-picker');
    const tiles = [];

    function createTiles() {
        for (let i = 0; i < 15; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('mousedown', startDragging);
            tile.addEventListener('dragstart', (e) => e.preventDefault());
            tiles.push(tile);
            gameBoard.appendChild(tile);
        }
        gameBoard.appendChild(document.createElement('div'));
    }

    function startDragging(event) {
        const draggedTile = event.target;
        const emptyTile = gameBoard.children[15];

        function isTileAdjacent() {
            const emptyIndex = Array.prototype.indexOf.call(gameBoard.children, emptyTile);
            const tileIndex = Array.prototype.indexOf.call(gameBoard.children, draggedTile);
            return Math.abs(emptyIndex - tileIndex) === 1 || Math.abs(emptyIndex - tileIndex) === 4;
        }

        function moveTile() {
            if (isTileAdjacent()) {
                gameBoard.insertBefore(draggedTile, gameBoard.children[Array.prototype.indexOf.call(gameBoard.children, emptyTile)]);
            }
        }

        draggedTile.addEventListener('mouseup', () => {
            moveTile();
            draggedTile.removeEventListener('mouseup', moveTile);
        });
    }

    function handleImageSelection() {
        const file = imagePicker.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            applyUserImage(reader.result);
        };
    }

    function applyUserImage(imageSrc) {
        const tempImage = new Image();
        tempImage.src = imageSrc;
        tempImage.onload = () => {
            const tileSize = tempImage.width / 4;
            const positions = [];

            for (let i = 0; i < 16; i++) {
                positions.push({
                    x: (i % 4) * tileSize,
                    y: Math.floor(i / 4) * tileSize
                });
            }

            // Remove one of the positions for the empty space
            positions.splice(Math.floor(Math.random() * positions.length), 1);

            shuffleArray(positions);

            for (let i = 0; i < 15; i++) {
                tiles[i].style.backgroundImage = `url('${imageSrc}')`;
                tiles[i].style.backgroundSize = `${tempImage.width}px ${tempImage.height}px`;
                tiles[i].style.backgroundPosition = `-${positions[i].x}px -${positions[i].y}px`;
            }
        };
    }

    createTiles();
    imagePicker.addEventListener('change', handleImageSelection);
});
  

