function DrawBtn(){
	createjs.Shape.call(this);
	this.setBtnType=function(type){
		this._btnType=type;
		switch(type){
			case DrawBtn.TYPE_UNSELECTED:
			this.setBtnColor('#cccccc');
			break;
			case DrawBtn.TYPE_SELECTED:
			this.setBtnColor('#ff6600');
			break;
			case DrawBtn.TYPE_CAT:
			this.setBtnColor('#0000ff');
			break;
		}
	}

	this.setBtnColor=function(colorString){
		this.graphics.beginFill(colorString);
		this.graphics.drawCircle(0,0,25);
		this.graphics.endFill();
	}
	this.getCircleType=function(){
		return this._btnType;
	}
	this.setBtnColor(DrawBtn.TYPE_UNSELECTED);
}

DrawBtn.prototype=new createjs.Shape();
DrawBtn.TYPE_UNSELECTED=1;
DrawBtn.TYPE_SELECTED=2;
DrawBtn.TYPE_CAT=3;

