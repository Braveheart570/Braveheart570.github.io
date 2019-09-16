

function getDistance(a,b){
	
	let distanceX = 0, distanceY = 0;
	distanceX = b.x - a.x;
	distanceY = a.y - b.y;
	return Math.sqrt(distanceX*distanceX + distanceY*distanceY);
}

class Source{
	constructor(){
		this.pos = new Vector(canvas.width/2,canvas.height/2);
		this.rays = [];
		for(var a = 0; a < 360; a += 1){
			this.rays.push(new Ray(this.pos,a));
		}
		// this.rays.push(new Ray(this.pos, 140));
	}

	move(x,y){
		this.pos.x = x;
		this.pos.y = y;
	}

	look(toCheckArray){

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
				ctx.fillStyle = "rgb(255,0,0)";
				ctx.beginPath();
				ctx.moveTo(this.pos.x,this.pos.y);
				ctx.lineTo(closest.x,closest.y);
				ctx.stroke();

				// draw dot at intersetion point
				//closest.render();
			}
		}
	}
}