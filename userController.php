<?php 
//error_reporting(1);
//error_reporting(E_ALL); 
//ini_set('display_errors', TRUE); 
class user{
    
    function signup_Func(){
        $data = json_decode(file_get_contents('php://input'), true);
        global $db; 
        date_default_timezone_set('Asia/Kolkata');
        $now = date('Y-m-d h:i:s', time());
       
        $email = $data["email"];
        $name = $data["name"];
        $password = $data["password"];
        $usertype = $data["usertype"];
        
        $q = "SELECT * from users where email='$email'";
        $result=mysqli_query($db,$q);

        if(mysqli_num_rows($result)==0){
            $sql = "INSERT INTO `users` (`name`, `email`, `password`, `usertype`,`createdat`) 
            VALUES ('$name', '$email', '$password','$usertype', '$now')";
            // echo $sql;
            mysqli_query($db, $sql);
            
            $response["status"] = "Success";
            $response["status_code"] = 200;
            $response["message"] = "User created";
            echo json_encode($response);
        }else{
            $response["status"] = "Failed";
            $response["status_code"] = 500;
            $response["message"] = "Email address exist";
            echo json_encode($response);
        }                   
    }

    function signin_Func(){
        global $db;
        $data = json_decode(file_get_contents('php://input'), true);
        
        $email = $data['email'];
        $password = $data['password'];

        $q = "SELECT id,name,email,usertype from users where email='$email' and password='$password'";
        
        $result=mysqli_query($db,$q);

        if(mysqli_num_rows($result)==0){
            $response["status"] = "Failed";
            $response["status_code"] = 500;
            $response["message"] = "Email or Password incorrect";
            echo json_encode($response);
        }else{
            $row = mysqli_fetch_assoc($result);

            $response["status"] = "Success";
            $response["status_code"] = 200;
            $response["message"] = "User signed In";
            $response["usertype"] = $row['usertype'];
            $response["userinfo"] = $row;
            echo json_encode($response);
        }
    }

    function getallusers_Func(){
        global $db;
        $data = json_decode(file_get_contents('php://input'), true);

        $q = "SELECT id,name,email,usertype from users where usertype!='admin'";
        
        tblView($q,'json'); 
    }
}
?>