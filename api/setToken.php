<?php 
//  if($_SERVER['REQUEST_METHOD']=='POST'){
        
        //Getting values
    //  $trackedId = $_POST['trackedId'];//sendiri punya
    //  $trackerId = $_POST['trackerId'];

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');           
    
    $host="localhost"; //replace with database hostname
    $username="zaemuzha_kira"; //replace with database username
    $password="nopassword"; //replace with database password
    $db_name="zaemuzha_fypkira"; //replace with database name

    $con=mysql_connect("$host", "$username", "$password")or die("cannot connect");
    mysql_select_db("$db_name")or die("cannot select DB");
    $token = $_GET['token'];
    $userid = $_GET['userid'];

    //Creating sql query
    $sql = "UPDATE users 
            SET token = '$token'
            WHERE id = '$userid'";
    
    if(mysql_query($sql)) {
        echo "success";
    } else {
        echo "fail";
    }

    //Closing the database 
    mysql_close($con);
    //}
?>