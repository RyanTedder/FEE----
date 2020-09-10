var aneObj=function(){
	//start point,control point,end point(sin)
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.alpha=0;    //正弦
	this.amp=[];     //振幅
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	for (var i = 0; i < this.num; i++) {
		this.rootx[i]=i*16+Math.random()*20;//[0,1)
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-200+Math.random()*50;
		this.amp[i]=Math.random()*50+20;  //[50,100)
		this.sin=0;
	}
}
aneObj.prototype.draw=function(){
	this.alpha+=deltTime*0.002;
	l=Math.sin(this.alpha);  //[-1,1]
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";	
	for (var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);//二次贝塞尔曲线，前一个控制点，后一个结束点
		ctx2.stroke();
	}
}