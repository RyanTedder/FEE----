<?php
function checknum($num){
	return ($num%2)?1:0;
}
$num=$_GET["n"];
return (checknum($num))?"奇数":"偶数";
?>