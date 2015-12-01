/**
 * Created by zj on 15-11-30.
 */

var displayStatus;
displayStatus=document.getElementById('status');
src='1.mp3';
createjs.Sound.alternateExtensions=["mp3"];
createjs.Sound.addEventListener('fileload',playSound);
createjs.Sound.registerSound(src);


displayStatus.innerHTML='loading...';

function playSound(event){
	soundIntance=createjs.Sound.play(event.src);
	displayStatus.innerHTML='playing source:'+event.src;
}



