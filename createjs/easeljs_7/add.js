/**
 * Created by zj on 15-11-30.
 */

var stage=new createjs.Stage('gameView');

// var gameView=new createjs.Container();
// stage.addChild(gameView);

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener('tick',stage);

// var mc=new createjs.MovieClip(null,0,true,{start:50});
var mc=new createjs.MovieClip(null,0,true,{start:20});
stage.addChild(mc);

var state1=new createjs.Shape(
	new createjs.Graphics().beginFill('#777777')
	.drawCircle(0,100,30));
var state2=new createjs.Shape(
	new createjs.Graphics().beginFill('#222222')
	.drawCircle(0,100,30));

mc.timeline.addTween(
	createjs.Tween.get(state1)
	.to({x:0}).to({x:400},100).to({x:0},100))
mc.timeline.addTween(createjs.Tween.get(state2).to({x:400}).to({x:0},100).to({x:400},100))

mc.gotoAndPlay('start');




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








