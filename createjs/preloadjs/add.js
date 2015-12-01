/**
 * Created by zj on 15-11-30.
 */

var preload;
preload=new createjs.LoadQueue(false,"images/");

var plugin={
	getPreloadHandlers:function(){
		return{
			types:["image"],
			callback:function(src){
				//获取images文件夹中的图片名称
				var id=src.toLowerCase().split("/").pop().split(".")[0];
				var img=document.getElementById(id);
				return{tag:img};
			}
		};
	}
}

preload.installPlugin(plugin);
preload.loadManifest([
	"t_1.png",
	"t_2.png",
	"t_3.png",
	"t_4.png",
	"t_5.jpg"
]);



