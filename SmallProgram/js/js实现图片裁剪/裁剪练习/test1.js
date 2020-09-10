//获取元素相对于屏幕左边的距离，利用offsetLeft
window.onload=function(){
	var rightDiv=document.getElementById("rightdiv");
	var mainDiv=document.getElementById("main");
	var ifmousedown=false;
	window.onmousedown=function(){
		ifmousedown=true;
	}
    window.onmouseup=function(){
    	ifmousedown=false;
    }
		if (ifmousedown==true) {
				window.onmousemove=function(e){
		var x=e.clientX;
		var widthbefore=mainDiv.offsetWidth-2;
		var addwidth="";
		addwidth=x-widthbefore-getPosition(mainDiv).left;
		mainDiv.style.width=widthbefore +addwidth+"px";
	}
		}
}

function getPosition(node){
  var left=node.offsetLeft；
  var top=node.offsetTop;
  var parent=node.offsetParent;
  while(parent!=null){
  	left+=parent.offsetLeft；
  	top+=parent.offsetTop;
  	parent=parent.offsetParent;
  }
  return {"left":left,"top":top;}
}
