function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const imagePicker = document.getElementById('image-picker');
    const tiles = [];
    let emptyIndex = 15;

    function createTiles() {
        for (let i = 0; i < 15; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('mousedown', onMouseDown);
            tiles.push(tile);
            gameBoard.appendChild(tile);
        }
        gameBoard.appendChild(document.createElement('div'));
    }

    function onMouseDown(event) {
        const draggedTile = event.target;
        const tileIndex = tiles.indexOf(draggedTile);

        function isTileAdjacent() {
            return Math.abs(emptyIndex - tileIndex) === 1 || Math.abs(emptyIndex - tileIndex) === 4;
        }

        function onMouseMove(event) {
            draggedTile.style.left = `${event.clientX - draggedTile.offsetWidth / 2}px`;
            draggedTile.style.top = `${event.clientY - draggedTile.offsetHeight / 2}px`;
        }

        function onMouseUp() {
            if (isTileAdjacent()) {
                gameBoard.insertBefore(draggedTile, gameBoard.children[emptyIndex]);
                tiles[emptyIndex] = draggedTile;
                tiles[tileIndex] = null;
                emptyIndex = tileIndex;
            }
            draggedTile.style.left = '';
            draggedTile.style.top = '';

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        if (isTileAdjacent()) {
            draggedTile.style.position = 'absolute';
            draggedTile.style.zIndex = '1000';

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
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
            emptyIndex = Math.floor(Math.random() * positions.length);
            positions.splice(emptyIndex, 1);

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


