class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {}
}

class LargeRock extends Obstacle {
  display() {
    fill(73, 55, 56);

    beginShape();
    vertex(this.x, this.y);
    vertex(this.x - 33, this.y + 1);
    vertex(this.x - 45, this.y + 14);
    vertex(this.x - 61, this.y + 21);
    vertex(this.x - 59, this.y + 35);
    vertex(this.x - 39, this.y + 35);
    vertex(this.x - 16, this.y + 26);
    vertex(this.x - 14, this.y + 15);
    vertex(this.x - 6, this.y + 14);

    endShape(CLOSE);
  }
}

class SmallRock extends Obstacle {
  display() {
    fill(73, 55, 56);
    beginShape();
    vertex(this.x + 195, this.y + 191);
    vertex(this.x + 162, this.y + 192);
    vertex(this.x + 150, this.y + 205);
    vertex(this.x + 134, this.y + 205);
    vertex(this.x + 136, this.y + 219);
    vertex(this.x + 156, this.y + 219);
    vertex(this.x + 179, this.y + 210);
    vertex(this.x + 181, this.y + 199);
    vertex(this.x + 189, this.y + 198);

    endShape(CLOSE);
  }
}

let imag3;
let screen = "start";
let gameStarted = false;
let bigTables = [];
let lavaX = 0;
let obstacle = [];
let obstacleTypes = [LargeRock, SmallRock];
let x = 0;
let y = -50;
let gravity = 15;
let lavaWidth;
let acceleration = 1;
let gravityEnabled = false;
let speed = 5;
let displayFlag = false;
let timer = 0;
let flagX = 0;
let flagY = 0;

function setup() {
  createCanvas(700, 600);
  let width = 700;
  let height = 600;
  lavaWidth = 740;

  background(234, 200, 135);

  // Create objects
  // obstacle.push(
  //   new BigTable(
  //     Math.floor(Math.random() * width),
  //     Math.floor(Math.random() * 130) + 420
  //   )
  // );
  // obstacle.push(
  //   new Chair(
  //     Math.floor(Math.random() * width),
  //     Math.floor(Math.random() * 130) + 420
  //   )
  // );
  obstacle.push(
    new LargeRock(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * 130) + 420
    )
  );
  obstacle.push(
    new SmallRock(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * 130) + 420
    )
  );
  // Create big tables
  for (let i = 0; i < 1; i++) {
    const bigTable = {
      x: 150,
      y: 400,
      alpha: Math.random(),
    };
    const newBigTable = {
      x: 600,
      y: 400,
      alpha: Math.random(),
    };
    bigTables.push(bigTable);
    bigTables.push(newBigTable);
  }
}

//Start screen image
function preload() {
  imag3 = loadImage("gamescreendesign.png");
}

function draw() {
  if (screen === "start") {
    startScreen();
  } else if (screen === "game") {
    gameScreen();
    controls();
  }
}

//displaying the strat screen
function startScreen() {
  background(234, 200, 135);

  //GAME NAME
  image(imag3, 0, 0, 700, 600);

  //START button
  fill(0);
  rect(201, 309, 319, 70, 50);
  textSize(24);
  fill(245);
  textFont("sans-serif");
  text("Press ENTER to Start", 244, 350);
}

function drawBigTable(x, y) {
  fill(73, 55, 76);
  rect(x, y, 250, 70);
  rect(x + 27, y + 70, 16, 60);
  rect(x + 69, y + 70, 16, 40);
  rect(x + 167, y + 70, 16, 60);
  rect(x + 207, y + 70, 16, 40);

  beginShape();
  fill(255);
  vertex(x + 37, y + 14);
  vertex(x + 21, y + 27);
  vertex(x + 37, y + 41);
  vertex(x + 54, y + 27);
  endShape(CLOSE);

  line(x + 37, y + 20, x + 28, y + 27);
  line(x + 41, y + 22, x + 31, y + 30);
  line(x + 45, y + 25, x + 35, y + 33);
}

function windows(x) {
  fill(156, 196, 232);
  rect(x, 100, 200, 200);
  push();
  strokeWeight(1.5);
  line(140, 100, 140, 300);
  line(40, 200, 240, 200);
  line(460, 100, 460, 300);
  line(360, 200, 560, 200);
  pop();
}

function sun() {
  push();
  noStroke();
  fill(253, 208, 23);
  ellipse(196, 138, 60);
  fill(237, 145, 33);
  ellipse(196, 138, 50);
  fill(255, 255, 0);
  ellipse(196, 138, 40);
  pop();
}

function cardboard() {
  fill(73, 55, 56);
  rect(255, 100, 90, 360);
}

function smallShelf(x) {
  rect(x, 350, 200, 100);
  rect(x + 5, 355, 190, 45);
  rect(x + 5, 402, 190, 45);
  rect(x + 10, 360, 15, 35);
  rect(x + 30, 360, 15, 35);
  rect(x + 50, 360, 15, 35);
  rect(x + 70, 360, 15, 35);
  rect(x + 90, 360, 15, 35);
  rect(x + 110, 360, 15, 35);
  rect(x + 130, 360, 15, 35);
  rect(x + 150, 385, 40, 10);
  rect(x + 153, 375, 35, 8);
  rect(x + 10, 407, 15, 35);
  rect(x + 30, 407, 15, 35);
  rect(x + 50, 407, 15, 35);
  rect(x + 70, 407, 15, 35);
  rect(x + 90, 407, 15, 35);
  rect(x + 110, 407, 15, 35);
  rect(x + 130, 407, 15, 35);
}

