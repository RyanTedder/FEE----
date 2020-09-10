var board=new Array();
var score=0;

$(document).ready(function(){
	newgame();
});

function newgame(){
	//初始化棋盘格
	init();
	//随机在两个格子生成数字
}

function init(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridcell=$("#grid-cell-"+i+"-"+j);
			gridcell.css('top',20+i*120);
			gridcell.css('left',20+j*120);
		}
	}
}