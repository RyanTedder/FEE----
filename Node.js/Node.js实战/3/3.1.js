/**
 * 包含完整错误处理的文件加载
 * @type {[type]}
 */
var fs=require("fs");

fs.open(
	"info.txt","r",
	function(err,handle) {
		if(err) {
			console.log("ERROR: "+err.code+"("+err.message+")");
			return;
		}
		var buf=new Buffer(100000);
		fs.read(
			handle,buf,0,100000,null,
			function(err,length) {
				if(err){
				console.log("ERROR:"+err.code+"("+err.message+")");
				return;					
			}
			console.log(buf.toString('utf8',0,length));
			fs.close(handle,fucntion() {});			
			}
		);
	}
);