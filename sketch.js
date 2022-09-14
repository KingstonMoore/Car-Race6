var canvas;
var backgroundImage;
var bgImg;
var db,coinImg,fuelImg,obImg,fuelg,coing,obg;
var form, player,car1,car2,cars,players;
var playerCount,players,gameState,car1,car2,c1Img,c2Img,trackImg;

function preload() {
  bgImg = loadImage("assets/background.png")
  c1Img = loadImage("assets/car1.png")
  c2Img = loadImage("assets/car2.png")
  trackImg = loadImage("assets/track.jpeg")
  coinImg = loadImage("assets/goldCoin.png")
  fuelImg = loadImage("assets/fuel.png")
  obImg = loadImage("assets/obstacle1.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  db = firebase.database()
  game = new Game()
  game.getState()
  game.start()
}

function draw() {
 background(bgImg)
 if (playerCount===2){
   game.updateState(1)
 }
 if (gameState===1){
   game.play()
 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
