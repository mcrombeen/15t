const tiles = document.querySelectorAll('.tile');
let emptyTile;

// find and store the empty tile
for (let i = 0; i < tiles.length; i++) {
  if (tiles[i].classList.contains('empty')) {
    emptyTile = tiles[i];
  }
}

// shuffle the tiles
function shuffle() {
  // remove the empty class from the empty tile
  emptyTile.classList.remove('empty');
  
  // randomly move the tiles around the board
  for (let i = 0; i < 1000; i++) {
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    moveTile(randomTile);
  }
  
  // add the empty class back to the empty tile
  emptyTile.classList.add('empty');
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
