<?php 
//error_reporting(1);
//error_reporting(E_ALL); 
//ini_set('display_errors', TRUE); 
class promotion{

    function promoteproperty_Func(){
        $data = json_decode(file_get_contents('php://input'), true);
        global $db; 
        date_default_timezone_set('Asia/Kolkata');
        $now = date('Y-m-d h:i:s', time());
       
        $sellerid = $data["sellerId"];
        $propertyid = $data["propertyId"];

        $q = "SELECT * from promotions where propertyid='$propertyid'";
        $result=mysqli_query($db,$q);

        if(mysqli_num_rows($result)==0){
            $sql = "INSERT INTO `promotions` (`sellerid`, `propertyid`,`createdat`) 
            VALUES ($sellerid, $propertyid, '$now')";
            // echo $sql;
            mysqli_query($db, $sql);
            
            $response["status"] = "Success";
            $response["status_code"] = 200;
            $response["message"] = "Property promoted";
            echo json_encode($response);
        }else{
            $response["status"] = "Failed";
            $response["status_code"] = 500;
            $response["message"] = "Property already promoted";
            echo json_encode($response);
        }  
    }

    function viewpromotions_Func(){
        global $db;
        $q = "SELECT * from promotions";
        // echo $q;
        tblView($q,'json'); 
    }
}
?>