

function getDistance(a,b){
	let distanceX = 0, distanceY = 0;
	distanceX = b.x - a.x;
	distanceY = a.y - b.y;
	return Math.sqrt(distanceX*distanceX + distanceY*distanceY);
}

class Source{

	updateStride(){
		const v1x = this.heading.dir.x;
		const v1y = this.heading.dir.y;
		const perpX = 1;
		const perpY = (v1x/v1y)*perpX;
		this.stride = new Vector(perpX,perpY);
	}

	constructor(){
		this.pos = new Vector(rCanvas.width/2,rCanvas.height/2);
		this.rays = [];
		this.fov = 29; // feild of view
		this.scene = [];
		//generate rays
		for(var a = 0; a < this.fov; a += 1){
			this.rays.push(new Ray(this.pos,a));
		}

		this.heading = this.rays[(this.rays.length-1)/2];
		this.updateStride();

	}

	move(x,y){
		this.pos.x = x;
		this.pos.y = y;
	}

	rotate(speed){
		for(var c = 0; c<this.rays.length;c++){
			this.rays[c].angle += speed;
			this.rays[c].setDir();
		}
	}

	castRays(toCheckArray){
		this.scene = [];
		//check all rays
		for(var c = 0; c < this.rays.length; c++){
			// the closest intersection
			let closest = null;
			// the record shortest distance
			let record = Infinity;
			//check all boundaries
			for(var i = 0; i < toCheckArray.length; i++){
				// get poi 
				const pt = this.rays[c].cast(toCheckArray[i]);
				// if poi exists
				if(pt){
					// get the distance
					const distance = getDistance(this.rays[c].pos,pt);
					// compare to record
					if(distance < record){
						record = distance;
						closest = new Vector(pt.x,pt.y);
					}
				}

			}
			if(closest){
				rctx.fillStyle = "rgb(255,0,0)";
				rctx.beginPath();
				rctx.moveTo(this.pos.x,this.pos.y);
				rctx.lineTo(closest.x,closest.y);
				rctx.stroke();
				
				//closest.render(); // draw dot at intersetion point
			}

			//saving distance value for virtual 3D render

			const h1 = this.heading.dir.x;
			const h2 = this.heading.dir.y;
			const b1 = this.rays[c].dir.x;
			const b2 = this.rays[c].dir.y;

			const theta = Math.acos((h1*b1 + h2*b2) / (Math.sqrt(h1*h1 + h2*h2)) * Math.sqrt(b1*b1 + b2*b2));
			const wallHeight = (record*Math.cos(theta));
			this.scene.push(wallHeight);

		}
	}
}