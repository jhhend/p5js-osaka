
const CANVAS_SIZE = 720;
const COUNT = 16;
const FILL_RATIOS = [
  (i, j, count) => { return (i / count); },
  (i, j, count) => { return (j / count); },
  (i, j, count) => { return ((count - i) / count); },
  (i, j, count) => { return ((count - j) / count); },
  (i, j, count) => { return ((i + j) / (2*count)); },
  (i, j, count) => { return (((2*count) - (i + j)) / (2*count)); }
];
const MIN_SIDES = 4;
const MAX_SIDES = 8;

let ratios = new Array(3).fill(0);






// p5.js Functions

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noLoop();
  ellipseMode(RADIUS);
  setFillRatios();
}

function draw() {
  background(51);
  noStroke();

  for (let i = 0; i < COUNT; i++) {
    for (let j = 0; j < COUNT; j++) {
      setFill(i, j, COUNT);
      drawTile(CANVAS_SIZE*((i+1)/(COUNT + 1)), CANVAS_SIZE*((j+1)/(COUNT + 1)), 16);
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    setFillRatios();
    redraw();
  } else if (mouseButton === RIGHT) {
    saveCanvas('osaka');
  }
}






// Helper functions

function drawTile(x, y, r) {
  const sides = Math.floor(random(MIN_SIDES, MAX_SIDES));
  const offset = PI/sides;

  beginShape();
  for (let i = 0; i < sides; i++) {
    const p = (i / sides);

    if (int(random(1, 10)) % 3 === 0) {
      vertex(x, y);
    }
    vertex(x + r*sin(offset + 2*PI*p), y + r*cos(offset + 2*PI*p));
  }
  endShape(CLOSE);
}

function setFill(i, j, count) {
  fill(...ratios.map(ratio => 255*FILL_RATIOS[ratio](i, j, count)));
}

function setFillRatios() {

  const randomIdx = arr => Math.floor(random(0, arr.length));

  if (random() < .75) {
    colorMode(RGB);
  } else {
    // Just use 255 to mirror RGB for simplicity
    colorMode(HSB, 255, 255, 255);
  }
  ratios = ratios.map(e => randomIdx(ratios));
}
