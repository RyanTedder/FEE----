function $(s){   //模拟jquery的$符号
	return document.querySelectorAll(s);    //返回数组 
}

var lis=$("#list li");
var box=$("#box")[0];
var types=$("#type li");
var start=$("#start img");

var size=32;    //数据的长度

var height, width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);

var Dots=[];
var line;
draw.type="dot";    //初始化类型

var mv=new MusicVisualizer({
	size:size,
	visualizer:draw
});

window.onload=function(){
	lis[0].className="selected";	
	mv.play("/media/"+lis[0].title);
}
start[0].onclick=function(){
	var x=Math.floor(Math.random()*lis.length);	
	for (var j = 0; j < lis.length; j++) {
			lis[j].className="";
		}	
	lis[x].className="selected";
	mv.play("/media/"+lis[x].title);		
}

for (var i = 0; i < lis.length; i++) {
	lis[i].onclick=function(){
		for (var j = 0; j < lis.length; j++) {
			lis[j].className="";
		}
		this.className="selected";
		// load("/media/"+this.title);  
		mv.play("/media/"+this.title);
	}
}

for (var i = 0; i < types.length; i++) {
	types[i].onclick=function(){
		for (var j = 0; j < types.length; j++) {
			types[j].className="";
		}
		this.className="choosed";
		draw.type=this.getAttribute("data-type");
	}
}

$("#volume")[0].onmousemove=function(){
	mv.changeVolume(this.value/this.max);
}
$("#volume")[0].onmousemove();   //初始化为60%大小的声音


function random(m,n){   //返回m到n之间的数
	return Math.round(Math.random()*(n-m)+m);  
}
function getDots(){
	Dots=[];     //清空Dots数据
	for (var i = 0; i < size; i++) {
		var x=random(0,width);
		var y=random(0,height);
		var color="rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+",0)";
		Dots.push({
			x:x,
			y:y,
			dx:random(1,1.5),
			color:color,
			cap:0
		});
	}
}

function resize(){
	width=box.clientWidth;
	height=box.clientHeight;
	canvas.height=height;
	canvas.width=width;
	line=ctx.createLinearGradient(0,0,0,height);  //设置矩形条线性渐变
	line.addColorStop(0,"red");
	line.addColorStop(0.3,"yellow");
	line.addColorStop(0.7,"#A5F0A0");
	line.addColorStop(1,"pink");
	getDots();
}
resize();

window.onresize=resize;   //实时变化canvas画布大小
function draw(arr){
	ctx.clearRect(0,0,width,height);
	var w=width/size;
	var cw=w*0.6;
	var capH=cw*0.5;
	ctx.fillStyle=line;
	for (var i = 0; i < size; i++) {
		var o=Dots[i];
		if(draw.type=="column") {     //画出条状
			ctx.save();
			var h=arr[i]/256*height>height-capH-40?height-capH-40:arr[i]/256*height;
			ctx.fillRect(w*i,height-h,cw,h);			
			ctx.fillRect(w*i,height-o.cap-capH,cw,capH);			
			o.cap--;
			if(o.cap<0){
				o.cap=0;
			}
			if(h>0 && o.cap<h+40){
				o.cap=h+40>height-capH?height-capH:h+40;   //不能超出canvas顶部
			}
			ctx.restore();
		}else if(draw.type=="dot"){    //画出点状
			ctx.save();
			ctx.beginPath();
			var r=10+arr[i]/256*(height>width?width:height)/10;   //半径
			ctx.arc(o.x, o.y, r, 0, Math.PI*2,true);
			var g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
			g.addColorStop(0,"#fff");
			g.addColorStop(1,o.color);
			ctx.fillStyle=g;
			ctx.fill();
			o.x+=o.dx;
			o.x=o.x>width?0:o.x;
			ctx.restore();
		}	
	}
}


