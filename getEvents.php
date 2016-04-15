<?php
    $host="localhost"; //replace with database hostname
    $username="username"; //replace with database username
    $password="abcdef"; //replace with database password
    $db_name="db_name"; //replace with database name
    $con=mysql_connect("$host", "$username", "$password")or die("cannot connect");
    mysql_select_db("$db_name")or die("cannot select DB");
   
    $sql = "select * from events"; //$sql is a variable

    $event = mysql_query($sql); //use $sql as query statement, insert data into $event
    $json = array(); //create empty json array
    if(mysql_num_rows($event)){ //if event still has row with data
        while($row=mysql_fetch_assoc($event)){ //fetch one row data into row
            $json['events_list'][]=$row;
        }
    }

    mysql_close($con);
    echo json_encode($json);
?>