<?php
   /*该页面用于登陆后上传照片*/
   $output = [];
   $imgdescribe = $_REQUEST['imgdescribe'];
   $uname = $_REQUEST['uname'];
   $uploadTime = time()*1000;
   $file = $_FILES['files'];
   $path = $_FILES['files']['name'];
 //将接受的文件保存在upload目录下
    move_uploaded_file($file["tmp_name"],"../upload/".$file["name"]);
    //连接数据库
    $conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
    $sql = "INSERT INTO share_img (pid,uname,imgdescribe,path,zan,uploadTime) VALUES(null,'$uname','$imgdescribe','$path',0,$uploadTime) ";
    mysqli_query($conn,"SET NAMES UTF8");
    $result = mysqli_query($conn,$sql);
    echo $result;
?>