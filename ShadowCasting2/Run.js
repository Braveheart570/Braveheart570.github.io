

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

var mouseX, mouseY;
canvas.addEventListener('mousemove', function(e) {mouseX = e.clientX; mouseY = e.clientY;});

var walls = [];
var player = new Source();

function backgroundRender(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

// edges
walls.push(new Boundary(new Vector(0,0), new Vector(canvas.width,0)));
walls.push(new Boundary(new Vector(canvas.width,0), new Vector(canvas.width,canvas.height)));
walls.push(new Boundary(new Vector(canvas.width,canvas.height), new Vector(0,canvas.height)));
walls.push(new Boundary(new Vector(0,canvas.height), new Vector(0,0)));
//other
walls.push(new Boundary(new Vector(100,100), new Vector(100,200)));
walls.push(new Boundary(new Vector(100,200), new Vector(200,200)));
walls.push(new Boundary(new Vector(100,100), new Vector(200,200)));

walls.push(new Boundary(new Vector(400,300), new Vector(350,200)));
walls.push(new Boundary(new Vector(150,300), new Vector(250,400)));




function update(){
	player.move(mouseX-400,mouseY-150);
	//player.move(canvas.width/2, canvas.height/2 - 150);
}

function render(){
	backgroundRender();
	for(var c = 0; c < walls.length; c++){
		walls[c].show();
	}
	player.look(walls);
}


function run(){
	update();
	render();
}

setInterval(run,75);

