<?php 
//error_reporting(1);
//error_reporting(E_ALL); 
//ini_set('display_errors', TRUE); 
class property{
    
    function addProperty_Func(){
        $data = json_decode(file_get_contents('php://input'), true);
        global $db; 
        date_default_timezone_set('Asia/Kolkata');
        $now = date('Y-m-d h:i:s', time());
       
        $sellerid = $data["sellerId"];
        $sellername = $data["sellerName"];
        $selleremail = $data["sellerEmail"];
        $sellerphone = $data["sellerPhone"];
        $selleraddress = $data["sellerAddress"];
        $area = $data["area"];
        $propertytype = $data["propertyType"];
        $bedrooms = $data["bedRooms"];
        $bathrooms = $data["bathRooms"];
        $askingprice = $data["askingPrice"];
        $description = $data["description"];

        
        $sql = "INSERT INTO `property` (`sellerid`, `sellername`, `selleremail`,`sellerphone`,`selleraddress`,`area`,`propertytype`,`bedrooms`,`bathrooms`,`askingprice`,`description`,`createdat`) VALUES ($sellerid, '$sellername', '$selleremail','$sellerphone','$selleraddress','$area','$propertytype','$bedrooms','$bathrooms',$askingprice,'$description','$now')";

        mysqli_query($db, $sql);
        
        $response["status"] = "Success";
        $response["status_code"] = 200;
        $response["message"] = "Property created";
        echo json_encode($response);                
    }

    function viewProperties_Func(){
        global $db;
        $data = json_decode(file_get_contents('php://input'), true);

        $q = "SELECT * from property where sellerid is not null";
        // echo $q;
        tblView($q,'json'); 
    }

    function viewPropertyByid_Func(){
        global $db;
        $data = json_decode(file_get_contents('php://input'), true);
        
        $propid = $data["propId"];
        
        $q = "SELECT * from property where id = $propid";
        // echo $q;
        tblView($q,'json'); 
    }
}
?>