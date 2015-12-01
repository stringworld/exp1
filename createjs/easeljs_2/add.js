/**
 * Created by zj on 15-11-30.
 */
var stage=new createjs.Stage('gameView');

stage.alpha=0.5;
var Rect=new createjs.Shape();
Rect.graphics.beginFill('#ff0000');
Rect.graphics.drawRect(60,60,100,200);
stage.addChild(Rect);

var txt=new createjs.Text('sdkakhgkda','36px Arial','#ff0000');
stage.addChild(txt);

stage.update();

