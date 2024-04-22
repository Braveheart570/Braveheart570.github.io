

class Vector{
	constructor(dX,dY){
		this.x = dX;
		this.y = dY;
	}
	render(){
		rctx.fillStyle = "rgb(255,0,0)";
		rctx.fillRect(this.x-3,this.y-3,6,6);
	}
}

class Boundary{
	constructor(a,b){
		this.a = a;
		this.b = b;
	}
	show(){
		rctx.strokeStyle = "white";
		rctx.beginPath();
		rctx.moveTo(this.a.x,this.a.y);
		rctx.lineTo(this.b.x,this.b.y);
		rctx.stroke();
	}
}

