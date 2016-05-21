<?php
require_once 'dbLogin.php';

//the get part
$queryResults = array();
//note this var is unused for the time being
$title = isset($_GET['title']) ? $_GET['title'] : '';

//search table
//be careful with the syntax here. Need to enclose sql like statements in single quotes and place wild card % correctly
//otherwise no results come back and you get XHR errors from bad sql
$sql="SELECT * FROM history WHERE 0=0"; //title like '%" . $q . "%'";

//run mysqli query.  note $con var part of dbLogin.php
$query = mysqli_query($con,$sql);

//build array of the results
while($row = mysqli_fetch_array($query)) {
	$queryResults[] = array(
			'history_id' => $row['history_id'] //=> is a symbol used to retrieve object methods or properties.  In short this ensures the parser will treat it as a json object. see pg 118 of php book, the array within an array
			,'title' => $row['title']		// gets the formmating right ie object () in F12 dev tools, net/XHR.  it is related to the -> symbol used to access object method/properties within php code
			,'year' => $row['year'] 
//			,'content' => $row['content']
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

//the response is json
header('Content-Type: application/json');

//output
print json_encode($queryResults);
?>