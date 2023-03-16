document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const imagePicker = document.getElementById('image-picker');
    const tiles = [];

    const defaultImageURL = 'https://raw.githubusercontent.com/mcrombeen/15t/main/oie_oie_canvas.png'; // Replace this with your default image URL

    const btnImagePicker = document.getElementById('btn-image-picker');
    const hiddenImagePicker = document.createElement('input');
    hiddenImagePicker.type = 'file';
    hiddenImagePicker.accept = 'image/*';
    hiddenImagePicker.style.display = 'none';
    hiddenImagePicker.addEventListener('change', handleImageSelection);
    document.body.appendChild(hiddenImagePicker);

    btnImagePicker.addEventListener('click', () => {
        hiddenImagePicker.click();
    });

    function createTiles() {
        for (let i = 0; i < 15; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.addEventListener('click', handleTileClick);
            tiles.push(tile);
            gameBoard.appendChild(tile);
        }
        const yellowTile = document.createElement('div');
        yellowTile.className = 'tile yellow-tile';
        yellowTile.style.backgroundImage = "url('https://raw.githubusercontent.com/mcrombeen/15t/main/test1/oie_oie_canvas.png')"; // Replace this path with the path to your yellow tile image
        yellowTile.style.backgroundSize = 'cover';
        gameBoard.appendChild(yellowTile);
    }

    function handleTileClick(event) {
        const clickedTile = event.target;
        const yellowTile = document.querySelector('.yellow-tile');
        if (isAdjacent(clickedTile, yellowTile)) {
            swapTiles(clickedTile, yellowTile);
        }
    }

    function isAdjacent(tile1, tile2) {
        const index1 = Array.prototype.indexOf.call(gameBoard.children, tile1);
        const index2 = Array.prototype.indexOf.call(gameBoard.children, tile2);
        return Math.abs(index1 - index2) === 1 || Math.abs(index1 - index2) === 4;
    }

    function swapTiles(tile1, tile2) {
        const tile1Rect = tile1.getBoundingClientRect();
        const tile2Rect = tile2.getBoundingClientRect();

        const tile1Index = Array.prototype.indexOf.call(gameBoard.children, tile1);
        const tile2Index = Array.prototype.indexOf.call(gameBoard.children, tile2);

        const dx = (tile2Index % 4 - tile1Index % 4) * (tile1Rect.width + 5);
        const dy = (Math.floor(tile2Index / 4) - Math.floor(tile1Index / 4)) * (tile1Rect.height + 5);

        tile1.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${dx}px, ${dy}px)` }
        ], {
            duration: 300,
            fill: 'forwards'
        });

        tile2.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${-dx}px, ${-dy}px)` }
        ], {
            duration: 300,
            fill: 'forwards'
        });

        // Allow time for the animation to complete before updating the DOM
        setTimeout(() => {
            const temp = document.createElement('div');
            gameBoard.insertBefore(temp, tile1);
            gameBoard.insertBefore(tile1, tile2);
            gameBoard.insertBefore(tile2, temp);
            gameBoard.removeChild(temp);

            // Clear the transform after the swap
            tile1.style.transform = '';
            tile2.style.transform = '';

        }, 300);
    }

    function handleImageSelection() {
        const file = hiddenImagePicker.files[0];
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

            shuffleArray(positions);

            for (let i = 0; i < 15; i++) {
                tiles[i].style.backgroundImage = `url('${imageSrc}')`;
                tiles[i].style.backgroundSize = `${tempImage.width}px ${tempImage.height}px`;
                tiles[i].style.backgroundPosition = `-${positions[i].x}px -${positions[i].y}px`;
            }

            const gameBoardBackground = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${imageSrc}')`;
            gameBoard.style.backgroundImage = gameBoardBackground;
            gameBoard.style.backgroundSize = 'cover';
        };
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    createTiles();
    applyUserImage(defaultImageURL);
    imagePicker.addEventListener('change', handleImageSelection);
});

