
var myWidth = 600;
var myHeight = 500;

var rCanvas = document.getElementById("RealCanvas");
var rctx = rCanvas.getContext("2d");
rCanvas.width = myWidth;
rCanvas.height = myHeight;

var vCanvas = document.getElementById("ViewCanvas");
var vctx = vCanvas.getContext("2d");
vCanvas.width = myWidth;
vCanvas.height = myHeight;

var keyDown = 0;
document.onkeydown = function(event) {
	keyDown = event.keyCode;
	keyUp = 0;
}
var keyUp = 0;
document.onkeyup = function(event) {
	keyUp = event.keyCode;
}





var walls = [];
var player = new Source();

function backgroundRender(){
	rctx.fillStyle = "black";
	rctx.fillRect(0,0,rCanvas.width,rCanvas.height);
	vctx.fillStyle = "black";
	vctx.fillRect(0,0,rCanvas.width,rCanvas.height);
}

function moveContorller(){
	var speed = 3;
	if(keyDown == 87 && keyUp != 87){
		player.move(player.pos.x+(player.heading.dir.x*speed),player.pos.y+(player.heading.dir.y*speed));
	}
	if(keyDown == 81 && keyUp != 81){
		player.move(player.pos.x-(player.stride.x*speed),player.pos.y-(player.stride.y*speed));
	}
	if(keyDown == 83 && keyUp != 83){
		player.move(player.pos.x-(player.heading.dir.x*speed),player.pos.y-(player.heading.dir.y*speed));
	}
	if(keyDown == 69 && keyUp != 69){
		player.move(player.pos.x+(player.stride.x*speed),player.pos.y+(player.stride.y*speed));
	}
	if(keyDown == 65 && keyUp != 65){
		player.rotate(-speed);
	}
	if(keyDown == 68 && keyUp != 68){
		player.rotate(speed);
	}
}

function addWall(x1,y1,x2,y2){
	walls.push(new Boundary(new Vector(x1,y1), new Vector(x2,y2)));
}

function addRect(x1,y1,x2,y2){
	walls.push(new Boundary(new Vector(x2,y1),new Vector(x2,y2)));
	walls.push(new Boundary(new Vector(x1,y1),new Vector(x2,y1)));
	walls.push(new Boundary(new Vector(x1,y1),new Vector(x1,y2)));
	walls.push(new Boundary(new Vector(x1,y2),new Vector(x2,y2)));
}

function initGeom(){
	// edges
	addRect(0,0,vCanvas.width,vCanvas.height);

	//other
	addRect(100,100,120,120);
	addRect(vCanvas.width-50,vCanvas.height-50,vCanvas.width,vCanvas.height);
	addRect(vCanvas.width/2-25,vCanvas.height,vCanvas.width/2+25,vCanvas.height-150);
	addRect(vCanvas.width-250,0,vCanvas.width,100);
	addRect(100,vCanvas.height-100,25,vCanvas.height-50);
}



function drawRectCentered(x1,x2,height){
	vctx.fillRect(x1,vCanvas.height/2-height/2,x2,height);
}

function renderScene(){

	//background
	vctx.fillStyle = "rgb(82,50,0)"
	vctx.fillRect(0,vCanvas.height/2,vCanvas.width,vCanvas.height);
	vctx.fillStyle = "rgb(106,173,166)"
	vctx.fillRect(0,0,vCanvas.width,vCanvas.height/2);

	var sliceWidth = (vCanvas.width/player.fov)+1; // plus one for gap

	for(var c = 0; c<player.scene.length; c++){

		//shading
		var shade = 255-((player.scene[c]/(vCanvas.height/1.1))*255); // /1.1 for darker contrast
		var color = "rgb(" + (shade+50) + "," + (shade+50) + "," + (shade) + ")";
		vctx.fillStyle = color;

		//height
		var wallH = vCanvas.height-player.scene[c];
		if(wallH >= 0){
			drawRectCentered(sliceWidth*c,sliceWidth,wallH);
		}
	}
}






function update(){
	player.updateStride();
	moveContorller();
}

function render(){
	backgroundRender();

	for(var c = 0; c < walls.length; c++){
		walls[c].show();
	}
	player.castRays(walls);

	renderScene();
}

initGeom();
function run(){
	update();
	render();
}

setInterval(run,75);

