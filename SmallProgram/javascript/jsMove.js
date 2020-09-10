
		// var json={a:12,b:13};        json是一种轻量级的数据交换格式
		// for(var i in json){
		// 	alert(i);
		// 	alert(json[i]);
		// }
function startMove(obj,json,fn){
 var flag=true;//标志所有运动是否到达目标值
clearInterval(obj.timer);
 obj.timer=setInterval(function(){
 for(var attr in json){
 var curr=0;
 //判断是否为透明度
if(attr=='opacity'){
 curr=Math.round(parseFloat(getStyle(obj,attr))*100);
 }else{
 curr=parseInt(getStyle(obj,attr));
 
 }
 //移动速度处理
var speed=0;
 speed=(json[attr]-curr)/10;
 speed=speed>0?Math.ceil(speed):Math.floor(speed);
 if(curr!=json[attr]){
 flag=false;
 }
 if (attr=='opacity') {
 obj.style.filter='alpha(opacity:'+(curr+speed)+")";
 obj.style.opacity=(curr+speed)/100;
 }else{
 obj.style[attr]=curr+speed+'px';
 }

 }
 if(flag){
 clearInterval(obj.timer);
 if(fn){
 fu();
 }
 }


 },30);
 }
 //取样式
function getStyle(obj,attr){
 if(obj.currentStyle){//IE取样式
return obj.currentStyle[attr];
 }else{
 return getComputedStyle(obj,false)[attr];
 }

 }
