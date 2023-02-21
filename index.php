<?php
 
  
include ('GeneralFunctions.php');

include('dbhelper.php');



function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

 //   echo "You have CORS!";
}
cors();
header('Content-Type: text/html; charset=utf-8');
/*

* CALL FUNCTIONS RELATED AS PER CONTROLLER AND ACTION 

* 

*

*

*/

function call($controller, $action) {

    require_once($controller . 'Controller.php');

	call_user_func($controller.'::'.$action.'_Func');
	//call_user_func(array($controller, $action."_Func"));

}


$list_of_allowed = array(
						'user'=>['signup','signin','getallusers'],
						'salesreq'=>['sendRequest','getRequestbysellerId'],
						'property'=>['addProperty','viewProperties','viewPropertyByid'],
						'promotion'=>['promoteproperty','viewpromotions'],	
						);


$response["status"] = "Error";

$datas = json_decode(file_get_contents('php://input'), true);

if (isset($_REQUEST['api']) && isset($_REQUEST['action'])) {
		$controller = $_REQUEST['api'];

		$action     = $_REQUEST['action'];
		$controllers =    $list_of_allowed;

		

		

		if (array_key_exists($controller, $controllers)) {

			if (in_array($action, $controllers[$controller])) {

					call($controller, $action);

				} else { //IF ACTION NOT FOUND	

					$response["Message"] = "Action Not Found";

					echo json_encode($response);

				}

		} else { //IF CONTROLLER NOT FOUND		

		 $response["Message"] = "Section Not Found";

		 echo json_encode($response);

		}
	
	
}
else{
//	echo "roop";
if (isset($datas['api']) && isset($datas['action'])) {

		$controller = $datas['api'];
		

		$action     = $datas['action'];

	

		  // controller and actions library

		$controllers =   $list_of_allowed;

		

		

		if (array_key_exists($controller, $controllers)) {

			if (in_array($action, $controllers[$controller])) {

					call($controller, $action);

				} else { //IF ACTION NOT FOUND	

					$response["Message"] = "Action Not Found";

					echo json_encode($response);

				}

		} else { //IF CONTROLLER NOT FOUND		

		 $response["Message"] = "Section Not Found";

		 echo json_encode($response);

		}

		

	} else {

		//IF CONTROLLER AND ACTION NOT REQUESTED	

		 $response["Message"] = "Input Missing";

		 echo json_encode($response);

	  }
}
	





?>