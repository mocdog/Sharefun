<?php
   /*该页面用于登陆后上传照片*/
     $output = [];
     $uname = $_REQUEST['uname'];
     $file = $_FILES['files'];
     $path = $_FILES['files']['name'];
     //将接受的文件保存在upload目录下
    move_uploaded_file($file["tmp_name"],"../hidir/".$file["name"]);
    //连接数据库
     $conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
     $sql = "INSERT INTO user_hi (uname,hipath) VALUES('$uname','$path') ";
     mysqli_query($conn,"SET NAMES UTF8");
     $result = mysqli_query($conn,$sql);
     echo $result;
?>