<?php
//  ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
$DeveloperMode = 1;
/*
$servername = "localhost";
$username = "noww_dnauser";
$password = "123Dharan!@#";
$dbname = "noww_dna";
$databasetype = 'mysql';
*/

$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "realestate";
$databasetype = 'mysql';
 


//$db=mysqli_connect("localhost","noww_gym1","123Gym!@#","noww_gym1");
//$con=$db;


$db = mysqli_connect($servername, $username, $password, $dbname);
mysqli_set_charset($db, "utf8");  
 
     function compress($source, $destination, $quality) {
    
        $info = getimagesize($source);
    
        if ($info['mime'] == 'image/jpeg') 
            $image = imagecreatefromjpeg($source);
    
        elseif ($info['mime'] == 'image/gif') 
            $image = imagecreatefromgif($source);
    
        elseif ($info['mime'] == 'image/png') 
            $image = imagecreatefrompng($source);
    
        imagejpeg($image, $destination, $quality);
    
        return $destination;
    }
 
 
	function tblView($sql, $format)
	{
	try {
		global $username, $password, $dbname, $databasetype, $servername;
		// set the PDO error mode to exception
		$conn = new PDO("$databasetype:host=$servername;dbname=$dbname;charset=utf8;", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			$sql = $sql;
			$stmt = $conn->prepare($sql); 
			$stmt->execute();
			$result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
			
			if($stmt->rowCount()>0){
				
				foreach($stmt->fetchAll() as $key=>$value) { 
					 $content[] = $value;
				}
				
				array_walk_recursive($content,function(&$item){$item=strval($item);});
					if($format!='')
					{
							
							if($format=='json'){
								header('Content-Type: application/json;  charset=utf-8');
								        $response["status_code"] = 200;
										$response["status"] = "Success";
										$response["returndata"] = $content;
										$response["error_message"] = "";
										echo json_encode($response);
								
								
								
								
							}
							if($format=='array'){
								return $content;
							}
							if($format=='xml'){
			//					header('Content-type: text/xml');
								print ArrayToXml($content);
							}
					}
					else{
										$response["status"] = "Success";
										$response["Message"] = $content;
										$response["error_message"] = "";
							echo json_encode($response);
					
					}
			}
				
		else {
			
				$response["status"] = "Error";
				$response["content"] = array();
				$response["error_message"] = "Data Not Found";
		echo json_encode($response);
		}
	}
	catch(PDOException $e)
		{
			echo $sql . "<br>" . $e->getMessage();
		}
	}


function tblInsert($sql, $cols, $vals){}
function tblDelete($sql){}
function tblEdit(){}
function tblUpdate(){}

	
	
	
	
	
	
$conn = null;


?>