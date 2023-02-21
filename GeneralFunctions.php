<?php 
error_reporting(1);
date_default_timezone_set('Asia/Kolkata');
 
// 0 or 1
//global $DeveloperMode;
$DeveloperMode = 1;

if($DeveloperMode == 0)
	{ error_reporting(0); }
	else
	{ error_reporting(1); }
function milliseconds_to_datetime($mil)
{
$seconds = $mil / 1000;
return date("d/m/Y H:i:s", $seconds);
} 
// echo milliseconds_to_datetime(1503712532810);


//Developer Mode 
function write($printcontent, $type)
{
	$DeveloperMode = 1;
	
	
	//global $DeveloperMode;
	if($DeveloperMode == 1)
	{
		if($type == 'json')
		{
		$response["MessageForDeveloper"] = 	$printcontent;
	//	echo json_encode($response);
		//echo json_encode($response);
		}else
		{
		echo "<br><span style='color:red; text-decoration:italic;'>{$printcontent}</span>";
		}
	}
	else
	{
		echo "inside else";
	}
}

 
//send mail with attachment


//xample #1 fputcsv() example

  
function arrayToCsv(){
	
	$delimiter = '~~';
	$enclosure = '$';
	$list = array (
		array('aaa', 'bbb', 'ccc', 'dddd'),
		array('123', '456', '789', '789'),
		array('aaa', 'bbb', '789', '789')
	);
	$filename = str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT).'.csv';
	$fp = fopen($filename, 'w');

	foreach ($list as $fields) {
		fputcsv($fp, $fields, $delimiter, $enclosure);
	}

fclose($fp);
/*
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=".$filename);
header("Pragma: no-cache");
header("Expires: 0");
readfile($filename);
*/
		/*
		//show
		foreach ($list as $row) {
			echo implode($delimiter, $row) . "\r\n";
		}
		*/

} 

//arrayToCsv();
  

 
//array to xml conversion
function ArrayToXml($array, $xml = false){
    if($xml === false){
        $xml = new SimpleXMLElement('<root/>');
    }
    foreach($array as $key => $value){
        if(is_array($value)){
            arraytoxml($value, $xml->addChild($key));
        }else{
            $xml->addChild($key, $value);
        }
    }
    return $xml->asXML();
}





//IP WHITE LISTING FOR ADMIN
function ipWhiteListing()
{
	$whitelist = array('120.62.27.71');
	if (in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
		//Action for allowed IP Addresses
	} else {
		//Action for all other IP Addresses
		echo 'You are not authorized here.'; 
		echo "<br />IP Address: ".$_SERVER['REMOTE_ADDR'];
		exit;
	}
}

?>