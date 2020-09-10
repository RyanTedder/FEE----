<?php
header("Content-type:text/json");
$stulist=array(
	array("Code"=>"10101","Name"=>"陈玉宽","Score"=>"530");
	array("Code"=>"10102","Name"=>"刘彪","Score"=>"540");
	array("Code"=>"10103","Name"=>"胡霞","Score"=>"550");
	array("Code"=>"10104","Name"=>"张红丹","Score"=>"560");
	array("Code"=>"10105","Name"=>"历史","Score"=>"570");
	);
echo json_encode($stulist);
?>