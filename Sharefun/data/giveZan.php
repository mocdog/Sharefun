<?php
/*��ҳ����������ҳ�û���ϲ������Ƭ����*/
$output = [];
$pid = $_REQUEST['pid'];
$zan = $_REQUEST['zan'];
$conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
$sql = "UPDATE share_img SET zan = $zan WHERE pid=$pid";
mysqli_query($conn,"SET NAMES UTF8");
$result = mysqli_query($conn,$sql);
echo $result;
?>