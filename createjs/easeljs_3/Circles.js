function Circles(){
	createjs.Shape.call(this);
	this.setColorType=function(type){
		this._circleType=type;
		switch(type){
			case Circles.TYPE_RED:
				this.setColor('#ff0000');
				break;
			case Circles.TYPE_GREEN:
				this.setColor('#00ff00');
				break;
		}
	}


	this.setColor=function(color){
		this.graphics.beginFill(color);
		this.graphics.drawCircle(0,0,50);
		this.graphics.endFill();
	}
	this.setColorType(Circles.TYPE_RED);
}
Circles.prototype=new createjs.Shape();
Circles.TYPE_RED=1;
Circles.TYPE_GREEN=2;




