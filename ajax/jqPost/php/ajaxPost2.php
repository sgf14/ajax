<?php
//just basic example for sake of simplicity.  Dont have any data conditioning anti-SQL injection that should be there 
require_once 'dbLogin.php';

//sets
$queryResults = array();
$setIndex = isset($_POST['history_id']) ? $_POST['history_id'] : ''; 
$setTitle = isset($_POST['title']) ? $_POST['title'] : '';  
$setYear = isset($_POST['year']) ? $_POST['year'] : '';

//build sql.  Be careful with the syntax here. Need to enclose sql like statements in single quotes and place wild card % correctly
//otherwise no results come back and you get XHR errors from bad sql
$sql="UPDATE history SET 
		    title='" . $setTitle . "'"
		. ", year='" . $setYear . "'" 
		// add vars as needed
		. ", last_update= SYSDATE()"
		. " WHERE history_id='" . $setIndex  . "'";    

//ref only- sql like parameter formatting:  like "'%" . $q . "%'";

//run mysqli query.  note $con var part of dbLogin.php
$query = mysqli_query($con,$sql);

?>