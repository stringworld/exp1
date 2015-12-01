/**
 * Created by zj on 15-11-30.
 */

var stage=new createjs.Stage('gameView');

var gameView=new createjs.Container();
stage.addChild(gameView);

var bitMap=new createjs.Bitmap('1.png');
gameView.addChild(bitMap);

createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener('tick',function(){
	stage.update();
});


// gameView.x=100;
// gameView.y=100;
// text=new createjs.Text('jsdvbsdv','20px Arial','#fff');
// text.rotation=10;
// gameView.addChild(text);

// rect=new createjs.Shape();
// rect.rotation=text.rotation;
// gameView.addChildAt(rect,0);		//添加子元素

// createjs.Ticker.setFPS(10);
// createjs.Ticker.addEventListener('tick',handlerTick);

// function handlerTick(e){
// 	count++;
// 	text.text='sjvbsjbvdjksdbvjdvbsj'+count+'!!!';
// 	rect.graphics.clear().beginFill('#f00').drawRect(-10,-10,text.getMeasuredWidth()+20,50);
// 	stage.update(e);
// }








