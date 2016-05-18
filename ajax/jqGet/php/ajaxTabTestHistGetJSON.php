<?php
require_once 'dbLogin.php';

// got this from stack overflow w/ search term- 'php json_encode  mysql'
// its important to use the actual method name 'json_encode' vs more generic 'json encode'
// to get the most appropriate answer to rise to the top

//this outputs table data in a JSON compatible format back to JavaScript file

$sql="SELECT * FROM history WHERE 0 = 0";
$result = mysqli_query($con,$sql);
$dataSetId = array();

while($row = mysqli_fetch_array($result)) {
	$dataSetId[] = array(
			'history_id' => $row['history_id'], //=> is a symbol used to retrieve object methods or properties.  In short this ensures the parser will treat it as a json object. see pg 118 of php book, the array within an array 
			'title' => $row['title'],			// gets the formmating right ie object () in F12 dev tools, net/XHR.  it is related to the -> symbol used to access object method/properties within php code
			'year' => $row['year'],
			'content' => $row['content']
		);
}

mysqli_close($con);

//anti caching stuff- reccomended for AJAX data.  diff browsers manage this differently but basically it is less dynamic refresh to server
//see PHP cookbook chap 13, pg 431
header("Expires: 0");
header("Last-Modified: ". gmdate("D, d M Y H:i:s"). " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
  //IE-specific options
header("Cache-Control: post-check=0, pre-check=0", false);
  //For HTTP/1.0
header("Pragma: no-cache");

//json header
header('Content-Type: application/json');

//outpit
print json_encode($dataSetId);

?>

