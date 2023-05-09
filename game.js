const unitLength = 20;
let boxColor = 150;
const strokeColor = 50;
let columns;
let rows;
let currentBoard;
let nextBoard;
//head//
let canvaColor;
let isStart;
//game-rules-slider
let lonelinessSlider;
let overpopulationSlider;
let reproductionSlider;
let a = 2;
let b = 2;
let c = 3;
//framerates
let fr = 15;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight - 100);
  canvas.parent(document.querySelector("#canvas"));
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }

  //framerate
  frameRate(fr);

  //canvaColor
  canvaColor = createSlider(0, 255, 255);
  canvaColor.parent(document.querySelector(".canva-color"));
  canvaColor.style("width", "80px");

  //Loneliness
  lonelinessSlider = createSelect();
  lonelinessSlider.option("1");
  lonelinessSlider.option("2");
  lonelinessSlider.option("3");
  lonelinessSlider.option("4");
  lonelinessSlider.option("5");
  lonelinessSlider.selected("1");
  lonelinessSlider.parent(document.querySelector("#loneliness-slider"));

  //overpopulationSlider
  overpopulationSlider = createSelect();
  overpopulationSlider.option("1");
  overpopulationSlider.option("2");
  overpopulationSlider.option("3");
  overpopulationSlider.option("4");
  overpopulationSlider.option("5");
  overpopulationSlider.selected("1");
  overpopulationSlider.parent(document.querySelector("#overpopulation-slider"));

  //Reproduction
  reproductionSlider = createSelect();
  reproductionSlider.option("1");
  reproductionSlider.option("2");
  reproductionSlider.option("3");
  reproductionSlider.option("4");
  reproductionSlider.option("5");
  reproductionSlider.selected("1");
  reproductionSlider.parent(document.querySelector("#Reproduction-slider"));

  initBoard();

  isStart = false;
  noLoop();
  // loop()
}

function initBoard() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
    }
  }
}

// let rgb1 = 255;
// let rgb2 = 255;
// let rgb3 = 200;

function updateUI() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (currentBoard[i][j] === 1) {
        fill(boxColor);
      } else {
        fill(255);
      }
      stroke(strokeColor);
      rect(i * unitLength, j * unitLength, unitLength, unitLength);
    }
  }
}

let colorBoxes = document.querySelectorAll(".boxcolor");

for (let box of colorBoxes) {
  box.addEventListener("click", (e) => {
    boxColor = e.target.id;
    // console.log("clicked");
  });
}

console.log(colorBoxes);

function draw() {
  a = lonelinessSlider.value();
  b = overpopulationSlider.value();
  c = reproductionSlider.value();
  background(0, 100, 200);
  background(255);
  frameRate(fr);
  generate();

  //canvaColor
  let bg = canvaColor.value();
  background(bg);

  updateUI();
}

function generate() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            continue;
          }

          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

      if (currentBoard[x][y] === 1 && neighbors < a) {
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] === 1 && neighbors > b) {
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] === 0 && neighbors == c) {
        nextBoard[x][y] = 1;
      } else {
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);

  currentBoard[x][y] = 1;
  fill(boxColor);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
  updateUI();
}

function mousePressed() {
  noLoop();
  mouseDragged();
}

function mouseReleased() {
  if (isStart) {
    loop();
  }
}

//Startthegame

let startButtom = document
  .querySelector(".start-buttom")
  .addEventListener("click", () => {
    loop();
    isStart = true;
  });

//resizedWindow

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//stop
let Stop = document.querySelector("#Stop").addEventListener("click", () => {
  noLoop();
});

//reset-game
document.querySelector("#reset-game").addEventListener("click", function () {
  initBoard();
});

//Changethebackgroundcolour
const bgchange = (id) => {
  document.body.style.background = document.getElementById(id).innerHTML;
};

//framerates
let frameratecontainer = document.querySelector(".framerate");

frameratecontainer.addEventListener("change", function (e) {
  fr = parseInt(e.target.value);
});

//dogmove

let dogImage = document.querySelector(".dog-img");
dogImage.style.position = "absolute";
dogImage.style.left = "0px";
dogImage.style.top = "0px";

document.addEventListener("keydown", function (event) {
  event.preventDefault();
  console.log(event.key);
  if (event.key === "ArrowLeft") {
    dogImage.style.left = parseInt(dogImage.style.left) - 5 + "px";
  } else if (event.key === "ArrowUp") {
    dogImage.style.top = parseInt(dogImage.style.top) - 5 + "px";
  } else if (event.key === "ArrowRight") {
    dogImage.style.left = parseInt(dogImage.style.left) + 5 + "px";
  } else if (event.key === "ArrowDown") {
    dogImage.style.top = parseInt(dogImage.style.top) + 5 + "px";
  }
});
