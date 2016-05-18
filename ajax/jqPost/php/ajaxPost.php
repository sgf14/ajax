<?php
//just basic example for sake of simplicity.  Dont have any data conditioning anti-SQL injection that should be there 
require_once 'dbLogin.php';

//this basic call from js works as of 05/01/16
$queryResults = array();
$setIndex = isset($_POST['history_id']) ? $_POST['history_id'] : ''; 
$setTitle = isset($_POST['title']) ? $_POST['title'] : '';  
//be careful with the syntax here. Need to enclose sql like statements in single quotes and place wild card % correctly
//otherwise no results come back and you get XHR errors from bad sql
$sql="UPDATE history SET title='" . $setTitle . "' WHERE history_id='" . $setIndex  . "'";    
//ref only- sql like parameter formatting.  like "'%" . $q . "%'";

//run mysqli query.  note $con var part of dbLogin.php
$query = mysqli_query($con,$sql);

//the response is json
//header('Content-Type: application/json');

//output
//think I need json_decode() instead- check php cookbook
//print json_encode($queryResults);


//the set part
?>