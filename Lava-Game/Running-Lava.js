class Button {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }
  buttons() {
    push();
    translate(this.x, this.y);
    noStroke();
    strokeWeight(2);
    fill(255);
    rect(0, 0, this.width, this.height, this.height / 2);

    //text
    noStroke();
    fill(223, 61, 40);
    textSize(this.height / 2);
    textAlign(CENTER);
    text(this.text, 0, this.height / 4, this.width);

    pop();
  }

  hitTest(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
let easyButton = new Button(150, 400, 100, 40, "Level 1");
let mediumButton = new Button(290, 400, 100, 40, "Level 2");
let hardButton = new Button(430, 400, 100, 40, "Level 3");

class Debris {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  drawBigRock() {
    fill(73, 55, 56);
    beginShape();
    vertex(this.x, this.y + 50);
    vertex(this.x - 33, this.y + 51);
    vertex(this.x - 45, this.y + 64);
    vertex(this.x - 61, this.y + 71);
    vertex(this.x - 59, this.y + 85);
    vertex(this.x - 39, this.y + 85);
    vertex(this.x - 16, this.y + 76);
    vertex(this.x - 14, this.y + 65);
    vertex(this.x - 6, this.y + 64);
    endShape(CLOSE);
  }

  drawSmallRock() {
    fill(73, 55, 56);
    beginShape();
    vertex(this.x + 195, this.y + 161);
    vertex(this.x + 162, this.y + 162);
    vertex(this.x + 150, this.y + 175);
    vertex(this.x + 134, this.y + 175);
    vertex(this.x + 136, this.y + 189);
    vertex(this.x + 156, this.y + 189);
    vertex(this.x + 179, this.y + 180);
    vertex(this.x + 181, this.y + 169);
    vertex(this.x + 189, this.y + 168);
    endShape(CLOSE);
  }
  drawBook() {
    fill(150, 75, 0);
    rect(this.x + 400, this.y + 96, 60, 30, 2);
    fill(255);
    rect(this.x + 400, this.y + 90, 60, 10, 2);
    fill(0);
    rect(this.x + 400, this.y + 90, 5, 10, 2);
  }
  drawPen() {
    fill(0, 0, 0);
    rect(this.x + 600, this.y + 50, 40, 5, 5);
    rect(this.x + 620, this.y + 55, 20, 3, 5);
    fill(255, 255, 255);
    rect(this.x + 640, this.y + 50, 5, 5);
  }
  update() {
    this.x -= 5;

    if (this.x <= -200) {
      this.x = 700;
      this.x -= 5;
    }
  }
}

let debris = new Debris(700, 420);

let imag3;
let imag4;
let imag5;
let screen = "start";
let gameStarted = false;
let bigTables = [];
let lavaX = 0;
let x = 0;
let y = -50;
let gravity = 15;
let lavaWidth;
let acceleration = 1;
let gravityEnabled = false;
let speed = 5;
let displayFlag = false;
let timer = 0;
let onTable = false;
let books = [];
let lifeHearts = [];
let book = false;

function setup() {
  createCanvas(700, 600);
  frameRate(50);

  let width = 700;
  let height = 600;
  lavaWidth = 740;

  background(234, 200, 135);

  //book loop
  for (let i = 0; i < 1; i++) {
    let x = random(400, 650);
    let y = random(200, 300);
    books.push({ x, y });
  }
  //loop life hearts
  for (let i = 0; i < 3; i++) {
    lifeHearts.push({ x: 10 + i * 25, y: 17 });
  }
  // Create big tables
  for (let i = 0; i < 1; i++) {
    let bigTable1 = {
      x: 150,
      y: 400,
      alpha: Math.random(),
    };
    let bigTable2 = {
      x: 600,
      y: 400,
      alpha: Math.random(),
    };
    bigTables.push(bigTable1);
    bigTables.push(bigTable2);
  }
}

//Start screen image
function preload() {
  imag3 = loadImage("gamescreendesign.png");
  imag4 = loadImage("lostscreen.png");
  imag5 = loadImage("wonscreen.png");
}

function draw() {
  if (screen === "start") {
    startScreen();
  } else if (screen === "level1") {
    level1();
    controls();
    resultScreen();
  } else if (screen === "level2") {
    level2();
    controls();
    resultScreen();
  } else if (screen === "level3") {
    level3();
    controls();
    resultScreen();
  } else if (screen === "result") {
    resultScreen();
  }
}

function mousePressed() {
  if (mouseIsPressed) {
    if (easyButton.hitTest(mouseX, mouseY)) {
      level1();
      gameStarted = true;
    } else if (mediumButton.hitTest(mouseX, mouseY)) {
      level2();
    } else if (hardButton.hitTest(mouseX, mouseY)) {
      level3();
    }
  }
}

//displaying the strat screen
function startScreen() {
  background(234, 200, 135);

  //GAME NAME
  image(imag3, 0, 0, 700, 600);

  //BUTTON
  easyButton.buttons();
  mediumButton.buttons();
  hardButton.buttons();
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

//------------------- TRY!!!!//---------------------

function displayBook(x, y) {
  fill(150, 75, 0);
  rect(x, y, 60, 30, 2);
  fill(255);
  rect(x, y - 6, 60, 10, 2);
  fill(0);
  rect(x, y - 6, 5, 10, 2);
}

/// READ THIS-------------------------------

function updateBooks() {
  if (book) {
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      book.y += speed;
      book.x -= speed;

      displayBook(book.x, book.y);

      if (book.y > height) {
        books.splice(i, 1);
        i--;
        let x = random(350, 690);
        let y = random(0);
        books.push({ x: x, y: y });
      }
    }
  }
}

// FOR THE LIFE HEARTS DRAWING AND DISPLAYING HERE-----
function drawHeart(x, y) {
  push();
  fill(170, 51, 106);
  noStroke();
  triangle(x + 19, y + 17, x + 28, y + 31, x + 37, y + 16);
  ellipse(x + 23, y + 13, 11);
  ellipse(x + 32, y + 13, 11);

  pop();
}

function displayHearts() {
  for (let heart of lifeHearts) {
    drawHeart(heart.x, heart.y);
  }
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

function end() {
  if (displayFlag) {
    fill(0);
    rect(650, 0, 50, 100);
    rect(650, 200, 50, 100);
    rect(650, 400, 50, 100);
    fill(255);
    rect(650, 100, 50, 100);
    rect(650, 300, 50, 100);
    rect(650, 500, 50, 100);
  }
}

// start game key pressed
function keyPressed() {
  if (keyCode === 32 && screen === "result") {
    resetGame();
  }
}

function controls() {
  // if (keyIsDown(32) ||
  if (keyIsDown(38)) {
    y -= 10;
    x += 5;
    gravityEnabled = true;
  } else if (keyIsDown(39)) {
    x += 5;
    gravityEnabled = true;
  }
  // } else if (keyIsDown(37)) {
  //   x -= 10;
  //   gravityEnabled = true;
  // }
}

function updateCharacter() {
  if (gravityEnabled) {
    gravity = gravity + acceleration;

    y += gravity;

    for (let i = 0; i < bigTables.length; i++) {
      let bigTable = bigTables[i];

      let tableCollide =
        x + 20 > bigTable.x - 20 &&
        x + 30 < bigTable.x + 250 &&
        y + 391 > bigTable.y &&
        y + 268 < bigTable.y + 70;

      if (tableCollide) {
        console.log("Collision with table detected!");
        onTable = true;
        gravity = 0;
        y = bigTable.y - 391;
        console.log(y);
        x -= speed;
      }
    }

    // when book collide with character
    // for (let i = 0; i < books.length; i++) {
    //   let book = books[i];

    //   //make it if (bookCollide)

    //   let bookCollide =
    //     x + 51 > book.x &&
    //     x + 51 < book.x + 60 &&
    //     y + 391 > book.y &&
    //     y + 282 < book.y + 30;

    //   if (bookCollide) {
    //     //when book collide -1 health heart -----

    //     book.x = random(350, 690);
    //     book.y = -100;
    //     lifeHearts.pop();

    //     console.log("Collision with book!");
    //   }
    // }

    if (y >= 400) {
      gravity = 0;
      x = 0;
      y = -50;
      lifeHearts.pop();
    }
  }
}

function level1() {
  gameScreen();
  screen = "level1";

  for (let i = bigTables.length - 1; i >= 0; i--) {
    let bigTable = bigTables[i];
    drawBigTable(bigTable.x, bigTable.y);

    bigTable.x -= speed;
    speed += 0.0005;

    if (bigTable.x + 280 <= 0) {
      bigTable.x = 650;
      bigTable.y = 400;
    }
  }

  startGround();
  character();
}

function level2() {
  gameScreen();
  screen = "level2";
  book = true;

  for (let i = bigTables.length - 1; i >= 0; i--) {
    let bigTable = bigTables[i];
    drawBigTable(bigTable.x, bigTable.y);

    bigTable.x -= speed;
    speed += 0.0009;

    if (bigTable.x + 280 <= 0) {
      bigTable.x = 650;
      bigTable.y = 400;
    }

    for (let i = 0; i < books.length; i++) {
      let book = books[i];

      //make it if (bookCollide)

      let bookCollide =
        x + 51 > book.x &&
        x + 51 < book.x + 60 &&
        y + 391 > book.y &&
        y + 282 < book.y + 30;

      if (bookCollide) {
        //when book collide -1 health heart -----

        book.x = random(350, 690);
        book.y = -100;
        lifeHearts.pop();

        console.log("Collision with book!");
      }
    }
  }

  updateBooks();
  startGround();
  character();
}

function level3() {
  gameScreen();
  screen = "level3";
  book = true;

  for (let i = bigTables.length - 1; i >= 0; i--) {
    let bigTable = bigTables[i];
    drawBigTable(bigTable.x, bigTable.y);

    bigTable.x -= speed;
    speed += 0.005;

    if (bigTable.x + 280 <= 0) {
      bigTable.x = 650;
      bigTable.y = 400;
    }

    for (let i = 0; i < books.length; i++) {
      let book = books[i];

      //make it if (bookCollide)

      let bookCollide =
        x + 70 > book.x &&
        x + 70 < book.x + 60 &&
        y + 400 > book.y &&
        y + 300 < book.y + 30;

      if (bookCollide) {
        //when book collide -1 health heart -----

        book.x = random(350, 690);
        book.y = -100;
        lifeHearts.pop();

        console.log("Collision with book!");
      }
    }
  }

  updateBooks();
  startGround();
  character();
}

function gameScreen() {
  clear();
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

  debris.drawBigRock();
  debris.drawSmallRock();
  debris.drawBook();
  debris.drawPen();
  debris.update();

  end();

  timer++;

  if (timer === 1500) {
    displayFlag = true;
  }

  controls();
  updateCharacter();
  displayHearts();
}

function resultScreen() {
  //here so when no health left = crash screen
  if (lifeHearts.length === 0) {
    gravity = 0;
    screen = "result";
    y = 400;
    lavaX = 0;

    console.log("crushed");
    console.log(y);
    console.log(lifeHearts);
    image(imag4, 0, 0, 700, 600);
  }

  if (displayFlag === true && timer === 1510) {
    screen = "result";
    x = 650;
    lavaX = 0;
    gravity = 0;

    console.log("won");
    console.log(y);
    image(imag5, 0, 0, 700, 600);
  }
}

function resetGame() {
  x = 0;
  y = -50;
  timer = 0;
  gravity = 15;
  acceleration = 1;
  screen = "start";
  gravityEnabled = false;
  speed = 5;
  displayFlag = false;
  bigTables = [];
  books = [];
  lifeHearts = [];

  //book loop
  for (let i = 0; i < 1; i++) {
    let x = random(400, 650);
    let y = random(200, 300);
    books.push({ x, y });
  }
  //loop life hearts
  for (let i = 0; i < 3; i++) {
    lifeHearts.push({ x: 10 + i * 25, y: 17 });
  }

  for (let i = 0; i < 1; i++) {
    let bigTable1 = {
      x: 150,
      y: 400,
      alpha: Math.random(),
    };
    let bigTable2 = {
      x: 600,
      y: 400,
      alpha: Math.random(),
    };
    bigTables.push(bigTable1);
    bigTables.push(bigTable2);
  }
}
