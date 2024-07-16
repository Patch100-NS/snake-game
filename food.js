const Food = {
  x: Math.floor(Math.random() * GAME.columns),
  y: Math.floor(Math.random() * GAME.rows),

  draw(context) {
    context.fillStyle = 'red';

    context.fillRect(
      this.x * CELL_SIZE,
      this.y * CELL_SIZE,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
  },
  reset() {
    this.x = Math.floor(Math.random() * GAME.columns);
    this.y = Math.floor(Math.random() * GAME.rows);
  },
};
