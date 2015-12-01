/**
 * Created by zj on 15-11-30.
 */

var stage=new createjs.Stage('gameView');
stage.x=100;
stage.y=100;

var circle=new createjs.Shape();

circle.graphics.beginFill('#ff0000').drawCircle(0,0,25);
stage.addChild(circle);

createjs.Tween.get(circle,{loop:true})
    .wait(1000)
    .to({scaleX:0.2,scaleY:0.2})
    .wait(1000)
    .to({scaleX:1,scaleY:1},1000,createjs.Ease.bounceInOut);

createjs.Ticker.setFPS(20);
createjs.Ticker.addEventListener('tick',stage);



