const brickRowCount = 7;
const brickColumnCount = 30; //갯수 조정
const brickWidth = 50; //브릭 정사각형
const brickHeight = 50;
const brickPadding = 0;
const brickOffsetTop = 30;
const brickOffsetLeft = 50;
var isBallsAdded = false;
var isBarWider = false;
const ballRadious = 10;

var speed = 5; //speed;
var angle = 45;
var dx = Math.random() < 0.5 ? -1 * speed : speed;
var dy = speed;
var y = 500;
var x = Math.floor(Math.random() * (1300 - 500 + 1)) + 500;

var wallDown = 1;
var wallCount = 0;
var wallDownCount = true;

var regenCount = true;

var theme = 1;
var difficulty = 1;
var level = 1;
var brickHp = 1;
var atkDmg = 1;
var miniBoss = 0;
var maxBossHp = 5;
var bossHp = 5;
var maxPlayerHp = 5;
var playerHp = 5;
var chapter = 1; //챕터 선택 변수, 1로 초기화, 챕터 선택 없이 게임 시작을 누르면 챕터1로 바로 감
var myChar = 1; //캐릭터 선택 변수
var slowDebuff = false;
var barDebuff = false;
var fastDebuff = false;
var reverse = false;

var totalScore = 0;

var map = [];
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
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

