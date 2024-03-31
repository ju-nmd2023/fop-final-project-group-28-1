function setup() {
  createCanvas(600, 600);
  background(234, 200, 135);
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
  fill(223, 61, 40);
  rect(0, 450, 600, 150);
}

function startGround() {
  push();
  noStroke();
  fill(150, 150, 150);
  rect(0, 420, 100, 180);
  pop();
}

function character() {
  fill(0, 0, 0);
  triangle(10, 370, 50, 250, 90, 370);
  ellipse(50, 230, 35);
  triangle(25, 370, 35, 420, 45, 370);
  triangle(55, 370, 65, 420, 75, 370);
}

function draw() {
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
  lava();
  startGround();
  character();
}
