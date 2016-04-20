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

	$name = $_GET['postname']; //postusername is from link in userServices
	$password = $_GET['postpassword']; //postpassword is from link in userServices
	
	$sql = "SELECT * FROM users WHERE name='$name' AND password='$password'"; //name and password, name of columns in users

	$users = mysqli_query($con, $sql);
	
	$json = array(); //create empty json array

    if(mysql_num_rows($users)){ //if event still has row with data
        while($row=mysql_fetch_assoc($users)){ //fetch one row data into row
            $json['users_list'][]=$row;
        }
    }

    mysql_close($con);
    echo json_encode($json);
 ?>