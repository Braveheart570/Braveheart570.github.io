

class Ray{


	setDir(){
		this.dir = new Vector(Math.cos(this.angle*(Math.PI/180)),Math.sin(this.angle*(Math.PI/180)));// convert angle to dir vector
	}

	constructor(pos, angle){
		this.pos = pos;
		this.angle = angle;
		this.setDir();
	}

	lookAt(x,y){
		this.dir.x = x;
		this.dir.y = y;
	}

	cast(toCheck){
		const x1 = toCheck.a.x;
		const y1 = toCheck.a.y;
		const x2 = toCheck.b.x;
		const y2 = toCheck.b.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);//denominator

		if(den == 0){
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

		if(t > 0 && t < 1 && u > 0){
			const pt = new Vector(0,0);
			pt.x = (x1 + t * (x2 - x1));
			pt.y = (y1 + t * (y2 - y1));
			return pt;
		}else{
			return;
		}
	}
}