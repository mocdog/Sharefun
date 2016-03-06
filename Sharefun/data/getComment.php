<?php
/*该页面用于详情页获取评论*/
$output = [];
$pid = $_REQUEST['pid'];

$conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
$sql = "SELECT a.uname,userComment,hipath FROM user_comment as a ,user_hi as b WHERE pid = '$pid' AND a.uname=b.uname";
mysqli_query($conn,"SET NAMES UTF8");
$result = mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($result,MYSQLI_ASSOC)){
    array_push($output,$row);
}
$myjson = json_encode($output);
echo $myjson;
?>