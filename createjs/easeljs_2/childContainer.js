function ChildContainer(){
	var Rect=new createjs.Shape();
	Rect.graphics.beginFill('#ff0000');
	Rect.graphics.drawRect(0,0,50,50);
	Rect.graphics.endFill();
	var Text=new createjs.Text('1','20px Arial','blue');
	this.addChild(Rect);
	this.addChild(Text);
}

ChildContainer.prototype=new createjs.Container();