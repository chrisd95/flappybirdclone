
// P5js Code practice
// By Chris D
// Misc. series

//Constructors

function canvas(X, Y) {
  this.X = X;
  this.Y = Y;
  this.floor = Y*5/6;
  this.height = Y/6;
 };

function bird(X, Y, width, height){
  this.X = X;
  this.Y = Y;
  this.width = width;
  this.height = height;
};

function obstacle(X, Y, width, height, speed){
  this.X = X;
  this.Y = Y;
  this.width = width;
  this.height = height;
  this.speed = speed;
};

function wave(canvasX, obstacleWidth, speed){
  this.period = 2*(canvasX + obstacleWidth)/speed
  this.count11 = 0;
  this.count12 = 0;
};


//System parameters
time = 0;
timeB = 0;

  //Model parameters
iniHeight = -20;
obstacleWidth = 65;
obstacleHeight = 160;
obstacleSpeed = 2;
gravity = 0.05;
collision = false;
Vy = gravity * -15;
value = 0;

//Create objects with constructors

var myCanvas = new canvas(400, 600);

var myBird = new bird(myCanvas.X * 0.15, myCanvas.Y * 0.65, 20, 20);

var myUpperObstacle1 = new obstacle(myCanvas.X, 0, obstacleWidth, obstacleHeight, obstacleSpeed);

var myUpperObstacle2 = new obstacle(myCanvas.X, 0, obstacleWidth, obstacleHeight, obstacleSpeed);

var myLowerObstacle1 = new obstacle(myCanvas.X, myCanvas.Y - myCanvas.height, obstacleWidth, -obstacleHeight, obstacleSpeed);

var myLowerObstacle2 = new obstacle(myCanvas.X, myCanvas.Y - myCanvas.height, obstacleWidth, -obstacleHeight, obstacleSpeed);

var myWave = new wave(myCanvas.X, obstacleWidth, obstacleSpeed);

function setup() {
  createCanvas(myCanvas.X, myCanvas.Y);
};

function draw() {

  //Background
  fill(150);
  background(230, 230, 230);
  strokeWeight(0);

  //Models
    // Floor model
    fill(185, 185, 185);
    rect(0, myCanvas.floor, myCanvas.X, myCanvas.height);

    //Obstacle models
    fill(0, 255, 100);

    myUpperObstacle1.X = myCanvas.X - (myUpperObstacle1.speed * time) + (myWave.count1 * (myCanvas.X + myUpperObstacle1.width));
    myUpperObstacle1.height = obstacleHeight + ((myWave.count1 * 17 % 3) * 50);
    rect(myUpperObstacle1.X, myUpperObstacle1.Y, myUpperObstacle1.width, myUpperObstacle1.height);

    myLowerObstacle1.X = myCanvas.X - (myLowerObstacle1.speed * time) + (myWave.count1 * (myCanvas.X + myLowerObstacle1.width));
    myLowerObstacle1.height = -obstacleHeight + ((myWave.count1 * 8 % 3) * 50);
    rect(myLowerObstacle1.X, myLowerObstacle1.Y, myLowerObstacle1.width, myLowerObstacle1.height);

    myUpperObstacle2.X = myCanvas.X - (myUpperObstacle2.speed * time) + ((myWave.count2 - 0.5) * (myCanvas.X + myUpperObstacle2.width));
    myUpperObstacle2.height = obstacleHeight - ((myWave.count2 * 23 % 3) * 50);
    rect(myUpperObstacle2.X, myUpperObstacle2.Y, myUpperObstacle2.width, myUpperObstacle2.height);

    myLowerObstacle2.X = myCanvas.X - (myLowerObstacle2.speed * time) + ((myWave.count2 - 0.5) * (myCanvas.X + myLowerObstacle2.width));
    myLowerObstacle2.height = -obstacleHeight - ((myWave.count2 * 23 % 3) * 50);
    rect(myLowerObstacle2.X, myLowerObstacle2.Y, myLowerObstacle2.width, myLowerObstacle2.height);

    // Character model
    fill(200, 200, 90);

      //Collision logic
      grounded = myBird.Y + myBird.height >= myCanvas.floor
      upperHit1 = ((myBird.X + myBird.width >= myUpperObstacle1.X) && (myBird.Y <= myUpperObstacle1.height) && (myBird.X <= myUpperObstacle1.X + myUpperObstacle1.width));
      lowerHit1 = ((myBird.X + myBird.width >= myLowerObstacle1.X)) && (myBird.Y + myBird.height >= myLowerObstacle1.Y + myLowerObstacle1.height) && (myBird.X <= myLowerObstacle1.X + myLowerObstacle1.width);
      upperHit2 = ((myBird.X + myBird.width >= myUpperObstacle2.X) && (myBird.Y <= myUpperObstacle2.height) && (myBird.X <= myUpperObstacle2.X + myUpperObstacle2.width));
      lowerHit2 = ((myBird.X + myBird.width >= myLowerObstacle2.X)) && (myBird.Y + myBird.height >= myLowerObstacle2.Y + myLowerObstacle2.height) && (myBird.X <= myLowerObstacle2.X + myLowerObstacle2.width);

    if (grounded || upperHit1 || upperHit2 || lowerHit1 || lowerHit2){
      collision = true;
    } else {
      myBird.Y = myBird.Y + Vy * timeB + gravity * timeB**2;
      time = time + 1;
      collision = false;
    }

    // text(collision, 50, 180)

    rect(myBird.X, myBird.Y, myBird.width, myBird.height);

  //Wave Function
  myWave.count1 = Math.floor(2 * time / myWave.period);
  myWave.count2 = Math.floor((2* time + myWave.period/2)/ myWave.period);

  // text(myWave.count1, 200, 150);
  // text(myWave.count2, 200, 175);
  // text(myWave.count1, 225, 225);
  fill(100, 100, 100);
  // text(myUpperObstacle1.X, 200, 200);
  fill(0);
  timeB = timeB + 1;
  fill(0, 100, 255);
  text(time, 50, 50);
  // text(myLowerObstacle1.Y, 300, 300);
  // text(myLowerObstacle1.X, 350, 300);
};


//User input
  function keyReleased(){
    if (value === 0){
      value = 255;
      timeB = 0;
    } else {
      value = 0;
      timeB = 0;
    }
  };
