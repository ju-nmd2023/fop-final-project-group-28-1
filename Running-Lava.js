class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {}
}

class BigTable extends Obstacle {
  display() {
    fill(73, 55, 76);
    rect(this.x, this.y, 250, 70);
    rect(this.x + 27, this.y + 70, 16, 60);
    rect(this.x + 69, this.y + 70, 16, 40);
    rect(this.x + 167, this.y + 70, 16, 60);
    rect(this.x + 207, this.y + 70, 16, 40);

    beginShape();
    fill(255);
    vertex(this.x + 37, this.y + 14);
    vertex(this.x + 21, this.y + 27);
    vertex(this.x + 37, this.y + 41);
    vertex(this.x + 54, this.y + 27);
    endShape(CLOSE);

    line(this.x + 37, this.y + 20, this.x + 28, this.y + 27);
    line(this.x + 41, this.y + 22, this.x + 31, this.y + 30);
    line(this.x + 45, this.y + 25, this.x + 35, this.y + 33);
  }
}

class Chair extends Obstacle {
  display() {
    fill(136, 136, 136);
    ellipse(this.x, this.y, 90, 40);
    ellipse(this.x - 1, this.y + 63, 114, 40);
    fill(0);
    rect(this.x - 16, this.y + 91, 6, 34);
    rect(this.x + 13, this.y + 91, 6, 24);
    rect(this.x - 30, this.y + 153, 6, 38);
    rect(this.x - 16, this.y + 154, 6, 26);
    rect(this.x + 13, this.y + 154, 6, 26);
    rect(this.x + 27, this.y + 152, 6, 38);
  }
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
let obstacleTypes = [BigTable, Chair, LargeRock, SmallRock];
let x = 0;
let y = 0;
let gravity = 5;
let lavaWidth;

function setup() {
  createCanvas(700, 600);
  let width = 700;
  let height = 600;
  lavaWidth = 740;

  background(234, 200, 135);

  // Create objects
  obstacle.push(
    new BigTable(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * 130) + 420
    )
  );
  obstacle.push(
    new Chair(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * 130) + 420
    )
  );
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
  //   // Create big tables
  //   for (let i = 0; i < 1; i++) {
  //     const bigTable = {
  //       x: Math.floor(Math.random() * width),
  //       y: 400,
  //       alpha: Math.random(),
  //     };
  //     bigTables.push(bigTable);
  //   }
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
  triangle(x + 51, y + 282, x + 20, y + 391, x + 83, y + 391);
  ellipse(x + 51, y + 268, 25);
  triangle(x + 33, y + 391, x + 41, y + 419, x + 49, y + 391);
  triangle(x + 53, y + 391, x + 60, y + 419, x + 70, y + 391);
}

// start game key pressed
function keyPressed() {
  if (keyCode === 13 && screen === "start") {
    screen = "game";
    gameStarted = true;
  }
}

function controls() {
  if (keyIsPressed) {
    if (keyCode === 38) {
      y -= 5;
    } else if (keyCode === 39) {
      x += 5;
    } else if (keyCode === 37) {
      x -= 5;
    } else if (keyCode === 40) {
      y += 5;
    }
  }
}

function updateCharacter() {
  let landedOnObstacle = false;
  let obstacleIndex = -1;
  // Check collision with obstacles
  for (let i = 0; i < obstacle.length; i++) {
    let obj = obstacle[i];
    if (
      x > obj.x && // Check if the character's right bottom corner is to the right of the obstacle's left edge
      x + 20 < obj.x + 150 && // Check if the character's left bottom corner is to the left of the obstacle's right edge
      y + 282 > obj.y && // Check if the character's legs touch the top of the obstacle
      y + 282 < obj.y + 70 // Check if the character's legs are above the bottom edge of the obstacle
    ) {
      // If character's legs touch the obstacle, adjust character's x position to stay at that specific place
      x = obj.x - 20; // Adjust the character's x position to be in the same x position as the obstacle
      landedOnObstacle = true;
      obstacleIndex = i;
      break;
    }
  }

  // Check collision with lava
  if (
    x + 51 > lavaX && // Check if the character's right bottom corner is to the right of the lava's left edge
    x + 20 < lavaX + lavaWidth && // Check if the character's left bottom corner is to the left of the lava's right edge
    y + 282 > 450 && // Check if the character's legs touch the top of the lava
    y + 282 < 600 // Check if the character's legs are above the bottom edge of the canvas
  ) {
    // If the character lands on the lava, keep the character's current position
    return; // Exit the function to prevent further movement processing
  }
  // Check if the character is on the ground
  if (y === 420) {
    gravity = 0; // Stop gravity if on the ground
  }
  // Apply gravity if not on an obstacle, lava, or the ground
  if (!landedOnObstacle && y !== 420) {
    gravity = 1;
  }
  y += gravity;
  controls(); // Call the controls function to handle key events
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

  // Call new obstacles randomly
  if (frameCount % 100 === 0) {
    let rand = Math.floor(random(obstacleTypes.length));
    let newObstacle = new obstacleTypes[rand](
      700,
      Math.floor(Math.random() * 130) + 420
    );
    obstacle.push(newObstacle);
  }

  // Draw and update obstacles
  for (let i = obstacle.length - 1; i >= 0; i--) {
    let obj = obstacle[i];
    obj.display();
    obj.x -= 5;

    // Remove obstacles
    if (obj.x < -250) {
      obstacle.splice(i, 1);
    }
  }

  startGround();
  character();
  controls();
  updateCharacter();
}
