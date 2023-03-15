document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const imagePicker = document.getElementById('image-picker');
    const applyImagesButton = document.getElementById('apply-images');
    const tiles = [];

    function createTiles() {
        for (let i = 0; i < 15; i++) {
            const tile = document.createElement('img');
            tile.className = 'tile';
            
            tile.style.objectPosition = '0 0';
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

    function handleImageSelection() {
        const file = imagePicker.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            applyImagesButton.disabled = false;
            applyUserImage(reader.result);
        };
    }

    function applyUserImage(imageSrc) {
        const tempImage = new Image();
        tempImage.src = imageSrc;
        tempImage.onload = () => {
            const tileSize = tempImage.width / 4;
            for (let i = 0; i < 15; i++) {
                tiles[i].src = imageSrc;
                tiles[i].width = tileSize;
                tiles[i].height = tileSize;
                tiles[i].style.objectPosition = `-${(i % 4) * tileSize}px -${Math.floor(i / 4) * tileSize}px`;
            }
        };
    }

    createTiles();

    imagePicker.addEventListener('change', handleImageSelection);
});