function shelf(x, y) {
  rect(x, y, 80, 40);
  rect(x + 5, y + 5, 10, 30);
  rect(x + 20, y + 5, 10, 30);
  rect(x + 35, y + 5, 10, 30);
  rect(x + 50, y + 5, 10, 30);
  rect(x + 65, y + 5, 10, 30);
}

function lava() {
  let lavaWidth = 740;
  // let lavaFlows = 2;

  for (let i = 0; i < 2; i++) {
    let x = i * lavaWidth - lavaX;

    push();
    stroke(223, 61, 40);
    fill(223, 61, 40);
    rect(x, 450, lavaWidth, 150);

    // wavy surface
    push();
    beginShape();
    stroke(224, 99, 30);
    strokeWeight(2);
    vertex(x + 101, 451);
    bezierVertex(x + 203, 450, x + 153, 408, x + 259, 440);
    bezierVertex(x + 321, 451, x + 309, 426, x + 389, 442);
    bezierVertex(x + 450, 423, x + 432, 448, x + 533, 451);
    bezierVertex(x + 575, 450, x + 557, 428, x + 609, 442);
    bezierVertex(x + 651, 451, x + 707, 435, x + 740, 451);
    vertex(x + 740, 451);
    endShape();
    pop();
    pop();
  }
}
function animateLava() {
  lavaX += 5;

  if (lavaX > 740) {
    lavaX = 0;
  }
}

function startGround() {
  push();
  noStroke();
  fill(150, 150, 150);
  rect(0, 370, 100, 230);
  pop();
}

/*
function character() {
fill(0, 0, 0);
triangle(10, 370, 50, 250, 90, 370);
ellipse(50, 230, 35);
triangle(25, 370, 35, 420, 45, 370);
triangle(55, 370, 65, 420, 75, 370);
}*/

//smaller
function character() {
  fill(0, 0, 0);
  //body
  triangle(x + 51, y + 282, x + 20, y + 391, x + 83, y + 391);
  //face
  ellipse(x + 51, y + 268, 25);
  // legs
  triangle(x + 33, y + 391, x + 41, y + 419, x + 49, y + 391);
  triangle(x + 53, y + 391, x + 60, y + 419, x + 70, y + 391);
}

function flag(flagX, flagY) {
  if (displayFlag) {
    fill(225);
    triangle(
      flagX + 600,
      flagY + 290,
      flagX + 650,
      flagY + 330,
      flagX + 600,
      flagY + 355
    );
    fill(0, 0, 0);
    rect(flagX + 600, flagY + 350, 6, 70);
  }
}

// start game key pressed
function keyPressed() {
  if (keyCode === 13 && screen === "start") {
    screen = "game";
    gameStarted = true;
  }
}

function controls() {
  if (keyIsDown(32) || keyIsDown(38)) {
    y -= 20;
    x += 6;
    gravityEnabled = true;
  } else if (keyIsDown(39)) {
    x += 5;
    gravityEnabled = true;
  } else if (keyIsDown(37)) {
    x -= 5;
    gravityEnabled = true;
  } else if (keyIsDown(40)) {
    y += 5;
    gravityEnabled = true;
  }
}

function updateCharacter() {
  if (gravityEnabled) {
    gravity = gravity + acceleration;
    gravity = 5;

    for (let i = 0; i < bigTables.length; i++) {
      let bigTable = bigTables[i];
      if (
        x + 70 > bigTable.x &&
        x < bigTable.x + 250 &&
        y + 391 > bigTable.y &&
        y + 268 < bigTable.y + 70
      ) {
        console.log("Collision with table detected!");
        gravity = 0;
        y = bigTable.y - 282;
      }
    }

    if (y >= 400) {
      gravity = 0;
      y = 400;
    }

    if (y !== 400 && y + 282 < 400) {
      y += gravity;
    }
  }
}

function gameScreen() {
  background(234, 200, 135);

  windows(40);
  windows(360);
  cardboard();
  shelf(260, 110);
  shelf(260, 160);
  shelf(260, 210);
  shelf(260, 260);
  shelf(260, 310);
  shelf(260, 360);
  shelf(260, 410);
  smallShelf(350);
  smallShelf(50);
  smallShelf(555);
  smallShelf(-155);
  animateLava();
  lava(lavaX);
  sun();

  for (let i = bigTables.length - 1; i >= 0; i--) {
    let bigTable = bigTables[i];
    drawBigTable(bigTable.x, bigTable.y);

    bigTable.x -= speed;
    speed += 0.01;

    if (bigTable.x + 280 <= 0) {
      bigTable.x = 650;
      bigTable.y = 400;
    }

    if (timer >= 500 && !displayFlag) {
      for (let i = 0; i < bigTables.length; i++) {
        let bigTable = bigTables[i];
        displayFlag = true;
        flagX = bigTable.x + 600;
        flagY = bigTable.y - 80;
      }
    }
  }

  if (displayFlag) {
    flag(flagX, flagY);
  }

  startGround();
  character();
  controls();
  updateCharacter();
}
