var express = require('express');
var router = express.Router();
var path=require("path"); //获取目录路径
var media=path.join(__dirname,"../public/media");
/* GET home page. */
router.get('/', function(req, res, next) {
	var fs=require("fs");    //文件系统模块
	fs.readdir(media,function(err,names){
		if(err){
			console.log(err);
		}else{
			res.render('index',{title:'动感音乐',music: names});//返回音乐数据
		}
	});
});

module.exports = router;
