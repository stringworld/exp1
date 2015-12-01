/**
 * Created by zj on 15-11-30.
 */
var stage=new createjs.Stage('gameView');
var gameView=new createjs.Container();
stage.addChild(gameView);

// var Rect=new createjs.Shape();
// Rect.graphics.beginFill('#ff0000');
// Rect.graphics.drawRect(0,0,100,20);
// gameView.addChild(Rect);
gameView.x=100;
gameView.y=100;
var c=new Circles();
c.setColorType(Circles.TYPE_GREEN);
gameView.addChild(c);

// var Ellipse=new createjs.Shape();
// Ellipse.graphics.beginFill('#00ff00');
// Ellipse.graphics.drawEllipse(100,100,100,80);
// gameView.addChild(Ellipse);


stage.update();

