'use strict';

//Elements
const menuDifficulty = document.getElementById('difficulty');
const menuGhost = document.getElementById('ghost');
const btnEasy = document.getElementById('btn-easy');
const btnMedium = document.getElementById('btn-medium');
const btnHard = document.getElementById('btn-hard');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const countdown = document.getElementById('countdown');

//Snake movement event listener
window.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp' && Snake.readyToMove) Snake.moveUp();
  if (event.key === 'ArrowDown' && Snake.readyToMove) Snake.moveDown();
  if (event.key === 'ArrowLeft' && Snake.readyToMove) Snake.moveLeft();
  if (event.key === 'ArrowRight' && Snake.readyToMove) Snake.moveRight();
});

//Main menu event listeners
menuDifficulty.addEventListener('click', function (e) {
  if (e.target === btnEasy) {
    GAME.speed = 300;

    GAME.columns = 30;
    GAME.rows = 25;

    GAME.ghostTreshhold = 40;
    GAME.ghostDuration = 20000;
  }
  if (e.target === btnMedium) {
    GAME.speed = 250;
    GAME.columns = 20;
    GAME.rows = 24;

    GAME.ghostTreshhold = 80;
    GAME.ghostDuration = 15000;
  }
  if (e.target === btnHard) {
    GAME.speed = 200;

    GAME.columns = 15;
    GAME.rows = 20;

    GAME.ghostTreshhold = 120;
    GAME.ghostDuration = 10000;
  }
  menuDifficulty.classList.add('hidden');
  menuGhost.classList.remove('hidden');

  //Game speed:
  GAME.level1.levelSpeed = GAME.speed;
  GAME.level2.levelSpeed = GAME.speed * 0.8;
  GAME.level3.levelSpeed = GAME.speed * 0.6;
  GAME.level4.levelSpeed = GAME.speed * 0.5;
  GAME.level5.levelSpeed = GAME.speed * 0.3;

  //Game size:
  GAME.width = GAME.columns * CELL_SIZE;
  GAME.height = GAME.rows * CELL_SIZE;
});

menuGhost.addEventListener('click', function (e) {
  if (e.target === btnYes) {
    GAME.ghostMode = true;
  }
  if (e.target === btnNo) {
    GAME.ghostMode = false;
  }
  menuGhost.classList.add('hidden');

  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d'); //canvas context

  //Drawing the board
  function drawBoard() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'green';
    for (let x = 0; x < GAME.width; x += CELL_SIZE) {
      for (let y = 0; y < GAME.height; y += CELL_SIZE) {
        ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
      }
    }
  }
  canvas.width = GAME.width;
  canvas.height = GAME.height;
  ctx.font = '18px "Press Start 2P"';
  ctx.textBaseline = 'top';

  resetGame();

  //New game event listener
  canvas.addEventListener('click', function () {
    if (GAME.gameOver) {
      resetGame();
      loop();
    }
  });

  //Main function
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    Snake.draw(ctx);
    Food.draw(ctx);

    if (GAME.ghostMode) {
      if (Snake.stepCounter % GAME.ghostTreshhold === 0) {
        Ghost.toggle();
      }
      if (GAME.ghostVisible) Ghost.draw(ctx);
    }

    Snake.update();

    // Game over scenario
    if (GAME.gameOver) {
      GAME.highScore =
        GAME.score > GAME.highScore ? GAME.score : GAME.highScore;

      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.font = '40px "Press Start 2P"';
      ctx.fillText(
        'GAME OVER!',
        GAME.width * 0.5,
        GAME.height * 0.5,
        GAME.width * 0.95
      );
      ctx.font = '18px "Press Start 2P"';
      ctx.fillText(
        'Click to play again',
        GAME.width * 0.5,
        GAME.height * 0.6,
        GAME.width * 0.95
      );

      ctx.font = '15px "Press Start 2P"';
      ctx.fillText(
        `High Score: ${GAME.highScore}`,
        GAME.width * 0.5,
        GAME.height * 0.7,
        GAME.width * 0.95
      );

      clearInterval(GAME.level1.loop);
      clearInterval(GAME.level2.loop);
      clearInterval(GAME.level3.loop);
      clearInterval(GAME.level4.loop);
      clearInterval(GAME.level5.loop);
      clearInterval(Ghost.ghostInterval);
    }
  }

  function loop() {
    if (GAME.score === 0) {
      GAME.level1.loop = setInterval(function () {
        animate();
        GAME.currentLevel = 1;
        GAME.currentSpeed = GAME.level1.levelSpeed;
        if (GAME.score === GAME.level2.levelStart) {
          clearInterval(GAME.level1.loop);
          GAME.level2.loop = setInterval(function () {
            animate();
            GAME.currentLevel = 2;
            GAME.currentSpeed = GAME.level2.levelSpeed;
            if (GAME.score === GAME.level3.levelStart) {
              clearInterval(GAME.level2.loop);
              GAME.level3.loop = setInterval(function () {
                animate();
                GAME.currentLevel = 3;
                GAME.currentSpeed = GAME.level3.levelSpeed;
                if (GAME.score === GAME.level4.levelStart) {
                  clearInterval(GAME.level3.loop);
                  GAME.level4.loop = setInterval(function () {
                    animate();
                    GAME.currentLevel = 4;
                    GAME.currentSpeed = GAME.level4.levelSpeed;
                    if (GAME.score === GAME.level5.levelStart) {
                      clearInterval(GAME.level4.loop);
                      GAME.level5.loop = setInterval(function () {
                        animate();
                        GAME.currentLevel = 5;
                        GAME.currentSpeed = GAME.level5.levelSpeed;
                      }, GAME.level5.levelSpeed);
                    }
                  }, GAME.level4.levelSpeed);
                }
              }, GAME.level3.levelSpeed);
            }
          }, GAME.level2.levelSpeed);
        }
      }, GAME.level1.levelSpeed);
    }
  }

  loop();
});
