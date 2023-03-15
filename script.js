document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const imagePicker = document.getElementById('image-picker');
    const tiles = [];

    function createTiles() {
        for (let i = 0; i < 15; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('click', onTileClick);
            tiles.push(tile);
            gameBoard.appendChild(tile);
        }

        const emptyTile = document.createElement('div');
        emptyTile.className = 'tile empty';
        emptyTile.style.backgroundColor = 'lightblue';
        tiles.push(emptyTile);
        gameBoard.appendChild(emptyTile);
    }

    function onTileClick(event) {
        const clickedTile = event.target;
        if (clickedTile.classList.contains('empty')) {
            return;
        }

        const emptyTile = document.querySelector('.empty');
        const clickedTileRect = clickedTile.getBoundingClientRect();
        const emptyTileRect = emptyTile.getBoundingClientRect();
        const isAdjacent = Math.abs(clickedTileRect.left - emptyTileRect.left) + Math.abs(clickedTileRect.top - emptyTileRect.top) === clickedTileRect.width || Math.abs(clickedTileRect.left - emptyTileRect.left) + Math.abs(clickedTileRect.top - emptyTileRect.top) === clickedTileRect.height;

        if (isAdjacent) {
            const tempStyle = clickedTile.getAttribute('style');
            clickedTile.setAttribute('style', emptyTile.getAttribute('style'));
            emptyTile.setAttribute('style', tempStyle);
            emptyTile.style.backgroundColor = 'lightblue';
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

            positions.splice(Math.floor(Math.random() * positions.length), 1);

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


