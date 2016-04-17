<?php 
//  if($_SERVER['REQUEST_METHOD']=='POST'){
        
        //Getting values
    //  $trackedId = $_POST['trackedId'];//sendiri punya
    //  $trackerId = $_POST['trackerId'];

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');


    //Getting values
    $usr_email = $_GET['postemail'];//sendiri punya
    $username = $_GET['postusername'];
    $usr_password = $_GET['postpassword'];
            
    //Importing our db connection script
    require_once('dbConnect.php');


    //Creating sql query
    $sql = "SELECT * FROM users WHERE usr_email='$usr_email'
    
    ;"; //from usertable
    
    //getting result 
    $no = (mysqli_query($con, $sql));

    
//  echo(mysqli_num_rows($no));
    //creating a blank array 
    $result = array();
    
    //looping through all the records fetched
/*  while($row = mysqli_fetch_array($no)){
        
        //Pushing name and id in the blank array created 
        array_push($result,array(
            "usr_email"=>$row['usr_email'],
            "username"=>$row['username'],
            "usr_password" => $row['usr_password']
            n++;
        ));
    }*/
    
//Displaying the array in json format 
    //echo json_encode($result);
    //echo(mysqli_num_rows($no));
    //$num_rows = $no->num_rows;
    $no1 = mysqli_num_rows($no);
    //echo ($no1);

        if ($no1 != 0) {
            echo '3';
        }

        else
        {       

            //Creating an sql query
            $sql = "INSERT INTO user (usr_email,username, usr_password) 
                    VALUES ('$usr_email','$username','$usr_password')";

            //Executing query to database
            if(mysqli_query($con, $sql)){
                echo '1';// add user successfully and vv
            }

            else{
                echo '0';// add user successfully and vv
            }
        }
        
        //Closing the database 
        mysqli_close($con);
    //}
?>