//system variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var scoreCounter = document.getElementById("score");
var score = 0;
var keyTypedCode;
var scoreCounter = document.getElementById("score");
document.addEventListener('keyup', keyTypedFunction);
var devMode = false;

var boxDim = 20;
canvas.height = 600;
canvas.width = 600;


// key detection----------------------------------------------------------------------------------------
var keyTypedCode;
var lastKeyPressed;
document.addEventListener('keyup', keyTypedFunction);
function keyTypedFunction(event){
	keyTypedCode = event.keyCode;
	//lastKeyPressed = 0;
	if(devMode){
		console.log("keydown: " + keyTypedCode);
	}
}

// misc ------------------------------------------------------------------------------------------------------------
function getRandomBlockCord(){
	return (Math.round(Math.random()*29));
}

function addPointToScore(){
	score++;
	scoreCounter.innerHTML = "Score: " + score;
}


// block class------------------------------------------------------------------------------------------------------
class block{
	constructor(x,y,c){
		this.xValue = x;
		this.yValue = y;
		this.color = c;
	}
	renderBlock(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.xValue*boxDim,this.yValue*boxDim,boxDim,boxDim);
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.xValue*boxDim,this.yValue*boxDim,boxDim,boxDim);
	}

	moveBlockPose(xMove,yMove){
		this.xValue += xMove;
		this.yValue += yMove;
	}

	setBlockPose(newXValue,newYValue){
		this.xValue = newXValue;
		this.yValue = newYValue;
	}

}

// apple class -------------------------------------------------------------------------------------------------------

class apple{
	constructor(appleX,appleY, eaten){
		this.appleX = getRandomBlockCord();
		this.appleY = getRandomBlockCord();
		this.eaten = false;
		if(devMode){
			console.log("Apple@: " + this.appleX + ", " + this.appleY);
		}
	}
	renderApple(){
		if(!this.eaten){
			ctx.fillStyle = "red";
			ctx.fillRect(this.appleX*boxDim,this.appleY*boxDim,boxDim,boxDim);
		}
	}

	checkSnake(targetSnake){
		if(snakeBody[0].xValue == this.appleX && snakeBody[0].yValue == this.appleY){
			return true;
		}else{
			return false;
		}
	}

	updateEaten(){
		if(this.checkSnake()){
			this.eaten = true;
		}
	}
}

// snake variables ----------------------------------------------------------------------------------------------------
var grow = false;
var snakeColor = "#fcba03";
var snakeMinY = 0;
var snakeMinX = 0;
var snakeMaxY =( 600/boxDim)-1;
var snakeMaxX = (600/boxDim)-1;
var snakeBody = [new block(5,5,snakeColor), new block(6,5,snakeColor), new block(7,5,snakeColor)];

// snake code -------------------------------------------------------------------------------------------------------

function renderSnake(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,600,600);
	for(i = 0; i < snakeBody.length; i++){
		snakeBody[i].renderBlock();
	}

}

function showSnakeBody(){
	for(c = 0; c < snakeBody.length; c++){
		console.log("snakePart: " + c + " = " + snakeBody[c].xValue + "," + snakeBody[c].yValue);
	}
	console.log(snakeBody.length);
}

function boarderCheck(direction){
	if(direction == 87){
		if(snakeBody[0].yValue != snakeMinY ){
			return true;
		}else{
			return false;
		}
	}else if(direction == 83){
		if(snakeBody[0].yValue != snakeMaxY ){
			return true;
		}else{
			return false;
		}
	}else if(direction == 65){
		if(snakeBody[0].xValue != snakeMinX ){
			return true;
		}else{
			return false;
		}
	}else if(direction == 68){
		if(snakeBody[0].xValue != snakeMaxX ){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function moveSnake(headX,headY){
	var tempSnakeBody = [new block(headX,headY,snakeColor)];
	for(i = 0; i< snakeBody.length; i++){
		tempSnakeBody.push(snakeBody[i]);
	}
	snakeBody = [];
	for(i = 0; i<tempSnakeBody.length-1;i++){
		snakeBody.push(tempSnakeBody[i]);
	}
	if(devMode){
		showSnakeBody();
	}
	
}

function growSnake(headX,headY){
	var tempSnakeBody = [new block(headX,headY,snakeColor)];
	for(i = 0; i< snakeBody.length; i++){
		tempSnakeBody.push(snakeBody[i]);
	}
	snakeBody = [];
	for(i = 0; i<tempSnakeBody.length;i++){
		snakeBody.push(tempSnakeBody[i]);
	}
	if(devMode){
		showSnakeBody();
	}
	grow = false;
}

function checkForGrowAndMove(xMod, yMod){
	if(grow){
		growSnake(snakeBody[0].xValue + xMod, snakeBody[0].yValue + yMod);
	}else{
		moveSnake(snakeBody[0].xValue + xMod, snakeBody[0].yValue + yMod);
	}
}

function checkIntersect(){
	for(c = 1; c< snakeBody.length; c++){
		if(snakeBody[0].xValue == snakeBody[c].xValue){
			if(snakeBody[0].yValue == snakeBody[c].yValue){
				return true;
			}
		}
	}
	return false;
}

function movement(){
	if(boarderCheck(keyTypedCode) && !checkIntersect()){
		if(keyTypedCode == 87){//w
			lastKeyPressed = 87;
			checkForGrowAndMove(0,-1);
		}else if(keyTypedCode == 83){//s
			lastKeyPressed = 83;
			checkForGrowAndMove(0,1);
		}else if(keyTypedCode == 65){//a
			lastKeyPressed = 65;
			checkForGrowAndMove(-1,0);
		}else if(keyTypedCode == 68){//d
			lastKeyPressed = 68;
			checkForGrowAndMove(1,0);
		}
	}else{
		 reset();
	}
}

//-------------------------------------------------------------------------------------------------------------------

var gameApple = new apple();

function checkApple(){
	gameApple.updateEaten();
	if(gameApple.eaten){
		grow = true;
		gameApple = new apple();
		addPointToScore();
	}
}


function reset(){
	keyTypedCode = 83;
	score = -1;
	addPointToScore();
	snakeBody = [new block(5,5,snakeColor), new block(6,5,snakeColor), new block(7,5,snakeColor)];
	lastKeyPressed = 0;
	gameApple = new apple();
}

function render(){
	renderSnake();
	gameApple.renderApple();
}

function update(){
	movement();
	checkApple();
}

function run(){
	update();
	render();
}

keyTypedCode = 83;
setInterval(run,75);
