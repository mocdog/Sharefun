<?php
   /*该页面用于登陆请求*/
    $output = [];
    $uname = $_REQUEST['uname'];
    $upwd = $_REQUEST['upwd'];
    $conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
    $sql = "SELECT * FROM share_user WHERE uname= '$uname' AND upwd= '$upwd' ";
    mysqli_query($conn,"SET NAMES UTF8");
    $result = mysqli_query($conn,$sql);
    if(($row = mysqli_fetch_array($result,MYSQLI_ASSOC))!=null){
            $output[] = $row;
            $output["error"] = false;
    }
    else{
     $output["error"] = true;
    }
    $myjson = json_encode($output);
    echo $myjson
?>