/**
 * Created by zj on 15-11-30.
 */
var stage=new createjs.Stage('gameView');
var gameView=new createjs.Container();
stage.addChild(gameView);
// gameView.x=100;
// gameView.y=100;

var Rect=new createjs.Shape();
Rect.graphics.beginFill('#ff0000');
Rect.graphics.drawRect(0,0,100,20);
gameView.addChild(Rect);

stage.update();

//事件

// Rect.addEventListener('click',function(){
// 	alert('svsdv');
// });

// Rect.addEventListener('click',function(event){
// 	alert('x='+event.localX+'___y='+event.localY);
// });

// Rect.addEventListener('dblclick',function(event){
// 	alert('x='+event.localX+'___y='+event.localY);
// });

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',handlerTick);

var speedX=10;

function handlerTick(e){
	if(Rect.y<=0){
		speedX=Math.abs(speedX);
	}
	if(Rect.y>=380){
		speedX=-Math.abs(speedX);
	}
	Rect.y+=speedX;
	stage.update();
}


