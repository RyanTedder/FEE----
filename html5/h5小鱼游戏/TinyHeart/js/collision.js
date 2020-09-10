//判断大鱼和果实的距离；
function momFruitsCollision(){
	if(!data.gameOver) {
		for (var i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				//calculate length
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900) {
					//ated
					fruit.dead(i);
					data.fruitNum++;         //每次吃的果实数量
					mom.momBodyCount++;     //大鱼身体颜色发生变化
					if(mom.momBodyCount>7){
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue") {
						data.double=2;      //吃到蓝色果实
					} else {
						data.double=1;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}		
	}

}
//mom baby collision
function momBabyCollision(){
	if(data.fruitNum>0&&!data.gameOver) {
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			//baby recover
			baby.babyBodyCount=0;
			mom.momBodyCount=0;
			data.addScore();	
			halo.born(baby.x,baby.y);
		}
	}	

}