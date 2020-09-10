var babyObj=function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer=0;
	this.babyTailCount=0;

	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;

	this.babyBodyTimer=0;
	this.babyBodyCount=0;

}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
}
babyObj.prototype.draw=function(){
	//lerp x,y
	this.x=lerpDistance(mom.x,this.x,0.96);
	this.y=lerpDistance(mom.y,this.y,0.96);
	//delta angle
	//Math.atan2(y,x)
	var deltY=mom.y-this.y; //大鱼和鼠标的距离
	var deltX=mom.x-this.x;
	var beta=Math.atan2(deltY,deltX)+Math.PI;//-PI,PI 获取旋转角度

	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);	

	//baby tail count 
	this.babyTailTimer+=deltTime;
	if(this.babyTailTimer>50) {
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}

	//baby eye count
	this.babyEyeTimer+=deltTime;
	if(this.babyEyeTimer>this.babyEyeInterval) {
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;

		if(this.babyEyeCount==0) {
			this.babyEyeInterval=Math.random()*1500+2000;//[2000,3500)
		}else{
			this.babyEyeInterval=200;
		}		
	}

	//baby body count
	this.babyBodyTimer+=deltTime;
	if(this.babyBodyTimer>300) {
		this.babyBodyCount++;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19) {
			this.babyBodyCount=19;
			//game over 
			data.gameOver=true;			
		}
	}

	//ctx1
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);	
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);	

	ctx1.restore();
}