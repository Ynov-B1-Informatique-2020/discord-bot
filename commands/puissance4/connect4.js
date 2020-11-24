class Connect4 {
  constructor() {
    
    this.grid = [
      //      Row            Rotate to print
      //1  2  3  4  5  6
      [ 0, 0, 0, 0, 0, 0], // 1
      [ 0, 0, 0, 0, 0, 0], // 2
      [ 0, 0, 0, 0, 0, 0], // 3
      [ 0, 0, 0, 0, 0, 0], // 4    Cols
      [ 0, 0, 0, 0, 0, 0], // 5
      [ 0, 0, 0, 0, 0, 0], // 6
      [ 0, 0, 0, 0, 0, 0], // 7
    ]

    this.player = 1;
  }

  isPlayer1Turn() {
    return this.player === 1;
  }
  
  isPlayer2Turn() {
    return this.player === 2;
  }

  nextPlayer() {
    this.player = (this.player === 1) ? 2 : 1;
  }

  play(column) {
    let placed = false
    for (let index = 0; index < this.grid[column].length; index++) {
      if (this.grid[column][index] === 0) {
        placed = true;
        this.grid[column][index] = this.player
        this.nextPlayer();
        break;
      }
    }

    return placed;
  }


  // Transform grid to easy print
  getPrintingGrid() {
    return this.grid[0].map((_, colIndex) => this.grid.map(row => row[colIndex])).reverse();
  }


}

module.exports = Connect4;