const level3 = [
// 1, 2, 3, 4, 5, 6, 7, 8, 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
  [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
  [2, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2],
  [2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 0, 1, 0, 2, 2, 2, 2, 2, 2],
  [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0]
]

const level4 = [
// 1, 2, 3, 4, 5, 6, 7, 8, 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
  [2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2],
  [2, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2],
  [2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 2, 2, 3, 4, 4, 4, 4, 3, 2, 2, 2, 0, 1, 0, 2, 2, 2, 2, 2, 2],
  [0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0],
  [2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2]
]

var ball;
$(document).ready(() => {
  $("#display-story").hide();
  $("#display-main").hide();
  $("#display-buff").hide();
  $("#credit").hide();
  $("#gameOver").hide();
  $("#clear").hide();

  //Main Game
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var paddleHeight = 20;
  var paddleWidth = 200;
  let paddleX = (canvas.width - paddleWidth) / 2;
  var paddleXbyKey = 4;
  var rightPressed = false;
  var leftPressed = false;

  var Barwider = document.getElementById("buffaa");
  var Plusball = document.getElementById("buffbb");
  var Powerball = document.getElementById("buffcc");
  var Ballspace = document.getElementById("buffdd");

  var balls = []
    
  function ball_plus(ballCount){          //B
    for(var i = 0; i < ballCount; i++){
      var newBall = {
        x : Math.floor(Math.random() * (1300 - 500 + 1)) + 500,
        y: canvas.height /2  + 200,
        dx : Math.random() < 0.5 ? -1 * speed : speed,
        dy : speed
      };
      balls.push(newBall);
      }
    }


  function initGame() {
    $("#display-main").show();
    var dValue = document.getElementById("difficulty-value");
    difficulty = parseInt(dValue.options[dValue.selectedIndex].value);
    totalScore = 0;
    wallDown = 1;
    wallCount = 0;
    wallDownCount = true;
    isBallsAdded = false;
    regenCount = true;

    isBarWider = false;
    paddleWidth = 200;
    speed = 5;

    slowDebuff = false;
    barDebuff = false;
    fastDebuff = false;
    reverse = false;

    balls = [
      {
          x : Math.floor(Math.random() * (1300 - 500 + 1)) + 500,
          y: canvas.height /2  + 250,
          dx : Math.random() < 0.5 ? -1 * speed : speed,
          dy : -speed
      }
    ]

    if (chapter == 1) {
      map = level1;
      bossHp = 5;
      maxBossHp = 5;
      brickHp = 1;
      playerHp = 5;
      maxPlayerHp = 5;
      miniBoss = 2;
    }
    if (chapter == 2) {
      map = level2;
      bossHp = 7;
      maxBossHp = 7;
      brickHp = 1;
      playerHp = 5;
      maxPlayerHp = 5;
      miniBoss = 2;
    }
    if (chapter == 3) {
      map = level3;
      bossHp = 9;
      maxBossHp = 9;
      brickHp = 2;
      playerHp = 5;
      maxPlayerHp = 5;
      miniBoss = 4;
    }
    if (chapter == 4) {
      map = level4;
      bossHp = 11;
      maxBossHp = 11;
      brickHp = 2;
      playerHp = 5;
      maxPlayerHp = 5;
      miniBoss = 4;
    }

    if (difficulty == 1) {
      
    }
    if (difficulty == 2) {
      brickHp += 1;
      playerHp -= 1;
      maxPlayerHp -= 1;
    }
    if (difficulty == 3) {
      brickHp += 2;
      playerHp -= 2;
      maxPlayerHp -= 2;
    }
    initBrick();
    ball = setInterval(draw, 10);
  }
  //Setting
  // var theme = 1;
  // var difficulty = 1;
  // var level = 1;
  // var brickHp = 1;
  // var atkDmg = 1;
  // var miniBoss = 0;
  // var maxBossHp = 5;
  // var bossHp = 5;
  // var maxPlayerHp = 5;
  // var playerHp = 5;
  // var chapter = 1; //챕터 선택 변수, 1로 초기화, 챕터 선택 없이 게임 시작을 누르면 챕터1로 바로 감
  // var myChar = 0; //캐릭터 선택 변수
  
  //Set Background Image
  $("#field").attr("src", "./images/map/theme" + theme + "/field.png");
  

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  // if(localStorage.getItem("Buff1") == 'A' || localStorage.getItem("Buff2") == 'A') {
  //   paddleXbyKey *= 1.2;
  // }

  //Mouse movement
  $(document).mousemove((e) => {
    var mouseX = e.pageX - (1920 - 1600) / 2 - paddleWidth / 2;
    if (mouseX >= 1600 - paddleWidth || mouseX <= 0) {
    } 
    else {
      // paddleX = mouseX;
      if (slowDebuff || reverse) {
        if (slowDebuff) {
          if (mouseX < paddleX) {
            paddleX -= 6;
          }
          if (mouseX > paddleX) {
              paddleX += 6;
          }
        }
        if (reverse) {
          paddleX = 1600 - paddleWidth - mouseX;
        }
      }
      else {
        paddleX = mouseX;
      }
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
            img.src =
              "./images/map/theme" +
              theme +
              "/brick" +
              bricks[c][r].brick +
              ".png";
            context.drawImage(
              img,
              brickX,
              brickY -
                (brickHeight * (bricks[c][r].status / brickHp) - brickHeight),
              brickWidth,
              brickHeight * (bricks[c][r].status / brickHp)
            );
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
                const brickX =
                  c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY =
                  r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                var img = new Image();
                img.src =
                  "./images/map/theme" +
                  theme +
                  "/dsp/dsp (" +
                  wallDown +
                  ").png";
                context.drawImage(img, brickX, brickY, brickWidth, brickHeight);
                wallCount++;
                if (wallCount == 50) {
                  wallCount = 0;
                  wallDown++;
                }
              } else {
                const brickX =
                  c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY =
                  r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                var img = new Image();
                img.src =
                  "./images/map/theme" +
                  theme +
                  "/brick" +
                  bricks[c][r].brick +
                  ".png";
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
    if((localStorage.getItem("Buff1") == 'A' || localStorage.getItem("Buff2") == 'A') && !isBarWider ) {
      paddleWidth = paddleWidth * 1.3;
      isBarWider = true;

      Barwider.style.opacity = 1;
    } 
    if((localStorage.getItem("Buff1") == 'B' || localStorage.getItem("Buff2") == 'B') && !isBallsAdded){
      ball_plus(1);
      isBallsAdded = true;
      Plusball.style.opacity = 1;
    }
    if(localStorage.getItem("Buff1") == 'C' || localStorage.getItem("Buff2") == 'C'){
      Powerball.style.opacity = 1;
    }
    if(localStorage.getItem("Buff1") == 'D' || localStorage.getItem("Buff2") == 'D'){
      Ballspace.style.opacity = 1;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<balls.length;i++) {
      angle = (Math.atan2(balls[i].dy, balls[i].dx) * 180) / Math.PI;
      context.beginPath();
      context.arc(balls[i].x, balls[i].y, ballRadious, 0, 2.0 * Math.PI, 1);
      context.fillStyle = "#0095DD";
      context.closePath();
      context.fill();
    }
    drawPaddle();
    drawBricks();
    collisionDetection();

    if (wallDown == 50 && wallDownCount) {
      $("#boss-block img").attr("src", "./images/header/characters/boss2.png");
      removeWall();
      wallDownCount = false;
    }

    // Defuff 구현
    if (chapter == 1) {
      if (bossHp <= (maxBossHp / 2) && !barDebuff) {
        barDebuff = true;
        paddleWidth = paddleWidth * 0.7;
        $("#debuffbb").css("opacity", "1");
      }
    }
    if(chapter == 2) {
      if (bossHp <= (maxBossHp / 3 * 2) && !barDebuff) {
        barDebuff = true;
        paddleWidth = paddleWidth * 0.7;
        $("#debuffbb").css("opacity", "1");
      }
      if (bossHp <= (maxBossHp / 3) && !fastDebuff) {
        fastDebuff = true;
        speed = 7;
        $("#debuffcc").css("opacity", "1");
      }
    }
    if(chapter == 3) {
      if (bossHp <= (maxBossHp / 4 * 3) && !barDebuff) {
        barDebuff = true;
        paddleWidth = paddleWidth * 0.7;
        $("#debuffbb").css("opacity", "1");
      }
      if (bossHp <= (maxBossHp / 2) && !fastDebuff) {
        fastDebuff = true;
        speed = 7;
        $("#debuffcc").css("opacity", "1");
      }
      if (bossHp <= (maxBossHp / 4 * 1) && !slowDebuff) {
        slowDebuff = true;
        $("#debuffaa").css("opacity", "1");
      }
    }
    if(chapter == 4) {
      if (bossHp <= (maxBossHp / 5 * 4) && !barDebuff) {
        barDebuff = true;
        paddleWidth = paddleWidth * 0.7;
        $("#debuffbb").css("opacity", "1");
      }
      if (bossHp <= (maxBossHp / 5 * 3) && !fastDebuff) {
        fastDebuff = true;
        speed = 7;
        $("#debuffcc").css("opacity", "1");
      }
      if (bossHp <= (maxBossHp / 5 * 2) && !slowDebuff) {
        slowDebuff = true;
        $("#debuffaa").css("opacity", "1");
      }
      if (bossHp <= (maxBossHp / 5 * 1) && !reverse) {
        reverse = true;
        $("#debuffdd").css("opacity", "1");
      }
    }

    if (bossHp <= 2 && regenCount) {
      var regenMap = [];
      if (chapter == 1) {
        regenMap = level1;
        miniBoss = 2;
      }
      if (chapter == 2) {
        regenMap = level2;
        miniBoss = 2;
      }
      if (chapter == 3) {
        regenMap = level3;
        miniBoss = 4;
      }
      if (chapter == 4) {
        regenMap = level4;
        miniBoss = 4;
      }
      for(var i=0;i<balls.length;i++) {
        balls[i].x = Math.floor(Math.random() * (1300 - 500 + 1)) + 500;
        balls[i].y = canvas.height /2  + 200;
      }
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          if (regenMap[r][c] == 1) {
            bricks[c][r] = { x: 0, y: 0, status: brickHp, brick: 1 };
          }
          if (regenMap[r][c] == 3) {
            bricks[c][r] = { x: 0, y: 0, status: 1, brick: 3 };
          }
        }
      }
      wallDown = 1;
      wallCount = 0;
      wallDownCount = true;
      regenCount = false;
    }

    for(var i = 0; i < balls.length; i++){
      if (balls[i].x + balls[i].dx > canvas.width - ballRadious) {
          balls[i].x = canvas.width - ballRadious; // 공을 벽 안으로 이동시킴
          balls[i].dx = -Math.abs(speed * Math.cos(angle * Math.PI / 180)); // 방향을 반대로 변경하고 절대값으로 만듦
      } else if (balls[i].x + balls[i].dx < ballRadious) {
          balls[i].x = ballRadious; // 공을 벽 안으로 이동시킴
          balls[i].dx = Math.abs(speed * Math.cos(angle * Math.PI / 180)); // 방향을 반대로 변경하고 절대값으로 만듦
      } else if (balls[i].y + balls[i].dy > canvas.height - ballRadious - paddleHeight) {
          if (balls[i].x > paddleX - ballRadious && balls[i].x < paddleX + paddleWidth + ballRadious) {
            //법선 벡터 계산 - 패들 충돌 위치에 따라 공의 반사각 변경
            var distance = balls[i].x - (paddleX + paddleWidth / 2);

            var maxReflectionAngle = 60;

            var reflectionAngle =
              (distance / (paddleWidth / 2)) * (Math.PI / 180) * maxReflectionAngle;

            balls[i].dx = speed * Math.sin(reflectionAngle);
            balls[i].dy = -speed * Math.cos(reflectionAngle);
          } else {
              // alert("GAME OVER");
              // document.location.reload();
              // clearInterval(ball); // Needed for Chrome to end game
            // alert("GAME OVER");
        // document.location.reload();
        //clearInterval(ball); // Needed for Chrome to end game
        playerHp--;
        $("#player-hp").css("width", (746 / maxPlayerHp) * playerHp + "px");
        if (balls.length > 1) {
          balls.splice(i, 1);
          if(i == 1){
            i--;
          }
        } else{
          balls[i].y = 500;
          balls[i].x = Math.floor(Math.random() * (1300 - 500 + 1)) + 500;

        }
        if (playerHp <= 0) {
          clearInterval(ball);
          $(".scoreView").text(totalScore);
          $("#gameOver").show();
        }
          }
      } else if (balls[i].y + balls[i].dy < ballRadious) {
          balls[i].y = ballRadious; // 천장과 충돌 시 공을 벽 안으로 이동시킴
          balls[i].dy = Math.abs(speed * Math.sin(angle * Math.PI / 180)); // 방향을 반대로 변경하고 절대값으로 만듦
      } else {
        
      }
    
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;
  }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleXbyKey;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= paddleXbyKey;
    }
  }

  $("#toMain").click(() => {
    $("#display-main").hide();
    $("#gameOver").hide();
    $("#clear").hide();
    initBuff();
    $("#again").prop("disabled", false);
    $("#again").css("display", "block");
    $("#player-hp").css("width", (746) + "px");
    $("#boss-hp").css("width", (746) + "px");
    $("#boss-block img").attr("src", "./images/header/characters/boss1.png");
    $("#display-menu").show();
    $("#main_menu").show();
  });

  $(".retry").click(() => {
    $("#display-main").hide();
    $("#gameOver").hide();
    $("#clear").hide();
    initBuff();
    $("#again").prop("disabled", false);
    $("#again").css("display", "block");
    $("#player-hp").css("width", (746) + "px");
    $("#boss-hp").css("width", (746) + "px");
    $("#boss-block img").attr("src", "./images/header/characters/boss1.png");
    GameBuff();
  })

  $("#nextStep").click(() => {
    $("#display-main").hide();
    $("#gameOver").hide();
    $("#clear").hide();
    initBuff();
    $("#again").prop("disabled", false);
    $("#again").css("display", "block");
    $("#player-hp").css("width", (746) + "px");
    $("#boss-hp").css("width", (746) + "px");
    $("#boss-block img").attr("src", "./images/header/characters/boss1.png");
    chapter++;
    toggleChapter(chapter);
  })

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
  function initBrick() {
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
  }

  function collisionDetection() {
    for (var i = 0; i < balls.length; i++) {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if (b.status >= 1) {
            if (
              balls[i].x > b.x &&
              balls[i].x < b.x + brickWidth + ballRadious &&
              balls[i].y > b.y &&
              balls[i].y < b.y + brickHeight + ballRadious
            ) {
                var normalVector = {
                  x: b.x + brickWidth / 2 - balls[i].x,
                  y: b.y + brickHeight / 2 - balls[i].y,
                };
                var angleDiff =
                  Math.atan2(normalVector.y, normalVector.x) - Math.atan2(balls[i].dy, balls[i].dx);
                var reflectionAngle = Math.atan2(-balls[i].dy, -balls[i].dx) + angleDiff;
                balls[i].dx = speed * Math.cos(reflectionAngle);
                balls[i].dy = speed * Math.sin(reflectionAngle);
                if (b.brick == 1 || b.brick == 2) {
                  if (b.status - 1 <= 0) {
                    b.status -= 1;
                    if (b.brick == 1) {
                      miniBoss -= 1;
                      totalScore += 5;
                    }
                    else {
                      totalScore++;
                    }
                  }
                  else {
                    b.status -= 1;
                  }
                } 
                if(localStorage.getItem("Buff1") == 'D' || localStorage.getItem("Buff2") == 'D'){
                  b.status += 1;
                  for (var t = -1; t < 2; t++) {
                    for (var o = -1; o < 2; o++) {
                      var columnIndex = c + t;
                      var rowIndex = r + o;

                      // 유효한 벽돌 인덱스인지 확인
                      if (
                        columnIndex >= 0 &&
                        columnIndex < brickColumnCount &&
                        rowIndex >= 0 &&
                        rowIndex < brickRowCount
                      ) {
                        var brick = bricks[columnIndex][rowIndex];

                        if (brick.status > 0 && brick.brick != 3 && brick.brick != 4)   {
                          brick.status -= 1;
                        }
                      }
                    }
                  }
                }

                if (b.brick == 4) {
                  if(localStorage.getItem("Buff1") == 'C' || localStorage.getItem("Buff2") == 'C'){ //collsiondetection이랑 다르면 이거 쓰면됨 (power 관련)
                    bossHp-= 2;
                  }else{
                    bossHp -= 1;
                  }
                  $("#boss-hp").css("width", (746 / maxBossHp * bossHp) + "px")
                  
                  if (bossHp <= 0) {
                    clearInterval(ball);
                    $(".scoreView").text(totalScore);
                    $("#clear").show();
                  }
                }
                
            }
          }
         }
      }
    } 
  }

  // main menu JS

  $(document).keydown(function(event) {
    if ( event.keyCode == 27 || event.which == 27 ) {
       if($("#main_menu").is(":visible")){   
           $("#main_menu").hide();
           $("#pressAnyButton").show();
       }
       else if($("#startGame").is(":visible")) {
          $("#startGame").hide();
            $("#main_menu").show();
       }
       else if($("#selectChapter").is(":visible")) {
          $("#startGame").show();
            $("#selectChapter").hide();
       }
       else if($("#options").is(":visible")) {
          if(nnn==0) {
             $("#main_menu").show();
               $("#options").hide();
            }
            else {
               $("#startGame").show();
               $("#options").hide();
            }
       }
       else if($(".character").is(":visible")) {
          if(nn==1) {
             $("#selectChapter").show();
              $(".character").hide();
          }
          else {
             $("#startGame").show();
              $(".character").hide();
           }
       }
       else if($("#credit").is(":visible")) {
          $("#credit").hide();
          $("#main_menu").show();
       }
    }   
  });

  setTimeout(showPressButton, 3000);

  $("#yes").click(function () {
    $("#musicSel").hide();
    $("#pressAnyButton").show();
    play();
  });
  $("#no").click(function () {
    $("#musicSel").hide();
    $("#pressAnyButton").show();
  });

  // sound
  $(this).click(function () {
    playBtn();
  });
  $("#press_Button").mouseenter(function () {
    hoverM();
  });
  $(".btn").mouseenter(function () {
    hoverM();
  });
  $(".select").mouseenter(function () {
    hoverM();
  });
  $("#startButton").click(function () {
    waterM();
  });

  $("#press_Button").click(function () {
    $("#pressAnyButton").hide();
    $("#main_menu").show();
  });

  $("#menu1").click(function () {
    $("#main_menu").hide();
    $("#startGame").show();
  });
  $("#menu2").click(function () {
    $("#main_menu").hide();
    $("#options").show();
    nnn = 0;
  });

  $("#menu4").click(function () {
    window.close();
  });

  $("#chapter").click(function () {
    $("#selectChapter").show();
    $("#startGame").hide();
  });

  $("#gameStart").click(function () {
    $(".character").show();
    $("#startGame").hide();
    nn = 0;
  });
  $("#option").click(function () {
    $("#options").show();
    $("#startGame").hide();
    nnn = 1;
  });

  $("#chSelect .select").click(function () {
    $(".character").show();
    $("#selectChapter").hide();
    nn = 1;
  });

  $("#menu3").click(() => {
    $("#main_menu").hide();
    $("#credit").show();
    $("body").css("background-color", "#1e1e1e")
  })

  $("#gameStart").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ 게임을 시작합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  $("#chapter").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ 챕터를 선택합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  $("#option").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ 환경설정을 선택합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  $("#ch1").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Ch.01을 선택합니다.");
      $("#ch").html("■ Ch.01 : 프롤로그");
      $("#imgSelect").attr("src", "./images/menu/보물.jpg");
      $("#text").html(
        "보물을 찾기위해 붐힐마을로 온 로두마니 선장, 다오는 이 사실을 마을에 알리려고 하는데..."
      );
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  $("#ch2").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Ch.02를 선택합니다.");
      $("#ch").html("■ Ch.02 : 마을로");
      $("#imgSelect").attr("src", "./images/menu/붐힐마을2.jpg");
      $("#text").html(
        "마을로 돌아온 다오는 디지니와 배찌에게 로두마니가 온 사실을 알린다. 하지만 이미 늦었는지 로두마니의 잔당들이 마을을 습격하는데..."
      );
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  $("#ch3").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Ch.03을 선택합니다.");
      $("#ch").html("■ Ch.03 : 보물을 찾아서");
      $("#imgSelect").attr("src", "./images/menu/보물찾기.jpg");
      $("#text").html(
        "보물의 위치를 알고있는 배찌는 디지니, 다오와 함께 보물이 있는 곳으로 향한다. 하지만 거기서 기다리는 것은..."
      );
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  $("#ch4").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Ch.04를 선택합니다.");
      $("#ch").html("■ Ch.04 : 보물을 지켜라");
      $("#imgSelect").attr("src", "./images/menu/로두마니로부터.jpg");
      $("#text").html(
        "로두마니의 잔당들을 모두 물리친 다오 일행, 하지만 이젠 로두마니가 직접 나서려고 한다..."
      );
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );

  //챕터 선택 클릭 이벤트 코드
  $("#ch1").click(function () {
    $(".display-menu").css("display", "none");
    chapter = 1;
  });
  $("#ch2").click(function () {
    chapter = 2;
  });
  $("#ch3").click(function () {
    chapter = 3;
  });
  $("#ch4").click(function () {
    chapter = 4;
  });

  function setCharacters() {
    const charData = [
      {
        name: "bazzi",
        img: "./images/header/characters/bazzi.webp",
        color1: "#F90716",
        color2: "#FF5403"
      } ,
      {
        name: "dao",
        img: "./images/header/characters/dao.webp",
        color1: "#62CDFF",
        color2: "#97DEFF"
      },
      {
        name: "dizni",
        img: "./images/header/characters/dizni.webp",
        color1: "#FFF323",
        color2: "#FFCA03"
      }
    ]
    $("#player-pic").attr("src", charData[myChar - 1].img);
    $("#asd").css("background-color", charData[myChar - 1].color1);
    $("#asdf").css("background-color", charData[myChar - 1].color2);
    $("#player-hp").css("background-color", charData[myChar - 1].color2);
  }

  $("#photo1").click(function () {
    $("#charName").css("color", "#FF0000");
    $("#charIntro").show();
    $("#charIntro").css("background-color", "#F5A9A9");
    $("#charName").text("배찌 (Bazzi)");
    $("#charText").text("게으르고 잠도 많지만 낙천적으로 사는 아이");
    myChar = 1; //배찌 선택 시
    setCharacters();
  });
  $("#photo2").click(function () {
    $("#charName").css("color", "#2E2EFE");
    $("#charIntro").css("background-color", "#A9A9F5");
    $("#charIntro").show();
    $("#charName").text("다오 (Dao)");
    $("#charText").text("정의롭고 착하지만 가끔 덜렁거리는 아이");
    myChar = 2; //다오 선택 시
    setCharacters();
  });
  $("#photo3").click(function () {
    $("#charName").css("color", "#FFFF00");
    $("#charIntro").css("background-color", "#F7D358");
    $("#charIntro").show();
    $("#charName").text("디지니 (Dizni)");
    $("#charText").text("수줍음 많고 말이 별로 없는 아이");
    myChar = 3; //디지니 선택 시
    setCharacters();
  });

  $("#bgm").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Bgm 소리를 조정합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );
  $("#clickS").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Click 소리를 조정합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );
  $("#hoverS").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ Hover 소리를 조정합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );
  $("#difficulty").hover(
    function () {
      $(this).css("background-color", "#1e1e1e");
      $(this).css("color", "white");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■ 추가 난이도를 조정합니다.");
    },
    function () {
      $(this).css("background-color", "rgba(1, 116, 223, 0.5)");
      $(this).css("color", "#1e1e1e");
      $(".introduce").html("&nbsp;&nbsp;&nbsp;■  esc: 뒤로");
    }
  );
  var con1 = $("#musicPlayer")[0];
  var con2 = $("#clickMusic")[0];
  var con3 = $("#hoverMusic")[0];

  $("#bar1").on("input", function () {
    con1.volume = $(this).val();
  });

  $("#bar2").on("input", function () {
    con2.volume = $(this).val();
  });

  $("#bar3").on("input", function () {
    con3.volume = $(this).val();
  });

  //Game Start 버튼 클릭시
  $("#startButton").click(function () {
    $(".character").hide();
    switch (chapter) {
      case 1:
        $("#display-menu").hide();
        $("#display-story").show();
        toggleChapter(1);
        break;
      case 2:
        $("#display-menu").hide();
        $("#display-story").show();
        toggleChapter(2);
        break;
      case 3:
        $("#display-menu").hide();
        $("#display-story").show();
        toggleChapter(3);
        break;
      case 4:
        $("#display-menu").hide();
        $("#display-story").show();
        toggleChapter(4);
        break;
    }
  });

  function showPressButton() {
    $("#loading").hide();
    $("body").css("background-color", "white");
    $("#konkuk").fadeIn(2000, function () {
      $("#konkuk").fadeOut(2000, function () {
        $("#department").fadeIn(2000, function () {
          $("#department").fadeOut(2000, function () {
            $("#musicSel").show();
          });
        });
      });
    });
  }
  
  function play() {
    var audio = document.getElementById("musicPlayer");
    audio.play();
    audio.volume = 0.2;
    audio.loop = true;
  }
  function playBtn() {
    var audio = document.getElementById("clickMusic");
    var bar = document.getElementById("bar2");
    audio.volume = bar.value;
    audio.play();
  }
  function hoverM() {
    var audio = document.getElementById("hoverMusic");
    var bar = document.getElementById("bar3");
    audio.play();
    audio.volume = bar.value;
  }
  function waterM() {
    var audio = document.getElementById("water");
    audio.play();
    audio.volume = 0.5;
  }
  
  var nnn; //esc 변수
  var nn = 0; //esc 변수
  var char = 1;
  var name;
  var mode;
  window.onload = pageLoad;
  function pageLoad() {
    var pic1 = document.getElementById("photo1");
    pic1.onclick = choosecharacter1;
    var pic2 = document.getElementById("photo2");
    pic2.onclick = choosecharacter2;
    var pic3 = document.getElementById("photo3");
    pic3.onclick = choosecharacter3;
  }
  function choosecharacter1() {
    char = 1;
    updatePage("1", "none");
  }
  function choosecharacter2() {
    char = 2;
    updatePage("2", "none");
  }
  function choosecharacter3() {
    char = 3;
    updatePage("3", "none");
  }
  function updatePage(x, y) {
    var player = document.getElementById("choosenchar");
    var sarray = player.src.split("/");
    var str = sarray[sarray.length - 1];
    player.src = "./images/characters/GIFs/p" + x + ".gif";
    if (x == "1") {
      var choosephoto = document.getElementById("photo" + x);
      choosephoto.style.filter = y;
      choosephoto.style.border = "5px solid blue";
      resetPage("2", "3");
    } else if (x == "2") {
      var choosephoto = document.getElementById("photo" + x);
      choosephoto.style.filter = y;
      choosephoto.style.border = "5px solid blue";
      resetPage("1", "3");
    } else if (x == "3") {
      var choosephoto = document.getElementById("photo" + x);
      choosephoto.style.filter = y;
      choosephoto.style.border = "5px solid blue";
      resetPage("1", "2");
    }
  }
  function resetPage(a, b) {
    var choosephoto = document.getElementById("photo" + a);
    choosephoto.style.filter = "grayscale(100)";
    var choosephoto2 = document.getElementById("photo" + b);
    choosephoto2.style.filter = "grayscale(100)";
  }
  
  // story JS
  function toggleChapter(chapterNumber) {
    // document.querySelector("#chapter1").style.display = 'none';
    // document.querySelector("#chapter2").style.display = 'none';
    // document.querySelector("#chapter3").style.display = 'none';
    // document.querySelector("#chapter4").style.display = 'none';
    // document.querySelector("#chapter5").style.display = 'none';
    // document.querySelector(".menu").style.display = 'none';
    var chapter = document.getElementById("chapter" + chapterNumber);
    chapter.style.display = "block";
    if (chapterNumber === 1) Chapter1();
    else if (chapterNumber === 2) Chapter2();
    else if (chapterNumber === 3) Chapter3();
    else if (chapterNumber === 4) Chapter4();
    else if (chapterNumber === 5) Chapter5();
  }
  
  function disableMenuButtons() {
    var buttons = document.querySelectorAll(".menu button");
    buttons.forEach(function (button) {
      button.disabled = true;
    });
  }
  
  function enableMenuButtons() {
    var buttons = document.querySelectorAll(".menu button");
    buttons.forEach(function (button) {
      button.disabled = false;
    });
  }
  
  function disableButtons(){
            var next = document.getElementById('next-button');
            next.disabled = true;
            var next2 = document.getElementById('next-button2');
            next2.disabled = true;
            var next3 = document.getElementById('next-button3');
            next3.disabled = true;
            var nextb = document.getElementById('next-buttonb');
            nextb.disabled = true;
            var next5 = document.getElementById('next-button5');
            next5.disabled = true;
            var nextb5 = document.getElementById('next-buttonb5');
            nextb5.disabled = true;
            var skip = document.getElementById('skip-button');
            skip.disabled = true;
            var skip2 = document.getElementById('skip-button2');
            skip2.disabled = true;
            var skip3 = document.getElementById('skip-button3');
            skip3.disabled = true;
            var skip5 = document.getElementById('skip-button5');
            skip5.disabled = true;
 }

 function enableButtons(){
            var next = document.getElementById('next-button');
            next.disabled = false;
            var next2 = document.getElementById('next-button2');
            next2.disabled = false;
            var next3 = document.getElementById('next-button3');
            next3.disabled = false;
            var nextb = document.getElementById('next-buttonb');
            nextb.disabled = false;
            var next5 = document.getElementById('next-button5');
            next5.disabled = false;
            var nextb5 = document.getElementById('next-buttonb5');
            nextb5.disabled = false;
            var skip = document.getElementById('skip-button');
            skip.disabled = false;
            var skip2 = document.getElementById('skip-button2');
            skip2.disabled = false;
            var skip3 = document.getElementById('skip-button3');
            skip3.disabled = false;
            var skip5 = document.getElementById('skip-button5');
            skip5.disabled = false;
 }
 var ntright;
          function NotTalkingRight(id){
            disableButtons();
            var elem = document.getElementById(id);
            var top= 0;
            var left= -700;
             var height = 70;
            elem.style.filter='grayscale(100)';
            ntright = setInterval(function colorMove(){
              height-=0.07148;
              top+= 1;
              left+=1;
              // if(top>=280 && left<=-500)
              //   clearInterval(id2);
              elem.style.top = top + 'px';
              elem.style.left = left +'px';
              elem.style.height = height+'%';

            if(elem.style.top === '280px'){
              clearInterval(ntright);
              elem.style.display = 'none';
              enableButtons();
            }

            },1)


          }

  var ntleft;

          function NotTalkingLeft(id){
            disableButtons();
            var elem = document.getElementById(id);
            var top= 0;
            var left= 280;
            var height = 70;
             
            elem.style.filter='grayscale(100)';
            ntleft = setInterval(function colorMove(){

              height-=0.07148;
              top+= 1;
              left-=1;
              elem.style.height = height+'%';
              elem.style.top = top + 'px';
              elem.style.left = left +'px';

            if(elem.style.top === '280px'){
              clearInterval(ntleft);
              elem.style.display = 'none';
              enableButtons();
            }


            },1)

          }

    var tleft;
          function TalkingLeft(id){
            disableButtons();
            var top= 280;
            var left= 0;
            var height = 50;
            var elem = document.getElementById(id);
            elem.style.display = 'block';
            elem.style.filter='none';
            tleft = setInterval(function colorMove(){
              height+=0.07148;
              top-= 1;
              left+=1;
              // if(top>=280 && left<=-500)
              //   clearInterval(id2);
            var elem = document.getElementById(id);
              elem.style.top = top + 'px';
              elem.style.left = left +'px';

            elem.style.height= height+'%';

            if(elem.style.top === '0px'){
              clearInterval(tleft);
              enableButtons();
            }

            },1)


          }

    var tright;
          function TalkingRight(id){
            disableButtons();
            var top= 280;
            var left= -420;
            var height = 50;
            var elem = document.getElementById(id);
            elem.style.display = 'block';
            elem.style.filter='none';
            tright = setInterval(function colorMove(){
              height+=0.07148;
              top-= 1;
              left-=1;
              // if(top>=280 && left<=-500)
              //   clearInterval(id2);
            var elem = document.getElementById(id);
              elem.style.top = top + 'px';
              elem.style.left = left +'px';

            elem.style.height= height+'%';

            if(elem.style.top === '0px'){
              clearInterval(tright);
              enableButtons();
            }

            },1)


          }
  
  var i = 0,
    text;
  
  var textarray = [
    "다오: 로두마니? 로두마니가 왜 여기에 있지? 빨리 마을 사람들에게 알려야겠어",
    " 로두마니: 저 꼬마애를 잡아와라!!",
    "부하들: 넵!!!",
  ];
  var k = 0;
  function typing() {
    if (i < text.length) {
      console.log("run2");
      document.getElementById("dialogue-text").innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 30);
    } else {
      clearInterval(typing);
    }
  }
  function Chapter1() {
    document.body.style.backgroundImage = "url('./images/story/ch1.jpg')";
    (i = 0), (k = 0);
    text = "로두마니: ㅎㅎㅎ 이제 나는 부자가 될 수 있어";
    disableMenuButtons();
    $("#dialogue-text").empty();
  
    typing();
    TalkingRight("Lodumani_icon");
    $('#skip-button').off('click');

// Add a new event listener
    $('#skip-button').on('click', function() {
      document.querySelector("#chapter1").style.display = 'none';
      document.getElementById("Dao_icon").style.display = 'none';
      document.getElementById("Lodumani_icon").style.display = 'none';
      document.getElementById("Buha_icon").style.display = 'none';
      enableMenuButtons();

        GameBuff();
    });
    $("#next-button").off("click");
  
    // Add a new event listener
    $("#next-button").on("click", function () {
      if (k < textarray.length) {
        if (k == 0) {
          NotTalkingRight("Lodumani_icon");
          TalkingLeft("Dao_icon");
        } else if (k == 1) {
          TalkingRight("Lodumani_icon");
          NotTalkingLeft("Dao_icon");
        } else if (k == 2) {
          TalkingRight("Buha_icon");
          NotTalkingRight("Lodumani_icon");
        }
        i = 0;
        $("#dialogue-text").empty();
        text = textarray[k];
        typing();
  
        k++;
      } else {
        k = 0;
        document.querySelector("#chapter1").style.display = "none";
        NotTalkingRight("Buha_icon");
        enableMenuButtons();
        GameBuff();
        return;
      }
    });
    return;
  }
  
  //chapter2
  
  function Chapter2() {
    document.body.style.backgroundImage = "url('./images/story/ch1.jpg')";
    disableMenuButtons();
    $("#dialogue-text2").empty();
    var text2 = "부하들: 크윽.. 강하다...";
    var textarray2 = [
      "다오: 빨리 마을로 돌아가야겠어!",
      "다오: 지금 로두마니가 마을에 쳐들어왔어! 빨리 피해야해!!",
      "디지니, 배찌: ???? 진짜 큰일이네.",
      "모비: 쾅!(문을 열며) ㅎㅎㅎ 꼬마들, 이제 끝이다!!!",
      "배찌: 벌써 여기까지 오다니. 피할 수 없어!",
    ];
    var k2 = 0,
      i2 = 0;
  
    function typing2() {
      if (i2 < text2.length) {
        document.getElementById("dialogue-text2").innerHTML += text2.charAt(i2);
        i2++;
        setTimeout(typing2, 30);
      }
    }
    typing2();
    TalkingRight("Buha_icon2");
    $('#skip-button2').off('click');

// Add a new event listener
    $('#skip-button2').on('click', function() {
      document.querySelector("#chapter2").style.display = 'none';
      document.getElementById("Dao_icon2").style.display = 'none';
      document.getElementById("Buha_icon2").style.display = 'none';
      document.getElementById("Diz_icon2").style.display = 'none';
      document.getElementById("Bazzi_icon2").style.display = 'none';
      document.getElementById("Bazzi_icon22").style.display = 'none';
      document.getElementById("Mobi_icon2").style.display = 'none';
      enableMenuButtons();

        GameBuff();
    });
    $("#next-button2").off("click");
  
    // Add a new event listener
    $("#next-button2").on("click", function () {
      if (k2 < textarray2.length) {
        if (k2 == 0) {
          NotTalkingRight("Buha_icon2");
          TalkingLeft("Dao_icon2");
          // lodu.style.top='280px';
          // lodu.style.left='-500px';
        } else if (k2 == 1) {
          document.body.style.backgroundImage = "url('./images/story/ch23.jpg')";
        } else if (k2 == 2) {
          TalkingLeft("Diz_icon2");
          TalkingRight("Bazzi_icon22");
          NotTalkingLeft("Dao_icon2");
        } else if (k2 == 3) {
          NotTalkingRight("Bazzi_icon22");
          NotTalkingLeft("Diz_icon2");
          TalkingRight("Mobi_icon2");
        } else if (k2 == 4) {
          TalkingLeft("Bazzi_icon2");
          NotTalkingRight("Mobi_icon2");
        }
        i2 = 0;
        $("#dialogue-text2").empty();
        text2 = textarray2[k2];
        typing2();
  
        k2++;
      } else {
        k2 = 0;
        document.querySelector("#chapter2").style.display = "none";
        NotTalkingLeft("Bazzi_icon2");
        enableMenuButtons();
        GameBuff();
        return 1;
      }
    });
  }
  // }
  
  //chapter3
  
  function Chapter3() {
    document.body.style.backgroundImage = "url('./images/story/ch23.jpg')";
    disableMenuButtons();
    $("#dialogue-text3").empty();
    var text3 = "모비: @@@@@@";
    var textarray3 = [
      "다오: 우리가 해냈어. 근데 왜 우리 마을에 온 걸까?",
      "디지니: 옛날에 우리 아빠가 우리 마을에 보물이 숨겨져있다는 이야기를 한 걸 들은 적이 있어...",
      "배찌: 나 그거 어딨는지 알아",
      "다오, 디지니: 뭐????? 그걸 왜 이제 말해!",
      " ",
      "다오: 어 저기! 로두마니가 있어!!!",
      "디지니: 빨리 가서 막아야해",
      "투투: 흐흐흐, 어딜! 나를 먼저 지나가라!!!",
    ];
    var k3 = 0,
      i3 = 0;
  
    function typing3() {
      if (i3 < text3.length) {
        document.getElementById("dialogue-text3").innerHTML += text3.charAt(i3);
        i3++;
        setTimeout(typing3, 30);
      }
    }
    typing3();
    TalkingRight("Mobi_icon3");
     $('#skip-button3').off('click');

// Add a new event listener
    $('#skip-button3').on('click', function() {
      document.querySelector("#chapter3").style.display = 'none';
      document.getElementById("Dao_icon3").style.display = 'none';
      document.getElementById("Diz_icon3").style.display = 'none';
      document.getElementById("Bazzi_icon3").style.display = 'none';
      document.getElementById("Mobi_icon3").style.display = 'none';
      enableMenuButtons();

        GameBuff();
    });
    $("#next-button3").off("click");
  
    // Add a new event listener
    $("#next-button3").on("click", function () {
      if (k3 < textarray3.length) {
        if (k3 == 0) {
          NotTalkingRight("Mobi_icon3");
          TalkingLeft("Dao_icon3");
        } else if (k3 == 1) {
          NotTalkingLeft("Dao_icon3");
          TalkingRight("Diz_icon3");
        } else if (k3 == 2) {
          TalkingLeft("Bazzi_icon3");
          NotTalkingRight("Diz_icon3");
        } else if (k3 == 3) {
          NotTalkingLeft("Bazzi_icon3");
          TalkingRight("Diz_icon3");
          TalkingLeft("Dao_icon3");
        } else if (k3 == 4) {
          $("#black-screen").empty();
          document.querySelector(".black-screen").style.display = "block";
          NotTalkingRight("Diz_icon3");
          NotTalkingLeft("Dao_icon3");
          var ib = 0;
          var textb =
            "다오, 디지니, 배찌는 보물의 숨겨져 있다는 장소로 이동한다.";
          function typingb() {
            if (ib < textb.length) {
              document.getElementById("black-screen").innerHTML +=
                textb.charAt(ib);
              ib++;
              setTimeout(typingb, 30);
            }
          }
          typingb();
          $("#next-buttonb").off("click");
  
          // Add a new event listener
          $("#next-buttonb").on("click", function () {
            document.body.style.backgroundImage = "url('./images/story/ch3.jpg')";
            document.querySelector(".black-screen").style.display = "none";
            TalkingLeft("Dao_icon3");
            i3 = 0;
            $("#dialogue-text3").empty();
            text3 = textarray3[k3];
            typing3();
  
            k3++;
          });
        } else if (k3 == 6) {
          NotTalkingLeft("Dao_icon3");
          TalkingRight("Diz_icon3");
        } else if (k3 == 7) {
          NotTalkingRight("Diz_icon3");
          TalkingRight("Toto_icon3");
        }
        i3 = 0;
        $("#dialogue-text3").empty();
        text3 = textarray3[k3];
        typing3();
  
        k3++;
      } else {
        k3 = 0;
        document.querySelector("#chapter3").style.display = "none";
        NotTalkingRight("Toto_icon3");
        enableMenuButtons();
        GameBuff();
        return 1;
      }
    });
  }
  // }
  
  //Chapter 4
  
  function Chapter4() {
    disableMenuButtons();
    $("#screen").empty();
    $("#chapter4").show();
    document.body.style.backgroundImage = "url('./images/story/black.jpg')";
    document.querySelector(".screen").style.display = "block";
  
    document.getElementById("next-buttons").style.display = "block";
    var is = 0;
    var texts =
      "로두마니:             으으(매우 화가남).        꼬맹이들, 내가 직접 상대해주마!!!!!!!";
    function typings() {
      if (is < texts.length) {
        document.getElementById("screen").innerHTML += texts.charAt(is);
        is++;
        setTimeout(typings, 60);
      }
    }
    typings();
    $("#next-buttons").off("click");
  
    // Add a new event listener
    $("#next-buttons").on("click", function () {
      document.querySelector(".screen").style.display = "none";
      document.getElementById("sboss").style.display = "block";
  
      document.getElementById("sboss").muted = false;
      document.getElementById("Lodumani_boss").style.display = "block";
      document.getElementById("sboss").play();
      $("#next-buttons").off("click");
  
      // Add a new event listener
      $("#next-buttons").on("click", function () {
        document.getElementById("sboss").muted = true;
        document.getElementById("sboss").style.display = "none";
        document.getElementById("next-buttons").style.display = "none";
        document.getElementById("Lodumani_boss").style.display = "none";
        document.body.style.backgroundImage = "url('./images/story/backgroundimg.png')";
        enableMenuButtons();
        $("#chapter4").hide();
        GameBuff();
        return 1;
      });
    });
  }
  
  //End
  
  function Chapter5() {
    document.body.style.backgroundImage = "url('./images/story/ch3.jpg')";
    disableMenuButtons();
    $("#dialogue-text5").empty();
    var text5 = "로두마니: 크윽.. 나중에 다시 돌아오마";
    var textarray5 = [
      "디지니: 와!! 우리가 물리쳤어!!",
      "다오: 배찌, 그래서 보물은 어디있어?",
      "배찌: 보물은 여기 있어?",
      "디지니: ???? 이게 뭐야 이게 보물이라고?",
      " ",
    ];
    var k5 = 0,
      i5 = 0;
  
    function typing5() {
      if (i5 < text5.length) {
        document.getElementById("dialogue-text5").innerHTML += text5.charAt(i5);
        i5++;
        setTimeout(typing5, 30);
      }
    }
    typing5();
    TalkingRight("Lodumani_icon5");
    $('#skip-button5').off('click');

// Add a new event listener
    $('#skip-button5').on('click', function() {
      document.querySelector("#chapter5").style.display = 'none';
      document.getElementById("Dao_icon5").style.display = 'none';
      document.getElementById("Lodumani_icon5").style.display = 'none';
      document.getElementById("Diz_icon5").style.display = 'none';
      document.getElementById("Bazzi_icon5").style.display = 'none';
      enableMenuButtons();
      
      $("#display-main").hide();
      $("#gameOver").hide();
      $("#clear").hide();
      $("#credit").hide();
    });
    $("#next-button5").off("click");
  
    // Add a new event listener
    $("#next-button5").on("click", function () {
      if (k5 < textarray5.length) {
        if (k5 == 0) {
          NotTalkingRight("Lodumani_icon5");
          TalkingLeft("Diz_icon5");
        } else if (k5 == 1) {
          NotTalkingLeft("Diz_icon5");
          TalkingLeft("Dao_icon5");
        } else if (k5 == 2) {
          TalkingRight("Bazzi_icon5");
          NotTalkingLeft("Dao_icon5");
        } else if (k5 == 3) {
          NotTalkingRight("Bazzi_icon5");
          TalkingLeft("Diz_icon5");
        } else if (k5 == 4) {
          $("#black-screen5").empty();
          document.querySelector(".black-screen5").style.display = "block";
          NotTalkingLeft("Diz_icon5");
          var ib5 = 0;
          var textb5 =
            "?     ?     ?     ?              (검은 그림자):                어허,             너희들 여기서 뭐하는 거야";
          function typingb5() {
            if (ib5 < textb5.length) {
              document.getElementById("black-screen5").innerHTML +=
                textb5.charAt(ib5);
              ib5++;
              setTimeout(typingb5, 60);
            }
          }
          typingb5();
          $("#next-buttonb5").off("click");
  
          // Add a new event listener
          $("#next-buttonb5").on("click", function () {
            $("#black-screen5").empty();
            ib5 = 0;
            textb5 = "- 시즌 2를 기대해주세요";
            typingb5();
            $("#next-buttonb5").off("click");
  
            // Add a new event listener
            $("#next-buttonb5").on("click", function () {
              document.querySelector(".black-screen5").style.display = "none";
              document.querySelector(".chapter").style.display = "none";
  
              document.querySelector("#chapter5").style.display = "none";
              enableMenuButtons();
              $("#display-main").hide();
              $("#gameOver").hide();
              $("#clear").hide();
              $("#credit").hide();
            });
          });
        }
        i5 = 0;
        $("#dialogue-text5").empty();
        text5 = textarray5[k5];
        typing5();
  
        k5++;
      } else {
        document.querySelector("#chapter5").style.display = "none";
        enableMenuButtons();
        $("#display-main").hide();
        $("#gameOver").hide();
        $("#clear").hide();
        $("#display-main").hide();
        $("#gameOver").hide();
        $("#clear").hide();
        $("#credit").hide();
        return 1;
      }
    });
  }
  
  // buff JS
  var selectedBoxIndices = [];
  $("#start").css("opacity", "0.5");
  
  function initBuff() {
    $(".box").each(function (index) {
      $(this).on("click", function () {
        if (selectedCount >= 2 && !$(this).hasClass("selected")) {
          return;
        }
  
        if ($(this).hasClass("selected")) {
          $(this).removeClass("selected");
          selectedCount--;
  
          const selectedIndex = selectedBoxIndices.indexOf(index);
          if (selectedIndex !== -1) {
            selectedBoxIndices.splice(selectedIndex, 1);
          }
        } else {
          $(this).addClass("selected");
          selectedCount++;
  
          selectedBoxIndices.push(index);
        }

        selectedBoxIndices.forEach(function (selectedIndex, idx) {
          const buffKey = idx === 0 ? "Buff1" : "Buff2";
          const selectedBox = $(".box").eq(selectedIndex);
          const boxText = selectedBox.find("p").text();
  
          if (boxText === "WIDER") {
            localStorage.setItem(buffKey, "A");
          } else if (boxText === "BALL") {
            localStorage.setItem(buffKey, "B");
          } else if (boxText === "POWER") {
            localStorage.setItem(buffKey, "C");
          } else if (boxText === "SPACE") {
            localStorage.setItem(buffKey, "D");
          }
        });
  
        $("#start").prop("disabled", selectedCount < 2);
        $("#start").css("opacity", selectedCount < 2 ? "0.5" : "1");
  
        if (selectedCount >= 2) {
          $(".box").each(function () {
            if (!$(this).hasClass("selected")) {
              $(this).addClass("disabled");
            }
          });
        } else {
          $(".box").removeClass("disabled");
        }
      });
    });
  }
  
  const images = [
    { src: "./images/buffs/speed.png", text: "WIDER" },
    { src: "./images/buffs/ball.png", text: "BALL" },
    { src: "./images/buffs/power.png", text: "POWER" },
    { src: "./images/buffs/space.png", text: "SPACE" },
  ];
  
  function GameBuff() {
    initBuff();
    selectedCount = 0;
    selectedBoxIndices.length = 0;
  
    $("#display-buff").show();
    $("body").removeAttr("style");
    $("body").css({
      width: "700px",
      height: "1080px",
      padding: "0px",
      "margin-left": "20px",
      "background-image": "url(./images/buffs/background.png)",
    });
  
    $(".box").removeClass("selected");
    $(".box").removeClass("disabled");
    $("#start").prop("disabled", true);
    $("#start").css("opacity", "0.5");
  
    const imageIds = ["image1", "image2", "image3"];
    const textIds = ["text1", "text2", "text3"];
    var usedImages = [];
  
    for (let i = 0; i < imageIds.length; i++) {
      let randomIndex = Math.floor(Math.random() * images.length);
      const image = $("#" + imageIds[i]);
      const text = $("#" + textIds[i]);
  
      while (usedImages.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * images.length);
      }
  
      image.attr("src", images[randomIndex].src);
      text.text(images[randomIndex].text);
  
      usedImages.push(randomIndex);
    }
  }
  
  $("#again").click(() => {
    initBuff();
    GameBuff();
    $("#again").prop("disabled", true);
    $("#again").css("display", "none");
    $("#start").css("opacity", "0.5");
  })
  
  $("#start").click(() => {
    $("body").removeAttr("style");
    // $("body").css("background-color", "#1e1e1e");
    // $("body").css("cursor", "pointer");
    // $("body").css("background-size", "cover");
    // $("body").css("background-repeat", "no-repeat");
    $("body").css("overflow-x", "hidden");
    $("body").css("overflow-y", "hidden");
    $("#display-buff").hide();
    Barwider.style.opacity = 0.5;
    Plusball.style.opacity = 0.5;
    Powerball.style.opacity = 0.5;
    Ballspace.style.opacity = 0.5;
    $("#debuffaa").css("opacity", "0.5");
    $("#debuffbb").css("opacity", "0.5");
    $("#debuffcc").css("opacity", "0.5");
    $("#debuffdd").css("opacity", "0.5");
    initGame();
  })
});