<?php
   /*该页面用于*/
    $output = [];
    $uname = $_REQUEST['uname'];
    $conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
    $sql = "SELECT * FROM user_hi WHERE uname= '$uname' ";
    mysqli_query($conn,"SET NAMES UTF8");
    $result = mysqli_query($conn,$sql);
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
        array_push($output,$row);
    }
    $myjson = json_encode($output);
    echo $myjson
?>