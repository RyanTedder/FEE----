var can1;
var can2;	

var ctx1;
var ctx2;

var lastTime;
var deltTime;

var canWidth;
var canHeight;
var wrap=document.getElementById('wrap');	
var music=document.getElementsByTagName('audio')[0];

var bgPic=new Image();

var ane;
var fruit;
var mom;
var baby;
var mx;
var my;
var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyOra=[];
var momBodyBlue=[];

var data;
var wave;
var halo;
var dust;
var dustPic=[];

document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltTime=0;
	gameloop();
}

function init(){
	//获得canvas 
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext('2d');
	ctx1.textAlign="center";	

	can2=document.getElementById("canvas2");
	ctx2=can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);
	bgPic.src="./src/background.jpg";

	canWidth=can1.width;
	canHeight=can1.height;

    ane=new aneObj();
	ane.init();    
    fruit=new fruitObj();   
	fruit.init();
	mom=new momObj();
	mom.init();
	baby=new babyObj();
	baby.init();
	data=new dataObj();
	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();
	dust=new dustObj();
	dust.init();


	mx=canWidth*0.5;
	my=canHeight*0.5;

	for (var i = 0; i < 7; i++) {
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}

	for (var i = 0; i < 8; i++) {
		babyTail[i] =new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}

	for(var i=0;i<2;i++) {
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}

	for(var i=0;i<20; i++) {
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}

	for (var i = 0; i < 8; i++) {
		momTail[i]=new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}

	for (var i = 0; i < 2; i++) {
		momEye[i]=new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}

	for (var i = 0; i < 8; i++) {
		momBodyBlue[i]=new Image();
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";

		momBodyOra[i]=new Image();
		momBodyOra[i].src="./src/bigSwim"+i+".png";
	}		
}

//让游戏动起来
 function gameloop(){
     window.requestAnimFrame(gameloop);  //智能指向下一帧，优于setInterval,setTimeout,frame per second,对于不同浏览器有不同返回类型
     var now=Date.now();
     deltTime=now-lastTime;
     lastTime=now;
     if(deltTime>40) {
     	deltTime=40;
     }

	 drawBackground();
     ane.draw();    
     fruitMonitor();
     fruit.draw();   
     ctx1.clearRect(0,0,canWidth,canHeight);
     mom.draw();
	 baby.draw();     
	 momFruitsCollision();
	 momBabyCollision();
	 data.draw();
	 wave.draw();
	 halo.draw();
	 dust.draw();
}

function onMouseMove(e){     //控制鼠标移动事件
	if(!data.gameOver) {
		if(e.offsetX||e.layerX){
			mx=e.offSetX==undefined?e.layerX:e.offSetX;
			my=e.offSetY==undefined?e.layerY:e.offSetY;
		}
	}
}
