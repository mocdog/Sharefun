<?php
/*��ҳ������������ȡ����������ϴ���Ƭ*/
        $output = [];
        $condition = $_REQUEST['condition'];
        $conn = mysqli_connect('127.0.0.1','root','','Sharefun','3306');
        $sql = "SELECT * FROM share_img WHERE imgdescribe LIKE '%$condition%'";
        mysqli_query($conn,"SET NAMES UTF8");
        $result = mysqli_query($conn,$sql);
         while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){
                array_push($output,$row);
         }
        $myjson = json_encode($output);
        echo $myjson
?>