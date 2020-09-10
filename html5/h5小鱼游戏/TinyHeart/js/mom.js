var momObj=function(){
	this.x;
	this.y;
	this.angle=0;

	this.momTailCount=0;
	this.momTailTimer=0;
	
	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;
}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
}
momObj.prototype.draw=function(){
	//lerp,x,y
	this.x=lerpDistance(mx,this.x,0.96);
	this.y=lerpDistance(my,this.y,0.96);
	//delta angle
	//Math.atan2(y,x)
	var deltY=my-this.y; //大鱼和鼠标的距离
	var deltX=mx-this.x;
	var beta=Math.atan2(deltY,deltX)+Math.PI;//-PI,PI 获取旋转角度

	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);

	//mom tail count
	this.momTailTimer+=deltTime;
	if(this.momTailTimer>50) {
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}

	//mom eye count
	this.momEyeTimer+=deltTime;
	if(this.momEyeTimer>this.momEyeInterval) {
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount) {
			this.momEyeInterval=200;
		}else {
			this.momEyeInterval=Math.random()*1000+2000;//[2000,3000)
		}
	}
	ctx1.save();
	
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	ctx1.drawImage(momTail[this.momTailCount],-momTail[this.momTailCount].width*0.5+30,-momTail[this.momTailCount].height*0.5);
	var momBodyCount=this.momBodyCount;
	if(data.double==1) {
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	} else {
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	} 
	var momEyeCount=this.momEyeCount;	
	ctx1.drawImage(momEye[this.momEyeCount],-momEye[this.momEyeCount].width*0.5,-momEye[this.momEyeCount].height*0.5);

	ctx1.restore();
}