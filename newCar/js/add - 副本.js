/**
 * Created by zj on 15-11-30.
 */


function init(){
	var canvas=document.getElementById('gameView');

	var stage=new createjs.Stage(canvas);

	C_W = stage.canvas.width=768;
	C_H = stage.canvas.height=1024;
	stage.autoClear=true;
	var gameView=new createjs.Container();


	var bg=new createjs.Bitmap('images/road_tile.jpg');
	//添加背景
	stage.addChild(bg);

	//添加5
	// for(var i=0;i<5;i++){
		var man=new createjs.Bitmap('./images/hero.png');
		// man.regX=42;
		// man.regY=60;
		// man.x=canvas.width/6*(i+1);
		// man.y=canvas.height/5*4;
		// man.scaleX=man.scaleY=1;
		// stage.addChild(man);

		createjs.Tween.get(man,{loop:true},true)
			.to({rotation:360,scaleX:2,scaleY:2},1000)
			.to({rotation:360,scaleX:1,scaleY:1},1000);
		man.addEventListener('click',function(event){
			console.log('click',event.currentTarget);
		});
	// }

	stage.update();
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener('tick',tick);
	function tick(event){
		stage.update(event);
	}
}
init();



