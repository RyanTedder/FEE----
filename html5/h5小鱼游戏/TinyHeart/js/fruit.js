var fruitObj=function(){
	this.alive=[];//bool
	this.x=[];
	this.y=[];
	this.l=[];
	this.spd=[];
	this.aneNo=[];
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
}	
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.l[i]=0;
		this.aneNo[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;// [0.003,0.02)
		this.fruitType[i]="";
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}
fruitObj.prototype.draw=function(){   
	for (var i = 0; i < this.num; i++) {
		//draw find an ane ,grow,fly up
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}	

			if(this.l[i]<=14){   //果实半径逐渐变大
				var NO=this.aneNo[i];
				this.x[i]=ane.headx[NO];
				this.y[i]=ane.heady[NO];
				this.l[i]+=this.spd[i]*deltTime;
			}else{
				this.y[i]-=this.spd[i]*5*deltTime;					
			}				
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);			
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}
	}
}
fruitObj.prototype.born=function(i){
	this.aneNo[i]=Math.floor(Math.random()*ane.num);//获取海葵ID
	this.l[i]=0;
	this.alive[i]=true;
	var rand=Math.random();
	this.fruitType[i]=(rand>0.35)?"orange":"blue";
}
function fruitMonitor(){    //保持屏幕上有15个果实
	var num=0;
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i])	{
			num++;
		}
	}
	if(num<15){
		sendFruit();
		return;
	}
}
function sendFruit(){         //每次生成一个新的果实
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}