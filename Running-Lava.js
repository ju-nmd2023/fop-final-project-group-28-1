let lavaX = 0;
let bigTables = [];
let imag3;
let screen = "start";
let gameStarted = false;

//Start screen image 
function preload() {
  imag3 = loadImage("gamescreendesign.png");
}
function setup() {
  createCanvas(700, 600);

  for (let i = 0; i < 1; i++) {
    const bigTable = {
      x: Math.floor(Math.random() * width),
      y: 400,
    };
    bigTables.push(bigTable);
  }
}

function draw() {
  if (screen === "start") {
    startScreen();
  } else if (screen === "game") {
    gameScreen();
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
  lava(lavaX);
  character();
  sun();

  animateLava();

  for (let bigTable of bigTables) {
    drawBigTable(bigTable.x, bigTable.y);
    bigTable.x -= 5;

    if (bigTable.x > width) {
      bigTable.x = Math.floor(Math.random() * 300);
      bigTable.y = 450;
    }
  }
  startGround();
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
  rect(0, 420, 100, 180);
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
  triangle(51, 282, 20, 391, 83, 391);
  ellipse(51, 268, 25);
  triangle(33, 391, 41, 419, 49, 391);
  triangle(53, 391, 60, 419, 70, 391);
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

// function bigTable(x) {
//   fill(73, 55, 76);
//   rect(296, 413, 250, 70);
//   rect(323, 483, 16, 60);
//   rect(365, 483, 16, 40);
//   rect(463, 483, 16, 60);
//   rect(503, 483, 16, 40);

//   beginShape();
//   fill(255);
//   vertex(336, 427);
//   vertex(320, 440);
//   vertex(336, 454);
//   vertex(353, 440);
//   endShape(CLOSE);

//   line(336, 433, 327, 440);
//   line(340, 435, 330, 443);
//   line(344, 438, 334, 446);
// }

//chair
function chair() {
  fill(136, 136, 136);
  ellipse(672, 472, 90, 40);
  ellipse(671, 535, 114, 40);
  push();
  fill(0);
  rect(656, 491, 6, 24);
  rect(685, 491, 6, 24);
  rect(642, 553, 6, 38);
  rect(656, 554, 6, 26);
  rect(685, 554, 6, 26);
  rect(699, 552, 6, 38);

  pop();
}

function largeRock() {
  fill(73, 55, 56);

  beginShape();
  vertex(246, 474);
  vertex(213, 475);
  vertex(201, 488);
  vertex(185, 495);
  vertex(187, 509);
  vertex(207, 509);
  vertex(230, 500);
  vertex(232, 489);
  vertex(240, 488);

  endShape(CLOSE);
}

function smallRock() {
  fill(73, 55, 56);
  beginShape();
  vertex(441, 591);
  vertex(408, 592);
  vertex(396, 605);
  vertex(380, 605);
  vertex(382, 619);
  vertex(402, 619);
  vertex(425, 610);
  vertex(427, 599);
  vertex(435, 598);

  endShape(CLOSE);
}
function smallestRock() {
  beginShape();
  fill(73, 55, 56);
  ellipse(699, 519, 20, 5);
  endShape(CLOSE);
}

// start game key pressed
function keyPressed() {
  if (keyCode === 13 && screen === "start") {
    screen = "game";
    gameStarted = true;
  }
}
