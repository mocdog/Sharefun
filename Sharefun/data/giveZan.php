<?php
/*该页面用于详情页用户给喜欢的照片点赞*/
$output = [];
$pid = $_REQUEST['pid'];
$zan = $_REQUEST['zan'];
$conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
$sql = "UPDATE share_img SET zan = $zan WHERE pid=$pid";
mysqli_query($conn,"SET NAMES UTF8");
$result = mysqli_query($conn,$sql);
echo $result;
?>