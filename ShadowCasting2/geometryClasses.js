

class Vector{
	constructor(dX,dY){
		this.x = dX;
		this.y = dY;
	}
	render(){
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.fillRect(this.x-3,this.y-3,6,6);
	}
}

class Boundary{
	constructor(a,b){
		this.a = a;
		this.b = b;
	}
	show(){
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.moveTo(this.a.x,this.a.y);
		ctx.lineTo(this.b.x,this.b.y);
		ctx.stroke();
	}
}

