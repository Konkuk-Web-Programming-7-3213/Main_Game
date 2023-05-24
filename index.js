$(document).ready(() => {
  //Main Game
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  const paddleHeight = 20;
  const paddleWidth = 200;
  let paddleX = (canvas.width - paddleWidth) / 2;
  var rightPressed = false;
  var leftPressed = false;

  const brickRowCount = 7;
  const brickColumnCount = 30; //갯수 조정
  const brickWidth = 50; //브릭 정사각형
  const brickHeight = 50;
  const brickPadding = 0;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 50;

  const ballRadious = 10;

  const speed = 6; //speed;
  var angle = 45;
  var dx = speed;
  var dy = speed;
  var y = 500;
  var x = 800;

  var wallDown = 1;
  var wallCount = 0;
  var wallDownCount = true;

  var theme = 1;
  var difficulty = 1;
  var level = 1;
  var brickHp = 1;
  var atkDmg = 1;
  var miniBoss = 0;
  var maxBossHp = 5;
  var bossHp = 5;

  var map = []
  const level1 = [
  // 1, 2, 3, 4, 5, 6, 7, 8, 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  const level2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
  ]

  //Setting
  //Set Background Image
  $("#field").attr("src", "./images/map/theme" + theme + "/field.png");
  //Set level
  if (level == 1) {
    map = level1;
    miniBoss = 2;
  }
  //Set difficulty
  if (difficulty == 1) {
    brickHp = 1;
    atkDmg = 1;
    maxBossHp = 5;
    bossHp = 5;
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  //Mouse movement
  $(document).mousemove((e) => {
    var mouseX = e.pageX - (1920 - 1600) / 2 - paddleWidth / 2;
    if (mouseX >= 1600 - paddleWidth || mouseX <= 0) {
    } else {
      // if (mouseX < paddleX) {
      //     paddleX -= 6;
      // }
      // if (mouseX > paddleX) {
      //     paddleX += 6;
      // }
      paddleX = mouseX;
    }
  });

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status >= 1) {
          if (bricks[c][r].brick == 1 || bricks[c][r].brick == 2) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            var img = new Image();
            img.src= "./images/map/theme" + theme + "/brick" + bricks[c][r].brick + ".png";
            context.drawImage(img, brickX, brickY - (brickHeight * (bricks[c][r].status / brickHp) - brickHeight), brickWidth, brickHeight * (bricks[c][r].status / brickHp));
          }
          if (bricks[c][r].brick == 4) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "#0095DD";
            context.fill();
            context.closePath();
          }
          if (wallDown < 50) {
            if (bricks[c][r].brick == 3) {
              if (miniBoss == 0) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                var img = new Image();
                img.src= "./images/map/theme" + theme + "/dsp/dsp (" + wallDown + ").png";
                context.drawImage(img, brickX, brickY, brickWidth, brickHeight);
                wallCount++;
                if (wallCount == 50) {
                  wallCount = 0;
                  wallDown++;
                }
              }
              else {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                var img = new Image();
                img.src= "./images/map/theme" + theme + "/brick" + bricks[c][r].brick + ".png";
                context.drawImage(img, brickX, brickY, brickWidth, brickHeight);
              }
            }
          }
          // const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          // const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          // bricks[c][r].x = brickX;
          // bricks[c][r].y = brickY;
          // context.beginPath();
          // context.rect(brickX, brickY, brickWidth, brickHeight);
          // context.fillStyle = "#0095DD";
          // context.fill();
          // context.closePath();
        }
      }
    }
  }

  function removeWall() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (map[r][c] == 3) {
          bricks[c][r] = { x: 0, y: 0, status: 0, brick: 0 };
        }
      }
    }
  }

  function draw() {
    angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, ballRadious, 0, 2.0 * Math.PI, 1);
    context.fillStyle = "#0095DD";
    context.closePath();
    context.fill();
    drawPaddle();
    drawBricks();
    collisionDetection();

    if (wallDown == 50 && wallDownCount) {
      $("#boss-block img").attr("src", "./images/header/characters/boss2.png")
      removeWall();
      wallDownCount = false;
    }

    if (x + dx > canvas.width - ballRadious || x + dx < ballRadious) {
      //dx = -dx;
      dx = -speed * Math.cos((angle * Math.PI) / 180);
    }
    if (y + dy < ballRadious) {
      //dy = -dy;
      dy = -speed * Math.sin((angle * Math.PI) / 180);
    } else if (y + dy > canvas.height - ballRadious) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        //dy = -dy;
        dy = -speed * Math.sin((angle * Math.PI) / 180);
      } else {
        // alert("GAME OVER");
        // document.location.reload();
        clearInterval(ball); // Needed for Chrome to end game
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 4;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 4;
    }

    x += dx;
    y += dy;
  }

  var ball = setInterval(draw, 10);

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function drawPaddle() {
    context.beginPath();
    context.rect(
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight
    );
    context.fillStyle = "#000000";
    context.fill();
    context.closePath();
  }

  //brick 1: 잡몹 / 2: 브릭 / 3: 보스를 감싸는 벽 / 4: 보스
  //status : hp
  var bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      if (map[r][c] == 0) {
        bricks[c][r] = { x: 0, y: 0, status: 0, brick: 0 };
      }
      if (map[r][c] == 1) {
        bricks[c][r] = { x: 0, y: 0, status: brickHp, brick: 1 };
      }
      if (map[r][c] == 2) {
        bricks[c][r] = { x: 0, y: 0, status: brickHp, brick: 2 };
      }
      if (map[r][c] == 3) {
        bricks[c][r] = { x: 0, y: 0, status: 1, brick: 3 };
      }
      if (map[r][c] == 4) {
        bricks[c][r] = { x: 0, y: 0, status: 1, brick: 4 };
      }
    }
  }

  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status >= 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth + ballRadious &&
            y > b.y &&
            y < b.y + brickHeight + ballRadious
          ) {
            var normalVector = {
              x: b.x + brickWidth / 2 - x,
              y: b.y + brickHeight / 2 - y,
            };
            var angleDiff =
              Math.atan2(normalVector.y, normalVector.x) - Math.atan2(dy, dx);
            var reflectionAngle = Math.atan2(-dy, -dx) + angleDiff;
            dx = speed * Math.cos(reflectionAngle);
            dy = speed * Math.sin(reflectionAngle);
            if (b.brick == 1 || b.brick == 2) {
              if (b.status - atkDmg <= 0) {
                b.status = 0;
                if (b.brick == 1) {
                  miniBoss --;
                }
              }
              else {
                b.status -= atkDmg;
              }
            }
            if (b.brick == 4) {
              bossHp--;
              $("#boss-hp").css("width", (746 / maxBossHp * bossHp) + "px")
              if (bossHp <= 0) {
                clearInterval(ball);
                console.log("you win!");
              }
            }
          }
        }
      }
    }
  }
});
