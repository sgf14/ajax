<?php
$db_hostname = 'localhost';
$db_database = 'lpmj_book';
$db_username = 'lpmj_bookUrmd5';
$db_password = '!9?.N378e@6)';

// db connection - mysqli
$con = new mysqli ($db_hostname, $db_username, $db_password, $db_database);
if ($con->connect_error) die($con->connect_error);


?>