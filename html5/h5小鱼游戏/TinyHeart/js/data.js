var dataObj=function(){
	this.fruitNum=0;  //大鱼吃的果实总数
	this.double=1;   //判断蓝色还是橙色
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
	this.delHeight=0;
	this.flag="On";
}
dataObj.prototype.draw=function(){
    var w=can1.width;
    var h=can1.height;		
	ctx1.save();
	ctx1.shadowBlur=10;
	ctx1.shadowColor="#fff";	
	ctx1.fillStyle="#F7F8CA";
	ctx1.font="51px 方正喵呜体"; 	
	ctx1.fillText("Score: "+this.score,w*0.5,h-38);	
    // ctx1.fillText("Music: "+this.flag,w*0.5,50);   //此处未解决bug
    ctx1.fillText("Music",w*0.5,50);    
	can1.onclick=function(e){
		e=e||event;
	   var x=e.clientX-wrap.offsetLeft;
	   var y=e.clientY-wrap.offsetTop;	    
	    if(x>=w*0.5-55&&x<=w*0.5+55&&y>=15&&y<=55){
	    	if(this.flag=="On") {
	    		music.pause();	
	               this.flag="Off";             
	    	} else {
	    		music.play();
	               this.flag="On";               
	    	}
	    }	    
	}    
	// ctx1.fillStyle="#F7F8CA";	
	// ctx1.fillRect(w*0.5-100,15,200,40);
	// ctx1.fillRect(w*0.5-55,15,110,40);

	// ctx1.fillText("num"+this.fruitNum,w*0.5,h-50);
	// ctx1.fillText("double"+this.double,w*0.5,h-80);	
	if(this.gameOver) {
	this.alpha+=deltTime*0.0008;
	this.delHeight+=deltTime*0.015;	
	var rect={x:w*0.5-140,y:h*0.5+30,w:280,h:50};
	if(this.delHeight>35) 
		this.delHeight=35;
	if(this.alpha>1) 
		this.alpha=1;
	ctx1.fillStyle="rgba(248,200,99,"+this.alpha+")";	
	ctx1.font="64px 方正喵呜体";
	ctx1.fillText("Game Over",w*0.5,h*0.5+35-this.delHeight);

	// ctx1.fillStyle="transparent";	
	// ctx1.fillRect(rect.x,rect.y,rect.w,rect.h);	

	ctx1.fillStyle="rgba(255,0,153,"+this.alpha+")";	
	ctx1.font="64px 方正喵呜体";
	ctx1.fillText("Start Again",w*0.5,h*0.5+100-this.delHeight);		
	can1.onclick=function(e){
		e=e||event;
    var x=e.clientX-wrap.offsetLeft;
    var y=e.clientY-wrap.offsetTop;
	    if(x>=rect.x&&x<=rect.x+rect.w&&y>=rect.y&&y<=rect.y+rect.h){
	        game();
	    }
	}
}	

	ctx1.restore();
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}