
<?php

    //update events in php server

    
    $host="localhost"; //replace with database hostname
    $username="username"; //replace with database username
    $password="abcdef"; //replace with database password
    $db_name="db_name"; //replace with database name
    $con=mysql_connect("$host", "$username", "$password") or die ("cannot connect");
    mysql_select_db("$db_name") or die ("cannot select DB");
    
    //$matric = $_POST['matric'];
    //$mac = $_POST['mac'];
    //$sql = "update students set `mac` = '$mac' WHERE `matric` = $matric";  $mac and $matric is parameter. Update field mac and matric
    
    if(mysql_query($sql)){
        echo 'success';
    }

    else{
        echo 'failure';
    }
    
    mysql_close($con);
?>