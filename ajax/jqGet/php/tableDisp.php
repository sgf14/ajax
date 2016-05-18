<?php

require_once 'dbLogin.php';


$result = queryMysql("SELECT * FROM family_guy WHERE 0 = 0 ORDER BY id");
$num = $result->num_rows;

for ($j = 0; $j < $num ; ++$j) {
	$row = $result->fetch_array(MYSQLI_ASSOC);
	echo 'Title: ' . $row['title'] . '<br>';
}
//}
?>