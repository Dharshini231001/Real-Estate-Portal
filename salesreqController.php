<?php 
//error_reporting(1);
//error_reporting(E_ALL); 
//ini_set('display_errors', TRUE); 
class salesreq{
    
    function sendRequest_Func(){
        $data = json_decode(file_get_contents('php://input'), true);
        global $db; 
        date_default_timezone_set('Asia/Kolkata');
        $now = date('Y-m-d h:i:s', time());
       
        $buyername = $data["buyerName"];
        $buyerid = $data["buyerId"];
        $sellerid = $data["sellerId"];
        $propertyid = $data["propertyId"];
        
        $q = "SELECT * from salesrequest where buyerid=$buyerid and propertyid=$propertyid";
        // echo $q;
        $result=mysqli_query($db,$q);

        if(mysqli_num_rows($result)==0){
            $sql = "INSERT INTO `salesrequest` (`buyername`, `buyerid`, `sellerid`, `propertyid`,`createdat`) 
            VALUES ('$buyername', '$buyerid', '$sellerid', '$propertyid' ,'$now')";
            // echo $sql;
            mysqli_query($db, $sql);
            
            $response["status"] = "Success";
            $response["status_code"] = 200;
            $response["message"] = "Request sent";
            echo json_encode($response);
        }else{
            $response["status"] = "Failed";
            $response["status_code"] = 500;
            $response["message"] = "Request already sent";
            echo json_encode($response);
        }                   
    }

    function getRequestbysellerId_Func(){
        $data = json_decode(file_get_contents('php://input'), true);
        global $db; 
        
        $sellerid = $data["sellerId"];
        
        $q = "SELECT * from salesrequest where sellerid=$sellerid";
        tblView($q,'json');                
    }
}
?>