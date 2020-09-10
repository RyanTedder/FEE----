var chess=document.getElementById('chess');
var context=chess.getContext('2d');     //获取画板
context.strokeStyle="#BFBFBF";

var logo=new Image();            //设置背景图片
logo.src="images/bg.jpg";
logo.onload=function(){          //图片加载完成后执行回调函数
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();						
}

var chessBoard=[];              //存储棋盘格子
var flag=true;
var over=false;
var count=0;					//总赢法数
var wins=[];					//赢法数组
var myWin=[];					//赢法的统计数组
var computerWin=[];


for(var i=0;i<15;i++){			//建立三维数组
	wins[i]=[];
	for(var j=0;j<15;j++)
	{
		wins[i][j]=[];
	}
}

for(var i=0;i<15;i++){          //赢法数组的生成
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count]=true;	
		}
		count++;
	}	
}

for(var i=0;i<15;i++){			
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++)
		{
			wins[j+k][i][count]=true;	
		}
		count++;
	}	
}

for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++)
		{
			wins[i+k][j+k][count]=true;	
		}
		count++;
	}	
}

for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++)
		{
			wins[i+k][j-k][count]=true;	
		}
		count++;
	}	
}

// console.log(count);

for(var i=0;i<count;i++)
{
	myWin[i]=0;
	computerWin[i]=0;
}

for (var i = 0; i <15; i++){			//建立二维数组
	chessBoard[i]=[];					
	for (var j = 0; j <15; j++){		
	chessBoard[i][j]=0;
	}		
}


chess.onclick=function(e){
	if(over){
		return;
	}
	if(!flag){
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBoard[i][j]==0) {
		oneStep(i,j,flag);						//黑棋
	    chessBoard[i][j]=1; 		
	for(var k=0;k<count;k++){
		if(wins[i][j][k]){
			myWin[k]++;
			computerWin[k]=6;
			if(myWin[k]==5){
				window.alert("你赢了！");
				over=true;
			}
		}
	}
			if(!over){
				flag=!flag;
				computerAI();
			}
	}
}

var computerAI=function(){
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]==0){
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){
						if(myWin[k]==1){
							myScore[i][j]+=200;
						}else if(myWin[k]==2){
							myScore[i][j]+=400;
						}else if(myWin[k]==3){
							myScore[i][j]=2000;
						}else if(myWin[k]==4){
							myScore[i][j]=10000;
						}

						if(computerWin[k]==1){
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2){
							computerScore[i][j]+=420;
						}else if(computerWin[k]==3){
							computerScore[i][j]+=2200;
						}else if(computerWin[k]==4){
							computerScore[i][j]+=12000;
						}
					}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
				oneStep(u,v,false);
				chessBoard[u][v]=2;
				for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k]=6;
			if(computerWin[k]==5){
				window.alert("计算机赢了！");
				over=true;
			}
		}
	}
	if(!over){
		flag=!flag;
	}
}

function drawChessBoard(){
	for (var i = 0; i < 15; i++) {
		context.moveTo(15+i*30,15);//横线
		context.lineTo(15+i*30,435);
		context.stroke();
		context.moveTo(15,15+i*30);//纵线
		context.lineTo(435,15+i*30);
		context.stroke();
	}
}
var oneStep=function(i,j,flag){
		context.beginPath();
		context.arc(15+i*30,15+j*30,13,0,2*Math.PI);        //arc用于画扇形
		context.closePath();
		var gradient=context.createRadialGradient(17+i*30,13+j*30,13,17+i*30,13+j*30,0);//设置渐变色填充
		if(flag){                                     //黑棋
			gradient.addColorStop(0,"#0A0A0A");
			gradient.addColorStop(1,"#636766");
	     }else{										 //白棋
			gradient.addColorStop(0,"#D1D1D1");
			gradient.addColorStop(1,"#F9F9F9");	  
			   }
		context.fillStyle=gradient;
		context.fill();     //fill用于填充，stroke用于描边

}