const Ghost = {
  x: Math.floor(Math.random() * GAME.columns),
  y: Math.floor(Math.random() * GAME.rows),
  ghostInterval: null,
  duration: null,

  draw(context) {
    context.fillStyle = 'white';

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
  toggle() {
    GAME.ghostVisible = GAME.ghostVisible
      ? (GAME.ghostVisible = false)
      : (GAME.ghostVisible = true);
  },
  // Rendering ghost timer
  displayGhostTimer() {
    this.ghostInterval = setInterval(function () {
      if (Ghost.duration > 1000 && Ghost.duration <= 3000) {
        countdown.classList.remove('hidden');
      }
      countdown.textContent = `${Ghost.duration / 1000}`;
    }, 1000);
  },
};
