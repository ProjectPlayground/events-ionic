<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

    $host="localhost"; //replace with database hostname
    $username="zaemuzha_kira"; //replace with database username
    $password="nopassword"; //replace with database password
    $db_name="zaemuzha_fypkira"; //replace with database name

    $con=mysql_connect("$host", "$username", "$password")or die("cannot connect");

    mysql_select_db("$db_name")or die("cannot select DB");
    
    $userid = $_GET['userid']; //userid is from link in bookmarksServices
    $eventid = $_GET['eventid']; //userid is from link in bookmarksServices

    $sql = "DELETE FROM bookmarks WHERE userid='$userid' AND eventid='$eventid'";

    if(mysql_query($sql)){
        echo "true";
    }
    else{
        echo "false";
    }; //use $sql as query statement, insert data into $event

    mysql_close($con);
?>