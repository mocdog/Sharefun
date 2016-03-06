<?php
$output = [];
$uname = $_REQUEST['uname'];

$conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
$sql = "SELECT * FROM share_user WHERE  uname = '$uname'";
mysqli_query($conn,"SET NAMES UTF8");
$result = mysqli_query($conn,$sql);
if(($row = mysqli_fetch_array($result,MYSQLI_ASSOC))!=null){
    $output[] = $row;
}
$myjson = json_encode($output);
echo $myjson;
?>