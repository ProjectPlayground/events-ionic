<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');

	//Importing our db connection script
	include ("dbConnect.php");

		
	$username = $_GET['postusername'];
	$usr_password = $_GET['postpassword'];
	
	$sql = "SELECT * FROM users WHERE username='$username' AND usr_password='$usr_password'";

	$users = mysqli_query($con, $sql);
	$no = mysqli_num_rows($users);
	
	if($no!= 0)
	{
		echo "1";
	}
	else
	{
		echo "0";
	}
	
		
	mysqli_close($con);
 ?>