const CELL_SIZE = 25; //px
let GAME = {
  columns: null,
  rows: null,
  width: 0,
  height: 0,
  gameOver: false,
  speed: 0,
  score: 0,
  highScore: 0,
  currentLevel: 1,
  currentSpeed: 0,

  level1: {
    loop: 0,
    levelSpeed: 0,
    levelStart: 0,
  },
  level2: {
    loop: 0,
    levelSpeed: 0,
    levelStart: 5,
  },
  level3: {
    loop: 0,
    levelSpeed: 0,
    levelStart: 10,
  },
  level4: {
    loop: 0,
    levelSpeed: 0,
    levelStart: 15,
  },
  level5: {
    loop: 0,
    levelSpeed: 0,
    levelStart: 20,
  },

  ghostMode: false,
  ghostActive: false,
  ghostVisible: false,
  ghostTreshhold: 20,
  ghostEnding: false,
  ghostDuration: 10000,
};

function resetGame() {
  GAME.gameOver = false;
  GAME.currentLevel = 1;
  GAME.score = 0;
  GAME.ghostVisible = false;
  GAME.ghostVisible = false;
  Snake.stepCounter = 1;
  Ghost.duration = GAME.ghostDuration;

  Ghost.displayGhostTimer();
  Snake.reset();
  Food.reset();
  Ghost.reset();
}
