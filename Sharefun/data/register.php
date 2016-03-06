<?php
   /*该页面用于注册请求*/
    $output = [];
    $uname = $_REQUEST['uname'];
    $upwd = $_REQUEST['upwd'];
    $conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
    $sql = "INSERT INTO share_user (uid,uname,upwd,sex,tel) VALUES(null,'$uname','$upwd',null,null) ";
    mysqli_query($conn,"SET NAMES UTF8");
    $result = mysqli_query($conn,$sql);
    echo $result;
?>