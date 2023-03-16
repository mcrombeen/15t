document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const imagePicker = document.getElementById('image-picker');
    const tiles = [];

    const presetImages = ['assets/1.jpg', 'assets/2.jpg'];

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
            animateSwapTiles(clickedTile, yellowTile);
        }
    }

    function isAdjacent(tile1, tile2) {
        const index1 = Array.prototype.indexOf.call(gameBoard.children, tile1);
        const index2 = Array.prototype.indexOf.call(gameBoard.children, tile2);
        return Math.abs(index1 - index2) === 1 || Math.abs(index1 - index2) === 4;
    }

    function animateSwapTiles(tile1, tile2) {
        const tile1Rect = tile1.getBoundingClientRect();
        const tile2Rect = tile2.getBoundingClientRect();

        const tile1Clone = tile1.cloneNode(true);
        const tile2Clone = tile2.cloneNode(true);

        tile1.style.visibility = 'hidden';
        tile2.style.visibility = 'hidden';

        tile1Clone.style.position = 'absolute';
        tile1Clone.style.left = tile1Rect.left + 'px';
        tile1Clone.style.top = tile1Rect.top + 'px';

        tile2Clone.style.position = 'absolute';
        tile2Clone.style.left = tile2Rect.left + 'px';
        tile2Clone.style.top = tile2Rect.top + 'px';

        document.body.appendChild(tile1Clone);
        document.body.appendChild(tile2Clone);

        const deltaX = tile1Rect.left - tile2Rect.left;
        const deltaY = tile1Rect.top - tile2Rect.top;

        requestAnimationFrame(() => {
            tile1Clone.style.transition = 'transform 300ms';
            tile2Clone.style.transition = 'transform 300ms';

            tile1Clone.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
            tile2Clone.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            setTimeout(() => {
                swapTiles(tile1, tile2);
                tile1.style.visibility = 'visible';
                tile2.style.visibility = 'visible';

                document.body.removeChild(tile1Clone);
                document.body.removeChild(tile2Clone);
            },300);
        });
    }

    function swapTiles(tile1, tile2) {
        const temp = document.createElement('div');
        gameBoard.insertBefore(temp, tile1);
        gameBoard.insertBefore(tile1, tile2);
        gameBoard.insertBefore(tile2, temp);
        gameBoard.removeChild(temp);
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

    function loadRandomPresetImage() {
        const randomIndex = Math.floor(Math.random() * presetImages.length);
        const imageURL = presetImages[randomIndex];
        applyUserImage(imageURL);
    }

    createTiles();
    loadRandomPresetImage();
    imagePicker.addEventListener('change', handleImageSelection);
});
 
