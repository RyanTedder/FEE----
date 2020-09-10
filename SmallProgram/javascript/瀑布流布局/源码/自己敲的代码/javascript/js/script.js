window.onload=function(){
   waterfall('main','box');
   var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'}]};
   window.onscroll=function(){
   	if(checkScrollSlide){
        var oParent=document.getElementById('main');
        for (var i = 0; i < dataInt.data.length; i++) {
        var newBox=document.createElement('div');
        newBox.className='box';
        oParent.appendChild(newBox);
        var newPic=document.createElement('div');
        newPic.className='pic';
        newBox.appendChild(newPic);
        var newImg=document.createElement('img');
        newImg.src='images/'+dataInt.data[i].src;
        newPic.appendChild(newImg);
   	}
   	   waterfall('main','box');
   }
 }
}


function waterfall(parent,box){
	//将main下所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	// console.log(oBoxs.length);
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW=oBoxs[0].offsetWidth;  //offsetWidth包括padding部分，不包括margin部分
	// console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);  //clientWidth窗口视图的最大宽度
	// console.log(cols);
	//设置main属性
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';  //cssText直接设置css内容
    var hArr=[];
    for (var i = 0; i < oBoxs.length; i++) {
    		if(i<cols)
    		{
    			hArr.push(oBoxs[i].offsetHeight);
    		}else{
    			var minH=Math.min.apply(null,hArr);    //不能直接min(hArr),需要先apply
    			var index=getMinhIndex(minH,hArr);
    			// console.log(index);
    			oBoxs[i].style.position='absolute';
    			oBoxs[i].style.top=minH+'px';
    			oBoxs[i].style.left=index*oBoxW+'px';
    			hArr[index]+=oBoxs[i].offsetHeight;    		}
    	}	

}

//根据class获取元素
function getByClass(parent,cls){
   var boxArr=new Array();    //var boxArr=[];
   var allElements=parent.getElementsByTagName('*');
   for (var i = 0; i < allElements.length; i++) {
   	if(allElements[i].className==cls){
   		boxArr.push(allElements[i]);
   	}
   }
     return boxArr;
}

//返回最小高度box的索引值
function getMinhIndex(val,arr){
	for (var i = 0; i<arr.length; i++) {  //for(var i in arr)
		if(arr[i]==val)
		{
			return i;
		}
	}
}

//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var cHeight=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<(scrollTop+cHeight))?ture:false;
}