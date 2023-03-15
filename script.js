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

    function createTiles() {
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('click', onTileClick);
            tiles.push(tile);
            gameBoard.appendChild(tile);
        }
    }

    function onTileClick(event) {
        const clickedTile = event.target;
        if (clickedTile.classList.contains('empty-tile')) return; // Ignore click on the blue tile

        const tileIndex = tiles.indexOf(clickedTile);
        const emptyTile = tiles.find((tile) => tile.classList.contains('empty-tile'));
        const emptyIndex = tiles.indexOf(emptyTile);

        function isTileAdjacent() {
            return Math.abs(emptyIndex - tileIndex) === 1 || Math.abs(emptyIndex - tileIndex) === 4;
        }

        if (isTileAdjacent()) {
            const tempStyle = clickedTile.getAttribute('style');
            clickedTile.setAttribute('style', emptyTile.getAttribute('style'));
            emptyTile.setAttribute('style', tempStyle);
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

            // Remove one of the positions for the empty space and set the blue background
            const emptyIndex = Math.floor(Math.random() * positions.length);
            positions.splice(emptyIndex, 1);
            tiles[emptyIndex].classList.add('empty-tile');
            tiles[emptyIndex].style.backgroundColor = 'lightblue';

            shuffleArray(positions);

            for (let i = 0, j = 0; i < 16; i++) {
                if (i !== emptyIndex) {
                    tiles[i].style.backgroundImage = `url('${imageSrc}')`;
                    tiles[i].style.backgroundSize = `${tempImage.width}px ${tempImage.height}px`;
                    tiles[i].style.backgroundPosition = `-${positions[j].x}px -${positions[j].y}px`;
                    j++;
                }
            }
        };
    }

    createTiles();
    imagePicker.addEventListener('change', handleImageSelection);
});

