<?php
/*��ҳ����������ҳ��������*/
$output = [];
$uname = $_REQUEST['uname'];
$userComment = $_REQUEST['userComment'];
$pid = $_REQUEST['pid'];
$commentTime = time()*1000;

$conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
$sql = "INSERT INTO user_comment(pid,uname,userComment,commentTime) VALUES ($pid,'$uname','$userComment',$commentTime)";
mysqli_query($conn,"SET NAMES UTF8");
$result = mysqli_query($conn,$sql);
echo $result;
?>