const tiles = document.querySelectorAll('.tile');
let emptyTile;

// find and store the empty tile
for (let i = 0; i < tiles.length; i++) {
  if (tiles[i].classList.contains('empty')) {
    emptyTile = tiles[i];
  }
}

// shuffle the tiles
function shuffleTiles() {
  let tiles = document.querySelectorAll(".tile");
  let tileArray = Array.from(tiles);

  tileArray.forEach((tile) => {
    let randomPos = Math.floor(Math.random() * 15);
    let temp = tileArray[randomPos].style.order;
    tileArray[randomPos].style.order = tile.style.order;
    tile.style.order = temp;
  });

  // Check if message port is still open before sending message
  if (port && port.sender.tab) {
    port.postMessage({ message: "shuffleTiles" });
  }
}


// move a tile to the empty space
function moveTile(tile) {
  const emptyTileX = emptyTile.offsetLeft;
  const emptyTileY = emptyTile.offsetTop;
  const tileX = tile.offsetLeft;
  const tileY = tile.offsetTop;
  
  if (tileX === emptyTileX && tileY === emptyTileY - tile.offsetHeight) {
    // move up
    tile.style.top = emptyTileY + 'px';
    emptyTile.style.top = tileY + 'px';
    emptyTile = tile;
  } else if (tileX === emptyTileX && tileY === emptyTileY + tile.offsetHeight) {
    // move down
    tile.style.top = emptyTileY + 'px';
    emptyTile.style.top = tileY + 'px';
    emptyTile = tile;
  } else if (tileX === emptyTileX - tile.offsetWidth && tileY === emptyTileY) {
    // move left
    tile.style.left = emptyTileX + 'px';
    emptyTile.style.left = tileX + 'px';
    emptyTile = tile;
  } else if (tileX === emptyTileX + tile.offsetWidth && tileY === emptyTileY) {
    // move right
    tile.style.left = emptyTileX + 'px';
    emptyTile.style.left = tileX + 'px';
    emptyTile = tile;
  }
}

// add event listeners to the tiles
for (let i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener('click', function() {
    moveTile(this);
  });
}
