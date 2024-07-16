'use strict';

//Snake entitet:
const Snake = {
  position: { x: 3, y: Math.floor(GAME.rows / 2) },
  velocity: { x: 1, y: 0 },
  length: 4,
  segments: [],
  readyToMove: true,
  stepCounter: 0, //Set to 1 after eating a ghost

  draw(context) {
    if (!(Ghost.duration > 1000 && Ghost.duration < 3000)) {
      this.segments.forEach((segment, i) => {
        if (i === 0) {
          context.fillStyle = 'greenyellow';
        } else {
          context.fillStyle = GAME.ghostActive ? 'white' : 'green';
        }

        context.fillRect(
          segment.x * CELL_SIZE + 2,
          segment.y * CELL_SIZE + 2,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      });
    } else {
      this.segments.forEach((segment, i) => {
        if (i === 0) {
          context.fillStyle = 'greenyellow';
        } else {
          context.fillStyle = 'green';
        }

        context.fillRect(
          segment.x * CELL_SIZE + 2,
          segment.y * CELL_SIZE + 2,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      });
    }

    //Rendering score
    context.textAlign = 'left';
    context.fillStyle = 'white';
    context.fillText('Score: ' + GAME.score, 20, 20);

    //Rendering level
    context.textAlign = 'right';
    context.fillStyle = 'white';
    context.fillText('Level: ' + GAME.currentLevel, GAME.width - 20, 20);
  },

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    Snake.readyToMove = true;
    if (!GAME.ghostActive) Snake.stepCounter++;

    this.segments.unshift({ x: this.position.x, y: this.position.y });

    if (this.segments.length > this.length) {
      this.segments.pop(); //ovo kreira animaciju
    }

    //Collision with walls:
    if (!GAME.ghostActive) {
      if (
        this.position.x < 0 ||
        this.position.x > GAME.columns - 1 ||
        this.position.y < 0 ||
        this.position.y > GAME.rows - 1
      ) {
        GAME.gameOver = true;
      }
    }

    // Ghost mode:
    if (GAME.ghostActive && this.position.x < 0 && this.segments[1].x === 0) {
      this.readyToMove = false;
      this.position.x = GAME.columns;
      this.velocity.x = -1;
    }

    if (
      GAME.ghostActive &&
      this.position.x === GAME.columns &&
      this.segments[1].x === GAME.columns - 1
    ) {
      this.readyToMove = false;
      this.position.x = -1;
      this.velocity.x = 1;
    }

    if (GAME.ghostActive && this.position.y < 0 && this.segments[1].y === 0) {
      this.readyToMove = false;
      this.position.y = GAME.rows;
      this.velocity.y = -1;
    }

    if (
      GAME.ghostActive &&
      this.position.y === GAME.rows &&
      this.segments[1].y === GAME.rows - 1
    ) {
      this.readyToMove = false;
      this.position.y = -1;
      this.velocity.y = 1;
    }

    //Eating food:
    if (this.position.x === Food.x && this.position.y === Food.y) {
      Food.reset();
      this.length++;
      GAME.score++;
    }

    this.segments.forEach(function (segment, index) {
      if (index > 0 && segment.x === Food.x && segment.y === Food.y) {
        Food.reset();
      }
    });

    //Eating ghost:
    if (
      this.position.x === Ghost.x &&
      this.position.y === Ghost.y &&
      GAME.ghostVisible &&
      !GAME.ghostActive
    ) {
      Ghost.reset();
      GAME.ghostActive = true;
      GAME.ghostVisible = false;
      Ghost.duration = GAME.ghostDuration;

      const ghostCountdown = setInterval(function () {
        if (Ghost.duration > 0) Ghost.duration -= 1000;
      }, 1000);

      setTimeout(function () {
        GAME.ghostActive = false;
        Ghost.duration = 0;
        Snake.stepCounter = 1;
        countdown.classList.add('hidden');
        clearInterval(ghostCountdown);
      }, Ghost.duration);
    }

    // Eating itself

    this.segments.forEach((segment, i) => {
      if (
        i > 0 &&
        this.position.x === segment.x &&
        this.position.y === segment.y
      ) {
        GAME.gameOver = true;
      }
    });
  },

  reset() {
    this.length = 4;
    this.segments = [];
    (this.position = { x: 3, y: Math.floor(GAME.rows / 2) }),
      (this.velocity = { x: 1, y: 0 });
  },

  //Moving:
  moveUp() {
    if (Snake.velocity.y === 0) {
      this.velocity.x = 0;
      this.velocity.y = -1;
      Snake.readyToMove = false;
    }
  },
  moveDown() {
    if (Snake.velocity.y === 0) {
      this.velocity.x = 0;
      this.velocity.y = 1;
      Snake.readyToMove = false;
    }
  },
  moveLeft() {
    if (Snake.velocity.x === 0) {
      this.velocity.x = -1;
      this.velocity.y = 0;
      Snake.readyToMove = false;
    }
  },
  moveRight() {
    if (Snake.velocity.x === 0) {
      this.velocity.x = 1;
      this.velocity.y = 0;
      Snake.readyToMove = false;
    }
  },
};
